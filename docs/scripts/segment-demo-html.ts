/**
 * Split a self-hosted demo HTML fragment (`docs/demos/*.html`) into translatable prose text nodes vs.
 * verbatim markup, so `translate-demos.ts` can localize captions/labels without touching tags,
 * attributes (including `aria-*`/`title`), comments, or `<script>`/`<style>` contents.
 *
 * Deliberately narrower than a real HTML parser: it only needs to find text runs between tags outside
 * `<script>`/`<style>`, which these small, hand-written demo fragments never nest ambiguously.
 * `reassembleDemoHtml(segmentDemoHtml(html), (t) => t)` is the identity — the split is lossless.
 *
 * @module
 */

/** One run of a segmented demo HTML fragment — translatable prose or verbatim markup. */
export interface DemoSegment {
  kind: "prose" | "preserve";
  text: string;
}

/** Segment `html` into prose (translatable text nodes) and preserve (tags, comments, script/style) runs. */
export function segmentDemoHtml(html: string): DemoSegment[] {
  const segments: DemoSegment[] = [];
  let i = 0;
  let inScript = false;
  let inStyle = false;
  // <code> wraps inline snippets (attribute/class names like `transition="fade"`, `-without-shadow`)
  // that read as prose (they contain letters) but must stay verbatim, same as markdown inline code.
  let inCode = false;

  while (i < html.length) {
    if (html.startsWith("<!--", i)) {
      const end = html.indexOf("-->", i + 4);
      const stop = end === -1 ? html.length : end + 3;
      segments.push({ kind: "preserve", text: html.slice(i, stop) });
      i = stop;
      continue;
    }

    if (html[i] === "<") {
      const close = html.indexOf(">", i);
      const stop = close === -1 ? html.length : close + 1;
      const tagText = html.slice(i, stop);
      segments.push({ kind: "preserve", text: tagText });
      const nameMatch = /^<\/?\s*([a-zA-Z][\w-]*)/.exec(tagText);
      const name = nameMatch?.[1]?.toLowerCase();
      const isClosing = tagText.startsWith("</");
      if (name === "script") inScript = !isClosing;
      if (name === "style") inStyle = !isClosing;
      if (name === "code") inCode = !isClosing;
      i = stop;
      continue;
    }

    const nextTag = html.indexOf("<", i);
    const stop = nextTag === -1 ? html.length : nextTag;
    const text = html.slice(i, stop);
    // Only a run with a letter is worth translating — pure whitespace/punctuation/numbers stay verbatim.
    const isProse = !inScript && !inStyle && !inCode && /\p{L}/u.test(text);
    segments.push({ kind: isProse ? "prose" : "preserve", text });
    i = stop;
  }

  return segments;
}

/** Collect the unique prose texts in `segments`, in first-seen order. */
export function collectDemoUnits(segments: readonly DemoSegment[]): string[] {
  const seen = new Set<string>();
  for (const segment of segments) {
    if (segment.kind === "prose") seen.add(segment.text);
  }
  return [...seen];
}

/** Rebuild HTML from `segments`, translating each prose run through `resolve`. */
export function reassembleDemoHtml(
  segments: readonly DemoSegment[],
  resolve: (text: string) => string,
): string {
  return segments.map((s) => (s.kind === "prose" ? resolve(s.text) : s.text)).join("");
}
