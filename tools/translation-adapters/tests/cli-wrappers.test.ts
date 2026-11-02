import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vite-plus/test";

test.each([
  { command: "copilot", flags: ["--silent", "--no-color"], status: 0 },
  { command: "copilot", flags: ["--silent", "--no-color"], status: 7 },
  { command: "agy", flags: [], status: 0 },
  { command: "agy", flags: [], status: 7 },
])(
  "$command forwards flags, piped prompt, and exit status $status",
  ({ command, flags, status }) => {
    const wrapper = fileURLToPath(new URL(`../${command}-wrapper.sh`, import.meta.url));
    const directory = mkdtempSync(join(tmpdir(), `pantoken-${command}-wrapper-`));
    try {
      writeFileSync(
        join(directory, command),
        [
          "#!/usr/bin/env bash",
          'printf "%s\\n" "$@"',
          "if IFS= read -r line; then exit 99; fi",
          'printf "provider diagnostic\\n" >&2',
          `exit ${status}`,
        ].join("\n"),
        { mode: 0o755 },
      );
      const prompt = "-n Translate this document.\nKeep `code` and $(commands) literal.";
      const result = spawnSync("bash", [wrapper, "--model", "auto", "-p"], {
        input: prompt,
        encoding: "utf8",
        env: { ...process.env, PATH: `${directory}${delimiter}${process.env.PATH}` },
        timeout: 5000,
      });

      expect(result.error).toBeUndefined();
      expect(result.status).toBe(status);
      expect(result.stdout).toBe(["--model", "auto", ...flags, "-p", prompt, ""].join("\n"));
      expect(result.stderr).toBe("provider diagnostic\n");
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  },
);
