/// <reference types="vite/client" />

declare module "*.css";

declare module "vitepress/dist/client/theme-default/composables/langs.js" {
  import type { ComputedRef } from "vue";
  export function useLangs(options?: { correspondingLink?: boolean }): {
    localeLinks: ComputedRef<
      { text: string; link: string; lang: string | undefined; dir: string | undefined }[]
    >;
    currentLang: ComputedRef<{ label: string | undefined; link: string }>;
  };
}

// Let TypeScript resolve single-file component imports (e.g. the mermaid plugin's index.vue).
declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
