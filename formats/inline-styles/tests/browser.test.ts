// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { inlineHtmlInBrowser } from "../src/browser.ts";

beforeEach(() => {
  Object.defineProperty(CSSStyleDeclaration.prototype, Symbol.iterator, {
    configurable: true,
    value: function* (this: CSSStyleDeclaration) {
      for (let index = 0; index < this.length; index++) yield this.item(index);
    },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  Reflect.deleteProperty(CSSStyleDeclaration.prototype, Symbol.iterator);
  document.body.innerHTML = "";
});

function style(values: Record<string, string>): CSSStyleDeclaration {
  const declaration = document.createElement("div").style;
  for (const [property, value] of Object.entries(values)) declaration.setProperty(property, value);
  return declaration;
}

function mockFrame(
  computed: (element: Element, pseudo?: string) => CSSStyleDeclaration = () =>
    style({ color: "rgb(12, 34, 56)" }),
  options: { load?: boolean; mutate?: (loaded: Document) => void } = {},
) {
  const createElement = document.createElement.bind(document);
  const append = document.body.append.bind(document.body);
  let loaded: Document;
  const frame = createElement("iframe");
  const getComputedStyle = vi.fn(computed);
  Object.defineProperties(frame, {
    srcdoc: {
      set(html: string) {
        loaded = new DOMParser().parseFromString(html, "text/html");
        options.mutate?.(loaded);
      },
    },
    contentDocument: { get: () => loaded },
    contentWindow: { get: () => ({ getComputedStyle }) },
  });
  vi.spyOn(document, "createElement").mockImplementation((name, elementOptions) =>
    name === "iframe" ? frame : createElement(name, elementOptions),
  );
  vi.spyOn(document.body, "append").mockImplementation((...nodes) => {
    append(...nodes);
    if (options.load !== false) frame.dispatchEvent(new Event("load"));
  });
  return {
    frame,
    get loaded() {
      return loaded;
    },
  };
}

test("resolves browser styles, sanitizes author scripts, and removes the rendering frame", async () => {
  const snapshot = mockFrame((_element, pseudo) =>
    style(pseudo ? { content: "none" } : { color: "rgb(12, 34, 56)", width: "8px" }),
  );
  const result = await inlineHtmlInBrowser(
    '<p onclick="attack()" data-mce-style="color:red">Text<script>attack()</script></p>',
    "p { --gap: 8px; width: var(--gap); color: red; }",
    { rootAttributes: { "data-theme": "canvas" }, viewportWidth: 640 },
  );
  const output = new DOMParser().parseFromString(result, "text/html");
  const paragraph = output.querySelector("p")!;
  expect(paragraph.style.color).toBe("rgb(12, 34, 56)");
  expect(paragraph.style.width).toBe("8px");
  expect(paragraph.style.colorScheme).toBe("light");
  expect(result).not.toMatch(/<script|<style|onclick|data-mce-style|--gap|var\(/);
  expect(snapshot.loaded.querySelector("script, [onclick]")).toBeNull();
  expect(snapshot.loaded.documentElement.getAttribute("data-theme")).toBe("canvas");
  expect(snapshot.loaded.documentElement.style.colorScheme).toBe("light");
  expect(snapshot.frame.getAttribute("sandbox")).toBe("allow-same-origin");
  expect(snapshot.frame.getAttribute("aria-hidden")).toBe("true");
  expect(snapshot.frame.style.width).toBe("640px");
  expect(snapshot.frame.isConnected).toBe(false);
});

test("materializes before and after text, including malformed quoted content", async () => {
  mockFrame((_element, pseudo) =>
    style(
      pseudo
        ? {
            content: pseudo === "::before" ? '"Before "' : String.raw`"after\q"`,
            display: "inline-block",
            "mask-image": "none",
            "background-image": "none",
          }
        : { color: "red" },
    ),
  );
  const result = await inlineHtmlInBrowser("<p>Text</p><style>p { color: red; }</style>", "");
  const paragraph = new DOMParser().parseFromString(result, "text/html").querySelector("p")!;
  expect(paragraph.textContent).toBe(String.raw`Before Textafter\q`);
  expect(paragraph.firstElementChild?.getAttribute("data-pantoken-inline-generated")).toBe(
    "::before",
  );
  expect(paragraph.lastElementChild?.getAttribute("data-pantoken-inline-generated")).toBe(
    "::after",
  );
  expect(paragraph.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  expect(paragraph.firstElementChild?.getAttribute("contenteditable")).toBe("false");
  expect(result).not.toContain("<style");
});

test.each([
  { content: "", display: "inline" },
  { content: "none", display: "inline" },
  { content: "normal", display: "inline" },
  { content: '"hidden"', display: "none" },
])("omits invisible pseudo visuals: %j", async (visual) => {
  mockFrame((_element, pseudo) => style(pseudo ? visual : {}));
  expect(await inlineHtmlInBrowser("<p>Text</p>", "")).not.toContain(
    "data-pantoken-inline-generated",
  );
});

test.each(["none", "url()", "url(var(--glyph))", 'url("https://example.com/icon.svg")'])(
  "keeps a non-image visual without rasterizing %s",
  async (background) => {
    mockFrame((_element, pseudo) =>
      style(
        pseudo === "::before"
          ? { content: '""', "mask-image": "none", "background-image": background }
          : {},
      ),
    );
    const result = await inlineHtmlInBrowser("<p>Text</p>", "");
    const generated = new DOMParser().parseFromString(result, "text/html").querySelector("span")!;
    expect(generated.textContent).toBe("\u200B");
    expect(result).not.toContain("<img");
  },
);

function mockCanvas() {
  const decode = vi.fn().mockResolvedValue(undefined);
  const images: { src: string }[] = [];
  vi.stubGlobal(
    "Image",
    class {
      src = "";
      naturalWidth = 20;
      naturalHeight = 10;
      decode = decode;
      constructor() {
        images.push(this);
      }
    },
  );
  const context = {
    drawImage: vi.fn(),
    fillRect: vi.fn(),
    globalCompositeOperation: "source-over",
    fillStyle: "",
  };
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(context as unknown as CanvasRenderingContext2D);
  const toDataURL = vi
    .spyOn(HTMLCanvasElement.prototype, "toDataURL")
    .mockReturnValue("data:image/png;base64,cGl4ZWxz");
  return { context, getContext, toDataURL, decode, images };
}

test.each([
  { mask: true, size: "contain", width: "16px", height: "16px", expected: [0, 8, 32, 16] },
  { mask: false, size: "cover", width: "16px", height: "16px", expected: [-16, 0, 64, 32] },
  { mask: true, size: "8px 4px", width: "16px", height: "16px", expected: [8, 12, 16, 8] },
  { mask: false, size: "contain", width: "4096px", height: "2048px", expected: [0, 0, 2048, 1024] },
])(
  "rasterizes a glyph using $size (mask=$mask, width=$width)",
  async ({ mask, size, width, height, expected }) => {
    const canvas = mockCanvas();
    const snapshot = mockFrame((_element, pseudo) =>
      style(
        pseudo === "::before"
          ? {
              content: '""',
              width,
              height,
              "mask-image": mask ? 'url("data:image/svg+xml;utf8,%3Csvg/%3E")' : "none",
              "background-image": mask ? "none" : "url(data:image/png;base64,cGl4ZWxz)",
              "mask-size": size,
              "background-size": size,
              "background-color": "rgb(12, 34, 56)",
            }
          : {},
      ),
    );
    const result = await inlineHtmlInBrowser("<p>Text</p>", "");
    const image = new DOMParser().parseFromString(result, "text/html").querySelector("img")!;
    expect(image.src).toBe("data:image/png;base64,cGl4ZWxz");
    expect(image.alt).toBe("");
    expect(image.style.width).toBe(width);
    expect(image.style.height).toBe(height);
    expect(image.style.backgroundColor).toBe("transparent");
    expect(image.style.maskImage).toBe("");
    expect(image.style.backgroundImage).toBe("");
    expect(canvas.context.drawImage).toHaveBeenCalledWith(expect.anything(), ...expected);
    expect(canvas.toDataURL).toHaveBeenCalledWith("image/png");
    expect(canvas.context.fillRect).toHaveBeenCalledTimes(mask ? 1 : 0);
    if (mask) {
      expect(canvas.images[0]?.src).toContain(";charset=utf-8,");
      expect(canvas.context.globalCompositeOperation).toBe("source-in");
      expect(canvas.context.fillStyle).toBe("rgb(12, 34, 56)");
    }
    expect(snapshot.frame.isConnected).toBe(false);
  },
);

test.each([0, 24])(
  "uses the element bounds or a 16px fallback for unsized glyphs (%s)",
  async (bounds) => {
    mockCanvas();
    mockFrame(
      (_element, pseudo) =>
        style(
          pseudo === "::before"
            ? {
                content: '""',
                "mask-image": "none",
                "background-image": "url(data:image/png;base64,cGl4ZWxz)",
              }
            : {},
        ),
      {
        mutate: (loaded) => {
          vi.spyOn(loaded.querySelector("p")!, "getBoundingClientRect").mockReturnValue({
            width: bounds,
            height: bounds,
          } as DOMRect);
        },
      },
    );
    const result = await inlineHtmlInBrowser("<p>Text</p>", "");
    const image = new DOMParser().parseFromString(result, "text/html").querySelector("img")!;
    expect(image.style.width).toBe(`${bounds || 16}px`);
    expect(image.style.height).toBe(`${bounds || 16}px`);
  },
);

test.each(["canvas", "decode"])("cleans up the frame when glyph %s fails", async (failure) => {
  const canvas = mockCanvas();
  if (failure === "canvas") canvas.getContext.mockReturnValue(null);
  else canvas.decode.mockRejectedValue(new Error("Image decode failed"));
  const snapshot = mockFrame((_element, pseudo) =>
    style(
      pseudo === "::before"
        ? {
            content: '""',
            "mask-image": "none",
            "background-image": "url(data:image/png;base64,cGl4ZWxz)",
          }
        : {},
    ),
  );
  await expect(inlineHtmlInBrowser("<p>Text</p>", "")).rejects.toThrow(
    failure === "canvas" ? "Inline glyph rendering requires canvas support" : "Image decode failed",
  );
  expect(snapshot.frame.isConnected).toBe(false);
});

test("rejects document structure changes and cleans up the frame", async () => {
  const snapshot = mockFrame(undefined, {
    mutate: (loaded) => loaded.body.append(loaded.createElement("p")),
  });
  await expect(inlineHtmlInBrowser("<p>Text</p>", "")).rejects.toThrow(
    "Inline rendering changed the document structure",
  );
  expect(snapshot.frame.style.width).toBe("1024px");
  expect(snapshot.frame.isConnected).toBe(false);
});

test("rejects unresolved values rather than exporting variable-dependent styles", async () => {
  const snapshot = mockFrame(() => style({ color: "var(--missing)" }));
  await expect(inlineHtmlInBrowser("<p>Text</p>", "p { color: var(--missing); }")).rejects.toThrow(
    "Unable to resolve inline color",
  );
  expect(snapshot.frame.isConnected).toBe(false);
});

test("times out and removes an iframe that never loads", async () => {
  vi.useFakeTimers();
  const snapshot = mockFrame(undefined, { load: false });
  vi.spyOn(snapshot.frame, "addEventListener").mockImplementation(() => {});
  const result = expect(inlineHtmlInBrowser("<p>Text</p>", "")).rejects.toThrow(
    "Inline rendering timed out",
  );
  await vi.advanceTimersByTimeAsync(15000);
  await result;
  expect(snapshot.frame.isConnected).toBe(false);
});
