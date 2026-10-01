# Plugins

Un plugin de pantoken amplia la sortida de tokens o CSS sense bifurcar un paquet. Se'n construeix un amb
`definePlugin` des de `@pantoken/plugin-kit`, i després es passa a `buildTokens` o `toCss`.

## Crear un plugin

Doneu a `definePlugin` els hooks que implementeu. Torna un plugin normal, marcat amb les
capacitats inferides d'aquests hooks. Un plugin pot estendre l'IR (`tokens`, `icons`), la sortida CSS
(`css`), o ambdós.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registre conscient de capacitats

`buildTokens` i `toCss` executen `checkPlugins` sobre els plugins que li passeu. Avisa — mai llença excepcions —
quan un plugin no té un hook coincident per l'etapa en què està registrat, així que un plugin només de tokens passat
a `toCss` s'ignora amb una nota en comptes de no fer res silenciosament.

## Composar plugins

Construeix sobre un altre plugin amb `extendPlugin`, o combina companys amb `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Els hooks de la mateixa etapa es componen: `tokens` executa la base i després l'adició, `css` fusiona les dues
contribucions, i `icons` executa ambdues.

## Validar la sortida del teu plugin

Executa les comprovacions de deriva compartides de `@pantoken/utils` sobre la sortida del teu plugin en el seu test, perquè un
error tipogràfic o un token renombrat falli ràpidament i localment:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Els plugins inclosos

- `@pantoken/plugin-simple-icons` — icons de marca de simple-icons, registrats com a tokens d'icona.
- `@pantoken/plugin-lucide-lab` — icones Lucide Lab, registrades com a tokens d'imatge `--instui-icon-*`.
- `@pantoken/plugin-logos` — logotips de productes d'Instructure com SVGs, URI de dades i tokens d'imatge `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (no un plugin pantoken) que elimina
  propietats personalitzades no utilitzades d'una fulla d'estils.
