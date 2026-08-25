import { extendBase } from "../../vite.config.base.ts";

// No src to build — this package is a thin CLI alias shipping only bin/*.mjs. Not run
// (bin/*.mjs ships as-is), but every package needs a build command for the task graph.
export default extendBase({ run: { tasks: { build: { command: "true" } } } });
