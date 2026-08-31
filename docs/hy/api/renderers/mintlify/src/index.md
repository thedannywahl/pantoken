[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/mintlify` — թեմա Mintlify փաստաթղթերի տեղ Instructure տոկեններով:

[toMintlifyConfig](functions/toMintlifyConfig.md) բերում է ցանկացած IR-ը `colors` + `background` ստեղներին Mintlify
`docs.json`; [docsJson](variables/docsJson.md)-ը պատրաստի `rebrand` հատված է: Միաձուլել այն ձեր `docs.json`-ի մեջ:

## Example

```jsonc
// docs.json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } },
}
```

## Interfaces

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## Variables

- [docsJson](variables/docsJson.md)

## Functions

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## References

### default

Վերանվանում և վերաարտահանում [docsJson](variables/docsJson.md)