- `@pantoken/plugin-custom-theme-colors` — rebrandeja una pàgina establint un atribut
  (`data-pantoken-color`) a una de 13 paletes, o a `custom` per a qualsevol hex de marca. Veure
  [Colors de tema](#theme-colors).
- `@pantoken/plugin-custom-components` — controls personalitzats recolzats en tokens incloent SegmentedControl
  i SkeletonLoader.

### Control segmentat

Utilitza un control segmentat per a dues a cinc vistes relacionades o filtres. Cada opció és un radio nadiu etiquetat en un grup anomenat; marca'n un com a marcat inicialment. Utilitza pestanyes o un desplegable si les opcions no hi cabran còmodament, i utilitza grups de botons per a accions en comptes d'eleccions. L'estil `-size-md` és el per defecte, amb `-size-sm` i `-size-lg` per a contexts més ajustats i més prominents.

Importa `@pantoken/plugin-custom-components/segmented-control.css` per al control i els seus botons d'excessos. Usa una classe `-icon-*` en una etiqueta de segment quan el segment necessita un glif; l'ajudant d'interacció també promou una classe `-icon-*` del seu input nadiu al pintor de l'etiqueta.
Dóna al fieldset un `aria-label` descriptiu o una llegenda visible. L'ajudant preserva l'anunci nadiu del radio, afegeix navegació per teclat, i opcionalment revela un segment retallat per cada pressió d'arc. Utilitza controls lògics d'inici/fi i etiquetes de botó accessibles en ambdues direccions:

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

Importa `@pantoken/interactions/segmented-control.iife.js` per al registre quan el DOM estigui llest, o crida
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` des de `@pantoken/interactions`
i crida `cleanup()` quan l'elimineu. El CSS i les opcions de radio natives funcionen sense JS; les fletxes d'excessos necessiten el comportament. L'element seleccionat usa l'ombra de disseny de dues capes dels colors semàntics de drop-shadow; és una ombra d'element actiu distincta en comptes d'un compost `--instui-elevation-*` existent. Els botons d'excessos utilitzen els tokens del component elevation3 upstream
a través de `--pantoken-segmented-overflow-shadow`.

### Càrrega d'esquelet

La subruta `skeleton-loader.css` estilitza una forma decorativa de Text, Avatar, o Image. Text accepta
`-size-xxs` a través de `-size-xxl`; Avatar i Image són de mida mitjana. Cada `.skeleton-row` opcional
afegeix una línia de text sense canviar la mida. El shimmer CSS s'atura després de tres barridos de 1,5 segons i
es manté estàtic quan l'usuari prefereix la reducció del moviment. Funciona abans que JavaScript es carregui.

Col·loca formes només on apareixerà contingut dependent de la consulta, no sobre la navegació, filtres, encapçalaments, o controls coneguts pel servidor. Un esquelet no és un mesurador de progrés ni un estat d'acció-ocupada. Mantén el contingut existent visible durant les actualitzacions en segon pla; utilitza un spinner o un estat d'ocupació de botó per a accions.

L'aplicació pare és propietària del marcatge loading, loaded, empty, i error. Proporciona una regió d'estat buida per pàgina i una alerta buida separada en l'HTML del servidor, ambdues **fora** de la regió de contingut ocupada:

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

Crida el comportament a nivell de pare quan l'estat de la sol·licitud canviï. Actualitza `aria-busy` i els dos anuncis preexistents, però mai no reposa contingut ni mou el focus:

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

Si s'utilitza el bundle d'interaccions per component en comptes de la importació directa, despacheu un
esdeveniment `pantoken:skeleton-state` sobre l'element `[data-skeleton-region]` amb
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Retarda _mostrar_ els espais reservats entre 200–500 ms per a sol·licituds ràpides; el comportament retarda de manera independent l'anunci de càrrega 400 ms. En càrregues passives de pàgina, deixeu el focus on sigui. Mou el focus a un resultat carregat només quan l'acció de l'usuari ho hagi sol·licitat. El node d'estat anuncia resultats i estats buits; el node d'alerta anuncia fallades. No combineu `aria-busy`, `role="status"`, i
`role="alert"` en un sol element.

El registre de Lucide Lab es pot carregar de manera lazy, i després passar al hook sincrònic de tokens:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algunes coses que abans eren plugins ara s'inclouen a `@pantoken/components`, ja que molts components les necessiten
per defecte: ombres d'elevació (`--instui-elevation-*`, en `components.css`), l'anell de focus-outline
(en `base.css` — cada element enfocables l'obté quan pantoken controla la pàgina), i les fonts de marca d'Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; l'opcional
`@pantoken/components/fonts.css` carrega els woff2s `@font-face`).

## Colors del tema

`@pantoken/plugin-custom-theme-colors` emet un bloc `[data-pantoken-color="…"]` per cada paleta
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Cada bloc apunta les primitives de marca (`--instui-primitive-color-navy-*` i `-blue-*`)
a la paleta triada. També re-deriva les superfícies de marca que upstream aplanava a hex literals,
mantinguent la seva alfa precomputada a través de `color-mix()`. Els colors semàntics d'estat, els accents blaus explícits, i
les ombres d'elevació es mantenen. Proveu-ho al
[demo de temes basat en swatches](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Color de marca personalitzat

Establiu `data-pantoken-color="custom"` per rebrandear des de qualsevol hex, com el color primari que un administrador de Canvas
escriu a l'Editor de Tema. pantoken deriva d'això una escala completa de 10–200 `--instui-primitive-color-custom-*`:

1. **Corba de referència.** La llumitat objectiu de cada pas és la mitjana de la llumitat OKLCH de les 13
   paletes en aquell pas, amb 0 fixat al blanc i 210 al negre. Així l'espaiament de l'escala personalitzada
   coincideix amb el de les paletes subministrades.
2. **Ancla.** L'entrada aterra en el pas la llumitat objectiu del qual és la més propera a la seva pròpia, i després s'ajusta a
   aquesta llumitat exacta. `#cccccc` esdevé `custom-40` a `#c9c9c9`: a prop de l'entrada, però no
   sempre idèntic. "Més proper" vol dir el pas més proper a la corba, no el color d'una paleta existent més proper.
3. **Omplir.** Cada altre pas conserva la tonalitat (hue) de l'entrada. La seva saturació segueix la corba de saturació mitjana de les paletes respecte a l'ancla, i es redueix només quan un color cau fora de l'espai sRGB.

Només s'accepten `#rgb` i `#rrggbb`; qualsevol altra cosa llença un `TypeError`, així que un hex d'un formulari
no pot injectar CSS.

En temps de build, emeteu tota la regla amb les primitives derivades ja declarades:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Per escollir el color en temps d'execució sense enviar el conjunt de tokens, precomputeu la corba i la regla de remap al moment de build. Aleshores utilitzeu l'entrada sense dependències `/scale` al navegador, i establiu només les 20
primitives derivades:

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

El selector de tema del lloc de docs, l'editor de temes de Canvas, i el demo anterior funcionen tots d'aquesta manera.

Consulteu la [referència d'API](/api/) per a les exportacions de cada plugin.
