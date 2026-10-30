// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initTreeBrowser } from "../src/behaviors/tree-browser.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

function setup(selection = false) {
  document.body.innerHTML = `
    <div role="tree" aria-label="Files">
      <div role="treeitem" aria-expanded="true" aria-label="Course">
        <span class="item">Course</span>
        <div role="group">
          <a class="item" role="treeitem" href="#syllabus">Syllabus</a>
          <div role="treeitem" aria-expanded="false" aria-label="Week">
            <span class="item">Week</span>
            <div role="group"><a class="item" role="treeitem" href="#reading">Reading</a></div>
          </div>
          <span class="item" role="treeitem" aria-disabled="true">Unavailable</span>
          <a class="item" role="treeitem" href="#rubric">Rubric</a>
        </div>
      </div>
    </div>`;
  const tree = document.querySelector<HTMLElement>('[role="tree"]')!;
  const items = [...tree.querySelectorAll<HTMLElement>('[role="treeitem"]')];
  if (selection) items[1].setAttribute("aria-selected", "true");
  const handle = initTreeBrowser(tree);
  const key = (item: HTMLElement, value: string) => {
    const event = new KeyboardEvent("keydown", { key: value, bubbles: true, cancelable: true });
    item.dispatchEvent(event);
    return event;
  };
  return { tree, items, handle, key };
}

test("initializes one visible tab stop and synchronizes collapsed groups", () => {
  const { tree, items } = setup();
  expect(items.map((item) => item.tabIndex)).toEqual([0, -1, -1, -1, -1, -1]);
  expect(tree.querySelectorAll<HTMLElement>('[role="group"]')[1].hidden).toBe(true);
});

test("keeps a tab stop ready when the whole tree starts hidden", () => {
  const { tree, items, handle } = setup();
  handle.cleanup();
  tree.hidden = true;
  const hidden = initTreeBrowser(tree);
  expect(items[0].tabIndex).toBe(0);
  expect(items[3].tabIndex).toBe(-1);
  hidden.cleanup();
});

test("arrows, Home, End, j, and k move focus without selecting, skipping hidden and disabled items", () => {
  const { items, key } = setup();
  items[0].focus();
  key(items[0], "ArrowDown");
  expect(document.activeElement).toBe(items[1]);
  key(items[1], "j");
  expect(document.activeElement).toBe(items[2]);
  key(items[2], "ArrowDown");
  expect(document.activeElement).toBe(items[5]);
  key(items[5], "ArrowDown");
  expect(document.activeElement).toBe(items[5]);
  key(items[5], "k");
  expect(document.activeElement).toBe(items[2]);
  key(items[2], "ArrowUp");
  expect(document.activeElement).toBe(items[1]);
  key(items[1], "Home");
  key(items[0], "ArrowUp");
  expect(document.activeElement).toBe(items[0]);
  key(items[0], "End");
  expect(document.activeElement).toBe(items[5]);
  expect(items.filter((item) => item.tabIndex === 0)).toEqual([items[5]]);
  expect(items.every((item) => !item.hasAttribute("aria-selected"))).toBe(true);
});

test("right opens a branch then enters it; left returns to its parent then closes it", () => {
  const { tree, items, key } = setup();
  items[2].focus();
  key(items[2], "ArrowRight");
  expect(items[2].getAttribute("aria-expanded")).toBe("true");
  expect(tree.querySelectorAll<HTMLElement>('[role="group"]')[1].hidden).toBe(false);
  key(items[2], "ArrowRight");
  expect(document.activeElement).toBe(items[3]);
  key(items[3], "ArrowLeft");
  expect(document.activeElement).toBe(items[2]);
  key(items[2], "ArrowLeft");
  expect(items[2].getAttribute("aria-expanded")).toBe("false");
});

test("mirrors horizontal navigation for RTL", () => {
  const { tree, items, key } = setup();
  tree.style.direction = "rtl";
  items[2].focus();
  key(items[2], "ArrowLeft");
  expect(items[2].getAttribute("aria-expanded")).toBe("true");
  key(items[2], "ArrowRight");
  expect(items[2].getAttribute("aria-expanded")).toBe("false");
});

