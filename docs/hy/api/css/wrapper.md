# CSS: wrapper

`body[class~="instui-display-flex"]` — Բանի-վճռ շարք՝ կողքի նավ, ցանցակ՝ վերնագրով և ընտրովի վահանակ:

✅ Օգտագործել Wrapper երբ:

- Ամբողջական Canvas ապրանքային էջ կառուցել, որը պահանջում է հետևողական դասավորման թաղ
- Էջը օգտագործում է GlobalNav որպես հիմնական նավիգացիայի միավոր
- Էջին անհրաժեշտ են կողային վահանակներ. ContentTabList, TrailingContentArea կամ UtilityPanel
- Ձեզ հարկավոր է հետևողական տարայի անցակ և բովանդակության առավելագույն լայնություն ամբողջ էջում
🚫 Մի օգտագործեք Wrapper երբ.

- Modal, Tray կամ Drawer կառուցել — նրանք ունեն իրենց սեփական դասավորման տարայներ
- Էջի ենթաբաժինը փաթեթավորել — Wrapper-ը պարունակում է ամբողջ էջը, ոչ թե մի շրջան

## Մուտքականություն

- Հիմնական բովանդակության տարածքը քարտեզագրել &lt;main&gt; վանդակային կետի հետ skip-nav հղումով, որպեսզի ստ键բորդի օգտատերերը կարողանան անցնել GlobalNav-ից
- Տալ ContentTabList-ին role="navigation" հստակ aria-label-ով, ինչպես "Էջի նավիգացիա" — առանձին GlobalNav-ի վանդակային կետից
- Տալ TrailingContentArea-ին role="complementary" նկարագրական aria-label-ով, որը արտացոլում է դրա բովանդակությունը, ինչպես "Ուսանողի մանրամասներ"
- Տալ յուրաքանչյուր UtilityPanel-ին հստակ aria-label. "AI 助手", "Ծանուցումներ" կամ "Ֆիլտրեր"
- Երբ UtilityPanel բացվում է, տեղափոխել ֆոկուսը վահանակի մեջ; երբ դա փակվում է, վերադարձնել ֆոկուսը այն ձգանին, որը բացել է այն

## Օգտագործում

```css
@import "@pantoken/plugin-layouts/layouts.css";
```

## Կառուցվածք

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

## Նրբեր (Slots)

| Նրբասեղան (Slot) | Նկարագիր |
| --- | --- |
| `content` | Հիմնական էջի բովանդակություն։ |
| `filters` | Ընտրովի ֆիլտրերի բովանդակություն վերնագրի ներսում։ |
| `header` | Ընտրովի վերնագրի բացատ էջի նկարագրության տակ։ |
| `panel` | Կոմունալական վահանակի բովանդակություն։ |
| `trailing` | Հետևորդ լրասահամանի բովանդակություն։ |

## Մասեր

| Մաս | Նկարագիր |
| --- | --- |
| `.actions` | Ընտրովի վերնագրի կոճակներ վերին շարքի վերջում։ |
| `.container` | Հիմնական էջի սյունակ, որ պահում է վերնագիր և բովանդակություն։ |
| `.content` | Հիմնական բովանդակության շրջան տարայի սյունակի ներսում։ |
| `.description` | Ընտրովի էջի նկարագրություն վերնագրի տակ։ |
| `.filters` | Ընտրովի ֆիլտրերի շրջան վերնագրի ներսում։ |
| `.header` | Վերնագրի շրջան տարայի սյունակի ներսում։ |
| `.info` | Տարա էջի վերնագրի և ընտրովի նկարագրության համար։ |
| `.list` | Ընտրովի նավիգացիայի սյունակ բովանդակության ներսում։ |
| `.main` | Հիմնական բովանդակության սյունակ բովանդակության ներսում։ |
| `.panel` | Կոմունալական վահանակի շրջան, որ բացվում է էջի աջ կողմում։ |
| `.tabs` | Ընտրովի նավիգացիայի ներդիրներ բովանդակության շարքի սկզբում։ |
| `.title` | Էջի վերնագիր վերին շարքի տակ։ |
| `.top` | Ցանց շարք, որ պարունակում է հաղորդատող և կոմունալ ծառայություններ։ |
| `.trailing` | Ընտրովի լրասահամանի սյունակ բովանդակության ներսում։ |
| `.utilities` | Կոմունալական գործողություններ վերին շարքի վերջում։ |

## Փոփոխական վիճակներ

| Վիճակ | Նկարագիր |
| --- | --- |
| `:optional` | — |

## Ցուցիչներ սպառված

| Տոկեն | Տիպ | Արժեք |
| --- | --- | --- |
| `--instui-background-color-page` | — | — |

## Ենթակարողություններ

- [agent-shell](/hy/api/css/agent-shell.md)
- [breadcrumb](/hy/api/css/breadcrumb.md)
- [button](/hy/api/css/button.md)
- [card](/hy/api/css/card.md)
- [drawer-layout.content](/hy/api/css/drawer-layout.content.md)
- [list](/hy/api/css/list.md)
- [modal.header](/hy/api/css/modal.header.md)
- [side-nav-bar](/hy/api/css/side-nav-bar.md)
- [tabs](/hy/api/css/tabs.md)
- [tabs.panel](/hy/api/css/tabs.panel.md)

## Ավելին կապված

- [card](/hy/api/css/card.md)
- [agent-shell](/hy/api/css/agent-shell.md)
- [breadcrumb](/hy/api/css/breadcrumb.md)
- [tabs](/hy/api/css/tabs.md)
- [button](/hy/api/css/button.md)
- [heading](/hy/api/css/heading.md)

