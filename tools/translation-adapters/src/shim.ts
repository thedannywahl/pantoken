/**
 * An OpenAI-compatible `POST /v1/chat/completions` shim over the CLI-agent adapters
 * (`copilot -p` / `agy -p` / `claude -p`), so any off-the-shelf tool that expects an OpenAI-shaped
 * API can run on plans already paid for — no API keys, no new spend.
 *
 * Phase 0 spike (`.claude/plans/localization-engine.md`): settles the per-request timeout and
 * circuit-breaker rotation behavior under a deliberately wedged agent. Does NOT settle whether
 * driving a subscription CLI programmatically for bulk work is within provider ToS — the existing
 * translation wrappers already do this today, so this shim is a new transport for that behavior, not
 * a new category of it, but that determination is a product/legal decision, not a technical one.
 *
 * @module
 */
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import { spawnPrompt } from "./index.ts";

/** One CLI-agent profile the shim can route a prompt to. */
export interface ShimProfile {
  /** Identifier used in rotation order, breaker state, and the response's `pantoken_provider` field. */
  name: string;
  /** The executable (e.g. `"claude"`, or a path to `agy-wrapper.sh`). */
  command: string;
  /** Extra flags, excluding the terminal `-p` sentinel (added by the default `promptFn`). */
  args: string[];
}

/** Per-profile consecutive-failure tracking with a time-based reset — never reaches for API keys. */
export interface CircuitBreakerOptions {
  /** Consecutive failures (timeout or non-zero exit) before a profile is skipped. */
  maxConsecutiveFailures: number;
  /** How long a profile stays skipped before another attempt reopens it. */
  resetTimeoutMs: number;
}

/** Tracks open/closed state per profile name. `now` is injectable for deterministic tests. */
export class ProfileBreaker {
  private readonly failures = new Map<string, number>();
  private readonly openedAt = new Map<string, number>();

  constructor(private readonly options: CircuitBreakerOptions) {}

  isOpen(name: string, now = Date.now()): boolean {
    const opened = this.openedAt.get(name);
    if (opened === undefined) return false;
    if (now - opened >= this.options.resetTimeoutMs) {
      this.openedAt.delete(name);
      this.failures.set(name, 0);
      return false;
    }
    return true;
  }

  recordSuccess(name: string): void {
    this.failures.set(name, 0);
    this.openedAt.delete(name);
  }

  recordFailure(name: string, now = Date.now()): void {
    const count = (this.failures.get(name) ?? 0) + 1;
    this.failures.set(name, count);
    if (count >= this.options.maxConsecutiveFailures) this.openedAt.set(name, now);
  }
}

/** Fulfills one profile's prompt; swapped out in tests for a fake that never resolves, etc. */
export type PromptFn = (profile: ShimProfile, prompt: string) => Promise<string>;

/** The default `PromptFn`: spawns the profile's command with `-p` and the shared per-request timeout. */
export function makeSpawnPromptFn(timeoutMs: number): PromptFn {
  return (profile, prompt) =>
    spawnPrompt(profile.command, [...profile.args, "-p"], prompt, profile.name, { timeoutMs });
}

/** Dependencies and lifecycle hooks used by the profile-rotation loop. */
export interface RunShimOptions {
  profiles: ShimProfile[];
  breaker: ProfileBreaker;
  promptFn: PromptFn;
  /** Called once, right before throwing, when every profile is exhausted — the caller's chance to
   *  flush already-translated units so a re-run resumes instead of restarting. */
  onExhausted?: () => void;
}

/** Content returned by a provider and the profile that produced it. */
export interface ShimResult {
  content: string;
  /** Which profile actually produced `content` — required so a rotated batch stays attributable. */
  profile: string;
}

/**
 * Try each non-open profile in order; a success closes its breaker, a failure opens it after
 * `maxConsecutiveFailures` and the loop rotates to the next profile. Throws (after `onExhausted`)
 * only once every profile has been tried and failed.
 */
export async function runWithBreaker(prompt: string, options: RunShimOptions): Promise<ShimResult> {
  const errors: string[] = [];
  for (const profile of options.profiles) {
    if (options.breaker.isOpen(profile.name)) {
      errors.push(`${profile.name}: circuit open`);
      continue;
    }
    try {
      const content = await options.promptFn(profile, prompt);
      options.breaker.recordSuccess(profile.name);
      return { content, profile: profile.name };
    } catch (e) {
      options.breaker.recordFailure(profile.name);
      errors.push(`${profile.name}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  options.onExhausted?.();
  throw new Error(`All translation profiles exhausted: ${errors.join("; ")}`);
}

/** Minimal subset of the OpenAI chat-completions request/response shapes this shim needs. */
/** Minimal chat message accepted by the OpenAI-compatible shim. */
export interface ChatMessage {
  role: string;
  content: string;
}
/** Minimal chat-completions request accepted by the shim. */
export interface ChatCompletionsRequest {
  model?: string;
  messages: ChatMessage[];
}
/** Minimal chat-completions response emitted by the shim. */
export interface ChatCompletionsResponse {
  id: string;
  object: "chat.completion";
  choices: [{ index: 0; message: { role: "assistant"; content: string }; finish_reason: "stop" }];
  /** Non-standard: names which CLI-agent profile produced this response (rotation can mix providers
   *  within one batch — see the localization-engine plan's timeout/breaker section). */
  pantoken_provider: string;
}

/** Concatenate a chat-messages array into one prompt string (no per-role templating). */
function promptFromMessages(messages: ChatMessage[]): string {
  return messages.map((m) => m.content).join("\n");
}

/** Build a `(request) => response` handler, independent of the HTTP transport (easy to unit test). */
export function createChatCompletionsHandler(
  options: RunShimOptions,
): (request: ChatCompletionsRequest) => Promise<ChatCompletionsResponse> {
  return async (request) => {
    const prompt = promptFromMessages(request.messages);
    const { content, profile } = await runWithBreaker(prompt, options);
    return {
      id: `shim-${String(Date.now())}`,
      object: "chat.completion",
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      pantoken_provider: profile,
    };
  };
}

/** The ~100-line HTTP server: `POST /v1/chat/completions`, everything else 404s. */
export function createShimServer(options: RunShimOptions): Server {
  const handleChatCompletions = createChatCompletionsHandler(options);
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method !== "POST" || req.url !== "/v1/chat/completions") {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: { message: "not found" } }));
      return;
    }
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk: string) => {
      body += chunk;
    });
    req.on("end", () => {
      void (async () => {
        try {
          const request = JSON.parse(body) as ChatCompletionsRequest;
          const response = await handleChatCompletions(request);
          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify(response));
        } catch (e) {
          res.writeHead(500, { "content-type": "application/json" });
          res.end(
            JSON.stringify({ error: { message: e instanceof Error ? e.message : String(e) } }),
          );
        }
      })();
    });
  });
}
