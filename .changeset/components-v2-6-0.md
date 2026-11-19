---
"@pantoken/components": minor
---

Add Banner component and migrate sideNav to globalNav with deprecation

- Add new Banner component with size variants (compact, relaxed) and color themes (sea, violet)
- Apply typography tokens from instructure-design-tokens v2.6.0
- Add globalNav component with sideNav functional deprecation alias for backward compatibility
- Update Alert, Pill, Options, and SegmentedControl with v2.6.0 token changes
- All component tests verified (722 tests passing)
