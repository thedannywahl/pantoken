/**
 * The AI gradient utility — global helpers for AI-accent border/background treatments.
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalModifierSelector } from "@pantoken/utils";

/** The AI gradient utility — border/background helpers for AI-accent surfaces. */
export const aiGradient: Definition = defineUtility({
  name: "ai-gradient",
  css: (p) => {
    const aiStroke =
      "linear-gradient(var(--instui-color-stroke-ai-top-gradient), var(--instui-color-stroke-ai-bottom-gradient))";
    const aiStrokeRtl =
      "linear-gradient(to right, var(--instui-color-stroke-ai-top-gradient), var(--instui-color-stroke-ai-bottom-gradient))";
    const aiStrokeLtr =
      "linear-gradient(to left, var(--instui-color-stroke-ai-top-gradient), var(--instui-color-stroke-ai-bottom-gradient))";

    const borderAi = globalModifierSelector(p, "border-color-ai");
    const borderAiHorizontal = globalModifierSelector(p, "border-color-ai-horizontal");
    const backgroundAi = globalModifierSelector(p, "background-ai");
    const backgroundAiHorizontal = globalModifierSelector(p, "background-ai-horizontal");

    return css`
      /**
 * @utility ai-gradient
 * @selector .--border-color-ai
 * @global
 * @summary AI-accent gradient helpers — \.--border-color-ai\`, \`.--border-color-ai-horizontal\`, \`.--background-ai\`, and \`.--background-ai-horizontal\` — usable bare or chained onto any component.
 * @modifier --border-color-ai — Paints a transparent AI border using the shared AI gradient, with the inner surface kept in the base background colour.
 * @modifier --border-color-ai-horizontal — Same as \`.--border-color-ai\`, but uses the horizontal gradient direction for the current text direction.
 * @modifier --background-ai — Paints the full element background with the shared AI gradient.
 * @modifier --background-ai-horizontal — Same as \`.--background-ai\`, but uses the horizontal gradient direction for the current text direction.
 * @example
 * <div class="--border-color-ai --border-radius-md --border-width-sm --background-secondary">
 *   AI surface
 * </div>
 */
      ${borderAi} {
        border: var(--instui-border-width-sm) solid transparent;
        background-color: var(--instui-color-background-base);
        background-image:
          linear-gradient(var(--instui-color-background-base), var(--instui-color-background-base)),
          ${aiStroke};
        background-origin: border-box;
        background-clip: padding-box, border-box;
      }
      ${borderAiHorizontal} {
        border: var(--instui-border-width-sm) solid transparent;
        background-color: var(--instui-color-background-base);
        background-image:
          linear-gradient(var(--instui-color-background-base), var(--instui-color-background-base)),
          ${aiStrokeLtr};
        background-origin: border-box;
        background-clip: padding-box, border-box;
      }
      :where(*):dir(
          rtl
        ).--border-color-ai-horizontal.--border-color-ai-horizontal.--border-color-ai-horizontal {
        background-image:
          linear-gradient(var(--instui-color-background-base), var(--instui-color-background-base)),
          ${aiStrokeRtl};
      }
      ${backgroundAi} {
        background-color: var(--instui-color-background-base);
        background-image: ${aiStroke};
      }
      ${backgroundAiHorizontal} {
        background-color: var(--instui-color-background-base);
        background-image: ${aiStrokeLtr};
      }
      :where(*):dir(
          rtl
        ).--background-ai-horizontal.--background-ai-horizontal.--background-ai-horizontal {
        background-image: ${aiStrokeRtl};
      }
    `;
  },
});

/** The AI gradient utility as a standalone, header-wrapped stylesheet. */
export const aiGradientCss: Definition["css"] = aiGradient.css;
