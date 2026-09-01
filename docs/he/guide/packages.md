# מפת החבילות

pantoken הוא מונורפו של חבילות קטנות למטרה יחידה, מאורגנות בדליים. התקין את זו שמתאימה למשימה שלך, או התקין את החבילה המאוחדת `pantoken` וייבא מתתי-הנתיבים שלה (לדוגמה `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## ליבה

המודל המשותף וה-transformer שעליו הכל בנוי.

| Package                                                 | What it does                                                                                       |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | טיפוסי TypeScript ללא תלות חיצונית: הצורה `Token` וחוזה התוסף.                                     |
| [`@pantoken/core`](/api/packages/core/src/)             | פותר את הטוקנים והאייקונים הממקוריים ל-IR הקנוני, ומייצר CSS.                                      |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | ה-IR הממופה שנמכר כ-JSON סטטי, לפי נושא, בנוסף למקור Tokens Studio הגולמי.                         |
| [`@pantoken/utils`](/api/packages/utils/src/)           | הפותר של הטוקנים, רגקסים להפניות, עזרי כתיבה ומקרה וצבע, בדיקות סטייה, ומפיצי token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | בנייה והרכבת תוספי pantoken עם `definePlugin`.                                                     |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — מפיק מקור לפלטפורמות ולשפות מקור.                                   |

## פורמטים

הפיכת הטוקנים לפורמט קובץ.

| Package                                                | Output                                                                                                                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS ממויין לפי `@property` עם טיפוסי `light-dark()` ואייקונים ב-data-URI.                                                                                                       |
| [`@pantoken/scss`](/api/formats/scss/src/)             | משתני SCSS, מומשים למצב יחיד.                                                                                                                                                   |
| [`@pantoken/less`](/api/formats/less/src/)             | משתני Less.                                                                                                                                                                     |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | משתני Stylus.                                                                                                                                                                   |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | מסמך W3C Design Tokens (DTCG).                                                                                                                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | ה-IR כ-JavaScript ו-JSON (גם מוזכר תחת Core).                                                                                                                                   |
| [`@pantoken/icons`](/api/formats/icons/src/)           | מבט ארגונומי על טוקני האייקונים.                                                                                                                                                |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | גופן ווב של אייקונים (TTF, WOFF2) ותוספת ה-CSS שלו.                                                                                                                             |
| [`@pantoken/components`](/api/formats/components/src/) | ספריית קומפוננטות CSS בסגנון InstUI (כפתור, התראה, טבלה ועוד) בנוסף לאיפוס בסיסי עם טבעת מיקוד, עיצוב פרוזה, שירותים רוחביים וגופני המותג. ראה [Components](/guide/components). |

## רנדררים

אינטגרציות למסגרות וכלים.

| Package                                                                                                                                          | For                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | hooks ל-React, `<Icon>`, וספק טוקנים.                   |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | הרכיב ווב, מחובר לכל מסגרת.                             |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | אובייקטי טוקנים ידידותיים ל-StyleSheet (ללא משתני CSS). |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` ופרימיטיבים מעוצבים, מותאמים למסגרות.   |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | הגדרת טוקנים לאתרים ב-Astro.                            |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | טוקני אייקונים ודגימות צבע במארקדאון.                   |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | תוסף markdown-it לקודי אייקונים ודגמי צבע.              |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | תמה טיפוסית ל-styled-components ו-Emotion.              |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | נושא ל-Material UI.                                     |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | גשרים המבוססים על משתני CSS ל-Bootstrap ול-shadcn/ui.   |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | ביטול הגדרות Sass ו-layer של CSS ל-Foundation.          |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | נושאים ל-Docusaurus ו-VitePress.                        |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | נושא Mintlify `docs.json` (צבעים + רקע).                |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | נושא ל-Storybook.                                       |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS גלובלי בסגנון Instructure למדריכי Pendo.            |

## בנדלרים

אינטגרציות לכלי בנייה.

| Package                                             | For                                           |
| --------------------------------------------------- | --------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | תוסף Vite עם מודולים וירטואליים והזרקת CSS.   |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` ל-Next.js `transpilePackages`. |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | תוסף webpack.                                 |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | כלל at-rule של `@pantoken;`.                  |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | פריסט של Tailwind.                            |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | פריסט של Panda CSS.                           |

## פלטפורמות

יעדי שפת מקור וגנרטורים לאתרים, מופקים על ידי ה-CLI או ה-API של כל אחד.

| Package                                                                                        | Output                              |
| ---------------------------------------------------------------------------------------------- | ----------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | מקור Swift בתוספת טיוטת SwiftPM.    |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | משאבים ב-XML ל-Android.             |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose בקוטלין.            |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                       |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | consts ברסט לשימוש ב-egui או iced.  |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | ערכת נושא ל-WordPress `theme.json`. |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | `variables.json` ל-Vanilla Forums.  |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | נכסי נושא ל-Drupal.                 |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | נתוני אתר ל-Hugo ו-Jekyll.          |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | ערכים ידידותיים לאימייל HTML.       |

## עיצוב

לכלי עיצוב.

| Package                                           | Output                                                               |
| ------------------------------------------------- | -------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | חבילת Figma Variables.                                               |
| [`@pantoken/swatches`](/api/design/swatches/src/) | דגימות צבע (ASE, GPL, Sketch) בנוסף לגליון דגימה SVG שניתן לצפות בו. |

## תוספים

טרנספורמים אופציונליים שמרחיבים את פלט הטוקנים או ה-CSS. ראה [Plugins](/guide/plugins).

| Package                                                                               | What it adds                                                 |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | עומקי z-index ממונים כש-token`--instui-stacking-*`.          |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | קו מתאר לדיבוג פריסת `-with-visual-debug`.                   |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | אייקוני מותגים מ-simple-icons.                               |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | לוגואים של מוצרי Instructure כ-SVG, data URIs, וטוקני תמונה. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | תוסף PostCSS שמסיר custom properties שלא בשימוש.             |

## כלים

תשתית בנייה, מסמכים ודמו עבור המונורפו עצמו. רובם פנימיים, אך החלקים עצמאיים ולכן מתועדים כאן וחלקם מתפרסמים ל-npm כיחידות נפרדות.

| Package                                            | What it does                                                                                                                                                                     |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | מייצר את חבילת ה-barrel המאוחדת `pantoken` ואת `exports` מתוך התלויות שלה.                                                                                                       |
| `@pantoken/validate-generated`                     | שער ה-drift: בודק שכל גיליון הסטייל המיוצר מתפרש כנגד ה-IR של הטוקנים.                                                                                                           |
| [`@pantoken/demo`](/api/tools/demo/src/)           | ראנר דמו self-hosted: פותר תקינה `@demo` לאייפריים ומציג HTML/CSS/JS נקי מאותו מקור, מותאם לנושא הטוקנים.                                                                        |
| `@cssdoc/core` (external)                          | מאיץ חילוץ תיעוד CSS כללי (TSDoc עבור CSS): מפענח תגובות דוקומנטציה + AST של CSS למודל שהדוקס מפיקים ממנו את התיעוד של ה-API של ה-CSS. שוכן בריפו משלו; נצרך כ-dependency מקושר. |

`@pantoken/validate-generated` הוא סקריפט הרצה-אחת (מוזמן על ידי `pnpm run ready`), ולכן אין לו דף API; לשאר החבילות יש דפי API.

## AI

נכסי הגדרה לצרכני AI. אלה לשימוש בפרויקטים שמשתמשים ב-pantoken, לא לפיתוח pantoken עצמו.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) מתקין `AGENTS.md`, `llms.txt`, וכללי עוזר/עורך (Cursor, Copilot, Windsurf, Claude Code) למאגר צרכן.

## תוספי פיתוח

תוספים שאנחנו מפתחים לכלים שבהם אנו עובדים, מקובצים לפי המארח. הם עצמאיים וניתנים לפרסום בנפרד.

| Package                                                                                  | Plugs into                                                                       |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: הופך תגית בלוק `@demo <provider>:<ref>` לתגיית דמו ניתנת להשתלה.        |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: בונה מחדש חבילות upstream של ה-workspace (והתלויות) כאשר המקור שלהן משתנה. |
