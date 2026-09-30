import { SENTINEL } from "../../lib/sentinel.ts";
import { segmentedControl as segmentedControlRaw } from "../../generated/component-styles.ts";

/** Build segmented-control CSS, replacing the component prefix sentinel. */
export function segmentedControlRules(prefix = "instui-"): string {
  return segmentedControlRaw.replaceAll(SENTINEL, prefix);
}
