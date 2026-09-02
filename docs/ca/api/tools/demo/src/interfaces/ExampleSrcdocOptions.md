[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ExampleSrcdocOptions

# Interfície: ExampleSrcdocOptions

Opcions per a [buildExampleSrcdoc](../functions/buildExampleSrcdoc.md).

## Propietats

### cssUrls

> **cssUrls**: readonly `string`[]

URLs de full d'estil per carregar al `&lt;head&gt;` de l'iframe (tokens, components, utilitats, icones, …).

***

### card?

> `optional` **card?**: `boolean`

Embolicar `html` en la superfície `.instui-card` compartida (per defecte `true`).

***

### dir?

> `optional` **dir?**: `"ltr"` \| `"rtl"`

Text direction for the isolated document's `&lt;html&gt;` (default `"ltr"`) — a srcdoc never inherits it from the embedding page.
