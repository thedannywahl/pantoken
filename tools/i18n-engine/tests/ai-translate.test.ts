import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import { CONFIG_DEFAULTS } from "../src/config.ts";
import {
  aiProviderConfigured,
  fillUntranslatedEntries,
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
});
