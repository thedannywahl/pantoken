# Plugins

Un plugin de pantoken amplia la sortida de tokens o CSS sense bifurcar un paquet. Se'n construeix un amb
`definePlugin` des de `@pantoken/plugin-kit`, i després se li passa a `buildTokens` o `toCss`.

## Crear un plugin

Donar a `definePlugin` els hooks que implementes. Retorna un plugin normal, marcat amb les
capacitats inferides a partir d'aquests hooks. Un plugin pot ampliar l'IR (`tokens`, `icons`), la
sortida CSS (`css`), o ambdues coses.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registre conscient de les capacitats

`buildTokens` i `toCss` executen `checkPlugins` sobre els plugins que hi passes. Mostra avisos — mai llença excepcions —
quan un plugin no té cap hook coincident amb l'etapa en què està registrat, així que un plugin només de tokens passat
a `toCss` s'omet amb una nota en lloc de no fer res en silenci.

## Composar plugins

Construir a sobre d'un altre plugin amb `extendPlugin`, o combinar iguals amb `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Els hooks de la mateixa etapa es composen: `tokens` executa primer el base i després l'adició, `css` fusiona les dues
contribucions, i `icons` executa ambdues.

## Validar la sortida del teu plugin

Executa les comprovacions de deriva compartides de `@pantoken/utils` sobre la sortida del teu plugin en el seu test, perquè una
errada tipogràfica o un token reanomenat falli ràpidament i localment:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Els plugins empaquetats

- `@pantoken/plugin-simple-icons` — icones de marca de simple-icons, registrades com a tokens d'icona.
- `@pantoken/plugin-logos` — logotips de productes Instructure com a SVG, URI de dades, i tokens d'imatge `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (no un plugin de pantoken) que elimina
  propietats personalitzades no utilitzades d'una fulla d'estils.

Algunes coses que abans eren plugins ara s'includeixen a `@pantoken/components`, ja que tants components les necessiten
per defecte: ombres d'elevació (`--instui-elevation-*`, a `components.css`), l'anell de focus-outline
(a `base.css` — cada element focusable l'obté quan pantoken controla la pàgina), i les fonts de la marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; l'opcional `@pantoken/components/fonts.css` carrega els woff2s de `@font-face`).

Veure la [referència de l'API](/api/) per les exportacions de cada plugin.
