import { expect, test } from "vite-plus/test";
import { Window } from "happy-dom";
import { loadDemoI18n, renderDemoI18n } from "../../../docs/scripts/demo-i18n.ts";

function withDemo(name: string, check: (window: Window) => void): void {
  const { template, strings } = loadDemoI18n(
    new URL(`../../../docs/demos/${name}/`, import.meta.url).pathname,
  );
  const window = new Window();
  try {
    window.document.body.innerHTML = renderDemoI18n(template, strings);
    check(window);
  } finally {
    void window.happyDOM.abort();
  }
}

test("the localized tree demo supplies the shared behavior's named tree and owned groups", () => {
  withDemo("tree-browser", ({ document }) => {
    const tree = document.querySelector('[role="tree"]')!;
    expect(
      document.getElementById(tree.getAttribute("aria-labelledby")!)?.textContent?.trim(),
    ).toBe("Course files");
    expect(tree.querySelectorAll('[role="treeitem"]')).toHaveLength(6);
    expect(tree.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(tree.querySelectorAll("details")).toHaveLength(0);
    for (const item of tree.querySelectorAll("[aria-owns]")) {
      const group = document.getElementById(item.getAttribute("aria-owns")!)!;
      expect(tree.contains(group)).toBe(true);
      expect(group.contains(item)).toBe(false);
      expect(group.getAttribute("role")).toBe("group");
    }
    for (const icon of tree.querySelectorAll(".instui-icon"))
      expect(icon.getAttribute("aria-hidden")).toBe("true");
  });
});

test("the localized drawer demo names both valid pane regions", () => {
  withDemo("drawer-layout", ({ document }) => {
    const regions = [...document.querySelectorAll('[role="region"]')];
    expect(regions).toHaveLength(2);
    expect(regions.map((region) => region.localName)).toEqual(["div", "div"]);
    expect(
      regions.map((region) =>
        document.getElementById(region.getAttribute("aria-labelledby")!)?.textContent?.trim(),
      ),
    ).toEqual(["Navigation", "Main content"]);
  });
});

test("the localized form demo separates native validation from the authored invalid state", () => {
  withDemo("form-field", ({ document }) => {
    const field = document.querySelector("[data-native-validation]")!;
    const input = field.querySelector("input")!;
    expect(input.required).toBe(true);
    expect(input.getAttribute("aria-labelledby")).toBe("demo-email-label");
    expect(input.getAttribute("aria-describedby")).toBe("demo-email-hint");
    expect(document.getElementById("demo-email-error")?.hasAttribute("hidden")).toBe(true);
    expect(field.querySelector("div")).toBeNull();
    const invalid = document.querySelector('[aria-invalid="true"]')!;
    expect(invalid.getAttribute("aria-describedby")).toBe("demo-username-error");
    expect(invalid.closest("[data-native-validation]")).toBeNull();
  });
});

test("the localized tooltip demo uses named buttons and stable bubble descriptions", () => {
  withDemo("tooltip", ({ document }) => {
    const wrappers = [...document.querySelectorAll(".instui-tooltip")];
    expect(wrappers).toHaveLength(3);
    for (const wrapper of wrappers) {
      const button = wrapper.querySelector("button")!;
      expect(button.type).toBe("button");
      expect(button.getAttribute("aria-label") ?? button.textContent?.trim()).toBeTruthy();
      const tip = document.getElementById(button.getAttribute("aria-describedby")!)!;
      expect(wrapper.contains(tip)).toBe(true);
      expect(tip.getAttribute("role")).toBe("tooltip");
      expect(button.contains(tip)).toBe(false);
    }
  });
});

test("the localized pill demo lets the group wrap while preserving every status", () => {
  withDemo("pill", ({ document }) => {
    const pills = [...document.querySelectorAll(".instui-pill")];
    expect(pills).toHaveLength(5);
    expect(pills.every((pill) => pill.textContent?.trim())).toBe(true);
    expect(pills[0].parentElement?.getAttribute("style")).toContain("flex-wrap: wrap");
  });
});
