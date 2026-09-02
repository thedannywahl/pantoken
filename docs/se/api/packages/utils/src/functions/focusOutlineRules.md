[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / focusOutlineRules

# Fušla: focusOutlineRules()

> **focusOutlineRules**(`selector?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

The focus-ring rules for a given focusable selector: a transparent resting ring that transitions in
on `:focus-visible`, plus the `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
`-without-focus-animation` modifiers. All `:where()`-wrapped, so zero-specificity.

## Parametera

### selector?

`string` = `FOCUSABLE_SELECTOR`

The focusable selector the base ring applies to (default [FOCUSABLE\_SELECTOR](../variables/FOCUSABLE_SELECTOR.md)).

## Gullii / Gávdnat

`string`

The CSS rules string.
