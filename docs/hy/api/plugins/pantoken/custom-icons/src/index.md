[pantoken](../../../../index.md) / custom-icons

# custom-icons

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-custom-icons` — վաճախորդական պատկերակային գլիֆեր հետստորման սպառողների համար։

Բերում է պատկերակներ, որոնք InstUI հավաքածուի մաս չեն (ապրանք/ապրանքային նշաններ և այլն) `--instui-icon-&lt;name&gt;` պատկերային տոկենների հետ — նույն անունային տարածությունը և `.-icon-&lt;name&gt;` նկարիչ դասը, որ օգտագործում են ներկառուցված InstUI պատկերակները, այսինքն վաճախորդական պատկերակ ընկնում է `.instui-icon -icon-&lt;name&gt;`-ի մեջ, ճիշտ ինչպես ներկառուցված մեկը։ Առանց `custom-` նախածանցի՝ անունների բախման ժամանակ ներկառուցված InstUI պատկերակը պետք է հաղթի (բեռնել այն այս խրհուրդի CSS-ից հետո ցանկացած համակցված URL-ում)։

## Example

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { customIcons } from "@pantoken/plugin-custom-icons";

const css = toCss(byTheme("rebrand"), { plugins: [customIcons({ names: ["highspot"] })] });
// adds --instui-icon-highspot as an <image> token
```

## Interfaces

- [CustomIcon](interfaces/CustomIcon.md)
- [CustomIconsOptions](interfaces/CustomIconsOptions.md)

## Variables

- [icons](variables/icons.md)

## Functions

- [customIcons](functions/customIcons.md)

## References

### default

Վերանվանում և վերաարտահանում է [customIcons](functions/customIcons.md)
