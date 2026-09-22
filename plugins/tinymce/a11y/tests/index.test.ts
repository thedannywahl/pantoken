/**
 * @vitest-environment happy-dom
 */
import { describe, expect, test, vi } from "vite-plus/test";
import {
  A11Y_COMMAND,
  A11Y_PLUGIN_NAME,
  A11Y_RULES,
  A11Y_STATUSBAR_NAME,
  A11Y_TOOLBAR_NAME,
  createA11yPlugin,
  scanAccessibility,
} from "../src/index.ts";

function editorFor(body: HTMLElement) {
  const container = document.createElement("div");
  const statusbar = document.createElement("div");
  const statusbarText = document.createElement("div");
  statusbarText.className = "tox-statusbar__text-container";
  statusbar.append(statusbarText);
  container.append(statusbar);
  return {
    addCommand: vi.fn(),
    getBody: vi.fn(() => body),
    getContainer: vi.fn(() => container),
    on: vi.fn(),
    off: vi.fn(),
    ui: { registry: { addButton: vi.fn(), addMenuItem: vi.fn() } },
    windowManager: { alert: vi.fn(), open: vi.fn() },
  };
}

describe("scanAccessibility", () => {
  test("finds image, heading, and table issues", async () => {
    const body = document.createElement("main");
    body.innerHTML =
      "<img src='photo.png'><h2>Heading</h2><h4>Skipped</h4><table><tr><td>Data</td></tr></table>";

    const issues = await scanAccessibility(body);

    expect(issues.map((issue) => issue.rule.id)).toEqual([
      "img-alt",
      "headings-sequence",
      "table-header",
      "table-caption",
    ]);
  });

  test("skips ignored subtrees and supports custom asynchronous rules", async () => {
    const body = document.createElement("main");
    body.innerHTML = "<div data-ignore-a11y-check><img src='ignored.png'></div><p>Checked</p>";
    const customRule = {
      id: "custom-paragraph",
      message: "Paragraphs are not allowed.",
      appliesTo: (element: Element) => element.tagName === "P",
      test: async () => false,
    };

    const issues = await scanAccessibility(body, { rules: [customRule], batchSize: 1 });

    expect(issues).toHaveLength(1);
    expect(issues[0]?.element.tagName).toBe("P");
  });

  test("allows a passing document to complete without issues", async () => {
    const body = document.createElement("main");
    body.innerHTML =
      "<img src='photo.png' alt='A photo'><h2>Heading</h2><h3>Subheading</h3><table><caption>Data</caption><tr><th scope='col'>Column</th></tr></table>";

    await expect(scanAccessibility(body)).resolves.toEqual([]);
  });
});

