# Komma igång

pantoken tar Instructure UIs designtokens och ikoner, resolver dem en gång och omformar den modellen
till paket för många plattformar: rena stylesheet-filer, SCSS och Less, React och Vue och Svelte,
Tailwind och Panda, native Swift och Kotlin, WordPress och Drupal, Figma och mer.

Installera det minsta paketet som passar din uppgift. Allt återexporteras också av det enhetliga
`pantoken`-paketet, så du kan börja där och avgränsa senare.

## Skapa ett startprojekt

Det snabbaste sättet att prova pantoken: skapa ett startprojekt med det redan installerat och kopplat.

```sh
npx create-pantoken-app react
```

Plattformar: `components` (ren HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Se
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) för `--dir <path>` och
programmatisk användning.

Använder du en AI-kodningsagent? Ingen installation behövs — peka den direkt på skillen:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Fungerar på samma sätt för Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI och Amazon Q
Developer CLI — byt `claude` mot `gemini`, `agent`, `codex`, `copilot -p` eller `q chat`. Om du hellre vill koppla pantokens agentregler permanent till repot (AGENTS.md, editor-regler, en lokal kopia
av denna skill), kör `npx @pantoken/ai init` istället.

## Token-modellen

Tokens är CSS custom properties med namnet `--instui-<group>-<name>`, till exempel
`--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre teman levereras: `rebrand`
(standard, med `light-dark()` där ljust och mörkt skiljer), `canvas`, och `canvasHighContrast`.
Ikoner är `<image>`-tokens (`--instui-icon-<name>`) härledda från Lucide plus Instructures egna
glyfer.

## Stylea en webbapp

Installera stylesheeten och importera den en gång. Den definierar varje `--instui-*`-egenskap, så du refererar
dem direkt från din egen CSS.

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

## Använd ikoner var som helst

Webbkomponenten fungerar i vilket ramverk som helst, utan portning.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-tokens

Ikoner är CSS custom properties (`--instui-icon-<name>`). Ladda stylesheeten en gång och referera vilken
ikon som helst som en `mask-image` eller `background-image` — ingen per-ikon import behövs.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enstaka ikon vs. hela uppsättningen

`@pantoken/icons` exponerar två namngivna exports. Använd `iconsByName` för att plocka en ikon utan att iterera
genom hela arrayen:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Använd `icons` när du behöver hela uppsättningen (t.ex. för att bygga en väljare):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Båda exports laddar hela IR vid modulinitalisering — det finns ingen per-ikon tree-shaking på denna
nivå. För slank CSS-endast-inläsning, använd [CDN picker](/guide/cdn-picker) för att generera en kombinerad URL
för endast de ikoner du behöver.

## Generera för en native plattform

CLI skriver tokenkällan in i ett mål-repo. Ingen installation bortom runnern:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Se [pantoken CLI](/guide/cli) för varje mål.

## VS Code authoring-tips

`@pantoken/pantoken` levererar nu VS Code custom-data-filer så downstream-projekt kan få klass- och
tokenkomplettering i HTML/CSS utan att installera en pantoken-specifik extension.

1. Installera det enhetliga paketet:

```sh
npm i @pantoken/pantoken
```

1. Peka VS Code på det medföljande custom-data JSON från din consumer-workspace:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ladda om VS Code (eller kör "Developer: Reload Window") för att tillämpa de nya datafilerna.

Detta möjliggör förslag för `instui-*` klass-tokens (och `-modifier` klass-tokens) plus
`--instui-*` custom properties.

## Vad härnäst

- [Paketkartan](/guide/packages) — vilket paket man når efter, per uppgift.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installera agenttillgångar och regler i ett consumer-repo.
- [Arkitektur](/guide/architecture) — hur tokenmodellen, core och outputs passar ihop.
- [API-referens](/api/) — varje exporterad symbol, genererad från källan.
