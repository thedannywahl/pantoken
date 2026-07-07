# Generated output

Several pantoken packages emit files at build time — a stylesheet, a `theme.json`, an embedded token
module. To keep the repo clean and the outputs honest, every package follows one convention and a
workspace task validates the lot.

## The `generated/` convention

Every package that produces a build artifact writes it to a per-package `generated/` directory, and
nothing else lives there. One rule in `.gitignore` covers them all:

```txt
**/generated/
```

So no generated file is committed — a build reproduces it. Two kinds of output land there:

- **Shippable statics** — files a consumer imports, such as `@pantoken/css`'s `style.css` or
  `@pantoken/scss`'s `tokens.scss`. The package's `exports` map keeps the public key
  (`"./style.css"`) but points it at `generated/`, so the consumer API never changes.
- **Build intermediates** — files the package's own source imports and bundles into `dist`, such as
  `@pantoken/tokens`'s vendored JSON. These aren't published on their own; they're compiled in.

## Validating the output

`@pantoken/validate-generated` (a private tool) runs after a build and checks three things:

1. every generator package actually wrote a non-empty `generated/` directory,
2. the `pantoken` CLI emits at least one file for every supported target, and
3. no generated stylesheet drifts from the token IR — `danglingReferences` for self-contained
   sheets, and `unknownReferences` for the bridges that only reference tokens defined elsewhere.

## Commands

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

The validator is also wired into `pnpm run ready`, so drift is caught in the standard gate.
