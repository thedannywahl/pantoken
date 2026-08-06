import { nextTick, ref } from "vue";
import { describe, expect, it, vi } from "vite-plus/test";

const codeToHtml = vi.fn((code: string, options: { lang: string }) => `${options.lang}:${code}`);
let releaseHighlighter!: () => void;
const highlighterReady = new Promise<void>((resolve) => {
  releaseHighlighter = resolve;
});

vi.mock("shiki", () => ({
  createHighlighter: vi.fn(async () => {
    await highlighterReady;
    return { codeToHtml };
  }),
}));

describe("useShikiHighlight", () => {
  it("rehighlights when code and language change", async () => {
    const { useShikiHighlight } = await import("./useShikiHighlight");
    const code = ref("first");
    const lang = ref("html");
    const highlighted = useShikiHighlight(code, lang);

    // Change both inputs while Shiki is still loading. The initial pass must not win the race.
    code.value = "second";
    lang.value = "css";
    await nextTick();
    releaseHighlighter();
    await vi.waitFor(() => expect(highlighted.value).toBe("css:second"));

    // Once loaded, later picker selections must continue to refresh the highlighted block.
    code.value = "third";
    await nextTick();
    await vi.waitFor(() => expect(highlighted.value).toBe("css:third"));

    expect(codeToHtml).toHaveBeenCalledTimes(2);
  });
});
