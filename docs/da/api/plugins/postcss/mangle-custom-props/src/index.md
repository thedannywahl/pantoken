[pantoken](../../../../index.md) / mangle-custom-props

# mangle-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-mangle-custom-props` — omdøb lange custom property navne til minimale sekventielle
identifikatorer.

Token-navne som `--instui-component-alert-border-top-style` er menneskeligt læsbare men dyre i
minimerede bundles: selve navnet er 40+ bytes, gentaget i definitionen, hver `var()` kald,
og hver `@property` registrering. Dette plugin erstatter ethvert matchende navn — gennem definitioner,
`var()` referencer, og `@property` params — med en minimal identifikator (`--a`, `--b`, …, `--aa`,
…), reducerer navneomkostninger med ~90%.

Navne indsamles fra det fulde stylesheet, sorteret alfabetisk for en deterministisk kortlægning, derefter tildelt sekventielt. En [MangleCustomPropsOptions.sharedManifest](interfaces/MangleCustomPropsOptions.md#sharedmanifest) mulighed lader flere separate PostCSS-passes dele en konsistent kortlægning, så separat behandlede CSS-filer, der indlæses sammen, kan sikkert manglificeres med de samme navne.

## Eksempel

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

## Interfaces

- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)

## Typealiaser

- [MangleMethod](type-aliases/MangleMethod.md)

## Variabler

- [mangleCustomProps](variables/mangleCustomProps.md)
