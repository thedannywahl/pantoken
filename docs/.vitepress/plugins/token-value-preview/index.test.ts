import MarkdownIt from "markdown-it";
import { describe, expect, test } from "vite-plus/test";
import { scopeSvgIds, tokenValuePreview } from "./index.js";

function renderInlineCode(content: string): string {
  const md = new MarkdownIt();
  tokenValuePreview(md);
  return md.renderInline(`\`${content}\``);
}

describe("tokenValuePreview", () => {
  test("renders no preview for non-previewable code values", () => {
    const html = renderInlineCode("box-shadow: 0 0 1px #000");
    expect(html).toBe("<code>box-shadow: 0 0 1px #000</code>");
  });

  test("renders a color swatch preview for whole-value colors", () => {
    const html = renderInlineCode("#e62429");
    expect(html).toContain('<span class="pantoken-swatch">');
    expect(html).toContain('style="background-color:#e62429"');
  });

  test("renders light-dark previews with both labeled swatches", () => {
    const html = renderInlineCode("light-dark(#ffffff, rgba(0,0,0,.9))");
    expect(html).toContain('<span class="pantoken-swatch__label">Light</span>');
    expect(html).toContain('<span class="pantoken-swatch__label">Dark</span>');
  });

  test("inlines decoded SVG previews from data:image URIs", () => {
    const svg = encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1"/></svg>',
    );
    const html = renderInlineCode(`data:image/svg+xml;utf8,${svg}`);
    expect(html).toContain('class="pantoken-token-preview"');
    expect(html).toContain("<svg");
    expect(html).not.toContain("<img");
  });

  test("sanitizes script and inline handler attributes from inline SVG", () => {
    const svg = encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><script>alert(1)</script><rect width="1" height="1"/></svg>',
    );
    const html = renderInlineCode(`data:image/svg+xml;utf8,${svg}`);
    expect(html).toContain("<svg");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onload=");
  });

  test("scopes ids so two inlined SVGs sharing an id don't collide", () => {
    // Real token URIs percent-encode parentheses; a bare ")" ends the URI inside `url(...)`.
    const encode = (svg: string): string =>
      encodeURIComponent(svg).replace(/\(/g, "%28").replace(/\)/g, "%29");
    const svgA = encode(
      '<svg xmlns="http://www.w3.org/2000/svg"><linearGradient id="a"/><g fill="url(#a)"/></svg>',
    );
    const svgB = encode(
      '<svg xmlns="http://www.w3.org/2000/svg"><radialGradient id="a"/><use href="#a"/><g fill="url(#a)"/></svg>',
    );
    const idA = /id="([^"]+)"/.exec(renderInlineCode(`data:image/svg+xml;utf8,${svgA}`))?.[1];
    const htmlB = renderInlineCode(`data:image/svg+xml;utf8,${svgB}`);
    const idB = /id="([^"]+)"/.exec(htmlB)?.[1];
    expect(idA).toMatch(/-a$/);
    expect(idB).toMatch(/-a$/);
    expect(idA).not.toBe(idB);
    expect(htmlB).toContain(`href="#${idB}"`);
    expect(htmlB).toContain(`url(#${idB})`);
  });
});

describe("scopeSvgIds", () => {
  test("leaves an SVG with no ids unchanged", () => {
    const svg = '<svg><a href="#top"><path fill="url(#x)"/></a></svg>';
    expect(scopeSvgIds(svg, "p")).toBe(svg);
  });

  test("only rewrites references to ids the SVG defines", () => {
    expect(scopeSvgIds('<svg><g id="a"/><use xlink:href="#b"/></svg>', "p")).toBe(
      '<svg><g id="p-a"/><use xlink:href="#b"/></svg>',
    );
  });
});
