[pantoken](../../../index.md) / swift

# swift

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

`@pantoken/swift` — emit Instructure design tokens as Swift via Style Dictionary.

This is pantoken's native proof: it flattens the IR to concrete, single-mode values
(`@pantoken/core`'s `toStyleDictionary`), keeps the natively-typed tokens (colours, dimensions,
numbers), and hands them to `@pantoken/sd-config`. Swapping `platform` to `flutter`/`compose`
reuses the same path.

## 接口

- [GenerateSwiftOptions](interfaces/GenerateSwiftOptions.md)

## 函数

- [toSwift](functions/toSwift.md)
- [generateSwift](functions/generateSwift.md)

## 引用

### default

Renames and re-exports [generateSwift](functions/generateSwift.md)
