/**
 * The class-prefix sentinel used in `.css`-authored layout records.
 *
 * Authored as `.pfx-layout`, replaced at build time with the real prefix (`"instui-"` → `.instui-layout`
 * or `""` → `.layout`). The same four properties that make it safe in `@pantoken/components` apply here:
 * no collision with `--instui-*` token references, the trailing dash is part of the token, it is valid
 * CSS in a class-selector position, and it is lowercase-first so cssdoc's base-class inference works.
 *
 * @see `formats/components/src/lib/sentinel.ts` for the full rationale.
 */
export const SENTINEL = "pfx-";
