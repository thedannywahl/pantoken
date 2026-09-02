# @pantoken/i18n

Locale bundles and localization helpers for [`@pantoken/web-components`](https://www.npmjs.com/package/@pantoken/web-components).
It includes the 44 supported locale bundles, locale direction metadata, and browser-safe MessageFormat 2 and `Intl` helpers.

## Install

```sh
npm i @pantoken/i18n @pantoken/web-components @pantoken/css
```

## Register A Locale

Use a built-in bundle when you want the translated web-component strings for that locale:

```ts
import { hu, registerLocalized } from "@pantoken/i18n";
import "@pantoken/css";

registerLocalized(hu);
```

You can also register a locale tag directly. This derives weekday names and direction from the locale, while other strings use the English defaults:

```ts
import { registerLocalized } from "@pantoken/i18n";

registerLocalized("ar"); // direction is inferred as rtl
```

Pass a custom element registry or registration options when needed:

```ts
registerLocalized("x-custom", customElements, {
  prefix: "x",
  only: ["button", "icon"],
});
```

## Selective Imports

Each locale bundle is exported individually, so import only the locales your application supports:

```ts
import { createLocaleSet, de, en, hu } from "@pantoken/i18n";

const locales = createLocaleSet({ en, de, hu });

locales.register("hu");
locales.has("de");
locales.get("en");
```

`createLocaleSet` narrows locale keys to the bundles passed to it. `LOCALES` provides metadata for every supported locale, including `dir` and the display label.

## Formatting Helpers

The package also exports browser-safe helpers for MessageFormat 2 and the standard `Intl` formatters:

```ts
import {
  formatDate,
  formatList,
  formatMessage,
  formatNumber,
  formatRelativeTime,
  isolate,
} from "@pantoken/i18n";

formatMessage("en", "Welcome, {$name}!", { name: "Ada" });
formatNumber("de", 1234567.89);
formatDate("hu", new Date());
formatList("en", ["CSS", "Swift", "Kotlin"]);
formatRelativeTime("en", -3, "day");
isolate("filename.txt"); // for interpolation outside MF2
```

Use `formatMessage` with valid MessageFormat 2 syntax. Validate messages during a build with `validateMf2` from `@pantoken/i18n-engine`; formatting intentionally throws for invalid message syntax.

## API

- **`registerLocalized(bundleOrLocale)`** — register web components with a locale bundle or raw BCP 47 tag.
- **`createLocaleSet(bundles)`** — define a typed subset of locale bundles.
- **`defineBundle(config)`** — create a custom `LocaleBundle` for a locale not included here.
- **`LOCALES`** — locale metadata registry.
- **`LocaleBundle`**, **`LocaleInfo`**, **`WebComponentStrings`** — public type contracts.
- **`ENGLISH_STRINGS`**, **`makeStrings`** — English defaults and locale-aware string construction.
- **`getDir(localeOrBundle)`** — resolve `ltr` or `rtl` direction.
- **`formatMessage`**, **`formatNumber`**, **`formatDate`**, **`formatList`**, **`formatRelativeTime`**, **`isolate`** — runtime localization helpers.
- **`ar`**, **`de`**, **`en`**, **`fr`**, **`hu`**, and the other locale exports — pre-built `LocaleBundle` values.

## Related

- [`@pantoken/web-components`](https://www.npmjs.com/package/@pantoken/web-components) provides the custom elements and their string contract.
- [`@pantoken/css`](https://www.npmjs.com/package/@pantoken/css) provides the token styles used by the components.

## License

MIT
