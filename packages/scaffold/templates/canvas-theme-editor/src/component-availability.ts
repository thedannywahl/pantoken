interface ComponentEntry {
  name: string;
}

interface Capability {
  name: string;
  type: string;
}

/** Match the CDN picker: css-only is none, both is enhancement, and js-only is requirement. */
export function componentNeedsInteractions(
  entry: ComponentEntry,
  capabilities: readonly Capability[],
): boolean {
  return capabilities.some(
    (capability) => capability.name === entry.name && capability.type === "js-only",
  );
}
