/**
 * The class-prefix sentinel used by the `.css`-authored component records.
 *
 * Static components are authored as real `.css` files (under `src/components/`, `src/utilities/`) where
 * the class prefix is written as this sentinel — `.pfx-alert`, not `.${p}alert`. At build time a single
 * `replaceAll(SENTINEL, ns(prefix))` swaps it for the real namespace: `"instui-"` (→ `.instui-alert`) or
 * `""` (→ `.alert`). The swap happens INSIDE each record's `css: (p) => …` builder, before the alias
 * post-processors run, so the rest of the pipeline (`define.ts`, `aliases.ts`) sees the real prefix and
 * behaves exactly as it did when the prefix was interpolated directly.
 *
 * Four properties make a blind `replaceAll` correct AND keep the source `.css` lintable by cssdoc:
 * 1. **It appears ONLY where a class prefix belongs.** Token references are `--instui-*`, internal
 *    custom properties are `--pantoken-*`, and keyframes are `pantoken-*` — none contain `pfx-`. A naive
 *    `instui-` sentinel would corrupt every `var(--instui-*)`; a dedicated token has no such collision.
 * 2. **The trailing dash is part of the token.** Author `.pfx-alert` (not `.pfx-` + `-alert`), so the
 *    unprefixed replace (`"pfx-"` → `""`) leaves a valid `.alert`, never a stray `.-alert`.
 * 3. **It is valid CSS in a class-selector position**, so stylelint/cssdoc parse the source `.css`.
 * 4. **It MUST start with a lowercase letter.** cssdoc's base-class inference strips an uppercase-led
 *    namespace (`.PFX-alert` → inferred class `.alert`) but keeps a lowercase one (`.pfx-alert` stays
 *    `.pfx-alert`, exactly like `.instui-alert`). With an uppercase sentinel the inferred base class no
 *    longer matches the verbatim `@structure` selectors, so `cssdoc/valid-doc-comments` fails on the
 *    source `.css`. Lowercase-first makes cssdoc treat the sentinel exactly like the real `instui-` prefix.
 *
 * A guard test asserts `SENTINEL` never survives into any emitted sheet and never occurs in a token name.
 */
export const SENTINEL = "pfx-";
