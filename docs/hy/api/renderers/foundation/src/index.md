[pantoken](../../../index.md) / foundation

# foundation

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/foundation` — Instructure տոկենների հետ Foundation for Sites թեմա:

Foundation-ը Sass-առաջին է, ուստի այս փաթեթը տեղադրվում է երկու շերտերի հետ: [toFoundationSettings](functions/toFoundationSettings.md) արտանետում է
`_settings`-ի ոճով Sass մասնակի, որը Foundation-ի կարգավորման փոփոխականները ցույց է տալիս `var(--instui-*)`-ին, այդ պատճառով
Sass կառուցումը կազմում է Instructure-ի տեսքը, միաժամանակ շարունակելով կազմային թեմայանալ նույն հատուկ
հատկությունների միջոցով: [toFoundationCss](functions/toFoundationCss.md) արտանետում է բարակ CSS վերքածածկ, որը թեմայանում է ընդհանուր կազմված
կլասներ (`.button`, `.callout`, հղումներ) նույն ձևով — օգտակար, երբ դուք օգտագործում եք պաճեղ Foundation CSS
և պարզապես ցանկանում եք Instructure գույներ շերտավորել վերևից՝ առանց վերամշակման:

## Example

```ts
import { foundationSettings, foundationCss } from "@pantoken/foundation";
// foundationSettings → a Sass partial; foundationCss → a runtime overlay.
```

## Interfaces

- [ToFoundationSettingsOptions](interfaces/ToFoundationSettingsOptions.md)
- [ToFoundationCssOptions](interfaces/ToFoundationCssOptions.md)

## Variables

- [FOUNDATION\_TO\_INSTUI](variables/FOUNDATION_TO_INSTUI.md)
- [foundationSettings](variables/foundationSettings.md)
- [foundationCss](variables/foundationCss.md)

## Functions

- [toFoundationSettings](functions/toFoundationSettings.md)
- [toFoundationCss](functions/toFoundationCss.md)

## References

### default

Վերանվանում և վերաարտահանում [foundationCss](variables/foundationCss.md)
