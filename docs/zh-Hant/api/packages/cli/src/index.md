[pantoken](../../../index.md) / cli

# cli

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

`@pantoken/cli` — `pantoken generate <target>`.

Emits native and other non-npm design-token source into a consumer repo — the targets that don't
fit the npm-package model. Supported now: `swift` (with an SPM `Package.swift` manifest stub, so
registry publishing is later a config flip), `android`, `compose`, `flutter`, `wordpress`,
`vanilla`, `drupal`, `swatches`, `rust`, `icon-font`, `pendo`, `jekyll`, `hugo`, and `mintlify`.

## 介面

- [CliArgs](interfaces/CliArgs.md)

## 函式

- [parseArgs](functions/parseArgs.md)
- [run](functions/run.md)
