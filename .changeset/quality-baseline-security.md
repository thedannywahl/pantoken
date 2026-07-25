---
"@pantoken/vite-workspace-orchestrator": patch
"@pantoken/web-components": patch
"@pantoken/demo": patch
---

Resolve Snyk Code (SAST) findings and two latent web-component bugs.

- File server: contain resolved paths inside `serveDir` (path-traversal fix).
- Demo runner and docs theme: target the host origin instead of `"*"`, drop cross-origin messages, and sanitize highlighted code before `innerHTML` (DOM-XSS fix).
- Web components: scope the `withSpacing` observer to the spacing attributes so it no longer self-triggers, and route Invoker `command`/`commandfor` through a per-target handler map so drilldown and shared-document cases resolve correctly.
