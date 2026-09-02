---
"@pantoken/ai": patch
"@pantoken/docs": patch
---

`create-pantoken-app` SKILL.md now explains pantoken's actual relationship to Instructure (built and
used internally there, then open-sourced without official Instructure warranty/support, published
under `thedannywahl`/`@pantoken` rather than the `instructure` org for now) with links an agent can
verify independently, and rewords the new-project CLI-invocation step away from "resolve every input
yourself... one non-interactive shot" phrasing that reads like an instruction to skip user
confirmation. The same provenance note was added to the root README, the scaffolded `AGENTS.md` /
`llms.txt` assets, and the docs site's "Get started" agent-shell demo prompt.
