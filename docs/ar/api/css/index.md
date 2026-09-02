# CSS مرجع واجهة برمجة التطبيقات

مرجع واجهة برمجة تطبيقات CSS يغطي طبقة المكونات المعتمدة على الفئات في pantoken: المكونات، الأدوات المساعدة، القواعد العالمية، والإعلانات المبنية على نظام الرموز.

## المكونات

| اسم | فئة | ملخص |
| --- | --- | --- |
| [agent-shell](/ar/api/css/agent-shell.md) | `.instui-agent-shell` | حاوية سطحية لوكلاء الذكاء الاصطناعي. |
| [alert](/ar/api/css/alert.md) | `.instui-alert` | رسالة داخلية مع شريط لون الحالة وصورة حالة مقنعة من مجموعة الأيقونات المشتركة. |
| [avatar](/ar/api/css/avatar.md) | `.instui-avatar` | صورة مستخدم تعرض الأحرف الأولى أو صورة، دائرية بشكل افتراضي. |
| [badge](/ar/api/css/badge.md) | `.instui-badge` | نقطة صغيرة للعدد أو الحالة موضوعة فوق زاوية الهدف. |
| [banner](/ar/api/css/banner.md) | `.instui-banner` | سطح رسالة يمكن رفضها مع أيقونة للإعلانات على مستوى الصفحة أو السياق. |
| [billboard](/ar/api/css/billboard.md) | `.instui-billboard` | كتلة حالة فارغة كبيرة أو دعوة لاتخاذ إجراء: أيقونة أو صورة رئيسية، عنوان، ورسالة. |
| [breadcrumb](/ar/api/css/breadcrumb.md) | `.instui-breadcrumb` | مسار روابط توضيحية مع فواصل؛ آخر جزء هو الصفحة الحالية. |
| [breadcrumb.link](/ar/api/css/breadcrumb.link.md) | `li` | قطعة (crumb) (InstUI `Breadcrumb.Link`)، `&lt;li&gt;` داخل `&lt;ol&gt;` الأصل؛ الأخيرة هي الصفحة الحالية. |
| [button](/ar/api/css/button.md) | `.instui-button` | عنصر تحكم فعلية قابلة للوصول، مصممة من لوحة الرموز؛ أساسي بشكل افتراضي. |
| [byline](/ar/api/css/byline.md) | `.instui-byline` | مكون وسائط: شكل رئيسي بجانب عنوان ووصف. |
| [calendar](/ar/api/css/calendar.md) | `.instui-calendar` | شبكة شهرية ثابتة مع تنقل، رؤوس أيام الأسبوع، وخلايا الأيام. |
| [calendar.day](/ar/api/css/calendar.day.md) | `.day` | خلية يوم (InstUI `Calendar.Day`)؛ `-today`، `-selected`، و`-outside-month` تحدد حالتها. |
| [card](/ar/api/css/card.md) | `.instui-card` | حاوية سطح تقبل محتوى تعسفي. |
| [checkbox](/ar/api/css/checkbox.md) | `.instui-checkbox` | مربع اختيار أصلي وتسميته، أو مفتاح تبديل عبر `-variant-toggle`. |
| [close-button](/ar/api/css/close-button.md) | `.instui-close-button` | زر أيقونة شفاف يرسم علامة × الخاصة به، بثلاثة أحجام بالإضافة إلى نسخة معكوسة. |
| [context-view](/ar/api/css/context-view.md) | `.instui-context-view` | نداء مرتفع مع careت، قابل للتموضع على أي جانب؛ يعمل كـ `[popover]` أصلي. |
| [drawer-layout](/ar/api/css/drawer-layout.md) | `.instui-drawer-layout` | تخطيط منقسم مع درج جانبي قابل للطي ومنطقة محتوى رئيسية قابلة للتمرير. |
| [drawer-layout.content](/ar/api/css/drawer-layout.content.md) | `.content` | منطقة المحتوى الأساسية التي تملأ المساحة المتبقية بجانب الدرج. |
| [drawer-layout.tray](/ar/api/css/drawer-layout.tray.md) | `.tray` | لوحة جانبية بجانب المحتوى الرئيسي، مع تراكب اختياري ومعدلات سطح شبيهة بالدرج. |
| [file-drop](/ar/api/css/file-drop.md) | `.instui-file-drop` | منطقة سحب ملفات مع حالات المرور والقبول والرفض. |
| [form-field](/ar/api/css/form-field.md) | `.instui-form-field` | غلاف حقل نموذج: تسمية، عناصر التحكم الخاصة بها، وتخطيطات داخلية أو مطلوبة أو للقراءة فقط. |
| [form-field-group](/ar/api/css/form-field-group.md) | `.instui-form-field-group` | مجموعة `&lt;fieldset&gt;` مع عنوان مجموعة، وتخطيط عمودي أو داخلي، ومسافات قابلة للتهيئة. |
| [form-field-messages](/ar/api/css/form-field-messages.md) | `.instui-form-field-messages` | مساعدة الحقل ورسائل التحقق — تلميح، خطأ، نجاح، وللقارئ الشاشة فقط — مع أيقونة في الخطأ والنجاح. |
| [heading](/ar/api/css/heading.md) | `.instui-heading` | طباعة العناوين من `-level-h1` إلى `-level-h6`. |
| [img](/ar/api/css/img.md) | `.instui-img` | عنصر `&lt;img&gt;` منسق مع معدلات العرض والاقتطاع والتأثير التي تتكدس. |
| [in-place-edit](/ar/api/css/in-place-edit.md) | `.instui-in-place-edit` | عنصر [contenteditable] يُقرأ كنص حتى يتم تركيزه، ثم يظهر واجهة الإدخال. |
| [input-group](/ar/api/css/input-group.md) | `.instui-input-group` | واجهة حول حقل نص مع فتحات أيقونات أمامية وخلفية. |
| [link](/ar/api/css/link.md) | `.instui-link` | رابط منسق بأحجام، ونسخة معكوسة للخلفيات الداكنة، وأشكال داخلية أو غير منسقة. |
| [list](/ar/api/css/list.md) | `.instui-list` | قائمة بتباعد عناصر مدفوع بالرموز. |
| [list.item](/ar/api/css/list.item.md) | `.instui-list` | عنصر قائمة (InstUI `List.Item`). |
| [mask](/ar/api/css/mask.md) | `.instui-mask` | تراكب داخل التدفق يملأ الأصل الموضع ويُركز محتواه — على سبيل المثال مؤشر تحميل فوق بطاقة. للحوار، يُفضّل `&lt;dialog&gt;` أصلي (قناعها هو `::backdrop`). كل واحد من هذه المعدلات متاح أيضًا عالميًا (عاري، أو مترابط على أي مكون آخر) — انظر الأداة المساعدة العالمية `mask`. |
| [menu](/ar/api/css/menu.md) | `.instui-menu` | سطح قائمة منسدلة للعناصر والمجموعات والفواصل. |
| [menu.group](/ar/api/css/menu.group.md) | `.group` | عنوان مجموعة معنونة (InstUI `Menu.Group`/`Menu.ItemGroup`). |
| [menu.item](/ar/api/css/menu.item.md) | `.item` | إدخال قائمة (InstUI `Menu.Item`); أضف -disabled، -highlighted، أو -active/[aria-checked]. |
| [menu.separator](/ar/api/css/menu.separator.md) | `.separator` | قاطع فاصل بين العناصر (InstUI `Menu.Separator`). |
| [metric](/ar/api/css/metric.md) | `.instui-metric` | إحصائية معنونة — قيمة كبيرة فوق تسمية توضيحية. |
| [modal](/ar/api/css/modal.md) | `.instui-modal` | سطح حوار (يعمل على &lt;dialog&gt; أصلي)؛ أجزاء العنوان/المحتوى/التذييل. |
| [modal.body](/ar/api/css/modal.body.md) | `.body` | منطقة المحتوى (InstUI `Modal.Body`); `&lt;img&gt;` وحيد يمتد بعرض كامل. |
| [modal.footer](/ar/api/css/modal.footer.md) | `.footer` | صف الإجراءات (InstUI `Modal.Footer`). |
| [modal.header](/ar/api/css/modal.header.md) | `.header` | صف العنوان (InstUI `Modal.Header`). |
| [number-input](/ar/api/css/number-input.md) | `.instui-number-input` | واجهة إدخال أرقام مع عمود أزرار +/-. |
| [pagination](/ar/api/css/pagination.md) | `.instui-pagination` | تنقل صفحات: صفحات مرقمة، أول، سابق، التالي، وآخر مع سهام، ونقطة للحفر. |
| [pagination.page](/ar/api/css/pagination.page.md) | `.page` | رابط صفحة أو زر (InstUI `Pagination.Page`); الصفحة الحالية تحمل `[aria-current]`. |
| [pill](/ar/api/css/pill.md) | `.instui-pill` | تسمية حالة مدمجة؛ أضف أيقونة بادئة باستخدام الشكل المشترك `-icon-&lt;name&gt;`. |
| [popover](/ar/api/css/popover.md) | `.instui-popover` | سطح مرتفع لـ `[popover]` أصلي، موضوع بموقع باستخدام تموضع مرساة CSS. |
| [progress](/ar/api/css/progress.md) | `.instui-progress` | شريط تقدم محدد مع مقياس ملون، أحجام، وتسميات قيمة اختيارية. |
| [progress-circle](/ar/api/css/progress-circle.md) | `.instui-progress-circle` | حلقة تقدم دائرية يتحكم بها خصائص مخصصة `--value` و`--value-max`. |
| [radio](/ar/api/css/radio.md) | `.instui-radio` | زر راديو أصلي وتسميته. |
| [radio-input-group](/ar/api/css/radio-input-group.md) | `.instui-radio-input-group` | عنصر راديو اختيار مفرد `&lt;fieldset&gt;`، بسيط أو كمفتاح متصل مقسم. |
| [range-input](/ar/api/css/range-input.md) | `.instui-range-input` | منزلق نطاق منسق مع فقاعة قيمة معكوسة. |
| [rating](/ar/api/css/rating.md) | `.instui-rating` | تقييم بنجوم باستخدام رموز ممتلئة وفارغة وملصق رقمي اختياري. |
| [side-nav-bar](/ar/api/css/side-nav-bar.md) | `.instui-side-nav-bar` | شريط تنقل رأسي لعناصر أيقونة-فوق-الملصق، مع وضع مصغّر يعرض الأيقونات فقط. |
| [side-nav-bar.item](/ar/api/css/side-nav-bar.item.md) | `.item` | دخل تنقّل (InstUI `SideNavBar.Item`); `-selected` يعلّم العنصر النشط. |
| [simple-select](/ar/api/css/simple-select.md) | `.instui-simple-select` | عنصر `&lt;select&gt;` أصلي مُنسّق مع سهم صغير، يطابق حالات وأحجام مدخلات النص. |
| [spinner](/ar/api/css/spinner.md) | `.instui-spinner` | حلقة تحميل متحركة؛ أعطه role="status" و aria-label. |
| [table](/ar/api/css/table.md) | `.instui-table` | جدول بيانات مُنسّق لـ `th` و `td` بالإضافة إلى عنوان اختياري، مع تخطيطات التمرير فوق، والثابتة، وبطاقات مكدسة. |
| [table.body](/ar/api/css/table.body.md) | `tbody` | مجموعة صفوف البيانات في الجدول (InstUI `Table.Body`). |
| [table.cell](/ar/api/css/table.cell.md) | `td` | خلية بيانات (InstUI `Table.Cell`). |
| [table.col-header](/ar/api/css/table.col-header.md) | `th` | خلية رأس عمود (InstUI `Table.ColHeader`); أسلوب `th` الافتراضي يُستبدل بواسطة `table.row-header` لـ `th[scope="row"]`. |
| [table.head](/ar/api/css/table.head.md) | `thead` | مجموعة صفوف رأس الجدول (InstUI `Table.Head`). |
| [table.row](/ar/api/css/table.row.md) | `tr` | صف جدول (InstUI `Table.Row`). |
| [table.row-header](/ar/api/css/table.row-header.md) | `th[scope="row"]` | خلية رأس صف (InstUI `Table.RowHeader`); مُنسّقة من رموز رأس الصف، وليس من رموز رأس العمود. |
| [tabs](/ar/api/css/tabs.md) | `.instui-tabs` | مجموعة لوحات بعلامات تبويب: قائمة تبويبات، تبويبات قابلة للاختيار، ولوحاتها. |
| [tabs.panel](/ar/api/css/tabs.panel.md) | `.panel` | لوحة المحتوى لعلامة تبويب (InstUI `Tabs.Panel`). |
| [tabs.tab](/ar/api/css/tabs.tab.md) | `.tab` | زر تبويب واحد (InstUI `Tabs.Tab`، مكوّن عبر قائمة التبويب للوالد `Tabs`); `-selected` يعلّم العنصر النشط. |
| [tag](/ar/api/css/tag.md) | `.instui-tag` | شيب مضمّن لكلمة مفتاحية أو فلتر. |
| [text](/ar/api/css/text.md) | `.instui-text` | طباعة نص الجسم مع معدّلات للحجم، الوزن، اللون، والنمط. |
| [text-area](/ar/api/css/text-area.md) | `.instui-text-area` | عنصر `&lt;textarea&gt;` أصلي مُنسّق وقابل لتغيير الحجم بنفس حالات وأحجام مدخلات النص. |
| [text-input](/ar/api/css/text-input.md) | `.instui-text-input` | عنصر `&lt;input&gt;` أصلي مُنسّق — بما في ذلك `date`، `time`، و `datetime-local` حيث يُوفّر المتصفح أداة الاختيار — مع حالات التحقق والأحجام. |
| [toggle-details](/ar/api/css/toggle-details.md) | `.instui-toggle-details` | عنصر كشف `&lt;details&gt;` أصلي مُنسّق مع سهم دوّار. |
| [toggle-group](/ar/api/css/toggle-group.md) | `.instui-toggle-group` | كشف محدّد الحواف مبني على `&lt;details&gt;`: صف ملخّص بسهم ومحتوى قابل للطي. |
| [tooltip](/ar/api/css/tooltip.md) | `.instui-tooltip` | فقاعة تلميح تظهر عند التحويم أو التركيز، قابلة للوضع على أي جانب. |
| [tray](/ar/api/css/tray.md) | `.instui-tray` | لوحة مثبتة على الحافة تنزلق من أي جانب؛ عنصر `[popover]` أو `&lt;dialog&gt;` أصلي. |
| [tree-browser](/ar/api/css/tree-browser.md) | `.instui-tree-browser` | شجرة كشف لمجموعات متداخلة وعناصر ورقية، مع أسهم دوّارة. |
| [view](/ar/api/css/view.md) | `.instui-view` | البدائي View: صندوق محايد مع معدّلات قيمة-مفتاح للخلفية، الإطار، نصف القطر، الظل، العرض، الموضع، التدفق، والمؤشر. كل واحد من هذه المعدّلات متاح أيضًا عالميًا (عاريًا، أو متسلسل على أي مكوّن آخر) — انظر أدوات `background`/`border`/`shadow`/`display`/`position`/`overflow`/`cursor`. |

