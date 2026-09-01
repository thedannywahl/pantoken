# Iniziare

pantoken prende i design token e le icone di Instructure UI, li risolve una sola volta e rimodella quel modello in pacchetti per molte piattaforme: fogli di stile plain, SCSS e Less, React e Vue e Svelte, Tailwind e Panda, nativo Swift e Kotlin, WordPress e Drupal, Figma e altro.

Si installa il pacchetto più piccolo che si adatta al compito. Tutto è anche riesportato dal pacchetto unificato `pantoken`, quindi è possibile partire da lì e restringere la scelta in seguito.

## Scaffold di un progetto starter

Il modo più rapido per provare pantoken: scaffoldare un progetto starter con pantoken già installato e configurato.

```sh
npx create-pantoken-app react
```

Piattaforme: `components` (HTML/CSS plain), `react`, `vue`, `svelte`, `web-components`, `angular`. Vedere [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) per `--dir <path>` e l'uso programmatico.

Si utilizza un agente di codifica AI? Nessuna installazione necessaria — indirizzalo direttamente verso la skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Funziona allo stesso modo per Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI e Amazon Q Developer CLI — sostituire `claude` con `gemini`, `agent`, `codex`, `copilot -p` o `q chat`. Se si preferisce integrare permanentemente le regole dell'agente di pantoken nel repo (AGENTS.md, regole dell'editor, una copia locale di questa skill), eseguire invece `npx @pantoken/ai init`.

## Il modello dei token

I token sono proprietà custom CSS chiamate `--instui-<group>-<name>`, per esempio `--instui-color-background-brand` o `--instui-spacing-space-md`. Vengono forniti tre temi: `rebrand` (predefinito, con `light-dark()` dove luce e scuro differiscono), `canvas` e `canvasHighContrast`. Le icone sono token `<image>` (`--instui-icon-<name>`) derivati da Lucide più i glifi personalizzati di Instructure.

## Stilizzare un'app web

Installare il foglio di stile e importarlo una volta. Definisce ogni proprietà `--instui-*`, quindi farne riferimento direttamente dal proprio CSS.

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

Il web component funziona in qualsiasi framework, senza porting.

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

Le icone sono proprietà custom CSS (`--instui-icon-<name>`). Caricare il foglio di stile una volta e riferirsi a qualsiasi icona come `mask-image` o `background-image` — nessuna importazione per icona necessaria.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — singola icona vs. set completo

`@pantoken/icons` espone due export nominati. Usare `iconsByName` per prelevare una singola icona senza iterare l'intero array:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Usare `icons` quando è necessario l'intero set (es. per costruire un picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Entrambi gli export caricano l'IR completo all'inizializzazione del modulo — non esiste tree-shaking per singola icona a questo livello. Per un caricamento leggero solo CSS, usare il [CDN picker](/guide/cdn-picker) per generare un URL combinato contenente solo le icone necessarie.

## Generare per una piattaforma nativa

La CLI scrive la sorgente dei token in un repo target. Nessuna installazione oltre al runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Vedere [la CLI di pantoken](/guide/cli) per ogni target.

## Suggerimenti per authoring in VS Code

`@pantoken/pantoken` ora fornisce file custom-data per VS Code in modo che i progetti downstream possano ottenere il completamento di classi e token in HTML/CSS senza installare un'estensione specifica per pantoken.

1. Installare il pacchetto unificato:

```sh
npm i @pantoken/pantoken
```

1. Puntare VS Code sul JSON custom-data fornito dal pacchetto dal workspace del consumer:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ricaricare VS Code (o eseguire "Developer: Reload Window") per applicare i nuovi dati.

Questo abilita i suggerimenti per i token di classe `instui-*` (e i token di classe `-modifier`) più le proprietà custom `--instui-*`.

## Dove andare dopo

- [La mappa dei pacchetti](/guide/packages) — quale pacchetto scegliere, per compito.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installare asset e regole dell'agente in un repo consumer.
- [Architettura](/guide/architecture) — come si integrano modello dei token, core e output.
- [Riferimento API](/api/) — ogni simbolo esportato, generato dal sorgente.
