[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / toDrupalTheme

# Funció: toDrupalTheme()

> **toDrupalTheme**(`options?`): [`DrupalFile`](../interfaces/DrupalFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Construeix els fitxers per a un subtema de Drupal que carrega els tokens d'Instructure.

## Paràmetres

### options?

[`ToDrupalThemeOptions`](../interfaces/ToDrupalThemeOptions.md) = `{}`

[ToDrupalThemeOptions](../interfaces/ToDrupalThemeOptions.md).

## Retorna

[`DrupalFile`](../interfaces/DrupalFile.md)[]

Els fitxers de tema, rutes relatives al directori de tema.

## Exemples

**Construeix i escriu un subtema independent**

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

**Construeix un subtema sobre un tema base**

```ts
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure", baseTheme: "olivero" });
```
