/**
 * The `COMPONENTS` registry — every component `Definition` in the EXACT order `componentsCss()`
 * concatenates them. This order is load-bearing (NOT alphabetical): the CSS rule-equivalence net
 * catches any reordering. The three icon/overlay utilities that historically ship inside
 * `components.css` (`icon`, `mask`, `screen-reader-content`) sit at their original concat positions
 * here even though they're authored as `@utility` records under `utilities/`.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { icon } from "../utilities/icon.ts";
import { mask } from "../utilities/mask.ts";
import { screenReaderContent } from "../utilities/screen-reader-content.ts";
import { alert } from "./alert.ts";
import { avatar } from "./avatar.ts";
import { badge } from "./badge.ts";
import { billboard } from "./billboard.ts";
import { breadcrumb } from "./breadcrumb.ts";
import { button } from "./button.ts";
import { byline } from "./byline.ts";
import { calendar } from "./calendar.ts";
import { checkbox } from "./checkbox.ts";
import { closeButton } from "./close-button.ts";
import { contextView } from "./context-view.ts";
import { fileDrop } from "./file-drop.ts";
import { formField } from "./form-field.ts";
import { formFieldGroup } from "./form-field-group.ts";
import { formFieldMessages } from "./form-field-messages.ts";
import { heading } from "./heading.ts";
import { img } from "./img.ts";
import { inPlaceEdit } from "./in-place-edit.ts";
import { inputGroup } from "./input-group.ts";
import { link } from "./link.ts";
import { list } from "./list.ts";
import { menu } from "./menu.ts";
import { metric } from "./metric.ts";
import { modal } from "./modal.ts";
import { numberInput } from "./number-input.ts";
import { pagination } from "./pagination.ts";
import { pill } from "./pill.ts";
import { popover } from "./popover.ts";
import { progress } from "./progress.ts";
import { progressCircle } from "./progress-circle.ts";
import { radio } from "./radio.ts";
import { radioInputGroup } from "./radio-input-group.ts";
import { rangeInput } from "./range-input.ts";
import { rating } from "./rating.ts";
import { sideNavBar } from "./side-nav-bar.ts";
import { simpleSelect } from "./simple-select.ts";
import { spinner } from "./spinner.ts";
import { table } from "./table.ts";
import { tabs } from "./tabs.ts";
import { tag } from "./tag.ts";
import { text } from "./text.ts";
import { textArea } from "./text-area.ts";
import { textInput } from "./text-input.ts";
import { toggleDetails } from "./toggle-details.ts";
import { toggleGroup } from "./toggle-group.ts";
import { tooltip } from "./tooltip.ts";
import { tray } from "./tray.ts";
import { treeBrowser } from "./tree-browser.ts";
import { truncate } from "./truncate.ts";

/** Every component (+ the three in-sheet utilities) in `componentsCss()`'s exact concat order. */
export const COMPONENTS: readonly Definition[] = [
  button,
  alert,
  badge,
  pill,
  tag,
  avatar,
  tabs,
  metric,
  byline,
  img,
  table,
  link,
  list,
  icon,
  checkbox,
  radio,
  spinner,
  progress,
  menu,
  modal,
  breadcrumb,
  billboard,
  rating,
  toggleGroup,
  contextView,
  progressCircle,
  pagination,
  truncate,
  toggleDetails,
  fileDrop,
  sideNavBar,
  treeBrowser,
  calendar,
  popover,
  tray,
  tooltip,
  rangeInput,
  mask,
  screenReaderContent,
  heading,
  text,
  closeButton,
  formField,
  formFieldGroup,
  radioInputGroup,
  formFieldMessages,
  textInput,
  textArea,
  simpleSelect,
  inputGroup,
  numberInput,
  inPlaceEdit,
];
