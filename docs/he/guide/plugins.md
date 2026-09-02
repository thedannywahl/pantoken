# תוספים

תוסף pantoken מרחיב את פלט הטוקנים או ה-CSS ללא יצירת fork של חבילה. בונים אותו באמצעות `definePlugin` מ־`@pantoken/plugin-kit`, ואז מעבירים אותו אל `buildTokens` או `toCss`.

## יצירת תוסף

תנו ל־`definePlugin` את ה־hooks שאתם מממשים. הוא מחזיר תוסף רגיל, ממותג לפי היכולות הנגזרות מה־hooks האלה. תוסף יכול להרחיב את ה־IR (`tokens`, `icons`), את פלט ה־CSS (`css`), או את שניהם.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## רישום לפי יכולות

`buildTokens` ו־`toCss` מריצים את `checkPlugins` על פני התוספים שאתם מעבירים. הוא מציג אזהרה — הוא אף פעם לא זורק חריגה — כאשר לתוסף אין hook תואם לשלב שבו הוא נרשם, כך שתוסף שמיועד רק לטוקנים שמועבר ל־`toCss` יידחה עם הודעה במקום להישאר שקט וללא השפעה.

## הרכבת תוספים

בנו על בסיס תוסף קיים עם `extendPlugin`, או שלבו תוספים מקבילים עם `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

ה־hooks של אותו שלב מרכיבים זה את זה: `tokens` מריץ קודם את הבסיס ואז את התוספת, `css` ממזג את שני התרומות, ו־`icons` מריץ את שניהם.

## אמתו את פלט התוסף שלכם

הריצו את בדיקות ה־drift המשותפות מ־`@pantoken/utils` על פלט התוסף בעמודת הבדיקה שלו, כך שטעות הקלדה או שם טוקן ששונה יכשלו מהר ובמקומי:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## התוספים המצורפים

- `@pantoken/plugin-simple-icons` — ממותג אייקונים מ־simple-icons, מרושמים כתוקני אייקון.
- `@pantoken/plugin-logos` — לוגואים של מוצרי Instructure כ־SVGs, data URIs, ו־`--instui-logo-*` טוקני תמונה.
- `@pantoken/plugin-prune-custom-props` — תוסף PostCSS (לא תוסף pantoken) שמסיר מאפייני custom שלא בשימוש מקובץ הסגנונות.

כמה דברים שהיו בעבר תוספים עכשיו משולבים ב־`@pantoken/components`, מכיוון שרבים מהרכיבים זקוקים להם כברירת מחדל: צללי elevation (`--instui-elevation-*`, ב־`components.css`), טבעת קווי מתאר לפוקוס (ב־`base.css` — כל אלמנט שניתן למקד מקבל אותה כאשר pantoken שולט בעמוד), ופונטים של המותג Instructure (Atkinson Hyperlegible Next: `base.css` מיישם את `--instui-font-family-base`; ה־opt-in `@pantoken/components/fonts.css` טוען את קבצי ה־woff2 של `@font-face`).

ראו את ה[הפניה ל־API](/api/) עבור הייצוא של כל תוסף.
