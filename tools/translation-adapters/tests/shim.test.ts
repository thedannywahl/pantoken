import { afterEach, describe, expect, test, vi } from "vite-plus/test";
import {
  createChatCompletionsHandler,
  createShimServer,
  makeSpawnPromptFn,
  ProfileBreaker,
  runWithBreaker,
  type PromptFn,
  type ShimProfile,
} from "../src/shim.ts";

const PROFILES: ShimProfile[] = [
  { name: "claude", command: "claude", args: [] },
  { name: "agy", command: "agy", args: [] },
  { name: "copilot", command: "copilot", args: [] },
];

function breaker(
  overrides: Partial<{ maxConsecutiveFailures: number; resetTimeoutMs: number }> = {},
) {
  return new ProfileBreaker({ maxConsecutiveFailures: 3, resetTimeoutMs: 300_000, ...overrides });
}

// ── ProfileBreaker ────────────────────────────────────────────────────────────

describe("ProfileBreaker", () => {
  test("stays closed below the failure threshold", () => {
    const b = breaker();
    b.recordFailure("claude");
    b.recordFailure("claude");
    expect(b.isOpen("claude")).toBe(false);
  });

  test("opens at the failure threshold", () => {
    const b = breaker();
    b.recordFailure("claude");
    b.recordFailure("claude");
    b.recordFailure("claude");
    expect(b.isOpen("claude")).toBe(true);
  });

  test("a success resets the failure count and closes the breaker", () => {
    const b = breaker();
    b.recordFailure("claude");
    b.recordFailure("claude");
    b.recordFailure("claude");
    expect(b.isOpen("claude")).toBe(true);
    b.recordSuccess("claude");
    expect(b.isOpen("claude")).toBe(false);
    b.recordFailure("claude");
    b.recordFailure("claude");
    expect(b.isOpen("claude")).toBe(false); // only 2 since the reset
  });

  test("reopens after resetTimeoutMs elapses", () => {
    const b = breaker({ resetTimeoutMs: 1000 });
    b.recordFailure("claude", 0);
    b.recordFailure("claude", 0);
    b.recordFailure("claude", 0);
    expect(b.isOpen("claude", 500)).toBe(true);
    expect(b.isOpen("claude", 1000)).toBe(false);
  });

  test("profiles are independent", () => {
    const b = breaker();
    b.recordFailure("claude");
    b.recordFailure("claude");
    b.recordFailure("claude");
    expect(b.isOpen("claude")).toBe(true);
    expect(b.isOpen("agy")).toBe(false);
  });
});

// ── runWithBreaker ────────────────────────────────────────────────────────────

describe("runWithBreaker", () => {
  test("returns the first profile's result and names the provider", async () => {
    const promptFn: PromptFn = vi.fn(async (profile) => `reply from ${profile.name}`);
    const result = await runWithBreaker("hi", { profiles: PROFILES, breaker: breaker(), promptFn });
    expect(result).toEqual({ content: "reply from claude", profile: "claude" });
    expect(promptFn).toHaveBeenCalledTimes(1);
  });

  test("rotates to the next profile after 3 consecutive failures", async () => {
    const attempts: string[] = [];
    const promptFn: PromptFn = vi.fn(async (profile) => {
      attempts.push(profile.name);
      if (profile.name === "claude") throw new Error("wedged");
      return `reply from ${profile.name}`;
    });
    const b = breaker();
    // Three failed batches against claude open its breaker.
    for (let i = 0; i < 3; i += 1) {
      await expect(
        runWithBreaker("hi", { profiles: [PROFILES[0]], breaker: b, promptFn }),
      ).rejects.toThrow(/exhausted/u);
    }
    expect(b.isOpen("claude")).toBe(true);

    // The next call across the full rotation skips claude (breaker open) and succeeds on agy.
    const result = await runWithBreaker("hi", { profiles: PROFILES, breaker: b, promptFn });
    expect(result).toEqual({ content: "reply from agy", profile: "agy" });
  });

  test("fails fast and calls onExhausted exactly once when every profile fails", async () => {
    const promptFn: PromptFn = vi.fn(async () => {
      throw new Error("down");
    });
    const onExhausted = vi.fn();
    await expect(
      runWithBreaker("hi", { profiles: PROFILES, breaker: breaker(), promptFn, onExhausted }),
    ).rejects.toThrow(/All translation profiles exhausted/u);
    expect(promptFn).toHaveBeenCalledTimes(3);
    expect(onExhausted).toHaveBeenCalledTimes(1);
  });

  test("a wedged promptFn that never resolves is the caller's responsibility to time out", async () => {
    // runWithBreaker itself has no timeout — that lives in the PromptFn (spawnPrompt's timeoutMs).
    // Confirms the breaker doesn't silently swallow a hang; it awaits whatever the PromptFn resolves.
    let settled = false;
    const promptFn: PromptFn = () => new Promise(() => {});
    void runWithBreaker("hi", { profiles: [PROFILES[0]], breaker: breaker(), promptFn }).finally(
      () => {
        settled = true;
      },
    );
    await new Promise((r) => setTimeout(r, 10));
    expect(settled).toBe(false);
  });
});

