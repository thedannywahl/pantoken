# @pantoken/interactions

## 0.3.0

### Minor Changes

- 853659c: Add arbitrary maximum values and InstUI-compatible animation support to ProgressBar and
  ProgressCircle.

  Both components now expose `--min`, `--value`, and `--max`, keep deprecated `--value-now` and
  `--value-max` aliases, and share their InstUI transition rules through the transition plugin.
  ProgressCircle also exposes `--animation-delay`, keeps the deprecated `-should-animate-on-mount` and
  `-shold-animate-on-mount` aliases, and uses the same timeout behavior in plain HTML and web
  components. The ProgressBar web component retains its meter between attribute updates so
  `should-animate` transitions remain functional.

  Their cssdoc records restrict usage to native `progress` and `meter` elements. Both web components
  render `progress` for zero-based ranges and switch to `meter` when `min` is non-zero.

- 853659c: Add InstUI-compatible timeout dismissal to Alert. Class-based alerts accept a millisecond
  `--timeout`, emit a cancelable `dismiss` event, and remove themselves through the Alert interaction
  bundle, with fades driven by `@pantoken/plugin-transition`. Per-component IIFEs now retain their
  initialization side effects, and the web component shares the same removal behavior directly.

## 0.2.0

### Minor Changes

- 47f3275: abstract component interactions into shared package
- 47f3275: Extract shared spacing and Invoker Commands helpers from `@pantoken/web-components` into a new `@pantoken/interactions` package.

  `@pantoken/web-components` now consumes these helpers from `@pantoken/interactions` with no behavioral change.

### Patch Changes

- 47f3275: Add prepare script to generate component-capabilities.json before publish
