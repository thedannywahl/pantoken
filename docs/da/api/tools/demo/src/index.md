[pantoken](../../../index.md) / demo

# demo

`@pantoken/demo` — gengivelses-siden af `@demo` systemet.

`@pantoken/typedoc-plugin-demo` omdanner en `@demo &lt;spec&gt;` tag til en omgivet `demo` blok hvis
indhold er spec'en (en bar URL eller et `&lt;provider&gt;:&lt;ref&gt;` par). Denne pakke løser spec'en til en
indlejringsbar iframe og gengiver det omgivende panel — et MDN-stil "live sample".

Det leverer tre ting: [resolveDemo](functions/resolveDemo.md) (spec → iframe attributter, framework-agnostisk), et
markdown-it plugin ([demoMarkdownIt](functions/demoMarkdownIt.md)) som omdanner `demo` fold til panel HTML, og en
self-hosted runner (`@pantoken/demo/runner.html`) — en same-origin side som henter et bart
HTML/CSS/JS demo og gengiver det med dine token stylesheets injiceret, så `self:` demos ikke behøver
tredjepartsaccount og ingen ramme workarounds.

## Eksempel

```ts
import { resolveDemo } from "@pantoken/demo";

resolveDemo("stackblitz:abc123").src; // → "https://stackblitz.com/edit/abc123?embed=1&…"
resolveDemo("self:button", { base: "/docs/", cssUrls: ["/docs/tokens.css"] }).src;
```

## Interfaces

- [ResolveOptions](interfaces/ResolveOptions.md)
- [ResolvedDemo](interfaces/ResolvedDemo.md)
- [LiveExampleOptions](interfaces/LiveExampleOptions.md)
- [DemoMarkdownItOptions](interfaces/DemoMarkdownItOptions.md)
- [ExampleSrcdocOptions](interfaces/ExampleSrcdocOptions.md)

## Variabler

- [FULLSCREEN\_BUTTON\_HTML](variables/FULLSCREEN_BUTTON_HTML.md)

## Funktioner

- [resolveDemo](functions/resolveDemo.md)
- [renderDemoFigure](functions/renderDemoFigure.md)
- [demoMarkdownIt](functions/demoMarkdownIt.md)
- [escapeSrcdoc](functions/escapeSrcdoc.md)
- [buildExampleSrcdoc](functions/buildExampleSrcdoc.md)
