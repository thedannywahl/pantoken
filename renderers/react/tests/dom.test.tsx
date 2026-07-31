// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, test } from "vite-plus/test";
import { Icon, TokenProvider, register, readToken, useToken } from "../src/index.tsx";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function render(node: React.ReactNode): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(node);
  });
  return container;
}

test("register is re-exported from the web-components package", () => {
  expect(typeof register).toBe("function");
});

test("readToken reads a resolved custom property from the document", () => {
  document.documentElement.style.setProperty("--instui-color-background-brand", "#0374B5");
  expect(readToken("--instui-color-background-brand", "#fallback")).toBe("#0374B5");
});

test("readToken falls back when the property is unset", () => {
  expect(readToken("--instui-not-a-real-token", "#fallback")).toBe("#fallback");
});

test("useToken resolves the token value after mount", () => {
  document.documentElement.style.setProperty("--instui-color-text-base", "#2d3b45");
  let seen = "";
  function Probe(): React.ReactNode {
    seen = useToken("--instui-color-text-base", "#000");
    return null;
  }
  render(<Probe />);
  expect(seen).toBe("#2d3b45");
});

test("TokenProvider registers the elements and renders its children", () => {
  const container = render(
    <TokenProvider>
      <span data-testid="child">hi</span>
    </TokenProvider>,
  );
  expect(container.querySelector('[data-testid="child"]')?.textContent).toBe("hi");
});

test("TokenProvider renders null when it has no children", () => {
  const container = render(<TokenProvider />);
  expect(container.textContent).toBe("");
});

test("Icon renders the instui-icon element with its attributes in the DOM", () => {
  const container = render(<Icon name="check-mark" size="1.25rem" color="var(--x)" />);
  const el = container.querySelector("instui-icon");
  expect(el?.getAttribute("name")).toBe("check-mark");
  expect(el?.getAttribute("size")).toBe("1.25rem");
});
