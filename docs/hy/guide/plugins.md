# Պլագիններ

pantoken պլագինը ձգում է տոկենի կամ CSS-ի ելքը՝ առանց փաթեթի ֆորկ անելու: Դրան կառուցում են `definePlugin`-ով `@pantoken/plugin-kit`-ից, ապա փոխանցում `buildTokens` կամ `toCss`-ին:

## Ստեղծել պլագին

Տվեք `definePlugin` այն hook-երը, որոնք իրականացնում եք: Այն վերադարձնում է սովորական պլագին՝ ապրանքանշանավորված այն հնարավորություններով, որոնք ենթադրվում են այդ hook-երից: Պլագինը կարող է ընդլայնել IR-ը (`tokens`, `icons`), CSS ելքը (`css`), կամ երկուսը միաժամանակ:

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Դիմակայունակ գրանցում

`buildTokens` և `toCss` կատարում են `checkPlugins`՝ այն պլագինների վրա, որոնց փոխանցում եք: Դրանք նախազգուշացնում են — երբեք չեն գցում բացառություն — երբ պլագինն այդ փուլի համար համապատասխան hook չունի, այնպես որ token-միայն պլագինը, որը փոխանցվել է `toCss`-ին, բացատրագրով նկարվում է և չի մնում լուռ:

## Պլագինների կոմպոզիցիա

Ըստ մեկ այլ պլագինի վերակառուցման համար օգտագործեք `extendPlugin`, կամ համախմբեք զավթակիցները `mergePlugin`-ով:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Միմյանցնե նույն-փուլի hook-երը կոմպոզիցավորվում են. `tokens` առաջինը կատարում է հիմքը, ապա հավելվածը, `css` միաձուլում է երկու ավանդները, և `icons` կատարում է երկուսն էլ:

## Վalidատացնել ձեր պլագինի ելքը

Քոմըն՝ միասնական drift-чեքերը `@pantoken/utils`-ից ձեր պլագինի սեփական ելքի վրա նրա թեստում, որպեսզի տեքստային սխալը կամ վերանվանված տոկենը արագ և տեղական ձախողվի:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Փաթեթավորված պլագինները

