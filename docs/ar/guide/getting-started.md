# البدء

Pantoken يأخذ تصميم الرموز والرموز الأيقونية من [Instructure UI](https://instructure.design)، يحلّلها مرة واحدة، ويُعيد تشكيل هذا النموذج الواحد إلى حزم للعديد من المنصات: أوراق أنماط عادية، SCSS و Less، React و Vue و Svelte، Tailwind و Panda، Swift و Kotlin الأصليين، WordPress و Drupal، Figma، والمزيد.

قم بتثبيت الحزمة الأصغر التي تناسب مهمتك. كما أن كل شيء معاد تصديره بواسطة الحزمة الموحدة `pantoken`، لذا يمكنك البدء من هناك وتضييق الاختيار لاحقًا.

## إنشاء مشروع بدء سريع

أسرع طريقة لتجربة pantoken: أنشئ مشروع بدء سريع مع تثبيته ومربوطًا مسبقًا.

```sh
npx create-pantoken-app
```

المنصات: `components` (HTML/CSS عادي)، `react`, `vue`, `svelte`, `web-components`, `angular`. انظر
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) لـ `--dir <path>` والاستخدام البرمجي.

تستخدم وكيل ترميز ذكي؟ لا حاجة للتثبيت — وجهه مباشرة إلى المهارة:

```prompt
جلب create.pantoken.app/SKILL.md واتباع الإرشادات الموجودة فيه لإعداد pantoken في هذا المشروع.
```

إذا كنت تفضّل ربط قواعد وكيل pantoken في المستودع بشكل دائم (AGENTS.md، قواعد المحرر، نسخة محلية من هذه المهارة)، شغّل `npx @pantoken/ai init` بدلًا من ذلك.

## نموذج الرموز

الرموز هي خصائص CSS مخصصة مسماة `--instui-<group>-<name>`، على سبيل المثال
`--instui-color-background-brand` أو `--instui-spacing-space-md`. ثلاث سمات تُشحن: `rebrand`
(الافتراضية، مع `light-dark()` حيث يختلف الضوء والظلام)، `canvas`، و `canvasHighContrast`.
الأيقونات هي رموز `<image>` (`--instui-icon-<name>`) مشتقة من Lucide بالإضافة إلى الرموز المخصصة لـ Instructure.

## تزيين تطبيق ويب

ثبت ملف الأنماط واستورده مرة واحدة. يعرّف كل `--instui-*` خاصية، لذا يمكنك الإشارة
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

## استخدم الأيقونات في أي مكان

مكوّن الويب يعمل في أي إطار عمل، بدون حاجة للترحيل.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### رموز CSS

الأيقونات هي خصائص CSS مخصصة (`--instui-icon-<name>`). حمّل ملف الأنماط مرة واحدة واشِر إلى أي
أيقونة كـ `mask-image` أو `background-image` — لا حاجة لاستيراد كل أيقونة على حدة.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### جافاسكربت — أيقونة مفردة مقابل المجموعة الكاملة

`@pantoken/icons` يوفّر تصديرين مسمّيين. استخدم `iconsByName` لسحب أيقونة واحدة دون تكرار
على الصفيف الكامل:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

استخدم `icons` عندما تحتاج المجموعة الكاملة (مثلاً لبناء منتقِ لاحقة):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

كلا التصديرين يحملان الـ IR الكامل عند تهيئة الوحدة النمطية — لا يوجد غرس شجري لكل أيقونة على هذا
المستوى. لتحميل نحيف يقتصر على CSS فقط، استخدم [منتقِ CDN](/guide/cdn-picker) لتوليد عنوان URL مجمّع
يحتوي فقط على الأيقونات التي تحتاجها.

## التوليد لمنصة أصلية

تكتب CLI مصدر الرموز إلى مستودع الهدف. لا حاجة لتثبيت بخلاف المُشغّل:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

انظر [pantoken CLI](/guide/cli) لكل هدف ممكن.

## تلميحات التحرير في VS Code

`@pantoken/pantoken` الآن يشحن ملفات بيانات مخصصة لـ VS Code حتى تتمكن المشروعات المستهلكة من الحصول على إكمال للفئات والرموز في HTML/CSS دون تثبيت امتداد خاص بـ pantoken.

1. ثبّت الحزمة الموحدة:

```sh
npm i @pantoken/pantoken
```

1. وجّه VS Code إلى JSON البيانات المخصصة المشحونة من مساحة عمل المستهلك:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. أعد تحميل VS Code (أو شغّل "Developer: Reload Window") لتطبيق البيانات الجديدة.

هذا يتيح اقتراحات لرموز الفئة `instui-*` (ورموز الفئة `-modifier`) بالإضافة إلى
الخصائص المخصصة `--instui-*`.

## إلى أين بعد ذلك

- [خريطة الحزم](/guide/packages) — أي حزمة تصل إليها بحسب المهمة.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ثبّت أصول وقواعد الوكيل في مستودع مستهلك.
- [الهندسة المعمارية](/guide/architecture) — كيف يتوافق نموذج الرموز، والنواة، والمخرجات معًا.
- [مرجع API](/api/) — كل رمز مُصدّر، مُولَّد من المصدر.
