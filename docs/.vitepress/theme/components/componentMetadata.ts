/**
 * Re-exports the component capability data published by @pantoken/interactions.
 * Source of truth: formats/interactions/scripts/generate-capabilities.ts
 * Regenerate: `vp run @pantoken/interactions#build`
 */
import raw from "@pantoken/interactions/component-capabilities.json";

export type ComponentType = "css-only" | "js-only" | "both";

export interface ComponentMetadata {
  name: string;
  type: ComponentType;
  needsIcons: boolean;
  dependencies: readonly string[];
}

type RawEntry = { name: string; type: ComponentType; needsIcons?: boolean; requires?: string[] };

export const COMPONENTS: readonly ComponentMetadata[] = (raw.components as RawEntry[]).map((c) => ({
  name: c.name,
  type: c.type,
  needsIcons: c.needsIcons ?? false,
  dependencies: c.requires ?? [],
}));

export function createComponentMap(): Map<string, ComponentMetadata> {
  return new Map(COMPONENTS.map((c) => [c.name, c]));
}

export function getAllDependencies(name: string): Set<string> {
  const comp = COMPONENTS.find((c) => c.name === name);
  if (!comp) return new Set();
  const deps = new Set<string>();
  const queue = [...comp.dependencies];
  while (queue.length > 0) {
    const dep = queue.shift();
    if (!dep || deps.has(dep)) continue;
    deps.add(dep);
    const depComp = COMPONENTS.find((c) => c.name === dep);
    if (depComp) queue.push(...depComp.dependencies);
  }
  return deps;
}

export function groupByType(): Record<ComponentType, ComponentMetadata[]> {
  return {
    "css-only": COMPONENTS.filter((c) => c.type === "css-only"),
    "js-only": COMPONENTS.filter((c) => c.type === "js-only"),
    both: COMPONENTS.filter((c) => c.type === "both"),
  };
}
