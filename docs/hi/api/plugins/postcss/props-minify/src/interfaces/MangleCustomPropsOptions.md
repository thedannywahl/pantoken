[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / MangleCustomPropsOptions

# इंटरफेस: MangleCustomPropsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Options for [mangleCustomProps](../variables/mangleCustomProps.md).

## प्रॉपर्टीज

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Only custom property names that start with this string are mangled.

#### डिफ़ॉल्ट मान

`"--instui-"`

***

### method?

> `optional` **method?**: [`MangleMethod`](../type-aliases/MangleMethod.md)

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The algorithm used to generate short replacement names.

- `"base26"` — `--a`, `--b`, …, `--z`, `--aa`, `--ab`, … (default; shortest for large sets)
- `"base36"` — `--0`, `--1`, …, `--9`, `--a`, …, `--z`, `--10`, … (alphanumeric)
- `"numeric"` — `--0`, `--1`, `--2`, …

#### डिफ़ॉल्ट मान

`"base26"`

***

### propertyMap?

> `optional` **propertyMap?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

When `true`, appends a `mangle-map` entry to PostCSS `result.messages` after processing.
The message has shape `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string, string> }`.

#### डिफ़ॉल्ट मान

`false`

***

### sharedManifest?

> `optional` **sharedManifest?**: `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

A mutable `Map` shared across multiple PostCSS passes.

On each pass the plugin reads existing entries (reusing their short names) and writes new
ones (continuing the counter from `sharedManifest.size`). Pass the same `Map` instance to
every `mangleCustomProps` or `applyMinify` call that processes CSS files which will be
loaded together in the browser — this guarantees all files use an identical name mapping.

Process the token sheet first so its names are seeded into the manifest before the component
sheets add their (typically overlapping) references.
