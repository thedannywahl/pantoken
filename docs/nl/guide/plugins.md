# Plugins

Een pantoken-plugin breidt de token- of CSS-uitvoer uit zonder een pakket te fork'en. Je bouwt er een met
`definePlugin` van `@pantoken/plugin-kit`, en geeft deze vervolgens door aan `buildTokens` of `toCss`.

## Een plugin schrijven

Geef `definePlugin` de hooks die je implementeert. Het retourneert een normale plugin, gebrandmerkt met de
mogelijkheden die uit die hooks worden afgeleid. Een plugin kan de IR uitbreiden (`tokens`, `icons`), de CSS
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

## Mogelijkheidsbewuste registratie

`buildTokens` en `toCss` voeren `checkPlugins` uit over de plugins die je doorgeeft. Het waarschuwt — het gooit nooit —
wanneer een plugin geen passende hook heeft voor de fase waarin het geregistreerd is, dus een alleen-token-plugin die
aan `toCss` wordt doorgegeven wordt overgeslagen met een notitie in plaats van stilletjes niets te doen.

## Plugins samenstellen

Bouw voort op een andere plugin met `extendPlugin`, of combineer peers met `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks in dezelfde fase componeren: `tokens` voert eerst de basis en daarna de toevoeging uit, `css` voegt de twee
bijdragen samen, en `icons` voert beide uit.

## Valideer de uitvoer van je plugin

Voer de gedeelde drift-checks van `@pantoken/utils` uit over de eigen uitvoer van je plugin in zijn test, zodat een
typo of een hernoemde token snel en lokaal faalt:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## De meegeleverde plugins

- `@pantoken/plugin-simple-icons` — merk-iconen van simple-icons, geregistreerd als icon-tokens.
- `@pantoken/plugin-lucide-lab` — Lucide Lab-iconen, geregistreerd als `--instui-icon-*` image-tokens.
- `@pantoken/plugin-logos` — Instructure productlogo's als SVG's, data-URI's en `--instui-logo-*`
  image-tokens.
- `@pantoken/plugin-prune-custom-props` — een PostCSS-plugin (geen pantoken-plugin) die
  ongebruikte custom properties uit een stylesheet verwijdert.

De registry van Lucide Lab kan lui geladen worden en daarna worden doorgegeven aan de synchrone token-hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Een paar dingen die vroeger plugins waren zitten nu in `@pantoken/components`, omdat zoveel componenten
ze direct nodig hebben: elevatie-schaduwen (`--instui-elevation-*`, in `components.css`), de focus-outline
ring (in `base.css` — elke focusable krijgt deze wanneer pantoken de pagina beheert), en de Instructure merklettertypen
(Atkinson Hyperlegible Next: `base.css` past `--instui-font-family-base` toe; de opt-in
`@pantoken/components/fonts.css` laadt de `@font-face` woff2-bestanden).

Zie de [API reference](/api/) voor de exports van elke plugin.
