---
"@pantoken/plugin-kit": minor
---

Move the Node-only plugin-sandboxing API (`runPluginHook`, `isSandboxed`, `SandboxedPluginEntry`) to
a new `@pantoken/plugin-kit/sandbox` subpath. The main entry (`definePlugin`, `extendPlugin`,
`mergePlugin`, `checkPlugins`, ...) no longer pulls in `node:child_process`/`node:worker_threads`,
fixing a Vite "Module has been externalized for browser compatibility" failure for browser-facing
consumers like `@pantoken/plugin-simple-icons`. Update imports of the sandbox API to the new subpath.
