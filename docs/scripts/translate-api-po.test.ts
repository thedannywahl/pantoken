import { beforeEach, expect, test, vi } from "vite-plus/test";
import type { PoEntry } from "@pantoken/i18n-engine";

const mocks = vi.hoisted(() => ({
  mergePoWithTemplate: vi.fn(async () => {}),
  parsePo: vi.fn<() => PoEntry[]>(() => []),
  refreshCoverageReports: vi.fn(),
  serializePo: vi.fn(() => ""),
  writeCatalog: vi.fn(),
  translateBatch: vi.fn(),
  refreshApiPot: vi.fn(),
  LOCALE_VERBATIM_API_PROSE: new Map([["de", ["Dr. Nguyen Van Thoc"]]]),
}));

vi.mock("node:fs", () => ({ readFileSync: vi.fn(() => "") }));
vi.mock("@pantoken/i18n-engine", () => mocks);
vi.mock("./api-translation.ts", () => ({
  AiTranslationAdapter: class {
    translateBatch = mocks.translateBatch;
  },
}));
vi.mock("./refresh-api-pot.ts", () => ({
  refreshApiPot: mocks.refreshApiPot,
  PANTOKEN_VERBATIM_FLAG: "pantoken-verbatim",
  LOCALE_VERBATIM_API_PROSE: mocks.LOCALE_VERBATIM_API_PROSE,
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  delete process.env.DOCS_TRANSLATION_LOCALE;
  delete process.env.DOCS_TRANSLATION_UNITS;
  mocks.parsePo.mockReturnValue([]);
});

test("merges the TypeDoc API catalog before filling entries", async () => {
  await import("./translate-api-po.ts");

  expect(mocks.refreshApiPot).toHaveBeenCalled();
  expect(mocks.mergePoWithTemplate).toHaveBeenCalledWith(
    expect.stringContaining("docs.api.po"),
    expect.stringContaining("l10n/docs.api.pot"),
  );
  expect(mocks.mergePoWithTemplate).toHaveBeenCalledAfter(mocks.refreshApiPot);
  expect(mocks.parsePo).toHaveBeenCalledAfter(mocks.mergePoWithTemplate);
});

test("passes only requested API units to the provider", async () => {
  const translateBatch = vi.fn(async (items: Array<{ id: string; text: string }>) => {
    expect(items).toEqual([{ id: "docs.api:prose\0One block", text: "One block" }]);
    return {};
  });
  mocks.parsePo.mockReturnValue([
    {
      msgctxt: "docs.api:prose",
      msgid: "One block",
      msgstr: "",
      obsolete: false,
      fuzzy: false,
      flags: [],
      references: [],
    },
    {
      msgctxt: "docs.api:prose",
      msgid: "Other block",
      msgstr: "",
      obsolete: false,
      fuzzy: false,
      flags: [],
      references: [],
    },
  ]);
  mocks.translateBatch.mockImplementation(translateBatch);
  process.env.DOCS_TRANSLATION_UNITS = JSON.stringify([
    { msgctxt: "docs.api:prose", msgid: "One block" },
  ]);

  await import("./translate-api-po.ts");

  expect(translateBatch).toHaveBeenCalledTimes(1);
});

test("marks POT-flagged identity entries translated without sending them to the provider", async () => {
  mocks.parsePo.mockReturnValue([
    {
      msgctxt: "docs.api:prose",
      msgid: "CA",
      msgstr: "",
      obsolete: false,
      fuzzy: false,
      flags: ["no-c-format", "pantoken-verbatim"],
      references: [],
    },
  ]);

  await import("./translate-api-po.ts");

  expect(mocks.translateBatch).not.toHaveBeenCalled();
  expect(mocks.writeCatalog).toHaveBeenCalled();
  expect(mocks.refreshCoverageReports).toHaveBeenCalled();
});

test.each(["", "WCAG 2.2 1.4.11, 2.4.7"])(
  "approves fixed WCAG references without a POT flag or provider call (cached: %j)",
  async (msgstr) => {
    const entry: PoEntry = {
      msgctxt: "docs.api:prose",
      msgid: "WCAG 2.2 1.4.11, 2.4.7",
      msgstr,
      obsolete: false,
      fuzzy: true,
      flags: ["fuzzy"],
      references: [],
    };
    mocks.parsePo.mockReturnValue([entry]);
    await import("./translate-api-po.ts");
    expect(mocks.translateBatch).not.toHaveBeenCalled();
    expect(entry.msgstr).toBe(entry.msgid);
    expect(entry.flags).toContain("pantoken-verbatim");
    expect(entry.fuzzy).toBe(false);
  },
);

test("repairs scoped prose without sending metadata and preserves the generated binding", async () => {
  const prefix = "<!-- pantoken-value-scope:page -->\n";
  const entry: PoEntry = {
    msgctxt: "docs.api:prose",
    msgid: `${prefix}Use {{ptk_code_0}}.`,
    msgstr: `${prefix}Use {{ptk_code_0}}.`,
    obsolete: false,
    fuzzy: false,
    flags: [],
    references: [],
  };
  mocks.parsePo.mockReturnValue([entry]);
  mocks.translateBatch.mockImplementation(async (items, onChunk) => {
    expect(items[0].text).toBe("Use {{ptk_code_0}}.");
    onChunk({ [items[0].id]: "Használja: {{ptk_code_0}}." });
  });
  await import("./translate-api-po.ts");
  expect(entry.msgstr).toBe(`${prefix}Használja: {{ptk_code_0}}.`);
});

test("rejects repaired scoped prose with missing generated values", async () => {
  mocks.parsePo.mockReturnValue([
    {
      msgctxt: "docs.api:prose",
      msgid: "<!-- pantoken-value-scope:page -->\nUse {{ptk_code_0}}.",
      msgstr: "",
      obsolete: false,
      fuzzy: false,
      flags: [],
      references: [],
    },
  ]);
  mocks.translateBatch.mockImplementation(async (items, onChunk) => {
    onChunk({ [items[0].id]: "Használja ezt." });
  });
  await expect(import("./translate-api-po.ts")).rejects.toThrow("placeholder");
});

test("marks locale-specific identity names translated without sending them to the provider", async () => {
  mocks.parsePo.mockReturnValue([
    {
      msgctxt: "docs.api:prose",
      msgid: "Dr. Nguyen Van Thoc",
      msgstr: "Dr. Nguyen Van Thoc",
      obsolete: false,
      fuzzy: false,
      flags: ["no-c-format"],
      references: [],
    },
  ]);
  process.env.DOCS_TRANSLATION_LOCALE = "de";

  await import("./translate-api-po.ts");

  expect(mocks.translateBatch).not.toHaveBeenCalled();
  expect(mocks.writeCatalog).toHaveBeenCalled();
  expect(mocks.refreshCoverageReports).toHaveBeenCalled();
});

test.each([true, false])("retries an echoed Checkbox label (fuzzy: %s)", async (fuzzy) => {
  const entry: PoEntry = {
    msgctxt: "docs.api:prose",
    msgid: "Checkbox\n",
    msgstr: "checkbox",
    obsolete: false,
    fuzzy,
    flags: fuzzy ? ["fuzzy", "no-c-format"] : ["no-c-format"],
    references: ["css/checkbox.md"],
  };
  mocks.parsePo.mockReturnValue([entry]);
  process.env.DOCS_TRANSLATION_LOCALE = "vi";
  mocks.translateBatch.mockImplementation(async (items, onChunk) => {
    expect(items).toEqual([{ id: "docs.api:prose\0Checkbox\n", text: "Checkbox\n" }]);
    onChunk({ [items[0].id]: "translated checkbox\n" });
  });

  await import("./translate-api-po.ts");

  expect(mocks.translateBatch).toHaveBeenCalledTimes(1);
  expect(entry.msgstr).toBe("translated checkbox\n");
  expect(entry.fuzzy).toBe(false);
  expect(entry.flags).toEqual(["no-c-format"]);
});

test("does not approve a provider echo of a fuzzy Checkbox label", async () => {
  const entry: PoEntry = {
    msgctxt: "docs.api:prose",
    msgid: "Checkbox\n",
    msgstr: "checkbox",
    obsolete: false,
    fuzzy: true,
    flags: ["fuzzy", "no-c-format"],
    references: ["css/checkbox.md"],
  };
  mocks.parsePo.mockReturnValue([entry]);
  process.env.DOCS_TRANSLATION_LOCALE = "vi";
  mocks.translateBatch.mockImplementation(async (items, onChunk) => {
    onChunk({ [items[0].id]: "Checkbox\n" });
  });

  await import("./translate-api-po.ts");

  expect(entry.msgstr).toBe("checkbox");
  expect(entry.fuzzy).toBe(true);
  expect(entry.flags).toContain("fuzzy");
});
