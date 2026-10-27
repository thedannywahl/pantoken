/** Listeners and attribute restoration installed by {@link initMenu}. */
export interface MenuHandle {
  cleanup(): void;
}

/**
 * Wire a vertical, single-level ARIA menu and its native popover button.
 * Arrow keys wrap; Home/End and initial-character search move focus. Escape returns
 * focus to the button; Tab closes without canceling normal sequential navigation.
 * Applications own click actions and checked state. Space activates checkable items
 * without closing; Enter and pointer activation close unless the click is canceled.
 */
export function initMenu(menu: HTMLElement, trigger: HTMLButtonElement): MenuHandle {
  const root = menu.getRootNode();
  if (
    (root !== menu.ownerDocument && !(root instanceof ShadowRoot)) ||
    !menu.isConnected ||
    !trigger.isConnected ||
    root !== trigger.getRootNode() ||
    menu.contains(trigger) ||
    menu.getAttribute("role") !== "menu" ||
    !menu.hasAttribute("popover") ||
    !menu.id ||
    /\s/u.test(menu.id) ||
    trigger.getAttribute("popovertarget") !== menu.id ||
    trigger.popoverTargetElement !== menu
  )
    throw new Error("Menu requires a connected native popover and its button in the same root");
  if (menu.getAttribute("aria-orientation") === "horizontal")
    throw new Error("Menu navigation supports vertical menus only");

  const selector = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';
  const owns = (item: HTMLElement): boolean => item.closest('[role="menu"]') === menu;
  const items = (): HTMLElement[] => [...menu.querySelectorAll<HTMLElement>(selector)].filter(owns);
  const available = (): HTMLElement[] =>
    items().filter((item) => !item.closest("[hidden], [inert]") && !item.matches(":disabled"));
  for (const item of items()) {
    if (["true", "menu"].includes(item.getAttribute("aria-haspopup") ?? ""))
      throw new Error("Menu navigation doesn't support submenus");
    const role = item.getAttribute("role");
    if (
      role !== "menuitem" &&
      !(role === "menuitemcheckbox" ? ["true", "false", "mixed"] : ["true", "false"]).includes(
        item.getAttribute("aria-checked") ?? "",
      )
    )
      throw new Error("Checkable menu items require an appropriate aria-checked value");
  }
  if (!available().length) throw new Error("Menu requires at least one focusable item");

  const originalTrigger = new Map(
    ["aria-haspopup", "aria-expanded", "aria-controls"].map((name) => [
      name,
      trigger.getAttribute(name),
    ]),
  );
  const originalTabindex = new Map<HTMLElement, string | null>();
  let lastOnOpen = false;
  let keepOpen = false;
  const tabStop = (item: HTMLElement | undefined): void => {
    for (const other of items()) {
      if (!originalTabindex.has(other)) originalTabindex.set(other, other.getAttribute("tabindex"));
      other.tabIndex = other === item ? 0 : -1;
    }
  };
  const focus = (item: HTMLElement | undefined): void => {
    tabStop(item);
    item?.focus();
  };
  const isOpen = (): boolean => menu.matches(":popover-open");
  const close = (returnFocus: boolean): void => {
    const focused = menu.contains(
      root instanceof ShadowRoot ? root.activeElement : menu.ownerDocument.activeElement,
    );
    if (isOpen()) menu.hidePopover();
    trigger.setAttribute("aria-expanded", "false");
    if (returnFocus && focused) trigger.focus();
  };
  const onToggle = (): void => {
    const open = isOpen();
    trigger.setAttribute("aria-expanded", String(open));
    if (open) {
      const entries = available();
      if (!entries.length) {
        close(true);
        return;
      }
      focus(lastOnOpen ? entries[entries.length - 1] : entries[0]);
    }
    lastOnOpen = false;
  };
  const eventItem = (event: Event): HTMLElement | undefined => {
    const item =
      event.target instanceof Element ? event.target.closest<HTMLElement>(selector) : null;
    return item && owns(item) ? item : undefined;
  };
  const disabled = (item: HTMLElement): boolean =>
    item.getAttribute("aria-disabled") === "true" || item.matches(":disabled");
  const onCaptureClick = (event: MouseEvent): void => {
    const item = eventItem(event);
    if (item && disabled(item)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  const onClick = (event: MouseEvent): void => {
    if (eventItem(event) && !event.defaultPrevented && !keepOpen) close(true);
  };
  const onFocus = (event: FocusEvent): void => {
    const item = eventItem(event);
    if (item && available().includes(item)) tabStop(item);
  };
  const onKeyDown = (event: KeyboardEvent): void => {
    const item = eventItem(event);
    if (!item || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "Tab") {
      close(false);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    const entries = available();
    if (!entries.length) {
      event.preventDefault();
      close(true);
      return;
    }
    const index = entries.indexOf(item);
    if (event.key === "ArrowDown") focus(entries[(index + 1) % entries.length]);
    else if (event.key === "ArrowUp") focus(entries[(index - 1 + entries.length) % entries.length]);
    else if (event.key === "Home") focus(entries[0]);
    else if (event.key === "End") focus(entries[entries.length - 1]);
    else if (event.key === "Enter" || event.key === " ") {
      if (!disabled(item)) {
        keepOpen = event.key === " " && item.getAttribute("role") !== "menuitem";
        try {
          item.click();
        } finally {
          keepOpen = false;
        }
      }
    } else if (event.key.length === 1) {
      const ordered = [...entries.slice(index + 1), ...entries.slice(0, index + 1)];
      const match = ordered.find((entry) =>
        (entry.getAttribute("aria-label") ?? entry.textContent ?? "")
          .trim()
          .toLowerCase()
          .startsWith(event.key.toLowerCase()),
      );
      if (!match) return;
      focus(match);
    } else return;
    event.preventDefault();
  };
  const onTriggerKeyDown = (event: KeyboardEvent): void => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    lastOnOpen = event.key === "ArrowUp";
    if (isOpen()) onToggle();
    else menu.showPopover();
  };

  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-controls", menu.id);
  tabStop(available()[0]);
  menu.addEventListener("toggle", onToggle);
  menu.addEventListener("click", onCaptureClick, true);
  menu.addEventListener("click", onClick);
  menu.addEventListener("focusin", onFocus);
  menu.addEventListener("keydown", onKeyDown);
  trigger.addEventListener("keydown", onTriggerKeyDown);
  onToggle();
  return {
    cleanup(): void {
      menu.removeEventListener("toggle", onToggle);
      menu.removeEventListener("click", onCaptureClick, true);
      menu.removeEventListener("click", onClick);
      menu.removeEventListener("focusin", onFocus);
      menu.removeEventListener("keydown", onKeyDown);
      trigger.removeEventListener("keydown", onTriggerKeyDown);
      for (const [name, value] of originalTrigger) {
        if (value === null) trigger.removeAttribute(name);
        else trigger.setAttribute(name, value);
      }
      for (const [item, value] of originalTabindex) {
        if (value === null) item.removeAttribute("tabindex");
        else item.setAttribute("tabindex", value);
      }
    },
  };
}
