[pantoken](../../../../index.md) / [formats/css/src](../index.md) / leanCss

# Variable: leanCss

> `const` **leanCss**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Հաշվարկվածly `rebrand` ոճային թերթի շղթա — լրիվ թերթ մինուս `--instui-icon-*` գլիֆ տոկենները (~1,777 պատկերային տվյալ-URIs որոնք կազմում են [css](css.md)-ի մեծ մասը): Մոտավորապես վեցերորդ չափը հեղուկի վրա; CDN/embed մատակարարման համար առաջարկվող հիմքը: Բաղադրիչները հղում են միայն մի քանի պատկերի, առաքված առանձին որպես `@pantoken/components`-ի `component-icons.css`; սպառողները որոնք ապահովում են `var(--instui-icon-*)` լայնորեն պետք է բեռնեն լրիվ [css](css.md) (կամ `icons.css` գլիֆ թերթ): Տես `@pantoken/css/style.lean.css`:

## Example

```ts
import { leanCss } from "@pantoken/css";
```
