---
"@pantoken/icon-font": patch
"@pantoken/plugin-prune-custom-props": patch
"@pantoken/demo": patch
---

Refactor internal functions to reduce cognitive complexity. `svgToGlyphPath` extracts the ClipperLib stroke-offset loop into `strokeSubpathsToFilled`; `OnceExit` extracts the transitive-dependency fixpoint into `expandTransitiveDeps`; the demo runner extracts `handleObservedBodyResize`, `shouldLatchUserResize`, `settleResizeState`, and `handlerForMessage` from their inline call sites.
