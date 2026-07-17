# Changesets

pantoken now uses Changesets for release metadata, version bumps, and changelog generation.

## Command map (vp task -> underlying command)

- `vp run changeset:add` -> `vpx changeset`
- `vp run release:status` -> `vpx changeset status --verbose`
- `vp run release:version` -> `vpx changeset version`
- `vp run release:plan:package` -> build publish set from a package tag into `.release-plan.*`
- `vp run release:notes:package` -> generate `release-notes.md` from `.release-plan.json`
- `vp run release:changelog:root` -> regenerate root `CHANGELOG.md` in strict chronological order
- `vp run release:changelog:root:seed` -> one-time bootstrap mode to backfill root `CHANGELOG.md` with synthetic `v0.1.0` entries for packages that do not have package tags yet
- `vp run release:publish` -> `vpx changeset publish`
- `vp run release:pre:enter` -> `vpx changeset pre enter next`
- `vp run release:pre:exit` -> `vpx changeset pre exit`
- `vp run gate:publint` -> `publint` across publishable workspaces
- `vp run gate:attw` -> `attw --pack --profile strict --no-emoji` across publishable workspaces

## Contributor workflow

1. After making a release-impacting change, run `vp run changeset:add`.
2. Select impacted packages and choose the correct bump level.
3. Commit the generated markdown file in `.changeset/` with your PR.

Use `vp run release:status` to inspect pending release state.

## Release workflow

1. Ensure the main branch is green and release-ready (`vp run ready`, `vp run gate:publint`, `vp run gate:attw`).
2. Run `vp run release:version` to apply version/changelog updates.
3. Regenerate the root changelog: `vp run release:changelog:root`.
4. Commit the versioning/changelog changes and create/push package tags (`@pantoken/pkg@vX.Y.Z`).
5. The package release workflow computes the dependency-aware publish set, publishes each package,
   and creates GitHub release notes from package changelogs.

## Package release tags

- Canonical format: `@pantoken/pkg@vX.Y.Z`.
- Publish scope: target package plus required workspace dependents.
- Meta package policy: `@pantoken/pantoken` is auto-included when the release touches its exported
  dependency surface.
- Root `CHANGELOG.md` is generated as a strict chronological feed (newest to oldest) using package
  release tags and package changelog sections.

## Prereleases

- Start prerelease mode with `vp run release:pre:enter`.
- Exit prerelease mode with `vp run release:pre:exit`.
- Tag conventions drive npm dist-tags in CI:
  - `-alpha.N` -> `alpha`
  - `-beta.N` -> `beta`
  - `-rc.N` -> `rc`
  - other prerelease tags -> `next`
  - stable tags -> `latest`
