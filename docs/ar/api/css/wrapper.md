# CSS: wrapper

`body[class~="instui-display-flex"]` — صف قشرة التطبيق: الملاحة الجانبية والحاوية مع الرأس واللوحة الاختيارية.

✅ استخدم Wrapper عندما:

- بناء صفحة منتج Canvas كاملة تحتاج إلى قشرة تخطيط متسقة
- تستخدم الصفحة GlobalNav كنقطة ارتساء الملاحة الأساسية
- تحتاج الصفحة إلى لوحات جانبية: ContentTabList أو TrailingContentArea أو UtilityPanel
- تحتاج إلى حشوة حاوية متسقة وأقصى عرض محتوى عبر الصفحة بأكملها
  🚫 لا تستخدم Wrapper عندما:

- بناء Modal أو Tray أو Drawer — لديهم حاوياتهم الخاصة للتخطيط
- تغليف قسم فرعي من صفحة — يحتوي Wrapper على الصفحة الكاملة وليس منطقة

## Accessibility

- قم بتعيين منطقة المحتوى الرئيسي إلى معلم &lt;main&gt; مع رابط skip-nav بحيث يمكن لمستخدمي لوحة المفاتيح تجاوز GlobalNav
- أعط ContentTabList role="navigation" مع aria-label مميز مثل "Page navigation" — منفصل عن معلم GlobalNav
- أعط TrailingContentArea role="complementary" مع aria-label وصفي يعكس محتواه، مثل "Student details"
- أعط كل UtilityPanel aria-label مميز: "AI assistant" أو "Notifications" أو "Filters"
- عندما ينفتح UtilityPanel، انقل التركيز إلى اللوحة؛ عند الإغلاق، أعد التركيز إلى الزر الذي فتحه

## Usage

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Structure

```text
body[class~="instui-display-flex"]
  side-nav-bar (component)
  .container
    modal.header (component)
      .top
        breadcrumb (component)
        .utilities (0..1)
          button + button (component, 1..n)
      .info
        .title
        .description (0..1)
      ‹content: header› (0..1)
      .actions (0..1)
        button + button (component, 1..n)
      tabs (component, 0..1)
        tabs (component)
      .filters (0..1)
        ‹content: filters›
    drawer-layout.content (component)
      list + card (component, 0..1)
      slot[name="content"].main
      slot[name="trailing"].trailing + card (component, 0..1)
  tabs.panel (component)
    card | agent-shell (component, 0..1)
```

