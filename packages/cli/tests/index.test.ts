import { existsSync, mkdtempSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, expect, test, vi } from "vite-plus/test";
import { parseArgs, run } from "../src/index.ts";

let warnSpy: ReturnType<typeof vi.spyOn>;

beforeAll(() => {
  // Most CLI tests write into tmpdir(), which intentionally sits outside cwd.
  // The unsafe-path warning is expected there; keep test output clean.
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  warnSpy.mockRestore();
});

test("parseArgs reads the target and flags", () => {
  const args = parseArgs(["generate", "swift", "--out", "/tmp/x", "--theme", "canvas"]);
  expect(args.command).toBe("generate");
  expect(args.target).toBe("swift");
  expect(args.out).toBe("/tmp/x");
  expect(args.theme).toBe("canvas");
});

test("run generates Swift + an SPM manifest stub", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-"));
  await run(["generate", "swift", "--out", out, "--class", "PanTokens"]);
  expect(existsSync(join(out, "Sources", "PanTokens", "Tokens.swift"))).toBe(true);
  const manifest = readFileSync(join(out, "Package.swift"), "utf8");
  expect(manifest).toContain('name: "PanTokens"');
  expect(manifest).toContain("swift-tools-version");
});

test("run generates Android resource XML", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-android-"));
  await run(["generate", "android", "--out", out]);
  expect(existsSync(join(out, "res", "values", "colors.xml"))).toBe(true);
  expect(existsSync(join(out, "res", "values", "dimens.xml"))).toBe(true);
});

test("unknown targets report a clear error", async () => {
  await expect(run(["generate", "cobol", "--out", "/tmp/x"])).rejects.toThrow(/Unknown target/);
});

test("parseArgs applies defaults, boolean flags, and the comma-separated --icons list", () => {
  const args = parseArgs([
    "generate",
    "pendo",
    "--no-scope",
    "--no-important",
    "--no-prune",
    "--icons",
    "arrow-left,,check-mark",
  ]);
  expect(args.out).toBe("./pantoken-out"); // default when --out is absent
  expect(args.theme).toBe("rebrand"); // default theme
  expect(args.className).toBe("PanTokens"); // default class
  expect(args.noScope).toBe(true);
  expect(args.noImportant).toBe(true);
  expect(args.noPrune).toBe(true);
  // Empty segments are dropped from the icon list.
  expect(args.icons).toEqual(["arrow-left", "check-mark"]);
});

test("parseArgs treats a trailing --format flag with no value as 'true'", () => {
  // --format is a known flag; "true" is later validated by the target-specific runner.
  const args = parseArgs(["generate", "swatches", "--format"]);
  expect(args.format).toBe("true");
});

test("an unknown command (not `generate`) reports a usage error", async () => {
  await expect(run(["build", "swift"])).rejects.toThrow(/Unknown command/);
});

// Regression tests for Phase B: CLI input validation
test("parseArgs rejects an unknown theme value", () => {
  expect(() => parseArgs(["generate", "swift", "--theme", "unknown-theme"])).toThrow(
    /Unknown theme/,
  );
});

test("parseArgs rejects a trailing --theme flag parsed as 'true'", () => {
  expect(() => parseArgs(["generate", "swift", "--theme"])).toThrow(/Unknown theme/);
});

test("parseArgs rejects an unknown flag", () => {
  expect(() => parseArgs(["generate", "swift", "--unknown-flag"])).toThrow(/Unknown flag/);
});

test("run rejects an unsupported Rust format", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-rust-bad-"));
  await expect(run(["generate", "rust", "--format", "opengl", "--out", out])).rejects.toThrow(
    /Unknown Rust format/,
  );
});

test("parseArgs rejects an invalid class name", () => {
  expect(() => parseArgs(["generate", "swift", "--class", "123Bad"])).toThrow(/Invalid class name/);
});

