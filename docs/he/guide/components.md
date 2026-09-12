# רכיבים

`@pantoken/components` מספק סגנונות רכיבים מבוססי מחלקות שבנויים מטוקנים של Instructure. ייבא את גיליון הסטייל וסמן את הסימון שלך — אין צורך במסגרת עבודה.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> מעדיפים אלמנטים מותאמים? `@pantoken/web-components` עוטף את אותם סגנונות גם כ־`<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` ועוד — ראה את [מפת החבילות](/api/).

## קונבנציות

קונבנציות ה‑CSS בחבילה זו מבוססות על גרסה מותאמת של [RSCSS](https://ricostacruz.com/rscss/index.html).

מודיפיירים הם **מפתח‑ערך** — `-<prop>-<val>`, מותאמים לשמות הפרופים של InstUI — כך שהם נקראים בעצמם: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. פרופים בוליאניים הם שם הפרופ בלבד, כאשר הנוכחות פירושה `true` (`-has-shadow`, `-clickable`); בוליאן שמדולל כברירת מחדל שמכבים אותו מהופך (`-without-background`, `-without-border`). גדלים מקבלים גם איות קצר וגם ארוך (`-size-sm` = `-size-small`). כאשר שם חורג מ‑InstUI, מחלקת המשמעות של InstUI עדיין פועלת אך ממליצים להימנע (למשל `-variant-info` → השתמש ב־`-color-info`).

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

עבור פרופ `timeout` של InstUI, הגדר את משתנה ה‑custom הבלתי־יחידתי `--timeout` במילישניות וטען את האינטראקציה של Alert. ערך חי מתזמן סגירה; `0` (הברירת מחדל) משאיר את ההתראה במקומה. הוסף את מחלקות `instui-transition -fade-entered` של היוטיליטי `transition` עבור ה־fade של InstUI; השמט אותן להסרה מיידית. האינטראקציה מניעה את מצב `-fade-exiting` ושולחת אירוע `dismiss` שניתן לביטול ומתפשט לפני ההסרה, כך שהאפליקציה יכולה לקרוא `preventDefault()` כדי לשמור את ההתראה מוצמדה.

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

סרטי התקדמות מקבלים סולמות שרירותיים דרך `--min` (`0` כברירת מחדל), `--value`, ו‑`--max` (`100` כברירת מחדל), עם שמות כוחן מיושנים `--value-now` ו‑`--value-max`. הוסף `-should-animate` כדי להחיל את המעבר של חצי שנייה של InstUI בכל שינוי ערך. `.value` יושב לצד `.bar` כשילד של השורש; הוסף `-render-value-inside` כדי להציגו מעל המסלול, מיושר לתחילתו, במקום זאת (עצב אותו לקריאות כנגד צבע המדי). השתמש ב־`<progress>` מקומי לטווח מבוסס‑אפס ו‑`<meter>` כאשר המינימום אינו אפס; רכיבי הווב בוחרים ביניהם אוטומטית לפי המאפיין `min`. ל‑InstUI אין מצב בלתי‑קבוע, לכן `<progress>` שמחסיר את המאפיין `value` הוא ניחוש של pantoken בלבד: `progress-bar` מונפש כקטע מחליק ו‑`progress-circle` מסובב את הטבעת בזווית קבועה, שניהם מסתירים `.value`.

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

עגלות התקדמות מקבלות את אותם סולמות שרירותיים דרך `--min`, `--value`, ו‑`--max`. `--value-now` ו‑`--value-max` נשארים כקיצורים פונקציונליים מיושנים. הוסף `-should-animate` וטען את חבילת האינטראקציה הממוקדת כדי לשחזר את אנימציית ההרכבה של InstUI; `--animation-delay` הוא השהיית מילישניות ללא יחידות. האיות המיושן `-should-animate-on-mount` ו‑`-shold-animate-on-mount` נשארים כקיצורים פונקציונליים.

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

כל מחלקה משוייכת מרחב שמות `instui-` כברירת מחדל. בנה גיליון סגנון עם קידומת משלך — או ללא — על‑ידי העברת `prefix` לכל בונה. כל ערך שקרי (`null`, `undefined`, `""`, או השמטתו) מוריד את הקידומת לחלוטין, כך שניתן לכתוב `class="heading -level-h1"` במקום `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

המודיפיירים שמתחילים במקף (`.-color-secondary`, `.-level-h1`) נשארים ללא שינוי בכל מקרה. גיליונות הסגנון שנשלחים בחבילה שומרים על הקידומת `instui`.

## בסיס

`base.css` הוא איפוס אופציונלי שמגדיר ברירות מחדל גלובליות למסמך מתוך הטוקנים: `box-sizing`, איפוס `body`, משטח העמוד, צבע וטקסט בסיסי וגופן, `color-scheme` (כדי ש‑`light-dark()` טוקנים ובקרות נייטיב יעקבו אחרי הנושא), וקישור בסיס. טען אותו פעם אחת, לפני גיליונות הרכיבים והפרוזה, כש‑pantoken מנהל את העמוד.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

החמיצו אותו כשאתם משתלבים ברכיבים בתוך מארח שכבר עושה תימינג ל‑`html` ו‑`body` — האיפוס צובע את משטח העמוד, לכן לא רוצים שהוא יתנגש עם המארח. כל מה שזה מגדיר משתמש בבורריות נמוכה של בוחרים `:where()`, כך שהכללים שלכם תמיד גוברים.

`base.css` _מיישם_ את גופן המותג (`font-family: var(--instui-font-family-base)`, עם גיבויים מערכתיים); כדי _לטעון_ אותו, ייבא את `fonts.css` האופציונלי — כללי `@font-face` עבור Atkinson Hyperlegible Next, שמצביעים אל קבצי woff2 הנלווים לחבילה. הוא נפרד כי הפונטים כ־~350 kB ואחסון גופנים בעצמכם הוא בחירה מודעת.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## תוכן לקוראי מסך

<p>יש הודעה מוסתרת אחרי המשפט הזה.<span class="instui-screen-reader-content">רק קוראי מסך יכריזו עליה.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` מסתיר אלמנט ויזואלית תוך שהוא משאיר אותו בעץ הנגישות — לתוויות וטקסטי סטאטוס שטכנולוגיות מסייעות צריכות לקרוא אך העיצוב לא אמור להציג.

## יוטיליטיז

`utilities.css` הוא שכבה אופציונלית של מחלקות חוצות‑תחום: פרימיטיב `View`, ריווח לפי סולם הטוקנים, והחלפות צבע סמנטיות. בניגוד למחלקות הרכיב `-modifier`, אלה משתמשות ב־**קָו זוגי** (`--mod`) כדי שלא יתנגשו לעולם עם שמות המודיפייר של רכיב, והן חלות על כל אלמנט — חשוף, או מורכב אל רכיב.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">משטח בצבע accent-blue עם טקסט על‑הצבע.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">מוקד במרכז עם mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` הוא ה‑`View` של InstUI. זה הבסיס שעליו מניחים ריווח וצבע, והוא נושא מודיפיירים מפתח‑ערך לפרופס הויזואליים שלו כך שלא תצטרכו לפנות ליוטיליטים:
`-background-*` (המשטחים שלו), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, ו‑`-cursor-*` — אלה המודיפיירים בעלי מקף אחד של `view`, עצמם, שאינם תלויים ביוטיליטי דו‑מקף שלמטה. פרופים בעלי ערך חופשי (רוחב/גובה/הכנסה) נשארים בסגנונות inline; `margin`/`padding` משתמשים ביוטיליטי הריווח.

**ריווח** — מחלקות לכל צד על סולם הריווח. קראו להן כ־`{m|p}{side}-{step}`: `m` עבור מרג'ין או `p` עבור פדינג (או המילים המלאות `margin`/`padding`), צד לוגי אופציונלי, ואז שלב. לכן `.--m-lg` ו‑`.--margin-lg` הם זהים, כמו `.--pt-md` ו‑`.--paddingt-md`.

- צדדים: none (הכל), `t`/`b` (התחלת/סוף בלוק), `s`/`e` (התחלת/סוף אינליין), `x`/`y` (ציר אינליין/בלוק). הצדדים הלוגיים נשארים נכונים בממשקי ימין‑לשמאלה.
- שלבים: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, ועוד `auto` לרק עבור מרג'ין.

חברו אותם לקיצור `margin="small auto large"` של InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**צבע** — החלפות סמנטיות שנשארות על הפלטה: `.--bg-<name>` (רקע),
`.--text-<name>` (צבע טקסט), ו‑`.--border-<name>` (צבע מסגרת). כל `<name>` הוא טוקן צבע סמנטי — הכוונות (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) בנוסף לפלטת `accent-*` (`accent-blue`, `accent-green`, וכן הלאה). שם קיים רק אם הטוקן קיים במשפחה, ולכן `text-brand` אינו מחלקה — לטקסט אין טוקן מותג. אין דרך להגיע לפרימיטיב או hex שרירותי, וכל החלפה עוקבת אחרי הנושא.

**משפחות טוקנים** — כל משפחה של "טוקן אחד, נכס אחד" מקבלת מחלקה לכל טוקן, בשם על שם הטוקן. חברו אותן בחופשיות:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ו‑`-depth1`…`-card`) → `box-shadow`

כל אחת מגדירה רק את הנכס שלה, לכן `border-width`/`border-radius` זקוקות לצבע `border-*` וסגנון גבול כדי לצייר בפועל. אלה משתמשות בשם הטוקן המלא (`.--border-radius-md`), בעוד העוזרים לצבע ולריווח למעלה משתמשים בכינויים קצרים (`.--bg-brand`, `.--mt-lg`) — הכינויים הם קיצורים ארגונומיים; מחלקות הטוקן הן מילוליות ומקיפות.

**פריסה** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) ו‑`.--text-align-<value>` (`start`, `center`, `end`, `justify`) מכסים את פרופס החוצות של InstUI `display` ו‑`textAlign` (View, Button, Metric, Tabs, …) כמחלקות קומפוזיטיביות — כך אלה לא מודיפיירים לפריט יחיד.

כל מחלקת דו‑מקף גוברת בקסקדה באופן דטרמיניסטי על מודיפייר מרשם‑מקף זהה, בלי תלות בסדר טעינת גיליונות הסגנון — ראו [קונבנציות כתיבה](/conventions/authoring) עבור המנגנון.

הכל כאן מנוהל ב‑CSS טהור שנדחף על‑ידי טוקני `--instui-*`, כך שזה עוקב אחרי InstUI דרך שכבת הטוקנים. ראו את [מפורט ה‑API](/api/) עבור `componentsCss` ואת הבנאים לכל רכיב.

## שכבות עליונות: דיאלוג ופופופר

רכיבי השכבה משתמשים בפרימיטיבים נייטיביים של הפלטפורמה, כך שהם מתנהגים נגישים עם מעט או בלי JavaScript.

**מודל** — הנח `.instui-modal` על `<dialog>` נייטיב. הוא מקבל לכידת פוקוס, סגירה ב‑`Esc`, ו‑`::backdrop` בחינם; הרקע מחושך עם אותו טוקן `--instui-component-mask-background-color` כמו `.instui-mask` (הוסף `-blur` להלבנה). פתח וסגור עם פקודות Invoker — אין צורך בסקריפט:

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

**תצוגת הקשר / פופובר** — הנח `.instui-context-view` על אלמנט `[popover]` ו־טוגל אותו עם `popovertarget`. הוא שוכן בשכבה העליונה ומתבטל בלחיצה מחוץ או ב‑`Esc`, שוב ללא סקריפט:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**פריסת מגירה** — הנח `.instui-drawer-layout` על שורש פריסה עם `.tray` ו‑`.content` כילדים. הוסף את המאפיין `open` (או `-open`) כדי לחשוף את המגש, והשתמש ב‑`placement="end"` (או `-placement-end`) כדי לעגן אותו לצד הסוף האינלייני — המיקום מתברר דרך תכונות לוגיות `inset-inline-*`/`flex-direction`, כך שהוא מתהפך אוטומטית תחת `dir="rtl"` ללא כללים נוספים. חבילת האינטראקציה הממוקדת מוסיפה ניתוב פקודות Invoker ומחליפה למצב שכבה עליונה (`should-overlay-tray`) כאשר הרוחב חוצה `--drawer-layout-min-width` (ברירת המחדל `--instui-breakpoints-sm`, ואז `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**מסיכה** — `.instui-mask` נשארת עבור שכבות בתוך‑זרימה (ספינר על‑גבי כרטיס); `::backdrop` של מודל מכסה את המקרה של המודל.

שני התבניות גם עטופות כאלמנטים התנהגותיים מותאמים ב־`@pantoken/web-components`: `<instui-modal open>` (_`<dialog>`_ מונע על‑ידי המאפיין `open`) ו‑`<instui-context-view>` (פופובר נייטיבי).

תמיכת דפדפנים: API הפופובר ו‑`popovertarget` הם Baseline 2024; פקודות ה‑invoker (`command`/`commandfor`) הן Baseline 2025, אז בדפדפנים ישנים חברו את הכפתורים ל‑`dialog.showModal()` כפיצוי של שורת קוד. מיקום פופובר לצד הטריגר משתמש בעיגון CSS כאשר נתמך (Chromium); במקומות אחרים הוא מתמרכז בשכבה העליונה.

## טפסים

**FormField** — `.instui-form-field` הוא עטיפת CSS‑Grid שמסדרת תווית, הבקרה, וכל ההודעות. הנח אותו על `<label>` כך שהתווית תתקשר עם הבקרה מבחינה נייטיבית. יש לו שלוש אזורי גריד — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (ברירת מחדל) מיישמת סטאק על האזורים; `-layout-inline` מניחה את התווית לצד הבקרה (כיוונון עם `-label-align-{start,end}` ו‑`-v-align-{top,middle,bottom}`). `-readonly` משנה את צבע התווית.

הכוכבית של "חובה" מופיעה כאשר השדה נדרש בידי _או_ המחלקה `-required` _או_ בקרת `required` נייטיבית בתוכו — כך אפשר פשוט להגדיר `required` על הקלט והסימון יופיע. זה דקורטיבי (‎`::after` על התווית, מחוץ לעץ הנגישות); צמדי אותו עם הודעה כמו "שדות המסומנים ב־* הינם חובה" אלא אם הטופס ברור בעצמו.

**FormFieldGroup** — `.instui-form-field-group` מקבץ שדות קשורים בתוך `<fieldset>` עם תיאור `<legend>`. זו פריסה טהורה (ללא טוקנים ייעודיים): ברירת המחדל מצטברת את השדות; `-layout-columns` / `-layout-inline` מסדרים אותם בעמודות רספונסיביות, עם `-row-spacing-*` / `-col-spacing-*` ו‑`-v-align-*` לכוונון הגריד.

**RadioInputGroup** — `.instui-radio-input-group` הוא אותו קיבוץ `<fieldset>`/`<legend>`, מותאם לרדיו. מאחר שהרדיו הילדים חולקים `name`, הבחירה היא בחירה יחידה נייטיבית — כך שקבוצת כפתורי טוגל מתנהגת כשליטה אחת, לא ככפתורים חופשיים. `-variant-simple` (ברירת מחדל) מסדרת רדיו סטנדרטיים (`-layout-columns`/`-inline` מסדרים אותם בשורה); `-variant-toggle` מחבר את כפתורי `.instui-radio.-variant-toggle` הילדים לשליט סגמנט (גבולות מצומצמות, קצוות חיצוניים מעוגלים):

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

**הודעות** — `.instui-form-field-messages` הוא המכולה; כל `.instui-form-field-message` מקבל `-type-*`: `-type-hint` (אפור, ברירת מחדל), `-type-error` (טקסט אדום + גליף מעגל־אזהרה), `-type-success` (טקסט ירוק + גליף מעגל־וי), ו‑`-type-screenreader-only` (מוסט חזותית, עדיין מוכרז). הגליפים צבועים ב־`currentColor`, כך שתואמים תמיד לצבע ההודעה. `-type-new-error` הוא קיצור מיושן של `-type-error`. חבר את המכולה לבקרה עם `aria-describedby`, והצב `aria-invalid` על הבקרה כשהיא שגויה.

בתוך FormField, הודעת `-type-error` בעקבות אימות בצד הלקוח: היא נשארת מוסתרת עד שהבקרת השדה `:user-invalid` (נייטיבית, לאחר שהמשתמש בא במגע) — או שאתם מאנפים אותה עם `-invalid` על `.instui-form-field` (לשגיאת שרת). `.instui-form-field-messages` עצמאי (לא בתוך שדה) אינו מושפע. טבעת הפוקוס של הבקרה מתאימה: סכנה כש‑`:user-invalid`/`-invalid`, הצלחה על `-success`.

**בקרות טקסט** — `.instui-text-input` (_`<input>`_ נייטיבי), `.instui-text-area` (_`<textarea>`_ נייטיבי, ניתן לשינוי גודל), ו‑`.instui-simple-select` (_`<select>`_ נייטיבי עם קרט־) חולקים מראה זהה ומצבי סטייטים: `-invalid` (גבול שגיאה), `-success` (גבול הצלחה), `-readonly`, _`:disabled`_ נייטיבי, ו‑`-size-{sm,md,lg}`. עבור איקון מוביל/עוקב (InstUI `renderBeforeInput`/`renderAfterInput`), עטפו את הקלט ב‑`.instui-input-group` והוסיפו חריץ `.before`/`.after` (גליף `-icon-*`); `-should-not-wrap` שומר אותו בשורה אחת. `.instui-number-input` הוא הפאצ'דה הזו בתוספת עמודת ספינר +/- `.arrows` (_`type="number"`_ נייטיבי; חברו את הכפתורים ל‑`stepUp()`/`stepDown()`). `.instui-range-input` הוא `input[type="range"]` מעוצב שערכו מוצג בבועת נגד `.instui-range-input-value`. עבור קומבובוקס עשיר עם פאנל רשימה פופובר, השתמשו ב‑`@instructure/ui` — ספרייה זו מכסה את הבקרות הנייטיביות.

**תפריט מובחר מעוצב (ניסיוני)** — `select.css` אופציונלי משדרג את אותו אלמנט `.instui-simple-select`: הוא מעצב את התפריט הפתוח (הלוח וכל אפשרות, עם מצבי hover ונבחר) באמצעות מודל Select ניתן להתאמה ב‑CSS.

> [!WARNING]
> `select.css` מסתמך על `appearance: base-select` / `::picker(select)`, שהן **ניסיוניות**
> (Chrome 135+, עדיין לא Baseline). הוא נשלח כגיליון נפרד אופציונלי וכל כלל מותנה ב‑`@supports (appearance: base-select)`, כך שאין לו השפעה בדפדפנים שאינם תומכים — בקרת `.instui-simple-select` פשוט נשארת הסלקט הנייטיבי הפשוט. טען אותו רק אם רוצים את התפריט המשופר ומקבלים את התמיכה המוגבלת.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
