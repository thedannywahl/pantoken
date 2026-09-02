[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / Target

# Ինտերֆեյս: Target

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Թիրախ որ հայտնաբերվել է իր `pantoken` դաշտով:

## Առանձնահատկություններ

### pkg

> **pkg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Փաթեթի անունը, օրինակ `@pantoken/astro`:

***

### key

> **key**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Համախմբման բանալին / արտահանման անունը, օրինակ `astro`:

***

### kind

> **kind**: `"namespace"` \| `"sideEffect"` \| `"subpath"`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Թե ինչպես է թիրախը բացահայտվում:
- `namespace` — վերա-արտահանվել է նկատի բարելի մեջ *և* որպես ստորուղի:
- `sideEffect` — ստորուղին բեռնում է փաթեթի `/inject` մուտքը; նաև բարելում:
- `subpath` — ստորուղի միայն, պահվել է դուրս նկատի բարելից (ծանր համակցիների համար, ինչպես React, այնպես որ
  `import "pantoken"` երբեք չի բեռնում դրանք):
