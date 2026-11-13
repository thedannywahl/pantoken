import type { Editor } from "tinymce";

/** Plugin name to pass in TinyMCE's `plugins` option. */
export const CONTENT_CLASSES_PLUGIN_NAME = "pantoken_content_classes";

/** Commands exposed for hosts that want explicit pantoken-aware toolbar actions. */
export const PANTOKEN_COMMANDS = {
  paragraph: "pantokenParagraph",
  heading2: "pantokenHeading2",
  heading3: "pantokenHeading3",
  heading4: "pantokenHeading4",
  heading5: "pantokenHeading5",
  heading6: "pantokenHeading6",
  fontSize: "pantokenFontSize",
  bold: "pantokenBold",
  italic: "pantokenItalic",
  underline: "pantokenUnderline",
  forecolor: "pantokenForecolor",
  hilitecolor: "pantokenHilitecolor",
  superscript: "pantokenSuperscript",
  subscript: "pantokenSubscript",
  link: "pantokenLink",
  image: "pantokenImage",
  alignStart: "pantokenAlignStart",
  alignCenter: "pantokenAlignCenter",
  alignEnd: "pantokenAlignEnd",
  alignJustify: "pantokenAlignJustify",
  unorderedList: "pantokenUnorderedList",
  orderedList: "pantokenOrderedList",
  definitionList: "pantokenDefinitionList",
  table: "pantokenTable",
} as const;

/** Semantic text sizes accepted by the pantoken font-size command. */
export type PantokenFontSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Options for {@link createContentClassesPlugin}. */
export interface ContentClassesPluginOptions {
  /** Prefix used by pantoken component classes. */
  prefix?: string;
}

type CommandValue = Record<string, unknown> | string | undefined;

const ALIGNMENT_CLASSES = [
  "--text-align-start",
  "--text-align-center",
  "--text-align-end",
  "--text-align-justify",
] as const;

function addClasses(element: Element, ...classes: string[]): void {
  element.classList.add(...classes);
}

function normalizeAlignment(element: Element): void {
  const alignment =
    (element as HTMLElement).style?.textAlign || element.getAttribute("align") || "";
  const className =
    alignment === "left" || alignment === "start"
      ? "--text-align-start"
      : alignment === "center"
        ? "--text-align-center"
        : alignment === "right" || alignment === "end"
          ? "--text-align-end"
          : alignment === "justify"
            ? "--text-align-justify"
            : undefined;
  if (!className) return;
  element.classList.remove(...ALIGNMENT_CLASSES);
  element.classList.add(className);
}

function normalizeElement(element: Element, prefix: string): void {
  const tag = element.tagName.toLowerCase();
  if (tag === "p") addClasses(element, `${prefix}-text`);
  if (/^h[2-6]$/u.test(tag)) {
    element.classList.remove("-level-h2", "-level-h3", "-level-h4", "-level-h5", "-level-h6");
    addClasses(element, `${prefix}-heading`, `-level-${tag}`);
  }
  if (tag === "a") addClasses(element, `${prefix}-link`, "-inline");
  if (tag === "img") addClasses(element, `${prefix}-img`);
  if (tag === "ul" || tag === "ol" || tag === "dl") addClasses(element, `${prefix}-list`);
  if (tag === "table") addClasses(element, `${prefix}-table`);
}

/** Add pantoken classes to supported structures without replacing author-defined classes. */
export function normalizePantokenContent(root: ParentNode, prefix = "instui"): void {
  const normalize = (element: Element): void => {
    normalizeElement(element, prefix);
    normalizeAlignment(element);
  };
  if (root.nodeType === 1) normalize(root as Element);
  for (const element of root.querySelectorAll(
    "p,h2,h3,h4,h5,h6,a,img,ul,ol,dl,table,[style*='text-align'],[align]",
  )) {
    normalize(element);
  }
}

function mergeListAttributes(value: CommandValue, className: string): Record<string, unknown> {
  const detail = typeof value === "object" && value !== null ? value : {};
  const attributes =
    typeof detail["list-attributes"] === "object" && detail["list-attributes"] !== null
      ? (detail["list-attributes"] as Record<string, unknown>)
      : {};
  const existingClass = typeof attributes.class === "string" ? attributes.class : "";
  const classes = new Set(existingClass.split(/\s+/u).filter(Boolean));
  classes.add(className);
  return {
    ...detail,
    "list-attributes": { ...attributes, class: [...classes].join(" ") },
  };
}