// ── createChatCompletionsHandler ──────────────────────────────────────────────

describe("createChatCompletionsHandler", () => {
  test("maps messages to a prompt and wraps the result OpenAI-shaped", async () => {
    const promptFn: PromptFn = async (_profile, prompt) => `echo: ${prompt}`;
    const handler = createChatCompletionsHandler({
      profiles: PROFILES,
      breaker: breaker(),
      promptFn,
    });
    const response = await handler({
      messages: [
        { role: "system", content: "You translate." },
        { role: "user", content: "Translate: hello" },
      ],
    });
    expect(response.object).toBe("chat.completion");
    expect(response.choices[0].message).toEqual({
      role: "assistant",
      content: "echo: You translate.\nTranslate: hello",
    });
    expect(response.pantoken_provider).toBe("claude");
  });

  test("propagates an all-exhausted failure", async () => {
    const promptFn: PromptFn = async () => {
      throw new Error("down");
    };
    const handler = createChatCompletionsHandler({
      profiles: PROFILES,
      breaker: breaker(),
      promptFn,
    });
    await expect(handler({ messages: [{ role: "user", content: "hi" }] })).rejects.toThrow(
      /exhausted/u,
    );
  });
});

// ── makeSpawnPromptFn (real process, no mocking) ──────────────────────────────

describe("makeSpawnPromptFn", () => {
  test("spawns the profile's command, appends -p, and returns stdout", async () => {
    const promptFn = makeSpawnPromptFn(5000);
    const echoScript =
      "let d = ''; process.stdin.on('data', (c) => (d += c)); " +
      "process.stdin.on('end', () => process.stdout.write(d));";
    // `--` stops node's own flag parsing, so spawnPrompt's trailing `-p` sentinel (a real CLI-agent
    // flag, e.g. claude's "print mode") becomes an inert script argument instead of node's own `-p`
    // (REPL-style "print the last expression's value") — which would otherwise leak into stdout.
    const result = await promptFn(
      { name: "node-echo", command: "node", args: ["-e", echoScript, "--"] },
      "hello world",
    );
    expect(result).toBe("hello world");
  });

  test("rejects when the spawned command exits non-zero", async () => {
    const promptFn = makeSpawnPromptFn(5000);
    await expect(
      promptFn({ name: "node-fail", command: "node", args: ["-e", "process.exit(1)"] }, "hi"),
    ).rejects.toThrow(/exited 1/u);
  });
});

// ── createShimServer (real HTTP, fake promptFn) ───────────────────────────────

describe("createShimServer", () => {
  let close: (() => Promise<void>) | undefined;
  afterEach(async () => {
    await close?.();
    close = undefined;
  });

  test("serves POST /v1/chat/completions", async () => {
    const promptFn: PromptFn = async (_profile, prompt) => `translated: ${prompt}`;
    const server = createShimServer({ profiles: PROFILES, breaker: breaker(), promptFn });
    await new Promise<void>((res) => server.listen(0, res));
    close = () => new Promise((res) => server.close(() => res()));
    const address = server.address();
    if (address === null || typeof address === "string") throw new Error("expected a port");

    const res = await fetch(`http://127.0.0.1:${String(address.port)}/v1/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "hola" }] }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { choices: [{ message: { content: string } }] };
    expect(body.choices[0].message.content).toBe("translated: hola");
  });

  test("404s any other route", async () => {
    const promptFn: PromptFn = async () => "unused";
    const server = createShimServer({ profiles: PROFILES, breaker: breaker(), promptFn });
    await new Promise<void>((res) => server.listen(0, res));
    close = () => new Promise((res) => server.close(() => res()));
    const address = server.address();
    if (address === null || typeof address === "string") throw new Error("expected a port");

    const res = await fetch(`http://127.0.0.1:${String(address.port)}/other`, { method: "POST" });
    expect(res.status).toBe(404);
  });
});