- `@pantoken/plugin-simple-icons` — brand icons՝ simple-icons-ից, գրանցված որպես icon token-ներ:
- `@pantoken/plugin-lucide-lab` — Lucide Lab icons, գրանցված որպես `--instui-icon-*` image token-ներ:
- `@pantoken/plugin-logos` — Instructure-ի արտադրանքի լոգոները որպես SVG-եր, data URI-ներ և `--instui-logo-*` image token-ներ:
- `@pantoken/plugin-prune-custom-props` — PostCSS պլագին (ոչ pantoken պլագին), որը հեռացնում է չկիրառվող custom properties-ները stylesheet-ից:
- `@pantoken/plugin-custom-theme-colors` — վերատանել կաղապարը՝ առավելություն տալով էջին՝ մի հատ attribut (`data-pantoken-color`) անելով 13 պալիտրաերից մեկին, կամ `custom`-ին ցանկացած brand hex-ի համար: Տեսեք [Թեմայի գույներ](#theme-colors):
- `@pantoken/plugin-custom-components` — token-ով հենված custom կոնտրոլներ, ներառյալ SegmentedControl և SkeletonLoader:

### Սեգմենտացված կոնտրոլ

Օգտագործեք սեգմենտացված կոնտրոլը երկուից մինչև հինգ կապված դիտարկումների կամ ֆիլտրերի համար: Յուրաքանչյուր տարբերակը մի մակնշված բնական radio է մեկ անունով խմբում; նշեք մեկը սկզբնականում checked: Օգտագործեք tabs կամ dropdown, եթե տարբերակները տեղավորվել չեն հարմարավետորեն, և օգտագործեք button groups գործողությունների համար՝ ոչ ընտրությունների համար: `-size-md` ոճը էդֆելտն է, իսկ `-size-sm` և `-size-lg`-ը ավելի սեղմ և ավելի ակնառու համատեքստների համար:

Իմպորտ արեք `@pantoken/plugin-custom-components/segmented-control.css` կոնտրոլի և նրա overflow կոճակների համար: Օգտագործեք `-icon-*` կլասը սեգմենտի լեյբլի վրա, երբ սեգմենտը պահանջում է գլիֆ; ինտերաքցիայի հելփերը նաև բարձրացնում է `-icon-*` կլասը նրա բնական input-ից դեպի լեյբլի ներկողը: Տվեք fieldset-ին նկարագրական `aria-label` կամ տեսանելի legend: Հելփերը պահպանում է բնական radio հայտարարումը, ավելացնում է ստեղնաշարի նավիգացիան և ըստ ցանկության բացահայտում է մեկ կտրած սեգմենտ յուրաքանչյուր աղեղի վրա սեղմողը: Օգտագործեք տրամաբանական start/end կոնտրոլներ և մատչելի կոճակ-լեյբլներ երկու ուղղություններով:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Իմպորտ արեք `@pantoken/interactions/segmented-control.iife.js` DOM-Ready գրանցման համար, կամ անեք `initSegmentedControl(fieldset, { size: "md", isOverflown: true })`-ը `@pantoken/interactions`-ից և կանչեք `cleanup()`՝ երբ հեռացնում եք այն: CSS-ն և բնական radio ընտրությունները աշխատում են առանց JS-ի; overflow աղեղները պահանջում են վարքաբնական կոդը: Ընտրված օբյեկտը օգտագործում է երկշերտ դիզայնի ստվերը semantic drop-shadow գույքների միջից; այն առանձնահատուկ active-item ստվեր է, ոչ թե գոյություն ունեցող `--instui-elevation-*` կոմպոզիտից: Overflow կոճակները օգտվում են upstream elevation3 կոմպոնենի token-ներից `--pantoken-segmented-overflow-shadow`-ի միջոցով:

### Skeleton բեռնում

`skeleton-loader.css` ենթաբաժինը ձևավորում է մեկ զարդարական Text, Avatar, կամ Image տեսք: Text-ը ընդունում է `-size-xxs`-ը մինչ `-size-xxl`; Avatar և Image-ը միջին չափի են: Յուրաքանչյուր նվիրված `.skeleton-row` ավելացնում է մեկ տեքստ-տող առանց չափը փոխելու: CSS shimmer-ը կանգ է առնում երեք 1.5-վայրկյան sweeping-ներից հետո և մնում է σταատիկ, երբ օգտատերը նախընտրում է նվազեցված շարժում: Այն աշխատում է դեռևս JavaScript-ի ներբեռումից առաջ:

Տարբերակները տեղադրել միայն այնտեղ, որտեղ հարցում-կախված բովանդակությունը կհայտնվի, ոչ թե սերվերից հայտնի նավիգացիայի, ֆիլտրերի, վերնագրերի կամ կոնտրոլների վրա: Skeleton-ը չի հանդիսանում պրոգրես-մետր կամ գործողությունից զբաղված վիճակ: Պահեք գոյություն ունեցող բովանդակությունը տեսանելի ֆոնային թարմացումների ընթացքում; գործողությունների համար օգտագործեք spinner կամ button busy state:

Ծայրային հավելվածը տիրապետում է loading, loaded, empty և error նշագրին: Մատակարարեք մեկ empty status region էջի համար և առանձին empty alert ՍԵՐՎԵՐ HTML-ում, երկուսն էլ՝ անհատական busy բովանդակության շրջանից ԱՐԱՑ:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Կոչ արեք ծնողական մակարդակի վարքագիծը՝ երբ հարցի վիճակը փոխվի: Այն թարմացնում է `aria-busy`-ը և երկու նախօրոք գոյություն ունեցող հայտարարությունները, բայց երբեք չի փոխարինում բովանդակությունը կամ չի տեղափոխում ֆոկուսը:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Եթե օգտագործվում է per-component interactions bundle-ը՝ ուղիղ import-ի փոխարեն, dispatch արեք `pantoken:skeleton-state` իրադարձությունը `[data-skeleton-region]` էլեմենտի վրա `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`-ով: Տեմպ-պատմրությունը հետաձգեք _ցուցադրումը_ 200–500 մս՝ արագ հարցումների համար; վարքագիծը անկախորեն հետաձգում է loading հայտարարումը 400 մս-ով: Պասիվ էջ-բեռնումների դեպքում թողեք ֆոկուսը այնտեղ, որտեղ այն է: Միակնորդ ծպտել ֆոկուսն նոր բեռված արդյունքի վրա միայն այն ժամանակ, երբ օգտատիրոջ սեփական գործարքն է այն պահանջել: Status node-ը հայտարարում է արդյունքները և empty վիճակները; alert node-ը հայտարարում է ձախողումները: Մի միավորեք `aria-busy`, `role="status"`, և `role="alert"` մի էլեմենտի վրա:

Lucide Lab-ի ռեգիստրը կարելի է լազի պարբերաբար լցնել, ապա փոխանցել synchronous token hook-ին:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Մի քանի այն բանից, ինչը նախկինում եղել է պլագին, այժմ առաքվում է `@pantoken/components`-ում, քանի որ շատ կոմպոնենտներ դրանց կարիքն ունեն՝ դուրս տուփից. elevation ստվերները (`--instui-elevation-*`, `components.css`), focus-outline օղակը (`base.css`-ում — բոլոր focus-կարողները ստանում են այն, երբ pantoken-ը տիրապետում է էջին), և Instructure-ի բրենդ فونտերը (Atkinson Hyperlegible Next: `base.css` կիրառում է `--instui-font-family-base`; opt-in `@pantoken/components/fonts.css` լիցքավորում է `@font-face` woff2-երը):

## Թեմայի գույներ

`@pantoken/plugin-custom-theme-colors` արձակում է մեկ `[data-pantoken-color="…"]` բլոկ յուրաքանչյուր պալետայի համար
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Յուրաքանչյուր բլոկը ուղղորդում է brand primitives-ները (`--instui-primitive-color-navy-*` և `-blue-*`) ընտրված պալետային: Դա նաև վերամկրտում է brand մակերեսները, որոնք upstream-ը բրաշել էր որպես literal hex, պահպանելով դրանց baked alpha-ն `color-mix()`-ի միջոցով: Սեմանտիկ status գույները, արտահայտված կապույտ ակցենտները և elevation ստվերները տեղում են: Փորձեք այն
[swatch-based theming demo]-ում (https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html):

```html
<html data-pantoken-color="sea"></html>
```

### Մանրացված բրենդ գույն

Ստեղեք `data-pantoken-color="custom"`՝ վերաբերելու համար որևէ hex-ից՝ օրինակ՝ այն հիմնական գույնը, որը Canvas-ի ադմինը տպում է Theme Editor-ում: pantoken-ն այնից դուրս է բերում ամբողջ 10–200 `--instui-primitive-color-custom-*` սանդղակը:

1. **Հղման منحար:** Յուրաքանչյուր քայլի նպատակային լուսավորությունը է OKLCH-ի 13 պալետաների այդ քայլի միջին լուսավորությունը, 0-ը ֆիքսված է սպիտակում և 210-ը սևում: Այսպես՝ սովորական սանդղակի տարածումը համընկնում է ուղարկված պալետաների տարածման հետ:
2. **Անկոր:** Մուտքը ընկնում է այն քայլի վրա, որի նպատակային լուսավորությունը մոտ է իր սեփականին, ապա սեղմվում է այդ եղանակով՝ նույնական լուսավորությանը: `#cccccc` դառնում է `custom-40` վրա `#c9c9c9`: մոտ է մուտքին, բայց ոչ միշտ նույնական: «Ամպատ» նշանակում է մոտագույն քայլն է منحարի վրա, ոչ այնտեղ եղած գոյություն ունեցող պալետայի ամենա մոտ գույնը:
3. **Լցնել:** Յուրաքանչյուր մյուս քայլ պահպանում է մուտքի երանգը: Նրա թռիչքը հետևում է պալետաների միջին հագեցվածության منحարին՝ anchors-ի նկատմամբ, և նվազեցվում է միայն այնտեղ, որտեղ գույնը դուրս է sRGB-ից:

Ընդունվում են միայն `#rgb` և `#rrggbb`; այլ բաներ գցում են `TypeError`-ը, այնպես որ ֆորմից ստացված hex-ը չի կարող CSS ներմուծել:

Աշխատանքային ժամանակ, արտագրեք ամբողջ կանոնը՝ նախապես հայտարարված Derived primitives-ներով:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

runtime-ում գույնը ընտրելու համար՝ առանց տոկեն-սետի առաքման, նախաիշխատացրեք منحարը և remap կանոնը build ժամանակ: Դրանից հետո օգտագործեք dependency-free `/scale` օղակը բրաուզերում և սահմանեք միայն 20 Derived primitives-ները:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

Docs կայքի թեմայի ընտրիչը, Canvas-ի թեմա-խմբագիրն և նշված դեմոն բոլորը աշխատում են այս կերպով:

Տեսեք [API reference](/api/) յուրաքանչյուր պլագինի export-ների համար.
