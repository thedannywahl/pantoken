# CSS: img

`.instui-img` — Ոճավորված `&lt;img&gt;` ցուցադրման, մերժման և ազդեցության փոփոխիչներով, որ հավաքվում են:

Ազդեցությունները կազմվում են կիսված `--pantoken-img-filter` պատուհանի հատկության միջոցով, ուստի `-with-grayscale`-ը և `-with-blur`-ը կարող են կիրառվել միասին. `-constrain-*` մերժման փոփոխիչները պահանջում են, որ սպառողը հստակ չափերը տեղադրի:

**Աղբյուր:** [img.css](https://github.com/thedannywahl/pantoken/blob/main/formats/components/src/components/img/img.css)

## Accessibility

Տրամադրեք իմաստալից `alt` տեքստ, որ նկարագրում է պատկերը, և օգտագործեք դատարկ `alt=""` զուտ դեկորատիվ պատկերների համար, որպեսզի օժանդակ տեխնոլոգիան դրանք անտեսի:

## Usage

```css
@import "@pantoken/components/components.css";
@import "@pantoken/components/img.css";
```

## Examples

```html
<img class="instui-img" alt="Gradient" />
```

## Modifiers

| Modifier              | Description                                    |
| --------------------- | ---------------------------------------------- |
| `.-constrain-contain` | Մասշտաբել տուփի մեջ տեղավորելու համար (պահել): |
| `.-constrain-cover`   | Մասշտաբել տուփը լցնելու համար (ծածկել):        |
| `.-display-block`     | Ցուցադրել բլոկային տարրի տեսքով:               |
| `.-with-blur`         | Կիրառել անորոշային ազդեցություն:               |
| `.-with-grayscale`    | Կիրառել գազատեղ ազդեցություն:                  |

## Custom properties

| Property         | Type | Default | Description                                                                                                                                                                     |
| ---------------- | ---- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--pantoken-img` | —    | —       | filter &lt;filter-value-list&gt; \| none — Պատկերի վրա կազմված CSS ֆիլտրը. ազդեցության փոփոխիչներ այն սահմանում են, և դուք կարող եք այն վերազեր անել համապատասխան ֆիլտրի համար: |

## Tokens consumed

| Token                                               | Type                                                        | Value    |
| --------------------------------------------------- | ----------------------------------------------------------- | -------- |
| `--instui-component-img-effect-transition-duration` | `<time>`                                                    | `1s`     |
| `--instui-component-img-image-blur-amount`          | `<length>`                                                  | `0.25em` |
| `--pantoken-img-filter`                             | `none \| <filter-value-list> \| <-ms-filter-function-list>` | `none`   |
