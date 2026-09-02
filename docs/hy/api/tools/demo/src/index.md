[pantoken](../../../index.md) / demo

# demo

`@pantoken/demo` — `@demo` համակարգի պատկերման կողմ:

`@pantoken/typedoc-plugin-demo` փոխում է `@demo &lt;spec&gt;` պիտակը պատնեշով `demo` բլոկի որի
մարմինը սպեցը (մերկ URL կամ `&lt;provider&gt;:&lt;ref&gt;` զույգ): Այս փաթեթը լուծում է այդ սպեցը
ներդրվող iframe-ի մեջ և պատկերում է շրջապատ վահանակը — MDN-ոճի "ուղիղ նմուշ:"

Այն առաքում է երեք բան: [resolveDemo](functions/resolveDemo.md) (սպեց → iframe հատկանիշներ, շրջանակից անկախ), markdown-it պլագին ([demoMarkdownIt](functions/demoMarkdownIt.md)) որ փոխում է `demo` պատերը վահանակի HTML-ի, և ինքնակերտ վազքային (`@pantoken/demo/runner.html`) — նույն-ծագում էջ որ բեռնում է մերկ
HTML/CSS/JS դեմո և պատկերում է այն ձեր տոկեն ոճերի ներուծածով, այնպես որ `self:` դեմոները կարիք չունեն երրորդ-կողմ հաշվից և շրջանակային շուրջ-լուծումներից:

## Օրինակ

```ts
import { resolveDemo } from "@pantoken/demo";

resolveDemo("stackblitz:abc123").src; // → "https://stackblitz.com/edit/abc123?embed=1&…"
resolveDemo("self:button", { base: "/docs/", cssUrls: ["/docs/tokens.css"] }).src;
```

## Ինտերֆեյսներ

- [ResolveOptions](interfaces/ResolveOptions.md)
- [ResolvedDemo](interfaces/ResolvedDemo.md)
- [LiveExampleOptions](interfaces/LiveExampleOptions.md)
- [DemoMarkdownItOptions](interfaces/DemoMarkdownItOptions.md)
- [ExampleSrcdocOptions](interfaces/ExampleSrcdocOptions.md)

## Փոփոխականներ

- [FULLSCREEN\_BUTTON\_HTML](variables/FULLSCREEN_BUTTON_HTML.md)

## Ֆունկցիաներ

- [resolveDemo](functions/resolveDemo.md)
- [renderDemoFigure](functions/renderDemoFigure.md)
- [demoMarkdownIt](functions/demoMarkdownIt.md)
- [escapeSrcdoc](functions/escapeSrcdoc.md)
- [buildExampleSrcdoc](functions/buildExampleSrcdoc.md)
