# CSS: agent-shell

`.instui-agent-shell` — A surface container for AI agents.

## Ngā Whakamahi

```css
@import "@pantoken/plugin-custom-components/custom-components.css";
```

## Ngā tauira

-nocard
```html
<div class="instui-agent-shell --p-md">
  <h2 class="instui-heading -variant-title-card-large">AI Agent</h2>
  <p>Content here.</p>
  <button class="instui-button">Action</button>
</div>
```

## Hanganga

```text
.instui-agent-shell
  ‹content›
```

```mermaid
flowchart TD
  n0[".instui-agent-shell"]:::cssdoc-root
  n1[/"‹content›"/]:::cssdoc-slot
  n0 --> n1
  classDef cssdoc-root fill:#eef2ff,stroke:#6366f1,color:#1e1b4b;
  classDef cssdoc-part fill:#f8fafc,stroke:#94a3b8,color:#0f172a;
  classDef cssdoc-slot fill:#f0fdf4,stroke:#4ade80,color:#14532d;
  classDef cssdoc-component fill:#fff7ed,stroke:#fb923c,color:#7c2d12;
```

## Ngā tohu i whakamahia

| Tohu | Momo | Uara |
| --- | --- | --- |
| `--instui-border-width-sm` | `<length>` | `0.0625rem` |
| `--instui-color-background-base` | `<color>` | `light-dark(#ffffff, #10141A)` |
| `--instui-color-stroke-ai-bottom-gradient` | `<color>` | `light-dark(#00828E, #04A4B7)` |
| `--instui-color-stroke-ai-top-gradient` | `<color>` | `light-dark(#9E58BD, #B680CC)` |
| `--instui-component-shared-tokens-border-radius-card-lg` | `<length>` | `1rem` |

## Tirohia anō

- https://www.figma.com/design/EmUrCpRWxboBTWEokGiBKP/Agent-Platform?node-id=1045-60738

