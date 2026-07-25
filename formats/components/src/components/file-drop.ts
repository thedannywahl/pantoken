import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { fileDrop as fileDropRaw } from "../generated/component-styles.ts";

/** The `fileDrop` component record: a file dropzone with hover, accepted, and rejected states. */
export const fileDrop = defineComponent({
  name: "file-drop",
  css: (p) => fileDropRaw.replaceAll(SENTINEL, p),
});
/** Standalone `fileDrop` stylesheet — the prefixed CSS for the file dropzone, ready to ship as a `.css` file. */
export const fileDropCss = fileDrop.css;
