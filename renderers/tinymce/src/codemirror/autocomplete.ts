/**
 * CodeMirror HTML autocomplete extension for pantoken tokens.
 * Provides completions for component names, modifiers, and modifier values.
 * Activates when typing `.instui-` in a class attribute.
 *
 * \@module
 */
import { autocompletion, Completion } from "@codemirror/autocomplete";
import type { CompletionContext } from "@codemirror/autocomplete";
import type { CssDocEntry } from "../cssdoc/model.js";
import { listComponents, listUtilities, getModifierSuggestions } from "../cssdoc/model.js";

/**
 * Configuration options for the pantoken HTML autocomplete extension.
 */
export interface AutocompleteOptions {
  model: CssDocEntry[];
}

/**
 * Create a CodeMirror 6 autocomplete extension for pantoken HTML.
 * Provides completions for component names and their modifiers.
 *
 * Usage:
 *   new EditorView(\{
 *     extensions: [
 *       basicSetup,
 *       html(),
 *       pantokenHtmlCompletion(\{ model \}),
 *     ],
 *   \});
 */
export function pantokenHtmlCompletion(options: AutocompleteOptions) {
  return autocompletion({
    override: [
      (context: CompletionContext) => {
        // Check if we're in a class attribute.
        const { state, pos } = context;
        const line = state.doc.lineAt(pos);
        const lineText = line.text;
        const posInLine = pos - line.from;

        // Check if we're inside a class="..." or class='...'
        const classMatch = /class=["']([^"']*)/g.exec(lineText);
        if (!classMatch || posInLine < classMatch.index + classMatch[0].length) {
          return null; // Not in a class attribute
        }

        // Extract the partial class string being typed.
        const classString = classMatch[1];
        const lastSpace = classString.lastIndexOf(" ");
        const partial = lastSpace === -1 ? classString : classString.slice(lastSpace + 1);

        // Only provide completions for instui-* tokens.
        if (!partial.startsWith("instui-")) {
          return null;
        }

        // Generate completions based on the partial token.
        const completions = generateCompletions(partial, options.model);

        // Anchor `from` at the last "-" boundary (or right after "instui-" for a bare component
        // name), not at the start of the whole typed token — CodeMirror's default fuzzy matcher
        // filters options against the text between `from` and `pos`, and none of our option
        // labels include the "instui-" prefix or earlier segments.
        const lastDash = partial.lastIndexOf("-");
        const matchLength = partial.length - (lastDash + 1);

        return {
          from: pos - matchLength,
          options: completions,
        };
      },
    ],
  });
}

/**
 * Generate completion suggestions for a partial pantoken token.
 * Handles three cases:
 * 1. `instui-` → component/utility names
 * 2. `instui-button-` → modifier suggestions for that component
 * 3. `instui-button.-color-` → values for that modifier
 */
function generateCompletions(partial: string, _model: CssDocEntry[]): Completion[] {
  const completions: Completion[] = [];

  // Case 1: Completing component name (instui-abc...)
  if (!partial.includes("-", "instui-".length)) {
    // Extract what's being typed after "instui-"
    const prefix = partial.slice("instui-".length).toLowerCase();

    // Get all components and utilities that match the prefix.
    const allItems = [...listComponents(), ...listUtilities()];
    for (const item of allItems) {
      if (item.name.toLowerCase().startsWith(prefix)) {
        completions.push({
          label: item.name,
          detail: item.kind,
          type: "class",
          info: (item as any).description || "",
        });
      }
    }

    return completions;
  }

  // Case 2/3: Completing modifiers (instui-button-...)
  const parts = partial.split("-");
  const componentName = parts[1]; // e.g., "button" from "instui-button-..."

  // If we have a valid component, provide modifier suggestions.
  const mods = getModifierSuggestions(componentName);
  for (const mod of mods) {
    // Provide modifier completions like "-color-" or "-color-primary"
    const modPrefix = mod.value
      ? `${mod.name}-`.split("-").slice(0, 2).join("-") // e.g., "-color-"
      : mod.name;

    completions.push({
      label: modPrefix,
      detail: mod.prop || "modifier",
      type: "class",
      info: mod.description || "",
    });
  }

  return completions;
}
