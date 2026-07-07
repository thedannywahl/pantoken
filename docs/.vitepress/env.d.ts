/// <reference types="vite/client" />

declare module "*.css";

// Let TypeScript resolve single-file component imports (e.g. the mermaid plugin's index.vue).
declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
