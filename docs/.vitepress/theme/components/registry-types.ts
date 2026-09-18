/**
 * Types for the shadcn/ui registry specification.
 *
 * Conforms to https://ui.shadcn.com/schema/registry.json and
 * https://ui.shadcn.com/schema/registry-item.json.
 */

/** A single file entry within a registry item manifest. */
export interface RegistryFile {
  path: string;
  type: string;
  content?: string;
  target?: string;
}

/** Supported registry item types conforming to the shadcn/ui registry schema. */
export type RegistryItemType =
  | "registry:base"
  | "registry:block"
  | "registry:component"
  | "registry:font"
  | "registry:lib"
  | "registry:hook"
  | "registry:ui"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme"
  | "registry:item";

/** A single registry item entry in the shadcn/ui registry format. */
export interface RegistryItem {
  $schema?: string;
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  author?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  docs?: string;
  categories?: string[];
  cssVars?: {
    theme?: Record<string, string>;
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  css?: Record<string, Record<string, string>>;
  meta?: Record<string, unknown>;
}

/** A full catalog index conforming to the shadcn/ui registry schema. */
export interface RegistryCatalog {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}
