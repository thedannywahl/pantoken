/**
 * CodeMirror HTML autocomplete extension for pantoken component and modifier classes.
 *
 * \@module
 */
import { autocompletion, type Completion, type CompletionContext } from "@codemirror/autocomplete";
import { syntaxTree } from "@codemirror/language";
import type { CssDocEntry } from "../cssdoc/model.js";
import { findEntryByClassToken, getApplicableModifiers } from "../cssdoc/model.js";

/** Configuration options for the pantoken HTML autocomplete extension. */
export interface AutocompleteOptions {
  /** Cssdoc component and global utility records available to the editor. */
  model: CssDocEntry[];
}

interface ClassContext {
  from: number;
  partial: string;
  tokens: string[];
}

function classContextAt(context: CompletionContext): ClassContext | undefined {
  let node: ReturnType<typeof syntaxTree>["topNode"] | null = syntaxTree(
    context.state,
  ).resolveInner(context.pos, -1);
  while (node && node.name !== "Attribute") node = node.parent;
  if (!node) return undefined;

  const attribute = context.state.sliceDoc(node.from, node.to);
  const match = /^class\s*=\s*(["'])([\s\S]*)$/u.exec(attribute);
  if (!match) return undefined;

  const valueStart = node.from + attribute.indexOf(match[1]) + 1;
  const valueEnd = valueStart + match[2].replace(new RegExp(`${match[1]}$`, "u"), "").length;
  if (context.pos < valueStart || context.pos > valueEnd) return undefined;

  const valueBeforeCursor = context.state.sliceDoc(valueStart, context.pos);
  const partial = /[^\s]*$/u.exec(valueBeforeCursor)?.[0] ?? "";
  const fullValue = context.state.sliceDoc(valueStart, valueEnd);
  return {
    from: context.pos - partial.length,
    partial,
    tokens: fullValue.split(/\s+/u).filter(Boolean),
  };
}

function isComponentEntry(entry: CssDocEntry): boolean {
  const kind = entry.kind as string;
  return kind === "component" || kind === "custom-component";
}

function componentCompletions(model: readonly CssDocEntry[], existing: Set<string>): Completion[] {
  return model
    .filter((entry) => entry.className.startsWith(".instui-"))
    .map((entry) => ({
      label: entry.className.slice(1),
      detail: entry.kind,
      type: "class",
      info: entry.summary ?? "",
    }))
    .filter((completion) => !existing.has(completion.label));
}

function modifierCompletions(
  entry: CssDocEntry,
  model: readonly CssDocEntry[],
  existing: Set<string>,
  partial: string,
): Completion[] {
  return getApplicableModifiers(entry.name, model)
    .filter(({ modifier }) => !existing.has(modifier.name))
    .filter(({ modifier }) => modifier.name.startsWith(partial))
    .map(({ modifier, source, scope }) => ({
      label: modifier.name,
      detail: scope === "utility" ? `${source.name} · ${modifier.prop}` : modifier.prop,
      type: "class",
      info: modifier.description ?? source.summary ?? "",
    }));
}

/** Create a CodeMirror 6 completion extension for pantoken classes in HTML `class` attributes. */
export function pantokenHtmlCompletion(options: AutocompleteOptions) {
  return autocompletion({
    override: [
      (context: CompletionContext) => {
        const classContext = classContextAt(context);
        if (!classContext) return null;

        const { from, partial, tokens } = classContext;
        const existing = new Set(tokens.filter((token) => token !== partial));
        if (partial.startsWith("instui-")) {
          return {
            from,
            options: componentCompletions(options.model, existing),
            validFor: /instui-[\w-]*/u,
          };
        }

        if (!partial.startsWith("-")) return null;
        const component = tokens
          .map((token) => findEntryByClassToken(token, options.model))
          .find((entry): entry is CssDocEntry => Boolean(entry && isComponentEntry(entry)));
        if (!component) return null;

        return {
          from,
          options: modifierCompletions(component, options.model, existing, partial),
          filter: false,
          validFor: /-{1,2}[\w-]*/u,
        };
      },
    ],
  });
}
