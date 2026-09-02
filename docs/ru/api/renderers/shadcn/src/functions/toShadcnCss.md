[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Функция: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Параметры

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Возвращаемое значение

`string`

The bridging CSS string.

## Пример

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
