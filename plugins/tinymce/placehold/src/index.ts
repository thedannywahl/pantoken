import type { Editor } from "tinymce";
import { formatPlaceholdString, PLACEHOLD_STRINGS, type PlaceholdStrings } from "./strings.js";

/** The plugin name used in TinyMCE's `plugins` option. */
export const PLACEHOLD_PLUGIN_NAME = "placehold";
/** The control name used in TinyMCE's `toolbar` option. */
export const PLACEHOLD_TOOLBAR_NAME = "placehold";
/** The command that opens the placeholder image dialog. */
export const PLACEHOLD_COMMAND = "pantokenOpenPlacehold";

/** Author-controlled values used to build a placeholder image. */
export interface PlaceholdImageInput {
  width: number | string;
  height: number | string;
  backgroundColor: string;
  textColor: string;
  text?: string;
  altText?: string;
}

/** Validated placeholder image data passed to TinyMCE and consumers. */
export interface PlaceholdImage {
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  text: string;
  altText: string;
  url: string;
}

/** Configuration for {@link createPlaceholdPlugin}. */
export interface PlaceholdPluginOptions {
  /** Initial values shown when the dialog opens. */
  defaults?: Partial<PlaceholdImageInput>;
  /** Resolved interface strings, typically generated from the `tinymce.strings` catalog. */
  strings?: Partial<PlaceholdStrings>;
  /** Called after the generated image has been inserted. */
  onInsert?: (image: PlaceholdImage) => void;
}

const DEFAULT_INPUT: PlaceholdImageInput = {
  width: 600,
  height: 400,
  backgroundColor: "#eeeeee",
  textColor: "#31343c",
  text: "",
  altText: "",
};
const DIMENSION_MIN = 10;
const DIMENSION_MAX = 4000;
const HEX_COLOR = /^#?(?:[\da-f]{3}|[\da-f]{6})$/iu;

function parseDimension(value: number | string): number {
  const dimension = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(dimension) || dimension < DIMENSION_MIN || dimension > DIMENSION_MAX) {
    throw new RangeError("invalid-dimensions");
  }
  return dimension;
}

function normalizeColor(value: string): string {
  if (!HEX_COLOR.test(value)) throw new TypeError("invalid-color");
  return value.replace(/^#/u, "").toUpperCase();
}

/** Validate image input and build its explicit placehold.co PNG URL. */
export function buildPlaceholdImage(
  input: PlaceholdImageInput,
  strings: PlaceholdStrings = PLACEHOLD_STRINGS,
): PlaceholdImage {
  const width = parseDimension(input.width);
  const height = parseDimension(input.height);
  const backgroundColor = normalizeColor(input.backgroundColor);
  const textColor = normalizeColor(input.textColor);
  const text = input.text ?? "";
  const requestedAltText = input.altText ?? "";
  const altText =
    requestedAltText ||
    text ||
    formatPlaceholdString(strings.placeholdAltFallback, {
      width,
      height,
    });
  const url = new URL(
    `https://placehold.co/${width}x${height}/${backgroundColor}/${textColor}.png`,
  );
  if (text) url.searchParams.set("text", text);

  return {
    width,
    height,
    backgroundColor,
    textColor,
    text,
    altText,
    url: url.toString(),
  };
}

/** Build the TinyMCE plugin callback for the Placehold image interface. */
export function createPlaceholdPlugin(options: PlaceholdPluginOptions = {}) {
  return function pantokenPlaceholdPlugin(editor: Editor) {
    const strings: PlaceholdStrings = { ...PLACEHOLD_STRINGS, ...options.strings };
    const defaults = { ...DEFAULT_INPUT, ...options.defaults };
    const openDialog = (): void => {
      editor.windowManager.open({
        title: strings.placeholdDialogTitle,
        body: {
          type: "panel",
          items: [
            { type: "input", name: "width", label: strings.placeholdWidthLabel },
            { type: "input", name: "height", label: strings.placeholdHeightLabel },
            {
              type: "colorinput",
              name: "backgroundColor",
              label: strings.placeholdBackgroundColorLabel,
            },
            { type: "colorinput", name: "textColor", label: strings.placeholdTextColorLabel },
            { type: "input", name: "text", label: strings.placeholdTextLabel },
            { type: "input", name: "altText", label: strings.placeholdAltTextLabel },
          ],
        },
        initialData: {
          width: String(defaults.width),
          height: String(defaults.height),
          backgroundColor: defaults.backgroundColor,
          textColor: defaults.textColor,
          text: defaults.text ?? "",
          altText: defaults.altText ?? "",
        },
        buttons: [
          { type: "cancel", text: strings.placeholdCancelButton },
          { type: "submit", text: strings.placeholdInsertButton, primary: true },
        ],
        onSubmit: (api): void => {
          try {
            const image = buildPlaceholdImage(
              api.getData() as unknown as PlaceholdImageInput,
              strings,
            );
            const html = editor.dom.createHTML("img", {
              class: "instui-img",
              src: image.url,
              alt: image.altText,
              width: String(image.width),
              height: String(image.height),
            });
            editor.insertContent(html);
            api.close();
            options.onInsert?.(image);
          } catch (error) {
            editor.windowManager.alert(
              error instanceof RangeError
                ? strings.placeholdInvalidDimensions
                : strings.placeholdInvalidColor,
            );
          }
        },
      });
    };

    editor.addCommand(PLACEHOLD_COMMAND, openDialog);
    editor.ui.registry.addButton(PLACEHOLD_TOOLBAR_NAME, {
      icon: "add-file",
      tooltip: strings.placeholdToolbarTooltip,
      onAction: openDialog,
    });
    editor.ui.registry.addMenuItem(PLACEHOLD_TOOLBAR_NAME, {
      text: strings.placeholdMenuText,
      icon: "add-file",
      onAction: openDialog,
    });

    return {};
  };
}

export { PLACEHOLD_STRINGS, type PlaceholdStrings } from "./strings.js";
