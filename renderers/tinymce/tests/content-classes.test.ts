/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import {
  createContentClassesPlugin,
  normalizePantokenContent,
  PANTOKEN_COMMANDS,
} from "../src/plugins/content-classes.js";

function fakeEditor() {
  const commands = new Map<string, (ui: boolean, value?: unknown) => void>();
  const listeners = new Map<string, (event: { node: ParentNode }) => void>();
  const body = document.createElement("div");
  const formatter = { register: vi.fn(), toggle: vi.fn() };
  return {
    addCommand: vi.fn((name: string, command: (ui: boolean, value?: unknown) => void) =>
      commands.set(name, command),
    ),
    execCommand: vi.fn(),
    formatter,
    getBody: () => body,
    on: vi.fn((names: string, handler: (event: { node: ParentNode }) => void) => {
      for (const name of names.split(" ")) listeners.set(name, handler);
    }),
    commands,
    listeners,
    body,
  };
}

test("normalizes supported elements without replacing existing classes", () => {
  const root = document.createElement("div");
  root.innerHTML =
    '<p class="authored">Text <a href="#">link</a></p><h2>Heading</h2>' +
    '<ul><li>Item</li></ul><dl><dt>Term</dt></dl><table></table><img alt="">' +
    '<div style="text-align: left"></div><div style="text-align: center"></div>' +
    '<div style="text-align: right"></div><div align="justify"></div>';

  normalizePantokenContent(root);
  normalizePantokenContent(root);

  expect(root.querySelector("p")?.className).toBe("authored instui-text");
  expect(root.querySelector("a")?.className).toBe("instui-link -inline");
  expect(root.querySelector("h2")?.className).toBe("instui-heading -level-h2");
  expect(root.querySelector("ul")?.className).toBe("instui-list");
  expect(root.querySelector("dl")?.className).toBe("instui-list");
  expect(root.querySelector("table")?.className).toBe("instui-table");
  expect(root.querySelector("img")?.className).toBe("instui-img");
  expect([...root.querySelectorAll("div")].map((element) => element.className)).toEqual([
    "--text-align-start",
    "--text-align-center",
    "--text-align-end",
    "--text-align-justify",
  ]);
});

test("normalizes a supported root element", () => {
  const root = document.createElement("img");
  normalizePantokenContent(root, "course");
  expect(root.className).toBe("course-img");
});

test("registers semantic font sizes and delegates explicit commands", () => {
  const editor = fakeEditor();
  createContentClassesPlugin()(editor as never);

  editor.listeners.get("PreInit")?.({ node: editor.body });
  expect(editor.formatter.register).toHaveBeenCalledTimes(5);
  expect(editor.formatter.register).toHaveBeenCalledWith("pantoken-size-md", {
    inline: "span",
    classes: "instui-text",
  });
  expect(editor.formatter.register).toHaveBeenCalledWith("pantoken-size-lg", {
    inline: "span",
    classes: "instui-text -size-lg",
  });

  editor.commands.get(PANTOKEN_COMMANDS.heading3)?.(false);
  expect(editor.execCommand).toHaveBeenCalledWith("FormatBlock", false, "h3");

  editor.commands.get(PANTOKEN_COMMANDS.fontSize)?.(false, "xl");
  expect(editor.formatter.toggle).toHaveBeenCalledWith("pantoken-size-xl");

  editor.commands.get(PANTOKEN_COMMANDS.fontSize)?.(false, "unknown");
  expect(editor.formatter.toggle).toHaveBeenCalledTimes(1);

  editor.commands.get(PANTOKEN_COMMANDS.hilitecolor)?.(false, "#fff000");
  expect(editor.execCommand).toHaveBeenCalledWith("HiliteColor", false, "#fff000");
});

test.each([
  [PANTOKEN_COMMANDS.paragraph, "FormatBlock", "p"],
  [PANTOKEN_COMMANDS.heading2, "FormatBlock", "h2"],
  [PANTOKEN_COMMANDS.heading4, "FormatBlock", "h4"],
  [PANTOKEN_COMMANDS.heading5, "FormatBlock", "h5"],
  [PANTOKEN_COMMANDS.heading6, "FormatBlock", "h6"],
  [PANTOKEN_COMMANDS.bold, "Bold", undefined],
  [PANTOKEN_COMMANDS.italic, "Italic", undefined],
  [PANTOKEN_COMMANDS.underline, "Underline", undefined],
  [PANTOKEN_COMMANDS.forecolor, "ForeColor", "#123456"],
  [PANTOKEN_COMMANDS.superscript, "Superscript", undefined],
  [PANTOKEN_COMMANDS.subscript, "Subscript", undefined],
  [PANTOKEN_COMMANDS.link, "mceLink", { href: "https://example.com" }],
  [PANTOKEN_COMMANDS.image, "mceImage", undefined],
  [PANTOKEN_COMMANDS.alignStart, "JustifyLeft", undefined],
  [PANTOKEN_COMMANDS.alignCenter, "JustifyCenter", undefined],
  [PANTOKEN_COMMANDS.alignEnd, "JustifyRight", undefined],
  [PANTOKEN_COMMANDS.alignJustify, "JustifyFull", undefined],
  [PANTOKEN_COMMANDS.table, "mceInsertTable", { rows: 2, columns: 3 }],
] as const)("delegates %s to %s", (pantokenCommand, nativeCommand, value) => {
  const editor = fakeEditor();
  createContentClassesPlugin()(editor as never);
  editor.commands.get(pantokenCommand)?.(false, value);
  expect(editor.execCommand).toHaveBeenCalledWith(nativeCommand, false, value);
});

test("merges list attributes and normalizes stock command output", () => {
  const editor = fakeEditor();
  createContentClassesPlugin({ prefix: "course" })(editor as never);

  editor.commands.get(PANTOKEN_COMMANDS.unorderedList)?.(false, {
    "list-style-type": "square",
    "list-attributes": { class: "authored", title: "Items" },
  });
  expect(editor.execCommand).toHaveBeenCalledWith("InsertUnorderedList", false, {
    "list-style-type": "square",
    "list-attributes": { class: "authored course-list", title: "Items" },
  });

  editor.commands.get(PANTOKEN_COMMANDS.orderedList)?.(false);
  expect(editor.execCommand).toHaveBeenCalledWith("InsertOrderedList", false, {
    "list-attributes": { class: "course-list" },
  });
  editor.commands.get(PANTOKEN_COMMANDS.definitionList)?.(false, {
    "list-item-attributes": { class: "term" },
  });
  expect(editor.execCommand).toHaveBeenCalledWith("InsertDefinitionList", false, {
    "list-attributes": { class: "course-list" },
    "list-item-attributes": { class: "term" },
  });

  editor.body.innerHTML = '<img class="authored"><table></table>';
  editor.listeners.get("change")?.({ node: editor.body });
  expect(editor.body.querySelector("img")?.className).toBe("authored course-img");
  expect(editor.body.querySelector("table")?.className).toBe("course-table");

  const image = document.createElement("img");
  editor.listeners.get("PreProcess")?.({ node: image });
  expect(image.className).toBe("course-img");
});
