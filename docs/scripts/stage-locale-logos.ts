/**
 * Stage the localized nav wordmarks into `docs/public/`.
 *
 * The default-theme nav logo is per-locale for scripts that have a purpose-drawn wordmark (see
 * `NON_LATIN_LOCALES` in `.vitepress/i18n.ts`, which config.ts turns into
 * `/logo-{light,dark}-<script>.svg`). Those files aren't committed — `docs/public/` is git-ignored
 * apart from the two Latin marks — so they're copied here from `@pantoken/plugin-logos`' vendored
 * asset set on every `docs:assets` run, which keeps a fresh clone and CI in the same state as a local
 * working tree.
 *
 * @module
 */
import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { NON_LATIN_LOCALES } from "../.vitepress/i18n.ts";

const logoAsset = (name: string): string =>
  fileURLToPath(
    new URL(`../../plugins/pantoken/logos/assets/logos/pantoken/${name}.svg`, import.meta.url),
  );
const publicLogo = (name: string): string =>
  fileURLToPath(new URL(`../public/${name}.svg`, import.meta.url));

// `zh-Hans` and `zh-Hant` share one Han mark, so de-duplicate to script suffixes.
const scripts = [...new Set(Object.values(NON_LATIN_LOCALES))];

for (const script of scripts) {
  copyFileSync(logoAsset(`horizontal-full-color-${script}`), publicLogo(`logo-light-${script}`));
  copyFileSync(logoAsset(`horizontal-reversed-${script}`), publicLogo(`logo-dark-${script}`));
}

console.log(`✓ staged ${scripts.length * 2} localized nav wordmarks → docs/public/`);
