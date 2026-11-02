import { format } from "vite-plus/fmt";

/** Match repository formatting without spawning a nested toolchain. */
export async function formatGeneratedFile(source: string, filePath: string): Promise<string> {
  const result = await format(filePath, source);
  if (result.errors.length > 0) {
    throw new Error(`Could not format ${filePath}: ${JSON.stringify(result.errors)}`);
  }
  return result.code;
}
