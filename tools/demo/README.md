# @pantoken/demo

The render side of the `@demo` system. Where [`@pantoken/typedoc-plugin-demo`](../../plugins/typedoc/demo)
turns a `@demo <spec>` tag into a fenced `demo` block, this package resolves that spec into an
embeddable iframe and renders an MDN-style live-sample panel.

It ships a self-hosted runner too, so `self:` demos run same-origin — no third-party account, no
framing restrictions, themed with your own tokens.

## Install

```sh
npm i @pantoken/demo
```

## Parts

- **`resolveDemo(spec, options)`** — a spec (`self:button`, `stackblitz:abc`, a bare URL, …) →
  `{ provider, src, sandbox }`. Framework-agnostic. Providers: `url`, `self`, `stackblitz`,
  `codesandbox`, `codepen`, `dartpad`, `wp-playground`.
- **`demoMarkdownIt(md, options)`** — a markdown-it plugin that turns `demo` fences into the
  panel HTML via `resolveDemo`.
- **`renderDemoFigure(resolved)`** — the panel HTML for a resolved demo (bar + sandboxed iframe).
- **`@pantoken/demo/runner.html`** — the self-hosted runner: a same-origin page that fetches a demo
  snippet (`?src=`) and injects your stylesheets (`?css=`), so bare HTML/CSS/JS demos render themed.
- **`@pantoken/demo/demo.css`** — styles for the panel.

## Usage (markdown-it / VitePress)

```ts
import { demoMarkdownIt } from "@pantoken/demo";

md.use(demoMarkdownIt, {
  base: "/pantoken/",
  cssUrls: ["/pantoken/demos-assets/tokens.css", "/pantoken/demos-assets/components.css"],
});
```

Serve `runner.html` at `<base>play/`, put demo snippets at `<base>demos/<id>.html`, and import
`@pantoken/demo/demo.css`. Then a `@demo self:button` tag renders `demos/button.html` live.

## License

MIT
