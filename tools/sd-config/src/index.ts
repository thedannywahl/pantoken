/**
 * Shared Style Dictionary setup for pantoken's native emitters. It takes the concrete, resolved
 * dictionary produced by `@pantoken/core`'s `toStyleDictionary()` and builds a platform's source
 * file (Swift now; Compose / Flutter / SCSS / JSON as they come online).
 *
 * `@tokens-studio/sd-transforms` is a dependency for the future raw-JSON lineage; the current path
 * feeds SD pre-resolved values, so built-in transform groups are enough.
 *
 * @module
 * @beta
 */
import { join } from "node:path";
import StyleDictionary from "style-dictionary";

/** A flat, concrete Style Dictionary dictionary (from `@pantoken/core`'s `toStyleDictionary`). */
export type SdDictionary = Record<string, { value: string; type: string }>;

/** A native platform pantoken can emit. */
export interface NativePlatform {
  transformGroup: string;
  format: string;
  ext: string;
}

/** The supported native platforms and their Style Dictionary wiring. */
export const PLATFORMS: Record<string, NativePlatform> = {
  swift: { transformGroup: "ios-swift", format: "ios-swift/class.swift", ext: "swift" },
  compose: { transformGroup: "compose", format: "compose/object", ext: "kt" },
  flutter: { transformGroup: "flutter", format: "flutter/class.dart", ext: "dart" },
  scss: { transformGroup: "scss", format: "scss/variables", ext: "scss" },
  json: { transformGroup: "js", format: "json/flat", ext: "json" },
  // Android emits two resource files; the emitter pre-filters the dictionary per file.
  "android-colors": { transformGroup: "android", format: "android/colors", ext: "xml" },
  "android-dimens": { transformGroup: "android", format: "android/dimens", ext: "xml" },
};

/** Options for {@link buildPlatform}. */
export interface BuildPlatformOptions {
  /** The concrete token dictionary. */
  dictionary: SdDictionary;
  /** The platform key (see {@link PLATFORMS}). */
  platform: string;
  /** The output directory. */
  outDir: string;
  /** The generated class/object name (default: `PanTokens`). */
  className?: string;
  /** The output file base name (default: `Tokens`). */
  fileName?: string;
}

/**
 * Build a native source file for one platform via Style Dictionary.
 *
 * @param options - {@link BuildPlatformOptions}.
 * @returns The path of the written file.
 */
export async function buildPlatform(options: BuildPlatformOptions): Promise<string> {
  const platform = PLATFORMS[options.platform];
  if (!platform) throw new Error(`Unknown pantoken native platform: ${options.platform}`);
  const className = options.className ?? "PanTokens";
  const fileName = options.fileName ?? "Tokens";
  const buildPath = options.outDir.endsWith("/") ? options.outDir : `${options.outDir}/`;

  const config = {
    tokens: options.dictionary,
    platforms: {
      [options.platform]: {
        transformGroup: platform.transformGroup,
        buildPath,
        files: [
          {
            destination: `${fileName}.${platform.ext}`,
            format: platform.format,
            options: { className, packageName: className, showFileHeader: true },
          },
        ],
      },
    },
    log: { verbosity: "silent" },
  };
  const sd = new StyleDictionary(
    config as unknown as ConstructorParameters<typeof StyleDictionary>[0],
  );

  await sd.buildAllPlatforms();
  return join(options.outDir, `${fileName}.${platform.ext}`);
}
