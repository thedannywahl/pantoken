[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / toDrupalTheme

# دالة: toDrupalTheme()

> **toDrupalTheme**(`options?`): [`DrupalFile`](../interfaces/DrupalFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

بناء الملفات لموضوع فرعي في Drupal يقوم بتحميل رموز Instructure.

## المعلمات

### options?

[`ToDrupalThemeOptions`](../interfaces/ToDrupalThemeOptions.md) = `{}`

[ToDrupalThemeOptions](../interfaces/ToDrupalThemeOptions.md).

## القيم المرجعة

[`DrupalFile`](../interfaces/DrupalFile.md)[]

ملفات القالب، المسارات نسبية إلى دليل القالب.

## أمثلة

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

**بناء موضوع فرعي فوق قالب أساسي**

```ts
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure", baseTheme: "olivero" });
```
