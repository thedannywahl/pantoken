# Kezdeti lépések

A pantoken az Instructure UI dizájntokenjeit és ikonjait veszi, egyszer feloldja őket, majd ezt az egyetlen
modellt sokféle platformhoz alakítja át csomagokká: egyszerű stíluslapokká, SCSS-sé és Less-szé, Reacthez, Vue-hoz és Svelte-hez,
Tailwindhez és Pandához, natív Swifthez és Kotlinhoz, WordPresshez és Drupalhoz, Figmához és sok máshoz.

A feladathoz illő legkisebb csomagot telepítsd. Mindent újraexportál az egységes
`pantoken` csomag is, így itt is elkezdheted, és később szűkítheted.

## A tokenmodell

A tokenek `--instui-<group>-<name>` nevű CSS egyéni tulajdonságok, például
`--instui-color-background-brand` vagy `--instui-spacing-space-md`. Három téma érhető el: `rebrand`
(az alapértelmezett, `light-dark()` tokenekkel ott, ahol a világos és a sötét eltér), `canvas` és `canvasHighContrast`.
Az ikonok `<image>` tokenek (`--instui-icon-<name>`), amelyek a Lucide-ból és az Instructure egyedi
glifáiból származnak.

## Webalkalmazás stílusozása

Telepítsd a stíluslapot, és importáld egyszer. Minden `--instui-*` tulajdonságot definiál, így közvetlenül
hivatkozhatsz rájuk a saját CSS-edből.

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

## Ikonok használata bárhol

A webkomponens bármelyik keretrendszerben működik, portolás nélkül.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

## Generálás natív platformra

A CLI a tokenforrást egy célrepóba írja. A futtatón kívül nincs szükség telepítésre:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Az összes célhoz lásd [a pantoken CLI-t](/guide/cli).

## Hogyan tovább

- [A csomagtérkép](/guide/packages) – melyik csomagot érdemes választani feladat szerint.
- [Architektúra](/guide/architecture) – hogyan illeszkedik össze a tokenmodell, a mag és a kimenetek.
- [API-hivatkozás](/api/) – minden exportált szimbólum, a forrásból generálva.
