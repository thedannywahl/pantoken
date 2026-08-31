[pantoken](../../../../index.md) / mangle-custom-props

# mangle-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-mangle-custom-props` — renomena noms de propietats personalitzades llargues a identificadors
seqüencials mínims.

Els noms de tokens com `--instui-component-alert-border-top-style` són llegibles pels humans però costosos en
paquets minificats: el nom en si és de 40+ bytes, repetit en la definició, cada crida `var()`,
i cada registre `@property`. Aquest connector reemplaça cada nom coincident — en definicions,
referències `var()` i paràmetres `@property` — amb un identificador mínim (`--a`, `--b`, …, `--aa`,
…), reduint la sobrecàrrega de noms en ~90%.

Els noms es recopilen de la full d'estils completa, ordenats alfabèticament per a un mapatge determinista,
i després s'assignen seqüencialment. Una opció [MangleCustomPropsOptions.sharedManifest](interfaces/MangleCustomPropsOptions.md#sharedmanifest) permet que múltiples
passes PostCSS separades comparteixin un mapatge consistent, de manera que els fitxers CSS processats per separat que s'hauran
de carregat junts es poden mangler de manera segura amb els mateixos noms.

## Example

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

## Interfaces

- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)

## Type Aliases

- [MangleMethod](type-aliases/MangleMethod.md)

## Variables

- [mangleCustomProps](variables/mangleCustomProps.md)
