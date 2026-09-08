# Začetek

Pantoken vzame oblikovne tokene in ikone iz [Instructure UI](https://instructure.design), jih enkrat razreši in preoblikuje ta en model v pakete za mnoge platforme: navadne slogovne datoteke, SCSS in Less, React in Vue in Svelte, Tailwind in Panda, nativen Swift in Kotlin, WordPress in Drupal, Figma in še več.

Namesti se najmanjši paket, ki ustreza tvoji nalogi. Vse je tudi ponovno izvezeno v enotnem `pantoken` paketu, tako da lahko začneš tam in kasneje zožiš izbiro.

## Postavitev začetnega projekta

Najhitrejši način, da preizkusiš pantoken: ustvariti začetni projekt z že nameščenim in povezanih pantokenom.

```sh
npx create-pantoken-app
```

Platforme: `components` (navaden HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Oglej si
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) za `--dir <path>` in
programsko uporabo.

Uporabljaš AI koderja? Namestitev ni potrebna — usmeri ga neposredno na skill:

```prompt
Pridobi create.pantoken.app/SKILL.md in sledite navodilom v njem, da nastavite pantoken v tem projektu.
```

Če raje trajno povežeš pantokenova pravila agenta v repozitorij (AGENTS.md, pravila urejevalnika, lokalna kopija tega skilla), zaženi `npx @pantoken/ai init` namesto tega.

## Model tokenov

Tokeni so CSS lastnosti po meri imenovane `--instui-<group>-<name>`, na primer
`--instui-color-background-brand` ali `--instui-spacing-space-md`. Teme so tri: `rebrand`
(privzeta, z `light-dark()` kjer se svetla in temna razlikujeta), `canvas` in `canvasHighContrast`.
Ikone so `<image>` tokeni (`--instui-icon-<name>`) izpeljani iz Lucide plus Instructure-ovih lastnih glifov.

## Stiliziranje spletne aplikacije

Namesti slogovno datoteko in jo uvozi enkrat. Določi vsako `--instui-*` lastnost, zato jih uporabljaš neposredno iz svojega CSS.

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

Web komponenta deluje v kateremkoli ogrodju, brez portanja.

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

Ikone so CSS lastnosti po meri (`--instui-icon-<name>`). Naloži slogovno datoteko enkrat in referenciraj katerokoli
ikono kot `mask-image` ali `background-image` — ni potrebe po uvozu posamezne ikone.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — posamezna ikona proti celotnemu naboru

`@pantoken/icons` izpostavlja dva imenovana izvoza. Uporabi `iconsByName` za pridobitev ene ikone brez iteracije
celega polja:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Uporabi `icons` kadar potrebuješ celoten nabor (npr. za gradnjo izbirnika):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Oba izvoza naložita celoten IR ob inicializaciji modula — na tej ravni ni treeshakinga po posamezni ikoni. Za varčno nalaganje samo z CSS uporabite [CDN picker](/guide/cdn-picker) za generiranje kombinirane URL povezave
samo za ikone, ki jih potrebuješ.

## Generiranje za nativen platform

CLI zapiše izvor tokenov v ciljni repozitorij. Namestitev ni potrebna razen zaganjalnika:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Oglej si [pantoken CLI](/guide/cli) za vsak cilj.

## Namigi za urejanje v VS Code

`@pantoken/pantoken` sedaj pošilja VS Code custom-data datoteke, tako da potrošniški projekti lahko dobijo dokončanje razredov in
tokenov v HTML/CSS brez nameščanja pantoken-specifične razširitve.

1. Namesti enotni paket:

```sh
npm i @pantoken/pantoken
```

1. Usmeri VS Code na priloženi custom-data JSON iz svojega potrošniškega delovnega prostora:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Znova naloži VS Code (ali zaženi "Developer: Reload Window") za uporabo novih podatkov.

To omogoča predloge za `instui-*` razredne tokene (in `-modifier` razredne tokene) ter
`--instui-*` lastnosti po meri.

## Kam naprej

- [Zemljevid paketov](/guide/packages) — kateri paket uporabiti glede na nalogo.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — namesti agentne vire in pravila v potrošniški repozitorij.
- [Arhitektura](/guide/architecture) — kako model tokenov, jedro in izhodi povezujejo skupaj.
- [API referenca](/api/) — vsak izvožen simbol, generiran iz izvorne kode.
