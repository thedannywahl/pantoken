---
name: use-a2ui
description: Inspect an app's installed A2UI renderer and apply pantoken tokens or icons through its supported theme API. Use for A2UI renderer theming or native token output, not transport-only or generic pantoken tasks.
---

# Use pantoken with A2UI

Use this skill when a consumer app combines pantoken with an A2UI renderer. Pantoken supplies
design tokens and icons; A2UI supplies the UI protocol and framework-specific renderers. For
token-only work, reuse the installed A2UI renderer rather than adding a runtime, transport, renderer,
or custom catalog.

## Do not use this skill for

Don't use this skill for A2UI protocol or transport questions that don't involve pantoken, or
generic pantoken styling without A2UI. Use it for custom catalogs only when the user explicitly
requests one.

## 1. Identify the client and versions

Inspect the app's package manifest, lockfile, and installed packages. Identify the actual A2UI
renderer, its protocol version, and how the host framework applies themes. Check the current
[official SDK table](https://a2ui.org/concepts/sdks/) and
[client integration guide](https://a2ui.org/guides/client-integration/) rather than assuming all
frameworks support the same protocol version or styling API. A2UI v1.0 delegates branding to the
renderer; don't put theme properties in v1.0 protocol messages.

## 2. Apply pantoken to the existing renderer

- **Web Basic Catalog:** Follow the current A2UI docs for its `--a2ui-*` custom properties. Read
  the installed renderer's stylesheet or version-matched docs to confirm each property. Use
  pantoken's `--instui-*` custom properties only after resolving a semantically matching,
  correctly typed token from `@pantoken/tokens`. Load `@pantoken/css` so those tokens are defined.
  Keep the mapping scoped when the app needs multiple themes; don't hard-code color values or
  invent A2UI or InstUI property names.
- **Native clients:** Use pantoken's existing target output for the host: `pantoken generate
  flutter`, `compose`, or `swift`, as appropriate. Follow the A2UI renderer's native theme API;
  CSS custom properties do not apply to native views.
- **Other web frameworks:** Choose the matching official A2UI renderer first, then use its supported
  theming mechanism. Don't assume React-specific setup applies to Lit or Angular.
- **Icons:** For surrounding web UI, use `@pantoken/web-components` or `@pantoken/icons`. For icons
  inside an A2UI surface, verify the selected catalog's icon API; only add a custom component when
  the user asks for one.

## 3. Extend only when requested

If the user asks for a custom A2UI catalog, follow A2UI's
[catalog guide](https://a2ui.org/guides/defining-a-catalog/) and the host renderer's registration
API. A catalog defines agent-facing components and functions; pantoken tokens don't implement those
components or behaviors. Preserve the renderer's accessibility, focus, and interaction contracts.
Handle protocol transports only when explicitly in scope.

## 4. Verify

Run the host app's relevant type checks and tests. Verify the theme in each supported color scheme,
including contrast and keyboard/focus behavior. Confirm every `--instui-*` reference exists in the
installed token package and every `--a2ui-*` property matches the installed A2UI renderer version.

## References

- [A2UI v1.0 protocol](https://a2ui.org/specification/v1.0-a2ui/)
- [A2UI SDKs](https://a2ui.org/concepts/sdks/)
- [A2UI client integration](https://a2ui.org/guides/client-integration/)
- [A2UI catalog guide](https://a2ui.org/guides/defining-a-catalog/)
