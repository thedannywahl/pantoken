[pantoken](../../../../index.md) / [packages/model/src](../index.md) / DeprecationEntry

# Interface: DeprecationEntry

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En post i deprecation-ledgeren for tokens — livscyklus for et enkelt droppet upstream-token.

En shim-værdi kommer fra ENTEN `replacement` (udsender `var(replacement)`, så tematisering flyder gennem) ELLER
`value` (frys den sidste kendte literal, når faldet har ingen kanonisk erstatning). Præcis én
forventes; en post uden nogen af dem udsender ingen shim.

## Egenskaber

### token

> **token**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Det droppede upstream-token-navn, f.eks. `--instui-component-truncate-text-line-height`.

***

### deprecatedIn

> **deprecatedIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Den upstream-udgivelse, der droppede det, `&lt;tier&gt;@&lt;version&gt;` (f.eks. `"design-tokens@v1.5.0"`).

***

### removeIn

> **removeIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Den upstream MINOR, hvor shimmen pensioneres, `&lt;tier&gt;@&lt;version&gt;` (f.eks. `"design-tokens@v1.6.0"`).

***

### replacement?

> `optional` **replacement?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Videresend shimmen til et kanonisk token (udsender `var(replacement)`).

***

### value?

> `optional` **value?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Frys shimmen til en literal (tokenets sidste kendte værdi), når der er ingen erstatning.

***

### note?

> `optional` **note?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En menneskeligt skrevet note, der vises i kompatibilitetsdokumenterne og ændringsloggen.
