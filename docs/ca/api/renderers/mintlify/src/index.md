[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/mintlify` — temàtitza un lloc de documentació Mintlify amb tokens d'Instructure.

[toMintlifyConfig](functions/toMintlifyConfig.md) mapeja qualsevol IR en les claus `colors` + `background` d'una
`docs.json` de Mintlify; [docsJson](variables/docsJson.md) és el fragment `rebrand` ja fet. Fusiona'l en la teva `docs.json`.

## Exemple

```jsonc
// docs.json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
}
```

## Interfícies

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## Variables

- [docsJson](variables/docsJson.md)

## Funcions

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## Referències

### default

Canvia el nom i re-exporta [docsJson](variables/docsJson.md)
