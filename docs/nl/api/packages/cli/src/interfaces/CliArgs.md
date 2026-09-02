[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / CliArgs

# Interface: CliArgs

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

The parsed CLI invocation.

## Eigenschappen

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

***

### target

> **target**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

***

### out

> **out**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

***

### theme

> **theme**: [`Theme`](../../../core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

***

### className

> **className**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Icon names to emit as native assets (from `--icons a,b,c`).

***

### format?

> `optional` **format?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Output format, for targets that support several (e.g. `swatches --format ase`).

***

### noScope?

> `optional` **noScope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Pendo: skip `@scope` wrapping (`--no-scope`).

***

### noImportant?

> `optional` **noImportant?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Pendo: skip `!important` (`--no-important`).

***

### noPrune?

> `optional` **noPrune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Pendo: skip token pruning (`--no-prune`).
