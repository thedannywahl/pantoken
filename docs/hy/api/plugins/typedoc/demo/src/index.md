[pantoken](../../../../index.md) / demo

# demo

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/typedoc-plugin-demo` — TypeDoc plugin `@demo` block tag-ի համար:

Հեղինակ կցել կենդանի, embed-ի համար պատրաստ demo ցանկացած նշանի հետ `@demo &lt;spec&gt;`, որտեղ `&lt;spec&gt;` կամ
բաց URL կամ `&lt;provider&gt;:&lt;ref&gt;` զույգ (օրինակ `stackblitz:abc123`, `codesandbox:xy12z`,
`wp-playground:https://…/blueprint.json`, կամ `self:button`): Այս plugin-ը չի գրանցել որևէ բան
providers-ի մասին — այն միտումնավ մնում է հմուտ և կրկնօգտագործելի: այն տեղափոխել ամեն `@demo` tag-ի spec-ը
fence-ված `demo` block-ի մեջ ավելացված նշանի ամփոփմանը, և ձեր docs համարիչ որոշում անի թե ինչ կերպ
spec-ը վերածել iframe-ի: (Տե՛ս `@pantoken/demo` համարիչի համար, որ լուծում անի providers-ը:)

Fence-ը անցել markdown-ի միջով չաղտոտված — ներառյալ ցանկացած թարգմանական pipeline, որ պահպան
code blocks — այսինքն demo-ն գոյատեւում է լոկալիզացիայից:

**Setup:** ավելացնել `"@demo"` TypeDoc-ի `blockTags` ընտրանքին: Մեկնաբանության parser-ը կարդում է այդ ցուցակը նախ
plugins բեռնվել, այդ պատճառով plugin-ը չի կարող գրանցել tag-ը բավական ուշ "unknown block tag" ախտարար չկցներ;
այն պետք է լինել ձեր `typedoc.json`-ում:

## Օրինակ

```jsonc
// typedoc.json
{
  "plugin": ["typedoc-plugin-markdown", "@pantoken/typedoc-plugin-demo"],
  "blockTags": ["@param", "@returns", "@example", "@demo"]
}
```

## Փոփոխականներ

- [DEMO\_TAG](variables/DEMO_TAG.md)
- [DEMO\_FENCE](variables/DEMO_FENCE.md)

## Ֆունկցիաներ

- [toDemoFence](functions/toDemoFence.md)
- [rewriteComment](functions/rewriteComment.md)
- [load](functions/load.md)
