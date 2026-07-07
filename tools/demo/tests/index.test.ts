import { expect, test } from "vite-plus/test";
import type MarkdownIt from "markdown-it";
import { demoMarkdownIt, renderDemoFigure, resolveDemo } from "../src/index.ts";

test("bare URLs and paths resolve as the url provider", () => {
  expect(resolveDemo("https://example.com/x")).toMatchObject({
    provider: "url",
    src: "https://example.com/x",
  });
  expect(resolveDemo("/pantoken/guide/components").provider).toBe("url");
});

test("self resolves to the runner with encoded src and css", () => {
  const r = resolveDemo("self:button", {
    base: "/pantoken/",
    cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
  });
  expect(r.provider).toBe("self");
  expect(r.src.startsWith("/pantoken/play/index.html?src=")).toBe(true);
  expect(r.src).toContain(encodeURIComponent("/pantoken/demos/button.html"));
  expect(r.src).toContain("css=");
});

test("hosted providers build their embed URLs", () => {
  expect(resolveDemo("stackblitz:abc").src).toBe(
    "https://stackblitz.com/edit/abc?embed=1&view=preview&hideNavigation=1",
  );
  expect(resolveDemo("stackblitz:github/org/repo").src).toContain("stackblitz.com/github/org/repo");
  expect(resolveDemo("codesandbox:xy12z").src).toBe(
    "https://codesandbox.io/embed/xy12z?view=preview",
  );
  expect(resolveDemo("codepen:team/abc").src).toBe(
    "https://codepen.io/team/embed/abc?default-tab=result",
  );
  expect(resolveDemo("dartpad:gist123").src).toBe(
    "https://dartpad.dev/embed-flutter.html?id=gist123",
  );
  expect(resolveDemo("wp-playground:https://x/b.json").src).toContain(
    `blueprint-url=${encodeURIComponent("https://x/b.json")}`,
  );
});

test("an unknown provider falls back to a raw url", () => {
  expect(resolveDemo("mystery:thing").provider).toBe("url");
});

test("renderDemoFigure emits a sandboxed iframe and escapes the src", () => {
  const html = renderDemoFigure(resolveDemo("https://example.com/a?b=1&c=2"));
  expect(html).toContain('<iframe class="pantoken-demo__frame"');
  expect(html).toContain('sandbox="allow-scripts');
  expect(html).toContain("allowfullscreen");
  expect(html).toContain("&amp;c=2");
});

test("renderDemoFigure adds icon actions with tooltips (scheme + fullscreen + open in new tab)", () => {
  const html = renderDemoFigure(resolveDemo("https://example.com/a"));
  expect(html).toContain('data-role="scheme"');
  expect(html).toContain('data-tooltip="Toggle light/dark"');
  expect(html).toContain('data-role="fullscreen"');
  expect(html).toContain('data-tooltip="Full screen"');
  expect(html).toContain('data-tooltip="Open in a new tab"');
  expect(html).toContain('target="_blank"');
  expect(html).not.toContain("pantoken-demo__label"); // the "Live demo" caption is gone
});

test("renderDemoFigure tags hosted providers with a brand mark, but not self", () => {
  const stackblitz = renderDemoFigure(resolveDemo("stackblitz:abc"));
  expect(stackblitz).toContain('class="pantoken-demo__provider"');
  expect(stackblitz).toContain("StackBlitz");
  expect(stackblitz).toContain('fill="#1269D3"'); // the Simple Icons brand colour

  // A self-hosted demo needs no provider tag.
  const self = renderDemoFigure(resolveDemo("self:button", { base: "/" }));
  expect(self).not.toContain("pantoken-demo__provider");
});

test("demoMarkdownIt rewrites a demo fence and leaves other fences alone", () => {
  const calls: string[] = [];
  const md = {
    renderer: {
      rules: {
        fence: (tokens: { info: string; content: string }[], i: number, ..._rest: unknown[]) => {
          calls.push(tokens[i].info);
          return `<pre>${tokens[i].content}</pre>`;
        },
      },
    },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, { base: "/pantoken/" });

  const render = md.renderer.rules.fence;
  const demoOut = render([{ info: "demo", content: "self:button" }], 0, {}, {}, {});
  expect(demoOut).toContain("pantoken-demo__frame");

  const tsOut = render([{ info: "ts", content: "const x = 1;" }], 0, {}, {}, {});
  expect(tsOut).toBe("<pre>const x = 1;</pre>");
});
