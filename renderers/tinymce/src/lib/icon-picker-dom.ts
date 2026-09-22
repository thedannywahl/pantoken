/**
 * The icons picker's grid: search, source tabs, and a chunked, keyboard-navigable icon grid.
 *
 * Lives in the top-level document (TinyMCE renders dialog bodies outside the content iframe) and
 * owns every element it creates, so none of Oxide's collection styling applies. Tiles are built
 * with `createElement` rather than markup strings — icon names never become HTML.
 *
 * \@module
 */
import { filterIcons, SOURCE_LABELS, type TaggedIcon } from "../icons.js";
import { PICKER_ROOT_CLASS } from "./icon-picker-styles.js";

/** How many tiles to append per pass; the rest follow as the sentinel scrolls into view. */
const CHUNK_SIZE = 150;

/** Localized labels the picker renders. */
export interface IconPickerStrings {
  searchPlaceholder: string;
  searchLabel: string;
  allSourcesLabel: string;
  /** `{{count}}` is replaced with the number of matches. */
  resultCount: string;
  emptyMessage: string;
}

/** Options for {@link mountIconPicker}. */
export interface IconPickerOptions {
  strings: IconPickerStrings;
  onPick: (icon: TaggedIcon) => void;
}

/** A mounted picker; call `destroy` when the dialog closes. */
export interface MountedIconPicker {
  destroy: () => void;
}

/**
 * The dialog body's static shell. Contains no interpolated data, so it is safe to hand to
 * TinyMCE's `htmlpanel`; {@link mountIconPicker} fills it in.
 */
export function renderPickerShell(id: string): string {
  return `<div id="${id}" class="${PICKER_ROOT_CLASS}"></div>`;
}

function element<K extends keyof HTMLElementTagNameMap>(
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
 * @param icons - Every selectable icon, already sorted.
 * @param options - {@link IconPickerOptions}.
 * @returns A {@link MountedIconPicker}.
 */
export function mountIconPicker(
  root: HTMLElement,
  icons: readonly TaggedIcon[],
  options: IconPickerOptions,
): MountedIconPicker {
  const doc = root.ownerDocument;
  const { strings } = options;
  const sources = [...new Set(icons.map((icon) => icon.source))];

  const search = element(doc, "input", `${PICKER_ROOT_CLASS}__search`);
  search.type = "search";
  search.placeholder = strings.searchPlaceholder;
  search.setAttribute("aria-label", strings.searchLabel);

  const tabs = element(doc, "div", `${PICKER_ROOT_CLASS}__tabs`);
  tabs.setAttribute("role", "tablist");
  const tabButtons = new Map<string, HTMLButtonElement>();
  for (const [value, label] of [
    ["", strings.allSourcesLabel] as const,
    ...sources.map((source) => [source, SOURCE_LABELS[source]] as const),
  ]) {
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

  let source: TaggedIcon["source"] | undefined;
  let matches: TaggedIcon[] = [];
  let rendered = 0;
  let activeIndex = 0;

  const tileAt = (index: number): HTMLButtonElement | null =>
    grid.children.item(index) as HTMLButtonElement | null;

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
    for (const [offset, icon] of next.entries()) {
      const tile = element(doc, "button", `${PICKER_ROOT_CLASS}__tile`);
      tile.type = "button";
      tile.tabIndex = -1;
      tile.title = `${icon.name} — ${SOURCE_LABELS[icon.source]}`;
      tile.setAttribute("aria-label", tile.title);
      tile.setAttribute("role", "option");
      tile.dataset.index = String(rendered + offset);
      const glyph = element(doc, "span", `instui-icon -icon-${icon.name}`);
      glyph.setAttribute("aria-hidden", "true");
      tile.append(glyph);
      fragment.append(tile);
    }
    grid.insertBefore(fragment, sentinel);
    rendered += next.length;
    if (rendered <= CHUNK_SIZE) setActive(0, false);
  }

  function refresh(): void {
    matches = filterIcons(icons, search.value, source);
    rendered = 0;
    activeIndex = 0;
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

  const onTabClick = (event: Event): void => {
    const tab = (event.target as HTMLElement).closest<HTMLElement>(`.${PICKER_ROOT_CLASS}__tab`);
    if (!tab) return;
    source = (tab.dataset.source || undefined) as TaggedIcon["source"] | undefined;
    for (const [value, button] of tabButtons)
      button.setAttribute("aria-selected", String(value === (source ?? "")));
    refresh();
  };
  tabs.addEventListener("click", onTabClick);

  const onGridClick = (event: Event): void => {
    const tile = (event.target as HTMLElement).closest<HTMLElement>(`.${PICKER_ROOT_CLASS}__tile`);
    const index = tile?.dataset.index;
    if (index !== undefined) options.onPick(matches[Number(index)]);
  };
  grid.addEventListener("click", onGridClick);

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
    const delta = step[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    // Walking past the rendered window pulls in the next chunk rather than stopping short.
    if (activeIndex + delta >= rendered) renderChunk();
    setActive(activeIndex + delta, true);
  };
  grid.addEventListener("keydown", onGridKeydown);

  tabButtons.get("")?.setAttribute("aria-selected", "true");
  for (const [value, button] of tabButtons)
    if (value) button.setAttribute("aria-selected", "false");
  refresh();

  return {
    destroy(): void {
      clearTimeout(searchTimer);
      observer?.disconnect();
      search.removeEventListener("input", onSearch);
      tabs.removeEventListener("click", onTabClick);
      grid.removeEventListener("click", onGridClick);
      grid.removeEventListener("keydown", onGridKeydown);
      root.replaceChildren();
    },
  };
}
