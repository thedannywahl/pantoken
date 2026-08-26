---
"@pantoken/sd-config": patch
---

Publish `@pantoken/sd-config` publicly. It was previously marked private even though
`@pantoken/flutter`, `@pantoken/android`, `@pantoken/compose`, and `@pantoken/swift` all depend on it
at runtime, so installing any of them (including via the `@pantoken/pantoken` meta package) failed
with a 404 resolving `@pantoken/sd-config` from the npm registry.
