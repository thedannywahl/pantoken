import { expect, test } from "vite-plus/test";
import {
  buildIconResolverChain,
  customIcons,
  getIcon,
  icons,
  lucideIcons,
  resolve,
} from "../src/index.ts";
import { sanitizeSvg } from "@pantoken/utils";

test("exposes the full icon set derived from the IR", () => {
  expect(icons.length).toBeGreaterThan(500);
});

test("exposes exhaustive source-specific icon collections", () => {
  expect(lucideIcons.length).toBeGreaterThan(1800);
  expect(customIcons.length).toBeGreaterThan(50);
  expect(lucideIcons.every((icon) => icon.source === "lucide")).toBe(true);
  expect(customIcons.every((icon) => icon.source === "custom")).toBe(true);
  expect(lucideIcons.length + customIcons.length).toBe(icons.length);
  expect(new Set([...lucideIcons, ...customIcons].map((icon) => icon.name)).size).toBe(
    icons.length,
  );
});

test("arrow-left is bidirectional and decodes to inline SVG", () => {
  const arrow = getIcon("arrow-left");
  expect(arrow).toBeDefined();
  expect(arrow?.bidirectional).toBe(true);
  expect(arrow?.svg.startsWith("<svg")).toBe(true);
});

test("a Custom (Instructure-authored) glyph is present and sourced", () => {
  const logo = getIcon("canvas-logo");
  expect(logo).toBeDefined();
  expect(logo?.source).toBe("custom");
});

test("sanitizeSvg strips script elements from decoded SVG", () => {
  const dirty = `<svg><script>alert(1)</script><path d="M0 0"/></svg>`;
  expect(sanitizeSvg(dirty)).not.toContain("<script");
  expect(sanitizeSvg(dirty)).toContain("<path");
});

test("sanitizeSvg strips event-handler attributes", () => {
  const dirty = `<svg><path onclick="evil()" d="M0 0"/></svg>`;
  expect(sanitizeSvg(dirty)).not.toContain("onclick");
  expect(sanitizeSvg(dirty)).toContain("<path");
});

test("icon svgs from the IR contain no script elements", () => {
  for (const icon of icons) {
    expect(icon.svg).not.toMatch(/<script/i);
  }
});

test("resolve() returns an IconEntry for known codes and undefined otherwise", () => {
  expect(resolve("arrow-left")?.svg?.startsWith("<svg")).toBe(true);
  expect(resolve("not-a-real-icon")).toBeUndefined();
});

test("buildIconResolverChain falls through to plugin resolvers for unknown codes", () => {
  const pluginHit = { name: "plugin", svg: "<svg/>", source: "custom" as const };
  const explicitHit = { name: "explicit", svg: "<svg/>", source: "custom" as const };

  const chain = buildIconResolverChain({
    plugins: [
      {
        name: "plugin-resolver",
        rehype: () => ({
          resolve(code) {
            return code === "brand-icon" ? pluginHit : undefined;
          },
        }),
      },
      {
        name: "noop-plugin",
        rehype: () => undefined,
      },
    ],
    resolve(code) {
      return code === "fallback-icon" ? explicitHit : undefined;
    },
  });

  expect(chain("brand-icon")?.name).toBe("plugin");
  expect(chain("fallback-icon")?.name).toBe("explicit");
});

test("buildIconResolverChain prefers the built-in icon over a colliding plugin resolver", () => {
  const chain = buildIconResolverChain({
    plugins: [
      {
        name: "plugin-resolver",
        rehype: () => ({
          resolve(code) {
            return code === "arrow-left"
              ? { name: "arrow-left", svg: "<svg/>", source: "custom" }
              : undefined;
          },
        }),
      },
    ],
  });

  expect(chain("arrow-left")?.svg).toBe(getIcon("arrow-left")?.svg);
  expect(chain("arrow-left")?.svg).not.toBe("<svg/>");
});

test("buildIconResolverChain falls through to built-in resolver", () => {
  const chain = buildIconResolverChain({});
  expect(chain("arrow-left")?.svg?.startsWith("<svg")).toBe(true);
  expect(chain("not-a-real-icon")).toBeUndefined();
});
