# Πρόσθετα

Ένα plugin pantoken επεκτείνει την έξοδο token ή CSS χωρίς να κάνει fork σε ένα πακέτο. Το φτιάχνετε με
`definePlugin` από `@pantoken/plugin-kit`, και μετά το περνάτε σε `buildTokens` ή `toCss`.

## Δημιουργία plugin

Δώστε στο `definePlugin` τα hooks που υλοποιείτε. Επιστρέφει ένα κανονικό plugin, με σήμανση των
δυνατοτήτων που εξάγονται από αυτά τα hooks. Ένα plugin μπορεί να επεκτείνει το IR (`tokens`, `icons`), την έξοδο CSS
(`css`), ή και τα δύο.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Εγγραφή με ευαισθητοποίηση δυνατοτήτων

`buildTokens` και `toCss` εκτελούν `checkPlugins` πάνω από τα plugins που περνάτε. Προειδοποιεί — δεν πετάει —
όταν ένα plugin δεν έχει αντίστοιχο hook για το στάδιο όπου έχει καταχωριστεί, οπότε ένα plugin μόνο για tokens που περνιέται
σε `toCss` παραλείπεται με μια σημείωση αντί να μην κάνει τίποτα αθόρυβα.

## Σύνθεση plugins

Αναπτύξτε πάνω σε ένα άλλο plugin με `extendPlugin`, ή συνδυάστε ομότιμα με `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Τα hooks ίδιου σταδίου συντίθενται: `tokens` εκτελεί πρώτα το base και μετά την προσθήκη, `css` συγχωνεύει τις δύο
συνεισφορές, και `icons` εκτελεί και τα δύο.

## Επικύρωση εξόδου του plugin

Τρέξτε τους κοινόχρηστους ελέγχους drift από `@pantoken/utils` πάνω στην έξοδο του plugin στο τεστ του, ώστε ένα
τυπογραφικό λάθος ή ένα μετονομασμένο token να αποτύχει γρήγορα και τοπικά:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Τα ενσωματωμένα plugins

- `@pantoken/plugin-simple-icons` — μάρκα icons από simple-icons, καταχωρισμένα ως icon tokens.
- `@pantoken/plugin-lucide-lab` — εικονίδια Lucide Lab, καταχωρισμένα ως `--instui-icon-*` image tokens.
- `@pantoken/plugin-logos` — λογότυπα προϊόντων Instructure ως SVG, data URIs, και `--instui-logo-*`
  image tokens.
- `@pantoken/plugin-prune-custom-props` — ένα PostCSS plugin (όχι plugin pantoken) που αφαιρεί
  μη χρησιμοποιημένες custom properties από ένα stylesheet.
- `@pantoken/plugin-custom-theme-colors` — επανασυστήνει μια σελίδα θέτοντας ένα attribute
  (`data-pantoken-color`) σε μία από 13 παλέτες, ή σε `custom` για οποιοδήποτε brand hex. Δείτε
  [Χρώματα θέματος](#theme-colors).
- `@pantoken/plugin-custom-components` — προσαρμοσμένοι έλεγχοι με βάση tokens συμπεριλαμβανομένων των SegmentedControl
  και SkeletonLoader.

### Segmented control

Χρησιμοποιήστε ένα segmented control για δύο έως πέντε σχετικές προβολές ή φίλτρα. Κάθε επιλογή είναι ένα επισημασμένο native
radio σε μια ονομασμένη ομάδα· σημειώστε ένα ως επιλεγμένο αρχικά. Χρησιμοποιήστε tabs ή dropdown αν οι επιλογές δεν χωράνε
άνετα, και χρησιμοποιήστε button groups για ενέργειες αντί για επιλογές. Το στυλ `-size-md` είναι το
προεπιλεγμένο, με `-size-sm` και `-size-lg` για πιο συμπαγείς και πιο εμφανείς περιβάλλοντες.

Εισάγετε `@pantoken/plugin-custom-components/segmented-control.css` για τον έλεγχο και τα overflow
κουμπιά του. Χρησιμοποιήστε την κλάση `-icon-*` σε μια ετικέτα segment όταν το segment χρειάζεται ένα γλυφικό· ο βοηθός αλληλεπίδρασης
επίσης προωθεί μια κλάση `-icon-*` από το native input στην ετικέτα painter. Δώστε στο fieldset μια περιγραφική `aria-label` ή μια ορατή legend. Ο helper διατηρεί την αυτόματη
αναγγελία του native radio, προσθέτει πλοήγηση με πληκτρολόγιο, και προαιρετικά αποκαλύπτει ένα κρυμμένο segment ανά πάτημα βέλους.
Χρησιμοποιήστε λογικούς start/end ελέγχους και προσβάσιμους ετικέτες κουμπιών και στις δύο κατευθύνσεις:

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

Εισάγετε `@pantoken/interactions/segmented-control.iife.js` για εγγραφή όταν το DOM είναι έτοιμο, ή καλέστε
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` από `@pantoken/interactions`
και καλέστε `cleanup()` όταν το αφαιρείτε. Το CSS και οι native επιλογές radio λειτουργούν χωρίς JS; τα overflow
βέλη χρειάζονται τη συμπεριφορά. Το επιλεγμένο στοιχείο χρησιμοποιεί τη σκιά σχεδίου δύο στρωμάτων από τα σημασιολογικά
drop-shadow χρώματα· είναι μια ξεχωριστή ενεργή-στοιχείο σκιά παρά ένα υπάρχον
`--instui-elevation-*` composite. Τα overflow κουμπιά χρησιμοποιούν τα upstream elevation3 component tokens
μέσω `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

Η υποδιαδρομή `skeleton-loader.css` στιλιζάρει ένα διακοσμητικό σχήμα Text, Avatar, ή Image. Το Text δέχεται
`-size-xxs` μέσω `-size-xxl`; Avatar και Image είναι μεσαίου μεγέθους. Κάθε προαιρετικό `.skeleton-row`
προσθέτει μια γραμμή κειμένου χωρίς να αλλάζει το μέγεθος. Το CSS shimmer σταματά μετά από τρεις διελεύσεις 1.5 δευτερολέπτων και
παραμένει στατικό όταν ο χρήστης προτιμά μειωμένη κίνηση. Λειτουργεί πριν φορτώσει το JavaScript.

Τοποθετήστε σχήματα μόνο εκεί όπου θα εμφανιστεί περιεχόμενο που εξαρτάται από ερωτήματα, όχι πάνω σε γνωστή από τον διακομιστή πλοήγηση,
φίλτρα, επικεφαλίδες, ή χειριστήρια. Ένα skeleton δεν είναι μέτρο προόδου ή κατάσταση απασχόλησης ενέργειας. Διατηρείτε
το υπάρχον περιεχόμενο ορατό κατά την ανανέωση στο παρασκήνιο· χρησιμοποιήστε ένα spinner ή κατάσταση κουμπιού απασχόλησης για ενέργειες.

Η γονική εφαρμογή διαχειρίζεται τα loading, loaded, empty, και error markup. Παρέχετε μία περιοχή κατάστασης empty
ανά σελίδα και ένα ξεχωριστό empty alert στο HTML του server, και τα δύο **έξω** από την περιοχή ενδιαφέροντος του busy περιεχομένου:

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

Καλέστε τη συμπεριφορά σε επίπεδο γονέα όταν αλλάζει η κατάσταση του αιτήματος. Ενημερώνει `aria-busy` και τις δύο
προϋπάρχουσες αναγγελίες, αλλά ποτέ δεν αντικαθιστά περιεχόμενο ή δεν μεταφέρει την εστίαση:

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

Εάν χρησιμοποιείτε το bundle αλληλεπιδράσεων ανά-συστατικό αντί της άμεσης εισαγωγής, εκπέμψτε ένα
γεγονός `pantoken:skeleton-state` στο στοιχείο `[data-skeleton-region]` με
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Καθυστερήστε την εμφάνιση των
placeholders κατά 200–500ms για γρήγορα αιτήματα· η συμπεριφορά καθυστερεί ανεξάρτητα την αναγγελία loading κατά 400ms. Σε παθητικά φορτώματα σελίδας, αφήστε την εστίαση όπου είναι. Μεταφέρετε εστίαση σε ένα νεοφορτωμένο αποτέλεσμα μόνο όταν η ενέργεια του χρήστη το ζήτησε. Ο κόμβος κατάστασης αναγγέλλει αποτελέσματα και empty καταστάσεις· ο κόμβος alert αναγγέλλει αποτυχίες. Μην συνδυάζετε `aria-busy`, `role="status"`, και
`role="alert"` στο ίδιο στοιχείο.

Το registry του Lucide Lab μπορεί να φορτωθεί τεμπέλικα, και μετά να περαστεί στο συγχρονικό token hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Μερικά πράγματα που παλιά ήταν plugins τώρα διανέμονται στο `@pantoken/components`, αφού πολλά components τα χρειάζονται
έτοιμα: οι σκιές υψομέτρου (`--instui-elevation-*`, στο `components.css`), ο δακτύλιος focus-outline
(στο `base.css` — κάθε στοιχείο με δυνατότητα εστίασης το παίρνει όταν pantoken ελέγχει τη σελίδα), και οι γραμματοσειρές
του brand Instructure (Atkinson Hyperlegible Next: `base.css` εφαρμόζει `--instui-font-family-base`; το opt-in
`@pantoken/components/fonts.css` φορτώνει τα `@font-face` woff2s).

## Χρώματα θέματος

`@pantoken/plugin-custom-theme-colors` εκπέμπει ένα `[data-pantoken-color="…"]` block ανά παλέτα
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Κάθε block δείχνει τις brand primitives (`--instui-primitive-color-navy-*` και `-blue-*`)
προς την επιλεγμένη παλέτα. Επίσης επαναπαράγει τις brand επιφάνειες που ο upstream είχε απλοποιήσει σε literal hex,
διατηρώντας το ενσωματωμένο alpha μέσω `color-mix()`. Τα σημασιολογικά χρώματα κατάστασης, οι ρητές μπλε έμφασεις, και
οι σκιές υψομέτρου παραμένουν ως έχουν. Δοκιμάστε το στο
[demo θεμάτων με swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Προσαρμοσμένο χρώμα brand

Ορίστε `data-pantoken-color="custom"` για να επαναπροσδιορίσετε από οποιοδήποτε hex, όπως το primary χρώμα που ένας διαχειριστής Canvas
εισάγει στο Theme Editor. Το pantoken παράγει μια πλήρη κλίμακα 10–200 `--instui-primitive-color-custom-*`
από αυτό:

1. **Καμπύλη αναφοράς.** Ο στόχος φωτεινότητας κάθε βήματος είναι ο μέσος όρος της φωτεινότητας OKLCH των 13
   παλετών σε εκείνο το βήμα, με 0 σταθερό στο λευκό και 210 στο μαύρο. Έτσι το διάστημα της προσαρμοσμένης κλίμακας
   ταιριάζει με τις αποστολείσες παλέτες.
2. **Άγκυρα.** Η είσοδος τοποθετείται στο βήμα του οποίου η στόχος φωτεινότητα είναι πλησιέστερη στη δική της, και τότε κλειδώνει στην
   ακριβή αυτή φωτεινότητα. `#cccccc` γίνεται `custom-40` στο `#c9c9c9`: κοντά στην είσοδο, αλλά όχι
   πάντα ταυτόσημο. «Πλησιέστερο» σημαίνει πλησιέστερο βήμα στην καμπύλη, όχι το κοντινότερο υπάρχον χρώμα της παλέτας.
