import { ref, watchEffect, type Ref } from "vue";
import type { HighlighterGeneric } from "shiki";

// One shared highlighter instance across all picker components.
let highlighterPromise: Promise<HighlighterGeneric<never, never>> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: ["html", "css", "js"],
      }),
    );
  }
  return highlighterPromise;
}

/** Returns highlighted HTML for `code` in `lang`, or `null` while the highlighter is loading. */
export function useShikiHighlight(code: Ref<string>, lang: Ref<string>): Ref<string | null> {
  const highlighted = ref<string | null>(null);

  watchEffect(async () => {
    const hl = await getHighlighter();
    highlighted.value = hl.codeToHtml(code.value, {
      lang: lang.value,
      themes: { light: "github-light", dark: "github-dark" },
    });
  });

  return highlighted;
}