## الأدوات المساعدة

| اسم | فئة | ملخص |
| --- | --- | --- |
| [color](/ar/api/css/color.md) | `.--text-danger` | أدوات الألوان الدلالية: `.--bg-&lt;name&gt;`، `.--text-&lt;name&gt;` (معرّف باسم `.--color-&lt;name&gt;`)، و `.--border-&lt;name&gt;` للوحة الدلالات المنسقة. لكل واحد منها أيضًا اسم مستعار مرتبط بالمكوّن (على سبيل المثال `-bg-danger` على أي `.instui-&lt;component&gt;`). |
| [cursor](/ar/api/css/cursor.md) | `.--cursor-pointer` | `cursor` كفئة عالمية قابلة للتركيب — `.--cursor-&lt;value&gt;` — قابلة للاستخدام عارية أو متسلسلة على أي مكوّن (`.instui-button.--cursor-pointer`). |
| [gap](/ar/api/css/gap.md) | `.--gap-md` | أدوات `gap` للشبكة/الفليكس على مقياس المسافات، هجائية قصيرة (`--gap-sm`) أو طويلة (`--gap-small`). قابلة للاستخدام عارية أو متسلسلة على أي مكوّن (`.instui-view.--gap-sm`) — قد تُستبدل لدى المكوّنات التي تضبط `gap` خاص بها من رمز مكوّن محدد. |
| [icon](/ar/api/css/icon.md) | `.instui-icon` | نظام الأيقونات: أحجام `.instui-icon` بالإضافة إلى رسام `-icon-&lt;name&gt;` المشترك الذي يقنّن رمزًا (في `currentColor`) قبل أي عنصر. |
| [layout](/ar/api/css/layout.md) | `.--display-flex` | أدوات العرض ومحاذاة النص — `.--display-&lt;value&gt;` و `.--text-align-&lt;value&gt;` — كفئات عالمية قابلة للتركيب، قابلة للاستخدام عارية أو متسلسلة على أي مكوّن. |
| [maskglobal](/ar/api/css/maskglobal.md) | `.--mask-overlay` | نسخة مزدوجة عالمية من معدّلات التراكب لمكوّن `mask` — `--mask-overlay`، `--mask-fullscreen`، `--mask-blur` — قابلة للاستخدام عارية أو متسلسلة على أي مكوّن، دون الحاجة للتغليف بعنصر `.instui-mask`. |
| [overflow](/ar/api/css/overflow.md) | `.--overflow-x-hidden` | `overflow-x`/`overflow-y` كفئات عالمية قابلة للتركيب — `.--overflow-x-&lt;value&gt;` / `.--overflow-y-&lt;value&gt;` — قابلة للاستخدام عارية أو متسلسلة على أي مكوّن. |
| [position](/ar/api/css/position.md) | `.--position-relative` | `position` كفئة عالمية قابلة للتركيب — `.--position-&lt;value&gt;` — قابلة للاستخدام عارية أو متسلسلة على أي مكوّن (`.instui-button.--position-relative`). |
| [responsive](/ar/api/css/responsive.md) | `[class*="-hidden-"],[class*="-show-"]` | فئات إظهار/إخفاء استنادًا إلى عرض نافذة العرض أو الحاوية عبر مقياس نقاط توقف موضوعي. |
| [screen-reader-content](/ar/api/css/screen-reader-content.md) | `.instui-screen-reader-content` | يخفي المحتوى بصريًا مع إبقائه متاحًا لتقنيات المساعدة (نمط القص القياسي). |
| [spacing](/ar/api/css/spacing.md) | `.--p-md` | مرافق الهامش والتباعد — `.--m&lt;side&gt;-&lt;step&gt;` / `.--margin-&lt;side&gt;-&lt;step&gt;` و `.--p&lt;side&gt;-&lt;step&gt;` / `.--padding-&lt;side&gt;-&lt;step&gt;` على مقياس التباعد (الجوانب `t`/`b`/`s`/`e`/`x`/`y` أو لا شيء، مكتوبة مختصرة أو كاملة — على سبيل المثال `--mb-sm` و `--margin-bottom-small` هما نفس القاعدة؛ الهامش يقبل أيضاً `auto`). قابلة للاستخدام مباشرة أو متسلسلة على أي مكوّن (على سبيل المثال `class="instui-view --mb-sm"`). |
| [stacking](/ar/api/css/stacking.md) | `.--stack-topmost` | مرافق عمق z-index — `.--stack-&lt;level&gt;` (`deepest`, `below`, `above`, `topmost`) — قابلة للاستخدام مباشرة أو متسلسلة على أي مكوّن، بحيث تتكدس الطبقات بشكل متوقع بدلاً من أرقام مضبوطة يدوياً. |
| [transition](/ar/api/css/transition.md) | `.instui-transition.-transition-fade-entering` | فئات حالة الحركة للمكوّن `Transition` — `.instui-transition` وفئات الحالة (`-transition-fade-entering`, `-transition-scale-exited`, إلخ) — قابلة للاستخدام مباشرة أو متسلسلة على أي مكوّن. |
| [truncate](/ar/api/css/truncate.md) | `.--truncate` | اقتطاع الحذف بنقاط الحذف مع تحديد سطر التقييد عبر `--lines` — قابلة للاستخدام مباشرة أو متسلسلة على أي مكوّن (`.instui-button.--truncate`). |
| [visual-debug](/ar/api/css/visual-debug.md) | `.-with-visual-debug` | مخطط تصحيح التخطيط: ربط مركب `.-with-visual-debug` على أي عنصر لتحديد محيط المربع وأطفاله المباشرين، بحيث يكون هيكل التخطيط مرئياً بنظرة سريعة. |

