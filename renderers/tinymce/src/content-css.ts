/**
 * Wires pantoken's CDN-hosted CSS into TinyMCE: the initial `content_css` list (feature 1 — the
 * WYSIWYG editing surface renders with real pantoken styles, not just a separate preview pane),
 * plus a runtime primitive to add one more stylesheet after init (reused by the components/icons/
 * logos pickers for feature 3's dynamic `@import` behavior — TinyMCE has no supported way to mutate
 * `content_css` after `init()` runs, so a picker's "missing asset" instead injects a `<link>`
 * directly into the editor's content document).
 *
 * \@module
 */
import { buildFileUrl, buildFileUrls } from "@pantoken/cdn";
import type { CdnFile, CdnProvider } from "@pantoken/cdn";
import type { Editor } from "tinymce";
import type { MissingAssetHandler } from "./types.js";

/** Resolves a set of {@link CdnFile}s to URLs suitable for TinyMCE's `content_css` init option. */
export function pantokenContentCssUrls(
  assets: readonly CdnFile[],
  provider?: string | CdnProvider,
): string[] {
  return buildFileUrls([...assets], provider);
}

const ASSET_ATTR = "data-pantoken-asset";

function assetKey(file: CdnFile): string {
  return `${file.package}:${file.path ?? ""}`;
}

/**
 * Appends a `<link rel="stylesheet">` to the editor's content document `<head>` at runtime.
 * Idempotent per URL — calling this twice with the same `url` is a no-op the second time. Pass the
 * `file` the URL resolves so {@link retargetContentStylesheets} can re-point it later; a tagged
 * link is idempotent per file instead, and a new URL for the same file updates it in place.
 */
export function injectContentStylesheet(editor: Editor, url: string, file?: CdnFile): void {
  const doc = editor.getDoc();
  const key = file && assetKey(file);
  const existing = key
    ? [...doc.head.querySelectorAll<HTMLLinkElement>(`link[${ASSET_ATTR}]`)].find(
        (link) => link.getAttribute(ASSET_ATTR) === key,
      )
    : doc.head.querySelector<HTMLLinkElement>(`link[href="${url}"]`);
  if (existing) {
    if (existing.getAttribute("href") !== url) existing.href = url;
    return;
  }
  const link = doc.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  if (key) link.setAttribute(ASSET_ATTR, key);
  doc.head.append(link);
}

/** Re-resolve every tagged stylesheet in the content document, e.g. after a CDN provider switch. */
export function retargetContentStylesheets(
  editor: Editor,
  buildAssetUrl: (file: CdnFile) => string,
): void {
  const links = editor.getDoc().head.querySelectorAll<HTMLLinkElement>(`link[${ASSET_ATTR}]`);
  for (const link of links) {
    const key = link.getAttribute(ASSET_ATTR) ?? "";
    const split = key.indexOf(":");
    const path = key.slice(split + 1);
    const url = buildAssetUrl({ package: key.slice(0, split), ...(path ? { path } : {}) });
    if (link.getAttribute("href") !== url) link.href = url;
  }
}

/**
 * Tracks `cssFile` in `currentAssets` (once per path, notifying `onMissingAsset`) and injects its
 * stylesheet into the editor's content area — the shared "insert an item whose CSS isn't loaded
 * yet" tail shared by the components/icons/logos pickers.
 */
export function trackAndInjectAsset(
  editor: Editor,
  cssFile: CdnFile,
  target: {
    currentAssets: CdnFile[];
    onMissingAsset?: MissingAssetHandler;
    /** Resolve the CSS file to a local or CDN URL. Defaults to the default CDN provider. */
    buildAssetUrl?: (file: CdnFile) => string;
  },
): void {
  if (!target.currentAssets.find((a) => a.path === cssFile.path)) {
    target.currentAssets.push(cssFile);
    target.onMissingAsset?.(cssFile);
  }
  const cssUrl = (target.buildAssetUrl ?? buildFileUrl)(cssFile);
  injectContentStylesheet(editor, cssUrl, cssFile);
}
