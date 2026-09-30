import { SENTINEL } from "../../lib/sentinel.ts";
import {
  segmentedControl as segmentedControlRaw,
  segmentedControlMembersSegment as segmentedControlSegmentRaw,
} from "../../generated/component-styles.ts";

/** Build segmented-control CSS, replacing the component prefix sentinel. */
export function segmentedControlRules(prefix = "instui-"): string {
  return [segmentedControlRaw, segmentedControlSegmentRaw]
    .map((css) => css.replaceAll(SENTINEL, prefix))
    .join("\n");
}
