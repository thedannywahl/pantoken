---
"@pantoken/components": minor
"@pantoken/interactions": minor
"@pantoken/plugin-transition": minor
"@pantoken/web-components": minor
---

Add arbitrary maximum values and InstUI-compatible animation support to ProgressBar and
ProgressCircle.

Both components now expose `--value` and `--max`, keep deprecated `--value-now` and `--value-max`
aliases, and share their InstUI transition rules through the transition plugin. ProgressCircle also
exposes `--animation-delay`, keeps the deprecated `-should-animate-on-mount` and
`-shold-animate-on-mount` aliases, and uses the same timeout behavior in plain HTML and web
components. The ProgressBar web component retains its meter between attribute updates so
`should-animate` transitions remain functional.