## القواعد

| اسم | فئة | ملخص |
| --- | --- | --- |
| [base](/ar/api/css/base.md) | `*` | إعادة التعيين العالمية الاختيارية: `box-sizing`، سطح الصفحة، لون النص الأساسي والخط، `color-scheme`، وإعدادات الروابط الافتراضية. |
| [prose](/ar/api/css/prose.md) | `:where(body)` | الإعدادات الطباعية الافتراضية لـ HTML الخام — العناوين، الفقرات، القوائم، الروابط، والكود — تُطبّق تلقائياً أينما تم استيرادها (الافتراضي `:where(body)`); مرّر `options.scope` لاستهداف جذور محتوى مختلفة بدل ذلك (مثل `.vp-doc`). |

## Plugins

| اسم | فئة | ملخص |
| --- | --- | --- |
| [logos](/ar/api/css/logos.md) | `.logos` | شعارات منتجات Instructure كرموز صور CSS: `--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` يحمل SVG معبأ ببيانات-URI، لذا يُرسم الشعار عبر مثلاً `background-image: var(--instui-logo-canvas-horizontal-color)`. |
| [primitives](/ar/api/css/primitives.md) | `.instui-bg-primitive-color-white` | فئات مساعدة اختيارية للوحة الألوان الأولية الخام: `.instui-bg-`/`fg-`/`border-primitive-color-&lt;name&gt;` تلون بلون من رموز الألوان الأولية، بالإضافة إلى مرافق `font-family`/`font-weight` لرموز الخط الأولية. محفوظة خارج المرافق الدلالية حتى تظل التجاوزات هناك دلالية فقط. |
| [visual-debug](/ar/api/css/visual-debug.md) | `.-with-visual-debug` | مخطط تصحيح التخطيط: ربط مركب `.-with-visual-debug` على أي عنصر لتحديد محيط المربع وأطفاله المباشرين، بحيث يكون هيكل التخطيط مرئياً بنظرة سريعة. |

