# התחלה מהירה

pantoken לוקח את עיצוב ה‑tokens והאייקונים של Instructure UI, פותר אותם פעם אחת, ומשנה את אותו מודל ל־packages עבור פלטפורמות רבות: גיליונות סגנון רגילים, SCSS ו‑Less, React ו‑Vue ו‑Svelte, Tailwind ו‑Panda, native Swift ו‑Kotlin, WordPress ו‑Drupal, Figma ועוד.

מוטמע החבילה הקטנה ביותר שמתאימה למשימה שלך. הכל גם מוארך מחדש ב־package המאוחד `pantoken`, לכן ניתן להתחיל שם ולצמצם מאוחר יותר.

## טמפלייט לפרויקט התחלתי

הדרך המהירה לנסות את pantoken: לטמפלט פרויקט התחלתי מותקן ומחובר מראש.

```sh
npx create-pantoken-app react
```

פלטפורמות: `components` (HTML/CSS פשוט), `react`, `vue`, `svelte`, `web-components`, `angular`. ראו
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) עבור `--dir <path>` ו‑שימוש פרוגרמטי.

משתמש בסוכן קידוד AI? אין צורך בהתקנה — הצביעו עליו ישירות על ה‑skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

זה עובד באותו אופן גם עבור Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, ו‑Amazon Q Developer CLI — החליפו `claude` ב‑`gemini`, `agent`, `codex`, `copilot -p`, או `q chat`. אם מעדיפים לחבר את כללי הסוכן של pantoken לרפוזיטורי באופן קבוע (AGENTS.md, חוקים לעורך, עותק מקומי של ה‑skill הזה), הריצו במקום זאת `npx @pantoken/ai init`.

## מודל ה‑tokens

Tokens הם מאפייני CSS מותאמים אישית בשם `--instui-<group>-<name>`, לדוגמה
`--instui-color-background-brand` או `--instui-spacing-space-md`. משלוח שלוש תמות: `rebrand`
(ברירת המחדל, עם `light-dark()` כאשר בהירות וחושך שונים), `canvas`, ו‑`canvasHighContrast`.
אייקונים הם tokens מסוג `<image>` (`--instui-icon-<name>`) נגזרים מ‑Lucide בתוספת הגליפים המותאמים של Instructure.

## עיצוב אפליקציית ווב

התקינו את גיליון הסגנון וייבאו אותו פעם אחת. הוא מגדיר כל מאפיין `--instui-*`, כך שניתן להתייחס אליהם ישירות מתוך ה‑CSS שלכם.

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

הווב‑קומפוננט עובד בכל framework, ללא המרה.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### tokens ב‑CSS

אייקונים הם מאפייני CSS מותאמים אישית (`--instui-icon-<name>`). טענו את גיליון הסגנון פעם אחת והתייחסו לכל אייקון כ־`mask-image` או `background-image` — אין צורך בייבוא פר‑אייקון.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — אייקון יחיד לעומת סט מלא

`@pantoken/icons` מייצא שני ייצואיים מנויים. השתמשו ב‑`iconsByName` כדי למשוך אייקון יחיד בלי לאטום את כל המערך:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

השתמשו ב‑`icons` כשצריך את הסט השלם (למשל לבניית בורר):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

שני הייצואיים טוענים את ה‑IR המלא בזמן אתחול המודול — אין tree‑shaking לפר‑אייקון ברמה הזו. לטעינה דלי"ת יותר שמבוססת רק על CSS, השתמשו ב‑[CDN picker](/guide/cdn-picker) כדי ליצור URL משולב רק לאייקונים שאתם צריכים.

## יצירה לפלטפורמות native

ה‑CLI כותב את מקור ה‑tokens לרפוזיטורי יעד. אין התקנה מעבר למריץ:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

ראו [the pantoken CLI](/guide/cli) עבור כל יעד.

## רמזים לעריכה ב‑VS Code

`@pantoken/pantoken` עכשיו משדר קבצי custom-data ל‑VS Code כך שפרויקטים צרכניים יכולים לקבל השלמות של class ו‑token ב‑HTML/CSS ללא התקנת תוסף pantoken ספציפי.

1. התקינו את החבילה המאוחדת:

```sh
npm i @pantoken/pantoken
```

1. הצביעו את VS Code על ה‑custom-data JSON המסופק מתוך סביבת העבודה שלכם:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. טענו מחדש את VS Code (או הריצו "Developer: Reload Window") כדי להחיל את הנתונים החדשים.

זה מאפשר הצעות עבור token‑י class של `instui-*` (וגם token‑י class של `-modifier`) בנוסף למאפייני custom של `--instui-*`.

## לאן מכאן

- [מפת החבילות](/guide/packages) — איזו חבילה להגיע אליה, לפי משימה.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — התקינו נכסי סוכן וחוקים ברפוזיטורי צרכן.
- [ארכיטקטורה](/guide/architecture) — איך מודל ה‑tokens, הליבה, והפלטים מתחברים זה לזה.
- [מדריך API](/api/) — כל סימן מיוצא, נוצר מהקוד המקור.
