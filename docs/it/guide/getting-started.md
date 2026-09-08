# Iniziare

Pantoken prende i design token e le icone di [Instructure UI](https://instructure.design), li risolve una sola volta e rimodella quel singolo
modello in pacchetti per molte piattaforme: fogli di stile plain, SCSS e Less, React e Vue e Svelte,
Tailwind e Panda, native Swift e Kotlin, WordPress e Drupal, Figma e altro.

Si installa il pacchetto più piccolo che corrisponde al compito. Tutto è inoltre riesportato dal pacchetto unificato
`pantoken`, quindi si può iniziare da lì e restringere in seguito.

## Scaffold di un progetto starter

Il modo più rapido per provare pantoken: scaffoldare un progetto starter con esso già installato e collegato.

```sh
npx create-pantoken-app
```

Piattaforme: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Vedi
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) per `--dir <path>` e
uso programmatico.

Si usa un agente di codifica AI? Nessuna installazione necessaria — indirizzalo direttamente verso la skill:

```prompt
Recupera create.pantoken.app/SKILL.md e segui le istruzioni per configurare pantoken in questo progetto.
```

Se si preferisce invece collegare permanentemente le regole dell'agente di pantoken nel repo (AGENTS.md, regole per l'editor, una copia locale di questa skill), eseguire `npx @pantoken/ai init`.

## Il modello di token

I token sono proprietà personalizzate CSS chiamate `--instui-<group>-<name>`, per esempio
`--instui-color-background-brand` o `--instui-spacing-space-md`. Tre temi sono forniti: `rebrand`
(il predefinito, con `light-dark()` dove light e dark differiscono), `canvas`, e `canvasHighContrast`.
Le icone sono token `<image>` (`--instui-icon-<name>`) derivati da Lucide più i glifi personalizzati di Instructure.

## Stilare un'app web

Installare il foglio di stile e importarlo una sola volta. Definisce ogni proprietà `--instui-*`, quindi si possono usare
direttamente dal proprio CSS.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Usare le icone ovunque

Il componente web funziona in qualsiasi framework, senza porting.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Token CSS

Le icone sono proprietà personalizzate CSS (`--instui-icon-<name>`). Caricare il foglio di stile una volta e riferirsi a qualsiasi
icona come `mask-image` o `background-image` — nessun import per singola icona necessario.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — icona singola vs. set completo

`@pantoken/icons` espone due export nominati. Usare `iconsByName` per prelevare una singola icona senza iterare
l'intero array:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Usare `icons` quando è necessario l'intero set (per es. per costruire un picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Entrambi gli export caricano l'intero IR all'inizializzazione del modulo — non esiste tree-shaking per singola icona a questo
livello. Per un caricamento snello solo CSS, usare il [CDN picker](/guide/cdn-picker) per generare un URL combinato
solo per le icone necessarie.

## Generare per una piattaforma nativa

La CLI scrive la sorgente dei token in un repo target. Nessuna installazione oltre al runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Vedi [la CLI di pantoken](/guide/cli) per ogni target.

## Suggerimenti per l'autore in VS Code

`@pantoken/pantoken` ora fornisce file custom-data per VS Code in modo che i progetti downstream possano ottenere completamento di classi e
token in HTML/CSS senza installare un'estensione specifica di pantoken.

1. Installare il pacchetto unificato:

```sh
npm i @pantoken/pantoken
```

1. Puntare VS Code sul custom-data JSON fornito dal pacchetto nel workspace del consumer:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ricaricare VS Code (o eseguire "Developer: Reload Window") per applicare i nuovi dati.

Questo abilita suggerimenti per i token di classe `instui-*` (e token di classe `-modifier`) oltre a
proprietà custom `--instui-*`.

## Dove andare dopo

- [La mappa dei pacchetti](/guide/packages) — quale pacchetto scegliere, in base al compito.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installare risorse e regole dell'agente in un repo consumer.
- [Architettura](/guide/architecture) — come il modello di token, il core e gli output si incastrano.
- [Riferimento API](/api/) — ogni simbolo esportato, generato dalla sorgente.
