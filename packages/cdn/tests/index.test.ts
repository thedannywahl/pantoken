import { expect, test } from "vite-plus/test";
import {
  buildFileUrl,
  buildFileUrls,
  CDN_PROVIDERS,
  DEFAULT_CDN_PROVIDER_ID,
  defineCdnProvider,
  resolveCdnProvider,
  toEsmImportStatements,
  toImportStatements,
  toLinkTags,
  toScriptTagLines,
  validateCdnProvider,
  type CdnFile,
} from "../src/index.ts";

const componentsCss: CdnFile = { package: "@pantoken/components", path: "dist/components.css" };
const baseCss: CdnFile = { package: "@pantoken/components", path: "dist/base.css" };

// resolveCdnProvider
test("resolveCdnProvider defaults to jsDelivr when unspecified", () => {
  expect(resolveCdnProvider().id).toBe("jsdelivr");
  expect(DEFAULT_CDN_PROVIDER_ID).toBe("jsdelivr");
});

test("resolveCdnProvider resolves a known id", () => {
  expect(resolveCdnProvider("unpkg").id).toBe("unpkg");
  expect(resolveCdnProvider("esmsh").id).toBe("esmsh");
});

test("resolveCdnProvider throws on an unknown id", () => {
  expect(() => resolveCdnProvider("cdnjs")).toThrow(/unknown cdn provider/i);
});

test("resolveCdnProvider passes through a custom provider object", () => {
  const custom = defineCdnProvider({
    id: "custom",
    label: "Custom",
    supportsCombine: false,
    buildUrl: (file) => `https://example.com/${file.package}/${file.path}`,
  });
  expect(resolveCdnProvider(custom)).toBe(custom);
});

// jsdelivr
test("jsdelivr builds an unpinned file URL", () => {
  expect(buildFileUrl(componentsCss, "jsdelivr")).toBe(
    "https://cdn.jsdelivr.net/npm/@pantoken/components/dist/components.css",
  );
});

test("jsdelivr builds a pinned file URL", () => {
  expect(buildFileUrl(componentsCss, "jsdelivr", { version: "1.2.3" })).toBe(
    "https://cdn.jsdelivr.net/npm/@pantoken/components@1.2.3/dist/components.css",
  );
});

test("jsdelivr combines multiple files into one URL", () => {
  expect(buildFileUrls([baseCss, componentsCss], "jsdelivr")).toEqual([
    "https://cdn.jsdelivr.net/combine/npm/@pantoken/components/dist/base.css,npm/@pantoken/components/dist/components.css",
  ]);
});

// unpkg
test("unpkg builds a file URL and has no combine support", () => {
  expect(CDN_PROVIDERS.unpkg!.supportsCombine).toBe(false);
  expect(buildFileUrl(componentsCss, "unpkg", { version: "1.2.3" })).toBe(
    "https://unpkg.com/@pantoken/components@1.2.3/dist/components.css",
  );
});

test("unpkg falls back to one URL per file when combining", () => {
  expect(buildFileUrls([baseCss, componentsCss], "unpkg")).toEqual([
    "https://unpkg.com/@pantoken/components/dist/base.css",
    "https://unpkg.com/@pantoken/components/dist/components.css",
  ]);
});

// esm.sh
test("esmsh builds a raw file URL and has no combine support", () => {
  expect(CDN_PROVIDERS.esmsh!.supportsCombine).toBe(false);
  expect(buildFileUrl(componentsCss, "esmsh")).toBe(
    "https://esm.sh/@pantoken/components/dist/components.css?raw",
  );
});

test("esmsh omits ?raw for a real ESM package import (raw: false)", () => {
  expect(buildFileUrl({ package: "@pantoken/web-components", raw: false }, "esmsh")).toBe(
    "https://esm.sh/@pantoken/web-components",
  );
});

// optional path (whole-package references)
test("a file with no path references the package root", () => {
  expect(buildFileUrl({ package: "@pantoken/web-components" }, "jsdelivr")).toBe(
    "https://cdn.jsdelivr.net/npm/@pantoken/web-components",
  );
});

// format helpers
test("format helpers turn URLs into one line per file", () => {
  const urls = ["https://cdn.jsdelivr.net/npm/a", "https://cdn.jsdelivr.net/npm/b"];
  expect(toLinkTags(urls)).toBe(
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/a">\n' +
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/b">',
  );
  expect(toImportStatements(urls)).toBe(
    '@import url("https://cdn.jsdelivr.net/npm/a");\n@import url("https://cdn.jsdelivr.net/npm/b");',
  );
  expect(toEsmImportStatements(urls)).toBe(
    'import "https://cdn.jsdelivr.net/npm/a";\nimport "https://cdn.jsdelivr.net/npm/b";',
  );
  expect(toScriptTagLines([urls[0]!])).toBe(
    '  var script = document.createElement("script");\n' +
      '  script.src = "https://cdn.jsdelivr.net/npm/a";\n' +
      "  document.head.appendChild(script);",
  );
});

// version safety
test("an unsafe version string throws instead of producing a corrupt URL", () => {
  expect(() => buildFileUrl(componentsCss, "jsdelivr", { version: '1.0.0" onerror=x' })).toThrow(
    /unsafe cdn version/i,
  );
});

test("a per-file version overrides the build-level default", () => {
  expect(
    buildFileUrl({ ...componentsCss, version: "2.0.0" }, "jsdelivr", { version: "1.0.0" }),
  ).toBe("https://cdn.jsdelivr.net/npm/@pantoken/components@2.0.0/dist/components.css");
});

// defineCdnProvider / validateCdnProvider
test("validateCdnProvider rejects a provider with no id", () => {
  expect(() =>
    validateCdnProvider({ id: "", label: "x", supportsCombine: false, buildUrl: () => "" }),
  ).toThrow(/no id/);
});

test("validateCdnProvider rejects supportsCombine: true without buildCombineUrl", () => {
  expect(() =>
    validateCdnProvider({ id: "x", label: "X", supportsCombine: true, buildUrl: () => "" }),
  ).toThrow(/no buildCombineUrl/);
});

test("validateCdnProvider rejects supportsCombine: false with a buildCombineUrl", () => {
  expect(() =>
    validateCdnProvider({
      id: "x",
      label: "X",
      supportsCombine: false,
      buildUrl: () => "",
      buildCombineUrl: () => "",
    }),
  ).toThrow(/has a buildCombineUrl/);
});
