# תוספים

תוסף pantoken מרחיב את ה־IR או את פלט ה‑CSS בלי ליצור fork של חבילה. בונים אחד עם `definePlugin` מ‑`@pantoken/plugin-kit`, ואז מעבירים אותו ל‑`buildTokens` או `toCss`.

## כתיבת תוסף

תן ל‑`definePlugin` את ה‑hooks שאתה מממש. הוא מחזיר תוסף רגיל, מתויג עם היכולות שנגזרו מאותן hooks. תוסף יכול להרחיב את ה‑IR (`tokens`, `icons`), את פלט ה‑CSS (`css`), או שניהם.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## רישום מודע-יכולות

`buildTokens` ו‑`toCss` מריצים `checkPlugins` על פני התוספים שאתה מעביר. הם יוצאים אזהרה — אף פעם לא זורקים — כאשר לתוסף אין hook התואם לשלב שבו הוא רשום, כך שתוסף שמייצר רק טוקנים וניתן ל‑`toCss` יתפספס עם הערה במקום לשתוק ולעשות כלום.

## הרכבת תוספים

בנה מעל תוסף קיים עם `extendPlugin`, או שלב תוספים שווים עם `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

hooks באותו שלב מרכיבים זה את זה: `tokens` מריץ קודם את הבסיס ואז את ההרחבה, `css` מאחד את שתי התרומות, ו‑`icons` מריץ את שניהם.

## אמת את פלט התוסף שלך

הרץ את בדיקות ה‑drift המשותפות מ‑`@pantoken/utils` על פלט התוסף בתוך הבדיקה שלו, כך שהטעות דפוס או שיחה מחדש של טוקן יכשלו מהר ובמקום:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## התוספים המסופקים בערכה

- `@pantoken/plugin-simple-icons` — מיתוג אייקונים מ‑simple-icons, רשומים כטוקני אייקון.
- `@pantoken/plugin-lucide-lab` — אייקוני Lucide Lab, רשומים כטוקני תמונה `--instui-icon-*`.
- `@pantoken/plugin-logos` — לוגואים של מוצרי Instructure כ‑SVGs, data URIs, וטוקני תמונה `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — תוסף PostCSS (לא תוסף pantoken) שמוריד משתני custom שלא בשימוש מתוך גיליון סגנונות.
- `@pantoken/plugin-custom-theme-colors` — ממותג מחדש דף על‑ידי הגדרת מאפיין אחד (`data-pantoken-color`) לאחד מ‑13 פלטות, או ל‑`custom` עבור כל hex מותג. ראו [צבעי נושא](#theme-colors).
- `@pantoken/plugin-custom-components` — בקרות מותאמות‑אישית מגובות בטוקנים, כולל SegmentedControl ו‑SkeletonLoader.

### בקר מפוצל (Segmented control)

השתמש בבקר מפוצל לשתי עד חמש תצוגות או פילטרים קשורים. כל אפשרות היא כפתור רדיו מקורי מתוייג בקבוצה בשם; סמנו אחת כב‑checked בהתחלה. השתמשו בטאבים או בתפריט נפתח אם האפשרויות לא יישבו בנוחות, והשתמשו בקבוצות כפתורים לפעולות ולא לבחירות. סגנון `-size-md` הוא ברירת המחדל, עם `-size-sm` ו‑`-size-lg` להקשרים צפופים ובולטים יותר.

ייבא `@pantoken/plugin-custom-components/segmented-control.css` עבור הבקר וכפתורי ה‑overflow שלו. השתמש בכיתה `-icon-*` על תוית מקטע כאשר המקטע צריך גליפ; עזר האינטראקציה גם מקדם כיתה `-icon-*` מהקלט המקורי אל צייר התוית. תן ל‑fieldset `aria-label` תיאורי או להציג legend נראית לעין. העזר שומר על הכרזת הרדיו המקורית, מוסיף ניווט מקלדת, ובאופציה מגלה מקטע אחד חתוך עם כל לחיצה על החצים. השתמש בשליטות התחלה/סיום לוגיות ותוויות כפתור נגישות בשני הכיוונים:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

ייבא `@pantoken/interactions/segmented-control.iife.js` לרישום כש‑DOM מוכן, או קרא ל‑`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` מ‑`@pantoken/interactions` וקרא ל‑`cleanup()` כשמסירים אותו. ה‑CSS ובחירות הרדיו המקוריות פועלות גם בלי JS; חיצי ה‑overflow דורשים את ההתנהגות. הפריט הנבחר משתמש בצל עיצוב דו‑שכבתי מהצבעים הסמנטיים של drop-shadow; זה צל פריט פעיל מובחן ולא קומפוזיט `--instui-elevation-*` קיים. כפתורי ה‑overflow משתמשים ב‑tokens של elevation3 מהמקור דרך `--pantoken-segmented-overflow-shadow`.

### טעינת שלד (Skeleton loading)

תת‑הנתיב `skeleton-loader.css` מעצב צורת Text, Avatar, או Image דקורטיבית אחת. Text מקבל `-size-xxs` דרך `-size-xxl`; Avatar ו‑Image הם בגודל בינוני. כל `.skeleton-row` אופציונלי מוסיף שורת טקסט בלי לשנות את הגודל. ה‑shimmer ב‑CSS נעצר אחרי שלוש סיבובים של 1.5 שניות ונשאר סטטי כאשר המשתמש מעדיף תנועה מוקטנת. זה עובד לפני ש‑JavaScript נטען.

מקם צורות רק במקום שבו תוכן תלוית‑שאילתה יופיע, לא מעל ניווט ידוע מהשרת, פילטרים, כותרות, או בקרות. שלד אינו מד מהתקדמות או מד מצב עסוק לפעולה. שמור על תוכן קיים נראה במהלך רענונים ברקע; השתמש בספינר או במצב עסוק של כפתור עבור פעולות.

האפליקציה ההורה אחראית על סימוני loading, loaded, empty, ו‑error. ספק אזור סטטוס ריק אחד לכל דף והתראה ריקה נפרדת ב‑HTML של השרת, שניהם **מחוץ** לאזור התוכן העסוק:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

קרא להתנהגות ברמת ההורה כאשר מצב הבקשה משתנה. היא מעדכנת את `aria-busy` ואת שתי ההכרזות הקיימות מראש, אך היא לעולם לא מחליפה תוכן או מעבירה פוקוס:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

אם משתמשים בחבילת האינטראקציות per‑component במקום הייבוא הישיר, שלחו אירוע `pantoken:skeleton-state` על ה‑אלמנט `[data-skeleton-region]` עם `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. דיחו את ה‑_הצגת_ במקום־המחול על ידי 200–500ms לבקשות מהירות; ההתנהגות מדחה באופן עצמאי את הכרזת ה‑loading ב‑400ms. בעמודים סטטיים, השאירו את הפוקוס במקום. העבירו פוקוס לתוצאה נטענת רק כאשר הפעולה נדרשה על‑ידי המשתמש. צומת הסטטוס מכריזה על תוצאות ומצבי ריק; צומת ההתראה מכריזה על כישלונות. אל תשלבו `aria-busy`, `role="status"`, ו‑`role="alert"` על אותו אלמנט.

הרשומה של Lucide Lab יכולה לטעון באופן עצל ואז להינתן ל‑synchronous token hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

כמה דברים שבעבר היו תוספים עכשיו נארזים ב‑`@pantoken/components`, מאחר שכל כך הרבה רכיבים צריכים אותם מחוץ לקופסה: צללי elevation (`--instui-elevation-*`, ב‑`components.css`), טבעת ה‑focus-outline (ב‑`base.css` — כל ניתן‑פוקוס מקבל אותה כאשר pantoken שולט בדף), וגופני המותג של Instructure (Atkinson Hyperlegible Next: `base.css` מיישם `--instui-font-family-base`; ה‑opt‑in `@pantoken/components/fonts.css` טוען את ה‑woff2s של `@font-face`).

## צבעי נושא

`@pantoken/plugin-custom-theme-colors` מפיק בלוק `[data-pantoken-color="…"]` יחיד לכל פלטה
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). כל בלוק מפנה את פרימיטיבים המותג (`--instui-primitive-color-navy-*` ו‑`-blue-*`) אל הפלטה הנבחרת. הוא גם מחדש־גזור את משטחי המותג שאוברסטרים שטחנו להקסים מילוליים, ושומר על האלפא המוטמעת שלהם דרך `color-mix()`. צבעי סטטוס סמנטיים, הדגשים כחולים מפורשים, וצללי elevation נשארים ללא שינוי. נסה זאת בדמו של theming מבוסס‑swatch: https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html.

```html
<html data-pantoken-color="sea"></html>
```

### צבע מותג מותאם אישית

הגדר את `data-pantoken-color="custom"` כדי למתג מחדש מכל hex, כמו הצבע הראשי שמנהל Canvas מקליד בעורך הנושא. pantoken גוזר ממנו סולם מלא של `--instui-primitive-color-custom-*` בגודל 10–200:

1. **עקומת ייחוס.** יעד הבהירות של כל שלב הוא ממוצע הבהירות ב‑OKLCH של 13 הפלטות באותו שלב, כאשר 0 קבוע ללבן ו‑210 לשחור. כך מרווח הסולם המותאם תואם את הפלטות המסופקות.
2. **עוגן.** הקלט נופל על השלב שהבהירות היעד שלו קרובה ביותר לשלו, ואז ננעל לאותה בהירות מדויקת. `#cccccc` הופך ל‑`custom-40` ב‑`#c9c9c9`: קרוב לקלט, אבל לא תמיד זהה. "הקרוב ביותר" פירושו השלום הקרוב ביותר על העקומה, לא הצבע הקיים הקרוב ביותר בפלטה.
3. **מילוי.** כל שלב אחר שומר על הגוון של הקלט. הרוויה שלו נעה לפי עקומת הרוויה הממוצעת של הפלטות ביחס לעוגן, ומוקטנת רק כאשר צבע יוצא מחוץ לטווח sRGB.

רק `#rgb` ו‑`#rrggbb` מתקבלים; כל דבר אחר זורק `TypeError`, כך שהקשת hex מטופס לא יכולה להזריק CSS.

בעת הבנייה, הפק את כלל השלם עם הפרימיטיבים הנגזרים כבר מוכרזים:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

כדי לבחור את הצבע בזמן ריצה בלי לשלוח את מערך הטוקנים, קדם־חשב את העקומה ואת כלל המיפוי בזמן הבנייה. ואז השתמש ב‑entry התלוי־אין `/scale` בדפדפן, וקבע רק את 20 הפרימיטיבים הנגזרים:

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

מחליף הנושאים באתר המסמכים, עורך הנושאים של Canvas, והדמו לעיל כולם עובדים כך.

ראו את [מפרט ה‑API](/api/) עבור הייצוא של כל תוסף.
