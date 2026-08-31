[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / NESTED\_DEPS

# Variable: NESTED\_DEPS

> `const` **NESTED\_DEPS**: `Readonly`\<`Record`\<`string`, readonly `string`[]\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Elements whose shadow markup renders another element, so registering one requires its dependencies
too: `<instui-date-time-input>` renders a `<instui-date-input>`, which renders a `<instui-calendar>`.
[register](../functions/register.md)'s `only` filter expands through this (transitively) so a cherry-picked subset still
works. Keyed by base name; values are direct dependencies.
