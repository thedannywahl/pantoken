import postcss, { type AtRule, type Container, type Node, type Rule } from "postcss";

function splitSelectors(selectors: string): string[] {
  const results: string[] = [];
  let start = 0;
  let parentheses = 0;
  let brackets = 0;
  let quote = "";

  for (let index = 0; index < selectors.length; index += 1) {
    const character = selectors[index]!;
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
      results.push(selectors.slice(start, index).trim());
      start = index + 1;
    }
  }

  results.push(selectors.slice(start).trim());
  return results.filter(Boolean);
}

function scopeSelectors(params: string): string[] {
  const start = params.indexOf("(");
  if (start < 0) throw new SyntaxError(`Unsupported @scope parameters: ${params}`);

  let depth = 0;
  let end = -1;
  for (let index = start; index < params.length; index += 1) {
    if (params[index] === "(") depth += 1;
    else if (params[index] === ")") {
      depth -= 1;
      if (depth === 0) {
        end = index;
        break;
      }
    }
  }
  if (end < 0 || params.slice(end + 1).trim()) {
    throw new SyntaxError(`Unsupported @scope parameters: ${params}`);
  }

  const selectors = splitSelectors(params.slice(start + 1, end));
  if (selectors.length === 0) throw new SyntaxError(`Empty @scope root: ${params}`);
  return selectors;
}

function combineSelectors(parents: string[], children: string): string {
  return splitSelectors(children)
    .flatMap((child) =>
      parents.map((parent) =>
        child.includes("&") ? child.replaceAll("&", parent) : `${parent} ${child}`,
      ),
    )
    .join(", ");
}

function flattenContainer(container: Container, parents?: string[]): void {
  for (const node of container.nodes?.slice() ?? []) {
    if (node.type === "atrule" && node.name.toLowerCase() === "scope") {
      flattenContainer(node, scopeSelectors(node.params));
      const children = [...(node.nodes ?? [])];
      if (children.length) node.replaceWith(...children);
      else node.remove();
      continue;
    }

    if (node.type === "rule") {
      const rule = node as Rule;
      if (parents) rule.selector = combineSelectors(parents, rule.selector);
      flattenContainer(rule, splitSelectors(rule.selector));
      continue;
    }

    if (node.type === "atrule" && node.nodes) {
      const atRule = node as AtRule;
      const keyframes = /(?:^|-)(?:webkit-)?keyframes$/iu.test(atRule.name);
      flattenContainer(atRule, keyframes ? undefined : parents);
    }
  }
}

/** Flatten simple CSS `@scope` blocks to selectors Juice can process. */
export function flattenScopes(css: string): string {
  const root = postcss.parse(css);
  flattenContainer(root as Node & Container);
  return root.toString();
}
