[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

`@pantoken/mintlify` — թեմա Mintlify փաստաթղթերի տեղ Instructure տոկեններով:

[toMintlifyConfig](functions/toMintlifyConfig.md) բերում է ցանկացած IR-ը `colors` + `background` ստեղներին Mintlify
`docs.json`; [docsJson](variables/docsJson.md)-ը պատրաստի `rebrand` հատված է: Միաձուլել այն ձեր `docs.json`-ի մեջ:

## Օրինակ

```jsonc
// docs.json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
}
```

## Ինտերֆեյսներ

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## Փոփոխականներ

- [docsJson](variables/docsJson.md)

## Ֆունկցիաներ

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## Հղումներ

### default

Վերանվանում և վերաարտահանում [docsJson](variables/docsJson.md)
