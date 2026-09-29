import { expect, test } from "vite-plus/test";
import { checkCompatibility } from "../scripts/check-compatibility.ts";
import { icon, readToken } from "../src/index.ts";

test("the icon action renders inline SVG into the node", () => {
  const node = { innerHTML: "" };
  const action = icon(node as unknown as Element, "arrow-left");
  expect(node.innerHTML.startsWith("<svg")).toBe(true);
  action.destroy();
  expect(node.innerHTML).toBe("");
});

test("readToken returns the fallback on the server", () => {
  expect(readToken("--instui-color-background-brand", "#0374B5")).toBe("#0374B5");
});

test("rejects malformed Svelte releases before installing", async () => {
  await expect(checkCompatibility("5.0.0-next.1")).rejects.toThrow("Invalid Svelte release");
});
