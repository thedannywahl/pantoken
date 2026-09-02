/** A starter page layout: a plain composition of existing components, no new CSS selectors. */
export interface PageLayout {
  /** Stable id, matches the source filename (e.g. `"hero"`). */
  name: string;
  /** Label shown in a layout picker. */
  title: string;
  /** Raw HTML for the layout, built from `@pantoken/components` classes. */
  html: string;
}
