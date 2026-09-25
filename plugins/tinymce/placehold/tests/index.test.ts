import { describe, expect, test, vi } from "vite-plus/test";
import {
  buildPlaceholdImage,
  createPlaceholdPlugin,
  PLACEHOLD_COMMAND,
  PLACEHOLD_PLUGIN_NAME,
  PLACEHOLD_TOOLBAR_NAME,
} from "../src/index.ts";

function fakeEditor() {
  const registry = { addButton: vi.fn(), addMenuItem: vi.fn() };
  return {
    addCommand: vi.fn(),
    dom: { createHTML: vi.fn(() => '<img src="safe">') },
    insertContent: vi.fn(),
    ui: { registry },
    windowManager: { alert: vi.fn(), open: vi.fn() },
  };
}

describe("buildPlaceholdImage", () => {
  test("builds an explicit PNG URL and dimension alt fallback", () => {
    expect(
      buildPlaceholdImage({
        width: 600,
        height: "400",
        backgroundColor: "#eee",
        textColor: "31343c",
      }),
    ).toEqual({
      width: 600,
      height: 400,
      backgroundColor: "EEE",
      textColor: "31343C",
      text: "",
      altText: "600 by 400 placeholder image",
      url: "https://placehold.co/600x400/EEE/31343C.png",
    });
  });

  test("encodes custom text without changing its value and uses it as the alt fallback", () => {
    const image = buildPlaceholdImage({
      width: 800,
      height: 450,
      backgroundColor: "abcdef",
      textColor: "123",
      text: "Hello & goodbye",
    });
    expect(image.text).toBe("Hello & goodbye");
    expect(image.altText).toBe("Hello & goodbye");
    expect(image.url).toBe("https://placehold.co/800x450/ABCDEF/123.png?text=Hello+%26+goodbye");
  });

  test.each([9, 4001, 12.5, "wide"])("rejects invalid dimension %s", (width) => {
    expect(() =>
      buildPlaceholdImage({
        width,
        height: 400,
        backgroundColor: "eee",
        textColor: "333",
      }),
    ).toThrow(RangeError);
  });

  test("rejects invalid colors", () => {
    expect(() =>
      buildPlaceholdImage({
        width: 600,
        height: 400,
        backgroundColor: "transparent",
        textColor: "333",
      }),
    ).toThrow(TypeError);
  });
});

describe("createPlaceholdPlugin", () => {
  test("exports stable TinyMCE names and registers the add-file interface", () => {
    expect(PLACEHOLD_PLUGIN_NAME).toBe("placehold");
    expect(PLACEHOLD_TOOLBAR_NAME).toBe("placehold");
    const editor = fakeEditor();
    createPlaceholdPlugin()(editor as never);

    expect(editor.addCommand).toHaveBeenCalledWith(PLACEHOLD_COMMAND, expect.any(Function));
    expect(editor.ui.registry.addButton).toHaveBeenCalledWith(
      PLACEHOLD_TOOLBAR_NAME,
      expect.objectContaining({ icon: "add-file", tooltip: "Insert a placeholder image" }),
    );
    expect(editor.ui.registry.addMenuItem).toHaveBeenCalledWith(
      PLACEHOLD_TOOLBAR_NAME,
      expect.objectContaining({ icon: "add-file", text: "Placeholder image…" }),
    );
  });

  test("opens localized controls and safely inserts the submitted image", () => {
    const editor = fakeEditor();
    const onInsert = vi.fn();
    createPlaceholdPlugin({
      strings: { placeholdDialogTitle: "Localized title" },
      onInsert,
    })(editor as never);

    const open = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
    open();
    const dialog = editor.windowManager.open.mock.calls[0]?.[0];
    expect(dialog.title).toBe("Localized title");
    expect(dialog.initialData).toMatchObject({ width: "600", height: "400" });

    const api = {
      close: vi.fn(),
      getData: () => ({
        width: "640",
        height: "360",
        backgroundColor: "#abcdef",
        textColor: "#123",
        text: "Author <text>",
        altText: "Author & alt",
      }),
    };
    dialog.onSubmit(api);

    expect(editor.dom.createHTML).toHaveBeenCalledWith("img", {
      class: "instui-img",
      src: "https://placehold.co/640x360/ABCDEF/123.png?text=Author+%3Ctext%3E",
      alt: "Author & alt",
      width: "640",
      height: "360",
    });
    expect(editor.insertContent).toHaveBeenCalledWith('<img src="safe">');
    expect(api.close).toHaveBeenCalled();
    expect(onInsert).toHaveBeenCalledWith(
      expect.objectContaining({ text: "Author <text>", altText: "Author & alt" }),
    );
  });

  test("keeps the dialog open and reports localized validation errors", () => {
    const editor = fakeEditor();
    createPlaceholdPlugin({ strings: { placeholdInvalidDimensions: "Localized dimensions" } })(
      editor as never,
    );
    const open = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
    open();
    const dialog = editor.windowManager.open.mock.calls[0]?.[0];
    const api = {
      close: vi.fn(),
      getData: () => ({
        width: "2",
        height: "400",
        backgroundColor: "eee",
        textColor: "333",
      }),
    };

    dialog.onSubmit(api);

    expect(editor.windowManager.alert).toHaveBeenCalledWith("Localized dimensions");
    expect(api.close).not.toHaveBeenCalled();
    expect(editor.insertContent).not.toHaveBeenCalled();
  });
});
