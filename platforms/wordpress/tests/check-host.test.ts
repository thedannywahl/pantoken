import { expect, test } from "vite-plus/test";
import { assertPresets } from "../scripts/check-host.ts";

test("accepts the expected host release with all generated preset families", () => {
  expect(() =>
    assertPresets('{"version":"6.6.2","palette":10,"spacing":5,"fonts":2}', "6.6"),
  ).not.toThrow();
  expect(() =>
    assertPresets('{"version":"6.7","palette":10,"spacing":5,"fonts":2}', "6.7.0"),
  ).not.toThrow();
});

test("rejects missing presets or the wrong host release", () => {
  expect(() =>
    assertPresets('{"version":"6.6.2","palette":10,"spacing":0,"fonts":2}', "6.6"),
  ).toThrow("did not load");
  expect(() =>
    assertPresets('{"version":"6.7","palette":10,"spacing":5,"fonts":2}', "6.6"),
  ).toThrow("did not load");
});
