/**
 * CodeMirror HTML linter extension for pantoken tokens.
 * Scans `class` attributes for `.instui-*` class names and validates them against the model.
 * Reports diagnostics for unknown components, utilities, or invalid modifiers.
 *
 * \@module
 */
import { linter, Diagnostic } from "@codemirror/lint";
import type { EditorView } from "@codemirror/view";
import type { CssDocEntry } from "../cssdoc/model.js";
import { validateClassToken } from "../cssdoc/model.js";

/**
 * Configuration options for the pantoken HTML linter.
 */
export interface PantokenLinterOptions {
  model: CssDocEntry[];
}

/**
 * Create a CodeMirror 6 linter extension for pantoken HTML.
 * Validates class attributes containing `.instui-*` tokens.
 *
 * Usage:
 *   new EditorView(\{
 *     extensions: [
 *       basicSetup,
 *       html(),
 *       pantokenHtmlLinter(\{ model \}),
 *     ],
 *   \});
 */
export function pantokenHtmlLinter(_options: PantokenLinterOptions) {
  return linter((view: EditorView) => {
    const diagnostics: Diagnostic[] = [];
    const doc = view.state.doc;
    const text = doc.toString();

    // Regex to find class attributes: class="..."  or class='...'
    const classAttributeRegex = /class=["']([^"']+)["']/g;
    let match;

    while ((match = classAttributeRegex.exec(text)) !== null) {
      const classString = match[1];
      const classes = classString.split(/\s+/).filter((c) => c.length > 0);

      // Check each class token.
      for (const className of classes) {
        if (!className.startsWith("instui-")) {
          // Not a pantoken token, skip it.
          continue;
        }

        // Validate the token.
        const errors = validateClassToken(className);

        // Convert validation errors to CodeMirror diagnostics.
        for (const error of errors) {
          const pos = text.indexOf(className, match.index);
          if (pos !== -1) {
            diagnostics.push({
              from: pos,
              to: pos + className.length,
              severity: "error",
              message: error,
            });
          }
        }
      }
    }

    return diagnostics;
  });
}
