# Vtičniki

Vtičnik pantoken razširi izhod tokenov ali CSS brez forkanja paketa. Zgradi se ga z
`definePlugin` iz `@pantoken/plugin-kit`, nato ga posreduj `buildTokens` ali `toCss`.

## Ustvarjanje vtičnika

Daj `definePlugin` hooke, ki jih implementiraš. Vrne običajen vtičnik, označen s
sposobnostmi, sklepano iz teh hookov. Vtičnik lahko razširi IR (`tokens`, `icons`), izhod CSS (`css`), ali oboje.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registracija, občutljiva na sposobnosti

`buildTokens` in `toCss` zaženeta `checkPlugins` nad vtičniki, ki jih predaš. Opozori — nikoli ne vrže izjeme — kadar vtičnik nima ustreznega hooka za fazo, v kateri je registriran, zato se token-only vtičnik, posredovan `toCss`, preskoči z opombo namesto da bi tiho nič počel.

## Sestavljanje vtičnikov

Zgradi na vrhu drugega vtičnika z `extendPlugin`, ali kombiniraj vrstnike z `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooki iste faze se komponirajo: `tokens` zažene osnovnega, nato dodatek, `css` združi oba prispevka, in `icons` zažene oba.

## Preveri izhod svojega vtičnika

Zaženi skupne drift-preverbe iz `@pantoken/utils` nad izhodom svojega vtičnika v njegovem testu, da tipkarska napaka ali preimenovan token hitro in lokalno odpovesta:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Vgrajeni vtičniki

- `@pantoken/plugin-simple-icons` — brand ikone iz simple-icons, registrirane kot ikonični tokeni.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikone, registrirane kot `--instui-icon-*` image tokeni.
- `@pantoken/plugin-logos` — Instructure logotipi izdelkov kot SVG, data URI-ji in `--instui-logo-*`
  image tokeni.
- `@pantoken/plugin-prune-custom-props` — PostCSS vtičnik (ne pantoken vtičnik), ki odstrani
  neuporabljena custom properties iz sloga.
- `@pantoken/plugin-custom-theme-colors` — preoblikuje stran z nastavitvijo enega atributa
  (`data-pantoken-color`) na eno izmed 13 palet, ali na `custom` za poljuben brand hex. Glej
  [Barve teme](#theme-colors).
- `@pantoken/plugin-custom-components` — token-podprti uporabniški kontrolniki vključno s SegmentedControl
  in SkeletonLoader.

### Segmentiran kontrolnik

Uporabi segmentiran kontrolnik za dve do pet sorodnih pogledov ali filtrov. Vsaka možnost je označen izvorni radio v eni imenovani skupini; enega označi kot checked na začetku. Uporabi zavihke ali dropdown, če možnosti ne bodo udobno stale, in uporabi gumbne skupine za akcije namesto za izbire. Stil `-size-md` je privzeti, z `-size-sm` in `-size-lg` za tesnejše in bolj izrazite kontekste.

Uvozi `@pantoken/plugin-custom-components/segmented-control.css` za kontrolnik in njegove overflow
gumbe. Uporabi `-icon-*` razred na labeli segmenta, kadar segment potrebuje glifo; interakcijski pomočnik prav tako promovira `-icon-*` razred iz njegovega izvornega inputa na label painter.
Daj fieldset opisni `aria-label` ali vidno legendo. Pomočnik ohranja izvorno
radijsko napoved, doda tipkovni krmarjenje in po želji razkrije en obrezan segment na vsak pritisk puščice. Uporabi logične start/end kontrolnike in dostopne oznake gumbov v obeh smereh:

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

Uvozi `@pantoken/interactions/segmented-control.iife.js` za registracijo, ko je DOM pripravljen, ali pokliči
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` iz `@pantoken/interactions`
in pokliči `cleanup()` pri odstranjevanju. CSS in izvorne radio izbire delujejo brez JS; overflow
puščice potrebujejo vedenje. Izbrani element uporablja senco z dvema plastema iz semantičnih
drop-shadow barv; je ločena senca aktivnega elementa namesto obstoječega
`--instui-elevation-*` kompozita. Overflow gumbi uporabljajo upstream elevation3 komponentne tokene
prek `--pantoken-segmented-overflow-shadow`.

### Skeleton nalaganje

Podpot `skeleton-loader.css` stilu en dekorativni Text, Avatar ali Image obliko. Text sprejema
`-size-xxs` preko `-size-xxl`; Avatar in Image so srednje velikosti. Vsak opcijski `.skeleton-row`
doda eno besedilno vrstico, ne da bi spremenil velikost. CSS shimmer se ustavi po treh 1.5-sekundnih preletih in
ostane statičen, ko uporabnik raje zmanjšano animacijo. Deluje preden se JavaScript naloži.

