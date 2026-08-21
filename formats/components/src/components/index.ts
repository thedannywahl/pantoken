/**
 * The `COMPONENTS` registry — every component `Definition` in the EXACT order `componentsCss()`
 * concatenates them. This order is load-bearing (NOT alphabetical): the CSS rule-equivalence net
 * catches any reordering. `icon` and `screen-reader-content` historically ship inside
 * `components.css` and sit at their original concat positions here even though they're authored as
 * `@utility` records under `utilities/`. `view` and `mask` are real components (moved from
 * `utilities/`) — every one of their own modifiers also ships as a global dual utility elsewhere.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { icon } from "../utilities/icon/index.ts";
import { screenReaderContent } from "../utilities/screen-reader-content/index.ts";
import { alert } from "./alert/index.ts";
import { avatar } from "./avatar/index.ts";
import { badge } from "./badge/index.ts";
import { billboard } from "./billboard/index.ts";
import { breadcrumb } from "./breadcrumb/index.ts";
import { breadcrumbLink } from "./breadcrumb/members/link/index.ts";
import { button } from "./button/index.ts";
import { byline } from "./byline/index.ts";
import { calendar } from "./calendar/index.ts";
import { calendarDay } from "./calendar/members/day/index.ts";
import { checkbox } from "./checkbox/index.ts";
import { closeButton } from "./close-button/index.ts";
import { contextView } from "./context-view/index.ts";
import { drawerLayout } from "./drawer-layout/index.ts";
import { drawerLayoutContent } from "./drawer-layout/members/content/index.ts";
import { drawerLayoutTray } from "./drawer-layout/members/tray/index.ts";
import { fileDrop } from "./file-drop/index.ts";
import { formField } from "./form-field/index.ts";
import { formFieldGroup } from "./form-field-group/index.ts";
import { formFieldMessages } from "./form-field-messages/index.ts";
import { heading } from "./heading/index.ts";
import { img } from "./img/index.ts";
import { inPlaceEdit } from "./in-place-edit/index.ts";
import { inputGroup } from "./input-group/index.ts";
import { link } from "./link/index.ts";
import { list } from "./list/index.ts";
import { listItem } from "./list/members/item/index.ts";
import { mask } from "./mask/index.ts";
import { menu } from "./menu/index.ts";
import { menuGroup } from "./menu/members/group/index.ts";
import { menuItem } from "./menu/members/item/index.ts";
import { menuSeparator } from "./menu/members/separator/index.ts";
import { metric } from "./metric/index.ts";
import { modal } from "./modal/index.ts";
import { modalBody } from "./modal/members/body/index.ts";
import { modalFooter } from "./modal/members/footer/index.ts";
import { modalHeader } from "./modal/members/header/index.ts";
import { numberInput } from "./number-input/index.ts";
import { pagination } from "./pagination/index.ts";
import { paginationPage } from "./pagination/members/page/index.ts";
import { pill } from "./pill/index.ts";
import { popover } from "./popover/index.ts";
import { progress } from "./progress/index.ts";
import { progressCircle } from "./progress-circle/index.ts";
import { radio } from "./radio/index.ts";
import { radioInputGroup } from "./radio-input-group/index.ts";
import { rangeInput } from "./range-input/index.ts";
import { rating } from "./rating/index.ts";
import { sideNavBar } from "./side-nav-bar/index.ts";
import { sideNavBarItem } from "./side-nav-bar/members/item/index.ts";
import { simpleSelect } from "./simple-select/index.ts";
import { spinner } from "./spinner/index.ts";
import { table } from "./table/index.ts";
import { tableBody } from "./table/members/body/index.ts";
import { tableCell } from "./table/members/cell/index.ts";
import { tableColHeader } from "./table/members/col-header/index.ts";
import { tableHead } from "./table/members/head/index.ts";
import { tableRow } from "./table/members/row/index.ts";
import { tableRowHeader } from "./table/members/row-header/index.ts";
import { tabs } from "./tabs/index.ts";
import { tabsPanel } from "./tabs/members/panel/index.ts";
import { tabsTab } from "./tabs/members/tab/index.ts";
import { tag } from "./tag/index.ts";
import { text } from "./text/index.ts";
import { textArea } from "./text-area/index.ts";
import { textInput } from "./text-input/index.ts";
import { toggleDetails } from "./toggle-details/index.ts";
import { toggleGroup } from "./toggle-group/index.ts";
import { tooltip } from "./tooltip/index.ts";
import { tray } from "./tray/index.ts";
import { treeBrowser } from "./tree-browser/index.ts";
import { view } from "./view/index.ts";

/** Every component (+ the two in-sheet utilities) in `componentsCss()`'s exact concat order. */
export const COMPONENTS: readonly Definition[] = [
  button,
  alert,
  badge,
  pill,
  tag,
  avatar,
  tabs,
  tabsTab,
  tabsPanel,
  metric,
  byline,
  img,
  table,
  tableHead,
  tableBody,
  tableRow,
  tableCell,
  tableColHeader,
  tableRowHeader,
  link,
  list,
  listItem,
  icon,
  checkbox,
  radio,
  spinner,
  progress,
  menu,
  menuItem,
  menuGroup,
  menuSeparator,
  modal,
  modalHeader,
  modalBody,
  modalFooter,
  breadcrumb,
  breadcrumbLink,
  billboard,
  rating,
  toggleGroup,
  contextView,
  drawerLayout,
  drawerLayoutTray,
  drawerLayoutContent,
  progressCircle,
  pagination,
  paginationPage,
  toggleDetails,
  fileDrop,
  sideNavBar,
  sideNavBarItem,
  treeBrowser,
  calendar,
  calendarDay,
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
  view,
];
