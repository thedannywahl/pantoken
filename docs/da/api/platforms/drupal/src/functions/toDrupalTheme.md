[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / toDrupalTheme

# Funktion: toDrupalTheme()

> **toDrupalTheme**(`options?`): [`DrupalFile`](../interfaces/DrupalFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Byg filerne for et Drupal-undertema, der indlæser Instructure-tokens.

## Parametre

### options?

[`ToDrupalThemeOptions`](../interfaces/ToDrupalThemeOptions.md) = `{}`

[ToDrupalThemeOptions](../interfaces/ToDrupalThemeOptions.md).

## Returnerer

[`DrupalFile`](../interfaces/DrupalFile.md)[]

Temafiler, stier relative til temamappe.

## Eksempler

**Byg og skriv et selvstændigt undertema**

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

**Byg et undertema på toppen af et basistema**

```ts
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure", baseTheme: "olivero" });
```
