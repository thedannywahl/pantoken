[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

`@pantoken/mintlify` — theme a Mintlify docs site with Instructure tokens.

[toMintlifyConfig](functions/toMintlifyConfig.md) maps any IR onto the `colors` + `background` keys of a Mintlify
`docs.json`; [docsJson](variables/docsJson.md) is the ready-made `rebrand` fragment. Merge it into your `docs.json`.

## 예제

```jsonc
// docs.json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
}
```

## 인터페이스

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## 변수

- [docsJson](variables/docsJson.md)

## 함수

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## 참조

### default

Renames and re-exports [docsJson](variables/docsJson.md)
