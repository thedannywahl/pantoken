[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / Target

# Interface: Target

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un objectiu descobert pel seu camp `pantoken`.

## Properties

### pkg

> **pkg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El nom del paquet, per exemple `@pantoken/astro`.

---

### key

> **key**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La clau d'agregació / nom d'exportació, per exemple `astro`.

---

### kind

> **kind**: `"namespace"` \| `"sideEffect"` \| `"subpath"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Com s'exposa l'objectiu:

- `namespace` — re-exportat al barril estalvi _i_ com a camí secundari.
- `sideEffect` — les importacions del camí secundari de l'entrada `/inject` del paquet; també al barril.
- `subpath` — només camí secundari, mantingut FORA del barril estalvi (per als col·legues pesants com React, perquè
  `import "pantoken"` mai no els carrega).
