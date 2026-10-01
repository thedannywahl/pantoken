import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Render icon and color syntax with a separately installed markdown-it release. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^(?:14|15)\.\d+\.\d+$/u.test(version)) {
    throw new Error(`Invalid markdown-it release: ${version}`);
  }
  await withTargetVersion("markdown-it", version, async (require) => {
    const MarkdownIt = require("markdown-it") as typeof import("markdown-it").default;
    const { pantokenMarkdownIt } = await import("../dist/index.mjs");
    const html = new MarkdownIt().use(pantokenMarkdownIt).render("Save :check: with #03893D.");
    if (
      !html.includes('data-pantoken-icon="check"') ||
      !html.includes('data-color-code="#03893D"')
    ) {
      throw new Error(`markdown-it ${version} did not render icon and color tokens`);
    }
    console.log(`✓ markdown-it ${version}: rendered icon and color tokens`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/markdown-it"))
    await checkCompatibility(release);
}