3. **Γέμισμα.** Κάθε άλλο βήμα διατηρεί τον τόνο (hue) της εισόδου. Ο κορεσμός της ακολουθεί την καμπύλη μέσου κορεσμού των παλετών σε σχέση με την άγκυρα, και μειώνεται μόνο όπου ένα χρώμα βγαίνει εκτός sRGB.

Γίνονται αποδεκτά μόνο `#rgb` και `#rrggbb`; οτιδήποτε άλλο πετάει `TypeError`, έτσι ένα hex από μια φόρμα
δεν μπορεί να εγχύσει CSS.

Κατά τον χρόνο build, εκπέμψτε ολόκληρο τον κανόνα με τις παραγόμενες primitive ήδη δηλωμένες:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Για να επιλέξετε το χρώμα κατά την εκτέλεση χωρίς να στείλετε το σετ tokens, προ-υπολογίστε την καμπύλη και τον κανόνα remap
κατά το build. Έπειτα χρησιμοποιήστε την εξάρτηση-ελεύθερη εγγραφή `/scale` στο πρόγραμμα περιήγησης, και ορίστε μόνο τα 20
παραγόμενα primitives:

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

Ο επιλογέας θέματος του docs site, ο επεξεργαστής θέματος Canvas, και το demo παραπάνω λειτουργούν όλοι έτσι.

Δείτε το [API reference](/api/) για τις εξαγωγές κάθε plugin.
