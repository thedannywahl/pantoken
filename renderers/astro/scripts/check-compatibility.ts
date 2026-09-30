import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

const companions = [
  { starlight: "0.35.0", astro: "5.18.2" },
  { starlight: "0.42.4", astro: "7.3.5" },
];

/** Build a disposable Starlight site and inspect the generated head stylesheet. */
export async function checkCompatibility(starlight: string, astro: string): Promise<void> {
  if (!/^0\.\d+\.\d+$/u.test(starlight) || !/^\d+\.\d+\.\d+$/u.test(astro)) {
    throw new Error(`Invalid Astro/Starlight releases: ${astro}/${starlight}`);
  }
  await withTargetVersion(
    "@astrojs/starlight",
    starlight,
    async (_require, directory) => {
      const astroPackage = JSON.parse(
        readFileSync(join(directory, "node_modules/astro/package.json"), "utf8"),
      ) as { bin: string | Record<string, string> };
      const astroBin =
        typeof astroPackage.bin === "string" ? astroPackage.bin : astroPackage.bin.astro;
      const plugin = fileURLToPath(new URL("../dist/index.mjs", import.meta.url));
      writeFileSync(
        join(directory, "astro.config.mjs"),
        `import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { InstUI } from ${JSON.stringify(plugin)};
export default defineConfig({ site: "https://example.com", integrations: [starlight({ title: "Docs", plugins: [InstUI()] })] });
`,
      );
      mkdirSync(join(directory, "src/content/docs"), { recursive: true });
      writeFileSync(
        join(directory, "src/content.config.ts"),
        `import { defineCollection } from "astro:content";
    import { docsLoader } from "@astrojs/starlight/loaders";
    import { docsSchema } from "@astrojs/starlight/schema";
    export const collections = { docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }) };
    `,
      );
      writeFileSync(
        join(directory, "src/content/docs/index.mdx"),
        "---\ntitle: Home\n---\n# Home\n",
      );
      const result = spawnSync(
        process.execPath,
        [join(directory, "node_modules/astro", astroBin), "build"],
        {
          cwd: directory,
          encoding: "utf8",
          env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
        },
      );
      if (result.error || result.status !== 0) {
        throw new Error(
          (result.error?.message ?? result.stderr) || `Astro build exited ${result.status}`,
        );
      }
      const output = join(directory, "dist/index.html");
      if (!existsSync(output)) {
        throw new Error(
          `Astro ${astro} did not emit index.html (${readdirSync(directory).join(", ")}): ${result.stdout}\n${result.stderr}`,
        );
      }
      const html = readFileSync(output, "utf8");
      if (!html.includes('data-pantoken="base"') || !html.includes("--instui-")) {
        throw new Error(`Starlight ${starlight} did not inject the pantoken stylesheet`);
      }
      console.log(`✓ Starlight ${starlight} / Astro ${astro}: token stylesheet built into HTML`);
    },
    [`astro@${astro}`],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    if (args.length !== 4 || args[0] !== "--version" || args[2] !== "--astro") {
      throw new Error("Use --version <starlight> --astro <astro>");
    }
    await checkCompatibility(args[1], args[3]);
  } else {
    for (const starlight of commandTargetVersions("@pantoken/astro")) {
      const release = companions.find((candidate) => candidate.starlight === starlight);
      if (!release) throw new Error(`Missing Astro companion version for Starlight ${starlight}`);
      await checkCompatibility(release.starlight, release.astro);
    }
  }
}
