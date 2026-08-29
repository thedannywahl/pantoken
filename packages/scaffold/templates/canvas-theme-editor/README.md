# {{projectName}}

Scaffolded with `pantoken-scaffold canvas-theme-editor` (or `pantoken-ai scaffold canvas-theme-editor`)
— upload-ready assets for Canvas LMS's **Theme Editor**, plus a local preview for authoring Rich
Content Editor (RCE) page templates styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components).

## What's here

- `theme.css` / `theme.js` — upload these two files under **Theme Editor → Advanced** in Canvas.
  They're built for the CDN provider/theme/mode you chose when scaffolding (`--cdn`/`--theme`/
  `--theme-mode`; jsDelivr/rebrand/light by default) and include a loader for
  `@pantoken/interactions` (wires up component behaviors like modal, tooltip, and drilldown).
- `index.html` / `src/main.ts` — a local, TinyMCE-based editor (`npm run dev`) that mirrors Canvas's
  RCE so you can author page templates against pantoken's classes before copying them into Canvas.
  It also lets you regenerate `theme.css`/`theme.js` for a different CDN provider/theme/mode
  without re-running the CLI.
- `templates/pages/` — starter HTML snippets (hero, callout, two-column, rubric note, testimonial)
  available from the editor's **Insert template** toolbar button.

## Develop

```sh
npm install
npm run dev
```

This opens a Vite dev server with:

- An **editor** pane (TinyMCE, matching the version/config
  [instructure/canvas-lms](https://github.com/instructure/canvas-lms) itself uses — see below).
  Use the **Insert template** button to load one of the bundled starters (this replaces the whole
  document, after a confirm, rather than inserting at the cursor), and the **Source code** button
  (from TinyMCE's `code` plugin) to view/edit the raw HTML directly.
- A **preview** pane showing the editor's content with the actual resolved pantoken stylesheet
  applied — a faithful "what this will look like once uploaded to Canvas" check, updated live as
  you type or change the CDN provider/theme/mode selects.
- CDN provider/theme/mode selects and **Download theme.css** / **Download theme.js** links, for
  regenerating those two files without re-running the CLI.

## Workflow

1. Upload `theme.css` and `theme.js` to Canvas's Theme Editor (**Advanced → CSS / JavaScript**) so
   pantoken's classes are available on every page.
2. Run `npm run dev`, use **Insert template** to start from a bundled starter, and edit it like you
   would in Canvas's own RCE.
3. Click **Copy HTML** and paste the result into a Canvas page's RCE (switch to the HTML editor
   view first). Canvas sanitizes pasted HTML server-side — this scaffold doesn't attempt to
   replicate that, so always verify the pasted result in Canvas (see "Notes on Canvas's RCE"
   below).

## Notes on Canvas's RCE

Canvas's Rich Content Editor runs TinyMCE and sanitizes submitted HTML on the server against an
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
