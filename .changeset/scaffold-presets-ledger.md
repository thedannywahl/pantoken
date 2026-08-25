---
"@pantoken/scaffold": minor
"@pantoken/components": patch
---

Add preset ledger generation to scaffold build pipeline.

- Introduce `scan-presets.ts` script that discovers all packages exporting `./scaffold-preset`
- Generate static `preset-ledger.ts` registry at pre-build time
- Add `@pantoken/components` scaffold-preset export for HTML/CSS projects
- Wire preset scanning into scaffold build/test/check tasks
- Enable Bingo CLI integration with decentralized preset ownership