## layout

| اسم | فئة | ملخص |
| --- | --- | --- |
| [callout](/ar/api/css/callout.md) | `div[class~="instui-callout"]` | تنبيه معلوماتي مضمن لتذكير قصير أو ملاحظة. |
| [hero](/ar/api/css/hero.md) | `div[class~="instui-hero"]` | قسم رأس بعرض كامل يحتوي على عنوان، عنوان فرعي، وخلفية اختيارية. |
| [page-layout](/ar/api/css/page-layout.md) | `div[class~="instui-page-layout"]` | تخطيط صفحة قياسي من ثلاثة أعمدة مع رأس، شريط جانبي، والمحتوى الرئيسي. |
| [rubric-note](/ar/api/css/rubric-note.md) | `div[class~="instui-rubric-note"]` | ملاحظة منظّمة مع فئات معيارية ومؤشرات تسجيل الدرجات. |
| [testimonial](/ar/api/css/testimonial.md) | `div[class~="instui-testimonial"]` | عرض اقتباس أو شهادة مع الإسناد وصور اختيارية. |
| [two-column](/ar/api/css/two-column.md) | `div[class~="instui-two-column"]` | تخطيط عمودين مع مناطق محتوى يسار ويمين. |
| [wrapper](/ar/api/css/wrapper.md) | `body[class~="instui-display-flex"]` | صف شِلّ التطبيق: شريط تنقّل جانبي، حاوية مع رأس، ولوحة اختيارية. |

