# البدء

تأخذ Pantoken رموز التصميم والأيقونات من [Instructure UI](https://instructure.design)، تحلّلها مرة واحدة، وتعيد تشكيل ذلك النموذج الواحد إلى حزم لمنصات عديدة: ملفات أنماط عادية، SCSS و Less، React و Vue و Svelte، Tailwind و Panda، Swift و Kotlin الأصلية، WordPress و Drupal، Figma، والمزيد.

قم بتثبيت أصغر حزمة تناسب مهمتك. كل شيء معاد تصديره أيضاً عبر الحزمة الموحدة `pantoken`، لذا يمكنك البدء منها ثم تضييق الاختيار لاحقاً.

## إنشاء مشروع بداية

الطريقة الأسرع لتجربة pantoken: إنشاء مشروع بداية يتم تثبيته وتوصيله مسبقاً.

```sh
npx create-pantoken-app
```

المنصات: `components` (HTML/CSS عادي)، `react`, `vue`, `svelte`, `web-components`, `angular`. انظر
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) لـ `--dir <path>` والاستخدام البرنامجي.

تستخدم وكيل ترميز بالذكاء الاصطناعي؟ لا حاجة للتثبيت — أشر إليه مباشرةً:

```prompt
قم بجلب create.pantoken.app/SKILL.md واتّبعها لإعداد pantoken في هذا المشروع.
```

إذا رغبت في توصيل قواعد وكيل pantoken داخل المستودع بشكل دائم (AGENTS.md، قواعد المحرر، نسخة محلية من هذه المهارة)، شغّل `npx @pantoken/ai init` بدلاً من ذلك.

## نموذج الرموز (التوكنات)

الرموز هي خصائص مخصصة في CSS مسماة `--instui-<group>-<name>`، على سبيل المثال
`--instui-color-background-brand` أو `--instui-spacing-space-md`. تُشحن ثلاثة سمات: `rebrand`
(الافتراضية، مع `light-dark()` حيث يختلف الفاتح والداكن)، `canvas`، و `canvasHighContrast`.
الأيقونات هي توكنات `<image>` (`--instui-icon-<name>`) مشتقة من Lucide بالإضافة إلى الرموز المخصصة لـ Instructure.

## تنسيق تطبيق ويب

ثبت ورقة الأنماط واستوردها مرة واحدة. تُعرّف كل خاصية `--instui-*`، لذا يمكنك الإشارة
إليها مباشرة من CSS الخاص بك.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## استخدام الأيقونات في أي مكان

مكوّن الويب يعمل في أي إطار عمل، دون حاجة للترحيل.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### توكنات CSS

الأيقونات هي خصائص مخصصة في CSS (`--instui-icon-<name>`). حمّل ورقة الأنماط مرة واحدة وارجع إلى أي
أيقونة كـ `mask-image` أو `background-image` — لا حاجة لاستيراد كل أيقونة على حدة.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — أيقونة منفردة مقابل المجموعة الكاملة

`@pantoken/icons` يكشف تصديرين مسمّيين. استخدم `iconsByName` لسحب أيقونة واحدة دون تكرار
المصفوفة الكاملة:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

استخدم `icons` عندما تحتاج المجموعة الكاملة (مثلاً لبناء محدِّد اختيار):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

كلا التصديرين يقومان بتحميل الـ IR الكامل عند تهيئة الوحدة — لا يوجد تهذيب شجري (tree-shaking) لكل أيقونة
على هذا المستوى. للتحميل الخفيف القائم على CSS فقط، استخدم [منتقي CDN](/guide/cdn-picker) لتوليد عنوان URL مجمع
للأيقونات التي تحتاجها فقط.

## التوليد لمنصة أصلية

يقوم CLI بكتابة مصدر الرموز داخل مستودع الهدف. لا حاجة لتثبيت سوى المشغل:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

انظر [the pantoken CLI](/guide/cli) لكل هدف.

## تلميحات التأليف في VS Code

`@pantoken/pantoken` الآن يزوّد ملفات بيانات مخصصة لـ VS Code حتى تتمكن المشاريع المستهلكة من الحصول على إكمال للفئات والرموز في HTML/CSS دون تثبيت امتداد خاص بـ pantoken.

1. ثبّت الحزمة الموحدة:

```sh
npm i @pantoken/pantoken
```

1. أشر VS Code إلى JSON البيانات المخصصة المرفقة من مساحة العمل المستهلكة لديك:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. أعد تحميل VS Code (أو شغّل "Developer: Reload Window") لتطبيق البيانات الجديدة.

هذا يمكّن الاقتراحات لرموز فئة `instui-*` (ورموز فئة `-modifier`) بالإضافة إلى
خصائص مخصصة `--instui-*`.

## إلى أين التالي

- [خريطة الحزم](/api/) — أي حزمة يجب الوصول إليها، بحسب المهمة.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ثبّت أصول القوالب والقواعد الخاصة بالوكيل في مستودع مستهلك.
- [العمارة](/guide/architecture) — كيف يتناسب نموذج الرموز والنواة والنواتج معاً.
- [مرجع API](/api/) — كل رمز مصدّر، مولَّد من المصدر.
