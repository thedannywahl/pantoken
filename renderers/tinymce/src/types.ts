import type { CdnFile } from "@pantoken/cdn";

/** A starter page template offered by {@link createTemplatesPlugin}. */
export interface StarterTemplate {
  /** Label shown in the "Insert template" picker. */
  title: string;
  /** Raw HTML inserted (replacing the whole document, after a confirm) when chosen. */
  content: string;
}

/** Called when a picker inserts an item whose CSS isn't yet in the caller's asset list. */
export type MissingAssetHandler = (file: CdnFile) => void;
