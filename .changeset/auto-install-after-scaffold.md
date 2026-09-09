---
"@pantoken/scaffold": minor
"@pantoken/ai": minor
"create-pantoken-app": patch
---

feat: scaffold CLIs install dependencies automatically

`pantoken-scaffold`, `create-pantoken-app`, and `pantoken-ai scaffold` now run the detected package
manager's install command right after writing the project, so the printed "Next steps" collapse to
the one remaining manual action — starting the dev server (`cd <dir> && <pm> run dev`) — instead of
also asking the user to `cd` and install by hand.

Pass `--no-install` to skip the automatic install and keep the previous cd/install/dev-server
breakdown (e.g. for scripted/offline use).
