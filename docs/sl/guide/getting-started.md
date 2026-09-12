# Začetek

Pantoken vzame oblikovne tokene in ikone iz [Instructure UI](https://instructure.design), jih enkrat razreši in ta en model preoblikuje v pakete za mnoge platforme: navadne slogovne liste, SCSS in Less, React in Vue in Svelte, Tailwind in Panda, nativni Swift in Kotlin, WordPress in Drupal, Figma in drugo.

Namesti se najmanjši paket, ki ustreza tvoji nalogi. Vse je tudi ponovno izvoženo v združenem paketu `pantoken`, zato lahko začneš tam in kasneje zožiš izbor.

## Ustvari začetni projekt

Najhitrejši način za preizkus pantoken je ustvariti začetni projekt z že nameščenim in povezanem pantoken.

```sh
npx create-pantoken-app
```

Platforme: `components` (navaden HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. Oglej si [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) za `--dir <path>` in programsko rabo.

Uporabljaš AI kodirnega agenta? Namestitev ni potrebna — usmeri ga neposredno na skill:

```prompt
Pridobite create.pantoken.app/SKILL.md in sledite navodilom za nastavitev pantoken v tem projektu.
```

Če raje trajno vključiš pravila pantokenovega agenta v repozitorij (AGENTS.md, uredniška pravila, lokalna kopija tega skilla), zaženi `npx @pantoken/ai init` namesto tega.

## Model tokenov

Tokeni so CSS lastnosti po meri imenovane `--instui-<group>-<name>`, na primer `--instui-color-background-brand` ali `--instui-spacing-space-md`. Vključeni so trije tematski nabori: `rebrand` (privzeti, z `light-dark()` tam, kjer se svetla in temna tema razlikujeta), `canvas` in `canvasHighContrast`. Ikone so `<image>` tokeni (`--instui-icon-<name>`), izpeljani iz Lucide in Instructureovih prilagojenih glifov.

## Oblikuj spletno aplikacijo

Namesti slogovni list in ga enkrat uvozi. Določi vsako `--instui-*` lastnost, zato jih lahko citiraš neposredno iz lastnega CSS.

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

Spletni komponent deluje v kateremkoli ogrodju, brez prenašanja.

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

Ikone so CSS lastnosti po meri (`--instui-icon-<name>`). Naloži slogovni list enkrat in katero koli ikono sklicuj kot `mask-image` ali `background-image` — uvoz posamezne ikone ni potreben.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ena ikona proti celotnemu naboru

`@pantoken/icons` izpostavi dva imenovana izvoza. Uporabi `iconsByName` za pridobitev ene ikone brez iteracije celotnega seznama:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Uporabi `icons` kadar potrebuješ celoten nabor (npr. za izgradnjo izbirnika):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Oba izvoza naložita celoten IR ob inicializaciji modula — na tej ravni ni selektivnega tree-shakinga po posameznih ikonah. Za vitko nalaganje samo z CSS uporabi [CDN picker](/guide/cdn-picker) za generiranje združene URL povezave samo za ikone, ki jih potrebuješ.

## Generiraj za nativno platformo

CLI zapiše izvor tokenov v ciljni repozitorij. Namestitev ni potrebna razen zaganjalnika:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Poglej [pantoken CLI](/guide/cli) za vsak cilj.

## Namigi za pisanje v VS Code

`@pantoken/pantoken` sedaj vključuje VS Code custom-data datoteke, tako da lahko downstream projekti dobijo dokončanje razredov in tokenov v HTML/CSS brez nameščanja pantoken-specifične razširitve.

1. Namesti združeni paket:

```sh
npm i @pantoken/pantoken
```

1. V VS Code usmeri na priloženo custom-data JSON iz svojega potrošniškega delovnega prostora:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Znova naloži VS Code (ali zaženi "Developer: Reload Window"), da se nova podatka uveljavita.

To omogoči predloge za `instui-*` razredne tokene (in `-modifier` razredne tokene) ter `--instui-*` lastnosti po meri.

## Kam naprej

- [Zemljevid paketov](/api/) — kateri paket uporabiti glede na nalogo.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — namesti agentne vire in pravila v potrošniški repozitorij.
- [Arhitektura](/guide/architecture) — kako se model tokenov, jedro in izhodi povezujejo.
- [API referenca](/api/) — vsak izvožen simbol, generiran iz izvorne kode.
