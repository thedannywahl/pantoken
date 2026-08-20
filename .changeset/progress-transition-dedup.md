---
"@pantoken/components": minor
"@pantoken/plugin-transition": major
"@pantoken/plugin-stacking": major
---

Move all CSS generation for `transition` and `stacking` fully into `@pantoken/components`' own
utilities, and port `@pantoken/plugin-visual-debug`'s `-with-visual-debug` outline as a new
`@pantoken/components` utility.

- `@pantoken/components`: the `transition` utility now registers local `--duration` (`300ms`) and
  `--timing` (`ease-in-out`) `@property`-backed custom properties (override either to retime every
  transition), matching the unnamespaced-local-property convention other components/utilities already
  use (e.g. `progress`'s `--value`/`--min`/`--max`) and fixing a prior token-drift bug where the
  utility referenced `--instui-transition-*` custom properties without ever defining them. Added a new
  `visual-debug` utility (`-with-visual-debug`), ported from `@pantoken/plugin-visual-debug`. The
  `prose` rule's default `scope` changed from `.pantoken-prose` to `:where(body)`, so importing
  `prose.css` applies automatically — no wrapper class required — the same way `base.css` does;
  pass `options.scope` (unchanged) to target a different content root instead. Also moved the
  `progress`/`progress-circle` mount and value transition CSS out of a shared, hand-duplicated helper
  and into each component's own `.css` source (matching `popover`/`tray`); the generated
  `progressCss`/`progressCircleCss` output is unchanged.
- `@pantoken/plugin-transition` (**breaking**): narrowed to a tokens-only plugin. It no longer emits
  the `.instui-transition` base rule or `fade`/`scale`/`slide-*` state classes, and no longer ships a
  standalone `transition.css` (the `./transition.css` export, and the `prefix`/`position` options, are
  removed) — that CSS now lives exclusively in `@pantoken/components`' own `transition` utility. The
  plugin still bakes `--instui-transition-duration`/`--instui-transition-timing` tokens for consumers
  using the lower-level `@pantoken/css`/`@pantoken/tokens` pipeline directly.
- `@pantoken/plugin-stacking` (**breaking**): narrowed to a tokens-only plugin. It no longer emits
  `.instui-stack-<level>` classes and no longer ships a standalone `stacking.css` (the `./stacking.css`
  export is removed) — those classes now live exclusively in `@pantoken/components`' own `stacking`
  utility. The plugin still bakes the resolved `--instui-stacking-<level>` tokens.
