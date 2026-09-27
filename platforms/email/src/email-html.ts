import { componentsCss } from "@pantoken/components";
import { load } from "cheerio";
import {
  COLOR_KEYS,
  CUSTOM_COLOR_KEY,
  customThemeColorsCss,
  type PantokenColorNamespace,
} from "@pantoken/plugin-custom-theme-colors";
import { byTheme } from "@pantoken/tokens";
import { resolveTokens } from "@pantoken/utils";
import type { Theme, Token } from "@pantoken/model";
import { inlineHtml } from "@pantoken/inline-styles/html";
import { filterEmailCss, type EmailClient } from "./email-css.ts";

export type { EmailClient } from "./email-css.ts";

/** Options for generating email-compatible HTML with pantoken styles. */
export interface InlineEmailHtmlOptions {
  /** Token theme to use. Defaults to `rebrand`. */
  theme?: Theme;
  /** Color scheme to resolve. Defaults to `light`. */
  mode?: "light" | "dark";
  /** Component class prefix. Defaults to `instui`. */
  prefix?: string | null;
  /** Add generated rules for this custom brand color. */
  customColor?: string;
  /** Apply one of the plugin's shipped or custom color scales. */
  color?: PantokenColorNamespace;
  /** Retain pseudo-class and media-query rules in a style element. Defaults to `false`. */
  preserveFallbacks?: boolean;
  /** Email client capability profile. Defaults to `generic`. */
  client?: EmailClient;
  /** Component names to allow in addition to the default email-safe set. */
  allowComponents?: readonly string[];
  /** Component names to remove from the email output. */
  denyComponents?: readonly string[];
  /** Additional caller-supplied CSS. */
  extraCss?: string;
}

function modeValue(value: string, mode: "light" | "dark"): string {
  const prefix = "light-dark(";
  const start = value.indexOf(prefix);
  if (start < 0) return value;

  let depth = 1;
  let comma = -1;
  let end = -1;
  for (let index = start + prefix.length; index < value.length; index += 1) {
    if (value[index] === "(") depth += 1;
    else if (value[index] === ")") {
      depth -= 1;
      if (depth === 0) {
        end = index;
        break;
      }
    } else if (value[index] === "," && depth === 1 && comma < 0) {
      comma = index;
    }
  }
  if (comma < 0 || end < 0) return value;

  const selected =
    mode === "light" ? value.slice(start + prefix.length, comma) : value.slice(comma + 1, end);
  return `${value.slice(0, start)}${modeValue(selected.trim(), mode)}${value.slice(end + 1)}`;
}

function resolvedThemeTokens(
  theme: Theme,
  mode: "light" | "dark",
): {
  tokens: Token[];
  resolved: Map<string, string>;
} {
  const tokens = byTheme(theme).map((token) => ({
    ...token,
    value: modeValue(token.value, mode),
    flatValue: token.flatValue ? modeValue(token.flatValue, mode) : undefined,
  }));
  return { tokens, resolved: resolveTokens(tokens) };
}

function tokenStylesheet(tokens: readonly Token[], resolved: Map<string, string>): string {
  const declarations = tokens
    .filter((token) => token.meta?.kind !== "icon")
    .map((token) => `  ${token.name}: ${resolved.get(token.name) ?? token.value};`)
    .join("\n");
  return `:root {\n${declarations}\n}`;
}

function markColorScope(html: string, color: PantokenColorNamespace): string {
  const $ = load(html, {}, false);
  const documentRoot = $("html").first();
  const roots = documentRoot.length
    ? documentRoot
    : $.root()
        .children()
        .filter((_, node) => node.type === "tag");
  roots.attr("data-pantoken-color", color);
  return $.html();
}

/** Inline resolved pantoken tokens and component CSS into HTML email markup. */
export function inlineEmailHtml(html: string, options: InlineEmailHtmlOptions = {}): string {
  const {
    theme = "rebrand",
    mode = "light",
    prefix = "instui",
    customColor,
    color,
    preserveFallbacks = false,
    client = "generic",
    allowComponents = [],
    denyComponents = [],
    extraCss = "",
  } = options;
  const activeColor = color ?? (customColor ? CUSTOM_COLOR_KEY : undefined);
  if (activeColor && activeColor !== CUSTOM_COLOR_KEY && !COLOR_KEYS.includes(activeColor)) {
    throw new Error(`Unknown pantoken color scale: ${activeColor}`);
  }
  if (activeColor === CUSTOM_COLOR_KEY && !customColor) {
    throw new Error('The "custom" color scale requires a customColor hex value.');
  }
  const { tokens, resolved } = resolvedThemeTokens(theme, mode);
  const css = [
    tokenStylesheet(tokens, resolved),
    customThemeColorsCss(resolved, { custom: customColor, selector: "" }),
    filterEmailCss(componentsCss({ theme, prefix }), {
      client,
      allowComponents,
      denyComponents,
    }),
    extraCss,
  ].join("\n");

  return inlineHtml(activeColor ? markColorScope(html, activeColor) : html, css, {
    resolveCSSVariables: true,
    preserveFallbacks,
  });
}
