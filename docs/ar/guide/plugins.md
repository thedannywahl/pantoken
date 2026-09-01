# الإضافات

يمد ملحق pantoken مخرجات الرموز أو CSS بدون تفرع حزمة. تُبنى واحدة باستخدام `definePlugin` من `@pantoken/plugin-kit`، ثم تُمرر إلى `buildTokens` أو `toCss`.

## تأليف ملحق

زوّد `definePlugin` بالخطافات (hooks) التي تنفذها. يُرجع ملحقًا عاديًا، معوّماً بالقدرات المستدلّة من تلك الخطافات. يمكن للملحق توسيع تمثيل IR (`tokens`, `icons`), مخرجات CSS (`css`), أو كليهما.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## التسجيل الواعي بالقدرات

تشغّل `buildTokens` و `toCss` `checkPlugins` على الإضافات التي تمررها. يعطي تحذيرًا — لا يرمي خطأ — عندما لا يحتوي الملحق على خطاف مطابق للمرحلة التي تم تسجيله فيها، لذلك يتم تخطي ملحق مخصص للرموز فقط مرّر إلى `toCss` مع ملاحظة بدلًا من أن يفعل لا شيء بصمت.

## تركيب الإضافات

ابنِ فوق ملحق آخر باستخدام `extendPlugin`، أو ادمج الأقران باستخدام `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

تتألف الخطافات في نفس المرحلة: يشغّل `tokens` الأساسي ثم الإضافة، يدمج `css` المساهمتين، و `icons` يشغّل كليهما.

## التحقق من مخرجات الملحق

شغّل فحوصات الانحراف المشتركة من `@pantoken/utils` على مخرجات ملحقك في اختباره، حتى يفشل الإملاء الخاطئ أو إعادة تسمية رمز بسرعة ومحليًا:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## الإضافات المجمعة

- `@pantoken/plugin-simple-icons` — يوسم الأيقونات من simple-icons كرموز أيقونة.
- `@pantoken/plugin-logos` — شعارات منتجات Instructure كـ SVGs، بيانات URI، و `--instui-logo-*` رموز صورة.
- `@pantoken/plugin-prune-custom-props` — إضافة PostCSS (ليست ملحق pantoken) تحذف الخصائص المخصصة غير المستخدمة من ورقة الأنماط.

بعض الأشياء التي كانت سابقًا إضافات تُشحن الآن في `@pantoken/components`، لأن العديد من المكونات تحتاجها جاهزة: ظلال الارتفاع (`--instui-elevation-*`, في `components.css`), حلقة مخطط التركيز (في `base.css` — تحصل كل عناصر التركيز على ذلك عندما يمتلك pantoken الصفحة)، وخطوط علامة Instructure التجارية (Atkinson Hyperlegible Next: يطبّق `base.css` `--instui-font-family-base`; التحميل الاختياري `@pantoken/components/fonts.css` يحمل ملفات woff2 الخاصة بـ `@font-face`).

انظر [مرجع API](/api/) لتصديرات كل ملحق.
