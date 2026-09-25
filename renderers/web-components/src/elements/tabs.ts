import { initTabs, type TabsHandle } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-tabs>` — a light-DOM tabbed panel set. It keeps the existing `.instui-tabs` CSS contract
 * intact while adding selection, panel visibility, and keyboard behavior through the shared tabs
 * interaction. Load `@pantoken/components/components.css` for the tab visuals.
 *
 * @example
 * ```html
 * <instui-tabs>
 *   <div class="list" role="tablist" aria-label="Settings">
 *     <button role="tab" aria-selected="true" aria-controls="general">General</button>
 *     <button role="tab" aria-selected="false" aria-controls="advanced">Advanced</button>
 *   </div>
 *   <div id="general" role="tabpanel">General settings</div>
 *   <div id="advanced" role="tabpanel" hidden>Advanced settings</div>
 * </instui-tabs>
 * ```
 */
export const tabs: ElementDefinition = {
  name: "tabs",
  define: (ctx) => {
    if (ctx.registry.get("instui-tabs")) return;
    ctx.registry.define(
      "instui-tabs",
      class extends HTMLElement {
        #handle: TabsHandle | undefined;

        connectedCallback(): void {
          this.classList.add("instui-tabs");
          this.#handle = initTabs(this);
        }

        disconnectedCallback(): void {
          this.#handle?.cleanup();
          this.#handle = undefined;
        }
      },
    );
  },
};
