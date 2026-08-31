import { expect, test } from "vite-plus/test";
import { buildExampleSrcdoc, escapeSrcdoc } from "../src/srcdoc.ts";

test("buildExampleSrcdoc emits a link per cssUrls entry", () => {
  const doc = buildExampleSrcdoc("<button>Save</button>", {
    cssUrls: ["/demos-assets/base.css", "/demos-assets/components.css"],
  });
  expect(doc).toContain('<link rel="stylesheet" href="/demos-assets/base.css">');
  expect(doc).toContain('<link rel="stylesheet" href="/demos-assets/components.css">');
});

test("buildExampleSrcdoc defaults to dir=ltr, and honors an rtl override", () => {
  const ltr = buildExampleSrcdoc("<p>Hi</p>", { cssUrls: [] });
  expect(ltr).toContain('<html dir="ltr">');

  const rtl = buildExampleSrcdoc("<p>Hi</p>", { cssUrls: [], dir: "rtl" });
  expect(rtl).toContain('<html dir="rtl">');
});

test("buildExampleSrcdoc wraps in .instui-card by default, and omits it when card is false", () => {
  const withCard = buildExampleSrcdoc("<button>Save</button>", { cssUrls: [] });
  expect(withCard).toContain('<div class="instui-card"><button>Save</button></div>');

  const withoutCard = buildExampleSrcdoc("<button>Save</button>", { cssUrls: [], card: false });
  expect(withoutCard).not.toContain("instui-card");
  expect(withoutCard).toContain("<button>Save</button>");
});

test("buildExampleSrcdoc's body carries the pantoken-prose baseline", () => {
  const doc = buildExampleSrcdoc("<p>Hi</p>", { cssUrls: [] });
  expect(doc).toContain('<body class="pantoken-prose">');
});

test("buildExampleSrcdoc's boot script requests the theme, applies replies, and reports size", () => {
  const doc = buildExampleSrcdoc("<p>Hi</p>", { cssUrls: [] });
  expect(doc).toContain('type:"pantoken-demo-request-theme"');
  expect(doc).toContain('e.data.type==="pantoken-demo-theme"');
  expect(doc).toContain("document.documentElement.dataset.pantokenTheme=e.data.theme");
  expect(doc).toContain('type:"pantoken-demo-size"');
  expect(doc).toContain("ResizeObserver");
});

test('escapeSrcdoc escapes & and " but leaves other characters alone', () => {
  expect(escapeSrcdoc('<p class="x">A & B</p>')).toBe("<p class=&quot;x&quot;>A &amp; B</p>");
});
