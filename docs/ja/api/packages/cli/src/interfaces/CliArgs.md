[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / CliArgs

# インターフェース: CliArgs

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The parsed CLI invocation.

## プロパティ

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

***

### target

> **target**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

***

### out

> **out**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

***

### theme

> **theme**: [`Theme`](../../../core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

***

### className

> **className**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Icon names to emit as native assets (from `--icons a,b,c`).

***

### format?

> `optional` **format?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Output format, for targets that support several (e.g. `swatches --format ase`).

***

### noScope?

> `optional` **noScope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Pendo: skip `@scope` wrapping (`--no-scope`).

***

### noImportant?

> `optional` **noImportant?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Pendo: skip `!important` (`--no-important`).

***

### noPrune?

> `optional` **noPrune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Pendo: skip token pruning (`--no-prune`).
