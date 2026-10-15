/// <reference lib="dom" />
import { inlineHtml, type InlineHtmlOptions } from "./inline-html.ts";
import valueParser from "postcss-value-parser";

/** Context for a static, resolved browser snapshot. */
export interface BrowserInlineOptions extends InlineHtmlOptions {
  rootAttributes?: Record<string, string>;
  viewportWidth?: number;
}

const inheritedProperties = [
  "color",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "line-height",
  "text-align",
  "white-space",
  "color-scheme",
];
const pseudoProperties = [
  ...inheritedProperties,
  "display",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "width",
  "height",
  "min-width",
  "min-height",
  "max-width",
  "max-height",
  "box-sizing",
  "padding",
  "margin",
  "border",
  "border-radius",
  "background-color",
  "background-image",
  "background-position",
  "background-size",
  "background-repeat",
  "mask-image",
  "mask-position",
  "mask-size",
  "mask-repeat",
  "mask-mode",
  "-webkit-mask-image",
  "-webkit-mask-position",
  "-webkit-mask-size",
  "-webkit-mask-repeat",
  "transform",
  "transform-origin",
  "vertical-align",
  "opacity",
  "z-index",
  "flex",
  "aspect-ratio",
  "box-shadow",
  "overflow",
  "object-fit",
];

function copyProperties(
  target: HTMLElement,
  computed: CSSStyleDeclaration,
  properties: readonly string[],
): void {
  for (const property of properties) {
    const value = computed.getPropertyValue(property);
    if (value && !value.includes("var(")) target.style.setProperty(property, value);
  }
}

function imageUrl(value: string): string | undefined {
  const node = valueParser(value).nodes.find(
    (entry) => entry.type === "function" && entry.value === "url",
  );
  if (node?.type !== "function") return undefined;
  const argument = node.nodes[0];
  if (argument?.type !== "string" && argument?.type !== "word") return undefined;
  return argument.value.startsWith("data:image/")
    ? argument.value.replace(";utf8,", ";charset=utf-8,")
    : undefined;
}

