import { SENTINEL } from "../../lib/sentinel.ts";
import { skeletonLoader as skeletonLoaderRaw } from "../../generated/component-styles.ts";

/** Build the skeleton loader CSS, replacing the component prefix sentinel. */
export function skeletonLoaderRules(prefix = "instui-"): string {
  return skeletonLoaderRaw.replaceAll(SENTINEL, prefix);
}
