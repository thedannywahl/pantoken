import { icons } from "@pantoken/icons";
import { ELEMENTS } from "./lib/elements-meta.ts";

type JsonSchema = Record<string, unknown>;
type ElementName = (typeof ELEMENTS)[number];
type AttributeMode = "boolean" | "boolean-string" | "media-url" | "popover-open";

/** A safe A2UI schema and rendering mapping for one Pantoken property. */
export interface A2uiPropertyContract {
  schema: JsonSchema;
  attribute?: string;
  mode?: AttributeMode;
  minimum?: number;
  maximum?: number;
}

/** Maps a Pantoken interaction event to an A2UI property update. */
export interface A2uiValueChange {
  event: string;
  property: string;
  detailProperty?: string;
  kind?: "toggle" | "tab-index" | "close" | "popover-state";
}

/** The A2UI schema and rendering behavior for one exported web component. */
export interface A2uiComponentContract {
  description: string;
  properties?: Record<string, A2uiPropertyContract>;
  required?: readonly string[];
  contentProperty?: string;
  children?: "slot" | "tree" | "pages" | "tabs" | "drawer";
  special?: "icon-button" | "tooltip" | "tree" | "pages" | "tabs" | "drilldown" | "drawer";
  actionEvents?: readonly string[];
  valueChange?: A2uiValueChange;
  attributeChange?: { attribute: string; property: string };
}

const REFS = {
  action: "common_types.json#/$defs/Action",
  boolean: "common_types.json#/$defs/DynamicBoolean",
  childList: "common_types.json#/$defs/ChildList",
  componentId: "common_types.json#/$defs/ComponentId",
  mediaUrl: "common_types.json#/$defs/MediaUrl",
  number: "common_types.json#/$defs/DynamicNumber",
  string: "common_types.json#/$defs/DynamicString",
} as const;

const dynamicString: JsonSchema = { $ref: REFS.string };
const dynamicNumber: JsonSchema = { $ref: REFS.number };
const dynamicBoolean: JsonSchema = { $ref: REFS.boolean };
const childList: JsonSchema = { $ref: REFS.childList, minItems: 1, maxItems: 32 };
const action: JsonSchema = { $ref: REFS.action };
const componentId: JsonSchema = { $ref: REFS.componentId };
const mediaUrl: JsonSchema = { $ref: REFS.mediaUrl };
const iconNames = icons.map(({ name }) => name);

function property(
  schema: JsonSchema,
  attribute?: string,
  mode?: AttributeMode,
  bounds?: { minimum?: number; maximum?: number },
): A2uiPropertyContract {
  return {
    schema,
    ...(attribute ? { attribute } : {}),
    ...(mode ? { mode } : {}),
    ...bounds,
  };
}

function text(attribute?: string): A2uiPropertyContract {
  return property(dynamicString, attribute);
}

function number(
  attribute: string,
  bounds?: { minimum?: number; maximum?: number },
): A2uiPropertyContract {
  return property(dynamicNumber, attribute, undefined, bounds);
}

function boolean(
  attribute: string,
  mode: "boolean" | "boolean-string" = "boolean",
): A2uiPropertyContract {
  return property(dynamicBoolean, attribute, mode);
}

function enumeration(
  values: readonly string[],
  attribute?: string,
  defaultValue?: string,
): A2uiPropertyContract {
  return property(
    {
      type: "string",
      enum: [...values],
      ...(defaultValue ? { default: defaultValue } : {}),
    },
    attribute,
  );
}

function schemaEnum(values: readonly string[]): JsonSchema {
  return { type: "string", enum: [...values] };
}

function listOf(items: JsonSchema, minimum: number, maximum: number): JsonSchema {
  return { type: "array", items, minItems: minimum, maxItems: maximum };
}

const buttonVariants = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "success",
  "ai",
  "ai-secondary",
] as const;

