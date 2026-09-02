[pantoken](../../../index.md) / foundation

# foundation

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

`@pantoken/foundation` — theme Foundation for Sites with Instructure tokens.

Foundation is Sass-first, so this package ships two layers. [toFoundationSettings](functions/toFoundationSettings.md) emits a
`_settings`-style Sass partial that points Foundation's setting variables at `var(--instui-*)`, so
a Sass build compiles the Instructure look while keeping runtime theming through the same custom
properties. [toFoundationCss](functions/toFoundationCss.md) emits a thin CSS overlay that themes the common compiled
classes (`.button`, `.callout`, links) the same way — useful when you consume stock Foundation CSS
and just want to layer Instructure colors on top without recompiling.

## 예제

```ts
import { foundationSettings, foundationCss } from "@pantoken/foundation";
// foundationSettings → a Sass partial; foundationCss → a runtime overlay.
```

## 인터페이스

- [ToFoundationSettingsOptions](interfaces/ToFoundationSettingsOptions.md)
- [ToFoundationCssOptions](interfaces/ToFoundationCssOptions.md)

## 변수

- [FOUNDATION\_TO\_INSTUI](variables/FOUNDATION_TO_INSTUI.md)
- [foundationSettings](variables/foundationSettings.md)
- [foundationCss](variables/foundationCss.md)

## 함수

- [toFoundationSettings](functions/toFoundationSettings.md)
- [toFoundationCss](functions/toFoundationCss.md)

## 참조

### default

Renames and re-exports [foundationCss](variables/foundationCss.md)
