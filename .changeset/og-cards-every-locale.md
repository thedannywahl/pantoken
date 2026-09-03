---
"@pantoken/docs": patch
---

Every docs locale now gets its own social card. `gen-og.ts` renders a card for all 44 locales instead
of only the Latin-script ones: the wordmark comes from `@pantoken/plugin-logos`' vendored asset set
(so non-Latin scripts get their purpose-drawn mark), RTL locales (`ar`, `fa`, `he`) mirror the whole
card with the ring field in the bottom-left corner and the text anchored right, and non-Latin text
renders in a Noto script face fetched from a pinned `google/fonts` commit, SHA-256 verified, and
cached under the git-ignored `docs/assets/fonts/noto/`. `og:image` consequently points at
`og-<locale>.png` for every non-root locale.

The localized nav wordmarks (`docs/public/logo-{light,dark}-<script>.svg`) are now staged from the
same plugin assets by `docs:assets` rather than being hand-placed in a git-ignored directory, so a
fresh clone and CI render them too.
