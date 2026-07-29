import { beforeEach, expect, test, vi } from "vite-plus/test";
import { readFileSync, renameSync as _renameSync, writeFileSync } from "node:fs";
import type { Application, Comment, Context } from "typedoc";
import { load } from "../src/index.ts";

vi.mock(import("node:fs"), () => ({
  readFileSync: vi.fn(),
  renameSync: vi.fn(),
  writeFileSync: vi.fn(),
}));
const readMock = readFileSync as unknown as ReturnType<typeof vi.fn>;
const writeMock = writeFileSync as unknown as ReturnType<typeof vi.fn>;

/** A fake TypeDoc app that records the handlers `load` registers. */
function fakeApp() {
  const converter: ((ctx: Context) => void)[] = [];
  const renderer: ((event: { outputDirectory: string }) => void)[] = [];
  const app = {
    converter: { on: (_event: unknown, cb: (ctx: Context) => void) => converter.push(cb) },
    renderer: {
      on: (_event: unknown, cb: (event: { outputDirectory: string }) => void) => renderer.push(cb),
    },
  } as unknown as Application;
  return { app, converter, renderer };
}

const demoTag = (text: string) => ({ tag: "@demo", content: [{ kind: "text", text }] });
const comment = (text: string): Comment =>
  ({ summary: [], blockTags: [demoTag(text)] }) as unknown as Comment;

beforeEach(() => {
  vi.clearAllMocks();
});

test("load registers a resolve-begin and a render-end handler", () => {
  const { app, converter, renderer } = fakeApp();
  load(app);
  expect(converter).toHaveLength(1);
  expect(renderer).toHaveLength(1);
});

test("resolve pass rewrites @demo tags on comments, signatures, and accessors", () => {
  const { app, converter } = fakeApp();
  load(app);

  const ownComment = comment("self:own");
  const signatureComment = comment("self:sig");
  const getComment = comment("self:get");
  const setComment = comment("self:set");

  const context = {
    project: {
      reflections: {
        1: { comment: ownComment },
        2: { signatures: [{ comment: signatureComment }, {}] },
        3: { getSignature: { comment: getComment }, setSignature: { comment: setComment } },
        4: {}, // no comment at all — commentsOf yields nothing
      },
    },
  } as unknown as Context;

  converter[0](context);

  for (const [c, spec] of [
    [ownComment, "self:own"],
    [signatureComment, "self:sig"],
    [getComment, "self:get"],
    [setComment, "self:set"],
  ] as const) {
    const summary = c.summary.map((part) => part.text).join("");
    expect(summary).toContain(`\`\`\`demo\n${spec}\n\`\`\``);
    expect(c.blockTags).toHaveLength(0);
  }
});

test("render pass returns early when there is no sidebar", () => {
  const { app, renderer } = fakeApp();
  load(app);
  readMock.mockImplementation(() => {
    throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
  });
  renderer[0]({ outputDirectory: "/out" });
  expect(writeMock).not.toHaveBeenCalled();
});

test("render pass flattens src nodes and rewrites the module heading", () => {
  const { app, renderer } = fakeApp();
  load(app);

  const sidebar = [
    {
      text: "components",
      items: [
        {
          text: "src",
          link: "/api/formats/components/src/",
          items: [{ text: "index", link: "/api/formats/components/src/index" }],
        },
        { text: "extra", link: "/api/formats/components/extra" },
      ],
    },
    { text: "leaf", link: "/api/leaf" },
  ];

  // Sidebar exists and every module index.md exists.
  readMock.mockImplementation((path: string) => {
    if (path.endsWith("typedoc-sidebar.json")) return JSON.stringify(sidebar);
    // A module index whose first line carries the breadcrumb and heading to rewrite.
    return "pantoken / formats/components/src\n\n# formats/components/src\n\nbody";
  });

  renderer[0]({ outputDirectory: "/out" });

  // The sidebar is rewritten, and the module index heading + breadcrumb are retitled to "components".
  const sidebarWrite = writeMock.mock.calls.find(([p]) =>
    String(p).endsWith("typedoc-sidebar.json"),
  );
  expect(sidebarWrite).toBeTruthy();
  const flattened = JSON.parse(sidebarWrite![1] as string);
  // The "src" child is hoisted: the parent inherits its link and children.
  expect(flattened[0].link).toBe("/api/formats/components/src/");
  expect(flattened[0].items.map((i: { text: string }) => i.text)).toEqual(["index", "extra"]);

  const indexWrite = writeMock.mock.calls.find(([p]) => String(p).endsWith("index.md.tmp"));
  expect(indexWrite).toBeTruthy();
  const rewritten = indexWrite![1] as string;
  expect(rewritten).toContain("# components");
  expect(rewritten).toContain("pantoken / components");
});

test("render pass skips a heading rewrite when the module index is missing", () => {
  const { app, renderer } = fakeApp();
  load(app);

  const sidebar = [
    {
      text: "components",
      items: [{ text: "src", link: "/api/formats/components/src/", items: [] }],
    },
  ];
  readMock.mockImplementation((path: string) => {
    if (path.endsWith("typedoc-sidebar.json")) return JSON.stringify(sidebar);
    // Index doesn't exist — throw to simulate missing file.
    throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
  });

  renderer[0]({ outputDirectory: "/out" });

  // Only the sidebar is written; the absent index.md is left alone.
  expect(writeMock).toHaveBeenCalledTimes(1);
  expect(String(writeMock.mock.calls[0][0])).toContain("typedoc-sidebar.json");
});

test("render pass leaves a module index untouched when nothing changes", () => {
  const { app, renderer } = fakeApp();
  load(app);

  const sidebar = [
    {
      text: "src-only",
      items: [{ text: "src", link: "/api/pkg/src/", items: [] }],
    },
  ];
  readMock.mockImplementation((path: string) => {
    if (path.endsWith("typedoc-sidebar.json")) return JSON.stringify(sidebar);
    // No "# heading" and no breadcrumb to match → replaceFirstLine is a no-op → no write.
    return "just body text\nmore";
  });

  renderer[0]({ outputDirectory: "/out" });

  const indexWrites = writeMock.mock.calls.filter(
    ([p]) => String(p).endsWith("index.md") || String(p).endsWith("index.md.tmp"),
  );
  expect(indexWrites).toHaveLength(0);
});