```mermaid
flowchart TD
  n0["body[class~=&quot;instui-display-flex&quot;]"]:::cssdoc-root
  n1(["side-nav-bar"]):::cssdoc-component
  n2(".container"):::cssdoc-part
  n3(["modal.header"]):::cssdoc-component
  n4(".top"):::cssdoc-part
  n5(["breadcrumb"]):::cssdoc-component
  n6(".utilities"):::cssdoc-part
  n7(["button + button"]):::cssdoc-component
  n8(".info"):::cssdoc-part
  n9(".title"):::cssdoc-part
  n10(".description"):::cssdoc-part
  n11[/"‹content: header›"/]:::cssdoc-slot
  n12(".actions"):::cssdoc-part
  n13(["button + button"]):::cssdoc-component
  n14(["tabs"]):::cssdoc-component
  n15(["tabs"]):::cssdoc-component
  n16(".filters"):::cssdoc-part
  n17[/"‹content: filters›"/]:::cssdoc-slot
  n18(["drawer-layout.content"]):::cssdoc-component
  n19([".list + card"]):::cssdoc-component
  n20("slot[name=&quot;content&quot;].main"):::cssdoc-part
  n21(["slot[name=&quot;trailing&quot;].trailing + card"]):::cssdoc-component
  n22(["tabs.panel"]):::cssdoc-component
  n23(["card | agent-shell"]):::cssdoc-component
  n0 --> n1
  n4 --> n5
  n6 -->|1..n| n7
  n4 -.->|0..1| n6
  n3 --> n4
  n8 --> n9
  n8 -.->|0..1| n10
  n3 --> n8
  n3 -.->|0..1| n11
  n12 -->|1..n| n13
  n3 -.->|0..1| n12
  n14 --> n15
  n3 -.->|0..1| n14
  n16 --> n17
  n3 -.->|0..1| n16
  n2 --> n3
  n18 -.->|0..1| n19
  n18 --> n20
  n18 -.->|0..1| n21
  n2 --> n18
  n0 --> n2
  n22 -.->|0..1| n23
  n0 --> n22
  click n1 "/api/css/side-nav-bar.md"
  click n3 "/api/css/modal.header.md"
  click n5 "/api/css/breadcrumb.md"
  click n7 "/api/css/button.md"
  click n13 "/api/css/button.md"
  click n14 "/api/css/tabs.md"
  click n15 "/api/css/tabs.md"
  click n18 "/api/css/drawer-layout.content.md"
  click n19 "/api/css/card.md"
  click n21 "/api/css/card.md"
  click n22 "/api/css/tabs.panel.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Slots

| Slot       | Description                        |
| ---------- | ---------------------------------- |
| `content`  | محتوى الصفحة الأساسي.              |
| `filters`  | محتوى مرشحات اختياري داخل الرأس.   |
| `header`   | فتحة رأس اختيارية أسفل وصف الصفحة. |
| `panel`    | محتوى لوحة الأدوات.                |
| `trailing` | محتوى مكمل نهائي.                  |

## Parts

| Part           | Description                                               |
| -------------- | --------------------------------------------------------- |
| `.actions`     | أزرار رأس اختيارية في نهاية الصف العلوي.                  |
| `.container`   | عمود الصفحة الرئيسي الذي يحتوي على الرأس والمحتوى.        |
| `.content`     | منطقة المحتوى الأساسي داخل عمود الحاوية.                  |
| `.description` | وصف صفحة اختياري أسفل العنوان.                            |
| `.filters`     | منطقة مرشحات اختيارية داخل الرأس.                         |
| `.header`      | منطقة الرأس داخل عمود الحاوية.                            |
| `.info`        | حاوية لعنوان الصفحة والوصف الاختياري.                     |
| `.list`        | عمود الملاحة الاختياري داخل المحتوى.                      |
| `.main`        | عمود المحتوى الرئيسي داخل المحتوى.                        |
| `.panel`       | منطقة لوحة الأدوات التي تفتح على الجانب الأيمن من الصفحة. |
| `.tabs`        | علامات تبويب ملاحة اختيارية في بداية صف المحتوى.          |
| `.title`       | عنوان الصفحة أسفل الصف العلوي.                            |
| `.top`         | صف شبكة يحتوي على breadcrumbs والأدوات.                   |
| `.trailing`    | عمود مكمل اختياري داخل المحتوى.                           |
| `.utilities`   | إجراءات الأدوات في نهاية الصف العلوي.                     |

## States

| State       | Description |
| ----------- | ----------- |
| `:optional` | —           |

## Tokens consumed

| Token                            | Type | Value |
| -------------------------------- | ---- | ----- |
| `--instui-background-color-page` | —    | —     |

## Subcomponents

- [agent-shell](/ar/api/css/agent-shell.md)
- [breadcrumb](/ar/api/css/breadcrumb.md)
- [button](/ar/api/css/button.md)
- [card](/ar/api/css/card.md)
- [drawer-layout.content](/ar/api/css/drawer-layout.content.md)
- [list](/ar/api/css/list.md)
- [modal.header](/ar/api/css/modal.header.md)
- [side-nav-bar](/ar/api/css/side-nav-bar.md)
- [tabs](/ar/api/css/tabs.md)
- [tabs.panel](/ar/api/css/tabs.panel.md)

## Related

- [card](/ar/api/css/card.md)
- [agent-shell](/ar/api/css/agent-shell.md)
- [breadcrumb](/ar/api/css/breadcrumb.md)
- [tabs](/ar/api/css/tabs.md)
- [button](/ar/api/css/button.md)
- [heading](/ar/api/css/heading.md)
