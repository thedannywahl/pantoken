# CSS: metric

`.instui-metric` — A labelled statistic — a large value over a caption.

Sets its own `gap` between the value and label, and its own horizontal `padding`; chaining a `-gap-*`/`-p-*`/`-padding-*` spacing utility modifier overrides those built-in values.

**Source:** [metric.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/metric/metric.css)

## 사용법

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/metric.css";
```

## 예제들

```html
<div class="instui-metric">
  <span class="value">1,284</span>
  <span class="label">Active users</span>
</div>
```

## 구조

```text
.instui-metric
  .value
  .label
```

```mermaid
flowchart TD
  n0[".instui-metric"]:::cssdoc-root
  n1(".value"):::cssdoc-part
  n2(".label"):::cssdoc-part
  n0 --> n1
  n0 --> n2
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## 수정자

| 수정자 | 설명 |
| --- | --- |
| `.-text-align-center` | Centre the value and label. |
| `.-text-align-end` | End-align the value and label. |
| `.-text-align-start` | Start-align the value and label. |

## 부분

| 부분 | 설명 |
| --- | --- |
| `.label` | The caption beneath the value. |
| `.value` | The large metric number. |

## 사용된 토큰

| 토큰 | 타입 | 값 |
| --- | --- | --- |
| `--instui-component-metric-gap-texts` | `<length>` | `0.5rem` |
| `--instui-component-metric-label-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-metric-label-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Atkinson Hyperlegible Next, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-metric-label-font-size` | `<length>` | `0.75rem` |
| `--instui-component-metric-label-font-weight` | `<integer>` | `400` |
| `--instui-component-metric-label-line-height` | `<length>` | `0.75rem` |
| `--instui-component-metric-padding-horizontal` | `<length>` | `0.5rem` |
| `--instui-component-metric-value-color` | `<color>` | `light-dark(#273540, #ffffff)` |
| `--instui-component-metric-value-font-family` | `[ <font-family-name> \| <generic-font-family> ]#` | `Inclusive Sans, "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `--instui-component-metric-value-font-size` | `<length>` | `1.75rem` |
| `--instui-component-metric-value-font-weight` | `<integer>` | `600` |
| `--instui-component-metric-value-line-height` | `<length>` | `1.75rem` |

