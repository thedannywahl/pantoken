[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / toDrupalTheme

# Funkcja: toDrupalTheme()

> **toDrupalTheme**(`options?`): [`DrupalFile`](../interfaces/DrupalFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Build the files for a Drupal sub-theme that loads the Instructure tokens.

## Parametry

### options?

[`ToDrupalThemeOptions`](../interfaces/ToDrupalThemeOptions.md) = `{}`

[ToDrupalThemeOptions](../interfaces/ToDrupalThemeOptions.md).

## Zwraca

[`DrupalFile`](../interfaces/DrupalFile.md)[]

The theme files, paths relative to the theme directory.

## Przykłady

**Build and write a standalone sub-theme**

```ts
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure" });
// [ instructure.info.yml, instructure.libraries.yml, css/tokens.css, css/pantoken-prose.css ]
for (const { path, content } of files) {
  const dest = join("./themes/custom/instructure", path);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content);
}
```

**Build a sub-theme on top of a base theme**

```ts
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure", baseTheme: "olivero" });
```
