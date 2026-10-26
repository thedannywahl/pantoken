# @pantoken/upstream-diff

The upstream-drift gate. It projects the built token IR (every theme, plus the icon set) into a
compact, committed manifest, then classifies what an Instructure UI bump changed against that
baseline — added, removed, retyped, and re-referenced tokens, and added, removed, renamed, or changed
icons — into review buckets, and flags the subset that needs a human.

```sh
vp run upgrade:check   # diff current build vs baseline; write the report; fail on unblessed drift
vp run upgrade:bless   # rewrite the baseline from the current build (accept a reviewed bump)
```

The baseline (`baseline/manifest.json`) is committed and behaves like a lockfile: the gate fails when
it doesn't match the current build, so a PR that bumps the upstream pin must bless the baseline in the
same change. That surfaces every token and icon delta in the PR diff and in the printed report
(`generated/report.md`, `report.json`).

Reference integrity (dangling / unknown `var()` refs) is gated separately by
`@pantoken/validate-generated`, so this tool stays focused on token and icon drift.

Weekly maintenance prepares deprecations before blessing. `lifecycle.ts` compares full base-build
snapshots, resolves removed references to literals, and preserves each theme's registration and
removed icon artwork. It never guesses a replacement or freezes an unresolved reference. New shims
retire after two upstream minor increments or the next upstream major, whichever comes first;
existing earlier deadlines remain valid. Missing or ambiguous source evidence excludes the update.

The final baseline still has to satisfy the independent drift and reference gates. Automatically
passing tests do not establish visual equivalence; the classified change report remains reviewable.
