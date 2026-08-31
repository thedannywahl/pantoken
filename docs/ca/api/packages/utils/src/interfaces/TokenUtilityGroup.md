[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / TokenUtilityGroup

# Interface: TokenUtilityGroup

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un conjunt de tokens que tots es mapegen a una propietat CSS (p. ex. tots `--instui-font-weight-*` → `font-weight`).

## Properties

### property

> **property**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La propietat CSS que estableixen els tokens (p. ex. `"font-weight"`, `"border-radius"`, `"box-shadow"`).

---

### tokens

> **tokens**: readonly `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Noms complets dels tokens (p. ex. `"--instui-font-weight-body-strong"`); la part final `--instui-` es converteix en la classe.
