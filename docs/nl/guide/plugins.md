# Plugins

Een pantoken-plugin breidt de token- of CSS-uitvoer uit zonder een pakket te fork-en. Je bouwt er een met
`definePlugin` van `@pantoken/plugin-kit`, en geeft het vervolgens door aan `buildTokens` of `toCss`.

## Schrijf een plugin

Geef `definePlugin` de hooks die je implementeert. Het retourneert een normale plugin, gebrandmerkt met de
mogelijkheden die uit die hooks worden afgeleid. Een plugin kan de IR uitbreiden (`tokens`, `icons`), de CSS-
uitvoer (`css`), of beide.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Mogelijkheid-bewuste registratie

`buildTokens` en `toCss` voeren `checkPlugins` uit over de plugins die je doorgeeft. Het waarschuwt — het gooit nooit —
als een plugin geen overeenkomende hook heeft voor de fase waarin het is geregistreerd, dus een alleen-token-plugin die aan
`toCss` wordt doorgegeven wordt overgeslagen met een opmerking in plaats van stilletjes niets te doen.

## Componeer plugins

Bouw voort op een andere plugin met `extendPlugin`, of combineer peers met `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks in dezelfde fase componeren: `tokens` voert eerst de basis uit en daarna de toevoeging, `css` voegt de twee
bijdragen samen, en `icons` voert beide uit.

## Valideer de uitvoer van je plugin

Draai de gedeelde drift-checks van `@pantoken/utils` over de eigen uitvoer van je plugin in de test, zodat een
typefout of een hernoemde token snel en lokaal faalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De meegeleverde plugins

- `@pantoken/plugin-simple-icons` — merk-icoontjes van simple-icons, geregistreerd als icoontoken.
- `@pantoken/plugin-logos` — Instructure productlogo's als SVG's, data-URI's, en `--instui-logo-*`
  afbeeldings-tokens.
- `@pantoken/plugin-prune-custom-props` — een PostCSS-plugin (geen pantoken-plugin) die
  ongebruikte custom properties uit een stylesheet verwijdert.

Een paar dingen die vroeger plugins waren worden nu meegeleverd in `@pantoken/components`, aangezien veel componenten
ze standaard nodig hebben: elevatie-schaduwen (`--instui-elevation-*`, in `components.css`), de focus-outline
ring (in `base.css` — ieder focusbaar element krijgt het wanneer pantoken de pagina beheert), en de Instructure merk-
fonts (Atkinson Hyperlegible Next: `base.css` past `--instui-font-family-base` toe; de opt-in
`@pantoken/components/fonts.css` laadt de `@font-face` woff2-bestanden).

Zie de [API reference](/api/) voor de exports van elke plugin.
