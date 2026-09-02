# CSS: table.cell

`td` — خلية بيانات (InstUI `Table.Cell`).

مُعدِّل `-layout-stacked` الخاص بالـ `table` الأصل يكدس هذا العضو ككتلة ويعلّمه عبر `::before` — انظر وثيقة `table` نفسها لذلك المُعدِّل.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.cell.css";
```

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::before` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-table-cell-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-cell-line-height` | `<percentage>` | `125%` |
| `--instui-component-table-cell-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-cell-padding-vertical` | `<length>` | `0.5rem` |
| `--instui-component-table-col-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-head-font-weight` | `<integer>` | `600` |

