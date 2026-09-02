# CSS API reference

The CSS API reference covers pantoken's class-based component layer: components, utilities, global rules, and declarations built on the token system.

## Components

| Name | Class | Summary |
| --- | --- | --- |
| [agent-shell](/en-AU/api/css/agent-shell.md) | `.instui-agent-shell` | A surface container for AI agents. |
| [alert](/en-AU/api/css/alert.md) | `.instui-alert` | An inline message with a status colour bar and a masked status glyph from the shared icon set. |
| [avatar](/en-AU/api/css/avatar.md) | `.instui-avatar` | A user avatar showing initials or an image, circular by default. |
| [badge](/en-AU/api/css/badge.md) | `.instui-badge` | A small count or status dot placed over a target's corner. |
| [banner](/en-AU/api/css/banner.md) | `.instui-banner` | A dismissible, iconed message surface for page-level or in-context announcements. |
| [billboard](/en-AU/api/css/billboard.md) | `.instui-billboard` | A large empty-state or call-to-action block: a hero icon or image, a heading, and a message. |
| [breadcrumb](/en-AU/api/css/breadcrumb.md) | `.instui-breadcrumb` | A breadcrumb trail with separators; the last crumb is the current page. |
| [breadcrumb.link](/en-AU/api/css/breadcrumb.link.md) | `li` | A crumb (InstUI `Breadcrumb.Link`), an `&lt;li&gt;` in the parent's `&lt;ol&gt;`; the last one is the current page. |
| [button](/en-AU/api/css/button.md) | `.instui-button` | An accessible action control, styled from the token palette; primary by default. |
| [byline](/en-AU/api/css/byline.md) | `.instui-byline` | A media object: a hero figure beside a title and description. |
| [calendar](/en-AU/api/css/calendar.md) | `.instui-calendar` | A static month grid with navigation, weekday headers, and day cells. |
| [calendar.day](/en-AU/api/css/calendar.day.md) | `.day` | A day cell (InstUI `Calendar.Day`); `-today`, `-selected`, and `-outside-month` mark its state. |
| [card](/en-AU/api/css/card.md) | `.instui-card` | A surface container that accepts arbitrary content. |
| [checkbox](/en-AU/api/css/checkbox.md) | `.instui-checkbox` | A native checkbox and its label, or a switch via `-variant-toggle`. |
| [close-button](/en-AU/api/css/close-button.md) | `.instui-close-button` | A transparent icon button that draws its own × glyph, in three sizes plus an inverse variant. |
| [context-view](/en-AU/api/css/context-view.md) | `.instui-context-view` | An elevated callout with a caret, positionable on any side; works as a native `[popover]`. |
| [drawer-layout](/en-AU/api/css/drawer-layout.md) | `.instui-drawer-layout` | A split layout with a collapsible side tray and a primary scrollable content pane. |
| [drawer-layout.content](/en-AU/api/css/drawer-layout.content.md) | `.content` | The primary content pane that fills remaining space beside the tray. |
| [drawer-layout.tray](/en-AU/api/css/drawer-layout.tray.md) | `.tray` | The side panel beside main content, with optional overlay and tray-like surface modifiers. |
| [file-drop](/en-AU/api/css/file-drop.md) | `.instui-file-drop` | A file dropzone with hover, accepted, and rejected states. |
| [form-field](/en-AU/api/css/form-field.md) | `.instui-form-field` | A form-field wrapper: a label, its controls, and inline, required, or readonly layouts. |
| [form-field-group](/en-AU/api/css/form-field-group.md) | `.instui-form-field-group` | A `&lt;fieldset&gt;` group with a legend, a column or inline layout, and configurable spacing. |
| [form-field-messages](/en-AU/api/css/form-field-messages.md) | `.instui-form-field-messages` | Field help and validation messages — hint, error, success, and screen-reader-only — with a glyph on error and success. |
| [heading](/en-AU/api/css/heading.md) | `.instui-heading` | Heading typography from `-level-h1` to `-level-h6`. |
| [img](/en-AU/api/css/img.md) | `.instui-img` | A styled `&lt;img&gt;` with display, crop, and effect modifiers that stack. |
| [in-place-edit](/en-AU/api/css/in-place-edit.md) | `.instui-in-place-edit` | A [contenteditable] that reads as text until focused, then shows input chrome. |
| [input-group](/en-AU/api/css/input-group.md) | `.instui-input-group` | A facade around a text input with leading and trailing icon slots. |
| [link](/en-AU/api/css/link.md) | `.instui-link` | A styled hyperlink with sizes, an inverse variant for dark backgrounds, and inline or unstyled forms. |
| [list](/en-AU/api/css/list.md) | `.instui-list` | A list with token-driven item spacing. |
| [list.item](/en-AU/api/css/list.item.md) | `.instui-list` | A list item (InstUI `List.Item`). |
| [mask](/en-AU/api/css/mask.md) | `.instui-mask` | An in-flow overlay that fills its positioned parent and centres its content — e.g. a spinner over a card. For a modal, prefer a native `&lt;dialog&gt;` (its `::backdrop` is the mask). Every one of these modifiers is also available globally (bare, or chained onto any other component) — see the `mask` global utility. |
| [menu](/en-AU/api/css/menu.md) | `.instui-menu` | A dropdown surface of items, groups, and separators. |
| [menu.group](/en-AU/api/css/menu.group.md) | `.group` | A labelled group heading (InstUI `Menu.Group`/`Menu.ItemGroup`). |
| [menu.item](/en-AU/api/css/menu.item.md) | `.item` | A menu entry (InstUI `Menu.Item`); add -disabled, -highlighted, or -active/[aria-checked]. |
| [menu.separator](/en-AU/api/css/menu.separator.md) | `.separator` | A divider rule between items (InstUI `Menu.Separator`). |
| [metric](/en-AU/api/css/metric.md) | `.instui-metric` | A labelled statistic — a large value over a caption. |
| [modal](/en-AU/api/css/modal.md) | `.instui-modal` | A dialog surface (works on a native &lt;dialog&gt;); header/body/footer parts. |
| [modal.body](/en-AU/api/css/modal.body.md) | `.body` | The content region (InstUI `Modal.Body`); a lone `&lt;img&gt;` goes full-bleed. |
| [modal.footer](/en-AU/api/css/modal.footer.md) | `.footer` | The actions row (InstUI `Modal.Footer`). |
| [modal.header](/en-AU/api/css/modal.header.md) | `.header` | The title row (InstUI `Modal.Header`). |
| [number-input](/en-AU/api/css/number-input.md) | `.instui-number-input` | A number-input facade with a +/- spinner column. |
| [pagination](/en-AU/api/css/pagination.md) | `.instui-pagination` | Page navigation: numbered pages, first, previous, next, and last arrows, and an ellipsis for gaps. |
| [pagination.page](/en-AU/api/css/pagination.page.md) | `.page` | A page link or button (InstUI `Pagination.Page`); the current page carries `[aria-current]`. |
| [pill](/en-AU/api/css/pill.md) | `.instui-pill` | A compact status label; add a leading glyph with the shared `-icon-&lt;name&gt;` form. |
| [popover](/en-AU/api/css/popover.md) | `.instui-popover` | An elevated surface for a native `[popover]`, positioned with CSS anchor positioning. |
| [progress](/en-AU/api/css/progress.md) | `.instui-progress` | A determinate progress bar with a coloured meter, sizes, and an optional value label. |
| [progress-circle](/en-AU/api/css/progress-circle.md) | `.instui-progress-circle` | A circular progress ring driven by `--value` and `--value-max` custom properties. |
| [radio](/en-AU/api/css/radio.md) | `.instui-radio` | A native radio button and its label. |
| [radio-input-group](/en-AU/api/css/radio-input-group.md) | `.instui-radio-input-group` | A single-select radio `&lt;fieldset&gt;`, plain or as a connected segmented toggle. |
| [range-input](/en-AU/api/css/range-input.md) | `.instui-range-input` | A styled range slider with an inverse value bubble. |
| [rating](/en-AU/api/css/rating.md) | `.instui-rating` | A star rating with filled and empty glyphs and an optional numeric label. |
| [side-nav-bar](/en-AU/api/css/side-nav-bar.md) | `.instui-side-nav-bar` | A vertical navigation rail of icon-over-label items, with a minimized icons-only mode. |
| [side-nav-bar.item](/en-AU/api/css/side-nav-bar.item.md) | `.item` | A navigation entry (InstUI `SideNavBar.Item`); `-selected` marks the active one. |
| [simple-select](/en-AU/api/css/simple-select.md) | `.instui-simple-select` | A styled native `&lt;select&gt;` with a caret, matching the text-input states and sizes. |
| [spinner](/en-AU/api/css/spinner.md) | `.instui-spinner` | An animated loading ring; give it role="status" and an aria-label. |
| [table](/en-AU/api/css/table.md) | `.instui-table` | A styled data table for `th` and `td` plus an optional caption, with hover, fixed, and stacked-card layouts. |
| [table.body](/en-AU/api/css/table.body.md) | `tbody` | The table's data row group (InstUI `Table.Body`). |
| [table.cell](/en-AU/api/css/table.cell.md) | `td` | A data cell (InstUI `Table.Cell`). |
| [table.col-header](/en-AU/api/css/table.col-header.md) | `th` | A column-header cell (InstUI `Table.ColHeader`); the default `th` styling, overridden by `table.row-header` for `th[scope="row"]`. |
| [table.head](/en-AU/api/css/table.head.md) | `thead` | The table's header row group (InstUI `Table.Head`). |
| [table.row](/en-AU/api/css/table.row.md) | `tr` | A table row (InstUI `Table.Row`). |
| [table.row-header](/en-AU/api/css/table.row-header.md) | `th[scope="row"]` | A row-header cell (InstUI `Table.RowHeader`); styled from the row-header tokens, not the column-header ones. |
| [tabs](/en-AU/api/css/tabs.md) | `.instui-tabs` | A tabbed panel set: a tab list, selectable tabs, and their panels. |
| [tabs.panel](/en-AU/api/css/tabs.panel.md) | `.panel` | The content panel for a tab (InstUI `Tabs.Panel`). |
| [tabs.tab](/en-AU/api/css/tabs.tab.md) | `.tab` | A single tab button (InstUI `Tabs.Tab`, configured via the parent `Tabs`'s tab list); `-selected` marks the active one. |
| [tag](/en-AU/api/css/tag.md) | `.instui-tag` | An inline chip for a keyword or filter. |
| [text](/en-AU/api/css/text.md) | `.instui-text` | Body-text typography with size, weight, colour, and style modifiers. |
| [text-area](/en-AU/api/css/text-area.md) | `.instui-text-area` | A styled, resizable native `&lt;textarea&gt;` with the same states and sizes as the text input. |
| [text-input](/en-AU/api/css/text-input.md) | `.instui-text-input` | A styled native `&lt;input&gt;` — including `date`, `time`, and `datetime-local`, where the browser supplies the picker — with validation states and sizes. |
| [toggle-details](/en-AU/api/css/toggle-details.md) | `.instui-toggle-details` | A styled native `&lt;details&gt;` disclosure with a rotating chevron. |
| [toggle-group](/en-AU/api/css/toggle-group.md) | `.instui-toggle-group` | A bordered disclosure built on `&lt;details&gt;`: a chevron summary row and collapsible content. |
| [tooltip](/en-AU/api/css/tooltip.md) | `.instui-tooltip` | A CSS hover and focus tooltip bubble, positionable on any side. |
| [tray](/en-AU/api/css/tray.md) | `.instui-tray` | An edge-pinned panel that slides in from any side; a native `[popover]` or `&lt;dialog&gt;`. |
| [tree-browser](/en-AU/api/css/tree-browser.md) | `.instui-tree-browser` | A disclosure tree of nested collections and leaf items, with rotating chevrons. |
| [view](/en-AU/api/css/view.md) | `.instui-view` | The View primitive: a neutral box with key-value modifiers for background, border, radius, shadow, display, position, overflow, and cursor. Every one of these modifiers is also available globally (bare, or chained onto any other component) — see the `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor` utilities. |

## Utilities

| Name | Class | Summary |
| --- | --- | --- |
| [color](/en-AU/api/css/color.md) | `.--text-danger` | Semantic colour utilities: `.--bg-&lt;name&gt;`, `.--text-&lt;name&gt;` (aliased as `.--color-&lt;name&gt;`), and `.--border-&lt;name&gt;` for the curated semantic palette. Every one of these also has a component-attached alias modifier (for example `-bg-danger` on any `.instui-&lt;component&gt;`). |
| [cursor](/en-AU/api/css/cursor.md) | `.--cursor-pointer` | `cursor` as a composable, global class — `.--cursor-&lt;value&gt;` — usable bare or chained onto any component (`.instui-button.--cursor-pointer`). |
| [gap](/en-AU/api/css/gap.md) | `.--gap-md` | Flex/grid `gap` utilities on the spacing scale, short (`--gap-sm`) or long (`--gap-small`) spelling. Usable bare or chained onto any component (`.instui-view.--gap-sm`) — components that already set their own `gap` from a component-specific token may have it overridden. |
| [icon](/en-AU/api/css/icon.md) | `.instui-icon` | The icon system: `.instui-icon` sizing plus the shared `-icon-&lt;name&gt;` painter that masks a glyph (in `currentColor`) before any element. |
| [layout](/en-AU/api/css/layout.md) | `.--display-flex` | Display and text-align utilities — `.--display-&lt;value&gt;` and `.--text-align-&lt;value&gt;` — as composable, global classes, usable bare or chained onto any component. |
| [maskglobal](/en-AU/api/css/maskglobal.md) | `.--mask-overlay` | A global, dual copy of the `mask` component's overlay modifiers — `--mask-overlay`, `--mask-fullscreen`, `--mask-blur` — usable bare or chained onto any component, without wrapping in a `.instui-mask` element. |
| [overflow](/en-AU/api/css/overflow.md) | `.--overflow-x-hidden` | `overflow-x`/`overflow-y` as composable, global classes — `.--overflow-x-&lt;value&gt;` / `.--overflow-y-&lt;value&gt;` — usable bare or chained onto any component. |
| [position](/en-AU/api/css/position.md) | `.--position-relative` | `position` as a composable, global class — `.--position-&lt;value&gt;` — usable bare or chained onto any component (`.instui-button.--position-relative`). |
| [responsive](/en-AU/api/css/responsive.md) | `[class*="-hidden-"],[class*="-show-"]` | Viewport- or container-width show/hide classes across a themed breakpoint scale. |
| [screen-reader-content](/en-AU/api/css/screen-reader-content.md) | `.instui-screen-reader-content` | Visually hides content while keeping it available to assistive tech (the standard clip pattern). |
| [spacing](/en-AU/api/css/spacing.md) | `.--p-md` | Margin and padding utilities — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` and `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` on the spacing scale (sides `t`/`b`/`s`/`e`/`x`/`y` or none, spelled short or fully long — for example `--mb-sm` and `--margin-bottom-small` are the same rule; margin also takes `auto`). Usable bare or chained onto any component (for example `class="instui-view --mb-sm"`). |
| [stacking](/en-AU/api/css/stacking.md) | `.--stack-topmost` | z-index depth utilities — `.--stack-&lt;level&gt;` (`deepest`, `below`, `above`, `topmost`) — usable bare or chained onto any component, so layers stack predictably instead of by hand-tuned numbers. |
| [transition](/en-AU/api/css/transition.md) | `.instui-transition.-transition-fade-entering` | Animation state classes for the `Transition` component — `.instui-transition` and state classes (`-transition-fade-entering`, `-transition-scale-exited`, etc.) — usable bare or chained onto any component. |
| [truncate](/en-AU/api/css/truncate.md) | `.--truncate` | Ellipsis truncation with line clamping controlled by `--lines` — usable bare or chained onto any component (`.instui-button.--truncate`). |
| [visual-debug](/en-AU/api/css/visual-debug.md) | `.-with-visual-debug` | A layout-debugging outline: compound `.-with-visual-debug` onto any element to outline the box and its immediate children, so a layout's structure is visible at a glance. |

## Rules

| Name | Class | Summary |
| --- | --- | --- |
| [base](/en-AU/api/css/base.md) | `*` | The opt-in global reset: `box-sizing`, the page surface, base text colour and font, `color-scheme`, and link defaults. |
| [prose](/en-AU/api/css/prose.md) | `:where(body)` | Typographic defaults for raw HTML — headings, paragraphs, lists, links, and code — applied automatically wherever it's imported (default `:where(body)`); pass `options.scope` to target a different content root instead (e.g. `.vp-doc`). |

## Plugins

| Name | Class | Summary |
| --- | --- | --- |
| [logos](/en-AU/api/css/logos.md) | `.logos` | Instructure product logos as CSS image tokens: `--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` holds a data-URI SVG, so a logo paints via e.g. `background-image: var(--instui-logo-canvas-horizontal-color)`. |
| [primitives](/en-AU/api/css/primitives.md) | `.instui-bg-primitive-color-white` | Opt-in utility classes for the raw primitive palette: `.instui-bg-`/`fg-`/`border-primitive-color-&lt;name&gt;` paint a colour from the primitive colour tokens, plus `font-family`/`font-weight` utilities for the primitive font tokens. Kept out of the semantic utilities so overrides there stay semantic-only. |
| [visual-debug](/en-AU/api/css/visual-debug.md) | `.-with-visual-debug` | A layout-debugging outline: compound `.-with-visual-debug` onto any element to outline the box and its immediate children, so a layout's structure is visible at a glance. |

## layout

| Name | Class | Summary |
| --- | --- | --- |
| [callout](/en-AU/api/css/callout.md) | `div[class~="instui-callout"]` | Inline information alert for a short reminder or note. |
| [hero](/en-AU/api/css/hero.md) | `div[class~="instui-hero"]` | Full-width header section with title, subtitle, and optional background image. |
| [page-layout](/en-AU/api/css/page-layout.md) | `div[class~="instui-page-layout"]` | Standard three-column page layout with header, sidebar, and main content. |
| [rubric-note](/en-AU/api/css/rubric-note.md) | `div[class~="instui-rubric-note"]` | Structured note with rubric categories and scoring indicators. |
| [testimonial](/en-AU/api/css/testimonial.md) | `div[class~="instui-testimonial"]` | Quote or testimonial display with attribution and optional imagery. |
| [two-column](/en-AU/api/css/two-column.md) | `div[class~="instui-two-column"]` | Two-column layout with left and right content regions. |
| [wrapper](/en-AU/api/css/wrapper.md) | `body[class~="instui-display-flex"]` | App-shell row: side nav, container with header, and optional panel. |

