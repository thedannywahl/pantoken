[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / Target

# Interface: Target

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Et mål opdaget ved dets `pantoken`-felt.

## Egenskaber

### pkg

> **pkg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Pakkenavnet, f.eks. `@pantoken/astro`.

***

### key

> **key**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Aggregationsnøglen / eksportnavnet, f.eks. `astro`.

***

### kind

> **kind**: `"namespace"` \| `"sideEffect"` \| `"subpath"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Hvordan målet eksponeres:
- `namespace` — re-eksporteret til eager barrel *og* som undergsti.
- `sideEffect` — undergsti importerer pakkens `/inject` post; også i barrel.
- `subpath` — kun undergsti, holdt UDEN for eager barrel (for tunge peers som React, så
  `import "pantoken"` aldrig indlæser dem).
