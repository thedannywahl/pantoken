# Començant

pantoken agafa els design tokens i les icones d'Instructure UI, els resol una sola vegada i reconfigura aquell model
en paquets per a moltes plataformes: fulls d'estil plans, SCSS i Less, React i Vue i Svelte,
Tailwind i Panda, natiu Swift i Kotlin, WordPress i Drupal, Figma, i més.

Instal·la el paquet més petit que s'adapti a la teva tasca. Tot també s'exporta novament pel paquet unificat
`pantoken`, així que pots començar-hi i concretar després.

## Crear un projecte inicial

La manera més ràpida de provar pantoken: crear un projecte inicial amb ell ja instal·lat i configurat.

```sh
npx create-pantoken-app react
```

Plataformes: `components` (HTML/CSS pla), `react`, `vue`, `svelte`, `web-components`, `angular`. Veure
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) per a `--dir <path>` i
ús programàtic.

S'està utilitzant un agent d'IA per codificar? Cap instal·lació necessària — apunta'l directament a la skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Funciona de la mateixa manera per a Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI i Amazon Q
Developer CLI — canvia `claude` per `gemini`, `agent`, `codex`, `copilot -p`, o `q chat`. Si prefereixes
integrar les regles d'agent de pantoken al repositori de manera permanent (AGENTS.md, regles d'editor, una còpia local
aquesta skill), executa `npx @pantoken/ai init` en canvi.

## El model de tokens

Els tokens són propietats personalitzades CSS anomenades `--instui-<group>-<name>`, per exemple
`--instui-color-background-brand` o `--instui-spacing-space-md`. S'envien tres temes: `rebrand`
(el per defecte, amb `light-dark()` on la llum i la foscor difereixen), `canvas`, i `canvasHighContrast`.
Les icones són tokens `<image>` (`--instui-icon-<name>`) derivats de Lucide més els glifs personalitzats d'Instructure.

## Estilitzar una aplicació web

Instal·la la fulla d'estils i importa-la una sola vegada. Defineix cada propietat `--instui-*`, així que les pots referenciar
directament des del teu propi CSS.

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

## Usar icones en qualsevol lloc

El web component funciona en qualsevol framework, sense necessitat de portar-lo.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokens CSS

Les icones són propietats personalitzades CSS (`--instui-icon-<name>`). Carrega la fulla d'estils una vegada i referencia qualsevol
icona com a `mask-image` o `background-image` — no cal importar cada icona per separat.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — icona única vs. conjunt complet

`@pantoken/icons` exposa dues exportacions nomenades. Utilitza `iconsByName` per obtenir una icona sense iterar
tota la matriu:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Utilitza `icons` quan necessitis el conjunt sencer (p. ex., per construir un selector):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Ambdues exportacions carreguen l'IR complet a la inicialització del mòdul — no hi ha tree-shaking per icona
a aquest nivell. Per a una càrrega lleugera només amb CSS, utilitza el [CDN picker](/guide/cdn-picker) per generar una URL combinada
només per a les icones que necessites.

## Generar per a una plataforma nativa

El CLI escriu la font de tokens dins d'un repositori objectiu. Cap instal·lació més enllà del runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Veure [el pantoken CLI](/guide/cli) per a tots els destinataris.

## Consells d'edició a VS Code

`@pantoken/pantoken` ara inclou fitxers custom-data per a VS Code perquè els projectes consumidors puguin obtenir completat de classes i
tokens en HTML/CSS sense instal·lar una extensió específica de pantoken.

1. Instal·la el paquet unificat:

```sh
npm i @pantoken/pantoken
```

1. Apunta VS Code al JSON custom-data inclòs des de l'espai de treball del teu consumidor:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Torna a carregar VS Code (o executa "Developer: Reload Window") per aplicar les noves dades.

Això habilita suggeriments per a tokens de classe `instui-*` (i tokens de classe `-modifier`) a més de
propietats personalitzades `--instui-*`.

## On anar després

- [El mapa de paquets](/guide/packages) — quin paquet triar segons la tasca.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — instal·lar actius i regles d'agent en un repositori consumidor.
- [Arquitectura](/guide/architecture) — com encaixa el model de tokens, el nucli i les sortides.
- [Referència de l'API](/api/) — cada símbol exportat, generat des de la font.
