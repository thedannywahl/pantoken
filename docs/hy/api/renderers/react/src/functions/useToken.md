[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / useToken

# Ֆունկցիա: useToken()

> **useToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

React կեռիկ, որ վերադարձնում է լուծված `--instui-*` թոկեն արժեքը (վերալից `name` փոփոխության ժամանակ):

## Պարամետրեր

### name

`string`

### fallback?

`string` = `""`

## Վերադարձվող արժեք

`string`

## Օրինակ

```tsx
import { useToken } from "@pantoken/react";

function Banner() {
  const brand = useToken("--instui-color-background-brand", "#0374B5");
  return <div style={{ background: brand }}>Saved</div>;
}
```
