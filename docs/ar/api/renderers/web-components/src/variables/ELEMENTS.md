[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ELEMENTS

# متغير: ELEMENTS

> `const` **ELEMENTS**: readonly \[`"icon"`, `"button"`, `"alert"`, `"badge"`, `"pill"`, `"tag"`, `"avatar"`, `"spinner"`, `"progress"`, `"metric"`, `"rating"`, `"progress-circle"`, `"icon-button"`, `"toggle-button"`, `"truncate"`, `"img"`, `"side-nav-bar"`, `"tree-browser"`, `"calendar"`, `"tooltip"`, `"modal"`, `"context-view"`, `"popover"`, `"tray"`, `"in-place-edit"`, `"drilldown"`, `"pages"`, `"drawer-layout"`, `"date-input"`, `"date-time-input"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

أسماء العناصر الأساسية (غير المسبوقة ببادئة) التي يسجلها هذا الحزمة. [register](../functions/register.md) ينشِئ وسمًا لكل اسم
تحت خيار `prefix` — `icon` → `&lt;instui-icon&gt;` افتراضيًا، أو `&lt;x-icon&gt;` لـ `{ prefix: "x" }`.
يتم دائمًا تطبيق بادئة (يجب أن يحتوي اسم العنصر المخصص على واصلة)، لذلك فإن البادئة الفارغة أو غير الموجودة
تعيد الاستخدام إلى الافتراضي `instui`.
