import { alertCss } from "@pantoken/components";
import { initRemove, type RemoveHandle } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-alert>` — an inline status message with `role="alert"`. The `variant` attribute maps to the
 * `-color-<variant>` modifier (`info`, `success`, `warning`, `danger`). Alerts are elevated by default;
 * set `has-shadow="false"` to flatten one (→ `-without-shadow`, mirroring InstUI's `hasShadow={false}`).
 * The `timeout` attribute (milliseconds) auto-dismisses the alert after that delay — it fades out,
 * removes itself from the DOM, and fires a cancelable bubbling `dismiss` event (call `preventDefault()`
 * on it to keep the alert mounted). The fade states use `@pantoken/components`' `transition` utility;
 * load its stylesheet when using timeout dismissal. Slotted content is the message body.
 *
 * @example
 * ```html
 * <instui-alert variant="success" margin="0 0 small">Your changes were saved.</instui-alert>
 * <instui-alert variant="info" has-shadow="false">A flat, inline notice.</instui-alert>
 * <!-- auto-dismisses after 5s, firing a cancelable `dismiss` event: -->
 * <!-- <instui-alert variant="warning" timeout="5000">Saving…</instui-alert> -->
 * ```
 */
export const alert: ElementDefinition = {
  name: "alert",
  define: (ctx) => {
    if (ctx.registry.get("instui-alert")) return;
    ctx.registry.define(
      "instui-alert",
      class extends HTMLElement {
        static observedAttributes = ["variant", "has-shadow"];
        #removeHandle: RemoveHandle | undefined;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          this.#paint();
          // `timeout` (ms) → auto-dismiss. Read on connect; a non-positive/absent value never arms it.
          const timeout = Number(this.getAttribute("timeout"));
          this.#removeHandle = initRemove(this, {
            timeout,
            transition: this.getAttribute("transition") === "none" ? "none" : "fade",
          });
        }
        disconnectedCallback(): void {
          this.#removeHandle?.cleanup();
        }
        attributeChangedCallback(): void {
          this.#paint();
        }
        #paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const cls =
            ctx.variantClass("alert", this) +
            (this.getAttribute("has-shadow") === "false" ? " -without-shadow" : "");
          root.innerHTML =
            `<style>:host{display:block}${alertCss(ctx.I)}</style>` +
            `<div class="${cls}" role="alert" part="alert"><slot></slot></div>`;
        }
      },
    );
  },
};
