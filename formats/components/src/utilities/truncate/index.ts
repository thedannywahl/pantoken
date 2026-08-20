/**
 * The truncate utility — ellipsis truncation with line clamping controlled by `--lines`, as composable,
 * globally-available classes (bare, or chained onto any component) — moved from `truncate`'s former
 * standalone component record.
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalSelectors } from "../../lib/global-alias.ts";

const MAX_LINES = [1, 2, 3, 4, 5] as const;

/** Selector list for the base `-truncate` class (or one of its sub-modifiers), bare + chained onto every real component. */
const truncateSelectors = (p: string, extraModifier = ""): string[] =>
  globalSelectors(p, `.${p}truncate${extraModifier}`, `.-truncate${extraModifier}`);

/** The truncate utility — ellipsis truncation with line clamping, as composable, global classes. */
export const truncate: Definition = defineUtility({
  name: "truncate",
  css: (p) => {
    const base = truncateSelectors(p).join(", ");
    const character = truncateSelectors(p, ".-truncate-character").join(", ");
    const word = truncateSelectors(p, ".-truncate-word").join(", ");
    const maxLinesRules = MAX_LINES.map((n) => {
      const selectors = [
        ...truncateSelectors(p, `.-max-lines-${n}`),
        ...truncateSelectors(p, `.-lines-${n}`),
      ];
      return `${selectors.join(", ")} { --lines: ${n}; }`;
    });
    // prettier-ignore
    return css`/**
 * @utility truncate
 * @selector .instui-truncate
 * @global
 * @summary Ellipsis truncation with line clamping controlled by \`--lines\` — usable bare or chained onto any component (\`.instui-button.-truncate\`).
 * @remarks The base class uses \`display: -webkit-box\` and reads the \`--lines\` custom property to clamp text to a fixed number of lines before it ends in an ellipsis.
 * @modifier -truncate-character — (default) Truncate at the character level.
 * @modifier -truncate-word — Truncate at the word level.
 * @modifier -max-lines-1 — Clamp to one line (default).
 * @modifier -max-lines-2 — Clamp to two lines.
 * @modifier -max-lines-3 — Clamp to three lines.
 * @modifier -max-lines-4 — Clamp to four lines.
 * @modifier -max-lines-5 — Clamp to five lines.
 * @modifier -max-lines-auto - @interaction — Clamp to the number of lines that fit in the container, based on its height and the line height of the text.
 * @modifier -lines-1 — Alias of \`-max-lines-1\`.
 * @modifier -lines-2 — Alias of \`-max-lines-2\`.
 * @modifier -lines-3 — Alias of \`-max-lines-3\`.
 * @modifier -lines-4 — Alias of \`-max-lines-4\`.
 * @modifier -lines-5 — Alias of \`-max-lines-5\`.
 * @compat Clamping relies on \`-webkit-line-clamp\` with \`display: -webkit-box\`, paired with the standard \`line-clamp\`.
 * @example
 * <div class="instui-truncate">This text is clamped to one line by default and ends in an ellipsis.</div>
 * <div class="instui-truncate" style="--lines: 3">This text is clamped to three lines and ends in an ellipsis.</div>
 * <button class="instui-button -truncate">…</button>
 * @related text — Body typography that this truncates.
 */

@property --lines {
  syntax: "<integer>";
  inherits: false;
  initial-value: 1;
}

@property --ellipsis {
  /* Keep the strictest grammar our current CSS parser accepts.
     \`fade()\` is valid per modern specs/MDN but currently rejected in this
     descriptor by the toolchain parser during pack/build. */
  syntax: "clip | ellipsis | <string> | fade";
  inherits: false;
  initial-value: ellipsis;
}

${base} {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--lines, 1);
  line-clamp: var(--lines, 1);
  overflow: hidden;
  text-overflow: var(--ellipsis);
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-all;
  font-family: var(--instui-component-truncate-text-font-family);
  line-height: var(--instui-component-truncate-text-line-height);
}

${character} { word-break: break-all; }

${word} { word-break: break-word; }

${maxLinesRules.join("\n\n")}`;
  },
});

/** The truncate utility as a standalone, header-wrapped stylesheet. */
export const truncateCss: Definition["css"] = truncate.css;
