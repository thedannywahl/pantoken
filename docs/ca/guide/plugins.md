# Complementos

Un complement de pantoken amplia la sortida de tokens o CSS sense bifurcar un paquet. Se’n crea un amb
`definePlugin` des de `@pantoken/plugin-kit`, i després el passes a `buildTokens` o `toCss`.

## Crear un complement

Proporciona a `definePlugin` els hooks que implementes. Retorna un complement normal, marcat amb les
capacitats inferides a partir d’aquests hooks. Un complement pot ampliar l’IR (`tokens`, `icons`), la sortida CSS
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

`buildTokens` i `toCss` executen `checkPlugins` sobre els complements que passes. Avisa — mai llença una excepció —
quan un complement no té cap hook coincident per l’etapa on s’ha registrat, així que un complement només de tokens passat
a `toCss` s’omet amb una nota en lloc de no fer res silenciosament.

## Composar complements

Construeix sobre un altre complement amb `extendPlugin`, o combina iguals amb `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Els hooks de la mateixa etapa es poden compondre: `tokens` executa primer la base i després l’addició, `css` fusiona les dues
contribucions, i `icons` executa ambdues.

## Validar la sortida del teu complement

Executa les comprovacions de drift compartides de `@pantoken/utils` sobre la sortida del teu complement dins del seu test, perquè una
falta d’ortografia o un token reanomenat falli ràpidament i localment:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Els complements emparellats

- `@pantoken/plugin-simple-icons` — icones de marca de simple-icons, registrades com a tokens d’icona.
- `@pantoken/plugin-lucide-lab` — icones de Lucide Lab, registrades com a tokens d’imatge `--instui-icon-*`.
- `@pantoken/plugin-logos` — logotips de productes d’Instructure com a SVG, URIs de dades i tokens d’imatge `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin de PostCSS (no un complement pantoken) que elimina
  propietats personalitzades no utilitzades d’una fulla d’estils.

El registre de Lucide Lab es pot carregar de manera diferida i després passar a l’hook de tokens síncron:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algunes coses que abans eren complements ara s’inclouen a `@pantoken/components`, ja que molts components les necessiten
de sèrie: ombres d’elevació (`--instui-elevation-*`, a `components.css`), l’anell de focus-outline
(a `base.css` — cada element enfocables l’obté quan pantoken controla la pàgina), i les fonts de la marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; l’opció opt-in
`@pantoken/components/fonts.css` carrega els woff2 de `@font-face`).

Consulta la [referència de l’API](/api/) per a les exportacions de cada complement.
