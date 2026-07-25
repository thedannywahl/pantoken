import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

// style-api-badges runs build() on import, so (like build-api-locales.test) we drive it entirely
// through a mocked node:fs and assert on the writes + summary log. The exported helpers
// (walkMarkdownFiles, styleBadges) are also exercised directly.
interface Stat {
  isDirectory: () => boolean;
}
const existsSync = vi.fn<(path: string) => boolean>();
const readdirSync = vi.fn<(path: string) => string[]>();
const statSync = vi.fn<(path: string) => Stat>();
const readFileSync = vi.fn<(path: string) => string>();
const writeFileSync = vi.fn<(path: string, data: string) => void>();

vi.mock("node:fs", () => ({ existsSync, readdirSync, statSync, readFileSync, writeFileSync }));

let logSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  // Benign defaults: an empty API tree, so a bare `import` runs build() harmlessly.
  existsSync.mockReturnValue(true);
  readdirSync.mockReturnValue([]);
  statSync.mockReturnValue({ isDirectory: () => false });
  readFileSync.mockReturnValue("");
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("walkMarkdownFiles recurses directories and returns only .md files", async () => {
  const { walkMarkdownFiles } = await import("./style-api-badges.ts");

  const tree: Record<string, string[]> = {
    "/root": ["sub", "a.md", "notes.txt"],
    "/root/sub": ["b.md"],
  };
  existsSync.mockImplementation((p) => p in tree);
  readdirSync.mockImplementation((p) => tree[p] ?? []);
  statSync.mockImplementation((p) => ({ isDirectory: () => p === "/root/sub" }));

  const files = walkMarkdownFiles("/root");
  expect(files).toContain("/root/a.md");
  expect(files).toContain("/root/sub/b.md");
  expect(files.some((f) => f.endsWith(".txt"))).toBe(false);
  expect(files).toHaveLength(2);
});

test("walkMarkdownFiles returns [] when the directory is absent", async () => {
  const { walkMarkdownFiles } = await import("./style-api-badges.ts");
  existsSync.mockReturnValue(false);
  expect(walkMarkdownFiles("/missing")).toEqual([]);
});

test("styleBadges rewrites standalone badge markers into spans", async () => {
  const { styleBadges } = await import("./style-api-badges.ts");

  const input = ["# Title", "", "**`Deprecated`**", "", "**`Beta`**", ""].join("\n");
  const out = styleBadges(input);
  expect(out).toContain(
    '<span class="instui-pill -color-danger pantoken-doc-tag">Deprecated</span>',
  );
  expect(out).toContain('<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>');
  // The heading and blank lines are untouched.
  expect(out).toContain("# Title");
});

test("styleBadges leaves a marker embedded in a sentence alone", async () => {
  const { styleBadges } = await import("./style-api-badges.ts");
  const input = "This is **`Deprecated`** in context.";
  expect(styleBadges(input)).toBe(input);
});

test("styleBadges is a no-op when there are no markers", async () => {
  const { styleBadges } = await import("./style-api-badges.ts");
  const input = "Just some prose with `inline code` and text.";
  expect(styleBadges(input)).toBe(input);
});

test("build rewrites changed files and reports the count", async () => {
  readdirSync.mockReturnValue(["page.md", "clean.md"]);
  readFileSync.mockImplementation((p) =>
    String(p).endsWith("page.md") ? "**`Experimental`**" : "no badges here",
  );

  await import("./style-api-badges.ts");

  // Only the file that actually changed is written back.
  expect(writeFileSync).toHaveBeenCalledTimes(1);
  const [path, data] = writeFileSync.mock.calls[0];
  expect(String(path).endsWith("page.md")).toBe(true);
  expect(String(data)).toContain(
    '<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>',
  );
  expect(logSpy.mock.calls.flat().join("\n")).toContain("styled 1 markdown file");
});

test("build writes nothing when no file changes", async () => {
  readdirSync.mockReturnValue(["clean.md"]);
  readFileSync.mockReturnValue("nothing to style");

  await import("./style-api-badges.ts");

  expect(writeFileSync).not.toHaveBeenCalled();
  expect(logSpy.mock.calls.flat().join("\n")).toContain("styled 0 markdown file");
});
