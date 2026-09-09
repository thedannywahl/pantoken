import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import { CONFIG_DEFAULTS } from "../src/config.ts";
import {
  aiProviderConfigured,
  fillUntranslatedEntries,
  resolveProviderInvocation,
  targetLanguageLabel,
} from "../src/ai-translate.ts";
import { parsePo } from "../src/po.ts";

let testDir: string;
const originalCommand = process.env.I18N_TRANSLATION_COMMAND;
const originalArgs = process.env.I18N_TRANSLATION_COMMAND_ARGS;

beforeEach(() => {
  testDir = mkdtempSync(join(tmpdir(), "pantoken-i18n-ai-translate-"));
});

afterEach(() => {
  rmSync(testDir, { recursive: true, force: true });
  if (originalCommand === undefined) delete process.env.I18N_TRANSLATION_COMMAND;
  else process.env.I18N_TRANSLATION_COMMAND = originalCommand;
  if (originalArgs === undefined) delete process.env.I18N_TRANSLATION_COMMAND_ARGS;
  else process.env.I18N_TRANSLATION_COMMAND_ARGS = originalArgs;
});

// TEMP DIAGNOSTIC (remove after capturing the "oils I/O error" flake): dumps the child's own
// shell-resolution env to a fixed log path every time the fake provider runs, since the flake only
// shows up under `vp run ready`'s full parallel task graph, not an isolated `vp test` run.
const DEBUG_LOG = join(tmpdir(), "pantoken-ai-translate-debug.log");

/** A fake AI command: ignores stdin/args, always answers with one fixed JSON translation. */
function installFakeProvider(response: string): void {
  const scriptPath = join(testDir, "fake-provider.sh");
  writeFileSync(
    scriptPath,
    `#!/usr/bin/env bash\n{ echo "--- $(date -u +%FT%TZ) pid=$$ ---"; echo "PATH=$PATH"; command -v env; command -v bash; env -- bash --version | head -1; uname -a; ulimit -u; } >>'${DEBUG_LOG}' 2>&1\ncat >/dev/null\nprintf '%s' '${response}'\n`,
  );
  chmodSync(scriptPath, 0o755);
  process.env.I18N_TRANSLATION_COMMAND = scriptPath;
  delete process.env.I18N_TRANSLATION_COMMAND_ARGS;
}

/** A fake provider that brackets each call with `+`/`-` markers so overlap is observable. */
function installConcurrencyProbe(): void {
  const scriptPath = join(testDir, "probe-provider.sh");
  const log = join(testDir, "concurrency.log");
  writeFileSync(
    scriptPath,
    [
      "#!/usr/bin/env bash",
      "cat >/dev/null",
      `echo + >>'${log}'`,
      "sleep 0.1",
      `echo - >>'${log}'`,
      "printf '%s' '{}'",
      "",
    ].join("\n"),
  );
  chmodSync(scriptPath, 0o755);
  process.env.I18N_TRANSLATION_COMMAND = scriptPath;
  delete process.env.I18N_TRANSLATION_COMMAND_ARGS;
}

/** The highest number of probe calls that were ever in flight at once. */
function peakConcurrency(): number {
  const markers = readFileSync(join(testDir, "concurrency.log"), "utf8").trim().split("\n");
  let inFlight = 0;
  let peak = 0;
  for (const marker of markers) {
    inFlight += marker === "+" ? 1 : -1;
    peak = Math.max(peak, inFlight);
  }
  return peak;
}

describe("aiProviderConfigured", () => {
  test("false when I18N_TRANSLATION_COMMAND is unset", () => {
    delete process.env.I18N_TRANSLATION_COMMAND;
    expect(aiProviderConfigured()).toBe(false);
  });

  test("true when I18N_TRANSLATION_COMMAND is set", () => {
    process.env.I18N_TRANSLATION_COMMAND = "claude";
    expect(aiProviderConfigured()).toBe(true);
  });
});

describe("targetLanguageLabel", () => {
  test("resolves a known BCP-47 tag to its English name", () => {
    expect(targetLanguageLabel("hu")).toBe("Hungarian");
  });

  test("falls back to the raw tag for an unrecognized value", () => {
    expect(targetLanguageLabel("not-a-locale")).toBe("not-a-locale");
  });
});

