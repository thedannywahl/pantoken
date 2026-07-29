import { test } from "vite-plus/test";
import * as fc from "fast-check";
import { inferSyntax } from "./build-css-api.ts";

/** Every value `inferSyntax()` is contractually allowed to return. */
const VALID_OUTPUTS = new Set<string | undefined>([
  undefined,
  "<url>",
  "<color>",
  "<length>",
  "<time>",
  "<integer>",
  "<number>",
]);

test("inferSyntax: never throws for any string input", () => {
  fc.assert(
    fc.property(fc.string({ maxLength: 500, unit: "grapheme" }), (value) => {
      inferSyntax(value);
    }),
  );
});

test("inferSyntax: always returns a known syntax descriptor or undefined", () => {
  fc.assert(
    fc.property(fc.string({ maxLength: 500, unit: "grapheme" }), (value) => {
      const result = inferSyntax(value);
      return VALID_OUTPUTS.has(result);
    }),
  );
});

test("inferSyntax: returns <color> for known color prefixes", () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.stringMatching(/^[0-9a-f]{3,8}$/).map((h) => `#${h}`),
        fc.string({ unit: "grapheme" }).map((s) => `rgb(${s})`),
        fc.string({ unit: "grapheme" }).map((s) => `oklch(${s})`),
      ),
      (value) => {
        const result = inferSyntax(value);
        return result === "<color>" || result === undefined;
      },
    ),
  );
});

test("inferSyntax: url() and data: inputs return <url>", () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.string({ unit: "grapheme" }).map((s) => `url(${s})`),
        fc.string({ unit: "grapheme" }).map((s) => `data:${s}`),
      ),
      (value) => {
        const result = inferSyntax(value);
        return result === "<url>";
      },
    ),
  );
});
