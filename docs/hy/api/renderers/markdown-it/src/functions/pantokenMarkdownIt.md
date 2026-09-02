[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / pantokenMarkdownIt

# Ֆունկցիա: pantokenMarkdownIt()

> **pantokenMarkdownIt**(`md`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Markdown-it plugin գործարան: Օգտագործեք այն `md.use(pantokenMarkdownIt, options)`-ի հետ:

## Պարամետրեր

### md

`MarkdownIt`

Markdown-it օրինակ:

### options?

[`MarkdownItOptions`](../interfaces/MarkdownItOptions.md) = `{}`

[MarkdownItOptions](../interfaces/MarkdownItOptions.md).

## Վերադարձվող արժեք

`void`

## Օրինակ

**Կազմել բրենդ-պատկերի plugin-ի լուծիչ**

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt } from "@pantoken/markdown-it";
import { simpleIcons } from "@pantoken/plugin-simple-icons";

const md = new MarkdownIt().use(pantokenMarkdownIt, { plugins: [simpleIcons()] });
```
