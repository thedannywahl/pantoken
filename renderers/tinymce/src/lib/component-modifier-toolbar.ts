/** A model-driven context toolbar for editing component and global utility modifiers. */
import type { Editor, Ui } from "tinymce";
import type { ApplicableModifier, CssDocEntry } from "../cssdoc/model.js";
import { findEntryByClassToken, getApplicableModifiers } from "../cssdoc/model.js";
import { getEditorStrings } from "../strings.js";

/** Context-toolbar registry name used by the components plugin. */
export const COMPONENT_MODIFIER_CONTEXT_TOOLBAR_NAME = "pantokenComponentModifiersContext";
/** Menu-button registry name referenced by the component context toolbar. */
export const COMPONENT_MODIFIER_MENU_NAME = "pantokenComponentModifiers";

/** The component entry and owning element resolved from a TinyMCE selection. */
export interface ComponentContext {
  /** The nearest selected element carrying the component class. */
  element: Element;
  /** Cssdoc metadata for the component class. */
  entry: CssDocEntry;
}

const DEDICATED_CONTEXT_COMPONENTS = new Set(["icon"]);

function isComponentEntry(entry: CssDocEntry): boolean {
  const kind = entry.kind as string;
  return kind === "component" || kind === "custom-component";
}

/** Resolve the nearest component-owning element, stopping at the editor body. */
export function resolveComponentContext(
  node: Element,
  body: HTMLElement,
  model: readonly CssDocEntry[],
): ComponentContext | undefined {
  let current: Element | null = node;
  while (current) {
    for (const classToken of current.classList) {
      const entry = findEntryByClassToken(classToken, model);
      if (entry && isComponentEntry(entry) && !DEDICATED_CONTEXT_COMPONENTS.has(entry.name)) {
        return { element: current, entry };
      }
    }
    if (current === body) break;
    current = current.parentElement;
  }
  return undefined;
}

function humanize(value: string): string {
  return value
    .replace(/^-+/u, "")
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function selectedContext(
  editor: Editor,
  model: readonly CssDocEntry[],
): ComponentContext | undefined {
  return resolveComponentContext(editor.selection.getNode(), editor.getBody(), model);
}

function isNestedMenuItem(
  item: Ui.Menu.NestedMenuItemContents | undefined,
): item is Ui.Menu.NestedMenuItemSpec {
  return (
    typeof item === "object" && item !== null && "type" in item && item.type === "nestedmenuitem"
  );
}

function mutateClasses(
  editor: Editor,
  mutation: (element: Element) => void,
  model: readonly CssDocEntry[],
): void {
  const context = selectedContext(editor, model);
  if (!context) return;
  editor.undoManager.transact(() => mutation(context.element));
  editor.nodeChanged();
}

function propertyItems(
  editor: Editor,
  model: readonly CssDocEntry[],
  modifiers: ApplicableModifier[],
): Ui.Menu.NestedMenuItemContents[] {
  const active = selectedContext(editor, model)?.element.classList;
  return [
    {
      type: "togglemenuitem",
      text: getEditorStrings(editor).componentModifiersDefault,
      active: !modifiers.some(({ modifier }) => active?.contains(modifier.name)),
      onAction: () => {
        mutateClasses(
          editor,
          (element) => {
            for (const { modifier } of modifiers) element.classList.remove(modifier.name);
          },
          model,
        );
      },
    },
    ...modifiers.map(({ modifier }) => ({
      type: "togglemenuitem" as const,
      text: humanize(modifier.value ?? modifier.name),
      active: active?.contains(modifier.name) ?? false,
      onAction: () => {
        mutateClasses(
          editor,
          (element) => {
            for (const candidate of modifiers) element.classList.remove(candidate.modifier.name);
            element.classList.add(modifier.name);
          },
          model,
        );
      },
    })),
  ];
}

function groupedItems(
  editor: Editor,
  model: readonly CssDocEntry[],
  modifiers: ApplicableModifier[],
): Ui.Menu.NestedMenuItemContents[] {
  const groups = new Map<string, ApplicableModifier[]>();
  const booleans: ApplicableModifier[] = [];
  for (const applicable of modifiers) {
    if (!applicable.modifier.value) {
      booleans.push(applicable);
      continue;
    }
    const group = groups.get(applicable.modifier.prop) ?? [];
    group.push(applicable);
    groups.set(applicable.modifier.prop, group);
  }

  const items: Ui.Menu.NestedMenuItemContents[] = [...groups.entries()].map(([prop, values]) => ({
    type: "nestedmenuitem",
    text: humanize(prop),
    getSubmenuItems: () => propertyItems(editor, model, values),
  }));
  const active = selectedContext(editor, model)?.element.classList;
  if (booleans.length > 0) {
    items.push({
      type: "nestedmenuitem",
      text: getEditorStrings(editor).componentModifiersOptions,
      getSubmenuItems: () =>
        booleans.map(({ modifier }) => ({
          type: "togglemenuitem",
          text: humanize(modifier.name),
          active: active?.contains(modifier.name) ?? false,
          onAction: () => {
            mutateClasses(editor, (element) => element.classList.toggle(modifier.name), model);
          },
        })),
    });
  }
  return items;
}

function menuItems(
  editor: Editor,
  model: readonly CssDocEntry[],
): Ui.Menu.NestedMenuItemContents[] {
  const context = selectedContext(editor, model);
  if (!context) return [];
  const applicable = getApplicableModifiers(context.entry.name, model);
  const componentItems = groupedItems(
    editor,
    model,
    applicable.filter(({ scope }) => scope === "component"),
  );
  const utilities = new Map<string, ApplicableModifier[]>();
  for (const modifier of applicable.filter(({ scope }) => scope === "utility")) {
    const group = utilities.get(modifier.source.name) ?? [];
    group.push(modifier);
    utilities.set(modifier.source.name, group);
  }
  if (utilities.size > 0) {
    componentItems.push({
      type: "nestedmenuitem",
      text: getEditorStrings(editor).componentModifiersUtilities,
      getSubmenuItems: () =>
        [...utilities.entries()].map(([name, modifiers]) => {
          const items = groupedItems(editor, model, modifiers);
          return {
            type: "nestedmenuitem",
            text: humanize(name),
            getSubmenuItems: () =>
              items.length === 1 && isNestedMenuItem(items[0]) ? items[0].getSubmenuItems() : items,
          };
        }),
    });
  }
  return componentItems;
}

/** Register the floating Modifiers menu for known pantoken components. */
export function registerComponentModifierToolbar(
  editor: Editor,
  model: readonly CssDocEntry[],
): void {
  editor.ui.registry.addMenuButton(COMPONENT_MODIFIER_MENU_NAME, {
    icon: "preferences",
    tooltip: getEditorStrings(editor).componentModifiersTooltip,
    fetch: (success) => success(menuItems(editor, model)),
  });
  editor.ui.registry.addContextToolbar(COMPONENT_MODIFIER_CONTEXT_TOOLBAR_NAME, {
    predicate: (node) => Boolean(resolveComponentContext(node, editor.getBody(), model)),
    items: COMPONENT_MODIFIER_MENU_NAME,
    position: "node",
    scope: "node",
  });
}
