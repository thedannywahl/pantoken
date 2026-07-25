import { mergeConfig, type ViteUserConfig } from "vite-plus";

/**
 * The workspace input for a `vp pack` build: everything, minus `node_modules/.modules.yaml` — that
 * file is rewritten by every CI reinstall, so excluding it keeps `vp pack` a cache hit across jobs
 * instead of re-packing on every run.
 */
const packInput = [{ auto: true }, { pattern: "!node_modules/.modules.yaml", base: "workspace" }];

/**
 * The shared vite-plus config for a publishable package. It owns the settings identical across the
 * whole workspace — the pack input, type-aware lint, formatting, and `pack.dts` — so each package's
 * config only supplies its build command and pack specifics via {@link extendBase}.
 *
 * It deliberately omits `run.tasks.build.command`: that varies per package (some prepend
 * `vp run generate`), and `mergeConfig` concatenates arrays, so a command in the base would be
 * prepended to an override's command array rather than replaced. Keeping it out means the override
 * always supplies the command cleanly. It's a plain object (not `defineConfig`) because the `build`
 * task intentionally has no `command`, which `defineConfig`'s task type rejects; {@link extendBase}
 * merges it structurally, so it only needs the right runtime shape.
 */
const baseConfig = {
  run: { tasks: { build: { input: packInput } } },
  pack: { dts: true },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {},
};

/**
 * Extend the shared {@link baseConfig} with a package's own settings (its build command and pack
 * specifics), returning the merged config to `export default`. The casts bridge `mergeConfig`, whose
 * types don't accept `defineConfig`'s overloaded return.
 *
 * @param overrides - The package-specific config merged onto the base.
 * @returns The merged vite-plus config.
 */
export function extendBase(overrides: ViteUserConfig): ViteUserConfig {
  return mergeConfig(
    baseConfig as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>,
  ) as ViteUserConfig;
}
