import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

interface Processor {
  use(plugin: unknown): Processor;
  process(input: string): Promise<{ toString(): string }>;
}

/** Parse, transform, and serialize an icon through an exact rehype release. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^13\.0\.\d+$/u.test(version)) throw new Error(`Invalid rehype 13 release: ${version}`);
  await withTargetVersion(
    "rehype",
    version,
    async (require) => {
      const { rehype } = require("rehype") as { rehype: () => Processor };
      const { default: rehypeRaw } = require("rehype-raw") as { default: unknown };
      const { rehypePantokenIcons } = await import("../dist/index.mjs");
      const html = String(
        await rehype()
          .use(rehypePantokenIcons)
          .use(rehypeRaw)
          .process("<p>go :arrow-left: back</p>"),
      );
      if (!html.includes('data-pantoken-icon="arrow-left"') || !html.includes("<svg")) {
        throw new Error(`rehype ${version} did not serialize the resolved icon SVG`);
      }
      console.log(`✓ rehype ${version}: parsed and serialized the resolved SVG`);
    },
    ["rehype-raw@7.0.0"],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/rehype"))
    await checkCompatibility(release);
}
