# Erste Schritte

pantoken nimmt die Design-Tokens und Icons von Instructure UI, löst sie einmal auf und formt dieses eine
Modell in Pakete für viele Plattformen um: einfache Stylesheets, SCSS und Less, React und Vue und Svelte,
Tailwind und Panda, native Swift und Kotlin, WordPress und Drupal, Figma und mehr.

Installiere das kleinste Paket, das zu deiner Aufgabe passt. Alles wird außerdem vom einheitlichen
`pantoken` Paket erneut exportiert, sodass du dort anfangen und später verfeinern kannst.

## Ein Starter-Projekt erstellen

Der schnellste Weg, pantoken auszuprobieren: ein Starter-Projekt scaffolden, das bereits installiert und integriert ist.

```sh
npx create-pantoken-app react
```

Plattformen: `components` (reines HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Siehe
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) für `--dir <path>` und
programmatische Nutzung.

Verwendest du einen KI-Coding-Agenten? Keine Installation nötig — weise ihn direkt auf das Skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Funktioniert auf dieselbe Weise für Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI und Amazon Q
Developer CLI — ersetze `claude` durch `gemini`, `agent`, `codex`, `copilot -p` oder `q chat`. Wenn du lieber pantokens Agentenregeln dauerhaft im Repo verankern möchtest (AGENTS.md, Editor-Regeln, eine lokale Kopie
dieses Skills), führe stattdessen `npx @pantoken/ai init` aus.

## Das Token-Modell

Tokens sind CSS-Custom-Properties mit dem Namen `--instui-<group>-<name>`, zum Beispiel
`--instui-color-background-brand` oder `--instui-spacing-space-md`. Drei Themes werden ausgeliefert: `rebrand`
(das Standard-Theme, mit `light-dark()` dort, wo Hell und Dunkel abweichen), `canvas` und `canvasHighContrast`.
Icons sind `<image>` Tokens (`--instui-icon-<name>`), abgeleitet von Lucide plus Instructures eigenen
Glyphen.

## Eine Web-App stylen

Installiere das Stylesheet und importiere es einmal. Es definiert jede `--instui-*` Eigenschaft, sodass du
sie direkt in deinem eigenen CSS referenzieren kannst.

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

## Icons überall verwenden

Die Webkomponente funktioniert in jedem Framework, ohne Portierung.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS-Tokens

Icons sind CSS-Custom-Properties (`--instui-icon-<name>`). Lade das Stylesheet einmal und referenziere ein beliebiges
Icon als `mask-image` oder `background-image` — kein Import pro Icon nötig.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — einzelnes Icon vs. kompletter Satz

`@pantoken/icons` stellt zwei benannte Exporte bereit. Verwende `iconsByName`, um ein Icon zu ziehen, ohne
das gesamte Array zu durchlaufen:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Verwende `icons`, wenn du den gesamten Satz benötigst (z. B. um einen Picker zu bauen):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Beide Exporte laden die vollständige IR bei der Modulinitialisierung — auf dieser Ebene gibt es kein Tree-Shaking pro Icon. Für schlanke, rein CSS-basierte Ladenutzung verwende den [CDN-Picker](/guide/cdn-picker), um eine kombinierte URL
nur für die Icons zu generieren, die du brauchst.

## Für eine native Plattform generieren

Die CLI schreibt die Token-Quelle in ein Ziel-Repo. Keine weitere Installation außer dem Runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Siehe [die pantoken CLI](/guide/cli) für alle Ziele.

## VS Code Authoring-Hinweise

`@pantoken/pantoken` liefert jetzt VS Code custom-data Dateien mit, damit Downstream-Projekte Klassen- und
Token-Vervollständigung in HTML/CSS erhalten, ohne eine pantoken-spezifische Erweiterung zu installieren.

1. Installiere das einheitliche Paket:

```sh
npm i @pantoken/pantoken
```

1. Weisen VS Code in deinem Consumer-Workspace auf die mitgelieferte custom-data JSON-Datei:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Lade VS Code neu (oder führe "Developer: Reload Window" aus), um die neuen Daten anzuwenden.

Dies ermöglicht Vorschläge für `instui-*` Klassentokens (und `-modifier` Klassentokens) sowie
`--instui-*` Custom-Properties.

## Wohin als Nächstes

- [Die Paketkarte](/guide/packages) — welches Paket für welche Aufgabe.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — Agenten-Assets und Regeln in einem Consumer-Repo installieren.
- [Architektur](/guide/architecture) — wie Modell, Core und Outputs zusammenpassen.
- [API-Referenz](/api/) — jedes exportierte Symbol, generiert aus dem Quellcode.
