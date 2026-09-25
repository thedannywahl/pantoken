# Plugin

Un plugin pantoken estende l'output di token o CSS senza forkare un pacchetto. Se ne costruisce uno con
`definePlugin` da `@pantoken/plugin-kit`, quindi lo si passa a `buildTokens` o `toCss`.

## Creare un plugin

Dai a `definePlugin` gli hook che implementi. Restituirà un plugin normale, marcato con le
capacità dedotte da quegli hook. Un plugin può estendere l'IR (`tokens`, `icons`), l'output CSS
(`css`), o entrambi.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registrazione consapevole delle capacità

`buildTokens` e `toCss` eseguono `checkPlugins` sui plugin che passi. Avvisa — non lancia eccezioni —
quando un plugin non ha uno hook corrispondente per la fase in cui è registrato, così un plugin solo-token passato
a `toCss` viene saltato con una nota anziché restare silenziosamente inattivo.

## Comporre plugin

Sovrapponi un plugin a un altro con `extendPlugin`, o combina peer con `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Gli hook della stessa fase si compongono: `tokens` esegue prima il base poi l'aggiunta, `css` unisce i due
contributi, e `icons` esegue entrambi.

## Validare l'output del tuo plugin

Esegui i controlli di drift condivisi da `@pantoken/utils` sull'output del tuo plugin nei suoi test, così un
errore di battitura o un token rinominato falliscono rapidamente e localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## I plugin inclusi

- `@pantoken/plugin-simple-icons` — marchia icone da simple-icons, registrate come token icona.
- `@pantoken/plugin-lucide-lab` — icone Lucide Lab, registrate come token immagine `--instui-icon-*`.
- `@pantoken/plugin-logos` — loghi prodotto Instructure come SVG, data URI, e token immagine `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (non un plugin pantoken) che rimuove
  le custom properties non usate da uno stylesheet.
- `@pantoken/plugin-custom-theme-colors` — rebrandizza una pagina impostando un attributo
  (`data-pantoken-color`) su una delle 13 palette, o su `custom` per qualunque esadecimale brand. Vedi
  [Colori del tema](#theme-colors).

Il registro di Lucide Lab può essere caricato in modo lazy, poi passato allo hook di token sincrono:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Alcune cose che erano plugin ora vengono fornite in `@pantoken/components`, poiché molte componenti le richiedono
di default: ombre di elevazione (`--instui-elevation-*`, in `components.css`), l'anello focus-outline
(in `base.css` — ogni elemento focalizzabile lo riceve quando pantoken gestisce la pagina), e i font del brand Instructure
(Atkinson Hyperlegible Next: `base.css` applica `--instui-font-family-base`; l'opzionale
`@pantoken/components/fonts.css` carica i woff2 `@font-face`).

## Colori del tema {#theme-colors}

`@pantoken/plugin-custom-theme-colors` emette un blocco `[data-pantoken-color="…"]` per ogni palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Ogni blocco punta le primitive del brand (`--instui-primitive-color-navy-*` e `-blue-*`)
alla palette scelta. Ridetermina anche le superfici del brand che l'upstream aveva appiattito in esadecimali letterali,
mantenendo la loro alpha incorporata tramite `color-mix()`. I colori semantici di stato, gli accenti blu espliciti e
le ombre di elevazione rimangono invariati. Provalo nella
[demo di theming basata su swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Colore brand personalizzato

Imposta `data-pantoken-color="custom"` per rebrandizzare da qualunque esadecimale, come il colore primario che un amministratore Canvas
digita nell'Editor del Tema. pantoken deriva da esso una scala completa 10–200 `--instui-primitive-color-custom-*`:

1. **Curva di riferimento.** Il target di luminosità di ogni step è la media della luminosità OKLCH delle 13
   palette a quello step, con 0 fissato al bianco e 210 al nero. Quindi la spaziatura della scala personalizzata
   corrisponde a quella delle palette fornite.
2. **Ancora.** L'input atterra sullo step il cui target di luminosità è più vicino alla sua, quindi si aggancia a
   quella esatta luminosità. `#cccccc` diventa `custom-40` a `#c9c9c9`: vicino all'input, ma non
   sempre identico. "Più vicino" significa lo step più vicino sulla curva, non il colore esistente più simile.
3. **Riempimento.** Ogni altro step mantiene la tonalità (hue) dell'input. La sua saturazione segue la curva di saturazione media delle palette
   rispetto all'ancora, e viene ridotta solo dove un colore esce dallo spazio sRGB.

Sono accettati solo `#rgb` e `#rrggbb`; qualsiasi altro valore lancia un `TypeError`, quindi un esadecimale proveniente da un form
non può iniettare CSS.

A build time, emetti l'intera regola con le primitive derivate già dichiarate:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Per scegliere il colore a runtime senza distribuire l'insieme di token, precomputare la curva e la regola di remapping
a build time. Poi usare l'entry senza dipendenze `/scale` nel browser, impostando solo le 20
primitive derivate:

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

Il selettore di tema del sito della documentazione, l'editor di tema di Canvas, e la demo sopra funzionano tutti in questo modo.

Vedi la [riferimento API](/api/) per le esportazioni di ciascun plugin.
