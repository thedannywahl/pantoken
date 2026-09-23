# {{projectName}}

Upload-ready assets for Canvas LMS's **Theme Editor**, plus a local preview for authoring Rich
Content Editor (RCE) page templates styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components).

## What's here

- `theme.css` / `theme.js` — upload these two files under **Theme Editor → Advanced** in Canvas.
  They're built for the CDN provider/theme/mode you chose when scaffolding (`--cdn`/`--theme`/
  `--theme-mode`; jsDelivr/rebrand/light by default) and include a loader for
  `@pantoken/interactions` (wires up component behaviors like modal, tooltip, and drilldown).
- `index.html` / `src/main.ts` — a local, TinyMCE-based editor (`npm run dev`) that mirrors Canvas's
  RCE so you can author page templates against pantoken's classes before copying them into Canvas.
  The page itself is built with pantoken's `wrapper` layout: click **Edit theme** to open a tray
  with **Config** / **CSS** / **JS** tabs (CDN provider/theme/mode selects, and blank CSS/JS
  editors for custom overrides that get appended to `theme.css`/`theme.js`), and the **?** button
  for full instructions. Use the **Layouts** toolbar button to start from one of pantoken's bundled
  starter page layouts (course home, header, footer, about me, syllabus, hero, callout, two-column,
  rubric note, testimonial), sourced from
  [`@pantoken/plugin-layouts`](https://www.npmjs.com/package/@pantoken/plugin-layouts).

## Develop

```sh
npm install
npm run dev
```

This opens a Vite dev server with:

- An **editor** pane on top (TinyMCE, matching the version/config
  [instructure/canvas-lms](https://github.com/instructure/canvas-lms) itself uses — see below),
  styled live with the real CDN CSS for the chosen provider/theme/mode, so WYSIWYG editing looks
  like the page will once uploaded to Canvas. Use the **Layouts** button to load one of the bundled
  starter layouts (this replaces the whole document, after a confirm, rather than inserting at the
  cursor), the **Accessibility** button to check common image, heading, table, link, and list
  issues, and the **Source code** toggle to hand-edit the raw HTML in a syntax-highlighted
  (CodeMirror) view alongside the editor, with the preview pane updating live as you type — unlike
  TinyMCE's stock `code` plugin, which edits in a one-shot modal dialog with no live preview.
  Also enabled: **Image** (URL-only — the Upload tab is hidden, so images are always linked, never
  embedded as base64), **Fullscreen**, **Find and replace**, **Quickbars** (a contextual formatting
  toolbar on text selection, an insert toolbar for images/tables/media/placeholders, and an
  alignment/edit toolbar on selected images), **Word count** (status bar), **Autosave** (drafts
  persist to the browser's `localStorage`), and **Presets** (explicit named snapshots).
- A **preview** pane underneath, showing the editor's content with the current CSS/JS tab's
  stylesheet/script applied plus CDN `<link>` tags or inlined styles for picker-inserted
  icon/component assets, wrapped to match Canvas's own content-area background and max width — a faithful "what
  this will look like once uploaded to Canvas" check, updated live as you type or edit the theme.
- The **Edit theme** tray's **Config** tab holds the CDN provider/theme/mode selects and
  **Download theme.css** / **Download theme.js** links; its **CSS**/**JS** tabs start blank —
  anything you add there is appended to the generated `theme.css`/`theme.js`, both in the live
  preview and in the downloaded files, so custom overrides survive Config select changes instead
  of being regenerated away.

### Named presets

The TinyMCE **Presets** menu provides **Save**, **Save as...**, **Open...**, and **Delete...**. A
preset captures the editor HTML together with the active theme, color scheme, light/adaptive mode,
CDN provider, custom CSS, and custom JavaScript. Names are unique without regard to case; **Save
as...** asks before replacing an existing name, and **Open...** asks before discarding changes made
since the last open or save. Deleting a preset does not clear the current working document.

Presets and Autosave serve different purposes and use separate localStorage keys. Autosave remains
short-lived draft recovery; presets open only when selected and never replace an Autosave draft on
reload. Both are local to this browser origin and are not uploaded or synchronized to Canvas.
Private browsing, disabled storage, or storage quota limits can prevent a preset from being saved.
Preset HTML, CSS, and JavaScript are trusted author input and are restored without sanitization.

## Workflow

1. Upload `theme.css` and `theme.js` to Canvas's Theme Editor (**Advanced → CSS / JavaScript**) so
   pantoken's classes are available on every page.
2. Run `npm run dev`, use **Layouts** to start from a bundled starter, and edit it like you
   would in Canvas's own RCE.
3. Click **Copy HTML** and paste the result into a Canvas page's RCE (switch to the HTML editor
   view first). Canvas sanitizes pasted HTML server-side — this scaffold doesn't attempt to
   replicate that, so always verify the pasted result in Canvas (see "Notes on Canvas's RCE"
   below).

Copied HTML has one outer `<div data-pantoken-color="navy">` wrapper. The color picker updates that
editable attribute, and you can change it directly in the HTML source view to any supported color
namespace, such as `sea`. Keep the page content inside the wrapper so the uploaded `theme.css` can
scope the selected color to that Canvas page.

Use the **Placeholder image** button to insert a PNG from
[`placehold.co`](https://placehold.co/) with custom dimensions, colors, visible text, and alt text.
The preview and the resulting Canvas page need network access to `https://placehold.co` to render
these images. The existing **Image** button remains available for other remote image URLs.

### Class-aware editing commands

The editor enables `@pantoken/tinymce`'s content-classes plugin. Stock TinyMCE actions add the
matching pantoken classes to paragraphs, headings, inline links, images, alignment, lists, and
tables. Existing classes are preserved, and repeated edits don't duplicate them. Placeholder and
product-logo images also include `instui-img` directly.

Hosts that build their own Canvas-style toolbar can import `PANTOKEN_COMMANDS` from
`@pantoken/tinymce` and pass those command names to their buttons. The aliases cover paragraph and
H2-H6 formats, semantic `xs` through `xl` font sizes, inline formatting, colors, links, images,
alignment, lists, and tables. Underline, arbitrary font/highlight colors, superscript, and
subscript retain TinyMCE's semantic elements or inline styles because pantoken doesn't define
equivalent component modifiers.

## Notes on Canvas's RCE

The Canvas Rich Content Editor runs TinyMCE and sanitizes submitted HTML on the server against an
allowlist (`gems/canvas_sanitize` in canvas-lms, kept in sync with TinyMCE's own
`valid_elements`/`extended_valid_elements`). What that allowlist means for templates built here:

- `class`, `id`, `style`, `title`, `role`, and `aria-*` attributes are allowed on every element —
  pantoken's `class="instui-*"` styling hooks (and inline `style`, e.g. for CSS anchor positioning)
  **do** survive being pasted and saved, contrary to older guidance in this file. `<script>` tags
  are always stripped.
- **RCE-safe pantoken components**: static/display components — alert, view, heading, text, table,
  a button-as-`<a>` (not a real `<button>`), blockquote. Stick to semantic HTML pantoken already
  supports (`div`, `p`, `span`, `a`, `img`, headings, lists, tables).
- **RCE-unsafe**: anything from `@pantoken/interactions`'s behavior set — modal, tooltip,
  drilldown, close-button, or any other component driven by the native `popover`/`popovertarget`/
  `command`/`commandfor` attributes. Those attributes aren't in Canvas's sanitizer allowlist, so
  the markup survives but the interactive behavior silently breaks the first time the page is
  saved in Canvas, even with `theme.js`'s `@pantoken/interactions` loader present. Real form
  elements (`input`, `form`, `button`, `select`, `textarea`, `label`) and inline `<svg>` are
  stripped outright — none of the bundled starter templates use them.

`theme.js` loads `@pantoken/interactions` from the CDN, which runs in Canvas's global page scope —
useful for interactions on pages you build directly in Canvas's RCE with raw HTML edits, but (per
above) any `popover`/`command`-attribute-driven markup pasted from the RCE preview here won't stay
interactive once saved.

### Canvas-specific plugins intentionally left out

Canvas's own RCE also ships an accessibility checker
([`tinymce-a11y-checker`](https://github.com/instructure/canvas-lms/tree/master/packages/canvas-rce/src/rce/plugins/tinymce-a11y-checker))
and a LaTeX equation editor
([`instructure_equation`](https://github.com/instructure/canvas-lms/tree/master/packages/canvas-rce/src/rce/plugins/instructure_equation)).
The Canvas implementations are not included here because they are deeply coupled to canvas-rce's
internals (React, roughly a dozen `@instructure/ui-*` packages, Redux, the mathlive/KaTeX math
editor, and canvas-rce's own `Bridge` singleton). This scaffold does include pantoken's standalone,
React-free accessibility checker as the **Accessibility** toolbar button; it checks common image,
heading, table, link, and list issues without depending on Canvas's RCE internals. Follow the linked
source if you need Canvas's full tray UI or equation editor.
