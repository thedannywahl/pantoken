import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vite-plus/test";

const wrapper = fileURLToPath(new URL("../copilot-wrapper.sh", import.meta.url));

test.each([0, 7])("forwards response-only flags, prompt, and exit status %i", (status) => {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-copilot-wrapper-"));
  try {
    writeFileSync(
      join(directory, "copilot"),
      [
        "#!/usr/bin/env bash",
        'printf "%s\\n" "$@"',
        "if IFS= read -r line; then exit 99; fi",
        'printf "provider diagnostic\\n" >&2',
        `exit ${status}`,
      ].join("\n"),
      { mode: 0o755 },
    );
    const prompt = "Translate this document.\nKeep `code` and $(commands) literal.";
    const result = spawnSync("bash", [wrapper, "--model", "auto", "-p"], {
      input: prompt,
      encoding: "utf8",
      env: { ...process.env, PATH: `${directory}${delimiter}${process.env.PATH}` },
      timeout: 5000,
    });

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(status);
    expect(result.stdout).toBe(
      ["--model", "auto", "--silent", "--no-color", "-p", prompt, ""].join("\n"),
    );
    expect(result.stderr).toBe("provider diagnostic\n");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
