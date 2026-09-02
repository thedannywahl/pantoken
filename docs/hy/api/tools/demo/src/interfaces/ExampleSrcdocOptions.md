[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ExampleSrcdocOptions

# Ինտերֆեյս: ExampleSrcdocOptions

[buildExampleSrcdoc](../functions/buildExampleSrcdoc.md) տարբերակներ:

## Առանձնահատկություններ

### cssUrls

> **cssUrls**: readonly `string`[]

Ոճային թերթերի URL-ները բեռնել iframe-ի `&lt;head&gt;`-ի մեջ (տոկեններ, բաղադրիչներ, կոմունալներ, իկոններ, …):

***

### card?

> `optional` **card?**: `boolean`

Պատել `html`-ը բաժանվածի `.instui-card` մակերեսում (լռական `true`):

***

### dir?

> `optional` **dir?**: `"ltr"` \| `"rtl"`

Text direction for the isolated document's `&lt;html&gt;` (default `"ltr"`) — a srcdoc never inherits it from the embedding page.
