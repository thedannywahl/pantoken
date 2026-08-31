[pantoken](../../../index.md) / demo

# demo

`@pantoken/demo` — جانب العرض التوضيحي لنظام `@demo`.

`@pantoken/typedoc-plugin-demo` يحول علامة `@demo &lt;spec&gt;` إلى كتلة `demo` المحاطة بسياج
جسمها هو المواصفات (عنوان URL عاري أو زوج `&lt;provider&gt;:&lt;ref&gt;`). تحل هذه الحزمة هذه المواصفات إلى iframe قابل للتضمين وتعرض اللوحة المحيطة — عينة حية بأسلوب MDN.

يتم شحنها بثلاثة أشياء: [resolveDemo](functions/resolveDemo.md) (مواصفات → سمات iframe، غير محددة بإطار عمل)، مكون إضافي markdown-it ([demoMarkdownIt](functions/demoMarkdownIt.md)) يحول سياجات `demo` إلى HTML لوحة التثبيت، وعامل مستضاف ذاتياً (`@pantoken/demo/runner.html`) — صفحة نفس الأصل تجلب عرضاً توضيحياً HTML/CSS/JS عارياً وتعرضه مع أوراق الرموز الخاصة بك المحقونة، بحيث لا تحتاج عروض `self:` إلى حساب طرف ثالث ولا حيل التأطير.

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
