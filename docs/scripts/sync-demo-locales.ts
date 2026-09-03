/** Keep docs.demos PO catalogs and localized demo assets synchronized. */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  loadConfig,
  parsePo,
  runExtractMessages,
  runTranslateMessages,
} from "@pantoken/i18n-engine";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { listDemoNames, loadDemoI18n, renderDemoI18n } from "./demo-i18n.ts";

const repoRoot = new URL("../../", import.meta.url).pathname;
const docsRoot = join(repoRoot, "docs");
const config = loadConfig(join(repoRoot, "i18n.config.json"));
const names = listDemoNames(join(docsRoot, "demos"));

runExtractMessages(config, repoRoot, "docs.demos");
for (const locale of NON_ROOT_LOCALES) {
  await runTranslateMessages(config, repoRoot, "docs.demos", locale);
  const entries = parsePo(readFileSync(join(repoRoot, "l10n", locale, "docs.demos.po"), "utf8"));
  const translations = new Map(
    entries
      .filter((entry) => entry.msgstr !== "" && entry.msgctxt !== undefined)
      .map((entry) => [entry.msgctxt!, entry.msgstr]),
  );
  const outDir = join(docsRoot, locale, "demos");
  mkdirSync(outDir, { recursive: true });
  for (const name of names) {
    const demo = loadDemoI18n(join(docsRoot, "demos", name));
    const strings = Object.fromEntries(
      Object.entries(demo.strings).map(([key, source]) => [
        key,
        translations.get(`docs.demos:${name}:${key}`) ?? source,
      ]),
    );
    writeFileSync(join(outDir, `${name}.html`), renderDemoI18n(demo.template, strings));
    for (const [file, source] of Object.entries(demo.assets)) {
      writeFileSync(
        join(outDir, `${name}.${file.slice(file.lastIndexOf(".") + 1)}`),
        renderDemoI18n(source, strings),
      );
    }
  }
}
