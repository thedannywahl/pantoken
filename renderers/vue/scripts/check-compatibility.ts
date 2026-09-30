import { fileURLToPath } from "node:url";
import { withTargetVersion } from "../../../scripts/quality/with-target-version.ts";
import { commandTargetVersions } from "../../../scripts/release/target-versions.ts";

/** Install the plugin in a real Vue SSR app and render an InstUI custom element. */
export async function checkCompatibility(version: string): Promise<void> {
  if (!/^3\.\d+\.\d+$/u.test(version)) throw new Error(`Invalid Vue 3 release: ${version}`);
  await withTargetVersion(
    "vue",
    version,
    async (require) => {
      const vue = require("vue") as {
        createSSRApp(root: { render(): unknown }): {
          config: { compilerOptions?: { isCustomElement?: (tag: string) => boolean } };
          use(plugin: { install(app: unknown): void }): void;
        };
        h(tag: string, props: Record<string, string>): unknown;
      };
      const serverRenderer = require("@vue/server-renderer") as {
        renderToString(app: unknown): Promise<string>;
      };
      const { PantokenVue, readToken } = await import("../dist/index.mjs");
      const app = vue.createSSRApp({
        render: () => vue.h("instui-icon", { name: "check-mark" }),
      });
      app.use(PantokenVue);
      const html = await serverRenderer.renderToString(app);
      if (!html.includes("<instui-icon") || !html.includes('name="check-mark"')) {
        throw new Error(`Vue ${version} did not render the InstUI custom element`);
      }
      if (!app.config.compilerOptions?.isCustomElement?.("instui-icon")) {
        throw new Error(`Vue ${version} did not configure InstUI custom elements`);
      }
      if (readToken("--instui-color-background-brand", "fallback") !== "fallback") {
        throw new Error(`Vue ${version} did not return the SSR token fallback`);
      }
      console.log(`✓ Vue ${version}: plugin installs and SSR renders an InstUI custom element`);
    },
    [`@vue/server-renderer@${version}`],
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const release of commandTargetVersions("@pantoken/vue")) await checkCompatibility(release);
}
