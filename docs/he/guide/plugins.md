# תוספים

תוסף של pantoken מרחיב את פלט הטוקנים או ה‑CSS ללא יצירת fork של חבילה. בונים אחד עם
`definePlugin` מ־`@pantoken/plugin-kit`, ואז מעבירים אותו ל־`buildTokens` או `toCss`.

## כתיבת תוסף

תן ל־`definePlugin` את ה‑hooks שאתה מממש. הוא מחזיר תוסף רגיל, ממותג עם היכולות הנגזרות מאותם hooks. תוסף יכול להרחיב את ה‑IR (`tokens`, `icons`), את פלט ה‑CSS (`css`), או את שניהם.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## רישום מודע ליכולות

`buildTokens` ו־`toCss` מריצים את `checkPlugins` על פני התוספים שאותם אתה מעביר. הם מזהירים — לעולם לא זורקים — כאשר לתוסף אין hook תואם לשלב שבו הוא נרשם, לכן תוסף שמייצר טוקנים בלבד ומועבר ל־`toCss` יידחה עם הודעה במקום לשתוק ולא לעשות כלום.

## הרכבת תוספים

בנה על בסיס תוסף קיים עם `extendPlugin`, או שלב תוספים מקבילים עם `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

ה‑hooks של אותו שלב מורכבים: `tokens` מריץ קודם את הבסיס ואז את התוספת, `css` מאחד את שתי התרומות, ו־`icons` מריץ את שניהם.

## ואלידציה של פלט התוסף שלך

הרץ את בדיקות ה‑drift משותפות מ־`@pantoken/utils` על פלט התוסף בעצמו בתוך הבדיקה שלו, כך שטעות הקלדה או שינוי שם טוקן ייכשלו מהר ובמקומי:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## התוספים הכלולים בחבילה

- `@pantoken/plugin-simple-icons` — מותג אייקונים מ‑simple-icons, נרשמים כטוקני אייקון.
- `@pantoken/plugin-lucide-lab` — אייקוני Lucide Lab, נרשמים כטוקני תמונה `--instui-icon-*`.
- `@pantoken/plugin-logos` — לוגואים של מוצרי Instructure כ‑SVG, URI נתונים, וטוקני תמונה `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — תוסף PostCSS (לא תוסף pantoken) שמוריד משתני custom לא בשימוש מקובץ סטייל.
- `@pantoken/plugin-custom-theme-colors` — משנה מיתוג של דף על‑ידי קביעת מאפיין אחד (`data-pantoken-color`) לאחת מ‑13 הפלטות, או ל־`custom` לכל hex מותג. ראה [Theme colors](#theme-colors).

הרשימה של Lucide Lab ניתנת לטעינה עצלנית, ואז העברה ל‑hook הטוקנים הסינכרוני:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

כמה דברים שהיו פעם תוספים עכשיו כלולים ב־`@pantoken/components`, כי כל כך הרבה רכיבים זקוקים להם כברירת מחדל: צללי elevation (`--instui-elevation-*`, בתוך `components.css`), טבעת ה‑focus‑outline (ב־`base.css` — כל פריט שניתן למקד מקבל אותה כש‑pantoken שולט בדף), וגופני המותג של Instructure (Atkinson Hyperlegible Next: `base.css` מחיל `--instui-font-family-base`; ה‑opt‑in `@pantoken/components/fonts.css` טוען את ה‑woff2s של `@font-face`).

## צבעי תמה {#theme-colors}

`@pantoken/plugin-custom-theme-colors` פולג חוסם `[data-pantoken-color="…"]` אחד לכל פלטה
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). כל בלוק מפנה את הפרימיטיבים של המותג (`--instui-primitive-color-navy-*` ו־`-blue-*`)
אל הפלטה שנבחרה. הוא גם מחדש נגזר את משטחי המותג ש‑upstream שטחו ל‑hex מוחלט, ושומר על האלפא המאופה שלהם דרך `color-mix()`. צבעי סטטוס סמנטיים, הדגשים כחולים מפורשים וצללי elevation נשארים כפי שהם. נסה את זה ב
[swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### צבע מותג מותאם אישית

הגדר את `data-pantoken-color="custom"` כדי למתג מחדש מכל hex, למשל הצבע הראשוני שמנהל Canvas מקליד בעורך התמה. pantoken נגזר ממנו קנה מידה מלא 10–200 `--instui-primitive-color-custom-*`:

1. **עקומת ייחוס.** המטרה של בהירות כל שלב היא ממוצע הבהירות OKLCH של 13 הפלטות באותו שלב, כאשר 0 קבוע ללבן ו‑210 לשחור. כך הריווח של קנה המידה המותאם תואם את זה של הפלטות המשלוח.
2. **עוגן.** הקלט נוחת על השלב שהבהירות המטרה שלו היא הקרובה ביותר לשל עצמו, ואז ננעל לאותה בהירות מדויקת. `#cccccc` הופך ל־`custom-40` ב־`#c9c9c9`: קרוב לקלט, אך לא תמיד זהה. "הקרוב ביותר" פירושו השלב הקרוב ביותר על העקומה, לא הצבע הקיים הקרוב ביותר בפלטות.
3. **מילוי.** כל שאר השלבים שומרים על הגוון (hue) של הקלט. הרוויה שלו עוקבת אחרי עקומת הרוויה הממוצעת של הפלטות יחסית לעוגן, ומופחתת רק במקום שבו צבע חורג ממרחב sRGB.

רק `#rgb` ו־`#rrggbb` מתקבלים; כל אחרת זורקת `TypeError`, כך ש‑hex מטופס לא יכול להזריק CSS.

בזמן הבנייה, פלט את הכלל כולו עם הפרימיטיבים הנגזרים כבר מוכרזים:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

כדי לבחור את הצבע בזמן ריצה בלי לשלוח את ערכת הטוקנים, חשב מראש את העקומה ואת כלל המיפוי בזמן הבנייה. ואז השתמש בכניסה נטולת‑תלות `/scale` בדפדפן, וקבע רק את 20 הפרימיטיבים הנגזרים:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

בורר התמות באתר התיעוד, עורך התמות של Canvas, וההדגמה למעלה עובדים כולם כך.

ראה את ה‑[API reference](/api/) עבור היצוא של כל תוסף.
