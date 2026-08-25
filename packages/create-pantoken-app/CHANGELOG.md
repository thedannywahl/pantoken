# create-pantoken-app

## 0.2.0

### Minor Changes

- 8aa88bb: Add `create-pantoken-app`, a flat-name npm alias for `@pantoken/scaffold` so `npm create
  pantoken-app` (and `npm init pantoken-app`) work the way npm's `create-*` convention expects.
  Same CLI and platforms as `npx @pantoken/scaffold <platform>`.

### Patch Changes

- 8aa88bb: Simplify the README: a shorter blurb, `## Getting started` heading, and a
  single `npx create-pantoken-app <platform>` command instead of a hard-coded
  example, plus a link to the full docs.
- 8aa88bb: Reduce CLI complexity and clone-group duplication in the create/app bootstrap commands, and clean up audit/workspace-discovery friction in fallow config.
  
  Also includes non-breaking internal refactors in supporting CSS and rehype helper paths that remove duplicate-block findings from quality checks.
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/scaffold@0.3.0
