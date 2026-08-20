/**
 * The transition utility — the CSS behind InstUI's `Transition` utility.
 *
 * InstUI's `Transition` drives enter/exit animations by toggling per-state class names
 * (`…-entering`, `…-entered`, `…-exiting`, `…-exited`) on an element as it mounts and unmounts. This
 * utility emits those rules — a base `.instui-transition` (the animated `transition` property) plus the
 * `fade`, `scale`, and `slide-{up,down,left,right}` type/state classes — and defines the
 * `--instui-transition-duration` / `--instui-transition-timing` tokens.
 *
 * @module
 */
import { defineUtility, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { transition as transitionRaw } from "../../generated/component-styles.ts";

/** The transition utility — animation state classes with three-selector pattern. */
export const transition: Definition = defineUtility({
  name: "transition",
  css: (p) => transitionRaw.replaceAll(SENTINEL, p),
});
