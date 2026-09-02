import { SENTINEL } from "../../lib/sentinel.ts";
import { rubricNote } from "../../generated/component-styles.ts";
import { htmlTemplate } from "../../lib/html-template.ts";

/**
 * Build the rubric-note layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function rubricNoteRules(prefix = "instui-"): string {
  return rubricNote.replaceAll(SENTINEL, prefix);
}

/**
 * Generate an HTML template for the rubric-note layout.
 */
export function rubricNoteTemplate(prefix = "instui-"): string {
  return htmlTemplate(rubricNoteRules(prefix), { prefix, layoutName: "rubric-note" });
}
