[pantoken](../../../index.md) / vitepress

# vitepress

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/vitepress` — VitePress կայքին թեմա տալ Instructure մեջբերումներով:

VitePress-ի թեմայի ընտրությունը վարվում է `--vp-*` CSS փոփոխականներով: Սա ուղղում է դրանք դեպի `var(--instui-*)`, ուստի
արդյունքը `.vitepress/theme/custom.css`-ի մեջ նետելը (մեկտեղ `@pantoken/css`-ի հետ, որը սահմանում է
կաղապար հատկությունները) վերականգնում է փաստաթղթերի տեսքը Instructure արտաքինի հետ, մինչ լույս/մուգ շարունակում է
հոսել նույն մեջբերումների միջով:

## Interfaces

- [ToVitePressCssOptions](interfaces/ToVitePressCssOptions.md)

## Variables

- [VITEPRESS\_TO\_INSTUI](variables/VITEPRESS_TO_INSTUI.md)
