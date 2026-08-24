---
"@pantoken/scaffold": patch
---

Every scaffold platform (`web`, `react`, `next`) now writes `.vscode/settings.json` (`html.customData`/`css.customData` pointing at `@pantoken/pantoken`'s shipped custom-data JSON) and `.vscode/extensions.json` (recommending `cssdoc.cssdoc-vscode`), and adds `@pantoken/pantoken` as a devDependency so those paths resolve after install.
