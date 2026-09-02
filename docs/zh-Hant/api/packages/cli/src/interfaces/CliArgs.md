[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / CliArgs

# 介面: CliArgs

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The parsed CLI invocation.

## 屬性

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

***

### target

> **target**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

***

### out

> **out**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

***

### theme

> **theme**: [`Theme`](../../../core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

***

### className

> **className**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Icon names to emit as native assets (from `--icons a,b,c`).

***

### format?

> `optional` **format?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Output format, for targets that support several (e.g. `swatches --format ase`).

***

### noScope?

> `optional` **noScope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Pendo: skip `@scope` wrapping (`--no-scope`).

***

### noImportant?

> `optional` **noImportant?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Pendo: skip `!important` (`--no-important`).

***

### noPrune?

> `optional` **noPrune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Pendo: skip token pruning (`--no-prune`).
