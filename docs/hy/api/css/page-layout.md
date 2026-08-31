# CSS: page-layout

`div[class~="instui-page-layout"]` — Ստանդարտ երեք-սյունակ էջի դասավորում գլխավոր, կողային և հիմնական բովանդակությամբ:

✅ Օգտագործեք Page-Layout երբ:

- Ձեզ պետք է դասական էջի կառուցվածք նավիգացիայի և բովանդակության մասերի հետ
- Էջը ունի պարզ հիմնական բովանդակության մասակ լրասնամ մասերի կողմից
- Դուք ցանկանում եք հետևողական բացատ և հավասարեցում ամբողջ դասավորման վրա
  🚫 Մի օգտագործեք Page-Layout երբ:

- Մեկ-սյունակ էջ կառուցել — օգտագործեք ավելի պարզ դասավորում փոխարենը
- Կողային պայքարում է հիմնական բովանդակության հետ կարևորության համար

## Accessibility

- Քարտեզել հիմնական բովանդակության մասակ `&lt;main&gt;` վերահղման վրա
- Տալ կողային `role="navigation"` կամ `role="complementary"` ինչպես հարմար
- Ապահովել որ վերահղման մասերը ունեն տարբերակ aria-labels

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Parts

| Part              | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `.instui-body`    | Հիմնական մարմինը պարունակող կողային և բովանդակություն: |
| `.instui-footer`  | Ներքևի ընկերային մաս:                                  |
| `.instui-header`  | Վերևի գլխավոր մաս:                                     |
| `.instui-main`    | Կենտրոնական բովանդակության մասակ:                      |
| `.instui-sidebar` | Ձախ նավիգացիա կամ օժանդակ սյունակ:                     |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                               | Type       | Value |
| ----------------------------------- | ---------- | ----- |
| `--instui-color-border`             | —          | —     |
| `--instui-color-footer-background`  | —          | —     |
| `--instui-color-footer-text`        | —          | —     |
| `--instui-color-header-background`  | —          | —     |
| `--instui-color-sidebar-background` | —          | —     |
| `--instui-font-size-small`          | `<length>` | —     |
| `--instui-space-medium`             | —          | —     |

## Related

- [wrapper](/hy/api/css/wrapper.md)
