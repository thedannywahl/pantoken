import MarkdownIt from "markdown-it";
import { describe, expect, test } from "vite-plus/test";
import { tokenValuePreview } from "./index.js";

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
});
