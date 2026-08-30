/**
 * Derives each scaffold platform's entry markup from `@pantoken/plugin-layouts`'s `wrapper` layout,
 * so every preset's template stays structurally in sync with that layout automatically. Called at
 * scaffold-produce-time (not build-time) — every platform preset feeds these values into its own
 * Handlebars context instead of hand-authoring the wrapper markup.
 *
 * @module
 * @alpha
 */
import { wrapperRules } from "@pantoken/plugin-layouts";

export interface WrapperNode {
  /** Real element tag, e.g. "div", "slot", "button". "body" is remapped by the caller. */
  tag: string;
  className?: string;
  attrs?: Record<string, string>;
  optional?: boolean;
  /** An at-rule placeholder (e.g. `@component breadcrumb`) — rendered as a comment, no element. */
  comment?: string;
  children: WrapperNode[];
}

/** One parsed top-level rule: its selector text and raw nested body. */
interface RawRule {
  selector: string;
  body: string;
}

// A rule's selector text may be preceded by plain declarations from the SAME parent body (e.g.
// `display: flex;\n\n.top { ... }`) — only the text after the last `;` is the real selector.
function extractSelector(raw: string): string {
  const lastSemi = raw.lastIndexOf(";");
  return (lastSemi === -1 ? raw : raw.slice(lastSemi + 1)).trim();
}

/** Split CSS text into top-level (brace-depth-aware) rules, ignoring plain declarations. */
export function splitRules(css: string): RawRule[] {
  const rules: RawRule[] = [];
  let depth = 0;
  let selectorStart = 0;
  let bodyStart = -1;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === "{") {
      if (depth === 0) bodyStart = i + 1;
      depth++;
      continue;
    }
    if (ch !== "}") continue;
    depth--;
    if (depth !== 0 || bodyStart === -1) continue;

    const selector = extractSelector(css.slice(selectorStart, bodyStart - 1));
    if (selector) rules.push({ selector, body: css.slice(bodyStart, i) });
    selectorStart = i + 1;
    bodyStart = -1;
  }
  return rules;
}

/** Parse a single selector into a node shape (tag/class/attrs), or `null` for a `&`-scoped state rule. */
export function parseSelector(selector: string): Omit<WrapperNode, "children"> | null {
  if (selector.startsWith("@")) {
    return { tag: "", comment: selector.replace(/^@component\s+/, "") };
  }
  // `&...` selectors describe a state/variant of the CURRENT element, not a child element.
  if (selector.startsWith("&")) return null;

  const optional = selector.includes(":optional");
  const attrMatch = /^([a-z]*)\[([\w-]+)(?:~|)=(?:"([^"]*)"|'([^']*)')\]/i.exec(selector);
  if (attrMatch) {
    const [, tag, attrName, dq, sq] = attrMatch;
    const value = dq ?? sq ?? "";
    if (attrName === "class") return { tag: tag || "div", className: value, optional };
    return { tag: tag || "div", attrs: { [attrName]: value }, optional };
  }

  const tagMatch = /^[a-z][a-z0-9]*/i.exec(selector);
  const classMatch = /\.([\w-]+)/.exec(selector);
  return { tag: tagMatch?.[0] ?? "div", className: classMatch?.[1], optional };
}

export function parseNodes(css: string): WrapperNode[] {
  const nodes: WrapperNode[] = [];
  for (const { selector, body } of splitRules(css)) {
    for (const single of selector.split(",")) {
      const parsed = parseSelector(single.trim());
      if (!parsed) continue;
      nodes.push({ ...parsed, children: parseNodes(body) });
    }
  }
  return nodes;
}

/** Strip the leading cssdoc block comment so it isn't parsed as a rule body. */
function stripLeadingDocComment(css: string): string {
  const end = css.indexOf("*/");
  return end === -1 ? css : css.slice(end + 2);
}

