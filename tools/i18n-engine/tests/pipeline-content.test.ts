import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test } from "vite-plus/test";
import { parseConfig, type I18nConfig } from "../src/config.ts";
import { parsePo, serializePo, writeCatalog } from "../src/po.ts";
import { runExtractContent, runRenderContent } from "../src/pipeline.ts";

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

test("renders each source to its {path}, relative to the include glob's static prefix", () => {
  runExtractContent(config, repo, "scaffold.readme");
  const result = runRenderContent(config, repo, "scaffold.readme", "hu");
  expect(result.filesWritten).toHaveLength(2);
  expect(result.filesWritten[0]).toContain(join("generated", "l10n", "hu", "react", "README.md"));
});

test("renders the English source verbatim for an untranslated unit", () => {
  runExtractContent(config, repo, "scaffold.readme");
  runRenderContent(config, repo, "scaffold.readme", "hu");
  const rendered = readFileSync(
    join(repo, "packages/scaffold/generated/l10n/hu/react/README.md"),
    "utf8",
  );
  expect(rendered).toBe(
    readFileSync(join(repo, "packages/scaffold/templates/react/README.md"), "utf8"),
  );
});

test("splices a translated whole-file unit into the rendered output", () => {
  runExtractContent(config, repo, "scaffold.readme");
  const poPath = join(repo, "l10n", "hu", "scaffold.readme.po");
  mkdirSync(join(repo, "l10n", "hu"), { recursive: true });
  const entries = parsePo(readFileSync(join(repo, "l10n", "scaffold.readme.pot"), "utf8"));
  for (const entry of entries) {
    if (entry.msgid.includes("A react app")) entry.msgstr = "# {{projectName}}\n\nEgy react app.\n";
  }
  writeCatalog(poPath, serializePo(entries));

  runRenderContent(config, repo, "scaffold.readme", "hu");
  const rendered = readFileSync(
    join(repo, "packages/scaffold/generated/l10n/hu/react/README.md"),
    "utf8",
  );
  expect(rendered).toContain("Egy react app.");
  expect(rendered).toContain("{{projectName}}");
});
