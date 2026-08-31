[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnFile

# Interface: CdnFile

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Մեկ ֆայլ՝ բեռնել CDN-ից, որը բացահայտ npm փաթեթ անունով և ճանապարհով դրա մեջ:

## Properties

### package

> **package**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

npm փաթեթ անունը, օրինակ `"@pantoken/components"`:

---

### path?

> `optional` **path?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Փաթեթի ներսում ուղին, օր․ `"dist/components.css"`. Բաց թողեք փաթեթի արմատին հղում անելու համար։

---

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Վերակարգավորում է մատակարարի/կառուցման մակարդակի տարբերակը միայն այս ֆայլի համար

---

### raw?

> `optional` **raw?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Տրամադրիչների համար, որոնք լռելյայն փոխակերպում են JS-ը (esm.sh): `false` թույլ է տալիս տրամադրիչին կիրառել իր սովորական ESM փոխակերպումը (պահանջվում է `import` իրական փաթեթի մուտքային կետ): Լռելյայն `true` է — ծառայել ֆայլը բառացիորեն, պահանջվում է կառուցված/ոչ-ESM ակտիվների համար, ինչպես CSS թերթեր և IIFE կապոցներ:
