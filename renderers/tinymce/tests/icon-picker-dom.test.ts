/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { TaggedIcon } from "../src/icons.js";
import { mountIconPicker, renderPickerShell } from "../src/lib/icon-picker-dom.js";

const strings = {
  searchPlaceholder: "Search icons…",
  searchLabel: "Search icons",
  allSourcesLabel: "All",
  resultCount: "{{count}} icons",
  emptyMessage: "No icons match your search.",
};

const icons: TaggedIcon[] = [
  { name: "heart", source: "components" },
  { name: "heart-crack", source: "components" },
  { name: "github", source: "simple-icons" },
];

function mount(list: readonly TaggedIcon[] = icons) {
  document.body.innerHTML = renderPickerShell("picker");
  const root = document.getElementById("picker")!;
  const onPick = vi.fn();
  const picker = mountIconPicker(root, list, { strings, onPick });
  return { root, onPick, picker };
}

const tiles = (root: HTMLElement): HTMLButtonElement[] =>
  Array.from(root.querySelectorAll(".pantoken-ip__tile"));

test("renderPickerShell emits an empty, id-addressable container", () => {
  expect(renderPickerShell("picker")).toBe('<div id="picker" class="pantoken-ip"></div>');
});

test("mounting renders a tile per icon with its glyph class and an accessible name", () => {
  const { root } = mount();
  expect(tiles(root)).toHaveLength(3);
  expect(tiles(root)[0].getAttribute("aria-label")).toBe("heart — Instructure UI");
  expect(root.querySelector(".instui-icon.-icon-heart")).not.toBeNull();
  expect(root.querySelector(".pantoken-ip__status")!.textContent).toBe("3 icons");
});

test("a tab restricts the grid to one source", () => {
  const { root } = mount();
  const tab = root.querySelector<HTMLButtonElement>('[data-source="simple-icons"]')!;
  tab.click();
  expect(tiles(root).map((tile) => tile.getAttribute("aria-label"))).toEqual([
    "github — Simple Icons",
  ]);
  expect(tab.getAttribute("aria-selected")).toBe("true");
});

test("searching narrows the grid and reports an empty state", async () => {
  vi.useFakeTimers();
  const { root } = mount();
  const search = root.querySelector<HTMLInputElement>(".pantoken-ip__search")!;

  search.value = "crack";
  search.dispatchEvent(new Event("input"));
  await vi.advanceTimersByTimeAsync(200);
  expect(tiles(root)).toHaveLength(1);

  search.value = "nothing-matches-this";
  search.dispatchEvent(new Event("input"));
  await vi.advanceTimersByTimeAsync(200);
  expect(tiles(root)).toHaveLength(0);
  expect(root.querySelector(".pantoken-ip__status")!.textContent).toBe(strings.emptyMessage);
  vi.useRealTimers();
});

test("clicking a tile selects it; double-clicking inserts it", () => {
  document.body.innerHTML = renderPickerShell("picker");
  const root = document.getElementById("picker")!;
  const onPick = vi.fn();
  const onSelect = vi.fn();
  const picker = mountIconPicker(root, icons, { strings, onPick, onSelect });

  const tile = Array.from(root.querySelectorAll<HTMLButtonElement>(".pantoken-ip__tile"))[2];
  tile.click();
  expect(onPick).not.toHaveBeenCalled();
  expect(onSelect).toHaveBeenCalledWith(icons[2]);
  expect(picker.getSelected()).toBe(icons[2]);
  expect(tile.classList.contains("is-selected")).toBe(true);

  tile.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
  expect(onPick).toHaveBeenCalledWith(icons[2]);
});

test("icon names are never parsed as markup", () => {
  const hostile: TaggedIcon[] = [{ name: '"><img src=x onerror=alert(1)>', source: "components" }];
  const { root } = mount(hostile);
  expect(root.querySelector("img")).toBeNull();
  expect(tiles(root)[0].getAttribute("aria-label")).toContain("<img");
});

test("arrow keys move focus across the grid", () => {
  const { root } = mount();
  const grid = root.querySelector<HTMLElement>(".pantoken-ip__grid")!;
  expect(tiles(root)[0].getAttribute("tabindex")).toBe("0");

  grid.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
  expect(tiles(root)[1].getAttribute("tabindex")).toBe("0");
  expect(tiles(root)[0].getAttribute("tabindex")).toBe("-1");

  grid.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
  expect(tiles(root)[2].getAttribute("tabindex")).toBe("0");

  grid.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
  expect(tiles(root)[0].getAttribute("tabindex")).toBe("0");
});

test("unhandled keys are left to the browser", () => {
  const { root } = mount();
  const grid = root.querySelector<HTMLElement>(".pantoken-ip__grid")!;
  const event = new KeyboardEvent("keydown", { key: "a", bubbles: true, cancelable: true });
  grid.dispatchEvent(event);
  expect(event.defaultPrevented).toBe(false);
});

test("destroy empties the container and stops responding to input", async () => {
  vi.useFakeTimers();
  const { root, picker, onPick } = mount();
  picker.destroy();
  expect(root.children).toHaveLength(0);
  expect(onPick).not.toHaveBeenCalled();
  await vi.advanceTimersByTimeAsync(200);
  vi.useRealTimers();
});
