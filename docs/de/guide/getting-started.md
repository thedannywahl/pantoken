# Erste Schritte

Pantoken nimmt die Design-Tokens und Icons von [Instructure UI](https://instructure.design), löst sie einmal auf und formt dieses eine
Modell in Pakete für viele Plattformen um: einfache Stylesheets, SCSS und Less, React und Vue und Svelte,
Tailwind und Panda, native Swift und Kotlin, WordPress und Drupal, Figma und mehr.

Installiere das kleinste Paket, das zu deiner Aufgabe passt. Alles wird außerdem vom einheitlichen
`pantoken` Paket re-exportiert, sodass du dort anfangen und später eingrenzen kannst.

## Ein Starter-Projekt scaffolden

Der schnellste Weg, pantoken auszuprobieren: ein Starter-Projekt scaffolden, das pantoken bereits installiert und eingebunden hat.

```sh
npx create-pantoken-app
```

Plattformen: `components` (reines HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Siehe
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) für `--dir <path>` und
programmatische Nutzung.

Einen KI-Coding-Agenten verwenden? Keine Installation nötig — weise ihn direkt auf das Skill:

```prompt
Hole create.pantoken.app/SKILL.md und folge den Anweisungen, um pantoken in diesem Projekt einzurichten.
```

Wenn du pantokens Agent-Regeln dauerhaft ins Repo einbinden möchtest (AGENTS.md, Editor-Regeln, eine lokale Kopie dieses Skills), führe stattdessen `npx @pantoken/ai init` aus.

## Das Token-Modell

Tokens sind CSS-Custom-Properties mit Namen `--instui-<group>-<name>`, zum Beispiel
`--instui-color-background-brand` oder `--instui-spacing-space-md`. Drei Themes werden ausgeliefert: `rebrand`
(das Standard-Theme, mit `light-dark()` dort, wo Hell und Dunkel abweichen), `canvas`, und `canvasHighContrast`.
Icons sind `<image>`-Tokens (`--instui-icon-<name>`), abgeleitet von Lucide plus Instructures eigenen
Glyphen.

## Eine Web-App stylen

Installiere das Stylesheet und importiere es einmal. Es definiert jede `--instui-*`-Property, sodass du
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

Die Web-Komponente funktioniert in jedem Framework, ohne Portierung.

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

Icons sind CSS-Custom-Properties (`--instui-icon-<name>`). Lade das Stylesheet einmal und referenziere jedes
Icon als `mask-image` oder `background-image` — kein per-Icon Import erforderlich.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — Einzelnes Icon vs. kompletter Satz

`@pantoken/icons` bietet zwei benannte Exporte. Verwende `iconsByName`, um ein Icon zu laden, ohne das
gesamte Array zu durchlaufen:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Verwende `icons`, wenn du das komplette Set brauchst (z. B. um einen Picker zu bauen):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Beide Exporte laden die komplette IR bei der Modulinitialisierung — auf dieser Ebene gibt es kein Tree-Shaking pro Icon. Für schlanke, nur-CSS-Ladung nutze den [CDN-Picker](/guide/cdn-picker), um eine kombinierte URL nur für die Icons zu erzeugen, die du brauchst.

## Für eine native Plattform generieren

Die CLI schreibt die Token-Quelle in ein Ziel-Repo. Keine Installation außer dem Runner nötig:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Siehe [die pantoken CLI](/guide/cli) für alle Ziele.

## VS Code Authoring-Hinweise

`@pantoken/pantoken` liefert jetzt VS Code custom-data Dateien, sodass Downstream-Projekte Klassen- und
Token-Vervollständigung in HTML/CSS erhalten können, ohne eine pantoken-spezifische Extension zu installieren.

1. Installiere das einheitliche Paket:

```sh
npm i @pantoken/pantoken
```

1. Verweise VS Code aus deinem Consumer-Workspace auf die mitgelieferte custom-data JSON:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Starte VS Code neu (oder führe "Developer: Reload Window" aus), um die neuen Daten zu übernehmen.

Dies ermöglicht Vorschläge für `instui-*` Klassentokens (und `-modifier` Klassentokens) sowie
`--instui-*` Custom Properties.

## Wohin als Nächstes

- [Die Paket-Übersicht](/guide/packages) — welches Paket für welche Aufgabe.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — Agent-Assets und Regeln in einem Consumer-Repo installieren.
- [Architektur](/guide/architecture) — wie das Token-Modell, Core und Outputs zusammenpassen.
- [API-Referenz](/api/) — jedes exportierte Symbol, aus dem Quellcode generiert.
