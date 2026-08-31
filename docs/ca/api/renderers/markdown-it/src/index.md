[pantoken](../../../index.md) / markdown-it

# markdown-it

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/markdown-it` — un connector markdown-it que representa els codis `:icon:` com SVG en línia i
valors de color autònoms (`#03893D`, `rgb(…)`, `oklch(…)`) com mostres, utilitzant el conjunt
d'icones pantoken.

Porta les canalitzacions `@pantoken/rehype` i `@pantoken/react-markdown` a markdown-it: una
regla central única recorre els fills de text de cada token en línia, els divideix en els patrons d'icona i color,
i intercanvia les coincidències per tokens `html_inline`. Els codis d'icones es resolen a través d'una cadena —
resolvedors de connectors `rehype` primer, després un [MarkdownItOptions.resolve](interfaces/MarkdownItOptions.md#resolve) explícit, després el
conjunt integrat `@pantoken/icons` — perquè els connectors de marca-icona es compongan de la mateixa manera que ho fan en altres llocs.

El marcat emès utilitza els mateixos noms de classe que els altres representadors (`pantoken-icon`,
`pantoken-color-swatch`), per tant carregant `@pantoken/components` l'estilitza. Embolica l'HTML representat en un
contenidor `.pantoken-prose` (veure [PROSE\_CLASS](variables/PROSE_CLASS.md)) per recollir la capa de prosa també.

## Example

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";

const md = new MarkdownIt().use(pantokenMarkdownIt);
md.render("Save :check: to lock in #03893D.");
```

## Interfaces

- [MarkdownItOptions](interfaces/MarkdownItOptions.md)

## Variables

- [PROSE\_CLASS](variables/PROSE_CLASS.md)

## Functions

- [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)

## References

### default

Canvia el nom i re-exporta [pantokenMarkdownIt](functions/pantokenMarkdownIt.md)
