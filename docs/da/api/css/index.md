# CSS API-reference

CSS API-referencen dækker pantokens klassiske komponentlag: komponenter, hjælpefunktioner, globale regler og erklæringer bygget på tokensystemet.

## Komponenter

| Navn | Klasse | Resumé |
| --- | --- | --- |
| [agent-shell](/da/api/css/agent-shell.md) | `.instui-agent-shell` | En overfladecontainer for AI-agenter. |
| [alert](/da/api/css/alert.md) | `.instui-alert` | En inline besked med en statusfarvelinje og en maskeret statusglyf fra det delte ikonsæt. |
| [avatar](/da/api/css/avatar.md) | `.instui-avatar` | En brugeravatar, der viser initialer eller et billede, cirkulært som standard. |
| [badge](/da/api/css/badge.md) | `.instui-badge` | En lille tælle- eller statusdot placeret over et målsegments hjørne. |
| [banner](/da/api/css/banner.md) | `.instui-banner` | En afviselig, ikoniseret beskedoverflade til meddelelser på sideniveau eller i kontekst. |
| [billboard](/da/api/css/billboard.md) | `.instui-billboard` | En stor tom-tilstand eller call-to-action blok: et heroikon eller billede, en overskrift og en besked. |
| [breadcrumb](/da/api/css/breadcrumb.md) | `.instui-breadcrumb` | Et brødkrummesti med skilletegn; den sidste krumme er den aktuelle side. |
| [breadcrumb.link](/da/api/css/breadcrumb.link.md) | `li` | En krumme (InstUI `Breadcrumb.Link`), en `&lt;li&gt;` i den overordnedes `&lt;ol&gt;`; den sidste er den aktuelle side. |
| [button](/da/api/css/button.md) | `.instui-button` | En tilgængelig handlingskontrol, formateret fra tokenpaletten; primær som standard. |
| [byline](/da/api/css/byline.md) | `.instui-byline` | Et medieobjekt: en herofigur ved siden af en titel og beskrivelse. |
| [calendar](/da/api/css/calendar.md) | `.instui-calendar` | Et statisk månedsnet med navigation, ugedagsoverskrifter og dagceller. |
| [calendar.day](/da/api/css/calendar.day.md) | `.day` | En dagcelle (InstUI `Calendar.Day`); `-today`, `-selected` og `-outside-month` markerer dens tilstand. |
| [card](/da/api/css/card.md) | `.instui-card` | En overfladecontainer, der accepterer arbitrært indhold. |
| [checkbox](/da/api/css/checkbox.md) | `.instui-checkbox` | Et oprindeligt afkrydsningsfelt og dets etiket eller en kontakt via `-variant-toggle`. |
| [close-button](/da/api/css/close-button.md) | `.instui-close-button` | En transparent ikonknap, der tegner sin egen × glyf i tre størrelser plus en omvendt variant. |
| [context-view](/da/api/css/context-view.md) | `.instui-context-view` | En hævet billedtekst med et indsatsikon, positionerbar på enhver side; fungerer som et oprindeligt `[popover]`. |
| [drawer-layout](/da/api/css/drawer-layout.md) | `.instui-drawer-layout` | Et opdelt layout med en sammenfaldelig sidebjælke og et primært rullebart indholdsrude. |
| [drawer-layout.content](/da/api/css/drawer-layout.content.md) | `.content` | Det primære indholdsrude, der fylder den resterende plads ved siden af bakken. |
| [drawer-layout.tray](/da/api/css/drawer-layout.tray.md) | `.tray` | Sidepanelet ved siden af hovedindhold med valgfri overlay og tray-lignende overflademodikatorer. |
| [file-drop](/da/api/css/file-drop.md) | `.instui-file-drop` | En fil-dropzone med hover-, accepteret- og afvist-tilstande. |
| [form-field](/da/api/css/form-field.md) | `.instui-form-field` | En formularfelt-wrapper: en etiket, dens kontroller og inline, obligatorisk eller skrivebeskyttet layout. |
| [form-field-group](/da/api/css/form-field-group.md) | `.instui-form-field-group` | En `&lt;fieldset&gt;` gruppe med en forklaring, et søjle- eller inline-layout og konfigurerbar afstand. |
| [form-field-messages](/da/api/css/form-field-messages.md) | `.instui-form-field-messages` | Felthjælp og valideringsmeddelelser — hint, fejl, succes og kun skærmleser — med en glyf ved fejl og succes. |
| [heading](/da/api/css/heading.md) | `.instui-heading` | Overskriftstypografi fra `-level-h1` til `-level-h6`. |
| [img](/da/api/css/img.md) | `.instui-img` | En formateret `&lt;img&gt;` med display-, beskæring- og effektmodikatorer, der stables. |
| [in-place-edit](/da/api/css/in-place-edit.md) | `.instui-in-place-edit` | En [contenteditable], der læses som tekst, indtil den fokuseres, og derefter viser inputrammen. |
| [input-group](/da/api/css/input-group.md) | `.instui-input-group` | En facader omkring en tekstinput med førende og efterfølgende ikonspalter. |
| [link](/da/api/css/link.md) | `.instui-link` | Et formateret hyperlink med størrelser, en omvendt variant til mørke baggrunde og inline- eller ustylet former. |
| [list](/da/api/css/list.md) | `.instui-list` | En liste med tokenbaseret elementafstand. |
| [list.item](/da/api/css/list.item.md) | `.instui-list` | Et listeelement (InstUI `List.Item`). |
| [mask](/da/api/css/mask.md) | `.instui-mask` | En overlay i-flow, der fylder sin positionerede forælder og centrerer dens indhold — f.eks. en spinner over et kort. For en modal skal du foretrække en oprindelig `&lt;dialog&gt;` (dens `::backdrop` er masken). Alle disse modifikatorer er også tilgængelige globalt (bar eller kædet til enhver anden komponent) — se det globale `mask` hjælpeprogram. |
| [menu](/da/api/css/menu.md) | `.instui-menu` | En rulleliste-overflade med elementer, grupper og skilletegn. |
| [menu.group](/da/api/css/menu.group.md) | `.group` | En mærket gruppeoverskrift (InstUI `Menu.Group`/`Menu.ItemGroup`). |
| [menu.item](/da/api/css/menu.item.md) | `.item` | En menuindtastning (InstUI `Menu.Item`); tilføj -disabled, -highlighted eller -active/[aria-checked]. |
| [menu.separator](/da/api/css/menu.separator.md) | `.separator` | En skilleregel mellem elementer (InstUI `Menu.Separator`). |
| [metric](/da/api/css/metric.md) | `.instui-metric` | En mærket statistik — en stor værdi over en billedtekst. |
| [modal](/da/api/css/modal.md) | `.instui-modal` | En dialogoverflade (fungerer på en oprindelig &lt;dialog&gt;); header/body/footer dele. |
| [modal.body](/da/api/css/modal.body.md) | `.body` | Indholdsregionen (InstUI `Modal.Body`); en enlig `&lt;img&gt;` går fuld-bleed. |
| [modal.footer](/da/api/css/modal.footer.md) | `.footer` | Handlingsrækken (InstUI `Modal.Footer`). |
| [modal.header](/da/api/css/modal.header.md) | `.header` | Titelrækken (InstUI `Modal.Header`). |
| [number-input](/da/api/css/number-input.md) | `.instui-number-input` | En tal-input facader med en +/- spinner søjle. |
| [pagination](/da/api/css/pagination.md) | `.instui-pagination` | Sidenavigation: nummererede sider, første, forrige, næste og sidste pile og en ellipsis for huller. |
| [pagination.page](/da/api/css/pagination.page.md) | `.page` | Et sidelink eller knap (InstUI `Pagination.Page`); den aktuelle side har `[aria-current]`. |
| [pill](/da/api/css/pill.md) | `.instui-pill` | En kompakt statusetiket; tilføj en førende glyf med den delte `-icon-&lt;name&gt;` form. |
| [popover](/da/api/css/popover.md) | `.instui-popover` | En hævet overflade for en oprindelig `[popover]`, positioneret med CSS-anker-positionering. |
| [progress](/da/api/css/progress.md) | `.instui-progress` | En bestemt progressbar med en farvemåler, størrelser og en valgfri værdi-etiket. |
| [progress-circle](/da/api/css/progress-circle.md) | `.instui-progress-circle` | En cirkulær progress-ring drevet af `--value` og `--value-max` brugerdefinerede egenskaber. |
| [radio](/da/api/css/radio.md) | `.instui-radio` | En native radioknap og dens etiket. |
| [radio-input-group](/da/api/css/radio-input-group.md) | `.instui-radio-input-group` | En enkelt-vælg radio `&lt;fieldset&gt;`, almindelig eller som en forbundet segmenteret skifter. |
| [range-input](/da/api/css/range-input.md) | `.instui-range-input` | En stiliseret områdeskyder med en omvendt værdibobble. |
| [rating](/da/api/css/rating.md) | `.instui-rating` | En starvurdering med fyldte og tomme glyphs og en valgfri numerisk etiket. |
| [side-nav-bar](/da/api/css/side-nav-bar.md) | `.instui-side-nav-bar` | En vertikal navigationsskinner af icon-over-etiket-elementer, med en minimeret kun-ikoner-tilstand. |
| [side-nav-bar.item](/da/api/css/side-nav-bar.item.md) | `.item` | Et navigationspunkt (InstUI `SideNavBar.Item`); `-selected` markerer den aktive. |
| [simple-select](/da/api/css/simple-select.md) | `.instui-simple-select` | En stiliseret native `&lt;select&gt;` med et karet, der matcher tekstinput-tilstande og størrelser. |
| [spinner](/da/api/css/spinner.md) | `.instui-spinner` | En animeret loading-ring; giv den role="status" og en aria-label. |
| [table](/da/api/css/table.md) | `.instui-table` | En stiliseret datatable for `th` og `td` plus en valgfri billedtekst, med hover-, fixed- og stacked-card-layouts. |
| [table.body](/da/api/css/table.body.md) | `tbody` | Tabellens datarække-gruppe (InstUI `Table.Body`). |
| [table.cell](/da/api/css/table.cell.md) | `td` | En datacelle (InstUI `Table.Cell`). |
| [table.col-header](/da/api/css/table.col-header.md) | `th` | En kolonneoverskrift-celle (InstUI `Table.ColHeader`); standard `th` styling, overskrevet af `table.row-header` for `th[scope="row"]`. |
| [table.head](/da/api/css/table.head.md) | `thead` | Tabellens overskrift-rækkegruppe (InstUI `Table.Head`). |
| [table.row](/da/api/css/table.row.md) | `tr` | En tabelrække (InstUI `Table.Row`). |
| [table.row-header](/da/api/css/table.row-header.md) | `th[scope="row"]` | En rækkeoverskrift-celle (InstUI `Table.RowHeader`); stiliseret fra rækkeoverskrift-tokens, ikke kolonneoverskrift-tokens. |
| [tabs](/da/api/css/tabs.md) | `.instui-tabs` | Et tabbedpanel-sæt: en tabliste, vælgbare faner og deres paneler. |
| [tabs.panel](/da/api/css/tabs.panel.md) | `.panel` | Indholdsapnelet for en fane (InstUI `Tabs.Panel`). |
| [tabs.tab](/da/api/css/tabs.tab.md) | `.tab` | En enkelt faneknap (InstUI `Tabs.Tab`, konfigureret via forælderens `Tabs`'s tabilste); `-selected` markerer den aktive. |
| [tag](/da/api/css/tag.md) | `.instui-tag` | En inline-chip til et nøgleord eller filter. |
| [text](/da/api/css/text.md) | `.instui-text` | Brødtekst-typografi med størrelse, vægt, farve og stilmodifikatorer. |
| [text-area](/da/api/css/text-area.md) | `.instui-text-area` | En stiliseret, ændringbar native `&lt;textarea&gt;` med samme tilstande og størrelser som tekstinput. |
| [text-input](/da/api/css/text-input.md) | `.instui-text-input` | En stiliseret native `&lt;input&gt;` — herunder `date`, `time` og `datetime-local`, hvor browseren leverer vælgeren — med validerings- og størrelsestilstande. |
| [toggle-details](/da/api/css/toggle-details.md) | `.instui-toggle-details` | En stiliseret native `&lt;details&gt;`-bekendtgørelse med en roterende chevron. |
| [toggle-group](/da/api/css/toggle-group.md) | `.instui-toggle-group` | En kant-bekendtgørelse bygget på `&lt;details&gt;`: en chevron-sammenfattningsrække og kollapsibelt indhold. |
| [tooltip](/da/api/css/tooltip.md) | `.instui-tooltip` | En CSS hover- og focus-tooltip-boble, positionerbar på enhver side. |
| [tray](/da/api/css/tray.md) | `.instui-tray` | Et kantnål-panel, der glider ind fra enhver side; en native `[popover]` eller `&lt;dialog&gt;`. |
| [tree-browser](/da/api/css/tree-browser.md) | `.instui-tree-browser` | Et bekendtgørelsestræ med indlejrede samlinger og bladelementer, med roterende chevrons. |
| [view](/da/api/css/view.md) | `.instui-view` | View-primitiven: en neutral boks med nøgle-værdi-modifikatorer for baggrund, kant, radius, skygge, display, position, overflow og markør. Hver af disse modifikatorer er også tilgængelig globalt (bar eller kædet til enhver anden komponent) — se `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor` utilities. |

## Hjælpefunktioner

| Navn | Klasse | Resumé |
| --- | --- | --- |
| [color](/da/api/css/color.md) | `.--text-danger` | Semantiske farve-utilities: `.--bg-&lt;name&gt;`, `.--text-&lt;name&gt;` (aliaseret som `.--color-&lt;name&gt;`) og `.--border-&lt;name&gt;` til paletten for kurateret semantik. Hver af disse har også en komponent-vedhæftet alias-modifikator (for eksempel `-bg-danger` på enhver `.instui-&lt;component&gt;`). |
| [cursor](/da/api/css/cursor.md) | `.--cursor-pointer` | `cursor` som en sammensat, global klasse — `.--cursor-&lt;value&gt;` — brugbar bar eller kædet til enhver komponent (`.instui-button.--cursor-pointer`). |
| [gap](/da/api/css/gap.md) | `.--gap-md` | Flex/grid `gap` utilities på afstandsskalaen, kort (`--gap-sm`) eller lang (`--gap-small`) stavemåde. Brugbar bar eller kædet til enhver komponent (`.instui-view.--gap-sm`) — komponenter, der allerede sætter deres egen `gap` fra et komponent-specifikt token, kan få det overskrevet. |
| [icon](/da/api/css/icon.md) | `.instui-icon` | Ikonsystemet: `.instui-icon` størrelse plus den delte `-icon-&lt;name&gt;` painter, der maskerer en glyf (i `currentColor`) før ethvert element. |
| [layout](/da/api/css/layout.md) | `.--display-flex` | Display- og text-align-utilities — `.--display-&lt;value&gt;` og `.--text-align-&lt;value&gt;` — som sammensat, globale klasser, brugbar bar eller kædet til enhver komponent. |
| [maskglobal](/da/api/css/maskglobal.md) | `.--mask-overlay` | En global, dobbelt kopi af `mask` komponentens overlay-modifikatorer — `--mask-overlay`, `--mask-fullscreen`, `--mask-blur` — brugbar bar eller kædet til enhver komponent, uden ombrydning i et `.instui-mask` element. |
| [overflow](/da/api/css/overflow.md) | `.--overflow-x-hidden` | `overflow-x`/`overflow-y` som sammensat, globale klasser — `.--overflow-x-&lt;value&gt;` / `.--overflow-y-&lt;value&gt;` — brugbar bar eller kædet til enhver komponent. |
| [position](/da/api/css/position.md) | `.--position-relative` | `position` som en sammensat, global klasse — `.--position-&lt;value&gt;` — brugbar bar eller kædet til enhver komponent (`.instui-button.--position-relative`). |
| [responsive](/da/api/css/responsive.md) | `[class*="-hidden-"],[class*="-show-"]` | Viewport- eller containerbredde show/hide-klasser på tværs af en tematiseret breakpoint-skala. |
| [screen-reader-content](/da/api/css/screen-reader-content.md) | `.instui-screen-reader-content` | Skjuler visuelt indhold, mens det holdes tilgængeligt for hjælpeteknologi (standard clip-mønsteret). |
| [spacing](/da/api/css/spacing.md) | `.--p-md` | Margin- og padding-værktøjer — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` og `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` på afstandsskalaen (sider `t`/`b`/`s`/`e`/`x`/`y` eller ingen, stavede kort eller fuldt langt — for eksempel `--mb-sm` og `--margin-bottom-small` er den samme regel; margin accepterer også `auto`). Kan bruges alene eller sammenkædet på enhver komponent (for eksempel `class="instui-view --mb-sm"`). |
| [stacking](/da/api/css/stacking.md) | `.--stack-topmost` | z-index dybdeværktøjer — `.--stack-&lt;level&gt;` (`deepest`, `below`, `above`, `topmost`) — kan bruges alene eller sammenkædet på enhver komponent, så lag stapeles forudsigeligt i stedet for efter håndtilpassede tal. |
| [transition](/da/api/css/transition.md) | `.instui-transition.-transition-fade-entering` | Animationstilklasser til `Transition` komponenten — `.instui-transition` og tilklasser (`-transition-fade-entering`, `-transition-scale-exited`, osv.) — kan bruges alene eller sammenkædet på enhver komponent. |
| [truncate](/da/api/css/truncate.md) | `.--truncate` | Ellipsis-afkortning med linjeindgrænsning kontrolleret af `--lines` — kan bruges alene eller sammenkædet på enhver komponent (`.instui-button.--truncate`). |
| [visual-debug](/da/api/css/visual-debug.md) | `.-with-visual-debug` | Et layout-fejlfindingskontur: sammensat `.-with-visual-debug` på ethvert element for at skitsere boksen og dens umiddelbare underordnede elementer, så en layouts struktur er synlig med det samme. |

## Regler

| Navn | Klasse | Resumé |
| --- | --- | --- |
| [base](/da/api/css/base.md) | `*` | Det globale reset til tilvalg: `box-sizing`, sideflade, basistekstfarve og skrifttype, `color-scheme` og linkstandarder. |
| [prose](/da/api/css/prose.md) | `:where(body)` | Typografiske standarder for rå HTML — overskrifter, afsnit, lister, links og kode — anvendt automatisk overalt, hvor det importeres (standard `:where(body)`); overfør `options.scope` for i stedet at målrette en anden indholdsrod (f.eks. `.vp-doc`). |

## Plugins

| Navn | Klasse | Resumé |
| --- | --- | --- |
| [logos](/da/api/css/logos.md) | `.logos` | Instructure-produktlogos som CSS-billedtokens: `--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` indeholder en data-URI SVG, så et logo males via f.eks. `background-image: var(--instui-logo-canvas-horizontal-color)`. |
| [primitives](/da/api/css/primitives.md) | `.instui-bg-primitive-color-white` | Opt-in-værktøjsklasser for den rå primitive palet: `.instui-bg-`/`fg-`/`border-primitive-color-&lt;name&gt;` maler en farve fra primitive farvetokens, plus `font-family`/`font-weight` værktøjer til primitive skrifttypetokens. Holdt uden for de semantiske værktøjer, så overstyringer der forbliver kun semantiske. |
| [visual-debug](/da/api/css/visual-debug.md) | `.-with-visual-debug` | Et layout-fejlfindingskontur: sammensat `.-with-visual-debug` på ethvert element for at skitsere boksen og dens umiddelbare underordnede elementer, så en layouts struktur er synlig med det samme. |

## layout

| Navn | Klasse | Resumé |
| --- | --- | --- |
| [callout](/da/api/css/callout.md) | `div[class~="instui-callout"]` | Indlejret informationspåmindelse til en kort påmindelse eller notat. |
| [hero](/da/api/css/hero.md) | `div[class~="instui-hero"]` | Fuldbredde-headersektion med titel, undertitel og valgfri baggrundsbillede. |
| [page-layout](/da/api/css/page-layout.md) | `div[class~="instui-page-layout"]` | Standard tre-kolonne-sidelayout med header, sidepanel og hovedindhold. |
| [rubric-note](/da/api/css/rubric-note.md) | `div[class~="instui-rubric-note"]` | Struktureret notat med rubrik-kategorier og scoringindikatorer. |
| [testimonial](/da/api/css/testimonial.md) | `div[class~="instui-testimonial"]` | Citat eller vidnesbyrdsfremvisning med tilskrivning og valgfri billedeffekter. |
| [two-column](/da/api/css/two-column.md) | `div[class~="instui-two-column"]` | To-kolonne-layout med venstre og højre indholdsregioner. |
| [wrapper](/da/api/css/wrapper.md) | `body[class~="instui-display-flex"]` | App-shell-række: sidestavn, beholder med header og valgfrit panel. |

