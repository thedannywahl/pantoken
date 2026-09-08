---
"@pantoken/translation-adapters": patch
---

Phase 0 spike (localization-engine plan): added an OpenAI-compatible `POST /v1/chat/completions` shim
(`src/shim.ts`) over the CLI-agent adapters (`claude -p`/`agy -p`/`copilot -p`), so an off-the-shelf
tool expecting an OpenAI-shaped API can run on plans already paid for. Includes a per-profile circuit
breaker (`ProfileBreaker`) that rotates to the next agent after `maxConsecutiveFailures` and
self-resets after `resetTimeoutMs`, and a `pantoken_provider` response field naming which profile
produced each result (rotation can mix providers within one batch).

Also fixes a real defect: `spawnPrompt` had no timeout or kill — a wedged CLI agent hung the caller
forever. Added an optional `timeoutMs` option that kills the child and rejects once elapsed; existing
4-argument call sites are unaffected.

This does not settle whether driving a subscription CLI programmatically for bulk work is within
provider ToS — the existing translation wrappers already do this today, so the shim is a new
transport for that behavior, not a new category of it, but the determination itself is a
product/legal decision outside this change's scope.
