# Començament

Pantoken agafa els tokens de disseny i els icones d'[Instructure UI](https://instructure.design), els resol una vegada i remodela aquest únic
model en paquets per a moltes plataformes: fulls d'estils plans, SCSS i Less, React i Vue i Svelte,
Tailwind i Panda, natiu Swift i Kotlin, WordPress i Drupal, Figma, i més.

S'instal·la el paquet més petit que s'adapti a la teva tasca. Tot també es reexporta pel paquet unificat
`pantoken`, així que pots començar allà i acotar més tard.

## Crear un projecte inicial

La manera més ràpida de provar pantoken: crear un projecte inicial amb ell ja instal·lat i integrat.

```sh
npx create-pantoken-app
```

Plataformes: `components` (HTML/CSS pla), `react`, `vue`, `svelte`, `web-components`, `angular`. Veure
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) per a `--dir <path>` i
ús programàtic.

S'utilitza un agent d'IA per codificar? Cap instal·lació necessària — dirigeix-lo directament a la skill:

```prompt
Recupera create.pantoken.app/SKILL.md i segueix-lo per configurar pantoken en aquest projecte.
```

Si prefereixes integrar permanentment les regles de l'agent de pantoken al repositori (AGENTS.md, regles de l'editor, una còpia local d'aquesta skill), executa `npx @pantoken/ai init` en comptes.

## El model de tokens

Els tokens són propietats personalitzades CSS anomenades `--instui-<group>-<name>`, per exemple
`--instui-color-background-brand` o `--instui-spacing-space-md`. Es subministren tres temes: `rebrand`
(el predeterminat, amb `light-dark()` on difereixen clar i fosc), `canvas`, i `canvasHighContrast`.
Els icones són tokens `<image>` (`--instui-icon-<name>`) derivats de Lucide més els glifs personalitzats d'Instructure.

## Estilitzar una aplicació web

Instal·la el full d'estils i importa'l una vegada. Defineix cada propietat `--instui-*`, així que les pots referenciar
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

## Fer servir icones a qualsevol lloc

El component web funciona en qualsevol framework, sense necessitat de portar-lo.

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

Els icones són propietats personalitzades CSS (`--instui-icon-<name>`). Carrega el full d'estils una vegada i refereix qualsevol
icona com un `mask-image` o `background-image` — no cal importar cada icona per separat.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — icona individual vs. conjunt complet

`@pantoken/icons` exposa dues exportacions nominals. Usa `iconsByName` per importar una icona sense iterar
l'array complet:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Usa `icons` quan necessitis el conjunt complet (p. ex., per construir un selector):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Ambdues exportacions carreguen la IR completa a la inicialització del mòdul — no hi ha tree-shaking per icona a
aquest nivell. Per a una càrrega lleugera només amb CSS, fes servir el [CDN picker](/guide/cdn-picker) per generar una URL combinada
només per les icones que necessitis.

## Generar per una plataforma nativa

La CLI escriu la font de tokens en un repositori de destinació. Cap instal·lació més enllà del runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Veure [la CLI de pantoken](/guide/cli) per a cada destinació.

## Consells d'autor a VS Code

`@pantoken/pantoken` ara distribueix fitxers custom-data per VS Code perquè els projectes consumidors puguin obtenir completat de classes i
tokens en HTML/CSS sense instal·lar una extensió específica de pantoken.

1. Instala el paquet unificat:

```sh
npm i @pantoken/pantoken
```

1. Assenyala VS Code al JSON custom-data distribuït des de l'entorn de treball consumidor:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Torna a carregar VS Code (o executa "Developer: Reload Window") per aplicar les noves dades.

Això habilita suggeriments per a tokens de classe `instui-*` (i tokens de classe `-modifier`) a més de
les propietats personalitzades `--instui-*`.

## On anar després

- [El mapa de paquets](/api/) — quin paquet triar segons la tasca.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — instal·lar actius i regles de l'agent en un repositori consumidor.
- [Arquitectura](/guide/architecture) — com encaixen el model de tokens, el nucli i les sortides.
- [Referència de l'API](/api/) — cada símbol exportat, generat des de la font.
