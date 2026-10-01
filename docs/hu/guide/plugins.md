# Beépülők

Egy pantoken beépülő kiterjeszti a token- vagy CSS-kimenetet anélkül, hogy egy csomagot fork-olna. Egyet a `definePlugin`-al lehet létrehozni a `@pantoken/plugin-kit`-ből, majd átadni a `buildTokens`-nek vagy a `toCss`-nak.

## Beépülő készítése

Adj meg a `definePlugin`-nek olyan hookokat, amiket implementálsz. Visszaad egy normál beépülőt, amelyet azokkal a képességekkel címkéz, amelyeket a hookok alapján levezetett. Egy beépülő kiterjesztheti az IR-t (`tokens`, `icons`), a CSS-kimenetet (`css`), vagy mindkettőt.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Képesség-tudatos regisztráció

A `buildTokens` és a `toCss` lefuttatja a `checkPlugins`-t az átadott beépülőkön. Figyelmeztet — soha nem dob — amikor egy beépülőnek nincs illeszkedő hookja arra a szakaszra, amelyben regisztrálták, így egy csak-token beépülőt, amit a `toCss`-nak adnak át, megjegyzéssel kihagynak ahelyett, hogy csendben nem csinálna semmit.

## Beépülők összerakása

Építs egy másik beépülőre a `extendPlugin`-vel, vagy kombináld társaiddal a `mergePlugin`-mal:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Az azonos szakaszú hookok komponálódnak: a `tokens` lefuttatja először az alapot, majd a kiegészítést, a `css` egyesíti a két hozzájárulást, és a `icons` mindkettőt lefuttatja.

## Validáld a beépülőd kimenetét

Futtasd a közös drift-ellenőrzéseket a `@pantoken/utils`-től a beépülőd saját kimenetén a tesztjében, hogy egy elírás vagy átnevezett token gyorsan és lokálisan hibára fusson:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## A beépített beépülők

- `@pantoken/plugin-simple-icons` — brand ikonok a simple-icons-ból, ikon tokenekként regisztrálva.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonok, `--instui-icon-*` kép tokenekként regisztrálva.
- `@pantoken/plugin-logos` — Instructure terméklogók SVG-ként, data URI-ként és `--instui-logo-*`
  kép tokenekként.
- `@pantoken/plugin-prune-custom-props` — egy PostCSS plugin (nem pantoken beépülő), amely eltávolítja a használaton kívüli egyéni
  property-ket egy stíluslapból.
