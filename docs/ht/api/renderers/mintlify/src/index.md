[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

`@pantoken/mintlify` — theme a Mintlify docs site with Instructure tokens.

[toMintlifyConfig](functions/toMintlifyConfig.md) maps any IR onto the `colors` + `background` keys of a Mintlify
`docs.json`; [docsJson](variables/docsJson.md) is the ready-made `rebrand` fragment. Merge it into your `docs.json`.

## Egzanp

```jsonc
// docs.json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
}
```

## Entèfas

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## Varyab

- [docsJson](variables/docsJson.md)

## Fonksyon

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## Referans

### default

Renames and re-exports [docsJson](variables/docsJson.md)
