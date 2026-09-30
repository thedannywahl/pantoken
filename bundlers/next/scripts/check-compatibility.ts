import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

const instructureVersion = "11.7.7";

/** Build a real Next app that renders an Instructure component through withPantoken's transpile list. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^16\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Next 16 release: ${version}`);
  await withTargetVersion(
    "next",
    version,
    async (_require, directory) => {
      const nextPackage = JSON.parse(
        readFileSync(join(directory, "node_modules/next/package.json"), "utf8"),
      ) as {
        bin: string | Record<string, string>;
      };
      const nextBin = typeof nextPackage.bin === "string" ? nextPackage.bin : nextPackage.bin.next;
      const adapter = fileURLToPath(new URL("../dist/index.mjs", import.meta.url));
      writeFileSync(
        join(directory, "next.config.mjs"),
        `import { withPantoken } from ${JSON.stringify(adapter)};
export default withPantoken({ output: "export" });
`,
      );
      mkdirSync(join(directory, "app"), { recursive: true });
      writeFileSync(
        join(directory, "app/layout.jsx"),
        "export default function RootLayout({ children }) { return <html><body>{children}</body></html>; }\n",
      );
      writeFileSync(
        join(directory, "app/page.jsx"),
        '"use client";\nimport { Button } from "@instructure/ui-buttons";\nexport default function Page() { return <Button>Instructure build passed</Button>; }\n',
      );
      const result = spawnSync(
        process.execPath,
        [join(directory, "node_modules/next", nextBin), "build", "--webpack"],
        {
          cwd: directory,
          encoding: "utf8",
          env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
        },
      );
      if (result.error || result.status !== 0) {
        throw new Error(
          (result.error?.message ?? result.stderr) || `Next build exited ${result.status}`,
        );
      }
      const htmlPath = join(directory, "out/index.html");
      if (!existsSync(htmlPath)) throw new Error(`Next ${version} did not export index.html`);
      const html = readFileSync(htmlPath, "utf8");
      if (!html.includes("Instructure build passed")) {
        throw new Error(`Next ${version} did not render the transpiled Instructure button`);
      }
      console.log(`✓ Next ${version}: Instructure UI button compiled and rendered`);
    },
    ["react@19.3.0", "react-dom@19.3.0", `@instructure/ui-buttons@${instructureVersion}`],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/next")) await checkCompatibility(release);
}
