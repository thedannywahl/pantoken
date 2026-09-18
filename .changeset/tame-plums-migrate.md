---
"@pantoken/docs": patch
---

Rework `AgentToolsPage.vue` to use `@pantoken/components` classes (`instui-list`, `instui-view`
modifiers, and the `--gap-*`/`--display-*`/`--m*` global utilities) in place of hand-rolled BEM
flex/grid layout CSS, and remove leftover dead CSS rules from an earlier version of the page.
