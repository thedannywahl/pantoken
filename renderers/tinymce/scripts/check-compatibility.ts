import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";

const releases = ["8.9.2"];

/** Register the Pantoken plugin in TinyMCE's real PluginManager and initialize its callback. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^8\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid TinyMCE 8 release: ${version}`);
  await withTargetVersion(
    "tinymce",
    version,
    async (require) => {
      const { Window } = require("happy-dom") as {
        Window: new (options?: { url: string }) => Window;
      };
      const dom = new Window({ url: "http://localhost/" });
      const domGlobals = dom as unknown as {
        HTMLElement: typeof HTMLElement;
        customElements: CustomElementRegistry;
      };
      globalThis.window = dom as unknown as Window & typeof globalThis;
      globalThis.document = dom.document as unknown as Document;
      Object.defineProperty(globalThis, "navigator", { value: dom.navigator, configurable: true });
      globalThis.HTMLElement = domGlobals.HTMLElement;
      globalThis.customElements = domGlobals.customElements;

      const tinymce = require("tinymce/tinymce") as {
        PluginManager: {
          add(name: string, plugin: (editor: never) => unknown): void;
          get(name: string): ((editor: never) => unknown) | undefined;
        };
      };
      const { createPantokenPlugin, PANTOKEN_PLUGIN_NAME } = await import("../dist/index.mjs");
      const options = {
        components: { model: [], currentAssets: [] },
        icons: { icons: [], currentAssets: [] },
        logos: { logos: [], products: [], currentAssets: [] },
      };
      tinymce.PluginManager.add(PANTOKEN_PLUGIN_NAME, (editor) =>
        createPantokenPlugin(options)(editor),
      );
      const plugin = tinymce.PluginManager.get(PANTOKEN_PLUGIN_NAME);
      if (!plugin) throw new Error(`TinyMCE ${version} did not register the Pantoken plugin`);

      const registry = {
        addButton() {},
        addMenuItem() {},
        addIcon() {},
        addMenuButton() {},
        addAutocompleter() {},
        addContextToolbar() {},
      };
      const editor = {
        editorManager: { Resource: { add() {} } },
        on() {},
        dom: { select: () => [] },
        addCommand() {},
        execCommand() {},
        ui: { registry },
        getContainer: () => document.createElement("div"),
        windowManager: { open() {}, confirm() {} },
      };
      plugin(editor as never);
      console.log(`✓ TinyMCE ${version}: real PluginManager registered and initialized Pantoken`);
    },
    ["happy-dom@20.14.5"],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of releases) await checkCompatibility(release);
}
