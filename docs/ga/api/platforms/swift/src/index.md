[pantoken](../../../index.md) / swift

# swift

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

`@pantoken/swift` — emit Instructure design tokens as Swift via Style Dictionary.

This is pantoken's native proof: it flattens the IR to concrete, single-mode values
(`@pantoken/core`'s `toStyleDictionary`), keeps the natively-typed tokens (colours, dimensions,
numbers), and hands them to `@pantoken/sd-config`. Swapping `platform` to `flutter`/`compose`
reuses the same path.

## Comhéadan

- [GenerateSwiftOptions](interfaces/GenerateSwiftOptions.md)

## Feidhmeanna

- [toSwift](functions/toSwift.md)
- [generateSwift](functions/generateSwift.md)

## Tagairtí

### default

Renames and re-exports [generateSwift](functions/generateSwift.md)
