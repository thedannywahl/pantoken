---
"@pantoken/scaffold": patch
---

Cover `scaffold.readme` in the standard extract and translate scripts.

Registering the space in `i18n.config.json` was not enough: `extract` and the six `translate*`
variants each named `cli.scaffold` explicitly, so `vpr i18n:translate:copilot` never reached the
scaffolded-project READMEs even though `check:drift` already gated them. Each script now covers
both spaces and renders the result.
