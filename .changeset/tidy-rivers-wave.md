---
"@pantoken/components": minor
---

`progress-bar` now nests `.value` as a sibling of `.bar` inside the root, replacing the flat `.pfx-progress-value` class — matching how `progress-circle` nests its own `.value` part. Add the new `-render-value-inside` modifier to center `.value` over the track instead of beside it, mirroring InstUI's `ProgressBar` `renderValueInside` prop.
