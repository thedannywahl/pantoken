# CDN & הפצה

pantoken מפרסם כל חבילה ל‑npm, כך שאפשר לטעון טוקנים, קומפוננטות ו‑web components ישירות מ‑CDN — ללא שלב בנייה, ללא bundler. דף זה מכסה את כתובת ה‑CSS combined (עם בונה אינטראקטיבי), בנוסף ל‑web‑component drop‑ins.

## יסוד הטוקנים

כל קומפוננטת pantoken קוראת את המאפיינים המותאמים אישית `--instui-*` מדף טוקנים בדף. שתי גרסאות נשלחות:

- `@pantoken/css/dist/style.lean.css` — יסוד ה‑CDN המומלץ. נושא את כל הטוקנים למעט סט האייקונים השלם, ולכן בערך 23 KB gzip.
- `@pantoken/css/dist/style.css` — הגיליון המלא, כולל כ־1,777 גליפי אייקונים (`--instui-icon-*`). כ־140 KB gzip. טען את זה אם אתה משתמש באייקונים באופן נרחב דרך `var(--instui-icon-*)`.

סולם ההעלאה ומשתני טבעת המוקד (focus‑ring) נמצאים בשני הגיליונות, כך שהצללות וטבעת המוקד עובדים גם רק עם היסוד הטעון.

## בחר את הקומפוננטות והאייקונים שלך

ה[picker האינטראקטיבי של ה‑CDN](/guide/cdn-picker) בונה כתובות jsDelivr combined ל‑CSS וקטעי דוגמה לחבילות JavaScript. פתח אותו, סמן מה צריך, והעתק את הפלט שנוצר.

- כרטיסיית Components — בחר גיליונות סגנון לקומפוננטה בודדת או את מכלול ה‑`components.css`. הוסף את ה‑base reset או את utilities של spacing/color אם צריך.
- כרטיסיית JS — העתק קטע ESM import עבור `@pantoken/interactions`.
- כרטיסיית Icons — בחר אייקונים בודדים מסט InstUI (כ־1,800 אייקונים) או מ‑Simple Icons (כ־3,300 גליפי מותגים). ה‑picker מוציא כתובת combine נפרדת עבור קבצי ה‑icon CSS כדי שתוכל לטעון רק את האייקונים שבהם אתה משתמש.
- כרטיסיית Web Components — בנה קטעי `@pantoken/web-components` (ESM selective register או bootstrap בסקריפט קלאסי).

כל קובץ קומפוננטה קטן — רובם סביב 2 KB. קומפוננטה שמציגה אייקונים (`alert`, `checkbox`
וכמה אחרות) צריכה את אותם גליפים, ולכן הבונה מוסיף `@pantoken/components/dist/component-icons.css` (כ‑0.5 KB gzip — 11 האייקונים שהסט משתמש בהם) כאשר אתה בוחר את הגיליון הקל. הגיליון המלא כבר כולל אותם.

### סדר טעינה ופונטים

טען קודם את יסוד הטוקנים, אחר כך את ה‑base reset האופציונלי, אחר כך את קבצי הקומפוננטה, ולבסוף את ה‑utilities — הם utilities שמחליפים סגנונות, ולכן הם יחליפו כלל קומפוננטה רק אם ייטענו אחרי הקומפוננטה בקסקדה. כתובת ה‑combine למעלה כבר מסדרת אותם עבורך. פונטים הם החריג היחיד: `@pantoken/components/dist/fonts.css` מפנה לקבצי פונטים בנתיב יחסי, לכן ה‑combine לא יכול לשכתב אותם — טען אותו כ‑`<link>` נפרד:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### הכל יחד

סמן **All components** ב‑picker כדי לעבור למכלול, או פנה אליו בעצמך (כ־141 KB gzip) לצד גיליון הטוקנים:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` מרשום אלמנטים מותאמים אישית `<instui-*>` שאינם תלויים במסגרת. הם מכניסים את ה‑CSS שלהם inline, אך עדיין קוראים טוקנים מגיליון בדף, לכן טען גם יסוד טוקנים.

### מודולי ES (מומלץ)

CDN של ESM פותר עבורך את התלויות של החבילה. זה מרשום את כל האלמנטים:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

השתמש בגיליון הטוקנים המלא (או בגיליון הקל פלוס `component-icons.css`) כך שאלמנטים שמציירים אייקונים כמו `<instui-alert>` ימצאו את הגליפים שלהם.

כדי לרשום רק חלק מהאלמנטים — ואת התלויות המוטבעות שלהם — ייבא `register` והעבר `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### תג סקריפט קלאסי

ל‑drop‑in ללא מודולים, טען את הבנייה IIFE. היא מאחדת את התלויות ומרשמת אוטומטית כל אלמנט בעת הטעינה, וחשפה גלובלי `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

זה גדול יותר מהנתיב ESM — הוא ממקם inline את `@pantoken/components` ו‑`@pantoken/icons` — לכן השתמש בו רק כשאי‑אפשר להשתמש במודולים.

## נעילת גרסאות (Pinning)

ה‑URLs שלעיל — וכאלה שה‑picker כותב — עוקבים אחרי ה‑release האחרון. נעול גרסת Major (או גרסה מדויקת) לפרודקשן — למשל `@pantoken/css@0` — כדי שעדכון לא יפתיע אותך.
