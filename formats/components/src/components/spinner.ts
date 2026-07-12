import { defineComponent } from "../lib/define.ts";

export const spinner = defineComponent({
  name: "spinner",
  css: (p) => `
/**
 * @component spinner
 * @summary An animated loading ring; give it role="status" and an aria-label.
 * @modifier -size-xs — Extra-small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -color-inverse — On a dark surface.
 * @example
 * <span class="instui-spinner -size-xs" role="status" aria-label="Loading"></span>
 * @demo self:spinner
 */
@keyframes pantoken-spinner-rotate { to { transform: rotate(360deg); } }
.${p}spinner {
  display: inline-block;
  width: var(--instui-component-spinner-spinner-size-md);
  height: var(--instui-component-spinner-spinner-size-md);
  border: var(--instui-component-spinner-stroke-width-md) solid var(--instui-component-spinner-track-color);
  border-top-color: var(--instui-component-spinner-color);
  border-radius: 50%;
  animation: pantoken-spinner-rotate 0.8s linear infinite;
}
.${p}spinner.-size-xs {
  width: var(--instui-component-spinner-spinner-size-xs);
  height: var(--instui-component-spinner-spinner-size-xs);
  border-width: var(--instui-component-spinner-stroke-width-xs);
}
.${p}spinner.-size-sm {
  width: var(--instui-component-spinner-spinner-size-sm);
  height: var(--instui-component-spinner-spinner-size-sm);
  border-width: var(--instui-component-spinner-stroke-width-sm);
}
.${p}spinner.-size-lg {
  width: var(--instui-component-spinner-spinner-size-lg);
  height: var(--instui-component-spinner-spinner-size-lg);
  border-width: var(--instui-component-spinner-stroke-width-lg);
}
.${p}spinner.-color-inverse { border-top-color: var(--instui-component-spinner-inverse-color); }`,
});

export const spinnerCss = spinner.css;
