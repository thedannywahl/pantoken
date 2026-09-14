import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const metaPkgPath = resolve(root, "../pantoken/package.json");
const metaPkg = JSON.parse(readFileSync(metaPkgPath, "utf8"));

const flatPkgPath = join(root, "package.json");
const flatPkg = JSON.parse(readFileSync(flatPkgPath, "utf8"));

const srcDir = join(root, "src");

// Clean existing .ts files in src except index.ts
for (const file of readdirSync(srcDir)) {
  if (file.endsWith(".ts") && file !== "index.ts") {
    writeFileSync(join(srcDir, file), "");
  }
}

// Generate src/index.ts
writeFileSync(
  join(srcDir, "index.ts"),
  `// Re-export all named targets from @pantoken/pantoken\nexport * from "@pantoken/pantoken";\n`,
);

const exportsMap: Record<string, string> = {
  ".": "./dist/index.mjs",
};

for (const key of Object.keys(metaPkg.exports as Record<string, string>)) {
  if (key === "." || key === "./package.json") continue;
  if (key.endsWith(".json")) continue;
  const subpath = key.slice(2);
  writeFileSync(join(srcDir, `${subpath}.ts`), `export * from "@pantoken/pantoken/${subpath}";\n`);
  exportsMap[key] = `./dist/${subpath}.mjs`;
}

exportsMap["./package.json"] = "./package.json";

flatPkg.exports = exportsMap;
writeFileSync(flatPkgPath, JSON.stringify(flatPkg, null, 2) + "\n");
console.log(
  `✓ flat-pantoken: synced ${Object.keys(exportsMap).length} exports from @pantoken/pantoken`,
);
