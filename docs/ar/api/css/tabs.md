# CSS: tabs

`.instui-tabs` — مجموعة لوحات بعلامات تبويب: قائمة علامات تبويب، علامات قابلة للاختيار، ولوحاتها.

انظر إلى الأعضاء `tabs.tab` و `tabs.panel` لأزرار علامات التبويب الفردية ولوحات المحتوى الخاصة بها.

**المصدر:** [panel.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/tabs/members/panel/panel.css)

## سهولة الوصول

اربط قائمة علامات التبويب بالـ role="tablist"، وكل علامة تبويب بالـ role="tab" و aria-selected، وكل لوحة بالـ role="tabpanel".

## الاستخدام

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/tabs.css";
```

## أمثلة

```html
<div class="instui-tabs">
  <div class="list" role="tablist" aria-label="Default tabs">
    <button class="tab -selected" role="tab" aria-selected="true">Overview</button>
    <button class="tab" role="tab" aria-selected="false">Details</button>
    <button class="tab -disabled" role="tab" aria-disabled="true" disabled>Disabled</button>
    <button class="tab" role="tab" aria-selected="false">History</button>
  </div>
  <div class="panel" role="tabpanel">The Overview tab's content shows here.</div>
</div>
```

## الهيكل

```text
.instui-tabs
  list (component)
    tabs.tab (component, 0..n)
  tabs.panel (component, 0..n)
```

```mermaid
flowchart TD
  n0[".instui-tabs"]:::cssdoc-root
  n1(["list"]):::cssdoc-component
  n2(["tabs.tab"]):::cssdoc-component
  n3(["tabs.panel"]):::cssdoc-component
  n1 -->|0..n| n2
  n0 --> n1
  n0 -->|0..n| n3
  click n1 "/api/css/list.md"
  click n2 "/api/css/tabs.tab.md"
  click n3 "/api/css/tabs.panel.md"
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## المعدّلات

| معدّل | الوصف |
| --- | --- |
| `.-overflow-scroll` | حافظ على قائمة علامات التبويب في سطر واحد ودعها تنزلق أفقياً بدلاً من الالتفاف، مع إخفاء شريط التمرير. |
| `.-variant-secondary` | علامات تبويب "مجلد" مستديرة مع علامة مختارة تتصل بصرياً باللوحة أدناه. @affects tabs.tab — يعيد تنسيق أزرار علامات التبويب لتبدو بمظهر "مجلد" مستدير. |

## الأجزاء

| جزء | الوصف |
| --- | --- |
| `.list` | صف علامات التبويب. |

## الرموز المستهلكة

| رمز | نوع | قيمة |
| --- | --- | --- |
| `--instui-component-tabs-default-background` | `<color>` | `#00000000` |

## مكونات فرعية

- [list](/ar/api/css/list.md)
- [tabs.panel](/ar/api/css/tabs.panel.md)
- [tabs.tab](/ar/api/css/tabs.tab.md)

