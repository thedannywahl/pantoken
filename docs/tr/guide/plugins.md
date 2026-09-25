# Eklentiler

Bir pantoken eklentisi, bir paketi çatallamadan token veya CSS çıktısını genişletir. Birini `definePlugin` ile `@pantoken/plugin-kit`'den oluşturur, sonra `buildTokens` veya `toCss`'e geçirirsiniz.

## Bir eklenti yazın

Uyguladığınız kancaları `definePlugin`'e verin. Bu, o kancalardan çıkarılan yeteneklerle markalanmış normal bir eklenti döndürür. Bir eklenti IR'yi genişletebilir (`tokens`, `icons`), CSS çıktısını (`css`) veya her ikisini.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Yetenek farkındalıklı kayıt

`buildTokens` ve `toCss`, geçirdiğiniz eklentiler üzerinde `checkPlugins` çalıştırır. Bir eklentinin kayıtlı olduğu aşama için eşleşen bir kancası yoksa uyarır — asla fırlatmaz — bu yüzden token-only bir eklenti `toCss`'e geçirilirse, sessizce hiçbir şey yapmaktansa bir notla atlanır.

## Eklentileri bileştirme

Başka bir eklenti üzerine `extendPlugin` ile inşa edin veya akranları `mergePlugin` ile birleştirin:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Aynı aşama kancaları bileşir: `tokens` önce tabanı sonra eklemeyi çalıştırır, `css` iki katkıyı birleştirir ve `icons` her ikisini çalıştırır.

## Eklentinizin çıktısını doğrulayın

Bir yazım hatası veya yeniden adlandırılmış bir token'ın hızlı ve yerel olarak hataya düşmesi için, eklentinizin kendi çıktısı üzerinde paylaşılan drift kontrollerini `@pantoken/utils`'den testinizde çalıştırın:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Paketlenmiş eklentiler

- `@pantoken/plugin-simple-icons` — simple-icons'tan marka ikonları, ikon tokenları olarak kayıtlı.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonları, `--instui-icon-*` image tokenları olarak kayıtlı.
- `@pantoken/plugin-logos` — Instructure ürün logoları SVG, data URI ve `--instui-logo-*` image tokenları olarak.
- `@pantoken/plugin-prune-custom-props` — kullanılmayan özel değişkenleri bir stil sayfasından düşüren bir PostCSS eklentisi (pantoken eklentisi değil).
- `@pantoken/plugin-custom-theme-colors` — bir sayfanın markasını yeniden belirler; bir öznitelik (`data-pantoken-color`) değerini 13 paletten birine veya herhangi bir marka hex'i için `custom`'ya ayarlar. Bakınız [Tema renkleri](#theme-colors).

Lucide Lab kaydı tembel yüklenebilir, sonra eşzamanlı token kancasına geçirilebilir:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Eskiden eklenti olan bazı şeyler artık `@pantoken/components` içinde geliyor; çünkü birçok bileşen bunlara kutudan çıktığı gibi ihtiyaç duyuyor: yükseltme gölgeleri (`--instui-elevation-*`, `components.css` içinde), odak-çizgisi halkası (`base.css` içinde — pantoken sayfaya sahip olduğunda her odaklanabilir bunu alır) ve Instructure marka yazı tipleri (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` uygular; isteğe bağlı `@pantoken/components/fonts.css` `@font-face` woff2'leri yükler).

## Tema renkleri {#theme-colors}

`@pantoken/plugin-custom-theme-colors`, her palet için bir `[data-pantoken-color="…"]` bloğu üretir
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Her blok, marka ilkel değerlerini (`--instui-primitive-color-navy-*` ve `-blue-*`) seçilen palete yönlendirir. Ayrıca upstream'in literal hex'e düzleştirdiği marka yüzeylerini yeniden türetir, pişmiş alfa değerlerini `color-mix()` üzerinden korur. Semantik durum renkleri, açık mavi vurgular ve yükseltme gölgeleri yerinde kalır. [Renk örneklem tabanlı temalandırma demosunda](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) deneyin.

```html
<html data-pantoken-color="sea"></html>
```

### Özel marka rengi

Bir Canvas yöneticisinin Tema Düzenleyicisine yazdığı birincil renk gibi herhangi bir hex'ten yeniden markalamak için `data-pantoken-color="custom"`'ü ayarlayın. pantoken bundan tam bir 10–200 `--instui-primitive-color-custom-*` ölçeği türetir:

1. **Referans eğrisi.** Her adımın hedef açıklığı, 13 paletin o adımda ortalama OKLCH açıklığıdır; 0 beyazda sabitlenmiş ve 210 siyahtır. Böylece özel ölçeğin aralıklandırması gönderilen paletlerle eşleşir.
2. **Çapa.** Girdi, hedef açıklığına en yakın olan adıma düşer, sonra o kesin açıklığa sabitlenir. `#cccccc`, `custom-40` olur `#c9c9c9`'de: girdiye yakın, ama her zaman aynı değil. "En yakın" eğrideki en yakın adım demektir, mevcut palet renginin en yakın olması değil.
3. **Doldurma.** Diğer tüm adımlar girdinin tonunu korur. Doygunluğu, çapa göre paletlerin ortalama doygunluk eğrisini takip eder ve yalnızca bir renk sRGB dışında kaldığında azaltılır.

Sadece `#rgb` ve `#rrggbb` kabul edilir; başka herhangi bir şey `TypeError` fırlatır, böylece bir formdan gelen bir hex CSS enjekte edemez.

Derlenen ilkel değerler zaten beyan edilmiş olarak tüm kuralı build zamanında yayınlayın:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Token setini göndermeden çalışma zamanında rengi seçmek için eğriyi ve yeniden haritalama kuralını build zamanında önceden hesaplayın. Sonra tarayıcıda bağımlılıksız `/scale` girişini kullanın ve yalnızca 20 türetilmiş ilkeyi ayarlayın:

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

Doküman sitesinin tema seçicisi, Canvas tema düzenleyicisi ve yukarıdaki demo hep bu şekilde çalışır.

Her eklentinin ihracatları için [API referansına](/api/) bakın.
