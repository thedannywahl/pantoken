[pantoken](../../../../index.md) / custom-icons

# custom-icons

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-custom-icons` — vendored custom icon glyphs for downstream consumers.

Brings in icons that aren't part of the InstUI set (product/brand marks, etc.) as
`--instui-icon-&lt;name&gt;` image tokens — the same namespace and `.-icon-&lt;name&gt;` painter class the
built-in InstUI icons use, so a custom icon drops into `.instui-icon -icon-&lt;name&gt;` exactly like a
built-in one. No `custom-` prefix: on a name collision, the built-in InstUI icon should win (load
it after this plugin's CSS in any combine URL).

## Exemplo

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

## Variáveis

- [icons](variables/icons.md)

## Funções

- [customIcons](functions/customIcons.md)

## Referências

### default

Renames and re-exports [customIcons](functions/customIcons.md)
