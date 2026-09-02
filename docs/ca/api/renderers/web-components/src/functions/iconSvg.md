[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / iconSvg

# Funció: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Resoldre un nom d'icona a SVG en línia (cadena buida quan és desconeguda). Pure — l'element la renderitza.

## Paràmetres

### name

`string`

El nom de la icona (p. ex. `arrow-left`).

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md) = `pantokenResolve`

El resolutor (per defecte del conjunt d'icones pantoken integrat).

## Retorna

`string`

## Exemple

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```
