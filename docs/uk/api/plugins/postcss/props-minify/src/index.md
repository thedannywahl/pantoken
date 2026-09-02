[pantoken](../../../../index.md) / props-minify

# props-minify

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

`@pantoken/plugin-props-minify` — compose prune, flatten, and mangle transforms for
`--instui-*` custom properties via a single [applyMinify](functions/applyMinify.md) utility.

Each CSS-emitting pipeline (generate scripts, renderers) uses `applyMinify` for a consistent
minification surface without taking a direct PostCSS dependency.

**Prune + mangle are only safe for self-contained bundles** where all `var(--instui-*)` references
and their definitions live in the same output. For separate-file consumers (`@pantoken/css` +
`@pantoken/components` loaded independently), apply `{ flatten: true }` only.

**Mangle across file boundaries:** pass the same `Map` instance as
`mangle.sharedManifest` to every `applyMinify` call that processes CSS files loaded together.
Process the token sheet first (it seeds the manifest), then component sheets.

## Приклади

**Apply all three transforms to a self-contained bundle**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```

**Flatten only (safe for separate-file consumers)**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { flatten: true });
```

**Mangle two files with the same mapping**

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const manifest = new Map<string, string>();
const tokenCss = applyMinify(rawTokens, { mangle: { sharedManifest: manifest } });
const componentCss = applyMinify(rawComponents, { mangle: { sharedManifest: manifest } });
```

## Інтерфейси

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)
- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)
- [PropsMinifyOptions](interfaces/PropsMinifyOptions.md)

## Псевдоніми типів

- [MangleMethod](type-aliases/MangleMethod.md)

## Змінні

- [flattenProperty](variables/flattenProperty.md)
- [mangleCustomProps](variables/mangleCustomProps.md)
- [pruneCustomProps](variables/pruneCustomProps.md)

## Функції

- [applyMinify](functions/applyMinify.md)
