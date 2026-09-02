# Začetek

pantoken vzame Instructure UI-jeve design tokene in ikonografijo, jih enkrat razreši in ta model preoblikuje v pakete za številne platforme: navadne stylesheet-e, SCSS in Less, React in Vue in Svelte, Tailwind in Panda, nativen Swift in Kotlin, WordPress in Drupal, Figma in več.

Namesti se najmanjši paket, ki ustreza tvojemu opravilu. Vse je tudi ponovno izvoženo prek enotnega `pantoken` paketa, zato lahko začneš tam in potem zožiš izbiro.

## Postavitev začetnega projekta

Najhitrejši način, da preizkusiš pantoken: zaženi scaffold začetnega projekta z že nameščenim in povezanem pantoken-om.

```sh
npx create-pantoken-app react
```

Platforme: `components` (navaden HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Oglej si
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) za `--dir <path>` in
programsko uporabo.

Uporabljaš AI programskega agenta? Namestitev ni potrebna — usmeri ga neposredno na skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Deluje enako za Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI in Amazon Q
Developer CLI — zamenjaj `claude` z `gemini`, `agent`, `codex`, `copilot -p` ali `q chat`. Če raje trajno povežeš pravila agentov pantoken v repozitorij (AGENTS.md, pravila urejevalnika, lokalna kopija tega skilla), zaženi `npx @pantoken/ai init` namesto tega.

## Model tokenov

Tokeni so CSS custom properties z imenom `--instui-<group>-<name>`, na primer
`--instui-color-background-brand` ali `--instui-spacing-space-md`. Tri teme so vključene: `rebrand`
(privzeta, z `light-dark()` kjer se svetla in temna ločita), `canvas` in `canvasHighContrast`.
Ikone so `<image>` tokeni (`--instui-icon-<name>`) izpeljani iz Lucide plus Instructure-jevih lastnih
glyph-ov.

## Stiliziranje spletne aplikacije

Namesti stylesheet in ga uvozi enkrat. Določa vsako `--instui-*` lastnost, zato jih lahko navajaš neposredno v svojem CSS-u.

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

## Uporaba ikon kjerkoli

Web komponenta deluje v kateremkoli frameworku, brez potrebe po prenosu.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS tokeni

Ikone so CSS custom properties (`--instui-icon-<name>`). Naloži stylesheet enkrat in katerokoli
ikono navajaj kot `mask-image` ali `background-image` — ni potrebe po uvozu posamezne ikone.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — posamezna ikona proti celotnemu naboru

`@pantoken/icons` izpostavi dva poimenovana izvoza. Uporabi `iconsByName` za pridobitev ene ikone brez iteriranja
po celotnem nizu:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Uporabi `icons` ko potrebuješ celotni nabor (npr. za izgradnjo pickerja):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Oba izvoza naložita celoten IR ob inicializaciji modula — na tej ravni ni tree-shaking-a po posamezni ikoni. Za varčno nalaganje samo z CSS-om uporabi [CDN picker](/guide/cdn-picker) za generiranje kombinirane URL povezave
samo za ikone, ki jih potrebuješ.

## Generiranje za nativen platform

CLI zapiše izvor tokenov v ciljni repozitorij. Ni potrebna namestitev razen runnerja:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Poglej [pantoken CLI](/guide/cli) za vsak cilj.

## Namigi za avtorje v VS Code

`@pantoken/pantoken` zdaj vključuje VS Code custom-data datoteke, tako da downstream projekti lahko dobijo dopolnjevanje razredov in tokenov v HTML/CSS brez nameščanja pantoken-specifičnega razširitve.

1. Namesti enotni paket:

```sh
npm i @pantoken/pantoken
```

1. Usmeri VS Code na priloženo custom-data JSON iz tvojega potrošniškega delovnega prostora:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Ponovno naloži VS Code (ali zaženi "Developer: Reload Window"), da uveljaviš nove podatke.

To omogoča predloge za `instui-*` class tokene (in `-modifier` class tokene) plus
`--instui-*` custom properties.

## Kam naprej

- [Zemljevid paketov](/guide/packages) — kateri paket izbrati glede na opravilo.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — namesti agentne assete in pravila v potrošniški repozitorij.
- [Arhitektura](/guide/architecture) — kako se model tokenov, core in izhodi povežejo.
- [API referenca](/api/) — vsak izvažani simbol, generiran iz izvorne kode.
