[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

`@pantoken/mintlify` — theme a Mintlify docs site with Instructure tokens.

[toMintlifyConfig](functions/toMintlifyConfig.md) maps any IR onto the `colors` + `background` keys of a Mintlify
`docs.json`; [docsJson](variables/docsJson.md) is the ready-made `rebrand` fragment. Merge it into your `docs.json`.

## Enghraifft

```jsonc
// docs.json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
}
```

## Rhyngwynebau

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## Newidynnau

- [docsJson](variables/docsJson.md)

## Swyddogaethau

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## Cyfeiriadau

### default

Renames and re-exports [docsJson](variables/docsJson.md)
