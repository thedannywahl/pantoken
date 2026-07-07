/**
 * Public option and prop types for `@pantoken/react-markdown`.
 *
 * @module
 */
import type { IconResolver, PantokenPlugin } from "@pantoken/model";

/** GitHub-style blockquote alert markers (`> [!NOTE]`). */
export type AlertMarker = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

/** Render options that tune how Markdown maps onto Instructure UI. */
export interface InstuiMarkdownRenderOptions {
  /** Link behavior. */
  link?: {
    /** Show an external-link affordance on off-site links (default: true). */
    external?: boolean;
    /** Add permalink anchors to headings (default: false). */
    permalinks?: boolean;
    /** Class name for permalink anchors (default: `pantoken-heading-anchor`). */
    permalinkClassName?: string;
  };
  /** Fenced code block behavior. */
  code?: {
    /** Preserve the language hint as a `data-language` attribute (default: true). */
    language?: boolean;
  };
  /** Inline `:icon:` token behavior. */
  icons?: {
    /** Enable `:icon:` rendering (default: true). */
    enabled?: boolean;
    /** CSS color applied to rendered icons. */
    color?: string;
    /** Extra resolvers, tried before the built-in pantoken icon set. */
    resolvers?: IconResolver[];
    /** Plugins whose `rehype` hooks contribute resolvers (e.g. simple-icons). */
    plugins?: PantokenPlugin[];
  };
  /** Inline color-code swatches (e.g. `#03893D`). */
  color?: {
    /** Enable color swatches (default: true). */
    enabled?: boolean;
  };
  /** GitHub-style blockquote alerts. */
  alerts?: {
    /** Enable `> [!NOTE]` → InstUI Alert mapping (default: true). */
    enabled?: boolean;
  };
  /** Caption used for rendered tables (required by InstUI Table for a11y). */
  tableCaption?: string;
}

/** Props for the {@link InstuiMarkdown} component. */
export interface InstuiMarkdownProps {
  /** The Markdown source. */
  children: string;
  /** Render options. */
  renderOptions?: InstuiMarkdownRenderOptions;
}
