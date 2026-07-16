# Changesets

pantoken now uses Changesets for release metadata, version bumps, and changelog generation.

## Command map (vp task -> underlying command)

- `vp run changeset:add` -> `vpx changeset`
- `vp run release:status` -> `vpx changeset status --verbose`
- `vp run release:version` -> `vpx changeset version`
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
3. Commit the versioning changes and create/push a release tag (`vX.Y.Z` or prerelease like `vX.Y.Z-beta.0`).
4. The GitHub release workflow publishes packages from that tag.

## Prereleases

- Start prerelease mode with `vp run release:pre:enter`.
- Exit prerelease mode with `vp run release:pre:exit`.
- Tag conventions drive npm dist-tags in CI:
  - `-alpha.N` -> `alpha`
  - `-beta.N` -> `beta`
  - `-rc.N` -> `rc`
  - other prerelease tags -> `next`
  - stable tags -> `latest`
