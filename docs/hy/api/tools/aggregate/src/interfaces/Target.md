[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / Target

# Interface: Target

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Թիրախ որ հայտնաբերվել է իր `pantoken` դաշտով:

## Properties

### pkg

> **pkg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Փաթեթի անունը, օրինակ `@pantoken/astro`:

---

### key

> **key**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Համախմբման բանալին / արտահանման անունը, օրինակ `astro`:

---

### kind

> **kind**: `"namespace"` \| `"sideEffect"` \| `"subpath"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Թե ինչպես է թիրախը բացահայտվում:

- `namespace` — վերա-արտահանվել է նկատի բարելի մեջ _և_ որպես ստորուղի:
- `sideEffect` — ստորուղին բեռնում է փաթեթի `/inject` մուտքը; նաև բարելում:
- `subpath` — ստորուղի միայն, պահվել է դուրս նկատի բարելից (ծանր համակցիների համար, ինչպես React, այնպես որ
  `import "pantoken"` երբեք չի բեռնում դրանք):
