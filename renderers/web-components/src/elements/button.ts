import { buttonCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-button>` — a token-styled `<button>`. The `variant` attribute maps to the `-color-<variant>`
 * modifier (`secondary`, `tertiary`, `success`, `danger`, `ai`, …); `margin` adds spacing around the
 * host (InstUI keywords like `small` / `medium large`); slotted content is the label.
 *
 * It is also a native invoker: `popovertarget` (with optional `popovertargetaction`) toggles any
 * light-DOM `[popover]` such as `<instui-context-view>`, `<instui-popover>`, or `<instui-tray>`, and
 * `command`/`commandfor` drives the command-based components (`<instui-modal>` with `--show`/`--close`,
 * etc.). The id is forwarded to the inner button via the invoker IDL, so it resolves across the shadow
 * boundary and may point forward to an element declared later in the document.
 *
 * @example
 * ```html
 * <instui-button variant="primary" margin="small">Save changes</instui-button>
 * <instui-button variant="danger" margin="small">Delete</instui-button>
 * <instui-button popovertarget="cv">Details</instui-button>
 * <instui-context-view id="cv">More about this item.</instui-context-view>
 * ```
 */
export const button: ElementDefinition = {
  name: "button",
  define: (ctx) =>
    ctx.wrapper(
      "instui-button",
      buttonCss(ctx.I),
      (host) =>
        `<button class="${ctx.variantClass("button", host)}" part="button"><slot></slot></button>`,
      { invoker: true },
    ),
};
