# Komma igång

Pantoken tar [Instructure UI](https://instructure.design) design-tokens och ikoner, löser dem en gång och omformar den modellen till paket för många plattformar: vanliga stylesheet-filer, SCSS och Less, React och Vue och Svelte, Tailwind och Panda, native Swift och Kotlin, WordPress och Drupal, Figma och mer.

Installera det minsta paketet som passar din uppgift. Allt finns också återexporterat av det enhetliga `pantoken`-paketet, så du kan börja där och avgränsa senare.

## Skapa ett startprojekt

Det snabbaste sättet att prova pantoken: skapa ett startprojekt med det redan installerat och uppkopplat.

```sh
npx create-pantoken-app
```

Plattformar: `components` (ren HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Se [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) för `--dir <path>` och programmatisk användning.

Använder du en AI-kodningsagent? Ingen installation behövs — peka den direkt på skillen:

```prompt
Hämta create.pantoken.app/SKILL.md och följ den för att konfigurera pantoken i det här projektet.
```

Om du hellre vill koppla pantokens agent-regler permanent i repot (AGENTS.md, editor-regler, en lokal kopia av denna skill), kör istället `npx @pantoken/ai init`.

## Token-modellen

Tokens är CSS-custom properties namngivna `--instui-<group>-<name>`, till exempel `--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre teman levereras: `rebrand` (standard, med `light-dark()` där ljust och mörkt skiljer), `canvas`, och `canvasHighContrast`. Ikoner är `<image>`-tokens (`--instui-icon-<name>`) härledda från Lucide plus Instructures egna glyfer.

## Styla en webapp

Installera stylesheeten och importera den en gång. Den definierar varje `--instui-*`-property, så du refererar till dem direkt i din egen CSS.

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

Webkomponenten fungerar i vilket ramverk som helst, utan portering.

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

Ikoner är CSS-custom properties (`--instui-icon-<name>`). Ladda stylesheeten en gång och referera till vilken ikon som helst som en `mask-image` eller `background-image` — ingen import per ikon krävs.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enstaka ikon vs. hela uppsättningen

`@pantoken/icons` exponerar två namngivna exporter. Använd `iconsByName` för att plocka ut en ikon utan att iterera över hela arrayen:

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

Båda exporterna laddar den fulla IR:n vid modulinitialisering — det finns ingen per-ikon tree-shaking på denna nivå. För slank CSS-endast laddning, använd [CDN picker](/guide/cdn-picker) för att generera en kombinerad URL bara för de ikoner du behöver.

## Generera för en native plattform

CLI:n skriver token-källan in i ett mål-repo. Ingen installation utöver runner krävs:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Se [pantoken CLI](/guide/cli) för varje mål.

## VS Code författarhjälp

`@pantoken/pantoken` levererar nu VS Code custom-data-filer så downstream-projekt kan få klass- och tokenkomplettering i HTML/CSS utan att behöva installera ett pantoken-specifikt tillägg.

1. Installera det enhetliga paketet:

```sh
npm i @pantoken/pantoken
```

1. Peka VS Code på den medföljande custom-data JSON-filen från din konsumentarbetsyta:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ladda om VS Code (eller kör "Developer: Reload Window") för att tillämpa den nya datan.

Detta möjliggör förslag för `instui-*` klass-tokens (och `-modifier` klass-tokens) plus `--instui-*` custom properties.

## Vad komma härnäst

- [Paketkartan](/api/) — vilket paket som nås för vilken uppgift.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installera agent-assets och regler i ett konsumentrepo.
- [Arkitektur](/guide/architecture) — hur token-modellen, core och outputs hänger ihop.
- [API-referens](/api/) — varje exporterad symbol, genererad från källan.
