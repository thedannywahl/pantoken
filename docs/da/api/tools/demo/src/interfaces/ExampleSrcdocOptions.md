[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ExampleSrcdocOptions

# Interface: ExampleSrcdocOptions

Muligheder for [buildExampleSrcdoc](../functions/buildExampleSrcdoc.md).

## Egenskaber

### cssUrls

> **cssUrls**: readonly `string`[]

Stylesheet URL'er som skal indlæses i iframe'ens `&lt;head&gt;` (tokens, komponenter, utilities, ikoner, …).

***

### card?

> `optional` **card?**: `boolean`

Omslut `html` i den delte `.instui-card` overflade (standard `true`).

***

### dir?

> `optional` **dir?**: `"ltr"` \| `"rtl"`

Text direction for the isolated document's `&lt;html&gt;` (default `"ltr"`) — a srcdoc never inherits it from the embedding page.
