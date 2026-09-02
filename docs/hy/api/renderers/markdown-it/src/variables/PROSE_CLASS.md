[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / PROSE\_CLASS

# Փոփոխական: PROSE\_CLASS

> `const` **PROSE\_CLASS**: `"pantoken-prose"` = `"pantoken-prose"`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Դրամատուրգիայի-շրջանակի դասը, որի ներսում ձևակերպված նշանակումը նախատեսված է նստել:

## Օրինակ

```ts
import MarkdownIt from "markdown-it";
import { pantokenMarkdownIt, PROSE_CLASS } from "@pantoken/markdown-it";

const md = new MarkdownIt().use(pantokenMarkdownIt);
const html = `<div class="${PROSE_CLASS}">${md.render("Save :check:")}</div>`;
```
