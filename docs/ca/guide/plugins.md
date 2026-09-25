# Plugins

Un plugin de pantoken amplia la sortida de tokens o CSS sense bifurcar un paquet. Se’n crea un amb
`definePlugin` des de `@pantoken/plugin-kit`, i després se li passa a `buildTokens` o `toCss`.

## Crear un plugin

Donar a `definePlugin` els hooks que implementes. Retorna un plugin normal, marcat amb les
capacitats inferides a partir d’aquests hooks. Un plugin pot estendre l’IR (`tokens`, `icons`), la sortida CSS
(`css`), o ambdues coses.

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

`buildTokens` i `toCss` executen `checkPlugins` sobre els plugins que els passes. Mostra un avís — mai llença una excepció —
quan un plugin no té cap hook coincident per l’etapa en què s’ha registrat, així un plugin només per tokens passat
a `toCss` s’omet amb una nota en lloc de no fer res silenciosament.

## Composar plugins

Construir sobre un altre plugin amb `extendPlugin`, o combinar iguals amb `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Els hooks de la mateixa etapa es composen: `tokens` executa la base i després l’addició, `css` combina les dues
contribucions, i `icons` executa ambdues.

## Validar la sortida del teu plugin

Executa les comprovacions de drift compartides de `@pantoken/utils` sobre la sortida del teu plugin en el seu test, així un
error tipogràfic o un token reanomenat falla ràpidament i de forma local:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Els plugins empaquetats

- `@pantoken/plugin-simple-icons` — icones de marca de simple-icons, registrades com a tokens d’icona.
- `@pantoken/plugin-lucide-lab` — icones Lucide Lab, registrades com a tokens d’imatge `--instui-icon-*`.
- `@pantoken/plugin-logos` — logotips de producte d’Instructure com a SVG, URIs de dades, i tokens d’imatge `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (no un plugin pantoken) que elimina
  propietats personalitzades no utilitzades d’una fulla d’estils.
- `@pantoken/plugin-custom-theme-colors` — rebrandeja una pàgina configurant un atribut
  (`data-pantoken-color`) a una de 13 paletes, o a `custom` per qualsevol hex de marca. Veure
  [Colors del tema](#theme-colors).

El registre de Lucide Lab pot carregar-se de forma mandrosa i després passar-se al hook de tokens sincrònic:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algunes coses que abans eren plugins ara s’inclouen en `@pantoken/components`, ja que tants components les necessiten
per defecte: ombres d’elevació (`--instui-elevation-*`, en `components.css`), l’anell de focus-outline
(en `base.css` — cada element focalitzable l’obté quan pantoken controla la pàgina), i les fonts de marca d’Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; l’opcional
`@pantoken/components/fonts.css` carrega els woff2s `@font-face`).

## Colors del tema

`@pantoken/plugin-custom-theme-colors` emet un bloc `[data-pantoken-color="…"]` per paleta
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Cada bloc apunta les primitives de la marca (`--instui-primitive-color-navy-*` i `-blue-*`)
a la paleta escollida. També re-deriva les superfícies de marca que l’upstream va aplanar a hex literals,
conservant la seva alfa pre-bakejada mitjançant `color-mix()`. Els colors semàntics d’estat, els accents blaus explícits i
les ombres d’elevació es mantenen. Prova-ho al
[demo de theming basat en swatches](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Color personalitzat de marca

Configura `data-pantoken-color="custom"` per rebrandar des de qualsevol hex, per exemple el color primari que un administrador de Canvas
escriu a l’Editor de Temes. pantoken deriva una escala completa de 10–200 `--instui-primitive-color-custom-*`
a partir d’aquest:

1. **Corba de referència.** La llum de destinació de cada pas és la mitjana de la llum OKLCH de les 13
   paletes en aquell pas, amb 0 fixat a blanc i 210 a negre. Així l’espaiat de l’escala personalitzada
   coincideix amb el de les paletes empaquetades.
2. **Ancora.** L’entrada aterriza en el pas la llum de destinació del qual és la més propera a la seva, i llavors s’ajusta a
   aquella llum exacta. `#cccccc` esdevé `custom-40` a `#c9c9c9`: propera a l’entrada, però no
   sempre idèntica. "Més proper" significa el pas més proper a la corba, no el color existents més semblant.
3. **Omplir.** Cada altre pas manté la matriu (hue) de l’entrada. La seva saturació segueix la corba de saturació mitjana de les paletes relativa a l’ancora, i només es redueix on un color queda fora de l’espai sRGB.

Només s’accepten `#rgb` i `#rrggbb`; qualsevol altra cosa llença un `TypeError`, així un hex procedent d’un formulari
no pot injectar CSS.

En temps de build, emet tota la regla amb les primitives derivades ja declarades:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Per triar el color en temps d’execució sense enviar el conjunt de tokens, precomputar la corba i la regla de remap en build. Després usar l’entrada sense dependències `/scale` al navegador, i definir només les 20
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

El selector de tema del lloc de docs, l’editor de temes de Canvas i el demo anterior funciona així.

Veure la [referència d’API](/api/) per les exportacions de cada plugin.
