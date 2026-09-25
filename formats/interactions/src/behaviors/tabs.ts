/** Controls the listeners installed by {@link initTabs}. */
export interface TabsHandle {
  cleanup(): void;
}

/** Wire a tablist and its controlled panels inside a host element. */
export function initTabs(host: HTMLElement): TabsHandle {
  const tabs = (): HTMLButtonElement[] => [
    ...host.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  ];

  const select = (tab: HTMLButtonElement): void => {
    for (const other of tabs()) {
      const selected = other === tab;
      other.classList.toggle("-selected", selected);
      other.setAttribute("aria-selected", String(selected));
      const panelId = other.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : undefined;
      if (panel) panel.hidden = !selected;
    }
  };

  const onClick = (event: Event): void => {
    const tab = (event.target as Element | null)?.closest<HTMLButtonElement>('[role="tab"]');
    if (tab && host.contains(tab) && !tab.disabled) select(tab);
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    const tab = (event.target as Element | null)?.closest<HTMLButtonElement>('[role="tab"]');
    if (!tab || !host.contains(tab) || tab.disabled) return;

    const available = tabs().filter((candidate) => !candidate.disabled);
    const index = available.indexOf(tab);
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % available.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + available.length) % available.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = available.length - 1;
    else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(tab);
      return;
    } else return;

    event.preventDefault();
    available[nextIndex]?.focus();
    select(available[nextIndex]);
  };

  host.addEventListener("click", onClick);
  host.addEventListener("keydown", onKeyDown);

  const initial =
    tabs().find(
      (tab) => tab.classList.contains("-selected") || tab.getAttribute("aria-selected") === "true",
    ) ?? tabs()[0];
  if (initial) select(initial);

  return {
    cleanup(): void {
      host.removeEventListener("click", onClick);
      host.removeEventListener("keydown", onKeyDown);
    },
  };
}
