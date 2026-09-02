[pantoken](../../../index.md) / swift

# swift

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

`@pantoken/swift` — emit Instructure design tokens as Swift via Style Dictionary.

This is pantoken's native proof: it flattens the IR to concrete, single-mode values
(`@pantoken/core`'s `toStyleDictionary`), keeps the natively-typed tokens (colours, dimensions,
numbers), and hands them to `@pantoken/sd-config`. Swapping `platform` to `flutter`/`compose`
reuses the same path.

## Schnittstellen

- [GenerateSwiftOptions](interfaces/GenerateSwiftOptions.md)

## Funktionen

- [toSwift](functions/toSwift.md)
- [generateSwift](functions/generateSwift.md)

## Referenzen

### default

Renames and re-exports [generateSwift](functions/generateSwift.md)
