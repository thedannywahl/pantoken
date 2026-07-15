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
  expect(html).toContain("&amp;c=2");
});

test("renderDemoFigure is chrome-free — just the framed iframe, no host toolbar", () => {
  const html = renderDemoFigure(resolveDemo("https://example.com/a"));
  // Modeled on the live @example: no bar, no provider tag, no action buttons (the runner inside
  // carries its own tab toolbar).
  expect(html).not.toContain("pantoken-demo__bar");
  expect(html).not.toContain("data-role=");
  expect(html).not.toContain("pantoken-demo__provider");
  expect(html).toBe(
    `<figure class="pantoken-demo"><iframe class="pantoken-demo__frame" src="https://example.com/a" title="Live demo" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"></iframe></figure>\n`,
  );
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

test("liveExample seams a preview onto html fences on matching pages, skipping overlays", () => {
  const md = {
    renderer: {
      rules: {
        fence: (tokens: { info: string; content: string }[], i: number, ..._rest: unknown[]) =>
          `<pre>${tokens[i].content}</pre>`,
      },
    },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    base: "/pantoken/",
    liveExample: {
      match: (relativePath) => /(^|\/)api\/css\//.test(relativePath),
      wrap: (html) =>
        `<div class="css-example">\n<div class="instui-card">\n${html}\n</div>\n</div>`,
    },
  });
  const render = md.renderer.rules.fence;

  // A matching CSS-API page: the source fence stays, with the live preview seamed on below it.
  const onPage = render(
    [{ info: "html", content: "<button>Hi</button>" }],
    0,
    {},
    { relativePath: "api/css/button.md" },
    {},
  );
  expect(onPage).toContain("<pre><button>Hi</button></pre>");
  expect(onPage).toContain('<div class="css-example">');
  expect(onPage).toContain('<div class="instui-card">');

  // A cloned locale page (hu/api/css/…) matches too.
  const onLocale = render(
    [{ info: "html", content: "<button>Hi</button>" }],
    0,
    {},
    { relativePath: "hu/api/css/button.md" },
    {},
  );
  expect(onLocale).toContain('<div class="css-example">');

  // A page outside api/css/ (e.g. a guide, or the web-components CSS pages) is left source-only.
  const offPage = render(
    [{ info: "html", content: "<button>Hi</button>" }],
    0,
    {},
    { relativePath: "api/css-web-components/drawer.md" },
    {},
  );
  expect(offPage).toBe("<pre><button>Hi</button></pre>");

  // Overlay examples (dialog/popover) are hidden until opened, so they get no in-page preview.
  const overlay = render(
    [{ info: "html", content: "<dialog open>Hi</dialog>" }],
    0,
    {},
    { relativePath: "api/css/modal.md" },
    {},
  );
  expect(overlay).toBe("<pre><dialog open>Hi</dialog></pre>");
});
