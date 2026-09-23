# Plugin

Un plugin pantoken estende l'output dei token o del CSS senza forkare un pacchetto. Se ne costruisce uno con
`definePlugin` da `@pantoken/plugin-kit`, poi lo si passa a `buildTokens` o `toCss`.

## Creare un plugin

Fornisci a `definePlugin` gli hook che implementi. Restituisce un plugin normale, etichettato con le
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

`buildTokens` e `toCss` eseguono `checkPlugins` sui plugin che passi. Avvisa — non lancia mai eccezioni —
quando un plugin non ha uno hook corrispondente per la fase in cui è registrato, quindi un plugin solo per i token passato
a `toCss` viene saltato con una nota invece di non fare nulla silenziosamente.

## Comporre plugin

Costruisci sopra un altro plugin con `extendPlugin`, o combina pari con `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Gli hook dello stesso stage si compongono: `tokens` esegue prima il base poi l'aggiunta, `css` unisce i due
contributi, e `icons` esegue entrambi.

## Convalidare l'output del tuo plugin

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

## Plugin inclusi

- `@pantoken/plugin-simple-icons` — icone brand da simple-icons, registrate come token icon.
- `@pantoken/plugin-lucide-lab` — icone Lucide Lab, registrate come token immagine `--instui-icon-*`.
- `@pantoken/plugin-logos` — loghi prodotto Instructure come SVG, data URI e token immagine `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (non un plugin pantoken) che rimuove
  le proprietà personalizzate inutilizzate da uno stylesheet.

Il registro di Lucide Lab può essere caricato pigramente, quindi passato allo hook sincrono dei token:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Alcune cose che una volta erano plugin ora sono incluse in `@pantoken/components`, dato che molte componenti le richiedono
di default: ombre di elevazione (`--instui-elevation-*`, in `components.css`), l'anello focus-outline
(in `base.css` — ogni elemento focalizzabile lo riceve quando pantoken controlla la pagina), e i font del brand Instructure
(Atkinson Hyperlegible Next: `base.css` applica `--instui-font-family-base`; l'opt-in
`@pantoken/components/fonts.css` carica i woff2 `@font-face`).

Vedere la [API reference](/api/) per le esportazioni di ciascun plugin.
