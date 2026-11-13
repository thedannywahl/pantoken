import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  A2UI_COMPONENTS,
  a2uiNameForElement,
} from "../../renderers/web-components/src/a2ui-contracts.ts";
import { ELEMENTS } from "../../renderers/web-components/src/lib/elements-meta.ts";
import { buildRegistryCatalog } from "./generate-registry.ts";
import { runAsMain } from "../../scripts/release/cli.ts";

type Message = { message: string; translate: "always" };

/** Extract visible catalog prose without changing either public catalog. */
export function catalogMessages(): Record<string, Message> {
  const messages: Record<string, Message> = {};
  const add = (key: string, message: string) => {
    messages[key] = { message, translate: "always" };
  };
  for (const element of ELEMENTS) {
    add(
      `a2uiCatalogDescriptions.${a2uiNameForElement(element)}`,
      A2UI_COMPONENTS[element].description,
    );
  }
  for (const item of buildRegistryCatalog().items) {
    if (item.title) add(`registryBrowserItems.${item.name}.title`, item.title);
    if (item.description) add(`registryBrowserItems.${item.name}.description`, item.description);
  }
  return messages;
}

/** Keep the source used by docs.chrome extraction and the locale runtime in sync. */
export function writeCatalogMessages(check = false): void {
  const path = resolve(import.meta.dirname, "../.vitepress/catalog-i18n.json");
  const output = `${JSON.stringify(catalogMessages(), null, 2)}\n`;
  if (check) {
    if (readFileSync(path, "utf8") !== output) {
      throw new Error("Catalog translation source is stale; run node docs/scripts/catalog-i18n.ts");
    }
  } else {
    writeFileSync(path, output);
  }
}

runAsMain(import.meta.url, async () => writeCatalogMessages(process.argv.includes("--check")));
