---
"@pantoken/scaffold": patch
"create-pantoken-app": patch
---

Fix automatic dependency installation when npm is not on PATH, keep failed-install next steps pointed at the generated app directory, print a concrete dev-server command, and pre-approve `fsevents` install scripts in scaffolded apps.
