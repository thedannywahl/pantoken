import { truncateCss } from "@pantoken/components";
import { initTruncateAuto, type TruncateAutoHandle } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";
import { frag } from "../lib/helpers.ts";

/**
 * `<instui-truncate>` — clamps slotted text to a fixed number of lines with an ellipsis. `lines`
 * accepts a positive integer or `auto`. A number sets the `--lines` custom property directly.
 * `auto` computes a line count from the host's available height and applies that as `--lines`.
 * Omit `lines` for single-line truncation.
 *
 * @example
 * ```html
 * <instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
 * ```
 */
export const truncate: ElementDefinition = {
  name: "truncate",
  define: (ctx) => {
    if (ctx.registry.get("instui-truncate")) return;
    ctx.registry.define(
      "instui-truncate",
      class extends HTMLElement {
        static observedAttributes = ["lines"];
        #autoHandle: TruncateAutoHandle | undefined;

        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }

        connectedCallback(): void {
          this.#paint();
        }

        disconnectedCallback(): void {
          this.#autoHandle?.cleanup();
          this.#autoHandle = undefined;
        }

        attributeChangedCallback(): void {
          if (!this.isConnected) return;
          this.#paint();
        }

        #paint(): void {
          this.#autoHandle?.cleanup();
          this.#autoHandle = undefined;
          const root = this.shadowRoot;
          if (!root) return;
          const lines = this.#parseLines();
          const style = typeof lines === "number" ? ` style="--lines:${String(lines)}"` : "";
          root.innerHTML =
            `<style>:host{display:block}${truncateCss(ctx.I)}</style>` +
            `<span class="instui-truncate" part="truncate"${style}><slot></slot></span>`;
          if (lines === "auto") {
            const span = root.querySelector<HTMLElement>(".instui-truncate");
            const slot = root.querySelector<HTMLSlotElement>("slot");
            if (span) {
              this.#autoHandle = initTruncateAuto(this, span, {
                slot,
              });
            }
          }
        }

        #parseLines(): number | "auto" | null {
          const raw = frag(this.getAttribute("lines")).toLowerCase();
          if (!raw) return null;
          if (raw === "auto") return "auto";
          const parsed = Number(raw);
          if (!Number.isFinite(parsed)) return null;
          const lines = Math.floor(parsed);
          return lines > 0 ? lines : null;
        }
      },
    );
  },
};