Postavi oblike samo tam, kjer se bo pojavila vsebina, odvisna od poizvedbe, ne preko na strežniku znane navigacije,
filtre, naslove ali kontrolnike. Skeleton ni mera napredka ali stanje zasedenosti akcije. Ohrani
obstoječo vsebino vidno med osvežitvami v ozadju; za akcije uporabi spinner ali stanje zasedenega gumba.

Nadrejen aplikacija upravlja markup za loading, loaded, empty in error. Poskrbi za eno prazno statusno območje
na stran in ločen prazen alert v strežniškem HTML, oba **izven** zasedenega vsebinskega območja:

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

Pokliči vedenje na nivoju parenta, ko se stanje zahteve spremeni. Posodobi `aria-busy` in oba
predobstoječa oznanila, vendar nikoli ne zamenja vsebine ali premakne fokusa:

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

Če uporabljaš paket interakcij po komponentah namesto neposrednega uvoza, dispatchaj
`pantoken:skeleton-state` dogodek na `[data-skeleton-region]` elementu z
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Zakasni _prikazovanje_
placeholderjev za 200–500ms za hitre zahteve; vedenje neodvisno zakasni loading
oznanjevanje za 400ms. Pri pasivnih nalaganjih pusti fokus tam, kjer je. Premakni fokus na novo
naložen rezultat le, ko ga je zahteval uporabnikov lasten ukrep. Status vozlišče oznani rezultate in prazna
stanja; alert vozlišče oznani napake. Ne kombiniraj `aria-busy`, `role="status"` in
`role="alert"` na enem elementu.

Lucide Lab register lahko naložiš lenobno, nato ga predaš sinhronemu token hooku:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Nekaj stvari, ki so bile prej vtičniki, zdaj prihaja v `@pantoken/components`, ker jih toliko komponent potrebuje iz škatle: elevacijske sence (`--instui-elevation-*`, v `components.css`), fokusni obroček (v `base.css` — vsak fokusabilen dobi to, ko pantoken upravlja stran), in Instructure brand pisave (Atkinson Hyperlegible Next: `base.css` uporablja `--instui-font-family-base`; opcijski
`@pantoken/components/fonts.css` naloži `@font-face` woff2).

## Barve teme {#theme-colors}

`@pantoken/plugin-custom-theme-colors` izda en `[data-pantoken-color="…"]` blok na paleto
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Vsak blok usmeri brand primitive (`--instui-primitive-color-navy-*` in `-blue-*`)
na izbrano paleto. Prav tako ponovno izpelje brand površine, ki jih je upstream sploščil v literalne hexe,
ohranjajoč njihovo že vpečeno alfa preko `color-mix()`. Semantične statusne barve, eksplicitni modri akcenti in
elevacijske sence ostanejo nespremenjene. Preizkusi v
[swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Po meri izbrana barva znamke

Nastavi `data-pantoken-color="custom"` za prebranding iz poljubnega hexa, kot je primarna barva, ki jo vpiše Canvas admin
v Theme Editor. pantoken izpelje celotno lestvico 10–200 `--instui-primitive-color-custom-*`
iz nje:

1. **Referenčna krivulja.** Ciljna svetlost vsake stopnje je povprečna OKLCH svetlost 13
   palet pri tej stopnji, s 0 fiksirano na belo in 210 na črno. Tako ima razmik po meri lestvice
   enako gostoto kot prevožene palete.
2. **Sidro.** Vhod pristane na stopnji, katere ciljna svetlost je najbližja njegovi lastni, nato se zlije na
   točno to svetlost. `#cccccc` postane `custom-40` pri `#c9c9c9`: blizu vhoda, vendar ne
   vedno enak. "Najbližje" pomeni najbližja stopnja na krivulji, ne najbližja barva obstoječe palete.
3. **Polnilo.** Vsaka druga stopnja obdrži vhodov odtenek. Njena nasičenost sledi povprečni
   nasičenostni krivulji palet glede na sidro, in se zmanjša le tam, kjer barva pade izven sRGB.

Sprejemata se samo `#rgb` in `#rrggbb`; vse drugo vrže `TypeError`, tako da hex iz obrazca
ne more injicirati CSS.

Med gradnjo izpiši celotno pravilo z že deklariranimi izpeljanimi primitivami:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Za izbiranje barve v času izvajanja brez pošiljanja kompleta tokenov, predizračunaj krivuljo in remap
pravilo med gradnjo. Nato uporabi brezodvisni `/scale` v brskalniku in nastavi le 20
izpeljanih primitiv:

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

Tema izbire na docs strani, Canvas Theme Editor in demo zgoraj vsi delujejo na ta način.

Glej [API referenco](/api/) za izvoze posameznih vtičnikov.
