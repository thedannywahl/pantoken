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
/**
 * Wire up modal state sync between host `open` attribute and `<dialog>` methods.
 * Listens for `--show`, `--close`, `--toggle` commands routed via `onCommand`.
 * When host is the dialog (CSS case), no re-dispatch; when host is wrapper (web
 * component case), re-dispatch `close` event so the host element sees it.
 *
 * @param host — Element that owns the `open` attribute
 * @param dialog — `<dialog>` to call showModal() / close() on
 * @param onCommand — Command router (e.g., ctx.onCommand in web components)
 */
export function initModal(
  host: Element,
  dialog: HTMLDialogElement,
  onCommand?: (cmd: string, detail?: unknown) => void,
) {
  const handleCommand = (cmd: string) => {
    switch (cmd) {
      case "--show":
        host.setAttribute("open", "");
        break;
      case "--close":
        host.removeAttribute("open");
        break;
      case "--toggle":
        host.hasAttribute("open") ? host.removeAttribute("open") : host.setAttribute("open", "");
        break;
    }
  };

  if (onCommand) {
    onCommand("--show", undefined);
    // ... more command handling
  }

  // Return cleanup (IIFE bundles call this on unload)
  return {
    cleanup: () => {
      /* remove listeners */
    },
  };
}
```

## Shared helpers

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
