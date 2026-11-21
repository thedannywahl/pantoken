import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test } from "vite-plus/test";
import { parseConfig, type I18nConfig } from "../src/config.ts";
import { parsePo, serializePo, writeCatalog } from "../src/po.ts";
import { runExtractContent, runRenderContent, runTranslateContent } from "../src/pipeline.ts";
import { formatGeneratedFile } from "../../../scripts/release/format-generated.ts";

let repo: string;
let config: I18nConfig;

/** A content space rooted outside `docs/`, mirroring `scaffold.readme`. */
function makeConfig(segment: "file" | "block"): I18nConfig {
  return parseConfig({
    source: "en",
    locales: {
      registry: "@pantoken/web-components#LOCALES",
      exclude: [],
      tiers: { source: ["en"], primary: ["hu"], secondary: ["*"] },
    },
    spaces: {
      "scaffold.readme": {
        kind: "content",
        include: ["packages/scaffold/templates/*/README.md"],
        root: "packages/scaffold/templates",
        render: "packages/scaffold/generated/l10n/{locale}/{path}",
        transientRender: true,
        segment,
      },
    },
  });
}

beforeEach(() => {
  repo = mkdtempSync(join(tmpdir(), "pantoken-i18n-content-"));
  for (const platform of ["react", "vue"]) {
    mkdirSync(join(repo, "packages/scaffold/templates", platform), { recursive: true });
    writeFileSync(
      join(repo, "packages/scaffold/templates", platform, "README.md"),
      `# {{projectName}}\n\nA ${platform} app.\n`,
    );
  }
  config = makeConfig("file");
});

afterEach(() => {
  rmSync(repo, { recursive: true, force: true });
});

test("extracts a content space whose sources live outside docs/", () => {
  const result = runExtractContent(config, repo, "scaffold.readme");
  expect(result.unitCount).toBe(2);
  const pot = readFileSync(join(repo, "l10n", "scaffold.readme.pot"), "utf8");
  expect(pot).toContain("#: react/README.md");
  expect(pot).toContain("#: vue/README.md");
});

test("anchors catalog references at the space's root, not the repository root", () => {
  runExtractContent(config, repo, "scaffold.readme");
  const pot = readFileSync(join(repo, "l10n", "scaffold.readme.pot"), "utf8");
  expect(pot).not.toContain("packages/scaffold/templates/react/README.md");
});

test("the file segment keeps one whole-Markdown unit per source", () => {
  runExtractContent(config, repo, "scaffold.readme");
  const entries = parsePo(readFileSync(join(repo, "l10n", "scaffold.readme.pot"), "utf8"));
  const units = entries.filter((entry) => entry.msgid !== "");
  expect(units).toHaveLength(2);
  expect(units[0].msgid).toContain("# {{projectName}}");
});

test("the block segment splits the same sources into prose leaves", () => {
  const result = runExtractContent(makeConfig("block"), repo, "scaffold.readme");
  expect(result.unitCount).toBeGreaterThan(2);
});

test("renders each source to its {path}, relative to the include glob's static prefix", async () => {
  runExtractContent(config, repo, "scaffold.readme");
  const result = await runRenderContent(config, repo, "scaffold.readme", "hu");
  expect(result.filesWritten).toHaveLength(2);
  expect(result.filesWritten[0]).toContain(join("generated", "l10n", "hu", "react", "README.md"));
});

test("renders the English source verbatim for an untranslated unit", async () => {
  runExtractContent(config, repo, "scaffold.readme");
  await runRenderContent(config, repo, "scaffold.readme", "hu");
  const rendered = readFileSync(
    join(repo, "packages/scaffold/generated/l10n/hu/react/README.md"),
    "utf8",
  );
  expect(rendered).toBe(
    readFileSync(join(repo, "packages/scaffold/templates/react/README.md"), "utf8"),
  );
});

