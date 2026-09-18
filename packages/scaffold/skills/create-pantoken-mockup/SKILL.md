---
name: create-pantoken-mockup
description: Create a standalone Pantoken HTML mockup or sendable HTML email. Use when the user asks for a single HTML file, quick prototype, customer email mockup, or email-client-ready markup without creating an application project.
---

# Create a Pantoken mockup

Create one final HTML artifact without scaffolding an application. Do not create `package.json`,
install project dependencies, or invoke `create-pantoken-app` unless the user changes the request to
a maintained application.

## 1. Choose the output

If the request says email but does not say how the result will be used, ask one question:

- **Browser mockup**: a visual prototype opened as a local HTML file.
- **Sendable email**: HTML delivered through Gmail, Outlook, or an email service.

These are different outputs. Browser mockups may use external CSS, custom properties, and optional
JavaScript. Sendable email must use concrete inline styles and no scripts.

## 2. Browser mockup

Produce one HTML file that opens directly in a browser. Do not use the shadcn registry for this
workflow; it is for package-managed projects.

1. Discover core component requirements from
   `https://pantoken.app/component-capabilities.json`.
2. Discover plugin styles from `https://pantoken.app/cdn-plugin-manifest.json`.
3. Use canonical HTML from `https://pantoken.app/demos/<component>.html` or the component's cssdoc
   documentation. Preserve native elements, nesting, ARIA attributes, and documented state classes.
4. Load a version-pinned token foundation first:

   ```html
   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/@pantoken/css@<version>/dist/style.lean.css"
   />
   ```

5. Load only the required `@pantoken/components/dist/<name>.css` and plugin CSS files. Put base CSS
   before components and utilities after components. Use jsDelivr's combine endpoint when several
   stylesheets are needed.
6. If any selected component has `needsIcons: true`, add
   `@pantoken/components/dist/component-icons.css`. Use the full token sheet only when arbitrary
   icon tokens are required.
7. If a component has JavaScript capability, load its per-component
   `@pantoken/interactions/dist/<name>.iife.js` after the markup and include entries from `requires`
   first. Do not load the aggregate interaction bundle unless many interactive components need it.
8. Use `var(--instui-*)` for custom styling and never invent token names.

For a disposable preview, a major-version CDN pin is acceptable. Use exact versions for an artifact
that will be retained. If the user explicitly requires a fully offline file, fetch the selected CSS
and JavaScript and inline it into `<style>` and `<script>` blocks.

Open the final file in a browser and verify styles, icons, responsive layout, keyboard interaction,
and that every referenced asset loads. Give the user a link to the HTML file; do not start a server.

## 3. Sendable HTML email

Do not use Pantoken component CSS, the shadcn registry, CSS custom properties, JavaScript, custom
elements, or icon-font masks. Email clients do not reliably support those features.

1. Resolve values from `@pantoken/email` using `emailTokens("light")` or the requested mode. If the
   current directory is not a package-managed project, use a temporary package-runner environment;
   do not leave a package manifest or dependency tree beside the final HTML.
2. Build conservative table-based email markup with presentation-critical styles inline.
3. Interpolate concrete colors and dimensions from the returned camel-cased token map. The final
   HTML must not contain `var(--instui-*)`.
4. Use hosted raster images with dimensions and meaningful `alt` text for logos or icons. Do not use
   Pantoken custom elements or CSS glyph painters.
5. Include a descriptive `<title>`, preheader text, semantic headings, readable fallback fonts, and
   a plain text link for every call to action.
6. Validate that the final file contains no `<script>`, custom elements, external Pantoken
   stylesheets, or unresolved token references. Note that Gmail, Outlook, and production email
   preview testing remains the sender's responsibility.

## 4. Keep the artifact focused

Do not add explanatory UI, setup instructions, package files, or a framework shell to the rendered
artifact. Use Pantoken to serve the requested communication or prototype, not to advertise the
design system.