test("activation expands branches by default and supports opt-in single selection", () => {
  const { items, key } = setup(true);
  expect(items[1].tabIndex).toBe(0);
  key(items[2], "Enter");
  expect(items[2].getAttribute("aria-selected")).toBe("true");
  expect(items[1].getAttribute("aria-selected")).toBe("false");
  expect(items[2].getAttribute("aria-expanded")).toBe("false");
  items[2].querySelector<HTMLElement>(".item")!.click();
  expect(items[2].getAttribute("aria-expanded")).toBe("true");
  key(items[3], " ");
  expect(items[3].getAttribute("aria-selected")).toBe("true");
});

test("ignores unrelated keys, disabled nodes, and nested trees", () => {
  const { tree, items, key } = setup();
  const nested = document.createElement("div");
  nested.setAttribute("role", "tree");
  nested.innerHTML = '<div role="treeitem" tabindex="0">Nested</div>';
  tree.append(nested);
  const node = nested.firstElementChild as HTMLElement;
  expect(key(node, "ArrowDown").defaultPrevented).toBe(false);
  expect(key(items[4], "Enter").defaultPrevented).toBe(false);
  const click = new MouseEvent("click", { bubbles: true, cancelable: true });
  items[4].dispatchEvent(click);
  expect(click.defaultPrevented).toBe(true);
  expect(key(items[0], "Tab").defaultPrevented).toBe(false);
  expect(key(tree, "ArrowDown").defaultPrevented).toBe(false);
  expect(node.tabIndex).toBe(0);
});

test("focus and pointer activation maintain a single tab stop; cleanup removes listeners", () => {
  const { items, handle, key } = setup();
  items[1].focus();
  expect(items[1].tabIndex).toBe(0);
  items[2].querySelector<HTMLElement>(".item")!.click();
  expect(document.activeElement).toBe(items[2]);
  handle.cleanup();
  key(items[2], "ArrowLeft");
  expect(items[2].getAttribute("aria-expanded")).toBe("true");
});

test("supports a slotted web-component host and an empty tree", () => {
  const { tree, handle } = setup();
  handle.cleanup();
  tree.removeAttribute("role");
  const slotted = initTreeBrowser(tree);
  tree.querySelector<HTMLElement>('[role="treeitem"]')!.click();
  expect(tree.querySelector('[role="treeitem"]')!.getAttribute("aria-expanded")).toBe("false");
  slotted.cleanup();
  tree.innerHTML = "";
  expect(() => initTreeBrowser(tree).cleanup()).not.toThrow();
});

test("supports W3C-style owned sibling groups without changing navigation or expansion", () => {
  const { tree, items, handle, key } = setup();
  handle.cleanup();
  for (const [index, item] of items.entries()) {
    const group = item.querySelector<HTMLElement>(':scope > [role="group"]');
    if (!group) continue;
    group.id = `owned-${index}`;
    item.setAttribute("aria-owns", group.id);
    item.after(group);
  }
  const owned = initTreeBrowser(tree);
  items[2].focus();
  key(items[2], "ArrowRight");
  expect(document.getElementById("owned-2")!.hidden).toBe(false);
  key(items[2], "ArrowRight");
  expect(document.activeElement).toBe(items[3]);
  key(items[3], "ArrowLeft");
  expect(document.activeElement).toBe(items[2]);
  key(items[2], "ArrowLeft");
  expect(document.getElementById("owned-2")!.hidden).toBe(true);
  owned.cleanup();
});

test("rejects missing, external, non-group, and ancestor owned-group references", () => {
  const { tree, items, handle } = setup();
  handle.cleanup();
  const external = document.createElement("div");
  external.id = "external";
  external.setAttribute("role", "group");
  document.body.append(external);
  tree.id = "cyclic";
  items[1].id = "leaf";
  for (const id of ["missing", "external", "leaf", "cyclic"]) {
    items[0].setAttribute("aria-owns", id);
    expect(() => initTreeBrowser(tree)).toThrow("invalid group");
  }
});
