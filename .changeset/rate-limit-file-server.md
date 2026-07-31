---
"@pantoken/vite-workspace-orchestrator": patch
---

Add rate limiting and in-memory file caching to file server middleware to mitigate CWE-770 (allocation of resources without limits). Implements per-IP token bucket rate limiter (100 tokens capacity, 50 tokens/sec refill) and LRU file cache (50 files, 5 minute TTL) to prevent denial-of-service attacks and reduce expensive filesystem operations.
