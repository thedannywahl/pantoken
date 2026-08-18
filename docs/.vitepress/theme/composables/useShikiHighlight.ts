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

  watchEffect(async (onCleanup) => {
    // Vue only tracks reactive reads made before the first await. Capture both inputs up front so
    // every picker selection and format change starts a fresh highlight pass.
    const currentCode = code.value;
    const currentLang = lang.value;
    let cancelled = false;
    onCleanup(() => {
      cancelled = true;
    });

    const hl = await getHighlighter();
    // The first Shiki load can finish after a newer selection has already queued another pass.
    // Ignore that stale run rather than briefly replacing the latest output with old code.
    if (cancelled) return;
    highlighted.value = hl.codeToHtml(currentCode, {
      lang: currentLang,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
  });

  return highlighted;
}
