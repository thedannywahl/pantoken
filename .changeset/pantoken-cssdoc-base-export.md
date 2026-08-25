---
"@pantoken/pantoken": patch
---

Ship a `./cssdoc-base.json` export alongside the generated VS Code custom-data files, so tools that
integrate with the `cssdoc` ecosystem (e.g. the `cssdoc.cssdoc-vscode` extension) can resolve
pantoken's base cssdoc schema from the published package.
