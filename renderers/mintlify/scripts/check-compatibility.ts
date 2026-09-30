import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { tokens } from "@pantoken/tokens";
import { toMintlifyConfig } from "../dist/index.mjs";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Validate a minimal Mintlify site using the real generated Pantoken docs.json theme fields. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^4\.\d+\.\d+$/u.test(version))
    throw new Error(`Invalid Mintlify CLI 4 release: ${version}`);
  await withTargetVersion("@mintlify/cli", version, async (_require, directory) => {
    const cli = join(directory, "node_modules/@mintlify/cli/bin/index.js");
    const theme = toMintlifyConfig(tokens);
    mkdirSync(join(directory, "docs"), { recursive: true });
    writeFileSync(
      join(directory, "docs/docs.json"),
      `${JSON.stringify(
        {
          $schema: "https://mintlify.com/docs.json",
          name: "Pantoken compatibility",
          theme: "mint",
          ...theme,
          navigation: { groups: [{ group: "Guide", pages: ["index"] }] },
        },
        null,
        2,
      )}\n`,
    );
    writeFileSync(join(directory, "docs/index.mdx"), "# Compatibility\n\nMintlify build check.\n");
    const result = spawnSync(process.execPath, [cli, "validate"], {
      cwd: join(directory, "docs"),
      encoding: "utf8",
      env: { ...process.env, MINTLIFY_TELEMETRY: "false" },
    });
    if (result.error || result.status !== 0) {
      throw new Error(
        (result.error?.message ?? result.stderr) || `Mintlify validate exited ${result.status}`,
      );
    }
    const parsed = JSON.parse(readFileSync(join(directory, "docs/docs.json"), "utf8")) as {
      colors: { primary: string };
      background: { color: { light: string; dark: string } };
    };
    if (!parsed.colors.primary.startsWith("#") || !parsed.background.color.dark.startsWith("#")) {
      throw new Error(`Mintlify ${version} did not accept the concrete Pantoken theme colors`);
    }
    console.log(`✓ Mintlify CLI ${version}: docs.json theme validated`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/mintlify"))
    await checkCompatibility(release);
}
