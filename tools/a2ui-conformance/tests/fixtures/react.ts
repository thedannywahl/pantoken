import { A2uiSurface } from "@a2ui/react";
import { isWebComponentImplementation } from "@a2ui/web_core/universal";
import { createElement, StrictMode, type ComponentProps } from "react";
import { createRoot } from "react-dom/client";
import type { RendererHost } from "./harness.ts";

/** Mount the official version-agnostic React surface renderer in Strict Mode. */
export async function createHost(container: HTMLElement): Promise<RendererHost> {
  const root = createRoot(container);

  return {
    render(surface) {
      if (surface.protocolVersion !== "1.0") throw new Error("Expected an A2UI 1.0 surface.");
      for (const catalog of surface.availableCatalogs.values()) {
        for (const implementation of catalog.components.values()) {
          if (!isWebComponentImplementation(implementation)) {
            throw new Error(`Expected a Universal implementation for ${implementation.name}.`);
          }
        }
      }
      // The harness erases catalog implementation types; the checks above restore that contract.
      const reactSurface = surface as ComponentProps<typeof A2uiSurface>["surface"];
      root.render(
        createElement(StrictMode, null, createElement(A2uiSurface, { surface: reactSurface })),
      );
    },
    destroy() {
      root.unmount();
    },
  };
}
