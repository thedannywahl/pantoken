---
"@pantoken/cli": patch
---

fix: make `@pantoken/icon-font` an optional peer of `@pantoken/cli`

`@pantoken/icon-font`'s `ttf2woff2` dependency pulls `node-gyp`'s native-build toolchain
(`make-fetch-happen` → `cacache` → deprecated `glob@10.5.0`) into every consumer of `@pantoken/cli`
(and transitively `@pantoken/pantoken` and `create-pantoken-app`), even though only
`pantoken generate icon-font` needs it. `buildIconFont` is now imported lazily, and
`@pantoken/icon-font` is an optional peer dependency — install it yourself if you use the
`icon-font` target.

Also override `node-gyp` to `^13` in this workspace (drops the `make-fetch-happen`/`cacache`/`glob`
chain entirely) to keep our own install free of the deprecated `glob@10.5.0` warning. This only
cleans this monorepo's tree; it doesn't reach consumers who install `@pantoken/icon-font` directly —
see [ttf2woff2#107](https://github.com/nfroidure/ttf2woff2/issues/107) for the upstream fix.