describe("createA11yPlugin", () => {
  test("registers stable names and runs the scan command", async () => {
    const body = document.createElement("main");
    body.innerHTML = "<img src='photo.png'>";
    const editor = editorFor(body);
    createA11yPlugin()(editor as never);

    expect(A11Y_PLUGIN_NAME).toBe("pantoken_a11y");
    expect(A11Y_TOOLBAR_NAME).toBe("pantokenA11y");
    expect(A11Y_STATUSBAR_NAME).toBe("pantokenA11yStatus");
    expect(editor.addCommand).toHaveBeenCalledWith(A11Y_COMMAND, expect.any(Function));
    expect(editor.ui.registry.addButton).toHaveBeenCalledWith(
      A11Y_TOOLBAR_NAME,
      expect.objectContaining({ icon: "accessibility-check" }),
    );

    const command = editor.addCommand.mock.calls[0]?.[1] as (
      ui: unknown,
      value: { done: (issues: readonly unknown[]) => void },
    ) => void;
    const done = vi.fn();
    command(false, { done });
    await vi.waitFor(() => expect(done).toHaveBeenCalled());
    expect(done.mock.calls[0]?.[0]).toHaveLength(1);
    expect(A11Y_RULES.map((rule) => rule.id)).toEqual([
      "img-alt",
      "img-alt-filename",
      "img-alt-length",
      "headings-sequence",
      "headings-start-at-h2",
      "table-header",
      "table-caption",
      "table-header-scope",
      "adjacent-links",
      "list-structure",
    ]);
  });

  test("uses localized rule strings in the results dialog", async () => {
    const body = document.createElement("main");
    body.innerHTML = "<img src='photo.png'>";
    const editor = editorFor(body);
    createA11yPlugin({
      strings: {
        a11yImageAltMessage: "Localized image message",
      },
    })(editor as never);

    const button = editor.ui.registry.addButton.mock.calls[0]?.[1] as { onAction: () => void };
    button.onAction();
    await vi.waitFor(() => expect(editor.windowManager.open).toHaveBeenCalled());

    expect(editor.windowManager.open.mock.calls[0]?.[0]).toMatchObject({
      body: {
        items: [{ items: [{ text: expect.stringContaining("Localized image message") }] }],
      },
    });
  });

  test("registers an updating footer checker without toolbar controls", async () => {
    vi.useFakeTimers();
    const body = document.createElement("main");
    body.innerHTML = "<img src='photo.png'>";
    const editor = editorFor(body);
    createA11yPlugin({ display: "footer" })(editor as never);

    expect(editor.ui.registry.addButton).not.toHaveBeenCalled();
    expect(editor.ui.registry.addMenuItem).not.toHaveBeenCalled();
    expect(editor.getContainer).not.toHaveBeenCalled();
    const postRenderHandler = editor.on.mock.calls.find(
      ([event]) => event === "PostRender",
    )?.[1] as () => void;
    postRenderHandler();
    const button = editor
      .getContainer()
      .querySelector<HTMLButtonElement>(`#${A11Y_STATUSBAR_NAME}`);
    expect(button).not.toBeNull();
    await vi.advanceTimersByTimeAsync(400);

    expect(button?.hidden).toBe(false);
    expect(button?.querySelector("svg")).not.toBeNull();
    expect(button?.getAttribute("aria-label")).toBe("1 accessibility issues");
    expect(button?.querySelector(".pantoken-a11y-statusbar-count")?.textContent).toBe("1");

    button?.click();
    await vi.runAllTimersAsync();
    expect(editor.windowManager.open).toHaveBeenCalled();

    const removeHandler = editor.on.mock.calls.find(
      ([event]) => event === "remove",
    )?.[1] as () => void;
    removeHandler();
    expect(button?.isConnected).toBe(false);
    expect(editor.off).toHaveBeenCalledWith("SetContent change", expect.any(Function));
    vi.useRealTimers();
  });

  test("prepends the footer button before existing statusbar content (e.g. word count)", async () => {
    const body = document.createElement("main");
    body.innerHTML = "<img src='photo.png'>";
    const editor = editorFor(body);
    const wordcount = document.createElement("button");
    wordcount.className = "tox-statusbar__wordcount";
    editor.getContainer().querySelector(".tox-statusbar__text-container")!.append(wordcount);
    createA11yPlugin({ display: "footer" })(editor as never);

    const postRenderHandler = editor.on.mock.calls.find(
      ([event]) => event === "PostRender",
    )?.[1] as () => void;
    postRenderHandler();

    const footer = editor.getContainer().querySelector(".tox-statusbar__text-container")!;
    expect(footer.firstElementChild?.id).toBe(A11Y_STATUSBAR_NAME);
    expect(footer.lastElementChild).toBe(wordcount);
  });

  test("keeps the footer checker visible when content has no issues", async () => {
    vi.useFakeTimers();
    const body = document.createElement("main");
    body.innerHTML = "<img src='photo.png' alt='A photo'>";
    const editor = editorFor(body);
    createA11yPlugin({ display: "footer" })(editor as never);

    const postRenderHandler = editor.on.mock.calls.find(
      ([event]) => event === "PostRender",
    )?.[1] as () => void;
    postRenderHandler();
    await vi.advanceTimersByTimeAsync(400);

    const button = editor
      .getContainer()
      .querySelector<HTMLButtonElement>(`#${A11Y_STATUSBAR_NAME}`);
    expect(button?.hidden).toBe(false);
    expect(button?.getAttribute("aria-label")).toBe("0 accessibility issues");
    expect(button?.querySelector(".pantoken-a11y-statusbar-count")?.textContent).toBe("0");
    vi.useRealTimers();
  });

  test("supports both and command-only display modes", () => {
    const body = document.createElement("main");
    const bothEditor = editorFor(body);
    createA11yPlugin({ display: "both" })(bothEditor as never);
    expect(bothEditor.ui.registry.addButton).toHaveBeenCalled();
    const postRenderHandler = bothEditor.on.mock.calls.find(
      ([event]) => event === "PostRender",
    )?.[1] as () => void;
    postRenderHandler();
    expect(bothEditor.getContainer().querySelector(`#${A11Y_STATUSBAR_NAME}`)).not.toBeNull();

    const commandOnlyEditor = editorFor(body);
    createA11yPlugin({ display: "none" })(commandOnlyEditor as never);
    expect(commandOnlyEditor.addCommand).toHaveBeenCalledWith(A11Y_COMMAND, expect.any(Function));
    expect(commandOnlyEditor.ui.registry.addButton).not.toHaveBeenCalled();
    expect(commandOnlyEditor.getContainer().querySelector(`#${A11Y_STATUSBAR_NAME}`)).toBeNull();
  });
});
