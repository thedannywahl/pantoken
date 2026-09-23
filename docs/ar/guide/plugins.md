# الإضافات

تمدد إضافة pantoken مخرجات الرموز أو CSS بدون تفرع لحزمة. تُبنى واحدة باستخدام `definePlugin` من `@pantoken/plugin-kit`، ثم تُمرَّر إلى `buildTokens` أو `toCss`.

## كتابة إضافة

زوِّد `definePlugin` بالخطافات التي تنفذها. يُرجع إضافة عادية، معنونة بالإمكانات المستنتجة من تلك الخطافات. يمكن للإضافة توسيع IR (`tokens`, `icons`), مخرجات CSS (`css`), أو كليهما.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## التسجيل المدرك للإمكانات

تشغّل `buildTokens` و `toCss` `checkPlugins` على الإضافات التي تمررها. يحذّر — لا يرمي استثناء — عندما لا يكون للإضافة خطاف مطابق للمرحلة التي سُجلت فيها، لذا تُتجاوز إضافة مخصصة للرموز فقط والممررة إلى `toCss` مع ملاحظة بدلاً من أن تظل صامتة وتفعل لا شيء.

## تركيب الإضافات

ابنِ فوق إضافة أخرى باستخدام `extendPlugin`، أو اجمع الزملاء مع `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

تتألف خطافات نفس المرحلة: يُشغّل `tokens` الأساسي ثم الإضافة، يدمج `css` المساهمتين، ويشغّل `icons` كلاهما.

## تحقق من مخرجات الإضافة

شغّل فحوص الانحراف المشتركة من `@pantoken/utils` على مخرجات إضافتك في اختبارها، حتى يفشل خطأ مطبعي أو رمز معاد تسميته بسرعة ومحلياً:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## الإضافات المجمعة

- `@pantoken/plugin-simple-icons` — يوسم الأيقونات من simple-icons، مسجلة كرموز أيقونة.
- `@pantoken/plugin-lucide-lab` — أيقونات Lucide Lab، مسجلة كرموز صورة `--instui-icon-*`.
- `@pantoken/plugin-logos` — شعارات منتجات Instructure كـ SVG وبيانات URI و
  رموز صورة `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — إضافة PostCSS (ليست إضافة pantoken) التي تزيل
  الخصائص المخصصة غير المستخدمة من ورقة الأنماط.

يمكن تحميل سجل Lucide Lab كسيري مؤجّل، ثم تمريره إلى خطاف الرموز المتزامن:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

بعض الأشياء التي كانت إضافات أصبحت الآن تُشحن في `@pantoken/components`، لأن العديد من المكونات تحتاجها جاهزة: ظلال الارتقاء (`--instui-elevation-*`, في `components.css`), حلقة محيط التركيز (في `base.css` — يحصل كل عنصر قابل للتركيز عليها عندما يملك pantoken الصفحة)، وخطوط العلامة التجارية Instructure (Atkinson Hyperlegible Next: يُطبق `base.css` `--instui-font-family-base`; التحميل الاختياري `@pantoken/components/fonts.css` يحمل ملفات woff2s الخاصة بـ `@font-face`).

انظر [المرجع البرمجي](/api/) لصادرات كل إضافة.
