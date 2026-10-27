/** Listeners installed by {@link initTreeBrowser}. */
export interface TreeBrowserHandle {
  cleanup(): void;
}

/** Wire ARIA-tree navigation and expansion, with single selection opt-in via `aria-selected`. */
export function initTreeBrowser(host: HTMLElement): TreeBrowserHandle {
  const owns = (item: HTMLElement): boolean => {
    const tree = item.closest('[role="tree"]');
    return host.contains(item) && (tree === host || (!host.matches('[role="tree"]') && !tree));
  };
  const items = (): HTMLElement[] =>
    [...host.querySelectorAll<HTMLElement>('[role="treeitem"]')].filter(owns);
  const group = (item: HTMLElement): HTMLElement | undefined => {
    const ownedId = item.getAttribute("aria-owns");
    if (ownedId) {
      const owned = item.ownerDocument.getElementById(ownedId);
      if (
        !(owned instanceof HTMLElement) ||
        !owns(owned) ||
        owned.contains(item) ||
        owned.getAttribute("role") !== "group"
      )
        throw new Error(`Tree item references an invalid group: ${ownedId}`);
      return owned;
    }
    return [...item.children].find(
      (child): child is HTMLElement =>
        child instanceof HTMLElement && child.getAttribute("role") === "group",
    );
  };
  const available = (): HTMLElement[] =>
    items().filter((item) => {
      const hidden = item.closest("[hidden]");
      return (
        (!hidden || hidden === host || !host.contains(hidden)) &&
        item.getAttribute("aria-disabled") !== "true"
      );
    });
  const tabStop = (item: HTMLElement): void => {
    for (const other of items()) other.tabIndex = other === item ? 0 : -1;
  };
  const focus = (item: HTMLElement | undefined): void => {
    if (!item) return;
    tabStop(item);
    item.focus();
  };
  const expand = (item: HTMLElement, open: boolean): void => {
    const children = group(item);
    if (!children) return;
    item.setAttribute("aria-expanded", String(open));
    children.hidden = !open;
  };
  const selectable = (): boolean => items().some((item) => item.hasAttribute("aria-selected"));
  const select = (item: HTMLElement): void => {
    if (!selectable()) return;
    for (const other of items()) {
      other.setAttribute("aria-selected", String(other === item));
      other.classList.toggle("-selected", other === item);
    }
  };
  const eventItem = (event: Event): HTMLElement | undefined => {
    const item =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>('[role="treeitem"]')
        : null;
    return item && owns(item) ? item : undefined;
  };
  const onClick = (event: Event): void => {
    const item = eventItem(event);
    if (!item) return;
    if (!available().includes(item)) {
      event.preventDefault();
      return;
    }
    focus(item);
    if (group(item)) expand(item, item.getAttribute("aria-expanded") !== "true");
    select(item);
  };
  const onFocus = (event: Event): void => {
    const item = eventItem(event);
    if (item && available().includes(item)) tabStop(item);
  };
  const onKeyDown = (event: KeyboardEvent): void => {
    const item = eventItem(event);
    if (!item || !available().includes(item) || event.altKey || event.ctrlKey || event.metaKey)
      return;
    const visible = available();
    const index = visible.indexOf(item);
    const rtl = getComputedStyle(host).direction === "rtl";
    if (event.key === "ArrowDown" || event.key === "j")
      focus(visible[Math.min(index + 1, visible.length - 1)]);
    else if (event.key === "ArrowUp" || event.key === "k") focus(visible[Math.max(index - 1, 0)]);
    else if (event.key === "Home") focus(visible[0]);
    else if (event.key === "End") focus(visible[visible.length - 1]);
    else if (event.key === (rtl ? "ArrowLeft" : "ArrowRight")) {
      if (group(item)) {
        if (item.getAttribute("aria-expanded") !== "true") expand(item, true);
        else focus(available().find((candidate) => group(item)!.contains(candidate)));
      }
    } else if (event.key === (rtl ? "ArrowRight" : "ArrowLeft")) {
      if (group(item) && item.getAttribute("aria-expanded") === "true") expand(item, false);
      else {
        const parentGroup = item.parentElement?.closest('[role="group"]');
        const parent = items().find((candidate) => group(candidate) === parentGroup);
        if (parent && owns(parent)) focus(parent);
      }
    } else if (event.key === "Enter" || event.key === " ") {
      if (group(item) && selectable()) select(item);
      else item.click();
    } else return;
    event.preventDefault();
  };

  for (const item of items()) {
    const children = group(item);
    if (children) expand(item, item.getAttribute("aria-expanded") === "true");
  }
  const visible = available();
  const initial =
    visible.find((item) => item.getAttribute("tabindex") === "0") ??
    visible.find((item) => item.getAttribute("aria-selected") === "true") ??
    visible[0];
  for (const item of items()) item.tabIndex = item === initial ? 0 : -1;
  host.addEventListener("click", onClick);
  host.addEventListener("focusin", onFocus);
  host.addEventListener("keydown", onKeyDown);
  return {
    cleanup(): void {
      host.removeEventListener("click", onClick);
      host.removeEventListener("focusin", onFocus);
      host.removeEventListener("keydown", onKeyDown);
    },
  };
}
