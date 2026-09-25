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
  expect(doc).toContain("d.dataset.pantokenTheme=e.data.theme");
  expect(doc).toContain("d.dataset.pantokenColor=e.data.color");
  expect(doc).toContain('type:"pantoken-demo-size"');
  expect(doc).toContain("ResizeObserver");
});

test("buildExampleSrcdoc's boot script applies a posted custom scale only when every value is a hex", () => {
  const doc = buildExampleSrcdoc("<p>Hi</p>", { cssUrls: [] });
  const script = doc.match(/<script>([\s\S]*?)<\/script>/u)![1]!;
  const props = new Map<string, string>();
  const root = {
    dataset: {} as Record<string, string>,
    style: { setProperty: (k: string, v: string) => props.set(k, v) },
  };
  let onMessage: (e: { data: unknown }) => void = () => {};
  // oxlint-disable-next-line typescript/no-implied-eval -- runs the repo's own boot script, not input
  const run = new Function("window", "document", "addEventListener", script);
  run(
    { parent: { postMessage() {} } },
    { documentElement: root, body: { getBoundingClientRect: () => ({ height: 0 }) } },
    (type: string, fn: typeof onMessage) => {
      if (type === "message") onMessage = fn;
    },
  );
  const scale = Array.from(
    { length: 20 },
    (_, i) => `#0000${(i + 10).toString(16).padStart(2, "0")}`,
  );

  onMessage({
    data: {
      type: "pantoken-demo-color",
      color: "custom",
      customScale: [...scale.slice(1), "red;}"],
    },
  });
  expect(props.size).toBe(0);

  onMessage({ data: { type: "pantoken-demo-color", color: "custom", customScale: scale } });
  expect(root.dataset.pantokenColor).toBe("custom");
  expect(props.get("--instui-primitive-color-custom-custom10")).toBe(scale[0]);
  expect(props.get("--instui-primitive-color-custom-custom200")).toBe(scale[19]);
});

test("buildExampleSrcdoc's boot script pins color-scheme, not just the scheme attribute", () => {
  const doc = buildExampleSrcdoc("<p>Hi</p>", { cssUrls: [] });
  // `color-scheme` is what resolves `light-dark()`; the attribute alone only picks the forcing block.
  expect(doc).toContain("d.dataset.pantokenScheme=m");
  expect(doc).toContain("d.style.colorScheme=m");
  expect(doc).toContain("d.dataset.pantokenInstance=e.data.instanceId");
});

test('escapeSrcdoc escapes & and " but leaves other characters alone', () => {
  expect(escapeSrcdoc('<p class="x">A & B</p>')).toBe("<p class=&quot;x&quot;>A &amp; B</p>");
});
