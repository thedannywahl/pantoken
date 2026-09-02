[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / Target

# رابط: Target

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

A target discovered by its `pantoken` field.

## خصوصیات

### pkg

> **pkg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The package name, e.g. `@pantoken/astro`.

***

### key

> **key**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The aggregation key / export name, e.g. `astro`.

***

### kind

> **kind**: `"namespace"` \| `"sideEffect"` \| `"subpath"`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

How the target is exposed:
- `namespace` — re-exported into the eager barrel *and* as a subpath.
- `sideEffect` — subpath imports the package's `/inject` entry; also in the barrel.
- `subpath` — subpath only, kept OUT of the eager barrel (for heavy peers like React, so
  `import "pantoken"` never loads them).
