[pantoken](../../../../index.md) / [formats/components/src](../index.md) / selectCss

# Ֆունկցիա: selectCss()

> **selectCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`.&lt;prefix&gt;-simple-select`-ի համար **փորձնական** հարմարվող ընտրել բարձրացում: Ամեն ինչ թաքցված է `@supports (appearance: base-select)`-ի հետևից (CSS Customizable Select մոդել — Chrome 135+, դեռ Baseline չէ), այնպես որ այն զուտ պրոգրեսիվ բարձրացում է՝ բրաուզերներ առանց աջակցության պահում են պարզ `simpleSelectCss` կառավարում; աջակցող բրաուզերներ ստանում են ստեղծված `::picker(select)` վահանակ և ստեղծված `option`s (hover/selected) `--instui-component-options-item-*` թոքենից: Հերթեկցված որպես իր սեփական ընտրովի `select.css` (ինչպես `fonts.css`) այլ ծալվածքի մեջ չ `components.css`, հատկապես որ հատկությունն է փորձնական — դուք ընտրում եք մտածված կերպով:

```demo
self:simple-select
```

## Պարամետրեր

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## Վերադարձվող արժեք

`string`

CSS տողը։

## Օրինակ

```ts
import { selectCss } from "@pantoken/components";

// Load AFTER components.css; enhances the same <select class="instui-simple-select"> element.
const css = selectCss();
```
