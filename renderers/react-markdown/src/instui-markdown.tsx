/**
 * The `InstuiMarkdown` React component: renders a Markdown string with Instructure UI components
 * and pantoken icons. It wires react-markdown with GFM, the GitHub-alert and color-code rehype
 * steps, and `@pantoken/rehype` for inline `:icon:` tokens.
 *
 * @module
 */
import { rehypePantokenIcons } from "@pantoken/rehype";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createInstuiMarkdownComponents } from "./components.tsx";
import { buildIconResolver, rehypeColorCodes, rehypeGithubAlerts } from "./helpers.ts";
import type { InstuiMarkdownProps } from "./types.ts";
import type { ComponentProps } from "react";

type RehypePlugins = ComponentProps<typeof Markdown>["rehypePlugins"];

/**
 * Render Markdown with Instructure UI element mappings and pantoken icon/color tokens.
 *
 * @param props - {@link InstuiMarkdownProps}.
 *
 * @example Basic
 * ```tsx
 * import { InstuiMarkdown } from "@pantoken/react-markdown";
 *
 * <InstuiMarkdown>{"Go :arrow-left: back. Brand is #03893D.\n\n> [!TIP]\n> Helpful."}</InstuiMarkdown>;
 * ```
 *
 * @example With brand icons via a plugin
 * ```tsx
 * import { InstuiMarkdown } from "@pantoken/react-markdown";
 * import { simpleIcons } from "@pantoken/plugin-simple-icons";
 * import * as registry from "simple-icons";
 *
 * <InstuiMarkdown renderOptions={{ icons: { plugins: [simpleIcons({ registry })] } }}>
 *   {"Star us on :github:"}
 * </InstuiMarkdown>;
 * ```
 */
export function InstuiMarkdown({ children, renderOptions }: InstuiMarkdownProps): React.ReactNode {
  const components = createInstuiMarkdownComponents(renderOptions);
  const iconsEnabled = renderOptions?.icons?.enabled !== false;
  const colorEnabled = renderOptions?.color?.enabled !== false;
  const alertsEnabled = renderOptions?.alerts?.enabled !== false;
  const resolve = buildIconResolver(renderOptions);

  const rehypePlugins = [
    ...(alertsEnabled ? [rehypeGithubAlerts] : []),
    ...(iconsEnabled
      ? [[rehypePantokenIcons, { resolve, plugins: renderOptions?.icons?.plugins }] as const]
      : []),
    ...(colorEnabled ? [rehypeColorCodes] : []),
  ] as RehypePlugins;

  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={rehypePlugins} components={components}>
      {children}
    </Markdown>
  );
}

export default InstuiMarkdown;
