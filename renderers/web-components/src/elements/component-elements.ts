import {
  billboardCss,
  breadcrumbCss,
  breadcrumbLinkCss,
  bylineCss,
  cardCss,
  checkboxCss,
  closeButtonCss,
  fileDropCss,
  formFieldCss,
  formFieldGroupCss,
  formFieldMessagesCss,
  headingCss,
  inputGroupCss,
  linkCss,
  listCss,
  listItemCss,
  maskCss,
  menuCss,
  menuGroupCss,
  menuItemCss,
  menuSeparatorCss,
  numberInputCss,
  paginationCss,
  paginationPageCss,
  radioCss,
  radioInputGroupCss,
  rangeInputCss,
  screenReaderContentCss,
  simpleSelectCss,
  tableBodyCss,
  tableCellCss,
  tableColHeaderCss,
  tableCss,
  tableHeadCss,
  tableRowCss,
  tableRowHeaderCss,
  textAreaCss,
  textCss,
  textInputCss,
  toggleDetailsCss,
  toggleGroupCss,
  viewCss,
  type ComponentOptions,
} from "@pantoken/components";
import type { ElementDefinition, RegisterContext } from "../lib/context.ts";
import { esc, safeHref } from "../lib/helpers.ts";

/** A CSS record's standalone stylesheet builder. */
type CssBuilder = (options?: ComponentOptions) => string;
type Render = (host: HTMLElement, ctx: RegisterContext) => string;

function combine(...builders: CssBuilder[]): CssBuilder {
  return (options) => builders.map((builder) => builder(options)).join("\n");
}

function define(
  name: string,
  styles: CssBuilder,
  render: Render,
  options: {
    display?: "block" | "inline-block" | "contents";
    valueChange?: "value" | "checked";
    childrenChange?: boolean;
  } = {},
): ElementDefinition {
  return {
    name,
    define: (ctx) =>
      ctx.wrapper(`instui-${name}`, styles(ctx.I), (host) => render(host, ctx), options),
  };
}

function attr(host: HTMLElement, name: string): string {
  const value = host.getAttribute(name);
  return value === null ? "" : ` ${name}="${esc(value)}"`;
}

function booleanAttr(host: HTMLElement, name: string): string {
  return host.hasAttribute(name) ? ` ${name}` : "";
}

function container(name: string, styles: CssBuilder, tag = "div"): ElementDefinition {
  return define(name, styles, () => `<${tag} class="instui-${name}"><slot></slot></${tag}>`);
}

