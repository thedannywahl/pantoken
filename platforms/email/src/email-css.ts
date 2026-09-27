import postcss, { type AtRule, type Container, type Rule } from "postcss";

/** Supported email client capability profiles. */
export type EmailClient = "generic" | "outlook" | "gmail" | "webkit";

/** Options for filtering component CSS for email output. */
export interface EmailCssOptions {
  /** Client capability profile. Defaults to `generic`. */
  client?: EmailClient;
  /** Component names to allow in addition to the default email-safe set. */
  allowComponents?: readonly string[];
  /** Component names to remove even when they are in the default or custom allowlist. */
  denyComponents?: readonly string[];
}

const DEFAULT_COMPONENTS = new Set([
  "alert",
  "avatar",
  "badge",
  "billboard",
  "breadcrumb",
  "breadcrumb-link",
  "button",
  "byline",
  "form-field",
  "form-field-group",
  "form-field-messages",
  "heading",
  "img",
  "link",
  "list",
  "list-item",
  "metric",
  "pill",
  "table",
  "table-body",
  "table-cell",
  "table-col-header",
  "table-head",
  "table-row",
  "table-row-header",
  "tag",
  "text",
]);

const STATE_SELECTOR =
  /:(?:active|checked|disabled|focus|focus-visible|hover|invalid|visited)(?:\b|\()/iu;
const COMPONENT_CLASS = /(?:^|[\s>+~.(,])\.([A-Za-z0-9_-]+)/gu;

const clientRules: Record<EmailClient, { preserveMedia: boolean }> = {
  generic: { preserveMedia: false },
  outlook: { preserveMedia: false },
  gmail: { preserveMedia: false },
  webkit: { preserveMedia: true },
};

function componentNames(selector: string): string[] {
  return [...selector.matchAll(COMPONENT_CLASS)]
    .map((match) => match[1])
    .filter((name): name is string => name !== undefined)
    .filter((name) => name.startsWith("instui-"))
    .map((name) => name.slice("instui-".length));
}

function splitSelectors(selectors: string): string[] {
  const result: string[] = [];
  let start = 0;
  let parentheses = 0;
  let brackets = 0;
  let quote = "";

  for (let index = 0; index < selectors.length; index += 1) {
    const character = selectors[index];
    if (quote) {
      if (character === "\\") index += 1;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === "(") parentheses += 1;
    else if (character === ")") parentheses -= 1;
    else if (character === "[") brackets += 1;
    else if (character === "]") brackets -= 1;
    else if (character === "," && parentheses === 0 && brackets === 0) {
      result.push(selectors.slice(start, index).trim());
      start = index + 1;
    }
  }

  result.push(selectors.slice(start).trim());
  return result.filter(Boolean);
}

function selectorAllowed(selector: string, allowed: ReadonlySet<string>): boolean {
  if (STATE_SELECTOR.test(selector)) return false;
  const names = componentNames(selector);
  return names.length === 0 || names.some((name) => allowed.has(name));
}

function filterContainer(
  container: Container,
  allowed: ReadonlySet<string>,
  preserveMedia: boolean,
): void {
  for (const node of container.nodes?.slice() ?? []) {
    if (node.type === "rule") {
      const rule = node as Rule;
      const selectors = splitSelectors(rule.selector).filter((selector) =>
        selectorAllowed(selector, allowed),
      );
      if (selectors.length === 0) node.remove();
      else {
        rule.selector = selectors.join(", ");
        filterContainer(rule, allowed, preserveMedia);
      }
      continue;
    }

    if (node.type === "atrule") {
      const atRule = node as AtRule;
      const name = atRule.name.toLowerCase();
      if (name === "media" && !preserveMedia) {
        node.remove();
        continue;
      }
      if (["supports", "container", "layer", "keyframes", "-webkit-keyframes"].includes(name)) {
        node.remove();
        continue;
      }
      if (atRule.nodes) filterContainer(atRule, allowed, preserveMedia);
    }
  }
}

/** Filter generated component CSS to the selected email client capabilities. */
export function filterEmailCss(css: string, options: EmailCssOptions = {}): string {
  const { client = "generic", allowComponents = [], denyComponents = [] } = options;
  const profile = clientRules[client];
  if (!profile) throw new Error(`Unknown email client profile: ${client}`);

  const allowed = new Set(DEFAULT_COMPONENTS);
  for (const component of allowComponents) allowed.add(component.replace(/^instui-/, ""));
  for (const component of denyComponents) allowed.delete(component.replace(/^instui-/, ""));

  const root = postcss.parse(css);
  filterContainer(root, allowed, profile.preserveMedia);
  return root.toString();
}
