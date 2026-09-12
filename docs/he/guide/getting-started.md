# התחלה מהירה

Pantoken לוקח את עיצובי ה-tokens והאייקונים של [Instructure UI](https://instructure.design), מפענח אותם פעם אחת, ומשנה את אותו
מודל לחבילות לפלטפורמות רבות: גיליונות סגנון רגילים, SCSS ו-Less, React ו-Vue ו-Svelte,
Tailwind ו-Panda, Swift ו-Kotlin נייטיביים, WordPress ו-Drupal, Figma, ועוד.

מתקינים את החבילה הקטנה ביותר שמתאימה למשימה. הכל גם מיוצא מחדש על ידי החבילה המאוחדת
`pantoken`, כך שאפשר להתחיל שם ולהצטמצם מאוחר יותר.

## יצירת פרויקט התחלתי

הדרך המהירה ביותר לנסות את pantoken: ליצור פרויקט התחלתי עם ההתקנה והחיבור כבר קיימים.

```sh
npx create-pantoken-app
```

פלטפורמות: `components` (HTML/CSS פשוט), `react`, `vue`, `svelte`, `web-components`, `angular`. ראה
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) עבור `--dir <path>` ו
שימוש תכנותי.

משתמשים בסוכן קוד מבוסס AI? אין צורך להתקין — כוון אותו ישירות למיומנות:

```prompt
הורד את create.pantoken.app/SKILL.md ופעל על פיו כדי להגדיר את pantoken בפרויקט זה.
```

אם מעדיפים לשלב את כללי הסוכן של pantoken בריפוזיטורי באופן קבוע (AGENTS.md, כללי עורך, העתק מקומי של מיומנות זו), הריצו `npx @pantoken/ai init` במקום.

## מודל הטוקנים

טוקנים הם תכונות מותאמות של CSS בשם `--instui-<group>-<name>`, למשל
`--instui-color-background-brand` או `--instui-spacing-space-md`. משלוח שלוש תמות: `rebrand`
(ברירת המחדל, עם `light-dark()` כאשר בהירות ושחור משתנים), `canvas`, ו-`canvasHighContrast`.
אייקונים הם טוקני `<image>` (`--instui-icon-<name>`) המקורם ב-Lucide בתוספת גליפים מותאמים של Instructure.

## עיצוב אפליקציית ווב

התקינו את גיליון הסגנון וייבאו אותו פעם אחת. הוא מגדיר כל תכונת `--instui-*`, כך שאתם מתייחסים
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

רכיב ה-web עובד בכל פריימוורק, ללא צורך ב-porting.

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

### JavaScript — אייקון יחיד לעומת המכלול המלא

`@pantoken/icons` חושף שתי ייצואיות בשם. השתמשו ב-`iconsByName` כדי למשוך אייקון יחיד בלי לעבור
על כל המערך:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

השתמשו ב-`icons` כשצריך את המכלול המלא (למשל לבניית בורר):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

שני הייצואיות טוענות את ה-IR המלא בזמן אתחול המודול — אין tree-shaking per-icon ברמה זו. לטעינה קומפקטית מבוססת CSS בלבד, השתמשו ב-[CDN picker](/guide/cdn-picker) כדי ליצור URL משולב רק לאייקונים שאתם צריכים.

## יצירה לפלטפורמה נייטיבית

ה-CLI כותב את מקור הטוקנים לתוך ריפו יעד. אין צורך בהתקנה מעבר לרץ:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

ראה [the pantoken CLI](/guide/cli) עבור כל יעד אפשרי.

## רמזים לעריכה ב-VS Code

`@pantoken/pantoken` כעת שולח קבצי custom-data ל-VS Code כדי שפרויקטים צאצאיים יקבלו השלמת מחלקות וטוקנים ב-HTML/CSS בלי התקנת תוספת ספציפית ל-pantoken.

1. התקינו את החבילה המאוחדת:

```sh
npm i @pantoken/pantoken
```

1. כוונו את VS Code אל קובץ ה-custom-data JSON שנשלח מתוך סביבת הצרכן שלכם:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. טענו מחדש את VS Code (או הריצו "Developer: Reload Window") כדי להחיל את הנתונים החדשים.

זה מאפשר הצעות עבור טוקני מחלקות `instui-*` (ועבור טוקני מחלקות `-modifier`) וכן
תכונות מותאמות `--instui-*`.

## לאן מכאן

- [מפת החבילות](/api/) — איזו חבילה לבחור, לפי משימה.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — התקינו נכסי סוכן וכללים בריפו צרכן.
- [ארכיטקטורה](/guide/architecture) — כיצד מודל הטוקנים, ה-core, והתוצרים משתלבים.
- [מדריך API](/api/) — כל סימן מיוצא, שנוצר מהקוד המקור.
