---
name: use-a2ui
description: Use Pantoken's constrained A2UI 1.0 component catalog or theme an installed A2UI renderer with Pantoken tokens. Use for A2UI work involving Pantoken, not transport-only or generic Pantoken tasks.
---

# Use Pantoken with A2UI

Use this skill when a consumer app combines Pantoken with A2UI. A2UI supplies the protocol and
framework-specific renderers; Pantoken supplies tokens, icons, and a small set of styled components.
Use A2UI 1.0 only. Do not fall back to A2UI 0.9.

## Do not use this skill for

Don't use this skill for A2UI protocol or transport questions that don't involve Pantoken, or for
generic Pantoken styling without A2UI.

## 1. Identify the client and versions

Inspect the app's package manifest, lockfile, and installed packages. Confirm the A2UI protocol
version and the client framework's supported SDK version from the
[official SDK table](https://a2ui.org/concepts/sdks/) and
[client integration guide](https://a2ui.org/guides/client-integration/). A2UI 1.0 delegates branding
to the renderer; don't put theme properties in protocol messages.

## 2. Prefer the Pantoken catalog for verified Lit clients

For A2UI 1.0 Lit clients, use the published Pantoken catalog and Universal components:

- Install `@pantoken/ai` and `@pantoken/web-components`.
- Register `pantokenA2uiCatalog` with `registerPantokenA2uiComponents()` from
  `@pantoken/web-components/a2ui`, alongside A2UI's Basic Catalog.
- Reference Pantoken components with the catalog's `@catalogId`.
- Use only the components and properties listed in the catalog JSON at
  `@pantoken/ai/a2ui/catalog-v1.json` or the
  [Pantoken A2UI Catalog](https://pantoken.app/a2ui/). The v1 catalog currently contains
  `PantokenButton` and `PantokenTooltip`; don't invent additional Pantoken components or properties.
- The catalog defines no executable functions. Its actions dispatch through A2UI's normal
  action-handling path; the host application remains responsible for authorization.

React and Angular v1.0 runtime support has not been verified. For those clients, use A2UI's Basic
Catalog and the installed renderer's theme API instead of claiming the Pantoken Universal components
are supported. Flutter, SwiftUI, and Jetpack Compose have schema-only support; Pantoken does not
provide native component renderers.

## 3. Theme the Basic Catalog and other verified renderers

- **Web Basic Catalog:** Follow the current A2UI docs for its `--a2ui-*` custom properties. Read the
  installed renderer's stylesheet or version-matched docs to confirm each property. Use Pantoken's
  `--instui-*` custom properties only after resolving a semantically matching, correctly typed token
  from `@pantoken/tokens`. Load `@pantoken/css` so those tokens are defined. Keep mappings scoped
  when the app needs multiple themes; don't hard-code colors or invent property names.
- **Native clients:** Use Pantoken's existing target output for the host:
  `pantoken generate flutter`, `compose`, or `swift`, as appropriate. Follow the A2UI renderer's
  native theme API; CSS custom properties don't apply to native views.
- **Icons:** For surrounding web UI, use `@pantoken/web-components` or `@pantoken/icons`. For icons
  inside an A2UI surface, verify the selected catalog's icon API; don't invent icon props.

## 4. Extend only when requested

If the user explicitly requests a different custom catalog, follow A2UI's
[catalog guide](https://a2ui.org/guides/defining-a-catalog/) and the host renderer's registration
API. Preserve strict property allowlists, avoid raw HTML and URL-bearing props, and don't add
executable catalog functions without an explicit design and security review. A catalog schema is
not an authorization boundary; the host must authorize action effects.

## 5. Verify

Run the host app's relevant type checks and tests. Verify the theme in each supported color scheme,
including contrast, keyboard behavior, and focus visibility. Confirm every `--instui-*` reference
exists in the installed token package and every `--a2ui-*` property matches the installed A2UI
renderer version.

## References

- [A2UI v1.0 protocol](https://a2ui.org/specification/v1.0-a2ui/)
- [A2UI SDKs](https://a2ui.org/concepts/sdks/)
- [A2UI client integration](https://a2ui.org/guides/client-integration/)
- [A2UI catalog guide](https://a2ui.org/guides/defining-a-catalog/)