test("splices a translated whole-file unit into the rendered output", async () => {
  runExtractContent(config, repo, "scaffold.readme");
  const poPath = join(repo, "l10n", "hu", "scaffold.readme.po");
  mkdirSync(join(repo, "l10n", "hu"), { recursive: true });
  const entries = parsePo(readFileSync(join(repo, "l10n", "scaffold.readme.pot"), "utf8"));
  for (const entry of entries) {
    if (entry.msgid.includes("A react app")) entry.msgstr = "# {{projectName}}\n\nEgy react app.\n";
  }
  writeCatalog(poPath, serializePo(entries));

  await runRenderContent(config, repo, "scaffold.readme", "hu");
  const rendered = readFileSync(
    join(repo, "packages/scaffold/generated/l10n/hu/react/README.md"),
    "utf8",
  );
  expect(rendered).toContain("Egy react app.");
  expect(rendered).toContain("{{projectName}}");
});

test("removes stale persistent rendered files when a source file is removed", async () => {
  const persistentConfig = parseConfig({
    source: "en",
    locales: {
      registry: "@pantoken/web-components#LOCALES",
      exclude: [],
      tiers: { source: ["en"], primary: ["hu"], secondary: ["*"] },
    },
    spaces: {
      "scaffold.readme": {
        kind: "content",
        include: ["packages/scaffold/templates/*/README.md"],
        root: "packages/scaffold/templates",
        render: "packages/scaffold/generated/l10n/{locale}/{path}",
        transientRender: false,
        segment: "file",
      },
    },
  });
  runExtractContent(persistentConfig, repo, "scaffold.readme");
  await runRenderContent(persistentConfig, repo, "scaffold.readme", "hu");

  rmSync(join(repo, "packages/scaffold/templates", "vue", "README.md"));
  runExtractContent(persistentConfig, repo, "scaffold.readme");
  await runRenderContent(persistentConfig, repo, "scaffold.readme", "hu");

  expect(existsSync(join(repo, "packages/scaffold/generated/l10n/hu/react/README.md"))).toBe(true);
  expect(existsSync(join(repo, "packages/scaffold/generated/l10n/hu/vue/README.md"))).toBe(false);
});

test("reuses generated table translations with current bindings across locales", async () => {
  const sourcePath = join(repo, "packages/scaffold/templates/react/README.md");
  const source =
    "<!-- pantoken-generated-values -->\n# Support\n\n| Package | Version |\n| --- | --- |\n| `pkg` | `1.0` |\n";
  writeFileSync(sourcePath, source);
  runExtractContent(config, repo, "scaffold.readme");
  const entries = parsePo(readFileSync(join(repo, "l10n/scaffold.readme.pot"), "utf8"));
  const generated = entries.find((entry) => entry.references.includes("react/README.md"));
  expect(generated).toBeDefined();
  for (const locale of ["hu", "de"]) {
    mkdirSync(join(repo, "l10n", locale), { recursive: true });
    writeCatalog(
      join(repo, "l10n", locale, "scaffold.readme.po"),
      serializePo(
        entries.map((entry) => ({
          ...entry,
          msgstr:
            entry === generated ? entry.msgid.replace("Support", `${locale} support`) : entry.msgid,
        })),
      ),
    );
  }
  writeFileSync(sourcePath, source.replace("`1.0`", "`123.45.6`"));
  runExtractContent(config, repo, "scaffold.readme");
  const updated = parsePo(readFileSync(join(repo, "l10n/scaffold.readme.pot"), "utf8")).find(
    (entry) => entry.references.includes("react/README.md"),
  );
  expect(updated?.msgid).toBe(generated?.msgid);
  for (const locale of ["hu", "de"]) {
    await runRenderContent(config, repo, "scaffold.readme", locale);
    const rendered = readFileSync(
      join(repo, "packages/scaffold/generated/l10n", locale, "react/README.md"),
      "utf8",
    );
    expect(rendered).toContain(`${locale} support`);
    expect(rendered).toContain("`123.45.6`");
    expect(rendered).not.toContain("{{ptk_code_");
    expect(rendered).not.toContain("pantoken-generated-values");
  }
});

