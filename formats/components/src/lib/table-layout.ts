import { appendGenerated } from "./aliases.ts";
import { breakpointEm } from "./breakpoints.ts";

/** Reuse a table record's flat stacked rules for its container-responsive modifier. */
export function withResponsiveTableLayout(body: string): string {
  const rules: string[] = [];
  const stacked = /([^{}]*(?:&|\.[\w-]+)\.-layout-stacked\b[^{}]*)(\{[^{}]*\})/gu;
  for (const [, selector, declarations] of body.matchAll(stacked)) {
    const responsive = selector
      .replace(/^[\s\S]*\*\//u, "")
      .replace(/\/\*[\s\S]*?\*\//gu, "")
      .replaceAll(".-layout-stacked", ".-layout-responsive")
      .trim();
    const base = responsive.match(/^(\.[\w-]+)\.-layout-responsive\b/u)?.[1];
    rules.push(
      base
        ? `@scope (${base}.-layout-responsive) to (${base}) {\n${responsive.replaceAll(`${base}.-layout-responsive`, ":scope")} ${declarations}\n}`
        : `${responsive} ${declarations}`,
    );
  }
  if (!rules.length) return body;
  const width = breakpointEm("--instui-breakpoints-md");
  return appendGenerated(body, `@container (width < ${width}) {\n${rules.join("\n")}\n}`);
}
