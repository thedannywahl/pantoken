import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test } from "vite-plus/test";

const { findMissingTranslations } = await import("../scripts/check-drift.ts");

let memDir: string;

beforeEach(() => {
  memDir = join(tmpdir(), `ptk-wc-drift-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(memDir, { recursive: true });
});

afterEach(() => {
  rmSync(memDir, { recursive: true, force: true });
});

test("findMissingTranslations returns empty when all keys are cached", () => {
  writeFileSync(join(memDir, "hu.json"), JSON.stringify({ back: "Vissza" }));
  const result = findMissingTranslations(memDir, ["hu"], ["back"]);
  expect(result).toHaveLength(0);
});

test("findMissingTranslations reports missing keys", () => {
  writeFileSync(join(memDir, "hu.json"), JSON.stringify({}));
  const result = findMissingTranslations(memDir, ["hu"], ["back", "timeLabel"]);
  expect(result).toEqual([
    { locale: "hu", key: "back" },
    { locale: "hu", key: "timeLabel" },
  ]);
});

test("findMissingTranslations reports every key for a missing cache file", () => {
  const result = findMissingTranslations(memDir, ["xx"], ["back"]);
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({ locale: "xx", key: "back" });
});
