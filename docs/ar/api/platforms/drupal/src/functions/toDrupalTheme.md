[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / toDrupalTheme

# Function: toDrupalTheme()

> **toDrupalTheme**(`options?`): [`DrupalFile`](../interfaces/DrupalFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بناء الملفات لموضوع فرعي Drupal يقوم بتحميل علامات Instructure.

## Parameters

### options?

[`ToDrupalThemeOptions`](../interfaces/ToDrupalThemeOptions.md) = `{}`

[ToDrupalThemeOptions](../interfaces/ToDrupalThemeOptions.md).

## Returns

[`DrupalFile`](../interfaces/DrupalFile.md)[]

ملفات الموضوع، المسارات النسبية لدليل الموضوع.

## Examples

**بناء وكتابة موضوع فرعي مستقل**

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

**بناء موضوع فرعي فوق موضوع أساسي**

```ts
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure", baseTheme: "olivero" });
```
