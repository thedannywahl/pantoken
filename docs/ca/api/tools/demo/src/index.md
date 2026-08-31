[pantoken](../../../index.md) / demo

# demo

`@pantoken/demo` — la banda de renderització del sistema `@demo`.

`@pantoken/typedoc-plugin-demo` converteix una etiqueta `@demo &lt;spec&gt;` en un bloc `demo` tancat el cos de la qual és l'especificació (una URL descendent o una parella `&lt;provider&gt;:&lt;ref&gt;`). Aquest paquet resol aquesta especificació en un iframe incrustat i renderitza el panell circumdant — una "mostra en directe" d'estil MDN.

Envia tres coses: [resolveDemo](functions/resolveDemo.md) (especificació → atributs iframe, agnòstic del marc), un
connector markdown-it ([demoMarkdownIt](functions/demoMarkdownIt.md)) que converteix les tanques `demo` en HTML del panell, i un
corredor autoallotjat (`@pantoken/demo/runner.html`) — una pàgina del mateix origen que obté una demostració
HTML/CSS/JS descendent i la renderitza amb les vostres fulls d'estil de tokens injectats, de manera que les demostracions `self:` no necessiten
compte de tercers ni solucions alternativas d'emmarcament.

## Example

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

## Variables

- [FULLSCREEN\_BUTTON\_HTML](variables/FULLSCREEN_BUTTON_HTML.md)

## Functions

- [resolveDemo](functions/resolveDemo.md)
- [renderDemoFigure](functions/renderDemoFigure.md)
- [demoMarkdownIt](functions/demoMarkdownIt.md)
- [escapeSrcdoc](functions/escapeSrcdoc.md)
- [buildExampleSrcdoc](functions/buildExampleSrcdoc.md)
