import { describe, expect, test } from "vite-plus/test";
import {
  formatDate,
  formatList,
  formatMessage,
  formatNumber,
  formatRelativeTime,
  isolate,
} from "../src/lib/runtime.ts";

describe("formatMessage", () => {
  test("formats a plain MF2 pattern message", () => {
    expect(formatMessage("en", "Hello world.")).toBe("Hello world.");
  });

  test("substitutes a variable (messageformat isolates it in FSI/PDI by default)", () => {
    expect(formatMessage("en", "Hello {$name}!", { name: "Ada" })).toBe("Hello \u2068Ada\u2069!");
  });

  test("formats English plural variants", () => {
    const source = [
      ".input {$count :number}",
      ".match $count",
      "one {{{$count} file selected}}",
      "* {{{$count} files selected}}",
    ].join("\n");
    expect(formatMessage("en", source, { count: 1 })).toBe("1 file selected");
    expect(formatMessage("en", source, { count: 3 })).toBe("3 files selected");
  });

  test("formats Arabic plural variants across multiple categories", () => {
    const source = [
      ".input {$count :number}",
      ".match $count",
      "zero {{no files}}",
      "one {{one file}}",
      "two {{two files}}",
      "few {{a few files}}",
      "many {{many files}}",
      "* {{other files}}",
    ].join("\n");
    expect(formatMessage("ar", source, { count: 0 })).toBe("no files");
    expect(formatMessage("ar", source, { count: 2 })).toBe("two files");
    expect(formatMessage("ar", source, { count: 5 })).toBe("a few files");
  });
});

describe("isolate", () => {
  test("wraps the value in FSI/PDI bidi isolates", () => {
    expect(isolate("file.txt")).toBe("\u2068file.txt\u2069");
  });
});

describe("Intl wrappers", () => {
  test("formatNumber is locale-bound", () => {
    expect(formatNumber("en-US", 1234.5)).toBe("1,234.5");
    expect(formatNumber("de-DE", 1234.5)).toBe("1.234,5");
  });

  test("formatDate is locale-bound", () => {
    const date = new Date(Date.UTC(2026, 0, 15));
    expect(formatDate("en-US", date, { timeZone: "UTC" })).toBe("1/15/2026");
  });

  test("formatList joins with the locale's conjunction", () => {
    expect(formatList("en", ["a", "b", "c"])).toBe("a, b, and c");
  });

  test("formatRelativeTime formats a relative offset", () => {
    expect(formatRelativeTime("en", -3, "day")).toBe("3 days ago");
  });
});
