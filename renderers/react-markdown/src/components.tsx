/**
 * Maps Markdown (hast) elements onto Instructure UI components, plus the inline `:icon:` and
 * color-swatch renderers. Returned as a react-markdown `components` map.
 *
 * @module
 */
import { Alert } from "@instructure/ui-alerts";
import { Heading } from "@instructure/ui-heading";
import { Img } from "@instructure/ui-img";
import { Link } from "@instructure/ui-link";
import { List } from "@instructure/ui-list";
import { Table } from "@instructure/ui-table";
import { Text } from "@instructure/ui-text";
import { View } from "@instructure/ui-view";
import { createElement } from "react";
import { alertVariant, buildIconResolver } from "./helpers.ts";
import type { AlertMarker } from "./types.ts";
import type { InstuiMarkdownRenderOptions } from "./types.ts";
import type { IconResolver } from "@pantoken/model";
import type { Components } from "react-markdown";
import type { ComponentType, ReactNode } from "react";

// InstUI Table subcomponents are typed to accept only specific child element types; Markdown gives
// us generic ReactNode children, so we wrap them in permissive aliases.
const TableHead = Table.Head as ComponentType<{ children?: ReactNode }>;
const TableBody = Table.Body as ComponentType<{ children?: ReactNode }>;
const TableRow = Table.Row as ComponentType<{ children?: ReactNode }>;
const TableColHeader = Table.ColHeader as ComponentType<{ id?: string; children?: ReactNode }>;
const TableCell = Table.Cell as ComponentType<{ children?: ReactNode }>;

/** The loosely-typed prop bag react-markdown hands to a component override. */
type MdProps = { children?: ReactNode; node?: unknown } & Record<string, unknown>;

function str(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

/** Best-effort extraction of a plain-text string from arbitrary React children. */
function textOf(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(textOf).join("");
  return "";
}

function slug(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "col"
  );
}

function iconSpan(resolve: IconResolver, color?: string) {
  return function IconOrColorSpan(props: MdProps): ReactNode {
    const iconName = str(props["data-pantoken-icon"]);
    if (iconName) {
      const icon = resolve(iconName);
      const svg =
        icon?.svg ??
        (icon?.path
          ? `<svg viewBox="0 0 24 24"><path d="${icon.path}" fill="currentColor"/></svg>`
          : undefined);
      if (svg) {
        return createElement("span", {
          role: "img",
          "aria-label": iconName,
          className: "pantoken-icon",
          style: {
            display: "inline-flex",
            width: "1em",
            height: "1em",
            verticalAlign: "-0.125em",
            color,
          },
          dangerouslySetInnerHTML: { __html: svg },
        });
      }
    }

    const colorCode = str(props["data-color-code"]);
    if (colorCode) {
      return createElement(
        "span",
        {
          className: "pantoken-color",
          style: { display: "inline-flex", alignItems: "center", gap: "0.35em" },
        },
        createElement("span", {
          "aria-hidden": true,
          style: {
            display: "inline-block",
            width: "0.85em",
            height: "0.85em",
            borderRadius: "2px",
            border: "1px solid rgba(0,0,0,0.2)",
            background: colorCode,
          },
        }),
        createElement("code", null, colorCode),
      );
    }

    return createElement("span", null, props.children);
  };
}

function heading(level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  return ({ children }: MdProps): ReactNode => <Heading level={level}>{children}</Heading>;
}

/**
 * Build the react-markdown component map for a set of render options.
 *
 * @param options - {@link InstuiMarkdownRenderOptions}.
 * @returns A react-markdown `components` map backed by Instructure UI.
 *
 * @example Pass the map straight to react-markdown
 * ```tsx
 * import Markdown from "react-markdown";
 * import { createInstuiMarkdownComponents } from "@pantoken/react-markdown";
 *
 * const components = createInstuiMarkdownComponents({ tableCaption: "Grades" });
 * <Markdown components={components}># Report</Markdown>;
 * ```
 */
export function createInstuiMarkdownComponents(
  options: InstuiMarkdownRenderOptions = {},
): Components {
  const resolve = buildIconResolver(options);
  const Span = iconSpan(resolve, options.icons?.color);
  const showExternal = options.link?.external ?? true;
  const showLanguage = options.code?.language ?? true;
  const caption = options.tableCaption ?? "Table";

  const map: Record<string, (props: MdProps) => ReactNode> = {
    h1: heading("h1"),
    h2: heading("h2"),
    h3: heading("h3"),
    h4: heading("h4"),
    h5: heading("h5"),
    h6: heading("h6"),
    p: ({ children }) => <Text as="p">{children}</Text>,
    strong: ({ children }) => (
      <Text as="span" weight="bold">
        {children}
      </Text>
    ),
    em: ({ children }) => (
      <Text as="span" fontStyle="italic">
        {children}
      </Text>
    ),
    a: ({ children, ...props }) => {
      const href = str(props.href);
      const external = showExternal && !!href && /^https?:\/\//.test(href);
      return (
        <Link href={href} {...(external ? { target: "_blank" } : {})}>
          {children}
        </Link>
      );
    },
    ul: ({ children }) => <List as="ul">{children}</List>,
    ol: ({ children }) => (
      <List as="ol" isUnstyled={false}>
        {children}
      </List>
    ),
    li: ({ children }) => <List.Item>{children}</List.Item>,
    blockquote: ({ children, ...props }) => {
      const alert = str(props["data-alert"]);
      if (options.alerts?.enabled !== false && alert) {
        return (
          <Alert variant={alertVariant(alert.toUpperCase() as AlertMarker)} margin="small 0">
            {children}
          </Alert>
        );
      }
      return (
        <View
          as="blockquote"
          display="block"
          borderWidth="none none none large"
          padding="small medium"
        >
          {children}
        </View>
      );
    },
    code: ({ children, ...props }) => {
      const className = str(props.className);
      const inline = !className && !textOf(children as ReactNode).includes("\n");
      if (inline) {
        return <Text as="code">{children}</Text>;
      }
      const language = showLanguage ? className?.replace(/.*language-/, "") : undefined;
      return createElement("code", { className, "data-language": language }, children);
    },
    pre: ({ children }) => (
      <View as="pre" display="block" background="secondary" padding="small" borderRadius="medium">
        {children}
      </View>
    ),
    img: ({ ...props }) => <Img src={str(props.src) ?? ""} alt={str(props.alt) ?? ""} />,
    hr: () => <View as="hr" display="block" margin="medium 0" />,
    table: ({ children }) => (
      <Table caption={caption} layout="auto">
        {children}
      </Table>
    ),
    thead: ({ children }) => <TableHead>{children}</TableHead>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => (
      <TableColHeader id={slug(textOf(children as ReactNode))}>{children}</TableColHeader>
    ),
    td: ({ children }) => <TableCell>{children}</TableCell>,
    span: Span,
  };

  return map as unknown as Components;
}

/** The default component map (no options). */
export const instuiMarkdownComponents: Components = createInstuiMarkdownComponents();
