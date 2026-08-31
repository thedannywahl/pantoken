[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / alpha

# Function: alpha()

> **alpha**(`color`, `percent`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اضبط معتم اللون على `percent`% — المرآة المخصصة بـ CSS فقط لـ ui-color-utils `alpha`. الخلط مع `transparent` ينتج بالضبط اللون عند قناة alpha هذه.

## Parameters

### color

`string`

اللون الأساسي (حرفي، `var(--token)`، أو نتيجة مساعد متداخل).

### percent

`number`

معتم الهدف، 0–100.

## Returns

`string`

تعبير `color-mix()`.

## Example

```ts
alpha("var(--brand)", 10); // "color-mix(in srgb, var(--brand) 10%, transparent)"
```
