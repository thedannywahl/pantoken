// Benchmarks for the per-page work the docs build repeats across every locale. A full deploy builds
// 45 locales, so these functions run tens of thousands of times each: `segmentMarkdown`/`reassemble`
// once per API page per locale, `keyFor` once per translatable unit. The multi-hour build itself is
// too slow and too noisy to measure on a shared runner, so guard the hot paths instead — an
// algorithmic regression here is what turns a long build into an intractable one.
import { test, describe } from "vite-plus/test";
import {
  collectUnits,
  reassemble,
  segmentMarkdown,
  type Resolve,
} from "../docs/scripts/segment-markdown.ts";
import { alignTrailingNewline, keyFor } from "../docs/scripts/translation-memory.ts";
import { inferSyntax, resolveSyntax, syntaxFromChain } from "../docs/scripts/build-css-api.ts";
import { mergeSitemapUrls, renderSitemap } from "../docs/scripts/build-locales.ts";

/** A cssdoc component page, mirroring `docs/api/css/button.md`. */
const CSSDOC_PAGE = [
  "# CSS: button",
  "",
  "`.instui-button` — An accessible action control, styled from the token palette.",
  "",
  "**Source:** [button.ts](https://example.com/button.ts)",
  "",
  "## Accessibility",
  "",
  "Drive the `-toggle` variant's pressed state with `aria-pressed`.",
  "",
  "## Usage",
  "",
  "```css",
  '@import "@pantoken/components/button.css";',
  "```",
  "",
  "## Modifiers",
  "",
  "| Modifier | Description |",
  "| --- | --- |",
  "| `.-color-ai` | An AI action. |",
  "| `.-color-danger` | A destructive action. |",
  "| `.-size-lg` | — |",
  "",
  "## Tokens consumed",
  "",
  "| Token | Type | Value |",
  "| --- | --- | --- |",
  "| `--instui-font-family-base` | `[ <font-family-name> \\| <generic-font-family> ]#` | `Arial` |",
  "",
  "## Related",
  "",
  "- [close-button](/api/css/close-button.md) — The icon-only dismiss button.",
  "",
].join("\n");

/** A TypeDoc function page, mirroring `docs/api/bundlers/next/src/functions/withPantoken.md`. */
const TYPEDOC_PAGE = [
  "[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / withPantoken",
  "",
  "# Function: withPantoken()",
  "",
  "> **withPantoken**(`nextConfig?`, `options?`): [`NextConfigLike`](../interfaces/NextConfigLike.md)",
  "",
  '<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>',
  "",
  "Wrap a Next.js config so the Instructure UI packages are transpiled.",
  "",
  "## Parameters",
  "",
  "### nextConfig?",
  "",
  "[`NextConfigLike`](../interfaces/NextConfigLike.md) = `{}`",
  "",
  "The existing Next config (default `{}`).",
  "",
  "## Examples",
  "",
  "**Wrap your next.config.mjs**",
  "",
  "```js",
  'import { withPantoken } from "@pantoken/next";',
  "",
  "export default withPantoken({ reactStrictMode: true });",
  "```",
  "",
].join("\n");

const cssdocSegments = segmentMarkdown(CSSDOC_PAGE);
const typedocSegments = segmentMarkdown(TYPEDOC_PAGE);
const identityResolve: Resolve = (text) => text;

// Values spanning every branch of the syntax inference table, so the benchmark can't settle into one
// cheap path.
const TOKEN_VALUES = [
  "#0374b5",
  "1.5rem",
  "0.25s",
  "1.4",
  "Arial, sans-serif",
  'url("data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=")',
  "light-dark(#ffffff, #2d3b45)",
  "var(--instui-color-primary)",
];

// A sitemap the size of one locale's page count, duplicated across two documents so the merge does
// real deduplication work rather than a straight concatenation.
const sitemapOf = (locale: string, pages: number): string =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset>\n${Array.from(
    { length: pages },
    (_, index) => `<url><loc>https://pantoken.app/${locale}/api/page-${index}.html</loc></url>`,
  ).join("\n")}\n</urlset>\n`;

const sitemapDocuments = [sitemapOf("root", 900), sitemapOf("hu", 900), sitemapOf("root", 900)];

describe("segmentMarkdown", () => {
  test("cssdoc component page", async ({ bench }) => {
    await bench("segmentMarkdown: cssdoc page", () => {
      segmentMarkdown(CSSDOC_PAGE);
    }).run();
  });

  test("typedoc function page", async ({ bench }) => {
    await bench("segmentMarkdown: typedoc page", () => {
      segmentMarkdown(TYPEDOC_PAGE);
    }).run();
  });
});

describe("collectUnits", () => {
  test("cssdoc component page", async ({ bench }) => {
    await bench("collectUnits: cssdoc page", () => {
      collectUnits(cssdocSegments);
    }).run();
  });
});

describe("reassemble", () => {
  test("cssdoc component page", async ({ bench }) => {
    await bench("reassemble: cssdoc page", () => {
      reassemble(cssdocSegments, identityResolve);
    }).run();
  });

  test("typedoc function page", async ({ bench }) => {
    await bench("reassemble: typedoc page", () => {
      reassemble(typedocSegments, identityResolve);
    }).run();
  });
});

describe("translation memory", () => {
  test("keyFor (sha-256 cache key)", async ({ bench }) => {
    await bench("keyFor: prose unit", () => {
      keyFor("prose", "Wrap a Next.js config so the Instructure UI packages are transpiled.");
    }).run();
  });

  test("alignTrailingNewline", async ({ bench }) => {
    await bench("alignTrailingNewline: prose unit", () => {
      alignTrailingNewline("Source text.\n", "Translated text.");
    }).run();
  });
});

describe("css api syntax resolution", () => {
  test("inferSyntax (all value shapes)", async ({ bench }) => {
    await bench("inferSyntax: mixed values", () => {
      for (const value of TOKEN_VALUES) inferSyntax(value);
    }).run();
  });

  test("syntaxFromChain (miss on empty index)", async ({ bench }) => {
    await bench("syntaxFromChain: unresolved token", () => {
      syntaxFromChain("--instui-color-primary", new Map());
    }).run();
  });

  test("resolveSyntax (full fallback chain)", async ({ bench }) => {
    await bench("resolveSyntax: property-name fallback", () => {
      resolveSyntax("--instui-font-family-base", new Map(), new Map(), (value) => value);
    }).run();
  });
});

describe("sitemap merge", () => {
  test("three locale documents, 900 pages each", async ({ bench }) => {
    await bench("mergeSitemapUrls: 3 documents", () => {
      renderSitemap(mergeSitemapUrls(sitemapDocuments));
    }).run();
  });
});
