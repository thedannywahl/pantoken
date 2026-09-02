[pantoken](../../../../index.md) / [renderers/bootstrap/src](../index.md) / toBootstrapCss

# Συνάρτηση: toBootstrapCss()

> **toBootstrapCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Emit the Bootstrap → Instructure CSS-variable bridge.

## Παράμετροι

### options?

[`ToBootstrapCssOptions`](../interfaces/ToBootstrapCssOptions.md) = `{}`

[ToBootstrapCssOptions](../interfaces/ToBootstrapCssOptions.md).

## Επιστρέφει

`string`

The bridging CSS string.

## Παραδείγματα

**Default :root bridge**

```ts
import { toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss();
// ":root { --bs-primary: var(--instui-color-background-brand); … }"
```

**Scope to Bootstrap's theme attribute**

```ts
import { toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss({ selector: "[data-bs-theme]" });
```
