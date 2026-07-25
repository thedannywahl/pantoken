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
