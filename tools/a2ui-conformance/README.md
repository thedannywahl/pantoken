# A2UI framework conformance

This private consumer fixture validates Pantoken's A2UI 1.0 Universal catalog using the official
React and Angular surface renderers. Imports resolve through package exports and built output;
there are no source aliases or mocked renderer services.

## Verified versions

| Renderer               | Host                                      | Shared core             |
| ---------------------- | ----------------------------------------- | ----------------------- |
| `@a2ui/react` 0.15.0   | React / React DOM 19.3.1, Strict Mode     | `@a2ui/web_core` 0.15.0 |
| `@a2ui/angular` 0.14.0 | Angular 21.2.5, zoneless change detection | `@a2ui/web_core` 0.15.0 |

These are Universal, Lit-backed components. The Angular renderer's peer range doesn't include
Angular 22; the general Pantoken Angular compatibility matrix doesn't establish A2UI support.
The SDK retains legacy internal names, but both fixtures require a protocol 1.0 surface.

## Run

From the repository root:

```sh
vp install
cd tools/a2ui-conformance
vp exec playwright install --with-deps chromium firefox webkit
cd ../..
vp run test:a2ui
```

The root task builds workspace packages first. For a focused rerun after built output is current:

```sh
vp run @pantoken/a2ui-conformance#build
vp run @pantoken/a2ui-conformance#check:browser
```

Playwright owns a production preview bound to IPv4 loopback on strict port 5198. It never reuses or
kills an existing server. A busy port fails explicitly. Failed runs retain traces in `test-results/`.
CI installs browser engines and runs the same suite as a required job.

## Coverage and limits

Component cases derive from every runtime export and the published catalog's required properties.
Each generated case is schema-validated before mounting; unsupported schema shapes fail explicitly.
New components don't require maintaining another allowed-component list.

The shared tests cover nested Universal children, cross-catalog Basic children, incremental model
updates, input identity and focus, typed edits, resolved action context, teardown/remount, keyboard
tabs, native dialog/popover dismissal, and desktop/mobile controls in light/dark color schemes with
reduced motion. They run in Chromium, Firefox, and WebKit.

SSR, hydration, arbitrary native framework children, other framework versions, visual fidelity
comparisons, contrast measurement, and screen-reader testing aren't covered. The theme checks prove
controls render with styles and fit their viewport, not that every component respects every user
preference. A full automatica11y/Guidepup assessment has not been run; these tests aren't a WCAG
assessment.

Both hosts initialize before constructing surfaces because Angular installs a signal backend.
Angular attaches surfaces through the renderer service's public surface-group API; no private
service fields are overridden.
