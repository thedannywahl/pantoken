[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / TokenUtilityGroup

# 介面: TokenUtilityGroup

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

A set of tokens that all map to one CSS property (e.g. every `--instui-font-weight-*` → `font-weight`).

## 屬性

### property

> **property**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The CSS property the tokens set (e.g. `"font-weight"`, `"border-radius"`, `"box-shadow"`).

***

### tokens

> **tokens**: readonly `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Full token names (e.g. `"--instui-font-weight-body-strong"`); the `--instui-` tail becomes the class.
