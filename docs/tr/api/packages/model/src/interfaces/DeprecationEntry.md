[pantoken](../../../../index.md) / [packages/model/src](../index.md) / DeprecationEntry

# Arayüz: DeprecationEntry

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

One entry in the token deprecation ledger — the lifecycle of a single dropped upstream token.

A shim value comes from EITHER `replacement` (emit `var(replacement)`, so theming flows through) OR
`value` (freeze the last-known literal, when the drop has no canonical replacement). Exactly one is
expected; an entry with neither emits no shim.

## Özellikler

### token

> **token**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The dropped upstream token name, e.g. `--instui-component-truncate-text-line-height`.

***

### deprecatedIn

> **deprecatedIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The upstream release that dropped it, `&lt;tier&gt;@&lt;version&gt;` (e.g. `"design-tokens@v1.5.0"`).

***

### removeIn

> **removeIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The upstream MINOR at which the shim is retired, `&lt;tier&gt;@&lt;version&gt;` (e.g. `"design-tokens@v1.6.0"`).

***

### replacement?

> `optional` **replacement?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Forward the shim to a canonical token (emits `var(replacement)`).

***

### value?

> `optional` **value?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Freeze the shim to a literal (the token's last-known value) when there's no replacement.

***

### note?

> `optional` **note?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A human note rendered in the compatibility docs and the changelog.
