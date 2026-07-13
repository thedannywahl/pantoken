import { defineComponent } from "../lib/define.ts";

export const rangeInput = defineComponent({
  name: "range-input",
  css: (p) => {
    const v = (s: string): string => `var(--instui-component-range-input-${s})`;
    const track = `
  block-size: 0.25rem;
  background: ${v("track-background")};
  border: var(--instui-border-width-sm) solid ${v("track-border-color")};
  border-radius: 999px;`;
    const thumb = `
  inline-size: ${v("handle-size")};
  block-size: ${v("handle-size")};
  background: ${v("handle-background")};
  border: ${v("handle-border-size")} solid ${v("handle-border-color")};
  border-radius: 50%;
  box-shadow: 0 0 0 0 ${v("handle-shadow-color")};
  cursor: pointer;`;
    return `
/**
 * @component range-input
 * @summary A styled range slider with an inverse value bubble.
 * @example
 * <input class="instui-range-input" id="r1" type="range" value="30">
 * @related number-input — The typed numeric-entry counterpart.
 */
.${p}range-input {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 100%;
  min-inline-size: ${v("min-width")};
  block-size: ${v("handle-size")};
  background: transparent;
}
/* Chrome/Safari: the runnable track is centred in the (handle-sized) control box. */
.${p}range-input::-webkit-slider-runnable-track {${track}
}
.${p}range-input::-moz-range-track {${track}
}
.${p}range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  margin-block-start: calc((0.25rem - ${v("handle-size")}) / 2);${thumb}
}
.${p}range-input::-moz-range-thumb {${thumb}
}
.${p}range-input:hover::-webkit-slider-thumb { background: ${v("handle-hover-background")}; }
.${p}range-input:hover::-moz-range-thumb { background: ${v("handle-hover-background")}; }
.${p}range-input:focus-visible { outline: none; }
.${p}range-input:focus-visible::-webkit-slider-thumb {
  background: ${v("handle-focus-background")};
  box-shadow: 0 0 0 ${v("handle-focus-outline-width")} ${v("handle-focus-outline-color")};
}
.${p}range-input:focus-visible::-moz-range-thumb {
  background: ${v("handle-focus-background")};
  box-shadow: 0 0 0 ${v("handle-focus-outline-width")} ${v("handle-focus-outline-color")};
}
/* The value bubble: an inverse pill with a caret pointing back toward the track (InstUI ContextView). */
.${p}range-input-value {
  position: relative;
  display: inline-flex;
  align-items: center;
  /* Hug the number: the value line-height token is oversized (a container height), and as a flex item
     the bubble must not stretch to the row — so pin line-height to the text and never self-stretch. */
  align-self: center;
  margin-inline-start: 0.5rem;
  background: var(--instui-color-background-inverse);
  color: var(--instui-color-text-inverse);
  border-radius: var(--instui-border-radius-md);
  padding: ${v("value-medium-padding")};
  font-family: ${v("value-font-family")};
  font-size: ${v("value-medium-font-size")};
  font-weight: ${v("value-font-weight")};
  line-height: 1;
}
.${p}range-input-value::before {
  content: "";
  position: absolute;
  inset-inline-start: -0.375rem;
  inset-block-start: 50%;
  transform: translateY(-50%);
  border-block: 0.375rem solid transparent;
  border-inline-end: 0.375rem solid var(--instui-color-background-inverse);
  border-inline-start: 0;
}
.${p}range-input-value.-size-sm {
  padding: ${v("value-small-padding")};
  font-size: ${v("value-small-font-size")};
  line-height: ${v("value-small-line-height")};
}
.${p}range-input-value.-size-lg {
  padding: ${v("value-large-padding")};
  font-size: ${v("value-large-font-size")};
  line-height: ${v("value-large-line-height")};
}`;
  },
});

export const rangeInputCss = rangeInput.css;
