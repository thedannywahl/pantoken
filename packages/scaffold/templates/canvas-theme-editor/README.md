# {{projectName}}

Scaffolded with `pantoken-scaffold canvas-theme-editor` (or `pantoken-ai scaffold canvas-theme-editor`)
— upload-ready assets for Canvas LMS's **Theme Editor**, plus a local preview for authoring Rich
Content Editor (RCE) page templates styled with
[`@pantoken/components`](https://www.npmjs.com/package/@pantoken/components).

## What's here

- `theme.css` / `theme.js` — upload these two files under **Theme Editor → Advanced** in Canvas.
  They're pre-populated with pantoken's CDN imports (defaulting to pantoken's `rebrand-light`
  design, currently the only theme it ships) and a loader for `@pantoken/interactions` (wires up
  component behaviors like modal, tooltip, and drilldown).
- `preview/` — a local, TinyMCE-based editor that mirrors Canvas's RCE so you can author page
  templates against pantoken's classes before copying them into Canvas.
- `templates/pages/` — starter HTML snippets (hero, callout, two-column, rubric note, testimonial)
  to adapt for course content pages.

## Develop

```sh
npm install
npm run preview
```

Then open `http://localhost:3000/preview/` in a browser. The preview fetches its own template
files, so it needs a local static server rather than a `file://` page — `npm run preview` runs one
for you.

## Workflow

1. Upload `theme.css` and `theme.js` to Canvas's Theme Editor (**Advanced → CSS / JavaScript**) so
   pantoken's classes are available on every page.
2. Open `preview/index.html`, pick a starter template, and edit it like you would in Canvas's own
   RCE.
3. Click **Copy HTML** and paste the result into a Canvas page's RCE (switch to the HTML editor
   view first). Canvas sanitizes pasted HTML server-side — this scaffold doesn't attempt to
   replicate that, so always verify the pasted result in Canvas.

## Notes on Canvas's RCE

Canvas's Rich Content Editor runs TinyMCE and sanitizes submitted HTML on the server, so keep
templates to semantic HTML pantoken already supports (`div`, `p`, `span`, `a`, `img`, headings,
lists, tables) and class-based styling — avoid inline `style` attributes and `<script>` tags, since
Canvas strips or ignores them. `theme.js` loads `@pantoken/interactions` from the CDN, which runs
in Canvas's global page scope.