/** Every target that writes plain JSON/text assets into a fresh output dir. */
const FILE_TARGETS: Array<{ target: string; expect: string; args?: string[] }> = [
  { target: "wordpress", expect: "theme.json" },
  { target: "vanilla", expect: "variables.json" },
  { target: "mintlify", expect: "docs.json" },
  { target: "pendo", expect: "global.css", args: ["--no-scope", "--no-important", "--no-prune"] },
];

for (const { target, expect: file, args = [] } of FILE_TARGETS) {
  test(`run generates the ${target} asset`, async () => {
    const out = mkdtempSync(join(tmpdir(), `pantoken-cli-${target}-`));
    await run(["generate", target, "--out", out, ...args]);
    expect(existsSync(join(out, file))).toBe(true);
  });
}

test("run generates the Jetpack Compose source", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-compose-"));
  await run(["generate", "compose", "--out", out]);
  expect(existsSync(out)).toBe(true);
});

test("run generates the Flutter source", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-flutter-"));
  await run(["generate", "flutter", "--out", out]);
  expect(existsSync(out)).toBe(true);
});

test("run writes the Drupal theme assets under the output dir", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-drupal-"));
  await run(["generate", "drupal", "--out", out]);
  expect(existsSync(out)).toBe(true);
});

test("run writes Jekyll and Hugo static-site assets", async () => {
  for (const target of ["jekyll", "hugo"]) {
    const out = mkdtempSync(join(tmpdir(), `pantoken-cli-${target}-`));
    await run(["generate", target, "--out", out]);
    expect(existsSync(out)).toBe(true);
  }
});

test("run writes Rust source, defaulting to egui and joining tokens.rs onto a dir", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-rust-"));
  await run(["generate", "rust", "--out", out]);
  expect(existsSync(join(out, "tokens.rs"))).toBe(true);
});

test("run writes Rust to an explicit file path and honours --format iced", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-cli-rust-iced-"));
  const file = join(dir, "theme.rs");
  await run(["generate", "rust", "--format", "iced", "--out", file]);
  expect(existsSync(file)).toBe(true);
});

test("run writes swatches in each supported format", async () => {
  for (const [format, ext] of [
    ["ase", "ase"],
    ["gpl", "gpl"],
    ["sketch", "sketchpalette"],
    ["svg", "svg"],
  ]) {
    const out = mkdtempSync(join(tmpdir(), `pantoken-cli-swatches-${format}-`));
    await run(["generate", "swatches", "--format", format, "--out", out]);
    expect(existsSync(join(out, `instructure.${ext}`))).toBe(true);
  }
});

test("swatches defaults to ase and reports an unknown format", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-swatches-default-"));
  await run(["generate", "swatches", "--out", out]);
  expect(existsSync(join(out, "instructure.ase"))).toBe(true);

  const bad = mkdtempSync(join(tmpdir(), "pantoken-cli-swatches-bad-"));
  await expect(run(["generate", "swatches", "--format", "xml", "--out", bad])).rejects.toThrow(
    /Unknown swatch format/,
  );
});

test("run builds the icon font (ttf, woff2, css, codepoints)", async () => {
  const out = mkdtempSync(join(tmpdir(), "pantoken-cli-iconfont-"));
  // Runs the REAL @pantoken/icon-font pipeline (no mock), so it exercises the arc→outline→ttf→woff2
  // path end to end and would fail on a regression like the SVG-arc parse bug (which produced no font).
  await run(["generate", "icon-font", "--out", out, "--class", "Icons"]);
  for (const file of ["Icons.ttf", "Icons.woff2", "icons.css", "codepoints.json"]) {
    expect(existsSync(join(out, file))).toBe(true);
  }
  expect(statSync(join(out, "Icons.woff2")).size).toBeGreaterThan(1000);
  const codepoints = JSON.parse(readFileSync(join(out, "codepoints.json"), "utf8")) as Record<
    string,
    string
  >;
  expect(Object.keys(codepoints).length).toBeGreaterThan(100);
  // The real font pipeline (arc→outline→ttf→woff2 over the whole icon set) runs ~10-15s, well past
  // vitest's 5s default — give it room so a cold run doesn't time out.
}, 30_000);
