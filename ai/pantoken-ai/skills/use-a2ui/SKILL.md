---
name: use-a2ui
description: Use Pantoken's constrained A2UI 1.0 component catalog or theme an installed A2UI renderer with Pantoken tokens. Use for A2UI work involving Pantoken, not transport-only or generic Pantoken tasks. When the app needs multiple themes, define each theme's `--a2ui-*` and `--instui-*` mappings under a separate selector (for example, `[data-theme="dark"] { ... }`), and do not set the mappings on `:root`.
---

# Use Pantoken with A2UI

Use this skill when a consumer app combines Pantoken with A2UI. A2UI supplies the protocol and
framework-specific renderers; Pantoken supplies tokens, icons, and its complete web-component set.
Use A2UI 1.0 only. Do not fall back to A2UI 0.9.

## Do not use this skill for

Don't use this skill for A2UI protocol or transport questions that don't involve Pantoken, or for
generic Pantoken styling without A2UI.

## 1. Identify the client and versions

Inspect the app's package manifest, lockfile, and installed packages. Confirm the A2UI protocol
version and the client framework's supported SDK version from the
[official SDK table](https://a2ui.org/concepts/sdks/) and
[client integration guide](https://a2ui.org/guides/client-integration/). Report the detected A2UI
protocol version (for example, "A2UI 1.0") in the first sentence of your response. A2UI 1.0 delegates
branding to the renderer; don't put theme properties in protocol messages.

If the installed client framework's SDK version is not listed as supported for A2UI 1.0 in the official SDK table, or the SDK version cannot be determined, stop before making changes, report the detected SDK version, and do not apply Pantoken catalog or theme changes.

If no package manifest or lockfile is available, ask the user for the A2UI version and client
framework before continuing, and do not assume 1.0.

If the installed A2UI protocol version is not 1.0, stop before making changes, report the detected version and the required upgrade path, and do not apply Pantoken catalog or theme changes.

If a referenced documentation URL or the file `@pantoken/ai/a2ui/catalog-v1.json` cannot be accessed, use the installed package version and its README or type definitions to confirm support, and state in the response that the external source was not verified.

## Routing table: Choose your path

Before reading the sections below, use this table to identify which section applies:

| A2UI Version | Client Framework               | Renderer Type     | Section                   |
| ------------ | ------------------------------ | ----------------- | ------------------------- |
| 1.0          | Lit, verified React or Angular | Universal Catalog | 2                         |
| 1.0          | Other verified web clients     | Basic Catalog     | 3 (Web)                   |
| 1.0          | Flutter                        | Native            | 3 (Native)                |
| 1.0          | SwiftUI                        | Native            | 3 (Native)                |
| 1.0          | Jetpack Compose                | Native            | 3 (Native)                |
| Other        | —                              | —                 | Stop: unsupported version |

Find the row matching the user's setup and follow only that section. If the setup doesn't match a row, the configuration is not supported by this skill.

## 2. Prefer the Pantoken catalog for verified web clients

For A2UI 1.0 Lit clients and the verified React/Angular combinations below, use the published
Pantoken catalog and Universal components:

- Install `@pantoken/ai` and `@pantoken/web-components`.
- Register `pantokenA2uiCatalog` with `registerPantokenA2uiComponents()` from
  `@pantoken/web-components/a2ui`, alongside A2UI's Basic Catalog.
- Set the surface's `catalogId` to Pantoken's catalog ID, or set a component's `catalogId` when
  mixing catalogs. Don't use `@catalogId`; it isn't a v1.0 protocol directive.
- Use only the components and properties listed in the catalog JSON at
  `@pantoken/ai/a2ui/catalog-v1.json`. If the web catalog at [https://pantoken.app/a2ui/](https://pantoken.app/a2ui/) differs
  from that JSON file, follow the JSON file and report the difference in the response. It covers
  every exported `@pantoken/web-components` element; don't invent additional Pantoken components
  or properties.
- If a requested component or property is not listed in the catalog JSON, respond with the sentence "Pantoken component X is not supported in the v1 catalog," where X is the requested name. Do not write X as a code identifier. In the same response, name the A2UI Basic Catalog component that has the same role (for example, button for a button, text field for an input) and the most overlapping listed properties, and state which properties were dropped.

- The catalog defines no executable functions. Its actions dispatch through A2UI's normal
  action-handling path; the host application remains responsible for authorization.

Browser tests verify `@a2ui/react` 0.15.0 with React 19.3.1 and `@a2ui/angular` 0.14.0 with Angular
21.2.5, using `@a2ui/web_core` 0.15.0 and the same Lit-backed Universal components in Chromium,
Firefox, and WebKit. Install `lit` and the matching renderer; don't create per-framework component
copies. Initialize Angular's renderer before constructing surfaces, because it installs the signal
backend. Angular 22, SSR/hydration, arbitrary native framework children, and other version
combinations haven't been verified. Don't infer A2UI support from Pantoken's general framework
compatibility matrix. For other verified SDK clients, use the Basic Catalog and renderer theme API.
Flutter, SwiftUI, and Jetpack Compose have schema-only support; Pantoken provides no native renderers.

## 3. Theme the Basic Catalog and other verified renderers

- **Web Basic Catalog:**
  1. Confirm each `--a2ui-*` property exists in the installed renderer's stylesheet or version-matched docs.
  2. Omit any property that cannot be confirmed and list it in the response.
  3. For each remaining mapping, resolve a semantically matching, correctly typed token from `@pantoken/tokens`.
  4. Load `@pantoken/css` so those tokens are defined.
  5. Keep mappings scoped when the app needs multiple themes; don't hard-code colors or invent property names.
- **Native clients:** Use Pantoken's existing target output for the host:
  use `pantoken generate flutter` for Flutter projects, `pantoken generate compose` for Jetpack Compose projects, and `pantoken generate swift` for SwiftUI projects. If the host platform is not one of these, stop and ask the user. Follow the A2UI renderer's
  native theme API; CSS custom properties don't apply to native views. If the renderer's native theme API cannot be verified in the installed package or version-matched docs, do not apply theme changes, list the unverified theme properties in the response, and state that the external source was not verified.
- **Icons:** For surrounding web UI, use `@pantoken/web-components` or `@pantoken/icons`. For icons
  inside an A2UI surface, verify the selected catalog's icon API; don't invent icon props.
  If the selected catalog's icon API cannot be verified, omit icon props inside the A2UI surface,
  use the surrounding web UI icon source from `@pantoken/web-components` or `@pantoken/icons`,
  and list the omitted icon usage in the response.

## 4. Extend only when requested

If the user explicitly requests a different custom catalog, follow A2UI's
[catalog guide](https://a2ui.org/guides/defining-a-catalog/) and the host renderer's registration
API. Preserve strict property allowlists, avoid raw HTML and URL-bearing props, and don't add
executable catalog functions without an explicit design and security review. A catalog schema is
not an authorization boundary; the host must authorize action effects.

## 5. Verify

Run the host app's relevant type checks and tests. For each color scheme defined by the installed `@pantoken/tokens` package, run the host app's relevant tests and confirm that every `--a2ui-*` and `--instui-*` value resolves to a defined token, then list each scheme and its result in the verification summary.

## References

- [A2UI v1.0 protocol](https://a2ui.org/specification/v1.0-a2ui/)
- [A2UI SDKs](https://a2ui.org/concepts/sdks/)
- [A2UI client integration](https://a2ui.org/guides/client-integration/)
- [A2UI catalog guide](https://a2ui.org/guides/defining-a-catalog/)
