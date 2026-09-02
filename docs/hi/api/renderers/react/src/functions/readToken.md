[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# फंक्शन: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## पैरामीटर

### name

`string`

### fallback?

`string` = `""`

## वापसी

`string`

## उदाहरण

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
