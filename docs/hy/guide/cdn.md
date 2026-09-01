# CDN և բաշխում

pantoken-ը ամեն փաթեթը հրապարակում է npm-ում, այնպես որ կարող եք քաշել tokens, components և web components ուղղակի CDN-ից — առանց build քայլի, առանց bundler։ Այս էջը համաձայնում է CSS combine URL-ին (עם interactive builder), ինչպես նաև web-component drop-ins։

## Տոկենի հիմք

Յուրաքանչյուր pantoken կոմպոնենտ կկարդա `--instui-*` custom properties՝ էջի վրա գտնվող token թարպից։ Ենթակատեգորիաներ են առկա՝

- `@pantoken/css/dist/style.lean.css` — առաջարկվող CDN հիմքը։ Այն կրել է բոլոր token-երը բացի ամբողջ icon հավաքածուից, այնպես որ մոտ 23 KB gzipped է։
- `@pantoken/css/dist/style.css` — ամբողջ թերթը, որը ներառում է բոլոր շուրջ ~1,777 icon glyph token-ները (`--instui-icon-*`)։ մոտ 140 KB gzipped։ Օգտագործեք այսը, եթե լայնորեն հղում եք անում իկոններին `var(--instui-icon-*)`-ի միջոցով։

Elevation սանդղակը և focus-ring փոփոխականները կան երկուսն էլ թերթերում, այնպես որ ստվերները և focus մատնանշիչը աշխատում են միայն հիմքը լցված լինելու դեպքում։

## Ընտրեք ձեր կոմպոնենտներն ու իկոնները

[interactive CDN picker](/guide/cdn-picker)-ը կառուցում է jsDelivr combine URL-ներ CSS-ի համար և սնիպետներ JavaScript փաթեթների համար։ Բացեք այն, նշեք ինչ պետք է, և պատճենեք գեներացված ելքը։

- **Components tab** — ընտրեք առանձին կոմպոնենտի stylesheet-ները կամ ամբողջ `components.css` barrel-ը։ Ավելացրեք base reset-ը կամ spacing/color utilities եթե հարկավոր է։
- **JS tab** — պատճենեք ESM import սնիպետ `@pantoken/interactions`-ի համար։
- **Icons tab** — ընտրեք առանձին իկոններ InstUI հավաքածուից (~1,800 իկոն) կամ Simple Icons-ից (~3,300 բրենդ glyph)։ Picker-ը հանել է տարբեր combine URL-ի icon CSS ֆայլերի համար որպեսզի կարողանաք լթացնել միայն այն իկոնները որոնք իսկապես օգտագործում եք։
- **Web Components tab** — կառուցեք `@pantoken/web-components` սնիպետներ (ESM selective register կամ classic script bootstrap)։

Յուրաքանչյուր կոմպոնենտի ֆայլը փոքր է — մեծամասնությունը մոտ 2 KB է։ Կոմպոնենտ, որը շարունակում է իկոններ (`alert`, `checkbox`,
և մի քանիսը այլք) պետք է այդ glyph-ները, այնպես որ builder-ը ավելացնում է `@pantoken/components/dist/component-icons.css` (մոտ
0.5 KB gzipped — այն 11 իկոնը որոնք կոմպոնենտի հավաքածուն օգտագործում է) երբ ընտրում եք lean թերթը։ ամբողջ թերթը արդեն դրանք կրում է։

### Լիցքավորման կարգը և տառատեսակները

Առաջին լիցքեք token հիմքը, հետո ցանկության դեպքում base reset-ը, հետո կոմպոնենտ ֆայլերը, և utilities-ը վերջում — դրանք override utilities են, դրա համար իրականում override կնկատվի միայն երբ նրանք cascade-ում տեղ են հասնում կոմպոնենտի own rule-ից հետո։ Combine URL-ը վերևում արդեն դրանք հարմար կարգով է դասավորել։ Թղթաբառերը մի բացառություն են՝ `@pantoken/components/dist/fonts.css`-ը ցույց է տալիս font ֆայլերը հարաբերական ուղիով, այդ պատճառով combine չի կարող դրանք վերանայել — լիցքեք այն որպես իր սեփական `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Բոլորը միանգամից

Ծանոթացեք picker-ում **All components** նշելով այն որպեսզի այն տեղափոխվի barrel-ին, կամ ուղղեք ուղղակի այն (մոտ 141 KB
gzipped) token թերթի կողքին։

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web կոմպոնենտներ

`@pantoken/web-components` գրանցում է framework-agnostic `<instui-*>` custom elements։ Նրանք ներառում են իրենց սեփական CSS-ը inline, բայց դեռ կարդում են tokens էջի թերթից, այդ պատճառով լիցքեք նաև token հիմքը։

### ES մոդուլներ (առաջնահետևյալ)

ESM CDN-ը լուծում է փաթեթի կախվածությունները ձեզ համար։ Սա գրանցում է բոլոր element-ները։

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Օգտագործեք ամբողջ token թերթը (կամ lean թերթը գումարած `component-icons.css`) այնպես որ իկոն-Rendering element-ներ, ինչպիսիք են `<instui-alert>`, գտնեն իրենց glyph-ները։

Միայն որոշ element-ներ գրանցելու համար — և նրանց nested կախվածությունները — ներմուծեք `register` և փոխանցեք `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Դասիկ script tag

No-modules drop-in-ի համար լիցքեք IIFE build-ը։ Այն փաթեթավորում է իր կախվածությունները և auto-register կկատարի յուրաքանչյուր
element-ի վրա լիցքավորման ժամանակ, բացելով `PantokenWebComponents` գլոբալը։

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Այն ավելի մեծ է քան ESM տարբերակն — inline է `@pantoken/components` և `@pantoken/icons` — այնպես որ օգտագործեք այն միայն երբ modules-ներ չեք կարող օգտագործել։

## Վարկածների pin-ning

Վերևի URL-ները — և այդ որոնք գրում է picker-ը — հետևում են վերջին թողարկմանը։ Pin արեք major (կամ հստակ) վարկած արտադրության համար — օրինակ `@pantoken/css@0` — որպեսզի թարմացում չգա անակնկալ։
