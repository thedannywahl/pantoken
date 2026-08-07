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
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (name: string, fn: (state: { tokens: unknown[] }) => void) =>
          coreRules.push([name, fn]),
      },
    },
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

test("live_example_flags core rule strips -flags from heading and migrates them to fence info", () => {
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (name: string, fn: (state: { tokens: unknown[] }) => void) =>
          coreRules.push([name, fn]),
      },
    },
    renderer: { rules: { fence: () => "" } },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: {
      match: () => true,
      wrap: (html, flags) => `<div class="${[...flags].join(" ")}">${html}</div>`,
    },
  });
  expect(coreRules).toHaveLength(1);
  const [, rule] = coreRules[0];

  const headingInline = {
    type: "inline",
    content: "My example -nocard",
    children: [{ type: "text", content: "My example -nocard" }],
  };
  const fence = { type: "fence", info: "html", content: "<div/>" };
  const tokens = [{ type: "heading_open" }, headingInline, { type: "heading_close" }, fence];

  rule({ tokens });

  expect(headingInline.content).toBe("My example");
  expect(headingInline.children[0].content).toBe("My example");
  expect(fence.info).toBe("html -nocard");
});

test("live_example_flags keeps heading text singular when markdown-it splits text nodes", () => {
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (_: string, fn: (state: { tokens: unknown[] }) => void) => coreRules.push(["", fn]),
      },
    },
    renderer: { rules: { fence: () => "" } },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: { match: () => true, wrap: (html, flags) => `${[...flags].join(" ")}${html}` },
  });
  const [, rule] = coreRules[0];

  const headingInline = {
    type: "inline",
    content: "Inverse color -nocard",
    children: [
      { type: "text", content: "Inverse color" },
      { type: "text", content: " -nocard" },
    ],
  };
  const fence = { type: "fence", info: "html", content: "<div/>" };
  const tokens = [{ type: "heading_open" }, headingInline, { type: "heading_close" }, fence];

  rule({ tokens });

  expect(fence.info).toBe("html -nocard");
  expect(headingInline.content).toBe("Inverse color");
  expect(headingInline.children).toEqual([{ type: "text", content: "Inverse color" }]);
});

test("live_example_flags strips a heading that is entirely flags", () => {
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (_: string, fn: (state: { tokens: unknown[] }) => void) => coreRules.push(["", fn]),
      },
    },
    renderer: { rules: { fence: () => "" } },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: { match: () => true, wrap: (html, flags) => `${[...flags].join(" ")}${html}` },
  });
  const [, rule] = coreRules[0];

  const headingInline = {
    type: "inline",
    content: "-nocard",
    children: [{ type: "text", content: "-nocard" }],
  };
  const fence = { type: "fence", info: "html", content: "<div/>" };
  rule({ tokens: [{ type: "heading_open" }, headingInline, { type: "heading_close" }, fence] });

  expect(headingInline.content).toBe("");
  expect(headingInline.children).toHaveLength(0);
  expect(fence.info).toBe("html -nocard");
});

test("live_example_flags migrates standalone flag paragraph before html fence", () => {
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (_: string, fn: (state: { tokens: unknown[] }) => void) => coreRules.push(["", fn]),
      },
    },
    renderer: { rules: { fence: () => "" } },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: { match: () => true, wrap: (html, flags) => `${[...flags].join(" ")}${html}` },
  });
  const [, rule] = coreRules[0];

  const paragraphOpen = { type: "paragraph_open", hidden: false };
  const inline = {
    type: "inline",
    content: "-nocard -plain",
    hidden: false,
    children: [{ type: "text", content: "-nocard -plain" }],
  };
  const paragraphClose = { type: "paragraph_close", hidden: false };
  const fence = { type: "fence", info: "html", content: "<div/>" };

  rule({ tokens: [paragraphOpen, inline, paragraphClose, fence] });

  expect(fence.info).toBe("html -nocard -plain");
  expect(paragraphOpen.hidden).toBe(true);
  expect(inline.hidden).toBe(true);
  expect(inline.content).toBe("");
  expect(inline.children).toHaveLength(0);
  expect(paragraphClose.hidden).toBe(true);
});

