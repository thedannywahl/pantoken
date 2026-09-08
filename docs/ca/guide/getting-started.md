# Començant

Pantoken agafa els tokens de disseny i icones d'[Instructure UI](https://instructure.design), els resol una vegada i remodela aquest únic
model en paquets per a moltes plataformes: fulls d'estil plans, SCSS i Less, React i Vue i Svelte,
Tailwind i Panda, natiu Swift i Kotlin, WordPress i Drupal, Figma i més.

Instal·les el paquet més petit que s'ajusti a la teva tasca. Tot també es reexporta pel paquet unificat
`pantoken`, així que pots començar allà i restringir-ho més endavant.

## Estructurar un projecte d'inici

La manera més ràpida de provar pantoken: estructurar un projecte d'inici amb ell ja instal·lat i integrat.

```sh
npx create-pantoken-app
```

Plataformes: `components` (HTML/CSS pla), `react`, `vue`, `svelte`, `web-components`, `angular`. Veure
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) per a `--dir <path>` i
ús programàtic.

S'utilitza un agent d'IA per programar? No cal instal·lació — apunta-li la skill directament:

```prompt
Recupera create.pantoken.app/SKILL.md i consulta'l per configurar pantoken en aquest projecte.
```

Si prefereixes integrar permanentment les regles de l'agent de pantoken al repositori (AGENTS.md, regles d'editor, una còpia local d'aquesta skill), executa `npx @pantoken/ai init` en el seu lloc.

## El model de tokens

Els tokens són propietats personalitzades CSS anomenades `--instui-<group>-<name>`, per exemple
`--instui-color-background-brand` o `--instui-spacing-space-md`. S'envien tres temes: `rebrand`
(el per defecte, amb `light-dark()` on contrasten clar i fosc), `canvas` i `canvasHighContrast`.
Les icones són tokens `<image>` (`--instui-icon-<name>`) derivats de Lucide més els glifs personalitzats d'Instructure.

## Estilitzar una aplicació web

Instal·la el full d'estil i importa'l una vegada. Defineix cada propietat `--instui-*`, així que les referencies
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

## Ús d'icones a qualsevol lloc

El web component funciona en qualsevol framework, sense necessitat d'adaptacions.

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

Les icones són propietats personalitzades CSS (`--instui-icon-<name>`). Carrega el full d'estil una vegada i refereix qualsevol
icona com a `mask-image` o `background-image` — no cal import per icona.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — icona individual vs. conjunt complet

`@pantoken/icons` exposa dos exports nomenats. Usa `iconsByName` per extreure una icona sense iterar
l'array complet:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Fes servir `icons` quan necessitis el conjunt sencer (p. ex., per construir un selector):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Ambdós exports carreguen l'IR complet a la inicialització del mòdul — no hi ha tree-shaking per icona en aquest
nivell. Per a una càrrega lleugera només amb CSS, utilitza el [CDN picker](/guide/cdn-picker) per generar una URL combinada
només amb les icones que necessitis.

## Generar per a una plataforma nativa

L'eina CLI escriu la font de tokens dins d'un repositori de destinació. No cal instal·lació més enllà del runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Veure [la CLI de pantoken](/guide/cli) per a cada objectiu.

## Pistes d'autor a VS Code

`@pantoken/pantoken` ara inclou arxius de dades personalitzades per a VS Code perquè els projectes downstream puguin obtenir completat de classes i
tokens en HTML/CSS sense instal·lar una extensió específica de pantoken.

1. Instal·la el paquet unificat:

```sh
npm i @pantoken/pantoken
```

1. Apunta VS Code al JSON de custom-data inclòs des de l'espai de treball del consumidor:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reinicia VS Code (o executa "Developer: Reload Window") per aplicar les noves dades.

Això habilita suggeriments per a tokens de classe `instui-*` (i tokens de classe `-modifier`) més
propietats personalitzades `--instui-*`.

## On anar després

- [El mapa de paquets](/guide/packages) — quin paquet triar segons la tasca.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — instal·la actius i regles d'agent en un repositori consumidor.
- [Arquitectura](/guide/architecture) — com encaixa el model de tokens, el core i les sortides.
- [Referència d'API](/api/) — cada símbol exportat, generat des de la font.
