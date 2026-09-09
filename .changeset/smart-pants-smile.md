---
"@pantoken/scaffold": patch
"create-pantoken-app": patch
---

Fix automatic dependency installation when npm is not on PATH, keep failed-install next steps pointed at the generated app directory, and print a concrete dev-server command.
