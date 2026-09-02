[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ExampleSrcdocOptions

# इंटरफेस: ExampleSrcdocOptions

Options for [buildExampleSrcdoc](../functions/buildExampleSrcdoc.md).

## प्रॉपर्टीज

### cssUrls

> **cssUrls**: readonly `string`[]

Stylesheet URLs to load into the iframe's `&lt;head&gt;` (tokens, components, utilities, icons, …).

***

### card?

> `optional` **card?**: `boolean`

Wrap `html` in the shared `.instui-card` surface (default `true`).

***

### dir?

> `optional` **dir?**: `"ltr"` \| `"rtl"`

Text direction for the isolated document's `&lt;html&gt;` (default `"ltr"`) — a srcdoc never inherits it from the embedding page.
