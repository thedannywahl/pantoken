/**
 * The shared form-control CSS bases used by several input records:
 * - {@link fieldControlBase} — the native-control chrome (border/bg/radius/states) for TextInput,
 *   TextArea, and SimpleSelect, keyed off a `--instui-component-<family>-*` token family.
 * - {@link inputFacadeBase} — the wrapped-input facade (a flex row that carries the text-input chrome
 *   so icon/arrow content can sit inside the field) shared by InputGroup and NumberInput.
 *
 * Both take the already-`ns()`-joined prefix `p` and return a CSS fragment; the component records that
 * use them interpolate the fragment into their own `css:(p)=>…` body.
 *
 * @module
 */

/** The native-control chrome for TextInput/TextArea/SimpleSelect, from the `<fam>-*` token family. */
export function fieldControlBase(p: string, cls: string, fam: string): string {
  const t = (s: string): string => `var(--instui-component-${fam}-${s})`;
  const root = `.${p}${cls}`;
  return `
${root} {
  display: block;
  inline-size: 100%;
  box-sizing: border-box;
  font-family: ${t("font-family")};
  font-weight: ${t("font-weight")};
  color: ${t("text-color")};
  background-color: ${t("background-color")};
  border: ${t("border-width")} solid ${t("border-color")};
  border-radius: ${t("border-radius")};
}
${root}::placeholder { color: ${t("placeholder-color")}; }
${root}:hover {
  background-color: ${t("background-hover-color")};
  border-color: ${t("border-hover-color")};
}
${root}:hover::placeholder { color: ${t("placeholder-hover-color")}; }
${root}:disabled,
${root}.-disabled {
  background-color: ${t("background-disabled-color")};
  border-color: ${t("border-disabled-color")};
  color: ${t("text-disabled-color")};
  cursor: not-allowed;
}
${root}.-readonly {
  background-color: ${t("background-readonly-color")};
  border-color: ${t("border-readonly-color")};
  color: ${t("text-readonly-color")};
}
${root}.-invalid { border-color: ${t("error-border-color")}; }
${root}.-success { border-color: ${t("success-border-color")}; }
/* Focus ring tracks the validity: danger when explicitly -invalid OR natively :user-invalid (after the
   user has interacted), success on -success — overriding base.css's info-blue ring for focusables. */
${root}:is(.-invalid, :user-invalid):focus-visible { outline-color: var(--instui-focus-outline-color-danger); }
${root}.-success:focus-visible { outline-color: var(--instui-focus-outline-color-success); }
`;
}

/**
 * The wrapped-input facade shared by InputGroup and NumberInput: a flex row that carries the text-input
 * chrome (border/bg/radius/height/states/sizes from `text-input-*`) so icon/arrow content can sit INSIDE
 * the field beside the input. The real `<input>` inside sheds its own border/bg/padding; the facade shows
 * the focus ring (via `:has(:focus-visible)`) since the input is chromeless. `cls` is the root class.
 */
export function inputFacadeBase(p: string, cls: string): string {
  const t = (s: string): string => `var(--instui-component-text-input-${s})`;
  const root = `.${p}${cls}`;
  return `
${root} {
  display: flex;
  align-items: center;
  inline-size: 100%;
  box-sizing: border-box;
  block-size: ${t("height-md")};
  padding-inline: ${t("padding-horizontal-md")};
  gap: ${t("gap-content")};
  background-color: ${t("background-color")};
  border: ${t("border-width")} solid ${t("border-color")};
  border-radius: ${t("border-radius")};
  color: ${t("text-color")};
  font-family: ${t("font-family")};
  font-size: ${t("font-size-md")};
}
${root}:hover { background-color: ${t("background-hover-color")}; border-color: ${t("border-hover-color")}; }
/* The inner control is chromeless — the facade provides border/bg/ring. */
${root} > input,
${root} .${p}text-input {
  flex: 1;
  min-inline-size: 0;
  border: 0;
  padding: 0;
  background: transparent;
  block-size: auto;
  font: inherit;
  color: inherit;
  outline: none;
}
${root} > input::placeholder { color: ${t("placeholder-color")}; }
/* Leading/trailing content slots (icons ride the -icon-* glyph painter). */
${root} .before,
${root} .after { display: inline-flex; align-items: center; flex: none; color: ${t("text-color")}; }
${root}.-disabled,
${root}:has(> input:disabled) {
  background-color: ${t("background-disabled-color")};
  border-color: ${t("border-disabled-color")};
  color: ${t("text-disabled-color")};
  cursor: not-allowed;
}
${root}.-readonly {
  background-color: ${t("background-readonly-color")};
  border-color: ${t("border-readonly-color")};
  color: ${t("text-readonly-color")};
}
${root}.-invalid { border-color: ${t("error-border-color")}; }
${root}.-success { border-color: ${t("success-border-color")}; }
/* Focus ring lives on the facade (the input has no chrome). */
${root}:has(:focus-visible) {
  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color);
  outline-offset: var(--instui-focus-outline-offset);
  border-radius: var(--instui-focus-outline-radius);
}
${root}:is(.-invalid, :has(> input:user-invalid)):has(:focus-visible) { outline-color: var(--instui-focus-outline-color-danger); }
${root}.-success:has(:focus-visible) { outline-color: var(--instui-focus-outline-color-success); }
${root}.-size-sm { block-size: ${t("height-sm")}; padding-inline: ${t("padding-horizontal-sm")}; font-size: ${t("font-size-sm")}; }
${root}.-size-lg { block-size: ${t("height-lg")}; padding-inline: ${t("padding-horizontal-lg")}; font-size: ${t("font-size-lg")}; }
`;
}
