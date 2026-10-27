# Component behaviors (@pantoken/interactions)

This document covers authoring behavior modules for `@pantoken/interactions`, the shared behavior extraction layer that powers both CSS-based components (via IIFE bundles) and web components.

## Architecture

Interactions is a three-tier system:

1. **Behaviors** (`src/behaviors/*.ts`) — Pure JS functions that wire up DOM listeners and return cleanup objects. No Node.js imports, no framework dependencies. Shared by CSS IIFEs and web components.
2. **IIFE entry points** (`src/components/*.ts`) — Auto-generated or hand-authored side-effect modules that import a behavior, then register document-level listeners. Called via CDN `<script>` tags or ESM imports.
3. **Capability manifest** (`dist/component-capabilities.json`) — Auto-generated mapping of component name → capability type (css-only, js-only, both) + CDN URLs. Used by consumers to determine which bundles to load.

## Writing behaviors

### Signature pattern

Behaviors accept DOM references and return a cleanup object:

```typescript
export function initMyBehavior(
  host: Element,
  trigger?: Element,
  options?: MyOptions,
): { cleanup(): void; myControl?(): void } | undefined {
  // Register listeners, wire up behavior
  return {
    cleanup: () => {
      /* teardown */
    },
    myControl: () => {
      /* ...*/
    },
  };
}
```

### Key constraints

- **Node-free**: No `import("node:*")` or Node-specific APIs. These bundles run in the browser.
- **Type-only imports OK**: You can import types from any package for type checking; only value imports must be browser-safe.
- **Return cleanup object**: If your behavior sets up listeners or state that needs teardown, return an object with a `cleanup()` method. Web components call this during re-renders; IIFE bundles usually call it once on app shutdown.
- **JSDoc escaping**: Wrap HTML tags in backticks (`` `<dialog>` ``) in JSDoc block comments. VitePress's Vue compiler fails on bare tags in generated TypeDoc API pages.

### Example: Modal behavior

```typescript
import { initModal, makeOnCommand } from "@pantoken/interactions";

const dialog = document.querySelector<HTMLDialogElement>("dialog.instui-modal");
if (dialog) {
  const onCommand = makeOnCommand("command" in HTMLButtonElement.prototype);
  initModal(dialog, dialog, onCommand);
}
```

For CSS, the host and dialog are the same element. Web components pass a separate host and its
shadow dialog. The production IIFE wires CSS dialogs automatically; don't initialize them twice.
Commands call native methods before reflecting attributes, so opening enters the top layer and
closing preserves native focus return. Initial or externally added `open` attributes are promoted
from nonmodal display to `showModal()`. Removing `open` calls native `close()` even if the browser
still considers the dialog modal.

Native Escape/cancel policy stays with the browser and application listeners. A queued close event
can't clear a newer open state; separate hosts still receive a bubbling `close` notification.

## Shared helpers

### Progressively enhanced tooltips

`initTooltip(wrapper, tip, { showDelay, hideDelay })` owns visibility once initialized.
The production `tooltip.iife.js` initializes `.instui-tooltip` wrappers automatically; don't
initialize the same wrapper twice. CSS-only hover/focus remains a no-JavaScript fallback, without
Escape or delay guarantees. The helper manages `data-tooltip-managed` on the wrapper and `-show`
on the bubble; applications shouldn't author the managed marker.

Pointer hover and keyboard focus independently keep the bubble open. Moving onto the bubble
across its visual gap doesn't close it. Escape anywhere in the owner document dismisses it and
cancels pending timers without moving focus. It stays dismissed until both pointer and focus
leave; the next entry can reopen it. `cancelAndHide()` uses the same dismissal policy.
`cleanup()` removes listeners/timers and restores the original marker and show class.

Use a named, focusable trigger with `aria-describedby` pointing at the bubble's stable ID and
`role="tooltip"` on the bubble. Keep tooltip content noninteractive; use a popover for links,
buttons, or other controls. The web component uses the same visibility and dismissal behavior,
including slotted-trigger focus and `show-delay`/`hide-delay` attributes.
Web-component attribute updates preserve the current visibility/dismissal state; delay changes
apply to the next transition without restarting an already pending timer.

### Opt-in ARIA menus

`initMenu(menu, button)` wires a vertical, single-level native popover with `role="menu"` and its
native `button[popovertarget]`. Both elements must be connected in the same document or shadow
root, with a stable menu ID. For automatic initialization, add `data-menu-navigation` to
`.instui-menu` and load `menu.iife.js` or the combined IIFE. Exactly one native popover button
must target each opted-in menu. Unmarked menus remain application-owned; there's no menu custom
element to register.

