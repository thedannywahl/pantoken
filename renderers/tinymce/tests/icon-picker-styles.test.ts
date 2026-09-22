/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { TaggedIcon } from "../src/icons.js";

vi.mock("@pantoken/cdn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@pantoken/cdn")>()),
  buildFileUrl: (file: { package: string }) => `data:text/css,/*${file.package}*/`,
}));

const { injectPickerStyles, PICKER_ROOT_CLASS } = await import("../src/lib/icon-picker-styles.js");

const icons: TaggedIcon[] = [
  { name: "pantoken", source: "custom-icons" },
  { name: "github", source: "simple-icons" },
];

test("injecting installs the painter, the inline tokens, and one sheet per CDN-backed source", () => {
  document.head.innerHTML = "";
  injectPickerStyles(document, icons);

  const styles = document.head.querySelectorAll("style[data-pantoken-icon-picker]");
  const links = document.head.querySelectorAll("link[data-pantoken-icon-picker]");
  expect(styles).toHaveLength(2);
  expect(links).toHaveLength(2);
  expect(styles[0].textContent).toContain(`.${PICKER_ROOT_CLASS} [class*="-icon-"]::before`);
  expect(styles[1].textContent).toContain("--instui-icon-pantoken:url(");
});

test("the painter never applies outside the picker root", () => {
  document.head.innerHTML = "";
  injectPickerStyles(document, icons);
  const painter = document.head.querySelector("style[data-pantoken-icon-picker]")!.textContent!;
  for (const rule of painter.split("}")) {
    if (rule.includes("::before")) expect(rule).toContain(`.${PICKER_ROOT_CLASS}`);
  }
});

test("repeated injection is a no-op", () => {
  document.head.innerHTML = "";
  injectPickerStyles(document, icons);
  injectPickerStyles(document, icons);
  injectPickerStyles(document, icons);
  expect(document.head.querySelectorAll("[data-pantoken-icon-picker]")).toHaveLength(4);
});
