# התחלה

Pantoken מקבל את ערכי העיצוב והאייקונים של [Instructure UI](https://instructure.design), פותר אותם פעם אחת, ומשנה את אותו
מודל לחבילות לפלטפורמות רבות: גיליונות סגנון רגילים, SCSS ו-Less, React ו-Vue ו-Svelte,
Tailwind ו-Panda, Swift ו-Kotlin מקומיים, WordPress ו-Drupal, Figma ועוד.

מתקינים את חבילת המינימום שמתאימה למשימה. הכל גם מיוצא מחדש על ידי החבילה המאוחדת
`pantoken`, כך שאפשר להתחיל שם ולהצמצם מאוחר יותר.

## יצירת פרויקט התחלה

הדרך המהירה ביותר לנסות את pantoken: ליצור פרויקט התחלה שמותקן ומחובר כבר.

```sh
npx create-pantoken-app
```

פלטפורמות: `components` (HTML/CSS פשוט), `react`, `vue`, `svelte`, `web-components`, `angular`. ראה
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) עבור `--dir <path>` ושימוש פרוגרמטי.

משתמש בסוכן קוד מבוסס AI? אין צורך בהתקנה — הפנה אותו ישירות לכישורים:

```prompt
שלוף את create.pantoken.app/SKILL.md ופעל על פיו כדי להגדיר את pantoken בפרויקט זה.
```

אם מעדיפים לחבר באופן קבוע את כללי הסוכן של pantoken למאגר (AGENTS.md, כללי עורך, עותק מקומי של הכישור הזה), להריץ `npx @pantoken/ai init` במקום.

## מודל הטוקנים

טוקנים הם תכונות מותאמות של CSS בשם `--instui-<group>-<name>`, לדוגמה
`--instui-color-background-brand` או `--instui-spacing-space-md`. משולחות שלוש ערכות נושא: `rebrand`
(ברירת המחדל, עם `light-dark()` שבהן בהירות וחושך שונות), `canvas`, ו-`canvasHighContrast`.
אייקונים הם טוקני `<image>` (`--instui-icon-<name>`) הנגזרים מ-Lucide בנוסף לציוריים המותאמים של Instructure.

## עיצוב אפליקציית ווב

התקינו את גיליון הסגנון וייבאו אותו פעם אחת. הוא מגדיר כל תכונת `--instui-*`, כך שתפנו
אליהן ישירות מתוך ה-CSS שלכם.

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

## שימוש באייקונים בכל מקום

רכיב ה-web עובד בכל מסגרת, ללא צורך בהמרה.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### טוקני CSS

אייקונים הם תכונות מותאמות של CSS (`--instui-icon-<name>`). טענו את גיליון הסגנון פעם אחת והתייחסו לכל
אייקון כ-`mask-image` או `background-image` — אין צורך בייבוא לכל אייקון בנפרד.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — אייקון יחיד לעומת סט מלא

`@pantoken/icons` מייצא שני יצואיים בשם. השתמשו ב-`iconsByName` כדי למשוך אייקון יחידי בלי לעבור
על כל המערך:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

השתמשו ב-`icons` כשצריך את הסט המלא (למשל כדי לבנות בורר):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

שני היצואיים טוענים את ה-IR המלא בעת אתחול המודול — אין tree-shaking לאייקון בודד ברמה הזו. לטעינה קומפקטית מבוססת CSS בלבד, השתמשו ב-[CDN picker](/guide/cdn-picker) כדי לייצר URL משולב
רק עבור האייקונים שאתם צריכים.

## יצירה לפלטפורמה מקומית

ה-CLI כותב מקור טוקנים לתוך מאגר היעד. אין התקנה מעבר להרצה:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

ראה [the pantoken CLI](/guide/cli) עבור כל יעד.

## רמזים לעריכה ב-VS Code

`@pantoken/pantoken` כעת כולל קבצי custom-data ל-VS Code כך שפרויקטים צורכים יכולים לקבל השלמות לכיתות ולטוקנים ב-HTML/CSS בלי להתקין תוסף ספציפי ל-pantoken.

1. התקינו את החבילה המאוחדת:

```sh
npm i @pantoken/pantoken
```

1. הכוונו את VS Code אל ה-custom-data JSON שנשלח מהמקום הצרכן שלכם:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. טענו מחדש את VS Code (או הריצו "Developer: Reload Window") כדי להחיל את הנתונים החדשים.

זה מאפשר הצעות עבור טוקני כיתה `instui-*` (ו-`-modifier` לטוקני כיתה) בנוסף
לתכונות מותאמות `--instui-*`.

## לאן להמשיך

- [מפת החבילות](/guide/packages) — איזו חבילה לגשת לפי משימה.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — התקנת נכסי סוכן וכללים במאגר צרכן.
- [ארכיטקטורה](/guide/architecture) — כיצד מודל הטוקנים, הליבה והתוצאות משתלבים זה בזה.
- [תיעוד API](/api/) — כל סימול מיוצא, שנוצר מהמקור.