Enter/Space use the button's native popover activation. Arrow Down opens at the first item; Arrow
Up opens at the last. Opening focuses an item and synchronizes `aria-expanded`, `aria-haspopup`,
and `aria-controls`. Within the menu, Up/Down wrap, Home/End reach the ends, and printable
characters cycle to the next label starting with that character. Vertical navigation is the same
in RTL. Escape dismisses and returns focus; Tab/Shift+Tab dismiss without canceling normal
sequential navigation. Native outside-click dismissal doesn't steal the new focus.

Use `menuitem` for commands, `menuitemcheckbox`/`menuitemradio` with `aria-checked` for checked
actions, and `separator` for dividers. Applications own click actions and checked state. Enter
and pointer activation dismiss; Space on a checkable item keeps the menu open. Cancel a click
with `preventDefault()` to keep it open. Application focus changes aren't overwritten.
ARIA-disabled items remain focusable but cannot activate; native-disabled, hidden, and inert
items are skipped. A CSS `-disabled` modifier alone doesn't convey disabled semantics.

Submenus, menubars, and horizontal menus aren't supported. Cleanup removes listeners and restores
the original trigger ARIA attributes and item tab indices. Reinitialize after changing IDs,
trigger relationships, or the menu's semantic structure. Menu behavior isn't an authorization
boundary: applications must authorize every action independently.

