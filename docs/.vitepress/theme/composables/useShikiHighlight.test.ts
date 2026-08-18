import { nextTick, ref } from "vue";
import { describe, expect, it, vi } from "vite-plus/test";

const codeToHtml = vi.fn(
  (
    _code: string,
    options: {
      lang: string;
      themes?: { light: string; dark: string };
      defaultColor?: boolean;
    },
  ) =>
    options.defaultColor === false
      ? `<pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">${options.lang}</span></span></code></pre>`
      : `<pre class="shiki" style="background-color:#fff;color:#24292e;"><code>${options.lang}</code></pre>`,
);
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
    await vi.waitFor(() => expect(highlighted.value).toContain("--shiki-light:"));

    // Once loaded, later picker selections must continue to refresh the highlighted block.
    code.value = "third";
    await nextTick();
    await vi.waitFor(() => expect(highlighted.value).toContain(">css<"));

    expect(codeToHtml).toHaveBeenCalledTimes(2);
    expect(codeToHtml).toHaveBeenNthCalledWith(1, "second", {
      lang: "css",
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
    expect(codeToHtml).toHaveBeenNthCalledWith(2, "third", {
      lang: "css",
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
    expect(highlighted.value).not.toContain("background-color:");
    expect(highlighted.value).toContain("--shiki-dark-bg:");
  });
});
