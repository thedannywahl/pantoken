/** A provider-neutral image slot declared by a starter page layout. */
export interface PageLayoutImagePlaceholder {
  /** Stable key matching the `data-pantoken-image-placeholder` HTML marker. */
  key: string;
  /** Suggested intrinsic width in pixels. */
  width: number;
  /** Suggested intrinsic height in pixels. */
  height: number;
  /** Accessible name; omit it for a decorative image. */
  altText?: string;
  /** Optional text a consumer may render into its placeholder asset. */
  text?: string;
}

/** A starter page layout: a plain composition of existing components, no new CSS selectors. */
export interface PageLayout {
  /** Stable id, matches the source folder name, e.g. `"hero"`. */
  name: string;
  /** Label shown in a layout picker. */
  title: string;
  /** Raw HTML for the layout, built from `@pantoken/components` classes. */
  html: string;
  /** Image slots that consumers may materialize without provider-specific URLs. */
  imagePlaceholders?: readonly PageLayoutImagePlaceholder[];
}