test("live_example_flags promotes caption paragraph to h3 and strips trailing flags", () => {
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (_: string, fn: (state: { tokens: unknown[] }) => void) => coreRules.push(["", fn]),
      },
    },
    renderer: { rules: { fence: () => "" } },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: { match: () => true, wrap: (html, flags) => `${[...flags].join(" ")}${html}` },
  });
  const [, rule] = coreRules[0];

  const paragraphOpen: {
    type: string;
    hidden?: boolean;
    tag?: string;
    markup?: string;
    level?: number;
    nesting?: number;
  } = {
    type: "paragraph_open",
  };
  const inline = {
    type: "inline",
    content: "Content card -nocard",
    children: [{ type: "text", content: "Content card -nocard" }],
  };
  const paragraphClose: {
    type: string;
    hidden?: boolean;
    tag?: string;
    markup?: string;
    level?: number;
    nesting?: number;
  } = {
    type: "paragraph_close",
  };
  const fence = { type: "fence", info: "html", content: "<div/>" };

  rule({ tokens: [paragraphOpen, inline, paragraphClose, fence] });

  expect(fence.info).toBe("html -nocard");
  expect(inline.content).toBe("Content card");
  expect(inline.children[0].content).toBe("Content card");
  expect(paragraphOpen.hidden).not.toBe(true);
  expect(paragraphClose.hidden).not.toBe(true);
  expect(paragraphOpen.type).toBe("heading_open");
  expect(paragraphOpen.tag).toBe("h3");
  expect(paragraphClose.type).toBe("heading_close");
  expect(paragraphClose.tag).toBe("h3");
});

test("live_example_flags migrates inline-only marker token and hides it when empty", () => {
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (_: string, fn: (state: { tokens: unknown[] }) => void) => coreRules.push(["", fn]),
      },
    },
    renderer: { rules: { fence: () => "" } },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: { match: () => true, wrap: (html, flags) => `${[...flags].join(" ")}${html}` },
  });
  const [, rule] = coreRules[0];

  const inline = {
    type: "inline",
    content: "-nocard",
    hidden: false,
    children: [{ type: "text", content: "-nocard" }],
  };
  const fence = { type: "fence", info: "html", content: "<div/>" };

  rule({ tokens: [inline, fence] });

  expect(fence.info).toBe("html -nocard");
  expect(inline.hidden).toBe(true);
  expect(inline.content).toBe("");
  expect(inline.children).toHaveLength(0);
});

test("-noshow on heading caption hides title tokens and marks fence", () => {
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (_: string, fn: (state: { tokens: unknown[] }) => void) => coreRules.push(["", fn]),
      },
    },
    renderer: { rules: { fence: () => "" } },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: { match: () => true, wrap: (html, flags) => `${[...flags].join(" ")}${html}` },
  });
  const [, rule] = coreRules[0];

  const headingOpen = { type: "heading_open", hidden: false };
  const headingInline = {
    type: "inline",
    content: "how to hide -noshow",
    hidden: false,
    children: [{ type: "text", content: "how to hide -noshow" }],
  };
  const headingClose = { type: "heading_close", hidden: false };
  const fence = { type: "fence", info: "html", content: "<div/>" };

  rule({ tokens: [headingOpen, headingInline, headingClose, fence] });

  expect(fence.info).toBe("html -noshow");
  expect(headingOpen.hidden).toBe(true);
  expect(headingInline.hidden).toBe(true);
  expect(headingClose.hidden).toBe(true);
});

test("-noshow on paragraph caption hides title paragraph and marks fence", () => {
  const coreRules: Array<[string, (state: { tokens: unknown[] }) => void]> = [];
  const md = {
    core: {
      ruler: {
        push: (_: string, fn: (state: { tokens: unknown[] }) => void) => coreRules.push(["", fn]),
      },
    },
    renderer: { rules: { fence: () => "" } },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: { match: () => true, wrap: (html, flags) => `${[...flags].join(" ")}${html}` },
  });
  const [, rule] = coreRules[0];

  const paragraphOpen = { type: "paragraph_open", hidden: false };
  const inline = {
    type: "inline",
    content: "display this -noshow",
    hidden: false,
    children: [{ type: "text", content: "display this -noshow" }],
  };
  const paragraphClose = { type: "paragraph_close", hidden: false };
  const fence = { type: "fence", info: "html", content: "<div/>" };

  rule({ tokens: [paragraphOpen, inline, paragraphClose, fence] });

  expect(fence.info).toBe("html -noshow");
  expect(paragraphOpen.hidden).toBe(true);
  expect(inline.hidden).toBe(true);
  expect(paragraphClose.hidden).toBe(true);
});

test("renderer omits html fences tagged with -noshow", () => {
  const md = {
    core: {
      ruler: {
        push: () => {
          // no-op for this renderer-focused test
        },
      },
    },
    renderer: {
      rules: {
        fence: (tokens: { info: string; content: string }[], i: number, ..._rest: unknown[]) =>
          `<pre>${tokens[i].content}</pre>`,
      },
    },
  };
  demoMarkdownIt(md as unknown as MarkdownIt, {
    liveExample: {
      match: () => true,
      wrap: (html) => `<div class="css-example">${html}</div>`,
    },
  });
  const render = md.renderer.rules.fence;

  const hidden = render(
    [{ info: "html -noshow", content: "<div>shh...</div>" }],
    0,
    {},
    { relativePath: "api/css/example.md" },
    {},
  );
  expect(hidden).toBe("");

  const shown = render(
    [{ info: "html -nocard", content: "<div>foo</div>" }],
    0,
    {},
    { relativePath: "api/css/example.md" },
    {},
  );
  expect(shown).toContain("<pre><div>foo</div></pre>");
});
