import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";

const releases = [
  { angular: "16.2.12", typescript: "5.1.6", zone: "0.13.3" },
  { angular: "22.2.0", typescript: "6.0.3", zone: "0.16.0" },
];

/** Compile a standalone Angular component using the custom-element schema in its template. */
export async function checkCompatibility(
  angular: string,
  typescript: string,
  zone: string,
): Promise<void> {
  if (!/^\d+\.\d+\.\d+$/u.test(angular) || !/^\d+\.\d+\.\d+$/u.test(typescript)) {
    throw new Error(`Invalid Angular/TypeScript releases: ${angular}/${typescript}`);
  }
  await withTargetVersion(
    "@angular/compiler-cli",
    angular,
    async (_require, directory) => {
      const compilerPackage = JSON.parse(
        readFileSync(join(directory, "node_modules/@angular/compiler-cli/package.json"), "utf8"),
      ) as { bin: Record<string, string> };
      const ngc = join(directory, "node_modules/@angular/compiler-cli", compilerPackage.bin.ngc);
      writeFileSync(
        join(directory, "app.ts"),
        `import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
@Component({ selector: "app-root", standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], template: '<instui-icon name="check-mark"></instui-icon>' })
export class AppComponent {}
`,
      );
      const config = join(directory, "tsconfig.json");
      writeFileSync(
        config,
        JSON.stringify({
          compilerOptions: {
            target: "ES2022",
            module: "ES2022",
            moduleResolution: "bundler",
            experimentalDecorators: true,
            strict: true,
            skipLibCheck: true,
            outDir: "out",
          },
          angularCompilerOptions: { strictTemplates: true },
          files: ["app.ts"],
        }),
      );
      const result = spawnSync(process.execPath, [ngc, "-p", config], {
        cwd: directory,
        encoding: "utf8",
      });
      if (result.error || result.status !== 0) {
        throw new Error((result.error?.message ?? result.stderr) || `ngc exited ${result.status}`);
      }
      console.log(
        `✓ Angular ${angular} / TypeScript ${typescript}: CUSTOM_ELEMENTS_SCHEMA compiled`,
      );
    },
    [
      `@angular/compiler@${angular}`,
      `@angular/core@${angular}`,
      `typescript@${typescript}`,
      "rxjs@7.8.2",
      `zone.js@${zone}`,
    ],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) {
    await checkCompatibility(release.angular, release.typescript, release.zone);
  }
}
