interface ComponentEntry {
  name: string;
  className: string;
  examples?: readonly string[];
}

interface Capability {
  name: string;
  type: string;
  requires?: readonly string[];
}

/** Whether a component or its example's nested components require Pantoken behavior. */
export function componentNeedsInteractions(
  entry: ComponentEntry,
  model: readonly ComponentEntry[],
  capabilities: readonly Capability[],
): boolean {
  const byName = new Map(capabilities.map((item) => [item.name, item]));
  const visited = new Set<string>();
  const needsBehavior = (name: string): boolean => {
    if (visited.has(name)) return false;
    visited.add(name);
    const capability = byName.get(name);
    return (
      capability?.type === "both" ||
      capability?.type === "js-only" ||
      (capability?.requires?.some(needsBehavior) ?? false)
    );
  };
  if (needsBehavior(entry.name)) return true;
  const example =
    entry.examples?.find((html) => html.includes("-canvas-rce")) ?? entry.examples?.[0] ?? "";
  const fragment = document.createElement("template");
  fragment.innerHTML = example;
  return model.some(
    (component) =>
      component.className.startsWith(".") &&
      [...fragment.content.querySelectorAll("[class]")].some((element) =>
        element.classList.contains(component.className.slice(1)),
      ) &&
      needsBehavior(component.name),
  );
}