async function rasterizeGlyph(
  source: string,
  width: number,
  height: number,
  size: string,
  tint?: string,
): Promise<string> {
  const image = new Image();
  image.src = source;
  await image.decode();
  const canvas = document.createElement("canvas");
  const scale = Math.min(2, 2048 / Math.max(width, height));
  canvas.width = Math.max(1, Math.ceil(width * scale));
  canvas.height = Math.max(1, Math.ceil(height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Inline glyph rendering requires canvas support");
  const sizes = valueParser(size)
    .nodes.filter((node) => node.type === "word")
    .map((node) => node.value);
  const explicitWidth = sizes[0]?.endsWith("px") ? Number.parseFloat(sizes[0]) * scale : undefined;
  const ratio = explicitWidth
    ? explicitWidth / image.naturalWidth
    : size === "cover"
      ? Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)
      : Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
  const imageWidth = image.naturalWidth * ratio;
  const imageHeight = image.naturalHeight * ratio;
  context.drawImage(
    image,
    (canvas.width - imageWidth) / 2,
    (canvas.height - imageHeight) / 2,
    imageWidth,
    imageHeight,
  );
  if (tint) {
    context.globalCompositeOperation = "source-in";
    context.fillStyle = tint;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  return canvas.toDataURL("image/png");
}

/** Resolve element styles and materialize static pseudo visuals without executing author scripts. */
export async function inlineHtmlInBrowser(
  html: string,
  css: string,
  options: BrowserInlineOptions = {},
): Promise<string> {
  const source = new DOMParser().parseFromString(html, "text/html");
  for (const [name, value] of Object.entries(options.rootAttributes ?? {}))
    source.documentElement.setAttribute(name, value);
  source.documentElement.style.colorScheme = "light";
  const resolved = inlineHtml(source.documentElement.outerHTML, css, {
    ...options,
    resolveCSSVariables: false,
    inlineCustomProperties: false,
    preserveFallbacks: false,
  });
  const output = new DOMParser().parseFromString(resolved, "text/html");
  const stylesheet = source.createElement("style");
  stylesheet.textContent = css;
  source.head.append(stylesheet);
  for (const doc of [source, output]) {
    for (const script of doc.querySelectorAll("script")) script.remove();
    for (const element of doc.querySelectorAll("*")) {
      for (const name of element.getAttributeNames())
        if (/^on/iu.test(name)) element.removeAttribute(name);
    }
  }
  const frame = document.createElement("iframe");
  frame.setAttribute("sandbox", "allow-same-origin");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = `position:fixed;left:-100000px;top:0;width:${options.viewportWidth ?? 1024}px;height:768px;visibility:hidden;pointer-events:none;border:0`;
  try {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Inline rendering timed out")), 15000);
      frame.addEventListener(
        "load",
        () => {
          clearTimeout(timer);
          resolve();
        },
        { once: true },
      );
      frame.srcdoc = `<!doctype html>${source.documentElement.outerHTML}`;
      document.body.append(frame);
    });
    const doc = frame.contentDocument!;
    const view = frame.contentWindow!;
    const elements = [...doc.body.querySelectorAll<HTMLElement>("*:not(style):not(script)")];
    const targets = [...output.body.querySelectorAll<HTMLElement>("*:not(style):not(script)")];
    for (const [index, element] of elements.entries()) {
      const target = targets[index];
      if (!target) throw new Error("Inline rendering changed the document structure");
      const computed = view.getComputedStyle(element);
      const properties = [...target.style].filter((property) => !property.startsWith("--"));
      copyProperties(target, computed, [...properties, ...inheritedProperties]);
      target.style.colorScheme = "light";
      for (const property of Array.from(target.style).filter((name) => name.startsWith("--")))
        target.style.removeProperty(property);
      target.removeAttribute("data-mce-style");
      for (const pseudo of ["::before", "::after"]) {
        const visual = view.getComputedStyle(element, pseudo);
        if (
          !visual.content ||
          visual.content === "none" ||
          visual.content === "normal" ||
          visual.display === "none"
        )
          continue;
        const mask = visual.maskImage || visual.getPropertyValue("-webkit-mask-image");
        const glyphUrl = imageUrl(mask !== "none" ? mask : visual.backgroundImage);
        const child = output.createElement(glyphUrl ? "img" : "span");
        child.setAttribute("data-pantoken-inline-generated", pseudo);
        child.setAttribute("aria-hidden", "true");
        child.setAttribute("contenteditable", "false");
        copyProperties(child, visual, pseudoProperties);
        if (glyphUrl && child instanceof HTMLImageElement) {
          const width =
            Number.parseFloat(visual.width) || element.getBoundingClientRect().width || 16;
          const height =
            Number.parseFloat(visual.height) || element.getBoundingClientRect().height || 16;
          child.src = await rasterizeGlyph(
            glyphUrl,
            width,
            height,
            mask !== "none" ? visual.maskSize : visual.backgroundSize,
            mask !== "none" ? visual.backgroundColor : undefined,
          );
          child.alt = "";
          for (const property of Array.from(child.style).filter(
            (name) => name.includes("mask") || name === "background-image",
          ))
            child.style.removeProperty(property);
          child.style.backgroundColor = "transparent";
          child.style.width = `${width}px`;
          child.style.height = `${height}px`;
        }
        const content = visual.content;
        if (content.startsWith('"') && content.endsWith('"')) {
          try {
            child.textContent = JSON.parse(content) as string;
          } catch {
            child.textContent = content.slice(1, -1);
          }
        }
        if (!glyphUrl && !child.textContent) child.textContent = "\u200B";
        if (pseudo === "::before") target.prepend(child);
        else target.append(child);
      }
    }
    for (const node of output.body.querySelectorAll("style,script")) node.remove();
    for (const element of output.body.querySelectorAll<HTMLElement>("[style]")) {
      for (const property of element.style) {
        if (element.style.getPropertyValue(property).includes("var(")) {
          throw new Error(`Unable to resolve inline ${property}`);
        }
      }
    }
    return output.body.innerHTML;
  } finally {
    frame.remove();
  }
}
