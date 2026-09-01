[pantoken](../../../index.md) / demo

# demo

`@pantoken/demo` — جانب العرض لنظام `@demo`.

`@pantoken/typedoc-plugin-demo` يحوّل وسم `@demo &lt;spec&gt;` إلى كتلة محاطة بأسوار `demo` يكون جسمها
المواصفة (عنوان URL خام أو زوج `&lt;provider&gt;:&lt;ref&gt;`). تقوم هذه الحزمة بحلّ تلك المواصفة إلى
iframe قابل للتضمين وتعرض اللوحة المحيطة — "عينة حية" على نمط MDN.

تتضمن الحزمة ثلاثة عناصر: [resolveDemo](functions/resolveDemo.md) (المواصفة → سمات iframe، مستقل عن الإطار)، و
مُلحق markdown-it ([demoMarkdownIt](functions/demoMarkdownIt.md)) الذي يحوّل أسوار `demo` إلى HTML اللوحة المحيطة، و
مشغل مستضاف ذاتيًا (`@pantoken/demo/runner.html`) — صفحة من نفس الأصل تقوم بجلب عرض توضيحي HTML/CSS/JS خام وتعرضه مع حقن ملفات أنماط الرموز الخاصة بك، لذا لا تحتاج عروض `self:` إلى
حساب طرف ثالث ولا إلى حلول تأطير بديلة.

## مثال

```ts
import { resolveDemo } from "@pantoken/demo";

resolveDemo("stackblitz:abc123").src; // → "https://stackblitz.com/edit/abc123?embed=1&…"
resolveDemo("self:button", { base: "/docs/", cssUrls: ["/docs/tokens.css"] }).src;
```

## واجهات

- [ResolveOptions](interfaces/ResolveOptions.md)
- [ResolvedDemo](interfaces/ResolvedDemo.md)
- [LiveExampleOptions](interfaces/LiveExampleOptions.md)
- [DemoMarkdownItOptions](interfaces/DemoMarkdownItOptions.md)
- [ExampleSrcdocOptions](interfaces/ExampleSrcdocOptions.md)

## المتغيرات

- [FULLSCREEN\_BUTTON\_HTML](variables/FULLSCREEN_BUTTON_HTML.md)

## الدوال

- [resolveDemo](functions/resolveDemo.md)
- [renderDemoFigure](functions/renderDemoFigure.md)
- [demoMarkdownIt](functions/demoMarkdownIt.md)
- [escapeSrcdoc](functions/escapeSrcdoc.md)
- [buildExampleSrcdoc](functions/buildExampleSrcdoc.md)
