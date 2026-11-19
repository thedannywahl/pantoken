---
"@pantoken/plugin-kit": patch
---

Refactor Promise patterns to use Promise.withResolvers()

Refactor 2 Promise patterns in packages/plugin-kit/src/sandbox.ts to use Promise.withResolvers():

- runInThread() function (lines ~82-100): Separates promise creation from resolution
- runInProcess() function (lines ~116-157): Improves clarity for event-driven setup

Promise.withResolvers() (ES2024) is the modern standard API that returns {promise, resolve, reject}, making it clearer when promise resolution is deferred to event handlers or callbacks. This improves code readability and reduces nesting compared to new Promise((resolve, reject) => ...).
