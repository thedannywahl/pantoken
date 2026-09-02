[pantoken](../../../index.md) / markdown-it

# markdown-it

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

`@pantoken/markdown-it` — markdown-it plugin, որը կատարում է `:icon:` կոդերը որպես ընդլայն SVG և
ինքնուրույն գույնի արժեքներ (`#03893D`, `rgb(…)`, `oklch(…)`) որպես նմուշներ՝ օգտագործելով pantoken պատկերի
հավաքածուն:

Այն փոխադրում է `@pantoken/rehype` և `@pantoken/react-markdown` վերլուծական գիծերը markdown-it-ի վրա: մեկ հիմնական կանոն անցնում է յուրաքանչյուր ընդլայն տոկենի տեքստային երեխաներով, բաժանում դրանք պատկերի և գույնի
քերականների վրա և փոխանակում համընկումները `html_inline` տոկենների համար: Պատկերի կոդերը լուծվում են շղթայի միջոցով —
plugin `rehype` լուծիչներ նախ, այնուհետև բացահայտ [MarkdownItOptions.resolve](interfaces/MarkdownItOptions.md#resolve), այնուհետև
ներառված `@pantoken/icons` հավաքածուն — այդ պատճառով բրենդ-պատկերի plugin-ները կազմվում են նույն ձևով, ինչ այլ վայրերում:

Արտանետված նշանակումը օգտագործում է նույն դասի անունները, ինչ մյուս կատարողները (`pantoken-icon`,
`pantoken-color-swatch`), ուստի բեռնում `@pantoken/components`-ը այն նորմալ անում է: Փաղկել կատարված HTML-ը
`.pantoken-prose` տարայի մեջ (տես [PROSE\_CLASS](variables/PROSE_CLASS.md)) նույնպես արձակել դրամատուրգիայի շերտը:

## Օրինակ

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";

const md = new MarkdownIt().use(pantokenMarkdownIt);
md.render("Save :check: to lock in #03893D.");
```

## Ինտերֆեյսներ

- [MarkdownItOptions](interfaces/MarkdownItOptions.md)

## Փոփոխականներ

- [PROSE\_CLASS](variables/PROSE_CLASS.md)

## Ֆունկցիաներ

- [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)

## Հղումներ

### default

Վերանվանում և վերաարտահանում [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)
