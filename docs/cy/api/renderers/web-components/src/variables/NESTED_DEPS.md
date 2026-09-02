[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / NESTED\_DEPS

# Newidyn: NESTED\_DEPS

> `const` **NESTED\_DEPS**: `Readonly`\<`Record`\<`string`, readonly `string`[]\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alffa</span>

Elements whose shadow markup renders another element, so registering one requires its dependencies
too: `&lt;instui-date-time-input&gt;` renders a `&lt;instui-date-input&gt;`, which renders a `&lt;instui-calendar&gt;`.
[register](../functions/register.md)'s `only` filter expands through this (transitively) so a cherry-picked subset still
works. Keyed by base name; values are direct dependencies.