/** The wrapper layout's root class name and its `.container` node (everything the root wraps). */
function parseWrapperLayout(): { rootClassName: string; container: WrapperNode } {
  const [root] = parseNodes(stripLeadingDocComment(wrapperRules()));
  if (!root) throw new Error("wrapper layout: no root rule found");
  const container = root.children.find((n) => n.className === "container");
  if (!container) throw new Error("wrapper layout: no .container part found");
  return { rootClassName: root.className ?? "", container };
}

/** Placeholder text injected at specific parts, keyed by class name. */
const PART_TEXT: Record<string, string> = {
  title: "{{projectName}}",
  description:
    "Styled with <code>@pantoken/components</code> and laid out with the <code>wrapper</code> layout from <code>@pantoken/plugin-layouts</code>.",
};

/** The `slot[name="content"]` part gets the platform's actual getting-started content, per format. */
const MAIN_CONTENT: Record<"html" | "jsx", string> = {
  html: '<p>Get started building with pantoken.</p>\n<button class="instui-button -color-primary" type="button">Get started</button>',
  jsx: '<p>Get started building with pantoken.</p>\n<button className="instui-button -color-primary" type="button">Get started</button>',
};

function attrName(format: "html" | "jsx"): string {
  return format === "jsx" ? "className" : "class";
}

function comment(format: "html" | "jsx", text: string): string {
  return format === "jsx" ? `{/* ${text} */}` : `<!-- ${text} -->`;
}

export function renderNode(node: WrapperNode, format: "html" | "jsx", depth: number): string {
  const pad = "  ".repeat(depth);
  if (node.comment) return `${pad}${comment(format, node.comment)}`;

  const attrs: string[] = [];
  if (node.className) attrs.push(`${attrName(format)}="${node.className}"`);
  for (const [name, value] of Object.entries(node.attrs ?? {})) attrs.push(`${name}="${value}"`);
  const openTag = `<${node.tag}${attrs.length ? ` ${attrs.join(" ")}` : ""}>`;
  const closeTag = `</${node.tag}>`;
  const optionalNote = node.optional ? ` ${comment(format, "optional")}` : "";

  const isMainSlot = node.tag === "slot" && node.attrs?.name === "content";
  const text = PART_TEXT[node.className ?? ""] ?? (isMainSlot ? MAIN_CONTENT[format] : undefined);
  const childLines = node.children.map((child) => renderNode(child, format, depth + 1));
  const bodyPad = "  ".repeat(depth + 1);
  const bodyLines = text ? text.split("\n").map((line) => `${bodyPad}${line}`) : childLines;

  if (bodyLines.length === 0) return `${pad}${openTag}${closeTag}${optionalNote}`;
  return [`${pad}${openTag}${optionalNote}`, ...bodyLines, `${pad}${closeTag}`].join("\n");
}

/**
 * Render the wrapper layout's `.container` part tree as markup, starting at the given indent depth.
 * `format: "html"` covers plain HTML/Angular templates (`class="..."`); `"jsx"` covers React/Next
 * (`className="..."`).
 */
export function renderWrapperContainer(format: "html" | "jsx", depth = 0): string {
  const { container } = parseWrapperLayout();
  return renderNode(container, format, depth);
}

/** The wrapper layout's root class name (applied to the real document `<body>` or component root). */
export function wrapperRootClassName(): string {
  return parseWrapperLayout().rootClassName;
}

/**
 * The wrapper layout markup/tokens every platform Preset feeds into its own Handlebars context —
 * `{{projectName}}` inside the rendered markup is left as-is, for the platform's own template to
 * resolve.
 */
export function getWrapperContext(): {
  wrapperRootClass: string;
  wrapperContainerHtml: (depth?: number) => string;
  wrapperContainerJsx: (depth?: number) => string;
} {
  return {
    wrapperRootClass: wrapperRootClassName(),
    wrapperContainerHtml: (depth = 0) => renderWrapperContainer("html", depth),
    wrapperContainerJsx: (depth = 0) => renderWrapperContainer("jsx", depth),
  };
}
