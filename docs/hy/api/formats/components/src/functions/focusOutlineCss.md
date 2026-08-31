[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineCss

# Function: focusOutlineCss()

> **focusOutlineCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցեք focus-outline բլոկ՝ `--instui-focus-outline-*` տոկեն սահմանումները գումարած ring կանոնները։ Թխել `base.css` մեջ (ուստի focusables-ները ստանում են ring անմիջապես), և վերօգտագործելի այլ շերտավորված ելքերով (օրինակ՝ Pendo մատուցողը) `selector`/`tokenSelector` ընտրանքների միջոցով։

```demo
self:focus-outline
```

## Parameters

### options?

`selector` — focusable ընտրիչը; `tokenSelector` — որտեղ տոկեն սահմանումները վայտ (լռելյայն `:where(:root)`)։

#### selector?

`string`

#### tokenSelector?

`string`

## Returns

`string`

CSS տողը։
