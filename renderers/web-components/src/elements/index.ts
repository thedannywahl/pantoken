/**
 * The registry of element definitions. {@link DEFINITIONS} lists them in the canonical registration
 * order (load-bearing: nesting elements like `date-input` assume `calendar` and `date-time-input`
 * assume `date-input` are defined, and the parity test asserts this exact order). `register()` in the
 * package barrel builds the shared context once and calls each definition's `define`.
 *
 * @module
 */
import type { ElementDefinition } from "../lib/context.ts";
import { alert } from "./alert.ts";
import { avatar } from "./avatar.ts";
import { badge } from "./badge.ts";
import { button } from "./button.ts";
import { calendar } from "./calendar.ts";
import { contextView } from "./context-view.ts";
import { dateInput } from "./date-input.ts";
import { dateTimeInput } from "./date-time-input.ts";
import { drawerLayout } from "./drawer-layout.ts";
import { drilldown } from "./drilldown.ts";
import { icon } from "./icon.ts";
import { iconButton } from "./icon-button.ts";
import { img } from "./img.ts";
import { inPlaceEdit } from "./in-place-edit.ts";
import { metric } from "./metric.ts";
import { modal } from "./modal.ts";
import { pages } from "./pages.ts";
import { pill } from "./pill.ts";
import { popover } from "./popover.ts";
import { progress } from "./progress.ts";
import { progressCircle } from "./progress-circle.ts";
import { rating } from "./rating.ts";
import { sideNavBar } from "./side-nav-bar.ts";
import { spinner } from "./spinner.ts";
import { tag } from "./tag.ts";
import { toggleButton } from "./toggle-button.ts";
import { tooltip } from "./tooltip.ts";
import { tray } from "./tray.ts";
import { treeBrowser } from "./tree-browser.ts";
import { truncate } from "./truncate.ts";

/**
 * Every element definition, in the canonical registration order. The order is load-bearing:
 * `date-input` renders a nested `calendar` and `date-time-input` renders a nested `date-input`, and
 * the `ELEMENTS` tuple / the register-order test both derive from this list.
 */
export const DEFINITIONS: readonly ElementDefinition[] = [
  icon,
  button,
  alert,
  badge,
  pill,
  tag,
  avatar,
  spinner,
  progress,
  metric,
  rating,
  progressCircle,
  iconButton,
  toggleButton,
  truncate,
  img,
  sideNavBar,
  treeBrowser,
  calendar,
  tooltip,
  modal,
  contextView,
  popover,
  tray,
  inPlaceEdit,
  drilldown,
  pages,
  drawerLayout,
  dateInput,
  dateTimeInput,
];
