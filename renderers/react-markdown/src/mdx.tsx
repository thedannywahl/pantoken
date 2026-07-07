/**
 * `@pantoken/react-markdown/mdx` — an MDX provider that supplies the Instructure UI component map
 * to MDX content. Kept in a separate entry so `@mdx-js/react` stays an optional peer.
 *
 * @module
 */
import { MDXProvider } from "@mdx-js/react";
import { createInstuiMarkdownComponents } from "./components.tsx";
import type { InstuiMarkdownRenderOptions } from "./types.ts";
import type { ReactNode } from "react";

/** Props for {@link InstuiMdxProvider}. */
export interface InstuiMdxProviderProps {
  children: ReactNode;
  renderOptions?: InstuiMarkdownRenderOptions;
}

/**
 * Provide the Instructure UI component map to MDX content.
 *
 * @param props - {@link InstuiMdxProviderProps}.
 *
 * @example
 * ```tsx
 * import { InstuiMdxProvider } from "@pantoken/react-markdown/mdx";
 * import Content from "./doc.mdx";
 *
 * <InstuiMdxProvider>
 *   <Content />
 * </InstuiMdxProvider>;
 * ```
 */
export function InstuiMdxProvider({ children, renderOptions }: InstuiMdxProviderProps): ReactNode {
  const components = createInstuiMarkdownComponents(renderOptions);
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default InstuiMdxProvider;
