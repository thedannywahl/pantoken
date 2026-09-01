# Plugin

Un plugin pantoken estende l'output dei token o del CSS senza dover forkare un pacchetto. Se ne crea uno con
`definePlugin` da `@pantoken/plugin-kit`, quindi lo passi a `buildTokens` o `toCss`.

## Creare un plugin

Dai a `definePlugin` gli hook che implementi. Restituisce un plugin normale, contrassegnato con le
capabilities dedotte da quegli hook. Un plugin può estendere l'IR (`tokens`, `icons`), l'output CSS
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

`buildTokens` e `toCss` eseguono `checkPlugins` sui plugin che passi. Mostra un avviso — non lancia mai un'eccezione —
quando un plugin non ha uno hook corrispondente per la fase in cui è registrato, quindi un plugin solo per token passato
a `toCss` viene saltato con una nota piuttosto che rimanere silenziosamente inattivo.

## Comporre plugin

Costruisci sopra un altro plugin con `extendPlugin`, o combina peer con `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Gli hook dello stesso stadio si compongono: `tokens` esegue prima il base e poi l'aggiunta, `css` unisce i due
contributi, e `icons` esegue entrambi.

## Convalidare l'output del tuo plugin

Esegui i controlli di drift condivisi da `@pantoken/utils` sull'output del tuo plugin nei suoi test, così un
errore di battitura o un token rinominato fallisce rapidamente e localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## I plugin inclusi

- `@pantoken/plugin-simple-icons` — brand di icone da simple-icons, registrate come token icona.
- `@pantoken/plugin-logos` — loghi prodotto Instructure come SVG, data URI e `--instui-logo-*`
  token immagine.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (non un plugin pantoken) che rimuove
  proprietà personalizzate non usate da un foglio di stile.

Alcune cose che prima erano plugin ora vengono distribuite in `@pantoken/components`, dato che molti componenti le richiedono
di default: le ombre di elevazione (`--instui-elevation-*`, in `components.css`), l'anello del focus-outline
(in `base.css` — ogni elemento focalizzabile lo ottiene quando pantoken controlla la pagina), e i font del brand Instructure
(Atkinson Hyperlegible Next: `base.css` applica `--instui-font-family-base`; l'opzionale
`@pantoken/components/fonts.css` carica i `@font-face` woff2).

Vedi la [documentazione API](/api/) per le esportazioni di ciascun plugin.
