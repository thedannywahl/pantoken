# CSS: table.row-header

`th[scope="row"]` — خلية رأس صف (InstUI `Table.RowHeader`); مُنسَّقة من رموز رأس الصف، وليس من رموز رأس العمود.

مُعدِّل `-layout-stacked` الخاص بالـ `table` الأصل يكدس هذا العضو ككتلة ويعلّمه عبر `::before` — انظر وثيقة `table` نفسها لذلك المُعدِّل.

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/table.row-header.css";
```

## عناصر زائفة

| عنصر زائف | الوصف |
| --- | --- |
| `::before` | — |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-table-col-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-head-font-weight` | `<integer>` | `600` |
| `--instui-component-table-row-header-background` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-component-table-row-header-color` | `<color>` | `light-dark(#273540, #F2F4F5)` |
| `--instui-component-table-row-header-font-weight` | `<integer>` | `400` |
| `--instui-component-table-row-header-line-height` | `<percentage>` | `125%` |
| `--instui-component-table-row-header-padding-horizontal` | `<length>` | `0.75rem` |
| `--instui-component-table-row-header-padding-vertical` | `<length>` | `0.5rem` |

