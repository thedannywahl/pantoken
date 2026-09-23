# תוספים

תוסף של pantoken מרחיב את הפלט של הטוקנים או ה‑CSS ללא יצירת fork של חבילה. בונים אותו עם
`definePlugin` מ‑`@pantoken/plugin-kit`, ואז מעבירים אותו ל‑`buildTokens` או `toCss`.

## כתיבת תוסף

תנו ל‑`definePlugin` את ה‑hooks שאתם מיישמים. הוא מחזיר תוסף רגיל, מסומן עם
היכולות שהוסקו מה‑hooks הללו. תוסף יכול להרחיב את ה‑IR (`tokens`, `icons`), את פלט ה‑CSS
(`css`), או את שניהם.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## רישום המודע ליכולות

`buildTokens` ו‑`toCss` מריצים את `checkPlugins` על גבי התוספים שאתם מעבירים. זה מוּזהר — לעולם לא זורק —
כאשר לתוסף אין hook תואם לשלב שבו הוא נרשם, כך שבתוסף שמטפל רק בטוקנים שמועבר ל‑`toCss` יהיה הודעה וההתעלמות במקום פעולה שקטה.

## קומפוזיציית תוספים

בנו על גבי תוסף קיים עם `extendPlugin`, או שילבו תוספים מקבילים עם `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

hooks של אותו שלב מורכבים: `tokens` מריץ את הבסיס ואז את התוספת, `css` ממזג את שתי
התוספות, ו‑`icons` מריץ שניהם.

## אמתו את פלט התוסף שלכם

הריצו את בדיקות ה‑drift המשותפות מ‑`@pantoken/utils` על פלט התוסף בתוך המבחן שלו, כך טעות כתיב או שינוי שם טוקן ייכשלו מהר ובמקומי:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## התוספים הכלולים בחבילה

- `@pantoken/plugin-simple-icons` — מסמן אייקונים מ‑simple-icons, נרשם כתוקני אייקון.
- `@pantoken/plugin-lucide-lab` — אייקונים של Lucide Lab, נרשמים כ־`--instui-icon-*` תוקני תמונה.
- `@pantoken/plugin-logos` — לוגואים של מוצרי Instructure כ‑SVG, כתמונות URI נתונים, ו‑`--instui-logo-*`
  תוקני תמונה.
- `@pantoken/plugin-prune-custom-props` — תוסף PostCSS (ולא תוסף pantoken) שמסיר
  custom properties שאינן בשימוש מקובץ הסגנון.

הרשימה של Lucide Lab ניתנת לטעינה באופן עצלני, ואז להעברה ל‑hook הסינכרוני של הטוקנים:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

כמה דברים שהיו בעבר תוספים עכשיו נשלחים בתוך `@pantoken/components`, מכיוון שרבים מהקומפוננטות צריכים אותם כברירת מחדל: צללי elevation (`--instui-elevation-*`, ב‑`components.css`), טבעת ה‑focus‑outline
(ב‑`base.css` — כל אלמנט נגיש מקבל אותה כשהדף נשלט על‑ידי pantoken), וגופני המותג של Instructure
(Atkinson Hyperlegible Next: `base.css` מיישם את `--instui-font-family-base`; ה‑opt‑in
`@pantoken/components/fonts.css` טוען את קבצי ה‑woff2 של `@font-face`).

ראו את ה‑[API reference](/api/) עבור היצוא של כל תוסף.