describe("fillUntranslatedEntries", () => {
  const poPath = () => join(testDir, "hu.po");

  function writePo(): void {
    writeFileSync(
      poPath(),
      [
        "#, no-c-format",
        'msgid "Back"',
        'msgstr ""',
        "",
        "#, no-c-format",
        'msgid "Cancel"',
        'msgstr "Mégse"',
      ].join("\n"),
    );
  }

  test("no-ops when no AI provider is configured", async () => {
    delete process.env.I18N_TRANSLATION_COMMAND;
    writePo();
    await fillUntranslatedEntries(poPath(), "hu", CONFIG_DEFAULTS.provider);
    const entries = parsePo(readFileSync(poPath(), "utf8"));
    expect(entries.find((e) => e.msgid === "Back")?.msgstr).toBe("");
  });

  test("fills empty msgstr entries via the configured AI command", async () => {
    installFakeProvider('{"0":"Vissza"}');
    writePo();
    await fillUntranslatedEntries(poPath(), "hu", CONFIG_DEFAULTS.provider);
    const entries = parsePo(readFileSync(poPath(), "utf8"));
    expect(entries.find((e) => e.msgid === "Back")?.msgstr).toBe("Vissza");
    expect(entries.find((e) => e.msgid === "Cancel")?.msgstr).toBe("Mégse");
  });

  test("leaves entries untranslated when the AI response has no usable value", async () => {
    installFakeProvider("not json");
    writePo();
    await fillUntranslatedEntries(poPath(), "hu", CONFIG_DEFAULTS.provider);
    const entries = parsePo(readFileSync(poPath(), "utf8"));
    expect(entries.find((e) => e.msgid === "Back")?.msgstr).toBe("");
  });

  test("does not touch an already-translated entry", async () => {
    installFakeProvider('{"0":"Vissza"}');
    writePo();
    await fillUntranslatedEntries(poPath(), "hu", CONFIG_DEFAULTS.provider);
    const entries = parsePo(readFileSync(poPath(), "utf8"));
    expect(entries.find((e) => e.msgid === "Cancel")?.msgstr).toBe("Mégse");
  });

  test("force retranslates an entry that already has a msgstr", async () => {
    installFakeProvider('{"0":"Vissza","1":"Új"}');
    writePo();
    await fillUntranslatedEntries(poPath(), "hu", CONFIG_DEFAULTS.provider, { force: true });
    const entries = parsePo(readFileSync(poPath(), "utf8"));
    expect(entries.find((e) => e.msgid === "Cancel")?.msgstr).toBe("Új");
  });

  test("keeps at most `concurrency` provider calls in flight", async () => {
    installConcurrencyProbe();
    writeFileSync(
      poPath(),
      Array.from({ length: 4 }, (_, i) =>
        ["#, no-c-format", `msgid "Message ${String(i)}"`, 'msgstr ""'].join("\n"),
      ).join("\n\n"),
    );
    // A tiny budget forces one chunk per entry, so concurrency is what bounds the calls.
    await fillUntranslatedEntries(
      poPath(),
      "hu",
      { ...CONFIG_DEFAULTS.provider, batchBudget: 1 },
      { concurrency: 2 },
    );
    expect(peakConcurrency()).toBe(2);
  });
});

describe("resolveProviderInvocation", () => {
  test("returns undefined when neither an env command nor a profile is available", () => {
    delete process.env.I18N_TRANSLATION_COMMAND;
    expect(resolveProviderInvocation(CONFIG_DEFAULTS.provider)).toBeUndefined();
  });

  test("resolves a profile's command, model, effort, and concurrency", () => {
    delete process.env.I18N_TRANSLATION_COMMAND;
    const invocation = resolveProviderInvocation(CONFIG_DEFAULTS.provider, {
      profile: "claude",
    });
    expect(invocation).toEqual({
      command: "claude",
      args: ["--model", "claude-haiku-4-5-20251001", "--effort", "low"],
      concurrency: 8,
    });
  });

  test("resolves a profile's relative command path against the config directory", () => {
    delete process.env.I18N_TRANSLATION_COMMAND;
    const invocation = resolveProviderInvocation(CONFIG_DEFAULTS.provider, {
      profile: "copilot",
      configDir: "/repo",
    });
    expect(invocation?.command).toBe("/repo/tools/translation-adapters/copilot-wrapper.sh");
  });

  test("the env command still wins over a requested profile", () => {
    process.env.I18N_TRANSLATION_COMMAND = "my-command";
    delete process.env.I18N_TRANSLATION_COMMAND_ARGS;
    expect(resolveProviderInvocation(CONFIG_DEFAULTS.provider, { profile: "claude" })).toEqual({
      command: "my-command",
      args: [],
      concurrency: 8,
    });
  });

  test("an explicit concurrency overrides the profile's", () => {
    delete process.env.I18N_TRANSLATION_COMMAND;
    expect(
      resolveProviderInvocation(CONFIG_DEFAULTS.provider, { profile: "claude", concurrency: 2 })
        ?.concurrency,
    ).toBe(2);
  });

  test("throws on an unknown profile name", () => {
    expect(() => resolveProviderInvocation(CONFIG_DEFAULTS.provider, { profile: "nope" })).toThrow(
      /Unknown provider profile "nope"/u,
    );
  });
});
