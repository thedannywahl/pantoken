/**
 * @vitest-environment happy-dom
 */
import { completionStatus, currentCompletions, startCompletion } from "@codemirror/autocomplete";
import { html } from "@codemirror/lang-html";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { expect, test } from "vite-plus/test";
import type { CssDocEntry } from "../src/cssdoc/model.js";
import { pantokenHtmlCompletion } from "../src/codemirror/autocomplete.js";

const model = [
  {
    name: "button",
    className: ".instui-button",
    kind: "component",
    summary: "A button.",
    modifiers: [
      { name: "-color-primary", prop: "color", value: "primary" },
      { name: "-color-secondary", prop: "color", value: "secondary" },
      { name: "-size-sm", prop: "size", value: "sm" },
      { name: "-icon-*", prop: "icon", pattern: true },
    ],
  },
  {
    name: "close-button",
    className: ".instui-close-button",
    kind: "component",
    modifiers: [{ name: "-size-sm", prop: "size", value: "sm" }],
  },
  {
    name: "layout",
    className: ".--display-flex",
    kind: "utility",
    global: true,
    modifiers: [
      { name: "--display-flex", prop: "display", value: "flex" },
      { name: "--display-grid", prop: "display", value: "grid" },
    ],
  },
] as CssDocEntry[];

function completionView(doc: string, marker = "|"): EditorView {
  const pos = doc.indexOf(marker);
  const cleanDoc = doc.replace(marker, "");
  const state = EditorState.create({
    doc: cleanDoc,
    selection: { anchor: pos },
    extensions: [html(), pantokenHtmlCompletion({ model })],
  });
  return new EditorView({ state, parent: document.body });
}

async function labelsFor(doc: string): Promise<string[]> {
  const view = completionView(doc);
  startCompletion(view);
  for (let index = 0; index < 20 && completionStatus(view.state) === "pending"; index += 1) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  const labels = currentCompletions(view.state).map((completion) => completion.label);
  view.destroy();
  return labels;
}

function buttonMarkup(...classTokens: string[]): string {
  return `<button class="${classTokens.join(" ")}">`;
}

test("suggests complete component classes after instui-", async () => {
  expect(await labelsFor('<button class="instui-b|">')).toContain("instui-button");
});

test("suggests separate component modifiers from the component in the same attribute", async () => {
  const labels = await labelsFor(buttonMarkup("instui-button", "-co|"));
  expect(labels).toContain("-color-primary");
  expect(labels).toContain("-color-secondary");
  expect(labels).not.toContain("-icon-*");
});

test("suggests global utility modifiers", async () => {
  expect(await labelsFor(buttonMarkup("instui-button", "--dis|"))).toContain("--display-flex");
});

test("resolves hyphenated component names", async () => {
  expect(await labelsFor(buttonMarkup("instui-close-button", "-si|"))).toContain("-size-sm");
});

test("supports multiline class attributes", async () => {
  expect(await labelsFor('<button\n class="instui-button\n -si|">')).toContain("-size-sm");
});

test("does not suggest a modifier already present", async () => {
  const labels = await labelsFor(buttonMarkup("instui-button", "-color-primary", "-co|"));
  expect(labels).not.toContain("-color-primary");
  expect(labels).toContain("-color-secondary");
});

test("returns no modifier completions without a known component", async () => {
  expect(await labelsFor(buttonMarkup("custom-button", "-co|"))).toHaveLength(0);
});

test("returns no completions outside a class attribute", async () => {
  expect(await labelsFor("<p>instui-b|</p>")).toHaveLength(0);
});
