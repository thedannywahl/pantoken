# CHANGELOG

## 0.1.1

### Patch Changes

- 2e5bb88: Final refactor of syntaxFromChain to eliminate high-complexity threshold by extracting token processing logic into processTokenInChain helper function.
- 2e5bb88: Further refactor build-css-api by extracting micro-functions for syntax inference and token chain traversal to reduce cyclomatic complexity of remaining functions.
- 2e5bb88: Refactor build-css-api functions (inferSyntax, syntaxFromChain, resolveSyntax, resolveToken, makeImportSnippet) to reduce cyclomatic complexity by extracting helper functions and simplifying conditional logic.

## 0.1.0

### Added

- Initial release of @pantoken/docs.
