import { join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { parsePo, serializePo, type PoEntry } from "../../tools/i18n-engine/src/po.ts";
import { generatedFileMarkdown } from "../../tools/translation-adapters/src/generated-values.ts";
import { collectUnits, segmentMarkdown } from "./segment-markdown.ts";

const { files, writeFileSync, provider } = vi.hoisted(() => ({
  files: new Map<string, string>(),
  writeFileSync: vi.fn(),
  provider: vi.fn(() => {
    throw new Error("A cache-only render invoked a provider");
  }),
}));

vi.mock("node:fs", async (importActual) => ({
  ...(await importActual<typeof import("node:fs")>()),
  existsSync: (path: string) => files.has(path),
  readFileSync: (path: string) => {
    const source = files.get(path);
    if (source === undefined) throw new Error(`Missing fixture: ${path}`);
    return source;
  },
  writeFileSync,
}));
vi.mock("node:child_process", () => ({
  spawn: provider,
  spawnSync: provider,
  execFileSync: provider,
}));
vi.mock("./lib/files.ts", () => ({
  walkFiles: (directory: string) => [join(directory, "example.md")],
}));
vi.mock("../.vitepress/i18n.ts", () => ({
  NON_ROOT_LOCALES: ["hu", "de"],
  parseRequestedLocales: () => ["hu", "de"],
}));
vi.mock("./api-translation.ts", () => ({
  GlossaryTranslationAdapter: class {
    translateText(source: string): Promise<string> {
      return Promise.resolve(source);
    }
  },
}));

const { renderGeneratedValues } = await import("./render-generated-values.ts");
const root = join(import.meta.dirname, "../..");
const guidePath = join(root, "docs/compatibility.md");
const apiPath = join(root, "docs/api/example.md");
const guide = (version: string): string =>
  `<!-- pantoken-generated-values -->\n# Support\n\n| Package | Version | Status |\n| --- | --- | --- |\n| \`pkg\` | \`${version}\` | Verified |\n`;
const api = (version: string): string =>
  `<!-- pantoken-generated-values -->\nTarget: \`pkg\`. Minimum: \`${version}\`.\n`;
const entry = (msgid: string, msgstr: string, context?: string): PoEntry => ({
  msgid,
  msgstr,
  msgctxt: context,
  references: [],
  flags: [],
  fuzzy: false,
  obsolete: false,
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "log").mockImplementation(() => {});
  files.clear();
  files.set(guidePath, guide("1.0"));
  files.set(apiPath, api("1.0"));
  const template = collectUnits(segmentMarkdown(api("1.0"), { scope: "example.md" }))[0].text;
  for (const locale of ["hu", "de"]) {
    const compatibility = generatedFileMarkdown(guide("1.0")).template;
    files.set(
      join(root, "l10n", locale, "docs.guides.po"),
      serializePo([entry(compatibility, compatibility.replace("Support", `${locale} support`))]),
    );
    files.set(
      join(root, "l10n", locale, "docs.api.po"),
      serializePo([
        entry(template, template.replace("Target:", `${locale} target:`), "docs.api:prose"),
      ]),
    );
  }
  writeFileSync.mockImplementation((path: string, content: string) => files.set(path, content));
});

afterEach(() => vi.restoreAllMocks());

test("refreshes two locales with current versions, no providers, and a byte-stable second pass", async () => {
  await renderGeneratedValues();
  expect(writeFileSync).toHaveBeenCalledTimes(4);
  files.set(guidePath, guide("123.45.6"));
  files.set(apiPath, api("123.45.6"));
  writeFileSync.mockClear();
  await expect(renderGeneratedValues({ check: true })).rejects.toThrow("stale");
  expect(writeFileSync).not.toHaveBeenCalled();
  await renderGeneratedValues();
  expect(writeFileSync).toHaveBeenCalledTimes(4);
  for (const locale of ["hu", "de"]) {
    for (const page of ["compatibility.md", "api/example.md"]) {
      const content = files.get(join(root, "docs", locale, page));
      expect(content).toContain("`123.45.6`");
      expect(content).not.toContain("`1.0`");
      expect(content).not.toContain("{{ptk_code_");
      expect(content).not.toContain("pantoken-value-scope:");
    }
  }
  writeFileSync.mockClear();
  await renderGeneratedValues({ check: true });
  await renderGeneratedValues();
  expect(writeFileSync).not.toHaveBeenCalled();
  expect(provider).not.toHaveBeenCalled();
});

test("does not commit any staged pages when a generated translation is corrupt", async () => {
  const path = join(root, "l10n/de/docs.api.po");
  files.set(
    path,
    serializePo(
      parsePo(files.get(path) ?? "").map((entry) => ({
        ...entry,
        msgstr: entry.msgstr.replace("{{ptk_code_1}}", "{{ptk_code_0}}"),
      })),
    ),
  );
  await expect(renderGeneratedValues()).rejects.toThrow("placeholder");
  expect(writeFileSync).not.toHaveBeenCalled();
});

test("does not bypass changed support claims or fuzzy compatibility translations", async () => {
  files.set(guidePath, guide("1.0").replace("Verified", "Unverified"));
  await expect(renderGeneratedValues()).rejects.toThrow("missing reviewed");
  files.set(guidePath, guide("1.0"));
  const path = join(root, "l10n/hu/docs.guides.po");
  files.set(
    path,
    serializePo(
      parsePo(files.get(path) ?? "").map((entry) => ({
        ...entry,
        fuzzy: true,
        flags: ["fuzzy"],
      })),
    ),
  );
  await expect(renderGeneratedValues()).rejects.toThrow("missing reviewed");
  expect(writeFileSync).not.toHaveBeenCalled();
});
