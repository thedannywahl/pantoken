[pantoken](../../../../index.md) / [packages/cli/src](../index.md) / CliArgs

# Интерфейс: CliArgs

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The parsed CLI invocation.

## Свойства

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

***

### target

> **target**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

***

### out

> **out**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

***

### theme

> **theme**: [`Theme`](../../../core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

***

### className

> **className**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Icon names to emit as native assets (from `--icons a,b,c`).

***

### format?

> `optional` **format?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Output format, for targets that support several (e.g. `swatches --format ase`).

***

### noScope?

> `optional` **noScope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Pendo: skip `@scope` wrapping (`--no-scope`).

***

### noImportant?

> `optional` **noImportant?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Pendo: skip `!important` (`--no-important`).

***

### noPrune?

> `optional` **noPrune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Pendo: skip token pruning (`--no-prune`).
