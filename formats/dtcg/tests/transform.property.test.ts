import { expect, test } from "vite-plus/test";
import * as fc from "fast-check";
import { toDtcg } from "../src/transform.ts";
import type { Token } from "@pantoken/model";

/** Minimal token shaping for property tests. */
const tokenArb: fc.Arbitrary<Token> = fc.record({
  name: fc.string({ minLength: 1, maxLength: 200, unit: "grapheme" }),
  value: fc.string({ maxLength: 200, unit: "grapheme" }),
  syntax: fc.oneof(
    fc.constant("*"),
    fc.constant("<color>"),
    fc.constant("<length>"),
    fc.constant("<number>"),
    fc.constant("<integer>"),
    fc.constant("<percentage>"),
  ),
  inherits: fc.constant(true as const),
}) as fc.Arbitrary<Token>;

/** Arbitrary that deliberately includes prototype-pollution key fragments. */
const dangerousNameArb: fc.Arbitrary<Token> = fc.record({
  name: fc.oneof(
    fc.constant("__proto__"),
    fc.constant("constructor"),
    fc.constant("prototype"),
    fc.constant("--instui-__proto__-x"),
    fc.constant("--instui-constructor-x"),
    fc.constant("--instui-prototype-x"),
    fc.constant("--instui-color-__proto__"),
  ),
  value: fc.string({ maxLength: 100 }),
  syntax: fc.constant("*"),
  inherits: fc.constant(true as const),
}) as fc.Arbitrary<Token>;

test("toDtcg: never throws for any valid token array", () => {
  fc.assert(
    fc.property(fc.array(tokenArb, { maxLength: 20 }), (tokens) => {
      toDtcg(tokens, "light");
      toDtcg(tokens, "dark");
    }),
  );
});

test("toDtcg: Object.prototype is never polluted by any token name", () => {
  fc.assert(
    fc.property(fc.array(fc.oneof(tokenArb, dangerousNameArb), { maxLength: 20 }), (tokens) => {
      const protoKeysBefore = new Set(Object.getOwnPropertyNames(Object.prototype));
      toDtcg(tokens, "light");
      const protoKeysAfter = Object.getOwnPropertyNames(Object.prototype);
      for (const key of protoKeysAfter) {
        expect(protoKeysBefore.has(key)).toBe(true);
      }
    }),
  );
});

test("toDtcg: dangerous key names (__proto__, constructor, prototype) are silently dropped", () => {
  const dangerousTokens: Token[] = [
    { name: "--instui-__proto__-polluted", syntax: "*", inherits: true, value: "red" },
    { name: "--instui-constructor-polluted", syntax: "*", inherits: true, value: "blue" },
    { name: "--instui-prototype-polluted", syntax: "*", inherits: true, value: "green" },
  ];
  toDtcg(dangerousTokens, "light");
  // The pollution sentinel must never appear on a fresh object
  expect(({} as Record<string, unknown>)["polluted"]).toBeUndefined();
});

test("toDtcg: output keys are always safe property names", () => {
  fc.assert(
    fc.property(fc.array(tokenArb, { maxLength: 20 }), (tokens) => {
      const doc = toDtcg(tokens, "light");
      const forbidden = new Set(["__proto__", "constructor", "prototype"]);
      const checkNode = (node: Record<string, unknown>): void => {
        for (const key of Object.keys(node)) {
          expect(forbidden.has(key)).toBe(false);
          const child = node[key];
          if (child !== null && typeof child === "object" && !("$value" in (child as object))) {
            checkNode(child as Record<string, unknown>);
          }
        }
      };
      checkNode(doc as Record<string, unknown>);
    }),
  );
});
