[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / CliArgs

# 인터페이스: CliArgs

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The parsed CLI invocation.

## 속성

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

***

### target

> **target**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

***

### out

> **out**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

***

### theme

> **theme**: [`Theme`](../../../core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

***

### className

> **className**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Icon names to emit as native assets (from `--icons a,b,c`).

***

### format?

> `optional` **format?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Output format, for targets that support several (e.g. `swatches --format ase`).

***

### noScope?

> `optional` **noScope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Pendo: skip `@scope` wrapping (`--no-scope`).

***

### noImportant?

> `optional` **noImportant?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Pendo: skip `!important` (`--no-important`).

***

### noPrune?

> `optional` **noPrune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Pendo: skip token pruning (`--no-prune`).