/** Build an opt-in plugin that adds pantoken classes to TinyMCE-authored content. */
export function createContentClassesPlugin(options: ContentClassesPluginOptions = {}) {
  return function pantokenContentClassesPlugin(editor: Editor) {
    const prefix = options.prefix ?? "instui";
    const delegate =
      (command: string) =>
      (_ui: boolean, value?: CommandValue): void => {
        editor.execCommand(command, false, value);
      };

    editor.addCommand(PANTOKEN_COMMANDS.paragraph, () =>
      editor.execCommand("FormatBlock", false, "p"),
    );
    for (const level of [2, 3, 4, 5, 6] as const) {
      editor.addCommand(PANTOKEN_COMMANDS[`heading${level}`], () =>
        editor.execCommand("FormatBlock", false, `h${level}`),
      );
    }

    const sizeFormats: Record<PantokenFontSize, string> = {
      xs: "pantoken-size-xs",
      sm: "pantoken-size-sm",
      md: "pantoken-size-md",
      lg: "pantoken-size-lg",
      xl: "pantoken-size-xl",
    };
    editor.on("PreInit", () => {
      for (const [size, name] of Object.entries(sizeFormats)) {
        const modifier = size === "md" ? "" : ` -size-${size}`;
        editor.formatter.register(name, { inline: "span", classes: `${prefix}-text${modifier}` });
      }
    });
    editor.addCommand(PANTOKEN_COMMANDS.fontSize, (_ui, value) => {
      const format = sizeFormats[value as PantokenFontSize];
      if (format) editor.formatter.toggle(format);
    });

    editor.addCommand(PANTOKEN_COMMANDS.bold, delegate("Bold"));
    editor.addCommand(PANTOKEN_COMMANDS.italic, delegate("Italic"));
    editor.addCommand(PANTOKEN_COMMANDS.underline, delegate("Underline"));
    editor.addCommand(PANTOKEN_COMMANDS.forecolor, delegate("ForeColor"));
    editor.addCommand(PANTOKEN_COMMANDS.hilitecolor, delegate("HiliteColor"));
    editor.addCommand(PANTOKEN_COMMANDS.superscript, delegate("Superscript"));
    editor.addCommand(PANTOKEN_COMMANDS.subscript, delegate("Subscript"));
    editor.addCommand(PANTOKEN_COMMANDS.link, delegate("mceLink"));
    editor.addCommand(PANTOKEN_COMMANDS.image, delegate("mceImage"));
    editor.addCommand(PANTOKEN_COMMANDS.alignStart, delegate("JustifyLeft"));
    editor.addCommand(PANTOKEN_COMMANDS.alignCenter, delegate("JustifyCenter"));
    editor.addCommand(PANTOKEN_COMMANDS.alignEnd, delegate("JustifyRight"));
    editor.addCommand(PANTOKEN_COMMANDS.alignJustify, delegate("JustifyFull"));
    editor.addCommand(PANTOKEN_COMMANDS.table, delegate("mceInsertTable"));

    for (const [name, command] of [
      [PANTOKEN_COMMANDS.unorderedList, "InsertUnorderedList"],
      [PANTOKEN_COMMANDS.orderedList, "InsertOrderedList"],
      [PANTOKEN_COMMANDS.definitionList, "InsertDefinitionList"],
    ] as const) {
      editor.addCommand(name, (_ui, value) => {
        editor.execCommand(command, false, mergeListAttributes(value, `${prefix}-list`));
      });
    }

    // Only explicit formatting commands infer classes, never loading, pasting, or serialization.
    const commandSelectors: Record<string, string> = {
      formatblock: "p,h2,h3,h4,h5,h6",
      insertunorderedlist: "ul",
      insertorderedlist: "ol",
      insertdefinitionlist: "dl",
      mceinsertlink: "a",
      mceupdateimage: "img",
      mceinserttable: "table",
      justifyleft: "[style],[align]",
      justifycenter: "[style],[align]",
      justifyright: "[style],[align]",
      justifyfull: "[style],[align]",
    };
    const snapshots = new Map<string, Map<Element, string>>();
    // Editor bookkeeping can change on unrelated nodes when a command moves the selection.
    const attributes = (element: Element): string =>
      JSON.stringify(
        [...element.attributes]
          .filter(({ name }) => !name.startsWith("data-mce-"))
          .map(({ name, value }) => [name, value]),
      );

    editor.on("BeforeExecCommand", ({ command }) => {
      const key = command.toLowerCase();
      if (!Object.hasOwn(commandSelectors, key)) return;
      const selector = commandSelectors[key];
      snapshots.set(
        key,
        new Map(
          [...editor.getBody().querySelectorAll(selector)].map((element) => [
            element,
            attributes(element),
          ]),
        ),
      );
    });
    editor.on("ExecCommand", ({ command }) => {
      const key = command.toLowerCase();
      const before = snapshots.get(key);
      snapshots.delete(key);
      if (!before) return;
      const alignment = key.startsWith("justify");
      const selectedBlocks =
        key === "formatblock" ? new Set(editor.selection.getSelectedBlocks()) : undefined;
      for (const element of editor.getBody().querySelectorAll(commandSelectors[key])) {
        if (before.get(element) === attributes(element) && !selectedBlocks?.has(element)) continue;
        if (alignment) normalizeAlignment(element);
        else normalizeElement(element, prefix);
      }
    });

    return {};
  };
}
