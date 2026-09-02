[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / createInstuiMarkdownComponents

# Συνάρτηση: createInstuiMarkdownComponents()

> **createInstuiMarkdownComponents**(`options?`): `Components`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Build the react-markdown component map for a set of render options.

## Παράμετροι

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md) = `{}`

[InstuiMarkdownRenderOptions](../interfaces/InstuiMarkdownRenderOptions.md).

## Επιστρέφει

`Components`

A react-markdown `components` map backed by Instructure UI.

## Παράδειγμα

**Pass the map straight to react-markdown**

```tsx
import Markdown from "react-markdown";
import { createInstuiMarkdownComponents } from "@pantoken/react-markdown";

const components = createInstuiMarkdownComponents({ tableCaption: "Grades" });
<Markdown components={components}># Report</Markdown>;
```
