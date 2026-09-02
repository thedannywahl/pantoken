[pantoken](../../../index.md) / demo

# demo

`@pantoken/demo` — the render side of the `@demo` system.

`@pantoken/typedoc-plugin-demo` turns a `@demo &lt;spec&gt;` tag into a fenced `demo` block whose
body is the spec (a bare URL or a `&lt;provider&gt;:&lt;ref&gt;` pair). This package resolves that spec into an
embeddable iframe and renders the surrounding panel — an MDN-style "live sample."

It ships three things: [resolveDemo](functions/resolveDemo.md) (spec → iframe attributes, framework-agnostic), a
markdown-it plugin ([demoMarkdownIt](functions/demoMarkdownIt.md)) that turns `demo` fences into the panel HTML, and a
self-hosted runner (`@pantoken/demo/runner.html`) — a same-origin page that fetches a bare
HTML/CSS/JS demo and renders it with your token stylesheets injected, so `self:` demos need no
third-party account and no framing workarounds.

## דוגמה

```ts
import { resolveDemo } from "@pantoken/demo";

resolveDemo("stackblitz:abc123").src; // → "https://stackblitz.com/edit/abc123?embed=1&…"
resolveDemo("self:button", { base: "/docs/", cssUrls: ["/docs/tokens.css"] }).src;
```

## ממשקים

- [ResolveOptions](interfaces/ResolveOptions.md)
- [ResolvedDemo](interfaces/ResolvedDemo.md)
- [LiveExampleOptions](interfaces/LiveExampleOptions.md)
- [DemoMarkdownItOptions](interfaces/DemoMarkdownItOptions.md)
- [ExampleSrcdocOptions](interfaces/ExampleSrcdocOptions.md)

## משתנים

- [FULLSCREEN\_BUTTON\_HTML](variables/FULLSCREEN_BUTTON_HTML.md)

## פונקציות

- [resolveDemo](functions/resolveDemo.md)
- [renderDemoFigure](functions/renderDemoFigure.md)
- [demoMarkdownIt](functions/demoMarkdownIt.md)
- [escapeSrcdoc](functions/escapeSrcdoc.md)
- [buildExampleSrcdoc](functions/buildExampleSrcdoc.md)
