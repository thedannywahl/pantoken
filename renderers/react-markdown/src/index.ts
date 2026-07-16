/**
 * `@pantoken/react-markdown` — render Markdown with Instructure UI components and pantoken icons.
 *
 * The default entry renders GitHub-Flavored Markdown, inline `:icon:` tokens (via
 * `@pantoken/rehype` + `@pantoken/icons`), color-code swatches, and GitHub-style alerts. The MDX
 * provider lives at `@pantoken/react-markdown/mdx`.
 *
 * @module
 * @beta
 */
export { InstuiMarkdown } from "./instui-markdown.tsx";
export { createInstuiMarkdownComponents, instuiMarkdownComponents } from "./components.tsx";
export {
  buildIconResolver,
  isColorValue,
  parseAlertMarker,
  rehypeColorCodes,
  rehypeGithubAlerts,
} from "./helpers.ts";
export type { AlertMarker, InstuiMarkdownProps, InstuiMarkdownRenderOptions } from "./types.ts";
