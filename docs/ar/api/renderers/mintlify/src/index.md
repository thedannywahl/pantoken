[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/mintlify` — ضع مظهر موقع Mintlify للمستندات برموز Instructure.

[toMintlifyConfig](functions/toMintlifyConfig.md) يرسم أي IR على مفاتيح `colors` + `background` من `docs.json` من Mintlify؛ [docsJson](variables/docsJson.md) هو جزء `rebrand` الجاهز. امزجه في `docs.json` الخاص بك.

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

إعادة تسمية وإعادة تصدير [docsJson](variables/docsJson.md)