- `@pantoken/plugin-custom-theme-colors` — egy oldalt újramárkázhat azzal, hogy beállít egy attribútumot
  (`data-pantoken-color`) a 13 paletta egyikére, vagy `custom`-ra bármely brand hex esetén. Lásd
  a [Téma színek](#theme-colors) részt.
- `@pantoken/plugin-custom-components` — token-támogatású egyéni vezérlők, beleértve a SegmentedControl-t
  és a SkeletonLoader-t.

### Szegmentált vezérlő

Használj szegmentált vezérlőt két–öt kapcsolódó nézethez vagy szűrőhöz. Minden opció egy feliratozott natív rádió egy névvel ellátott csoportban; jelölj ki egyet alapértelmezetten. Használj fülöket vagy legördülőt, ha az opciók nem férnek el kényelmesen, és használj gombcsoportokat műveletekhez a választások helyett. Az `-size-md` stílus az alapértelmezett, `-size-sm` és `-size-lg` pedig szorosabb és hangsúlyosabb kontextusokra.

Importáld a `@pantoken/plugin-custom-components/segmented-control.css`-et a kontrollhoz és annak túlcsorduló
gombjaihoz. Használj `-icon-*` osztályt egy szegmens feliratán, amikor a szegmensnek glyph-re van szüksége; az interakciós segéd továbbá átmozgat egy `-icon-*` osztályt a natív inputról a label festőre. Adj a fieldset-nek egy leíró `aria-label`-t vagy egy látható legendát. A segéd megőrzi a natív rádió bejelentést, hozzáad billentyűzet-navigációt, és opcionálisan felfedi egy levágott szegmenst nyílbillentyűnként. Használj logikus start/end vezérlőket és mindkét irányban hozzáférhető gombfeliratokat:

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

Importáld a `@pantoken/interactions/segmented-control.iife.js`-öt DOM-kész regisztrációhoz, vagy hívd meg a
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })`-ot a `@pantoken/interactions`
ból és hívd meg a `cleanup()`-at eltávolításkor. A CSS és a natív rádió választások JS nélkül is működnek; a túlcsorduló nyilakhoz kell a viselkedés. A kiválasztott elem a szemantikus drop-shadow színek kétrétegű design-árnyékát használja; ez egy külön aktív elem árnyék, nem egy létező
`--instui-elevation-*` kompozit. A túlcsorduló gombok az upstream elevation3 komponens tokenjeit használják
a `--pantoken-segmented-overflow-shadow`-on keresztül.

### Skeleton betöltés

A `skeleton-loader.css` alútvonal egy dekoratív Text, Avatar, vagy Image formát stilizál. A Text elfogad `-size-xxs`-t a `-size-xxl`-on keresztül; az Avatar és az Image közepes méretűek. Minden opcionális `.skeleton-row`
egy szövegsort ad hozzá méretváltoztatás nélkül. A CSS csillogás három 1.5 másodperces sweep után leáll és statikus marad, ha a felhasználó a csökkentett mozgást preferálja. Működik még JavaScript betöltése előtt is.

Helyezz el formákat csak ott, ahol lekérdezésfüggő tartalom fog megjelenni, ne a szerver által ismert navigáció, szűrők, címsorok vagy vezérlők fölé. A skeleton nem egy progresszmérő vagy művelet-foglalt állapot. Tartsd a meglévő tartalmat láthatóan háttérfrissítések során; használj spinner-t vagy gomb foglalt állapotot műveletekhez.

A szülő alkalmazás birtokolja a loading, loaded, empty és error markup-ot. Biztosíts egy üres státusz területet oldalanként és egy külön üres alert-et a szerver HTML-ben, mindkettőt a foglalt tartalmi régión kívül:

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

Hívd meg a szülő-szintű viselkedést, amikor a kérés állapota változik. Frissíti a `aria-busy`-t és a két meglévő bejelentést, de soha nem cseréli le a tartalmat vagy mozgatja a fókuszt:

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

Ha a komponensenkénti interakciós csomagot használod a közvetlen import helyett, küldj egy
`pantoken:skeleton-state` eseményt a `[data-skeleton-region]` elemen `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`-dal. Késleltessük a _helykitöltők_
megjelenítését 200–500 ms-cel gyors kérések esetén; a viselkedés külön kezeli a betöltési
bejelentés késleltetését 400 ms-cel. Passzív oldalbetöltéseknél hagyd a fókuszt a helyén. Csak akkor mozdítsd a fókuszt egy újonnan betöltött eredményre, ha a felhasználó saját művelete kérte azt. A státusz node bejelenti az eredményeket és az üres állapotokat; az alert node bejelenti a hibákat. Ne kombináld a `aria-busy`, `role="status"` és
`role="alert"`-et ugyanazon az elemen.

A Lucide Lab regisztere késleltetve tölthető be, majd átadható a szinkron token hook-nak:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Néhány dolog, amelyek korábban beépülők voltak, most a `@pantoken/components`-ben érkeznek, mivel sok komponensnek alapból szüksége van rájuk: emelési árnyékok (`--instui-elevation-*`, a `components.css`-ban), a focus-outline gyűrű (a `base.css`-ben — minden fókuszolható megkapja, amikor a pantoken birtokolja az oldalt), és az Instructure márkabetűtípusok (Atkinson Hyperlegible Next: a `base.css` alkalmazza a `--instui-font-family-base`-et; az opcionális `@pantoken/components/fonts.css` tölti be a `@font-face` woff2-okat).

## Téma színek

A `@pantoken/plugin-custom-theme-colors` egy `[data-pantoken-color="…"]` blokkot bocsát ki palettánként
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Minden blokk a brand primitíveket (`--instui-primitive-color-navy-*` és `-blue-*`)
irányítja a választott palettára. Újraszámolja azokat a brand felületeket is, amelyeket upstream literál hex-re lapított,
megtartva a beépített alfa értéküket a `color-mix()`-en keresztül. A szemantikus státusz színek, explicit kék kiemelések és
az emelési árnyékok változatlanok maradnak. Próbáld ki a
[swatch-alapú témázás demóban](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Egyéni brand szín

Állítsd be a `data-pantoken-color="custom"`-t, hogy bármely hex alapján újramárkázz, például a Canvas admin által a Téma szerkesztőbe begépelt elsődleges színt. A pantoken ebből egy teljes 10–200 `--instui-primitive-color-custom-*`
skálát származtat:

1. **Referencia görbe.** Minden lépés cél-fényessége az átlagos OKLCH fényesség a 13 paletta adott lépésén, 0 fehérhez rögzítve és 210 feketéhez rögzítve. Így az egyéni skála eloszlása megfelel a szállított palettákénak.
2. **Horgony.** A bemenet arra a lépésre esik, amelynek cél-fényessége a legközelebb áll a sajátjához, majd pontosan arra a fényességre ugrik. A `#cccccc` a `custom-40`-ré válik a `#c9c9c9`-nél: közel a bemenethez, de nem mindig azonos. A „legközelebbi” azt jelenti, hogy a görbe lépése közül a legközelebbi, nem a meglévő paletta színéhez legközelebb eső.
3. **Kitöltés.** Minden más lépés megtartja a bemenet tónusát. A telítettsége a paletták átlagos telítettség-görbéjét követi a horgonyhoz viszonyítva, és csak akkor csökkentik, ha egy szín kilép az sRGB-tartományból.

Csak `#rgb` és `#rrggbb` fogadható el; minden más dob egy `TypeError`-t, így egy űrlapról származó hex nem tud CSS-be injektálódni.

Build időben bocsásd ki az egész szabályt a leszármaztatott primitívekkel már deklarálva:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

A szín kiválasztásához futásidőben anélkül, hogy a token-készletet szállítanád, precompute-ld a görbét és az átképzési szabályt build időben. Ezután használd a függőségmentes `/scale` bejegyzést a böngészőben, és állítsd csak a 20
leszármaztatott primitívet:

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

A dokumentációs oldal témaválasztója, a Canvas téma szerkesztője és a fenti demó mind így működnek.

Lásd az [API referencia](/api/) oldalt az egyes beépülők exportjaihoz.
