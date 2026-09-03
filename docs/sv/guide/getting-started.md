# Komma igång

Pantoken tar [Instructure UI](https://instructure.design) designtokens och ikoner, löser dem en gång och omformar den modellen till paket för många plattformar: vanliga stylesheet, SCSS och Less, React och Vue och Svelte, Tailwind och Panda, native Swift och Kotlin, WordPress och Drupal, Figma och mer.

Installera det minsta paketet som passar din uppgift. Allt exporteras också om via det enhetliga `pantoken`-paketet, så du kan börja där och smalna av senare.

## Skapa ett startprojekt

Det snabbaste sättet att prova pantoken: skapa ett startprojekt med det redan installerat och inkopplat.

```sh
npx create-pantoken-app
```

Plattformar: `components` (vanlig HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Se [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) för `--dir <path>` och programmatisk användning.

Använder du en AI-kodningsagent? Ingen installation behövs — peka den direkt på skillen:

```prompt
Hämta create.pantoken.app/SKILL.md och följ den för att ställa in pantoken i det här projektet.
```

Om du hellre vill koppla pantokens agentregler permanent i repot (AGENTS.md, editorregler, en lokal kopia av denna skill), kör `npx @pantoken/ai init` istället.

## Token-modellen

Tokens är CSS custom properties namngivna `--instui-<group>-<name>`, till exempel `--instui-color-background-brand` eller `--instui-spacing-space-md`. Tre teman levereras: `rebrand` (standard, med `light-dark()` där ljust och mörkt skiljer), `canvas`, och `canvasHighContrast`. Ikoner är `<image>`-tokens (`--instui-icon-<name>`) härledda från Lucide plus Instructures egna glyfer.

## Styla en webbapp

Installera stylesheeten och importera den en gång. Den definierar varje `--instui-*`-egenskap, så du refererar till dem direkt från din egen CSS.

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

Ikoner är CSS custom properties (`--instui-icon-<name>`). Ladda stylesheeten en gång och referera till vilken ikon som helst som en `mask-image` eller `background-image` — ingen per-ikon-import behövs.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — enstaka ikon vs. hela uppsättningen

`@pantoken/icons` exponerar två namngivna export. Använd `iconsByName` för att plocka en ikon utan att iterera över hela arrayen:

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

Båda exporterna laddar hela IR vid modulinitering — det finns ingen per-ikon tree-shaking på denna nivå. För lättvikts CSS-endast laddning, använd [CDN-pickern](/guide/cdn-picker) för att generera en sammanslagen URL för endast de ikoner du behöver.

## Generera för en native plattform

CLI skriver token-källan in i ett målrepo. Ingen installation utöver runner krävs:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Se [pantoken CLI](/guide/cli) för varje mål.

## VS Code authoring-tips

`@pantoken/pantoken` levererar nu VS Code custom-data-filer så downstream-projekt kan få klass- och token-completion i HTML/CSS utan att installera en pantoken-specifik extension.

1. Installera det enhetliga paketet:

```sh
npm i @pantoken/pantoken
```

1. Peka VS Code på den medföljande custom-data JSON-filen från ditt consumer-arbetsyta:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ladda om VS Code (eller kör "Developer: Reload Window") för att tillämpa den nya datan.

Detta möjliggör förslag för `instui-*` klass-tokens (och `-modifier` klass-tokens) plus `--instui-*` custom properties.

## Vad kommer härnäst

- [Paketkartan](/guide/packages) — vilket paket att använda, efter uppgift.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — installera agentassets och regler i ett consumer-repo.
- [Arkitektur](/guide/architecture) — hur tokenmodellen, core och outputs hänger ihop.
- [API-referens](/api/) — varje exporterad symbol, genererad från källan.
