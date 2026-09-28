/**
 * A searchable, tabbed, chunked, keyboard-navigable tile grid — the shared body of the icons and
 * logos pickers.
 *
 * Lives in the top-level document (TinyMCE renders dialog bodies outside the content iframe) and
 * owns every element it creates, so none of Oxide's collection styling applies. Tiles are built
 * with `createElement` rather than markup strings — item names never become HTML.
 *
 * \@module
 */
import { PICKER_ROOT_CLASS } from "./icon-picker-styles.js";

/** How many tiles to append per pass; the rest follow as the sentinel scrolls into view. */
const CHUNK_SIZE = 150;

/** Localized labels the picker renders. */
export interface TilePickerStrings {
  searchPlaceholder: string;
  searchLabel: string;
  /** `{{count}}` is replaced with the number of matches. */
  resultCount: string;
  emptyMessage: string;
}

/** One tab above the grid; the first one starts selected. */
export interface TilePickerTab {
  value: string;
  label: string;
}

/** Options for {@link mountTilePicker}. */
export interface TilePickerOptions<T> {
  strings: TilePickerStrings;
  tabs: readonly TilePickerTab[];
  /** The items matching `query` under the tab whose value is `tab`. */
  filter: (query: string, tab: string) => T[];
  /** The tile's visible content; the tile button itself is built by the picker. */
  renderTile: (doc: Document, item: T) => Node;
  /** The tile's accessible name and tooltip. */
  tileLabel: (item: T) => string;
  /** Double-click (or Enter) on a tile: insert it immediately and close the dialog. */
  onPick: (item: T) => void;
  /** Single click (or arrow-key navigation) on a tile: mark it selected for the Insert button. */
  onSelect?: (item: T | undefined) => void;
}

/** A mounted picker; call `destroy` when the dialog closes. */
export interface MountedTilePicker<T> {
  destroy: () => void;
  /** The currently selected (single-clicked) item, if any. */
  getSelected: () => T | undefined;
}

/**
 * The dialog body's static shell. Contains no interpolated data, so it is safe to hand to
 * TinyMCE's `htmlpanel`; {@link mountTilePicker} fills it in.
 */
export function renderPickerShell(id: string, modifierClass?: string): string {
  const classes = modifierClass ? `${PICKER_ROOT_CLASS} ${modifierClass}` : PICKER_ROOT_CLASS;
  return `<div id="${id}" class="${classes}"></div>`;
}

/** Create an element with a class name — the picker's only DOM-building primitive. */
export function element<K extends keyof HTMLElementTagNameMap>(
  doc: Document,
  tag: K,
  className: string,
): HTMLElementTagNameMap[K] {
  const node = doc.createElement(tag);
  node.className = className;
  return node;
}

/**
 * Build the picker inside `root` and wire its behavior.
 *
 * @param root - The empty shell element from {@link renderPickerShell}.
 * @param options - {@link TilePickerOptions}.
 * @returns A {@link MountedTilePicker}.
 */
