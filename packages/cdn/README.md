# @pantoken/cdn

Model CDN providers and build correct asset URLs for any npm package, without hardcoding any
package name into the provider itself.

## Usage

```ts
import { buildFileUrls } from "@pantoken/cdn";

buildFileUrls([{ package: "@pantoken/components", path: "dist/components.css" }]);
// → ["https://cdn.jsdelivr.net/npm/@pantoken/components/dist/components.css"]

buildFileUrls(
  [
    { package: "@pantoken/components", path: "dist/base.css" },
    { package: "@pantoken/components", path: "dist/components.css" },
  ],
  "jsdelivr",
);
// → one combined URL, since jsDelivr supports its `/combine/` endpoint

buildFileUrls([{ package: "@pantoken/components", path: "dist/components.css" }], "unpkg", {
  version: "1.2.3",
});
// → ["https://unpkg.com/@pantoken/components@1.2.3/dist/components.css"]
```

## Providers

Ships with `jsdelivr` (the default), `unpkg`, and `esmsh` — all backed by Cloudflare/Fastly-class
multi-CDN networks with strong global coverage. `jsdelivr` is the only one with a multi-file
combine endpoint; `buildFileUrls` falls back to one URL per file for the others.

Bring your own provider with `defineCdnProvider`:

```ts
import { defineCdnProvider, resolveCdnProvider } from "@pantoken/cdn";

const myMirror = defineCdnProvider({
  id: "my-mirror",
  label: "My Mirror",
  supportsCombine: false,
  buildUrl: (file, options) => `https://cdn.example.com/${file.package}/${file.path}`,
});

resolveCdnProvider(myMirror); // passes a custom provider straight through
```

## API

- `CdnFile { package, path, version? }` — a single file, identified by npm package name and path.
  Never hardcoded to any pantoken (or other) package — callers say which files they want.
- `CdnProvider { id, label, supportsCombine, buildUrl, buildCombineUrl? }`.
- `defineCdnProvider(config)` / `validateCdnProvider(provider)`.
- `CDN_PROVIDERS`, `DEFAULT_CDN_PROVIDER_ID`, `resolveCdnProvider(idOrProvider?)`.
- `buildFileUrl(file, providerOrId?, options?)`, `buildFileUrls(files, providerOrId?, options?)`.
