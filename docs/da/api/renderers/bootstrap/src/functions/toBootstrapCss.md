[pantoken](../../../../index.md) / [renderers/bootstrap/src](../index.md) / toBootstrapCss

# Funktion: toBootstrapCss()

> **toBootstrapCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udsend Bootstrap → Instructure CSS-variabel bro.

## Parametre

### options?

[`ToBootstrapCssOptions`](../interfaces/ToBootstrapCssOptions.md) = `{}`

[ToBootstrapCssOptions](../interfaces/ToBootstrapCssOptions.md).

## Returnerer

`string`

CSS-strengen til broering.

## Eksempler

**Standard :root bro**

```ts
import { toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss();
// ":root { --bs-primary: var(--instui-color-background-brand); … }"
```

**Omfang til Bootstraps tema-attribut**

```ts
import { toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss({ selector: "[data-bs-theme]" });
```
