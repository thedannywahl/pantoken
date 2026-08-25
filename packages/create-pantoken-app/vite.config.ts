import { extendBase } from "../../vite.config.base.ts";

// No src to build — this package is a thin CLI alias shipping only bin/*.mjs.
export default extendBase({});