/** An article-shaped card with slotted content. */
export const card: ElementDefinition = container("card", cardCss, "article");
/** A media-object byline container. */
export const byline: ElementDefinition = container("byline", bylineCss);
/** A table-layout container that keeps slotted rows inside its table semantics. */
export const table: ElementDefinition = define(
  "table",
  combine(
    tableCss,
    tableHeadCss,
    tableBodyCss,
    tableRowCss,
    tableCellCss,
    tableColHeaderCss,
    tableRowHeaderCss,
  ),
  (host) => `<div class="instui-table" role="table"${attr(host, "aria-label")}><slot></slot></div>`,
);
/** A link that rejects executable and data URL schemes. */
export const link: ElementDefinition = define(
  "link",
  linkCss,
  (host) => {
    const href = safeHref(host.getAttribute("href"));
    const target = ["_blank", "_self", "_parent", "_top"].includes(
      host.getAttribute("target") ?? "",
    )
      ? host.getAttribute("target")
      : "";
    return `<a class="instui-link"${href ? ` href="${esc(href)}"` : ""}${target ? ` target="${target}"` : ""}${target === "_blank" ? ' rel="noopener noreferrer"' : ""}><slot></slot></a>`;
  },
  { display: "inline-block" },
);
/** A native unordered list with Pantoken list-item styles. */
export const list: ElementDefinition = define(
  "list",
  combine(listCss, listItemCss),
  () => `<ul class="instui-list"><slot></slot></ul>`,
);
/** A native checkbox and its slotted label. */
export const checkbox: ElementDefinition = define(
  "checkbox",
  checkboxCss,
  (host) =>
    `<label class="instui-checkbox"><input type="checkbox"${attr(host, "name")}${attr(host, "value")}${booleanAttr(host, "checked")}${booleanAttr(host, "disabled")}><span><slot></slot></span></label>`,
  { display: "inline-block", valueChange: "checked" },
);
/** A native radio control and its slotted label. */
export const radio: ElementDefinition = define(
  "radio",
  radioCss,
  (host) =>
    `<label class="instui-radio"><input type="radio"${attr(host, "name")}${attr(host, "value")}${booleanAttr(host, "checked")}${booleanAttr(host, "disabled")}><span><slot></slot></span></label>`,
  { display: "inline-block", valueChange: "value" },
);
/** A menu surface with item, group, and separator styles. */
export const menu: ElementDefinition = define(
  "menu",
  combine(menuCss, menuItemCss, menuGroupCss, menuSeparatorCss),
  () => `<div class="instui-menu" role="menu"><slot></slot></div>`,
);
/** A breadcrumb navigation landmark. */
export const breadcrumb: ElementDefinition = define(
  "breadcrumb",
  combine(breadcrumbCss, breadcrumbLinkCss),
  (host) =>
    `<nav class="instui-breadcrumb" aria-label="${esc(host.getAttribute("aria-label") ?? "Breadcrumb")}"><ol><slot></slot></ol></nav>`,
);
/** A section for an empty state or call to action. */
export const billboard: ElementDefinition = container("billboard", billboardCss, "section");
/** A native disclosure group. */
export const toggleGroup: ElementDefinition = define(
  "toggle-group",
  toggleGroupCss,
  (host) =>
    `<details class="instui-toggle-group"${booleanAttr(host, "open")}><summary>${esc(host.getAttribute("summary") ?? "")}</summary><div><slot></slot></div></details>`,
);
/** A pagination navigation landmark. */
export const pagination: ElementDefinition = define(
  "pagination",
  combine(paginationCss, paginationPageCss),
  (host) =>
    `<nav class="instui-pagination" aria-label="${esc(host.getAttribute("aria-label") ?? "Pagination")}"><slot></slot></nav>`,
);
/** A native disclosure with a configurable summary. */
export const toggleDetails: ElementDefinition = define(
  "toggle-details",
  toggleDetailsCss,
  (host) =>
    `<details class="instui-toggle-details"${booleanAttr(host, "open")}><summary>${esc(host.getAttribute("summary") ?? "")}</summary><div><slot></slot></div></details>`,
);
/** A native file picker presented as a dropzone label. */
export const fileDrop: ElementDefinition = define(
  "file-drop",
  fileDropCss,
  (host) =>
    `<label class="instui-file-drop"><input type="file"${attr(host, "accept")}${booleanAttr(host, "multiple")}${booleanAttr(host, "disabled")}><span><slot></slot></span></label>`,
  { display: "block" },
);
/** A native range slider with value-change events. */
export const rangeInput: ElementDefinition = define(
  "range-input",
  rangeInputCss,
  (host) =>
    `<label><span><slot></slot></span><input class="instui-range-input" type="range"${attr(host, "min")}${attr(host, "max")}${attr(host, "step")}${attr(host, "value")}${booleanAttr(host, "disabled")}></label>`,
  { display: "block", valueChange: "value" },
);
/** An overlay surface for positioned content. */
export const mask: ElementDefinition = container("mask", maskCss);
/** Visually hidden content that remains available to assistive technology. */
export const screenReaderContent: ElementDefinition = define(
  "screen-reader-content",
  screenReaderContentCss,
  () => `<span class="instui-screen-reader-content"><slot></slot></span>`,
  { display: "contents" },
);
/** A semantic heading with a bounded level from one through six. */
export const heading: ElementDefinition = define("heading", headingCss, (host) => {
  const level = Number(host.getAttribute("level") ?? 2);
  const tag = Number.isInteger(level) && level >= 1 && level <= 6 ? `h${level}` : "h2";
  return `<${tag} class="instui-heading"><slot></slot></${tag}>`;
});
/** A paragraph of Pantoken body text. */
export const text: ElementDefinition = define(
  "text",
  textCss,
  () => `<p class="instui-text"><slot></slot></p>`,
);
/** A native close button with an accessible label. */
export const closeButton: ElementDefinition = define(
  "close-button",
  closeButtonCss,
  (host) =>
    `<button class="instui-close-button" type="button" aria-label="${esc(host.getAttribute("label") ?? "Close")}">×</button>`,
  { display: "inline-block" },
);
/** A form-field layout container. */
export const formField: ElementDefinition = define(
  "form-field",
  formFieldCss,
  () => `<div class="instui-form-field"><slot></slot></div>`,
);
/** A native fieldset for a group of form fields. */
export const formFieldGroup: ElementDefinition = define(
  "form-field-group",
  formFieldGroupCss,
  (host) =>
    `<fieldset class="instui-form-field-group"><legend>${esc(host.getAttribute("label") ?? "")}</legend><slot></slot></fieldset>`,
);
/** A native fieldset for a radio-input group. */
export const radioInputGroup: ElementDefinition = define(
  "radio-input-group",
  radioInputGroupCss,
  (host) =>
    `<fieldset class="instui-radio-input-group"><legend>${esc(host.getAttribute("label") ?? "")}</legend><slot></slot></fieldset>`,
);
/** A status region for form-field help and validation messages. */
export const formFieldMessages: ElementDefinition = define(
  "form-field-messages",
  formFieldMessagesCss,
  () => `<div class="instui-form-field-messages" role="status"><slot></slot></div>`,
);
/** A native text input with a visible slotted label. */
export const textInput: ElementDefinition = define(
  "text-input",
  textInputCss,
  (host) =>
    `<label><span><slot></slot></span><input class="instui-text-input" type="${esc(host.getAttribute("type") ?? "text")}"${attr(host, "value")}${attr(host, "placeholder")}${attr(host, "name")}${booleanAttr(host, "required")}${booleanAttr(host, "disabled")}${booleanAttr(host, "readonly")}></label>`,
  { display: "block", valueChange: "value" },
);
/** A native multiline text input with a visible slotted label. */
export const textArea: ElementDefinition = define(
  "text-area",
  textAreaCss,
  (host) =>
    `<label><span><slot></slot></span><textarea class="instui-text-area"${attr(host, "placeholder")}${attr(host, "name")}${booleanAttr(host, "required")}${booleanAttr(host, "disabled")}${booleanAttr(host, "readonly")}>${esc(host.getAttribute("value") ?? "")}</textarea></label>`,
  { display: "block", valueChange: "value" },
);
/** A native select control that copies text-only options from its light DOM. */
export const simpleSelect: ElementDefinition = define(
  "simple-select",
  simpleSelectCss,
  (host) => {
    const selectedValue = host.getAttribute("value");
    const options = Array.from(
      host.querySelectorAll<HTMLOptionElement>('option[slot="options"]'),
      (option) => {
        const value = option.getAttribute("value") ?? option.textContent ?? "";
        const selected =
          selectedValue === null ? option.hasAttribute("selected") : value === selectedValue;
        return `<option value="${esc(value)}"${selected ? " selected" : ""}${option.disabled ? " disabled" : ""}>${esc(option.textContent ?? "")}</option>`;
      },
    ).join("");
    return `<label><span><slot></slot></span><select class="instui-simple-select"${attr(host, "name")}${attr(host, "value")}${booleanAttr(host, "required")}${booleanAttr(host, "disabled")}>${options}</select></label>`;
  },
  { display: "block", valueChange: "value", childrenChange: true },
);
/** A container for an input and adjacent content. */
export const inputGroup: ElementDefinition = container("input-group", inputGroupCss);
/** A native number input with value-change events. */
export const numberInput: ElementDefinition = define(
  "number-input",
  numberInputCss,
  (host) =>
    `<label><span><slot></slot></span><input class="instui-number-input" type="number"${attr(host, "value")}${attr(host, "min")}${attr(host, "max")}${attr(host, "step")}${attr(host, "name")}${booleanAttr(host, "required")}${booleanAttr(host, "disabled")}></label>`,
  { display: "block", valueChange: "value" },
);
/** A neutral layout primitive. */
export const view: ElementDefinition = container("view", viewCss);

/** Missing root component records, registered after the hand-authored elements. */
export const componentElements: readonly ElementDefinition[] = [
  card,
  byline,
  table,
  link,
  list,
  checkbox,
  radio,
  menu,
  breadcrumb,
  billboard,
  toggleGroup,
  pagination,
  toggleDetails,
  fileDrop,
  rangeInput,
  mask,
  screenReaderContent,
  heading,
  text,
  closeButton,
  formField,
  formFieldGroup,
  radioInputGroup,
  formFieldMessages,
  textInput,
  textArea,
  simpleSelect,
  inputGroup,
  numberInput,
  view,
];
