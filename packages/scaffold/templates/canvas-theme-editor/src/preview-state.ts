function fingerprint(root: HTMLElement): string {
  const states = [
    ...root.querySelectorAll<HTMLInputElement>("input,select,textarea,details,dialog,[popover]"),
  ].map((element) => [
    element.value,
    element.checked,
    (element as unknown as HTMLDetailsElement).open,
    element.hasAttribute("popover") && element.matches(":popover-open"),
  ]);
  return JSON.stringify([root.innerHTML, states]);
}

/** Observe meaningful preview changes against its loaded baseline; never modify authored HTML. */
export function trackPreviewChanges(
  root: HTMLElement,
  onChange: (dirty: boolean) => void,
): () => void {
  const baseline = fingerprint(root);
  let dirty = false;
  const check = (): void => {
    const next = fingerprint(root) !== baseline;
    if (dirty === next) return;
    dirty = next;
    onChange(dirty);
  };
  const observer = new MutationObserver(check);
  observer.observe(root, { childList: true, subtree: true, attributes: true, characterData: true });
  for (const event of ["input", "change", "toggle"]) root.addEventListener(event, check, true);
  onChange(false);
  return () => {
    observer.disconnect();
    for (const event of ["input", "change", "toggle"]) root.removeEventListener(event, check, true);
  };
}