The keyboard contract follows the [APG menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
and [menu](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) patterns.

### Opt-in native form validation

`initFormField(host, control, error)` uses a native input, select, or textarea's constraints and
`setCustomValidity()` result; it doesn't choose validation rules or error text. Supply a separate
error element inside the field, with nonempty text and a stable, unique ID.

The helper keeps untouched fields quiet. Blur, a native `invalid` event, or `handle.validate()`
reveals and associates an invalid field's error through `aria-describedby` and sets `aria-invalid`.
Afterward, input events revalidate, preserving hint references and removing the error when corrected.
Form reset returns the field to pristine state; canceled resets keep the current state. Cleanup
removes listeners and restores the initial ARIA attributes, invalid modifier, and error visibility.
Reinitialize after changing the error ID or moving the control to another form.

For automatic initialization, load `form-field.iife.js` (or the combined IIFE) and add
`data-native-validation` to `.instui-form-field`. Each opted-in field needs exactly one native
control and one `.instui-form-field-message.-type-error` (or `-type-new-error`) with an ID.
Without that marker, application-owned validation stays untouched. There's no form-field custom
element to wire; consumers can call the same helper within their own DOM.

Client-side constraints aren't a security boundary. Applications still validate submitted values
on the server. An error element's `hidden` attribute takes precedence over the field's CSS
error-display rules.

### Close-button targets

`initCloseButton` uses `data-close-target` when present, or the nearest dialog, popover,
`[data-dismissible]`, `[open]`, `.instui-alert`, or `.instui-banner` ancestor. Native
`popovertarget` and `commandfor` controls keep their browser-provided behavior. Alert and banner
close buttons use `initRemove` to fire a cancelable, bubbling `dismiss` event, fade out, and remove
the message. Prevent the event to keep the message mounted, or add `-transition-none` to remove it
without a fade. Other non-native targets retain their `open`-attribute and `close`-event behavior.

### `resolveSpace(keyword: string): string`

Converts InstUI spacing keywords (`xs`, `sm`, `md`, `lg`, `xl`) to computed pixel values from CSS custom properties.

```typescript
const value = resolveSpace("md"); // "12px"
```

### `makeOnCommand(router: CommandRouter): (cmd: string) => void`

Routes native command events (popover commands, dialog commands) through a central dispatcher.

### `applySpacing(element: Element, attrs: string[]): void`

Applies InstUI `margin` and `padding` shorthand attributes to inline styles.

```typescript
applySpacing(el, ["margin", "padding"]);
// el with margin="md" padding="sm" → inline styles set
```

### Tree browser

The tree-browser interaction follows InstUI's application-tree contract: a named `role="tree"`
root owns focusable `role="treeitem"` nodes, and collections own `role="group"` containers.
Load `@pantoken/interactions/tree-browser.js` (or its CDN IIFE) for CSS trees. The web component
delegates to the same `initTreeBrowser` behavior and exposes the tree role on the host so its
accessible name and slotted items stay in one DOM tree. Load the component stylesheet for slotted
item visuals; the shadow shell and `tree-browser` part remain available.

The behavior maintains one tab stop, skips hidden/disabled entries, supports Up/Down (also j/k),
Home/End, RTL-aware Left/Right expansion, and Enter/Space activation. Focus doesn't select.
Selection is off by default; supplying `aria-selected` opts into single selection. Pointer
activation expands collections; keyboard activation selects instead when selection is enabled.
Native `<details>` disclosure markup keeps its CSS-only styling, but isn't an ARIA tree and mustn't
claim tree/group roles without treeitems and keyboard behavior. Clean up and reinitialize the
manual behavior after replacing tree markup.

The authored examples use the [W3C navigation-tree pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-navigation/):
each collection row references a sibling group with `aria-owns`. This preserves the accessible
hierarchy while keeping the collection's visible label separate from descendant item labels.
Both owned sibling groups and directly nested groups work with the behavior. Owned groups must
be inside the same tree, have a unique ID, and not contain their owning row.

## Authoring IIFE entry points

### Auto-generation

For each new behavior, run `scripts/generate-components.ts`:

```bash
vp run generate-components
```

This auto-generates `src/components/{name}.ts` with:

```typescript
// Auto-generated; side-effect import registers listeners on load
import "../behaviors/my-behavior.ts";
```

Add your behavior to the skip list if you're hand-authoring:

```typescript
// scripts/generate-components.ts
const SKIP = ["modal", "tooltip", "in-place-edit", "close-button"];
```

### Hand-authored entries

For behaviors that need custom entry logic:

```typescript
// src/components/modal.ts
import { initModal } from "../behaviors/modal.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".instui-modal").forEach((host) => {
    const dialog = host.querySelector("dialog");
    if (dialog) initModal(host, dialog);
  });
});
```

Always add `// fallow-ignore-file unused-file` to bypass static-import linting (the file is loaded via dynamic paths by `build-iife.ts`).

## Building IIFE bundles

Run `vp build` to bundle:

```bash
# Full interactions bundle + 34 per-component .iife.js files
vp build formats/interactions/
```

### Updating `ALL_COMPONENTS` in `build-iife.ts`

If you add a new behavior:

1. Add it to the `ALL_COMPONENTS` list in `scripts/build-iife.ts`
2. Ensure the IIFE entry point exists (auto-generated or hand-authored)
3. Re-run `vp build` to generate `.iife.js` files

## Capability classification

### Auto-detection

`scripts/generate-capabilities.ts` auto-classifies components:

- **css-only**: Shipped in `@pantoken/components`, no behavior function
- **js-only**: Has behavior, no CSS counterpart
- **both**: Has CSS in `@pantoken/components` AND a behavior in interactions

Detection uses filesystem scan + import pattern matching:

```typescript
// Checks for ../behaviors/ imports or makeOnCommand usage
function hasBehavior(filePath: string): boolean {
  const content = readFileSync(filePath, "utf8");
  return /from\s+["']\.\.\/behaviors\//.test(content) || /makeOnCommand/.test(content);
}
```

### Updating the manifest

After adding a new component:

```bash
vp run generate-capabilities
```

This regenerates `dist/component-capabilities.json` and updates the type declaration.

## Testing behaviors

### Test environment

Tests run in `happy-dom` (lightweight DOM environment) via Vitest:

```typescript
import { describe, it, expect, beforeEach } from "vite-plus/test";
import { initMyBehavior } from "./my-behavior.js";

describe("initMyBehavior", () => {
  let host: Element;

  beforeEach(() => {
    host = document.createElement("div");
    document.body.appendChild(host);
  });

  it("wires up listener", () => {
    const handle = initMyBehavior(host);
    // Assert listener behavior
    handle?.cleanup();
  });
});
```

### Coverage requirements

- All new behaviors must have test coverage
- Overall package coverage must meet 85% threshold
- Run `vp test --coverage formats/interactions/` to check

## Web component integration

Web components call behavior functions directly in their paint methods or constructors:

```typescript
// renderers/web-components/src/elements/modal.ts
export class Modal extends foundationElement("modal") {
  paint() {
    const dialog = this.#root.querySelector("dialog");
    if (dialog) {
      this.#handle = initModal(this, dialog, this.ctx.onCommand);
    }
  }
}
```

Key points:

- Never let web components import from `core` or other upstream packages (they bundle to CDN; see upstream-decoupling docs)
- Prefer importing from `@pantoken/interactions` (lightweight, no transitive deps)
- Call `cleanup()` if re-rendering tears down the DOM subtree
