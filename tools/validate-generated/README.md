# @pantoken/validate-generated

Validate pantoken's generated output. Run it after the workspace is built, so every package's
`generate` and `embed` step has already written its `generated/` dir. It's the pantoken analog of a
drift gate: it fails the build if any generator produced nothing, if the `pantoken` CLI can't emit a
supported target, or if a generated stylesheet references an `--instui-*` token the IR doesn't define.

Internal build tooling. Not published.

## Usage

```sh
# after `vp run -r build`:
pnpm --filter @pantoken/validate-generated validate
# or directly:
node tools/validate-generated/index.ts
```

It prints a `✓`/`✗` line per check and exits non-zero if anything fails.

## What it checks

- **Generator output** — every generator package (formats, platforms, and renderers, plus
  `@pantoken/ai`) wrote a non-empty `generated/` dir.
- **CLI targets** — `pantoken generate <target>` emits at least one file for every supported target
  (swift, android, compose, flutter, wordpress, vanilla, drupal, swatches, rust, icon-font, pendo,
  jekyll, and hugo), run into a temp dir.
- **Reference integrity** — no generated stylesheet drifts from the token IR. Self-contained sheets
  (`formats/css`, `renderers/pendo`) must have no dangling `var()` references
  (`danglingReferences`); bridge sheets (`renderers/bootstrap`, `shadcn`, `docusaurus`, `vitepress`)
  must reference only real tokens (`unknownReferences`). Both checkers come from `@pantoken/utils`.

## Related

- The drift checkers `danglingReferences` and `unknownReferences` live in `@pantoken/utils`.

## License

MIT
