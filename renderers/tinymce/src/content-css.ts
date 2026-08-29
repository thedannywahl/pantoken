/**
 * Wires pantoken's CDN-hosted CSS into TinyMCE: the initial `content_css` list (feature 1 — the
 * WYSIWYG editing surface renders with real pantoken styles, not just a separate preview pane),
 * plus a runtime primitive to add one more stylesheet after init (reused by the components/icons/
 * logos pickers for feature 3's dynamic `@import` behavior — TinyMCE has no supported way to mutate
 * `content_css` after `init()` runs, so a picker's "missing asset" instead injects a `<link>`
 * directly into the editor's content document).
 *
 * @module
 */
import { buildFileUrls } from "@pantoken/cdn";
import type { CdnFile, CdnProvider } from "@pantoken/cdn";
import type { Editor } from "tinymce";

/** Resolves a set of {@link CdnFile}s to URLs suitable for TinyMCE's `content_css` init option. */
export function pantokenContentCssUrls(
  assets: readonly CdnFile[],
  provider?: string | CdnProvider,
): string[] {
  return buildFileUrls([...assets], provider);
}

/**
 * Appends a `<link rel="stylesheet">` to the editor's content document `<head>` at runtime.
 * Idempotent per URL — calling this twice with the same `url` is a no-op the second time.
 */
export function injectContentStylesheet(editor: Editor, url: string): void {
  const head = editor.getDoc().head;
  if (head.querySelector(`link[href="${url}"]`)) return;
  const link = editor.getDoc().createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  head.append(link);
}