export function mountTilePicker<T>(
  root: HTMLElement,
  options: TilePickerOptions<T>,
): MountedTilePicker<T> {
  const doc = root.ownerDocument;
  const { strings } = options;

  const search = element(doc, "input", `${PICKER_ROOT_CLASS}__search`);
  search.type = "search";
  search.placeholder = strings.searchPlaceholder;
  search.setAttribute("aria-label", strings.searchLabel);

  const tabs = element(doc, "div", `${PICKER_ROOT_CLASS}__tabs`);
  tabs.setAttribute("role", "tablist");
  const tabButtons = new Map<string, HTMLButtonElement>();
  for (const { value, label } of options.tabs) {
    const tab = element(doc, "button", `${PICKER_ROOT_CLASS}__tab`);
    tab.type = "button";
    tab.textContent = label;
    tab.setAttribute("role", "tab");
    tab.dataset.source = value;
    tabs.append(tab);
    tabButtons.set(value, tab);
  }

  const grid = element(doc, "div", `${PICKER_ROOT_CLASS}__grid`);
  grid.setAttribute("role", "listbox");
  const sentinel = element(doc, "div", `${PICKER_ROOT_CLASS}__sentinel`);

  const status = element(doc, "p", `${PICKER_ROOT_CLASS}__status`);
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  root.append(search, tabs, grid, status);

  let tabValue = options.tabs[0]?.value ?? "";
  let matches: T[] = [];
  let rendered = 0;
  let activeIndex = 0;
  let selectedIndex: number | undefined;

  const tileAt = (index: number): HTMLButtonElement | null =>
    grid.children.item(index) as HTMLButtonElement | null;

  function setSelected(index: number | undefined): void {
    if (selectedIndex !== undefined) tileAt(selectedIndex)?.classList.remove("is-selected");
    selectedIndex = index;
    if (index !== undefined) tileAt(index)?.classList.add("is-selected");
    options.onSelect?.(index !== undefined ? matches[index] : undefined);
  }

  function setActive(index: number, focus: boolean): void {
    const clamped = Math.max(0, Math.min(index, rendered - 1));
    tileAt(activeIndex)?.setAttribute("tabindex", "-1");
    activeIndex = clamped;
    const tile = tileAt(clamped);
    tile?.setAttribute("tabindex", "0");
    if (focus) tile?.focus();
  }

  function renderChunk(): void {
    const next = matches.slice(rendered, rendered + CHUNK_SIZE);
    if (next.length === 0) return;
    const fragment = doc.createDocumentFragment();
    for (const [offset, item] of next.entries()) {
      const tile = element(doc, "button", `${PICKER_ROOT_CLASS}__tile`);
      tile.type = "button";
      tile.tabIndex = -1;
      tile.title = options.tileLabel(item);
      tile.setAttribute("aria-label", tile.title);
      tile.setAttribute("role", "option");
      tile.dataset.index = String(rendered + offset);
      tile.append(options.renderTile(doc, item));
      fragment.append(tile);
    }
    grid.insertBefore(fragment, sentinel);
    rendered += next.length;
    if (rendered <= CHUNK_SIZE) setActive(0, false);
  }

  function refresh(): void {
    matches = options.filter(search.value, tabValue);
    rendered = 0;
    activeIndex = 0;
    selectedIndex = undefined;
    options.onSelect?.(undefined);
    grid.replaceChildren(sentinel);
    status.textContent =
      matches.length === 0
        ? strings.emptyMessage
        : strings.resultCount.replace("{{count}}", String(matches.length));
    renderChunk();
  }

  // Absent in non-browser test environments; without it every match renders in the first pass.
  const observer = doc.defaultView?.IntersectionObserver
    ? new doc.defaultView.IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) renderChunk();
        },
        { root: grid, rootMargin: "200px" },
      )
    : undefined;
  observer?.observe(sentinel);

  let searchTimer: ReturnType<typeof setTimeout> | undefined;
  const onSearch = (): void => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(refresh, 150);
  };
  search.addEventListener("input", onSearch);

  function selectTab(value: string): void {
    tabValue = value;
    for (const [key, button] of tabButtons)
      button.setAttribute("aria-selected", String(key === value));
  }

  const onTabClick = (event: Event): void => {
    const tab = (event.target as HTMLElement).closest<HTMLElement>(`.${PICKER_ROOT_CLASS}__tab`);
    if (!tab) return;
    selectTab(tab.dataset.source ?? "");
    refresh();
  };
  tabs.addEventListener("click", onTabClick);

  const onGridClick = (event: Event): void => {
    const tile = (event.target as HTMLElement).closest<HTMLElement>(`.${PICKER_ROOT_CLASS}__tile`);
    const index = tile?.dataset.index;
    if (index !== undefined) setSelected(Number(index));
  };
  grid.addEventListener("click", onGridClick);

  const onGridDblClick = (event: Event): void => {
    const tile = (event.target as HTMLElement).closest<HTMLElement>(`.${PICKER_ROOT_CLASS}__tile`);
    const index = tile?.dataset.index;
    if (index !== undefined) options.onPick(matches[Number(index)]);
  };
  grid.addEventListener("dblclick", onGridDblClick);

  function columnCount(): number {
    const tile = tileAt(0);
    const width = tile?.getBoundingClientRect().width;
    if (!width) return 1;
    return Math.max(1, Math.round(grid.clientWidth / width));
  }

  const onGridKeydown = (event: KeyboardEvent): void => {
    const step: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: columnCount(),
      ArrowUp: -columnCount(),
    };
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : rendered - 1, true);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const item = matches[activeIndex];
      if (item) options.onPick(item);
      return;
    }
    const delta = step[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    // Walking past the rendered window pulls in the next chunk rather than stopping short.
    if (activeIndex + delta >= rendered) renderChunk();
    setActive(activeIndex + delta, true);
  };
  grid.addEventListener("keydown", onGridKeydown);

  selectTab(tabValue);
  refresh();

  return {
    destroy(): void {
      clearTimeout(searchTimer);
      observer?.disconnect();
      search.removeEventListener("input", onSearch);
      tabs.removeEventListener("click", onTabClick);
      grid.removeEventListener("click", onGridClick);
      grid.removeEventListener("dblclick", onGridDblClick);
      grid.removeEventListener("keydown", onGridKeydown);
      root.replaceChildren();
    },
    getSelected: () => (selectedIndex !== undefined ? matches[selectedIndex] : undefined),
  };
}
