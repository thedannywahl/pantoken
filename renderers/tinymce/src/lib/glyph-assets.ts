/**
 * Keeps icon/logo glyphs that arrive without a picker — paste, `setContent`, preset restore, or
 * source-view edits — shaped and painted like picker inserts: empty glyph spans get the
 * zero-width-space/`contenteditable="false"` shape (so TinyMCE's empty-inline cleanup keeps them),
 * and every glyph in the body gets its stylesheet injected into the content document.
 *
 * \@module
 */
import type { CdnFile } from "@pantoken/cdn";
import type { Editor } from "tinymce";
import { trackAndInjectAsset } from "../content-css.js";
import type { MissingAssetHandler } from "../types.js";

const GLYPH_SELECTOR = "span.instui-icon, span.instui-logo";

/** Give every empty glyph span in `html` the non-editable, ZWSP-filled shape the pickers insert. */
export function normalizeGlyphHtml(html: string, doc: Document): string {
  if (!/instui-(?:icon|logo)/u.test(html)) return html;
  const template = doc.createElement("template");
  template.innerHTML = html;
  let changed = false;
  for (const span of template.content.querySelectorAll<HTMLElement>(GLYPH_SELECTOR)) {
    if (span.getAttribute("contenteditable") !== "false") {
      span.setAttribute("contenteditable", "false");
      changed = true;
    }
    if (!span.textContent) {
      span.textContent = "\u200B";
      changed = true;
    }
  }
  return changed ? template.innerHTML : html;
}

/** Where {@link registerGlyphSync} tracks and resolves the stylesheets it injects. */
export interface GlyphSyncTarget {
  currentAssets: CdnFile[];
  onMissingAsset?: MissingAssetHandler;
  buildAssetUrl?: (file: CdnFile) => string;
}

/** Inject the stylesheet of every glyph `resolve` finds in the editor body. */
export function injectUsedGlyphAssets(
  editor: Editor,
  resolve: (root: ParentNode) => CdnFile[],
  target: GlyphSyncTarget,
): void {
  const body = editor.getBody();
  if (!body) return;
  for (const file of resolve(body)) trackAndInjectAsset(editor, file, target);
}

/** Normalize incoming glyph markup and inject stylesheets for glyphs however they arrive. */
export function registerGlyphSync(
  editor: Editor,
  resolve: (root: ParentNode) => CdnFile[],
  target: GlyphSyncTarget,
): void {
  const normalize = (event: { content?: unknown }): void => {
    if (typeof event.content === "string") {
      event.content = normalizeGlyphHtml(event.content, editor.getDoc() ?? document);
    }
  };
  editor.on("BeforeSetContent", normalize);
  editor.on("PastePreProcess", normalize);
  editor.on("init SetContent input change Undo Redo", () =>
    injectUsedGlyphAssets(editor, resolve, target),
  );
}
