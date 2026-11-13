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
  const listeners = new Map<string, (event: { node: ParentNode; command?: string }) => void>();
  const body = document.createElement("div");
  const formatter = { register: vi.fn(), toggle: vi.fn() };
  const nativeCommand = vi.fn();
  return {
    addCommand: vi.fn((name: string, command: (ui: boolean, value?: unknown) => void) =>
      commands.set(name, command),
    ),
    execCommand: vi.fn((command: string, ui: boolean, value?: unknown) => {
      listeners.get("BeforeExecCommand")?.({ node: body, command });
      nativeCommand(command, ui, value);
      listeners.get("ExecCommand")?.({ node: body, command });
    }),
    nativeCommand,
    selection: { getSelectedBlocks: vi.fn((): Element[] => []) },
    formatter,
    getBody: () => body,
    on: vi.fn((names: string, handler: (event: { node: ParentNode; command?: string }) => void) => {
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

test("merges list attributes without normalizing passive editor events", () => {
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
  expect(editor.body.querySelector("img")?.className).toBe("authored");
  expect(editor.body.querySelector("table")?.hasAttribute("class")).toBe(false);

  const image = document.createElement("img");
  editor.listeners.get("PreProcess")?.({ node: image });
  expect(image.hasAttribute("class")).toBe(false);
});

test("preserves the imported grid example through passive editing and serialization", () => {
  const editor = fakeEditor();
  createContentClassesPlugin()(editor as never);
  editor.body.innerHTML = `<div style="padding: 20px; background-color: #cdc1ab30;">
    <p>Add intro text here.</p>
    <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit,minmax(clamp(50% - 20px,(40rem - 100%) * 999,100%),1fr));">
        <div style="padding: 20px; background-color: #ffffff;">
            <h2>Header 2</h2>
            <p>add text here</p>
        </div>
        <div style="padding: 20px; background-color: #ffffff;">
            <h2>Header 2</h2>
            <p>add text here</p>
        </div>
    </div>
</div>`;
  const authored = editor.body.innerHTML;

  for (const event of ["SetContent", "change", "PreProcess"]) {
    editor.listeners.get(event)?.({ node: editor.body });
    expect(editor.body.innerHTML).toBe(authored);
  }
  for (const command of [
    "mceInsertContent",
    "mceSetContent",
    "Undo",
    "Redo",
    "Bold",
    "constructor",
    "__proto__",
  ]) {
    editor.execCommand(command, false);
    expect(editor.body.innerHTML).toBe(authored);
  }
  expect(editor.body.querySelector("[class]")).toBeNull();
});

test("formats only selected paragraphs, without inferring classes from their children", () => {
  const editor = fakeEditor();
  editor.body.innerHTML = '<p class="authored"><a href="#">Selected link</a></p><p>Unrelated</p>';
  const selected = editor.body.firstElementChild!;
  editor.selection.getSelectedBlocks.mockReturnValue([selected]);
  createContentClassesPlugin()(editor as never);

  editor.commands.get(PANTOKEN_COMMANDS.paragraph)?.(false);

  expect(selected.className).toBe("authored instui-text");
  expect(selected.querySelector("a")?.hasAttribute("class")).toBe(false);
  expect(editor.body.lastElementChild?.hasAttribute("class")).toBe(false);
});

test.each([
  ["FormatBlock", "<h2>Heading</h2>", "instui-heading -level-h2"],
  ["InsertUnorderedList", "<ul><li>Item</li></ul>", "instui-list"],
  ["InsertOrderedList", "<ol><li>Item</li></ol>", "instui-list"],
  ["InsertDefinitionList", "<dl><dt>Term</dt></dl>", "instui-list"],
  ["mceInsertLink", '<a href="#">Link</a>', "instui-link -inline"],
  ["mceUpdateImage", '<img alt="New image">', "instui-img"],
  ["mceInsertTable", "<table><tbody><tr><td>Cell</td></tr></tbody></table>", "instui-table"],
])("adds classes only to targets created by %s", (command, html, className) => {
  const editor = fakeEditor();
  editor.body.innerHTML =
    '<p class="authored">Text <a href="#">link</a></p><h2>Heading</h2>' +
    "<ul><li>Item</li></ul><ol><li>Item</li></ol><dl><dt>Term</dt></dl>" +
    '<img alt="Existing image"><table></table>';
  const authored = editor.body.innerHTML;
  createContentClassesPlugin()(editor as never);
  editor.nativeCommand.mockImplementation(() => editor.body.insertAdjacentHTML("beforeend", html));

  editor.execCommand(command, false);

  const inserted = editor.body.lastElementChild!;
  expect(inserted.className).toBe(className);
  inserted.remove();
  expect(editor.body.innerHTML).toBe(authored);
});

test("alignment adds only the requested utility to changed targets", () => {
  const editor = fakeEditor();
  editor.body.innerHTML =
    '<p class="authored">Selected</p><p style="text-align: right">Unrelated</p>';
  const selected = editor.body.firstElementChild as HTMLElement;
  const unrelated = editor.body.lastElementChild!.outerHTML;
  createContentClassesPlugin()(editor as never);
  editor.nativeCommand.mockImplementation(() => {
    selected.style.textAlign = "center";
  });

  editor.execCommand("JustifyCenter", false);

  expect(selected.className).toBe("authored --text-align-center");
  expect(editor.body.lastElementChild!.outerHTML).toBe(unrelated);
});

test("changing an image preserves authored attributes without styling unrelated content", () => {
  const editor = fakeEditor();
  editor.body.innerHTML =
    '<img class="authored" src="old.png" style="width: 30px"><p>Unrelated</p>';
  const image = editor.body.firstElementChild!;
  createContentClassesPlugin({ prefix: "course" })(editor as never);
  editor.nativeCommand.mockImplementation(() => image.setAttribute("src", "new.png"));

  editor.execCommand("mceUpdateImage", false);

  expect(image.className).toBe("authored course-img");
  expect(image.getAttribute("style")).toBe("width: 30px");
  expect(editor.body.lastElementChild?.hasAttribute("class")).toBe(false);
});

test("replaces heading level modifiers only on the formatted heading", () => {
  const editor = fakeEditor();
  editor.body.innerHTML =
    '<h2 class="authored instui-heading -level-h3">Selected</h2><h2>Other</h2>';
  const selected = editor.body.firstElementChild!;
  editor.selection.getSelectedBlocks.mockReturnValue([selected]);
  createContentClassesPlugin()(editor as never);

  editor.execCommand("FormatBlock", false, "h2");

  expect(selected.className).toBe("authored instui-heading -level-h2");
  expect(editor.body.lastElementChild?.hasAttribute("class")).toBe(false);
});

test("ignores editor-only selection attribute changes on unrelated images", () => {
  const editor = fakeEditor();
  editor.body.innerHTML = '<img data-mce-selected="1" alt="Old selection">';
  const existing = editor.body.firstElementChild!;
  createContentClassesPlugin()(editor as never);
  editor.nativeCommand.mockImplementation(() => {
    existing.removeAttribute("data-mce-selected");
    editor.body.insertAdjacentHTML("beforeend", '<img alt="New selection">');
  });

  editor.execCommand("mceUpdateImage", false);

  expect(existing.hasAttribute("class")).toBe(false);
  expect(editor.body.lastElementChild?.className).toBe("instui-img");
});
