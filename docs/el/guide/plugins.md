# Πρόσθετα

Ένα πρόσθετο pantoken επεκτείνει την έξοδο tokens ή CSS χωρίς να κάνει fork ενός πακέτου. Κατασκευάζεται με
`definePlugin` από `@pantoken/plugin-kit`, και μετά το περνάτε σε `buildTokens` ή `toCss`.

## Δημιουργία προσθέτου

Δώστε στο `definePlugin` τα hooks που υλοποιείτε. Επιστρέφει ένα κανονικό πρόσθετο, με την επωνυμία των
δυνατοτήτων που συμπεραίνονται από αυτά τα hooks. Ένα πρόσθετο μπορεί να επεκτείνει το IR (`tokens`, `icons`), την έξοδο CSS
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

## Εγγραφή ευαισθητοποιημένη στις δυνατότητες

`buildTokens` και `toCss` τρέχουν `checkPlugins` πάνω από τα πρόσθετα που περάσατε. Ειδοποιούν — ποτέ δεν πετούν εξαίρεση —
όταν ένα πρόσθετο δεν έχει αντίστοιχο hook για το στάδιο που έχει καταχωρηθεί, έτσι ένα πρόσθετο μόνο για tokens που περνάει
σε `toCss` παραλείπεται με μια σημείωση αντί να μην κάνει τίποτα αθόρυβα.

## Σύνθεση προσθέτων

Δουλέψτε πάνω σε άλλο πρόσθετο με `extendPlugin`, ή συνδυάστε ομότιμα με `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Τα hooks ίδιου σταδίου συνθέτονται: `tokens` τρέχει πρώτα τη βάση και μετά την προσθήκη, `css` συγχωνεύει τις δύο
συνεισφορές, και `icons` τρέχει και τα δύο.

## Επικύρωση εξόδου του προσθέτου

Τρέξτε τους κοινόχρηστους ελέγχους drift από `@pantoken/utils` πάνω στην ίδια την έξοδο του προσθέτου στο τεστ του, ώστε ένα
τυπογραφικό λάθος ή ένα μετονομασμένο token να αποτύχει γρήγορα και τοπικά:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Τα πακέτα προσθέτων που περιλαμβάνονται

- `@pantoken/plugin-simple-icons` — ετικέτες ("brand") icons από simple-icons, καταχωρημένα ως icon tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab icons, καταχωρημένα ως `--instui-icon-*` image tokens.
- `@pantoken/plugin-logos` — λογότυπα προϊόντων Instructure ως SVGs, data URIs, και `--instui-logo-*`
  image tokens.
- `@pantoken/plugin-prune-custom-props` — ένα PostCSS plugin (όχι πρόσθετο pantoken) που αφαιρεί
  αχρησιμοποίητες custom properties από ένα stylesheet.
- `@pantoken/plugin-custom-theme-colors` — επαναφέρει την επωνυμία μιας σελίδας ορίζοντας ένα attribute
  (`data-pantoken-color`) σε μία από 13 παλέτες, ή σε `custom` για οποιοδήποτε brand hex. Βλέπε
  [Χρώματα θέματος](#theme-colors).

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

Μερικά πράγματα που παλιά ήταν πρόσθετα τώρα περιλαμβάνονται στο `@pantoken/components`, αφού τόσα πολλά components τα χρειάζονται εκτός του κουτιού: σκιά ανύψωσης (`--instui-elevation-*`, σε `components.css`), ο δακτύλιος focus-outline (σε `base.css` — κάθε στοιχείο με δυνατότητα focus τον παίρνει όταν το pantoken έχει την ιδιοκτησία της σελίδας), και οι γραμματοσειρές επωνυμίας Instructure (Atkinson Hyperlegible Next: `base.css` εφαρμόζει `--instui-font-family-base`; το opt-in
`@pantoken/components/fonts.css` φορτώνει τα `@font-face` woff2s).

## Χρώματα θέματος

`@pantoken/plugin-custom-theme-colors` εκπέμπει ένα `[data-pantoken-color="…"]` μπλοκ ανά παλέτα
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Κάθε μπλοκ δείχνει τα brand primitives (`--instui-primitive-color-navy-*` και `-blue-*`)
στην επιλεγμένη παλέτα. Επίσης αναπαράγει τις brand επιφάνειες που ο upstream άπλωσε σε literal hex,
διατηρώντας την ενσωματωμένη αδιαφάνεια μέσω `color-mix()`. Τα σημασιολογικά χρώματα κατάστασης, οι ρητές μπλε τονίσεις, και
οι σκιές ανύψωσης παραμένουν ως έχουν. Δοκιμάστε το στο
[demo θεματοποίησης με swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Προσαρμοσμένο χρώμα επωνυμίας

Ορίστε `data-pantoken-color="custom"` για να επανα-επωνυμίσετε από οποιοδήποτε hex, όπως το κύριο χρώμα που ένας διαχειριστής Canvas
εισάγει στο Theme Editor. Το pantoken παράγει μια πλήρη κλίμακα 10–200 `--instui-primitive-color-custom-*`
από αυτό:

1. **Καμπύλη αναφοράς.** Ο στόχος φωτεινότητας κάθε βήματος είναι ο μέσος όρος της φωτεινότητας OKLCH των 13
   παλετών σε εκείνο το βήμα, με 0 σταθερό στο λευκό και 210 στο μαύρο. Έτσι η απόσταση της προσαρμοσμένης κλίμακας
   ταιριάζει με εκείνες των παρεχόμενων παλετών.
2. **Άγκυρα.** Η είσοδος τοποθετείται στο βήμα του οποίου η στόχος φωτεινότητα είναι πιο κοντά στη δική της, και μετά σφηνώνει στην
   ακριβή εκείνη φωτεινότητα. `#cccccc` γίνεται `custom-40` στο `#c9c9c9`: κοντά στην είσοδο, αλλά όχι
   πάντα ταυτόσημο. «Πλησιέστερο» σημαίνει το πλησιέστερο βήμα στην καμπύλη, όχι το πιο κοντινό χρώμα υπάρχουσας παλέτας.
3. **Συμπλήρωση.** Κάθε άλλο βήμα κρατάει την απόχρωση της εισόδου. Η κορεσμό της ακολουθεί την μέση καμπύλη κορεσμού των παλετών σε σχέση με την άγκυρα, και μειώνεται μόνο όπου ένα χρώμα βγαίνει έξω από το sRGB.

Αποδεκτά είναι μόνο `#rgb` και `#rrggbb`; οτιδήποτε άλλο ρίχνει `TypeError`, έτσι ένα hex από μια φόρμα
δεν μπορεί να εγχύσει CSS.

Κατά το build, εκπέμψτε ολόκληρο τον κανόνα με τα παράγωγα primitives ήδη δηλωμένα:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Για να επιλέξετε το χρώμα κατά το runtime χωρίς να στείλετε το σύνολο tokens, προ-υπολογίστε την καμπύλη και τον κανόνα remap κατά το build. Μετά χρησιμοποιήστε την ανεξάρτητη από εξαρτήσεις `/scale` είσοδο στο πρόγραμμα περιήγησης, και ορίστε μόνο τα 20
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

Ο picker του docs site, ο editor θεμάτων του Canvas, και το demo παραπάνω δουλεύουν έτσι.

Δείτε την [API αναφορά](/api/) για τις εξαγωγές κάθε προσθέτου.
