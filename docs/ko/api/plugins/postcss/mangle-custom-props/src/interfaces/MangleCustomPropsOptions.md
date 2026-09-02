[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / MangleCustomPropsOptions

# 인터페이스: MangleCustomPropsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Options for [mangleCustomProps](../variables/mangleCustomProps.md).

## 속성

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Only custom property names that start with this string are mangled.

#### 기본값

`"--instui-"`

***

### method?

> `optional` **method?**: [`MangleMethod`](../type-aliases/MangleMethod.md)

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The algorithm used to generate short replacement names.

- `"base26"` — `--a`, `--b`, …, `--z`, `--aa`, `--ab`, … (default; shortest for large sets)
- `"base36"` — `--0`, `--1`, …, `--9`, `--a`, …, `--z`, `--10`, … (alphanumeric)
- `"numeric"` — `--0`, `--1`, `--2`, …

#### 기본값

`"base26"`

***

### propertyMap?

> `optional` **propertyMap?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

When `true`, appends a `mangle-map` entry to PostCSS `result.messages` after processing.
The message has shape `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string, string> }`.

#### 기본값

`false`

***

### sharedManifest?

> `optional` **sharedManifest?**: `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

A mutable `Map` shared across multiple PostCSS passes.

On each pass the plugin reads existing entries (reusing their short names) and writes new
ones (continuing the counter from `sharedManifest.size`). Pass the same `Map` instance to
every `mangleCustomProps` or `applyMinify` call that processes CSS files which will be
loaded together in the browser — this guarantees all files use an identical name mapping.

Process the token sheet first so its names are seeded into the manifest before the component
sheets add their (typically overlapping) references.
