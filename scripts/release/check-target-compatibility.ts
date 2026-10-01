import fs from "node:fs/promises";
import path from "node:path";

type RecordValue = { status: string };

const ROOT = path.resolve(new URL("../../", import.meta.url).pathname);
const ADAPTER_ROOTS = ["bundlers", "platforms", "renderers"];

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await fs.readFile(file, "utf8")) as T;
}

async function adapterDirectories(root: string): Promise<string[]> {
  const directories: string[] = [];
  for (const category of ADAPTER_ROOTS) {
    for (const entry of await fs.readdir(path.join(root, category), { withFileTypes: true })) {
      if (entry.isDirectory()) directories.push(path.join(root, category, entry.name));
    }
  }
  return directories;
}

async function main(): Promise<void> {
  const registry = await readJson<Record<string, RecordValue>>(
    path.join(ROOT, "scripts/release/target-compatibility.json"),
  );
  const errors: string[] = [];
  for (const directory of await adapterDirectories(ROOT)) {
    const packagePath = path.join(directory, "package.json");
    const packageJson = await readJson<{ name: string }>(packagePath);
    const scriptPath = (await fs
      .stat(path.join(directory, "scripts/check-compatibility.ts"))
      .catch(() => null))
      ? path.join(directory, "scripts/check-compatibility.ts")
      : (await fs.stat(path.join(directory, "scripts/check-runtime.ts")).catch(() => null))
        ? path.join(directory, "scripts/check-runtime.ts")
        : null;
    if (!scriptPath) continue;
    const record = registry[packageJson.name];
    if (!record) {
      errors.push(`${packageJson.name}: compatibility script has no target registry record`);
      continue;
    }
    if (record.status === "unverified") {
      errors.push(`${packageJson.name}: compatibility script exists but target is unverified`);
      continue;
    }
    const source = await fs.readFile(scriptPath, "utf8");
    if (!source.includes("commandTargetVersions") && !source.includes("targetEnvironments")) {
      errors.push(
        `${packageJson.name}: ${path.relative(ROOT, scriptPath)} does not read target-compatibility`,
      );
    }
  }
  if (errors.length > 0) throw new Error(errors.join("\n"));
  console.log(
    "✓ target compatibility: every adapter check is connected to target-compatibility.json",
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
