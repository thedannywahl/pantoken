# البدء

pantoken يأخذ رموز التصميم والأيقونات الخاصة بـ Instructure UI، يحلّلها مرة واحدة، ويعيد تشكيل ذلك النموذج الواحد إلى حزم لعدة منصات: ملفات أنماط عادية، SCSS و Less، React و Vue و Svelte، Tailwind و Panda، منصات أصلية Swift و Kotlin، WordPress و Drupal، Figma، والمزيد.

قم بتثبيت أصغر حزمة تناسب مهمتك. كل شيء معاد التصدير متاح أيضاً عبر الحزمة الموحدة `pantoken`، لذا يمكنك البدء منها ثم التخصيص لاحقًا.

## تهيئة مشروع بداية

أسرع طريقة لتجربة pantoken: تهيئة مشروع بداية مع تثبيته ودمجه مسبقًا.

```sh
npx create-pantoken-app react
```

المنصات: `components` (HTML/CSS عادي)، `react`, `vue`, `svelte`, `web-components`, `angular`. انظر
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) لـ `--dir <path>` والاستخدام البرنامجي.

تستخدم وكيل برمجة ذكاء اصطناعي؟ لا حاجة للتثبيت — وجه الوكيل إلى المهارة مباشرة:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

يعمل بنفس الطريقة مع Gemini CLI و Cursor CLI و OpenAI Codex CLI و GitHub Copilot CLI و Amazon Q Developer CLI — استبدل `claude` بـ `gemini` أو `agent` أو `codex` أو `copilot -p` أو `q chat`. إذا رغبت بدمج قواعد وكيل pantoken في المستودع بشكل دائم (AGENTS.md، قواعد المحرر، نسخة محلية من هذه المهارة)، شغّل `npx @pantoken/ai init` بدلاً من ذلك.

## نموذج الرموز (Tokens)

الرموز هي خصائص مخصصة في CSS مسماة `--instui-<group>-<name>`، على سبيل المثال
`--instui-color-background-brand` أو `--instui-spacing-space-md`. ثلاثة ثيمات مشمولة: `rebrand`
(الافتراضي، مع `light-dark()` حيث يختلف الفاتح والداكن)، `canvas`، و `canvasHighContrast`.
الأيقونات هي رموز `<image>` (`--instui-icon-<name>`) مشتقة من Lucide بالإضافة إلى الرموز المخصصة لـ Instructure.

## تزيين تطبيق ويب

ثبّت ورقة الأنماط واستوردها مرة واحدة. هي تعرف كل خاصية `--instui-*`، لذلك يمكنك الإشارة إليها مباشرة من CSS الخاص بك.

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

مكون الويب يعمل في أي إطار عمل، دون حاجة لعملية نقل.

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

الأيقونات هي خصائص مخصصة في CSS (`--instui-icon-<name>`). حمّل ورقة الأنماط مرة واحدة وارجع لأي أيقونة كـ `mask-image` أو `background-image` — لا حاجة لاستيراد كل أيقونة على حدة.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### جافاسكربت — أيقونة واحدة مقابل المجموعة الكاملة

`@pantoken/icons` يوفّر تصديرين مسمّيين. استخدم `iconsByName` لسحب أيقونة واحدة دون تكرار
المصفوفة الكاملة:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

استخدم `icons` عندما تحتاج المجموعة كاملة (مثلًا لبناء منتقِ للأيقونات):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

كلا التصديرين يحمّلان IR الكامل عند تهيئة الوحدة النمطية — لا يوجد tree-shaking لكل أيقونة على هذا المستوى. لتحميل نحيف قائم على CSS فقط، استخدم [CDN picker](/guide/cdn-picker) لتوليد عنوان URL مجمّع للأيقونات التي تحتاجها فقط.

## التوليد لمنصة أصلية

CLI يكتب مصدر الرموز إلى مستودع الهدف. لا حاجة لتثبيت إضافي بخلاف المشغّل:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

انظر [the pantoken CLI](/guide/cli) لكل هدف.

## تلميحات التأليف في VS Code

`@pantoken/pantoken` الآن يضم ملفات بيانات مخصصة لـ VS Code حتى تتمكن المشاريع اللاحقة من الحصول على إكمال للأصناف والرموز في HTML/CSS دون تثبيت امتداد خاص بـ pantoken.

1. ثبّت الحزمة الموحدة:

```sh
npm i @pantoken/pantoken
```

1. دلّ VS Code إلى JSON البيانات المخصصة المشحون من مساحة عمل المستهلك الخاصة بك:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. أعد تحميل VS Code (أو شغّل "Developer: Reload Window") لتطبيق البيانات الجديدة.

هذا يتيح اقتراحات لأصناف `instui-*` (و أصناف `-modifier`) بالإضافة إلى خصائص `--instui-*` المخصصة.

## إلى أين بعد ذلك

- [خريطة الحزم](/guide/packages) — أي حزمة تُستخدم لأي مهمة.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ثبّت أصول الوكيل والقواعد في مستودع المستهلك.
- [العمارة](/guide/architecture) — كيف يتناسب نموذج الرموز، النواة، والمخرجات معًا.
- [مرجع API](/api/) — كل رمز مُصدّر، مولَّد من المصدر.
