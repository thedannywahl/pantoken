# רכיבים

`@pantoken/components` שולח סגנונות רכיבים מבוססי-מחלקה הבנויים מתוך הטוקנים של Instructure. ייבא את גיליון-הסגנון ותיייג את הסימון שלך — אין צורך במסגרת עבודה.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> מעדיפים אלמנטים מותאמים? `@pantoken/web-components` עוטף את אותם סגנונות כ־`<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` ועוד — ראה את
> [מפת החבילות](/guide/packages).

## קונבנציות

הקונבנציות של CSS בחבילה זו מבוססות על גרסה מותאמת של [RSCSS](https://ricostacruz.com/rscss/index.html).

המודיפיירים הם **מפתח-ערך** — `-<prop>-<val>`, מיושרים לשמות הפרופס של InstUI — כך שהם קוראים בעצמם: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. פרופסי בוליאן הם שם הפרופ בלבד, ונוכחותם מציינת `true` (`-has-shadow`, `-clickable`); בוליאן שמופעל כברירת מחדל וכבוֹתוּ מַהֲפֵךְ (`-without-background`, `-without-border`). גדלים מקבלים גם צִרְפִיּוּת קצרה וגם ארוכה (`-size-sm` = `-size-small`). כאשר שם סוטה מ‑InstUI, המחלקה לפי המשמעות של InstUI עדיין עובדת אך מיושנת (למשל `-variant-info` → השתמש ב־`-color-info`).

### דוגמה

רכיב React של Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

רכיבי pantoken:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

עבור הפרופ `timeout` של InstUI, הגדר את תכונת ה‑CSS המותאמת ללא יחידות `--timeout` במילישניות וטעון את האינטראקציה של Alert. ערך חי מתזמן סגירה; `0` (ברירת המחדל) משאיר את האזהרה במקום. הוסף את המחלקות `instui-transition -fade-entered` של היוטיליטי `transition` עבור ה‑fade של InstUI; השמט אותן להסרה מיידית. האינטראקציה מניעה את מצב `-fade-exiting` ושולחת אירוע `dismiss` שניתן לביטול וזורם לפני ההסרה, כך שאפליקציה יכולה לקרוא `preventDefault()` כדי לשמור את האזהרה מותקנת.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

ממשקי התקדמות מקבלים סולמות שרירותיים דרך `--min` (`0` כברירת מחדל), `--value`, ו־`--max`
(`100` כברירת מחדל), עם כינויים מיושנים `--value-now` ו־`--value-max`. הוסף `-should-animate`
כדי להחיל את הטרנזישן חצי השנייה של InstUI בכל פעם שערך משתנה. `.value` יושב לצד `.bar` בתור
בן‑ילד של השורש; הוסף `-render-value-inside` כדי להציג אותו מעל הטרק, מיושר להתחלה שלו,
במקום זאת (עצב אותו לקריאות מול צבע המטר). השתמש ב־`<progress>` מקורי לטווח שמתחיל באפס ו־`<meter>` כאשר המינימום אינו אפס; רכיבי הווב בוחרים ביניהם אוטומטית לפי התכונה `min`. ל‑InstUI אין מצב בלתי‑מוגדר, לכן `<progress>`
שחסר את התכונה `value` הוא החלטת ברירת מחדל של pantoken: `progress-bar` מאנימט את `.bar` כקטע מחליק ו־`progress-circle` מסובב את הטבעת בקשת קבועה, כששניהם מסתירים `.value`.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

מעגלי התקדמות מקבלים את אותם סולמות שרירותיים דרך `--min`, `--value`, ו־`--max`.
`--value-now` ו־`--value-max` נותרים ככינויים פונקציונליים מיושנים. הוסף `-should-animate` וטעון את חבילת האינטראקציות הממוקדת כדי לשחזר את אנימציית ההרכבה של InstUI; `--animation-delay` הוא
השהיית מילישניות ללא יחידות. האיותים המיושנים `-should-animate-on-mount` ו‑
`-shold-animate-on-mount` נשארים ככינויים פונקציונליים.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## קידומת מחלקה

כל מחלקה מקוטלגת בברירת מחדל עם שמחה `instui-`. בנה גיליון‑סגנון עם קידומת משלך — או ללא — על‑ידי העברת `prefix` לכל בנאי. כל ערך falsey (`null`, `undefined`, `""`, או השמטתו) מסיר את הקידומת לחלוטין, כך שתוכל לכתוב `class="heading -level-h1"` במקום `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

המוסיפים המתחילים בקו־מקף (`.-color-secondary`, `.-level-h1`) נשארים ללא שינוי בכל מקרה. גיליונות‑הסגנון שנשלחים עם החבילה שומרים על הקידומת `instui`.

## בסיס

`base.css` הוא איפוס אופציונלי שמגדיר ברירות מחדל גלובליות במסמך מתוך הטוקנים: `box-sizing`, איפוס `body`, משטח הדף, צבע וטקסט בסיסי וגישת הגופן, `color-scheme` (כך שטוקנים `light-dark()` ושליטה מקומית עוקבים אחר הנושא), וקישור בסיסי. טען אותו פעם, לפני גיליונות הרכיבים והפרוזה, כאשר pantoken שולט על הדף.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

דלג עליו כשאתה משבץ רכיבים בתוך מארח שכבר מנושא את `html` ו־`body` שלו — האיפוס צובע את משטח הדף, כך שלא תרצה שהוא יתנגש עם המארח. כל מה שהוא מגדיר משתמש בבחירות ספציפיות־נמוכות `:where()`, כך שהחוקים שלך תמיד גוברים.

`base.css` מְיַשֵּׂם את גופן המותג (`font-family: var(--instui-font-family-base)`, עם גיבויי מערכת);
כדי לטעון אותו, ייבא את `fonts.css` האופציונלי — כללי `@font-face` ל־Atkinson Hyperlegible
Next, המצביעים על ה‑woff2s שנשלחו בחבילה. הוא נפרד כי הגופנים הם ~350 kB
ואירוח עצמי של גופנים הוא בחירה מכוונת.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## תוכן לקורא מסכים (screen reader)

<p>יש הודעה מוסתרת אחרי המשפט הזה.<span class="instui-screen-reader-content">רק קוראי מסכים מודיעים על זה.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` מסתיר אלמנט חזותית בעוד משאיר אותו בעץ הנגישות — עבור תוויות וטקסט סטטוס שתוכנות מסייעות צריכות לקרוא אך העיצוב לא צריך להציג.

## יוטיליטים

`utilities.css` הוא שכבה אופציונלית של מחלקות חוצות־חומרה: פרימיטיב `View`, ריווח על סקאלת הטוקנים, והחלפות צבע סמנטיות. בניגוד למחלקות `-modifier` של הרכיבים, אלו משתמשות ב**קו־מקף כפול** (`--mod`) כדי שלא יתנגשו לעולם עם שמות המודיפייר של רכיב, והן חלות על כל אלמנט — יחיד, או מורכב על רכיב.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">משטח בצבע accent-blue עם טקסט על‑הצבע.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">מוקד עם mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` הוא ה־`View` של InstUI. זה הבסיס שעליו את/ה מקימה ריווח וצבע, והוא
נושא מודיפיירים מפתח‑ערך לפרופסי הוויזואלי שלו כך שלא תצטרך להשתמש ביוטיליטים:
`-background-*` (המשטחים שלו), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, ו־`-cursor-*` — אלה המודיפיירים של `view` עם מקף יחיד, שאינם קשורים ליוטיליטי הקו‑מקף‑הכפול למטה. פרופסי ערך‑חופשי
(width/height/inset) נשארים בסגנונות inline; `margin`/`padding` משתמשים ביוטיליטי הריווח.

**ריווח (Spacing)** — מחלקות לפרצוות על סקאלת הריווח. קרא להן כ־`{m|p}{side}-{step}`: `m` עבור
מרג'ין או `p` עבור פדינג (או המילים המלאות `margin`/`padding`), צד לוגי אופציונלי, ואז שלב. לכן `.--m-lg` ו־`.--margin-lg` זהים, וכמו `.--pt-md` ו־`.--paddingt-md`.

- צדדים: none (הכול), `t`/`b` (התחלת/סיום בלוק), `s`/`e` (התחלת/סיום אינליין), `x`/`y` (ציר אינליין/בלוק). הצדדים הלוגיים נשארים נכונים בפריסות ימין‑לשמאל.
- שלבים: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, ועוד `auto` עבור מרג'ין בלבד.

רכיב אותן עבור קיצור הדרך `margin="small auto large"` של InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**צבע** — החלפות סמנטיות שנשארות על‑פלטת הצבעים: `.--bg-<name>` (רקע),
`.--text-<name>` (צבע טקסט), ו־`.--border-<name>` (צבע גבול). כל `<name>` הוא
טוקן צבע סמנטי — הכוונות (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) בתוספת פלטת `accent-*` (`accent-blue`, `accent-green`, וכן הלאה). שם קיים רק אם הטוקן קיים במשפחה ההיא, לכן `text-brand` אינה מחלקה — לטקסט אין טוקן מותג. אין דרך להגיע לפרימיטיב או להקס שרירותי, וכל החלפה עוקבת אחר הנושא.

**משפחות טוקנים** — לכל משפחה של "טוקן אחד, נכס אחד" יש מחלקה לכל טוקן, בשם הטוקן. הרכב אותן חופשי:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ו‑`-depth1`…`-card`) → `box-shadow`

כל אחת מגדירה רק את הנכס שלה, כך ש־`border-width`/`border-radius` צריכים צבע `border-*` וסגנון גבול כדי לצייר גבול בפועל. אלה משתמשים בשם הטוקן המלא (`.--border-radius-md`), בעוד העוזרים לצבע ולריווח למעלה משתמשים בכינויים קצרים (`.--bg-brand`, `.--mt-lg`) — הכינויים הם קיצורי נוחות; מחלקות הטוקן הן מילוליות וממצוינות.

**פריסה (Layout)** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) ו־`.--text-align-<value>` (`start`, `center`, `end`, `justify`) מכסים את
הפרופסים החוצי־חומרה של InstUI `display` ו־`textAlign` (View, Button, Metric, Tabs, …) ככיתות קומפוזיציה —
כך שאלו אינם מודיפיירים per‑component.

כל מחלקת הקו‑מקף‑הכפול גוברת בקסקדה באופן דטרמיניסטי על מודיפייר של רכיב עם אותו השם ומקף יחיד, ללא תלות בסדר ייבוא גיליונות‑הסגנון — ראה [קונבנציות כתיבה](/conventions/authoring) למנגנון.

הכול כאן מונע מ‑CSS טהור על‑ידי הטוקנים `--instui-*`, כך שהוא עוקב אחרי InstUI דרך שכבת הטוקנים. ראה את [מכוון ה‑API](/api/) עבור `componentsCss` ובוני הרכיבים לפי‑רכיב.

## שכבות עליונות: דיאלוג ופופובר

רכיבי השכבה העליונה משתמשים בפרימיטיבים מקומיים של הפלטפורמה, כך שהם מתנהגים נגיש עם מעט או בלי JavaScript.

**Modal** — שים `.instui-modal` על `<dialog>` מקורי. הוא מקבל לכידת פוקוס, סגירה ב־`Esc`, ו־`::backdrop` בחינם; הרקע מורדם עם אותו טוקן `--instui-component-mask-background-color`
כמו `.instui-mask` (הוסף `-blur` כדי לקרר אותו). פתח וסגור עם פקודות Invoker — בלי סקריפט:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — שים `.instui-context-view` על אלמנט `[popover]` ו断toggle אותו עם
`popovertarget`. הוא רוכב על השכבה העליונה ומתבטל בלחיצה מחוץ או ב־`Esc`, שוב ללא סקריפט:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**פריסת Drawer** — שים `.instui-drawer-layout` על שורש פריסה עם `.tray` ו־`.content`
בנים. הוסף את התכונה `open` (או `-open`) כדי לגלות את המגש, והשתמש ב־`placement="end"`
(או `-placement-end`) כדי לעגן אותו לצד הסיום האינליין — המיקום נפתר דרך תכונות לוגיות `inset-inline-*`/`flex-direction`, כך שהוא מתהפך אוטומטית תחת `dir="rtl"` ללא כל חוקים נוספים. חבילת האינטראקציה הממוקדת מוסיפה ניתוב פקודות Invoker ומחליפה את מצב השכבה העליונה
(`should-overlay-tray`) כאשר הרוחב חוצה את `--drawer-layout-min-width` (ברירת מחדל
`--instui-breakpoints-sm`, ואז `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` נשאר למשטחי שכבות בזרם (spinner מעל כרטיס); `::backdrop` של מודל מכסה את המקרה של המודאל.

שני התבניות גם עטופות כאלמנטים מותנהי‑התנהגות ב־`@pantoken/web-components`:
`<instui-modal open>` (_`<dialog>`_ מונחה על‑ידי התכונה `open`) ו־`<instui-context-view>` (popover מקורי).

תמיכת דפדפנים: API של popover ו־`popovertarget` הם Baseline 2024; פקודות Invoker
(`command`/`commandfor`) הן Baseline 2025, לכן בדפדפנים ישנים יותר חבר/י את הכפתורים ל־`dialog.showModal()` כפתרון ברירת מחדל בשורה אחת. מיקום פופובר לצד הטריגר שלו משתמש במיקום עוגן של CSS כשהוא נתמך (Chromium); במקום אחר הוא מתרכז בשכבה העליונה.

## טפסים

**FormField** — `.instui-form-field` הוא עטיפה ב‑CSS‑Grid שמסדרת תווית, הבקרה, וכל ההודעות. שים אותו על `<label>` כך שהתווית תשתייך לבקרה באופן מקורי. יש לו שלוש אזורי גריד — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (ברירת מחדל) מונח את האזורים זה על גבי זה; `-layout-inline` מציב את התווית לצד הבקרה (כוון עם `-label-align-{start,end}` ו־`-v-align-{top,middle,bottom}`). `-readonly` משנה את צבע התווית.

ה"אסטריסק הנדרש" מופיע כאשר השדה נדרש על‑ידי _אחת_ מהמחלקות `-required` _או_ בקרה מקומית `required` בתוכו — כך שאפשר פשוט להגדיר `required` על הקלט והסימון יופיע.
הוא קישוטי (אלמנט `::after` על התווית, מחוץ לעץ הנגישות); צמד אותו עם הערה כמו
"שדות המסומנים ב־\* הם חובה" אלא אם הטופס מובן מאליו.

**FormFieldGroup** — `.instui-form-field-group` מקבץ שדות קשורים בתוך `<fieldset>` עם תאור `<legend>`. זה פריסה טהורה (ללא טוקנים מיוחדים): ברירת המחדל מונחת את השדות; `-layout-columns` / `-layout-inline` מזרימות אותם לעמודות רספונסיביות, עם `-row-spacing-*` /
`-col-spacing-*` ו־`-v-align-*` לכוונון הגריד.

**RadioInputGroup** — `.instui-radio-input-group` הוא אותו `<fieldset>`/`<legend>` קיבוץ,
מוגדר לרדיו. מאחר שהרדיו‑בנים משתפים `name`, הבחירה היא מקומית חד‑ברירתית —
כך שקבוצת כפתורי toggle מתנהגת כבקר אחד, לא ככפתורים חופשיים. `-variant-simple` (ברירת מחדל) מסדרת
רדיו סטנדרטיים (`-layout-columns`/`-inline` זורמים אותם לשורה); `-variant-toggle` מחבר את
כפתורי `.instui-radio.-variant-toggle` של הילדים לבקר מסוגר יחיד (גבולות מצורפות,
קצוות חיצוניים מעוגלים):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**הודעות (Messages)** — `.instui-form-field-messages` הוא המכולה; כל `.instui-form-field-message` מקבל
`-type-*`: `-type-hint` (אפור, ברירת מחדל), `-type-error` (טקסט אדום + גלריית אזהרה מעגלית), `-type-success`
(טקסט ירוק + גלריית אישור מעגלית), ו־`-type-screenreader-only` (מוצנע ויזואלית, עדיין מוקרא). הגליפים צובעים ב־`currentColor`, כך שהם תמיד תואמים לצבע ההודעה. `-type-new-error` הוא כינוי מיושן של `-type-error`. חבר את המכולה לבקרה באמצעות `aria-describedby`, והגדר
`aria-invalid` על הבקרה כאשר יש שגיאה.

בתוך FormField, הודעת `-type-error` עוקבת ולידציה בצד הלקוח: היא נשארת מוסתרת עד שהבקרה של השדה היא `:user-invalid` (מקומי, אחרי שהמשתמש יצר אינטראקציה) — או שתכפה אותה עם `-invalid` על `.instui-form-field` (לשגיאה מצד השרת). `.instui-form-field-messages` עצמאי (לא בתוך שדה) אינו מושפע. טבעת הפוקוס של הבקרה פועלת בהתאם: סכנה כאשר `:user-invalid`/`-invalid`,
הצלחה על `-success`.

**בקרי טקסט (Text controls)** — `.instui-text-input` (_`<input>`_ מקורי), `.instui-text-area` (_`<textarea>`_ מקורי,
ניתן לשינוי גודל), ו־`.instui-simple-select` (_`<select>`_ מקורי עם קרט) חולקים מראה אחד ואת אותן
מצבים: `-invalid` (גבול שגיאה), `-success` (גבול הצלחה), `-readonly`, `:disabled` מקורי, ו־
`-size-{sm,md,lg}`. עבור אייקון מוביל/סופי (`renderBeforeInput`/`renderAfterInput` של InstUI), עוטף
את הקלט ב־`.instui-input-group` והוסף סְלוֹט `.before`/`.after` (גליף `-icon-*`); `-should-not-wrap`
שומר את הכול על שורה אחת. `.instui-number-input` הוא אותו חזות פלוס עמודת ספינר +/- `.arrows` (_`type="number"`_ מקורי; חבר את הכפתורים ל־`stepUp()`/`stepDown()`). `.instui-range-input` הוא
_`input[type="range"]`_ מעוצב שערכו מוצג ב־`.instui-range-input-value` בועה הפוכה. עבור קומבובוקס עשיר עם popover של listbox, השתמש ב־`@instructure/ui` — ספריה זו מכסה את הבקרים המקוריים.

**בחר מעוצב (ניסיוני)** — `select.css` אופציונלי משדרג את אותו
אלמנט `.instui-simple-select`: הוא מעצב את התפריט הפתוח (הלוח וכל אופציה, עם מצבי hover ונבחר) באמצעות מודל ה‑CSS Customizable Select.

> [!WARNING]
> `select.css` מסתמך על `appearance: base-select` / `::picker(select)`, שזו תכונה **ניסיונית**
> (Chrome 135+, עדיין לא Baseline). היא נשלחת כגליון נפרד אופציונלי וכל כלל נתג לבד מאחורי `@supports (appearance: base-select)`, כך שבדפדפנים שלא תומכים היא לא עושה כלום — בקרת `.instui-simple-select` פשוט נשארת ה‑select המובנה הפשוט. טען אותה רק אם אתה רוצה את התפריט המשופר וקולט את התמיכה המוגבלת.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
