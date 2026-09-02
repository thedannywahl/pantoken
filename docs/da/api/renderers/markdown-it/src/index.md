[pantoken](../../../index.md) / markdown-it

# markdown-it

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/markdown-it` — et markdown-it plugin, der gengiver `:icon:` koder som inline SVG og
uafhængige farveværdier (`#03893D`, `rgb(…)`, `oklch(…)`) som farveskemaer ved hjælp af pantoken-ikonsættet.

Det overfører `@pantoken/rehype` og `@pantoken/react-markdown` rørledninger til markdown-it: en enkelt kerneregl går gennem hver inline-tokens tekstbørn, opdeler dem på ikon- og farvemønstre og udskifter matchene med `html_inline` tokens. Ikoncoder løses gennem en kæde — plugin `rehype` resolvere først, derefter en eksplicit [MarkdownItOptions.resolve](interfaces/MarkdownItOptions.md#resolve), derefter det built-in `@pantoken/icons` sæt — så brand-icon plugins sammensætter på samme måde som andre steder.

Det udsendte markup bruger de samme klassenavne som de andre renderers (`pantoken-icon`,
`pantoken-color-swatch`), så indlæsning af `@pantoken/components` styler det. Omgiv det gengivne HTML i en
`.pantoken-prose` container (se [PROSE\_CLASS](variables/PROSE_CLASS.md)) for også at hente prosa-laget.

## Eksempel

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";

const md = new MarkdownIt().use(pantokenMarkdownIt);
md.render("Save :check: to lock in #03893D.");
```

## Interfaces

- [MarkdownItOptions](interfaces/MarkdownItOptions.md)

## Variabler

- [PROSE\_CLASS](variables/PROSE_CLASS.md)

## Funktioner

- [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)

## Referencer

### default

Omdøber og gen-eksporterer [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)
