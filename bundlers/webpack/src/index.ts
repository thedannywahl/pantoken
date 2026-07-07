/**
 * `@pantoken/webpack` — a Webpack plugin that emits the Instructure token stylesheet as a build
 * asset (default `pantoken.css`), so you can reference it from your HTML without importing the large
 * package into a bundle.
 *
 * @module
 */
import { css as pantokenCss } from "@pantoken/css";

/** The minimal Webpack compiler surface this plugin uses (avoids a hard dependency on webpack). */
interface CompilerLike {
  webpack: { sources: { RawSource: new (source: string) => unknown } };
  hooks: {
    thisCompilation: { tap: (name: string, fn: (compilation: CompilationLike) => void) => void };
  };
}
interface CompilationLike {
  hooks: {
    processAssets: { tap: (options: { name: string; stage?: number }, fn: () => void) => void };
  };
  emitAsset: (name: string, source: unknown) => void;
}

/** Options for {@link PantokenWebpackPlugin}. */
export interface PantokenWebpackOptions {
  /** The emitted asset filename (default `"pantoken.css"`). */
  filename?: string;
}

/**
 * Webpack plugin that emits the pantoken stylesheet as an output asset.
 *
 * @example Emit pantoken.css from your webpack.config.js
 * ```js
 * import { PantokenWebpackPlugin } from "@pantoken/webpack";
 *
 * export default {
 *   plugins: [new PantokenWebpackPlugin()],
 * };
 * ```
 *
 * @example Rename the emitted asset
 * ```js
 * import { PantokenWebpackPlugin } from "@pantoken/webpack";
 *
 * export default {
 *   plugins: [new PantokenWebpackPlugin({ filename: "tokens.css" })],
 * };
 * ```
 */
export class PantokenWebpackPlugin {
  private readonly filename: string;

  constructor(options: PantokenWebpackOptions = {}) {
    this.filename = options.filename ?? "pantoken.css";
  }

  apply(compiler: CompilerLike): void {
    const { RawSource } = compiler.webpack.sources;
    compiler.hooks.thisCompilation.tap("@pantoken/webpack", (compilation) => {
      compilation.hooks.processAssets.tap({ name: "@pantoken/webpack" }, () => {
        compilation.emitAsset(this.filename, new RawSource(pantokenCss));
      });
    });
  }
}

export default PantokenWebpackPlugin;