test("does not render a generated whole-file template from an incomplete catalog", async () => {
  writeFileSync(
    join(repo, "packages/scaffold/templates/react/README.md"),
    "<!-- pantoken-generated-values -->\n| Package | Version |\n| --- | --- |\n| `pkg` | `1.0` |\n",
  );
  runExtractContent(config, repo, "scaffold.readme");
  await expect(runRenderContent(config, repo, "scaffold.readme", "hu")).rejects.toThrow(
    "missing reviewed generated-value translation",
  );
});

test("extracts compatibility rows independently and renders current values to the locale root", async () => {
  const guides = parseConfig({
    source: "en",
    locales: {
      registry: "@pantoken/web-components#LOCALES",
      exclude: [],
      tiers: { source: ["en"], primary: ["hu"], secondary: ["*"] },
    },
    spaces: {
      "docs.guides": {
        kind: "content",
        include: ["docs/compatibility.md"],
        root: "docs",
        render: "docs/{locale}/guide/{path}",
        transientRender: false,
        segment: "file",
      },
    },
  });
  mkdirSync(join(repo, "docs"), { recursive: true });
  const sourcePath = join(repo, "docs/compatibility.md");
  const source =
    "# Compatibility\n\n<!-- pantoken-generated-values -->\n\n| Package | Version |\n| --- | --- |\n| `pkg` | `1.0` |\n";
  writeFileSync(sourcePath, source);
  runExtractContent(guides, repo, "docs.guides");
  const entries = parsePo(readFileSync(join(repo, "l10n/docs.guides.pot"), "utf8"));
  expect(entries.filter((entry) => entry.references.includes("compatibility.md"))).toHaveLength(3);
  mkdirSync(join(repo, "l10n/hu"), { recursive: true });
  writeCatalog(
    join(repo, "l10n/hu/docs.guides.po"),
    serializePo(entries.map((entry) => ({ ...entry, msgstr: entry.msgid }))),
  );
  writeFileSync(sourcePath, source.replace("`1.0`", "`2.0`"));
  await runRenderContent(guides, repo, "docs.guides", "hu");
  const guidePath = join(repo, "docs/hu/compatibility.md");
  const rendered = readFileSync(guidePath, "utf8");
  expect(rendered).toContain("`2.0`");
  expect(rendered).not.toContain("| --- | --- |");
  expect(await formatGeneratedFile(rendered, guidePath)).toBe(rendered);
  await runRenderContent(guides, repo, "docs.guides", "hu");
  expect(readFileSync(guidePath, "utf8")).toBe(rendered);
  expect(existsSync(join(repo, "docs/hu/guide/compatibility.md"))).toBe(false);
  const command = process.env.I18N_TRANSLATION_COMMAND;
  delete process.env.I18N_TRANSLATION_COMMAND;
  try {
    await runTranslateContent(guides, repo, "docs.guides", "hu");
    const catalog = parsePo(readFileSync(join(repo, "l10n/hu/docs.guides.po"), "utf8"));
    expect(
      catalog.filter((entry) => !entry.obsolete && (entry.fuzzy || !entry.msgstr)),
    ).toHaveLength(0);
    writeFileSync(
      sourcePath,
      source.replace("| `pkg` | `1.0` |", "| `pkg` | `2.0` |\n| `new` | `1.0` |"),
    );
    await runTranslateContent(guides, repo, "docs.guides", "hu");
    const updated = parsePo(readFileSync(join(repo, "l10n/hu/docs.guides.po"), "utf8"));
    expect(
      updated.filter((entry) => !entry.obsolete && (entry.fuzzy || !entry.msgstr)),
    ).toHaveLength(1);
    await expect(runRenderContent(guides, repo, "docs.guides", "hu")).rejects.toThrow(
      "missing reviewed compatibility translation",
    );
  } finally {
    if (command === undefined) delete process.env.I18N_TRANSLATION_COMMAND;
    else process.env.I18N_TRANSLATION_COMMAND = command;
  }
});