const drilldownPageId = { type: "string", pattern: "^[A-Za-z0-9_-]{1,64}$" };
const drilldownPages: JsonSchema = {
  type: "array",
  minItems: 1,
  maxItems: 32,
  items: {
    type: "object",
    properties: {
      id: drilldownPageId,
      items: {
        type: "array",
        minItems: 1,
        maxItems: 64,
        items: {
          type: "object",
          properties: {
            back: dynamicBoolean,
            label: dynamicString,
            target: drilldownPageId,
          },
          required: ["label"],
          additionalProperties: false,
        },
      },
    },
    required: ["id", "items"],
    additionalProperties: false,
  },
};

/** Contracts are exhaustive against ELEMENTS; adding a web component requires an explicit A2UI contract. */
export const A2UI_COMPONENTS: Record<ElementName, A2uiComponentContract> = {
  icon: {
    description: "An inline glyph selected from Pantoken's icon set.",
    properties: {
      name: property(schemaEnum(iconNames), "name"),
      size: enumeration(["1em", "1.25em", "1.5em", "2em"], "size", "1em"),
    },
    required: ["name"],
  },
  button: {
    description:
      "A token-styled action button with optional A2UI event and Invoker Commands behavior.",
    properties: {
      label: text(),
      variant: enumeration(buttonVariants, "variant", "primary"),
      commandTarget: property(componentId, "commandfor"),
      command: enumeration(
        ["--show", "--close", "--toggle", "--push", "--back", "--goto"],
        "command",
      ),
      popoverTarget: property(componentId, "popovertarget"),
      popoverAction: enumeration(["toggle", "show", "hide"], "popovertargetaction"),
    },
    required: ["label"],
    contentProperty: "label",
    children: "slot",
    actionEvents: ["click"],
  },
  alert: {
    description: "A status message with optional timeout dismissal.",
    properties: {
      variant: enumeration(["info", "success", "warning", "danger"], "variant", "info"),
      timeout: number("timeout", { minimum: 0, maximum: 300_000 }),
      transition: enumeration(["fade", "none"], "transition", "fade"),
      hasShadow: boolean("has-shadow", "boolean-string"),
      message: text(),
    },
    contentProperty: "message",
    children: "slot",
    actionEvents: ["dismiss"],
  },
  badge: {
    description: "A compact count or status badge.",
    properties: {
      variant: enumeration(["success", "danger", "inverse"], "variant"),
      label: text(),
    },
    contentProperty: "label",
    children: "slot",
  },
  pill: {
    description: "A compact status pill.",
    properties: {
      variant: enumeration(
        [
          "neutral",
          "info",
          "success",
          "warning",
          "danger",
          "plum",
          "aurora",
          "sky",
          "orange",
          "violet",
          "sea",
          "stone",
        ],
        "variant",
      ),
      label: text(),
    },
    contentProperty: "label",
    children: "slot",
  },
  tag: {
    description: "A token-styled tag or chip.",
    properties: {
      label: text(),
    },
    contentProperty: "label",
    children: "slot",
  },
  avatar: {
    description: "An initials avatar with a constrained palette, size, and shape.",
    properties: {
      variant: enumeration(["ai", "blue", "green", "grey", "orange", "red"], "variant"),
      size: enumeration(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"], "size"),
      shape: enumeration(["rectangle"], "shape"),
      initials: text(),
    },
    contentProperty: "initials",
    children: "slot",
  },
  spinner: {
    description: "A loading status indicator.",
    properties: {
      variant: enumeration(["inverse", "ai", "ai-on-color"], "variant"),
    },
  },
  progress: {
    description: "A horizontal progress or meter indicator.",
    properties: {
      valueNow: number("value-now", { minimum: 0, maximum: 1_000_000 }),
      min: number("min", { minimum: 0, maximum: 1_000_000 }),
      valueMax: number("value-max", { minimum: 1, maximum: 1_000_000 }),
      variant: enumeration(
        ["brand", "info", "success", "warning", "danger", "inverse", "primary-inverse"],
        "variant",
      ),
      label: text("label"),
      shouldAnimate: boolean("should-animate"),
    },
  },
  metric: {
    description: "A large value paired with a descriptive label.",
    properties: {
      value: text("value"),
      label: text("label"),
    },
    required: ["value", "label"],
  },
  rating: {
    description: "A read-only star rating with a bounded number of stars.",
    properties: {
      value: number("value", { minimum: 0, maximum: 10 }),
      max: number("max", { minimum: 1, maximum: 10 }),
      label: text("label"),
    },
  },
  "progress-circle": {
    description: "A circular progress or meter indicator.",
    properties: {
      valueNow: number("value-now", { minimum: 0, maximum: 1_000_000 }),
      min: number("min", { minimum: 0, maximum: 1_000_000 }),
      valueMax: number("value-max", { minimum: 1, maximum: 1_000_000 }),
      label: text("label"),
      shouldAnimate: boolean("should-animate"),
      animationDelay: number("animation-delay", { minimum: 0, maximum: 10_000 }),
    },
  },
  "icon-button": {
    description: "An icon-only button with an accessible label.",
    properties: {
      label: text("label"),
      iconName: property(schemaEnum(iconNames)),
    },
    required: ["label", "iconName"],
    special: "icon-button",
    actionEvents: ["click"],
  },
  "toggle-button": {
    description: "A two-state button whose pressed state is bound to A2UI data.",
    properties: {
      pressed: boolean("pressed", "boolean-string"),
      label: text(),
    },
    contentProperty: "label",
    children: "slot",
    actionEvents: ["click"],
    valueChange: { event: "click", property: "pressed", kind: "toggle" },
  },
  truncate: {
    description: "A clamped text region with an allowlisted line count.",
    properties: {
      lines: enumeration(["auto", "1", "2", "3", "4", "5", "6"], "lines"),
      text: text(),
    },
    contentProperty: "text",
    children: "slot",
  },
  img: {
    description: "A responsive image with a sanitized media URL and constrained presentation.",
    properties: {
      src: property(mediaUrl, "src", "media-url"),
      alt: text("alt"),
      constrain: enumeration(["cover", "contain"], "constrain"),
      display: enumeration(["block"], "display"),
    },
    required: ["src", "alt"],
  },
  "side-nav-bar": {
    description: "A vertical navigation rail that can collapse to icon-only presentation.",
    properties: {
      minimized: boolean("minimized", "boolean-string"),
    },
    children: "slot",
  },
  "tree-browser": {
    description: "An accessible tree whose child components are exposed as focusable tree items.",
    properties: {
      label: text("aria-label"),
    },
    required: ["label", "children"],
    children: "tree",
    special: "tree",
    actionEvents: ["click"],
  },
  calendar: {
    description: "An interactive month calendar that updates its selected ISO date.",
    properties: {
      value: text("value"),
      view: text("view"),
    },
    actionEvents: ["change"],
    valueChange: { event: "change", property: "value", detailProperty: "value" },
  },
  tooltip: {
    description: "A noninteractive tooltip around a trigger component.",
    properties: {
      triggerLabel: text(),
      tip: text("tip"),
      placement: enumeration(["top", "bottom", "start", "end"], "placement", "top"),
      showDelay: number("show-delay", { minimum: 0, maximum: 10_000 }),
      hideDelay: number("hide-delay", { minimum: 0, maximum: 10_000 }),
    },
    required: ["triggerLabel", "tip"],
    contentProperty: "triggerLabel",
    children: "slot",
    special: "tooltip",
    actionEvents: ["click"],
  },
  modal: {
    description: "A native dialog with command-driven open and close behavior.",
    properties: {
      open: boolean("open"),
    },
    children: "slot",
    actionEvents: ["close"],
    valueChange: { event: "close", property: "open", kind: "close" },
  },
  "context-view": {
    description: "A callout popover with Pantoken styling.",
    properties: {
      open: property(dynamicBoolean, undefined, "popover-open"),
    },
    children: "slot",
    actionEvents: ["toggle"],
    valueChange: { event: "toggle", property: "open", kind: "popover-state" },
  },
  popover: {
    description: "A floating popover surface.",
    properties: {
      open: property(dynamicBoolean, undefined, "popover-open"),
    },
    children: "slot",
    actionEvents: ["toggle"],
    valueChange: { event: "toggle", property: "open", kind: "popover-state" },
  },
  tray: {
    description: "A viewport-edge popover panel with constrained placement and size.",
    properties: {
      placement: enumeration(["top", "bottom", "start", "end"], "placement", "start"),
      size: enumeration(["xs", "sm", "md", "lg", "xl"], "size", "md"),
      open: property(dynamicBoolean, undefined, "popover-open"),
    },
    children: "slot",
    actionEvents: ["toggle"],
    valueChange: { event: "toggle", property: "open", kind: "popover-state" },
  },
  "in-place-edit": {
    description: "An inline editable value with A2UI state updates.",
    properties: {
      value: text("value"),
      readOnly: boolean("readonly"),
      inputType: enumeration(["text", "number", "email", "url", "tel", "search"], "input-type"),
    },
    required: ["value"],
    actionEvents: ["change"],
    valueChange: { event: "change", property: "value", detailProperty: "value" },
  },
  drilldown: {
    description: "A nested menu built from safe page and item data.",
    properties: {
      active: text("active"),
      pages: property(drilldownPages),
    },
    required: ["pages"],
    special: "drilldown",
    actionEvents: ["navigate"],
    valueChange: { event: "navigate", property: "active", detailProperty: "page" },
  },
  pages: {
    description: "A history-aware set of A2UI child panels.",
    properties: {
      active: text("active"),
    },
    required: ["children"],
    children: "pages",
    special: "pages",
    actionEvents: ["change"],
    valueChange: { event: "change", property: "active", detailProperty: "page" },
  },
  "drawer-layout": {
    description: "A responsive content and tray layout with command-driven open state.",
    properties: {
      open: boolean("open"),
      placement: enumeration(["start", "end"], "placement", "start"),
      shouldOverlayTray: boolean("should-overlay-tray"),
      trayLabel: text("tray-label"),
      contentLabel: text("content-label"),
      trayChildren: property(childList),
    },
    children: "drawer",
    special: "drawer",
    attributeChange: { attribute: "open", property: "open" },
  },
  "date-input": {
    description: "A date field with a calendar popover and ISO value updates.",
    properties: {
      value: text("value"),
      label: text("label"),
      placeholder: text("placeholder"),
    },
    actionEvents: ["change"],
    valueChange: { event: "change", property: "value", detailProperty: "value" },
  },
  "date-time-input": {
    description: "A combined date and time field with an ISO value update.",
    properties: {
      value: text("value"),
    },
    actionEvents: ["change"],
    valueChange: { event: "change", property: "value", detailProperty: "value" },
  },
  tabs: {
    description: "An accessible tab set pairing A2UI child panels with labels.",
    properties: {
      label: text(),
      tabLabels: property(listOf(dynamicString, 1, 16)),
      activeIndex: number("active-index", { minimum: 0, maximum: 15 }),
    },
    required: ["label", "tabLabels", "children"],
    children: "tabs",
    special: "tabs",
    actionEvents: ["click"],
    valueChange: { event: "click", property: "activeIndex", kind: "tab-index" },
  },
};

/** Return the versioned A2UI catalog name for an exported web component. */
export function a2uiNameForElement(element: ElementName): string {
  return `Pantoken${element
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join("")}`;
}

/** Build the catalog properties for a component contract. */
export function a2uiPropertiesFor(contract: A2uiComponentContract): Record<string, JsonSchema> {
  const properties = Object.fromEntries(
    Object.entries(contract.properties ?? {}).map(([name, definition]) => {
      const schema = {
        ...definition.schema,
        ...(definition.minimum !== undefined ? { minimum: definition.minimum } : {}),
        ...(definition.maximum !== undefined ? { maximum: definition.maximum } : {}),
      };
      return [name, schema];
    }),
  );
  if (contract.children) properties.children = childList;
  if (contract.actionEvents?.length) properties.action = action;
  return properties;
}
