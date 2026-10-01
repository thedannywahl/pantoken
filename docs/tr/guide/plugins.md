# Eklentiler

Bir pantoken eklentisi, bir paketi çatallamadan token veya CSS çıktısını genişletir. Birini `definePlugin` ile `@pantoken/plugin-kit`'den oluşturur, sonra onu `buildTokens` veya `toCss`'e geçirirsiniz.

## Bir eklenti yazma

Uyguladığınız kancaları `definePlugin`'e verin. Bu, bu kancalardan türetilen yeteneklerle markalanmış normal bir eklenti döndürür. Bir eklenti IR'yi (`tokens`, `icons`), CSS çıktısını (`css`) veya her ikisini genişletebilir.

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

`buildTokens` ve `toCss`, ilettiğiniz eklentiler üzerinde `checkPlugins` çalıştırır. Bir eklentinin kayıtlı olduğu aşama için eşleşen bir kancası olmadığında uyarır — asla fırlatmaz — bu yüzden token-sadece bir eklenti `toCss`'e geçirilirse, notla atlanır; sessizce hiçbir şey yapmaz.

## Eklentileri bileşime etme

Bir eklentinin üzerine `extendPlugin` ile inşa edin veya eşleri `mergePlugin` ile birleştirin:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Aynı aşamadaki kancalar bileşir: `tokens` önce tabanı sonra eklemeyi çalıştırır, `css` iki katkıyı birleştirir ve `icons` her ikisini çalıştırır.

## Eklentinizin çıktısını doğrulayın

Testinizde eklentinizin kendi çıktısı üzerinde `@pantoken/utils`'den paylaşılan drift kontrollerini çalıştırın, böylece bir yazım hatası veya yeniden adlandırılmış bir token hızlı ve yerel olarak başarısız olur:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Paketlenmiş eklentiler

- `@pantoken/plugin-simple-icons` — simple-icons'dan marka simgeleri, ikon tokenları olarak kaydedilir.
- `@pantoken/plugin-lucide-lab` — Lucide Lab ikonları, `--instui-icon-*` görüntü tokenları olarak kaydedilir.
- `@pantoken/plugin-logos` — Instructure ürün logoları SVG, data URI ve `--instui-logo-*` görüntü tokenları olarak.
- `@pantoken/plugin-prune-custom-props` — bir PostCSS eklentisi (pantoken eklentisi değil) — bir stil sayfasından kullanılmayan özel değişkenleri düşürür.
- `@pantoken/plugin-custom-theme-colors` — bir sayfanın markasını yeniden belirler; bir özniteliği (`data-pantoken-color`) 13 paletten birine veya herhangi bir marka hex'i için `custom`'ya ayarlar. Bakınız [Tema renkleri](#theme-colors).
- `@pantoken/plugin-custom-components` — SegmentedControl ve SkeletonLoader dahil token destekli özel kontroller.

### Segmentli kontrol

İki ila beş ilişkili görünüm veya filtre için segmentli kontrol kullanın. Her seçenek, aynı adlı bir grupta etiketli bir yerel radyo düğümüdür; başlangıçta birini checked olarak işaretleyin. Seçenekler rahatça sığmayacaksa sekmeler veya açılır menü kullanın ve eylemler için seçim yerine buton grupları kullanın. Varsayılan stil `-size-md`'dir; daha sıkı ve daha belirgin bağlamlar için `-size-sm` ve `-size-lg` mevcuttur.

Kontrol ve taşma (overflow) butonları için `@pantoken/plugin-custom-components/segmented-control.css`'i içe aktarın. Bir segment etiketinde segmentin bir simgeye ihtiyacı olduğunda `-icon-*` sınıfını kullanın; etkileşim yardımcısı ayrıca yerel input'tan etikete bir `-icon-*` sınıfını taşır. Fieldset'e tanımlayıcı bir `aria-label` veya görünen bir legend verin. Yardımcı, yerel radyo duyurusunu korur, klavye gezinimi ekler ve isteğe bağlı olarak her ok basışında kırpılmış bir segmenti ortaya çıkarır. Hem başlangıç/son kontrolleri mantıksal olarak kullanın hem de her iki yönde erişilebilir buton etiketleri sağlayın:

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

DOM hazır kaydı için `@pantoken/interactions/segmented-control.iife.js`'i içe aktarın veya
`@pantoken/interactions` içinden `initSegmentedControl(fieldset, { size: "md", isOverflown: true })`'yı çağırın
ve kaldırırken `cleanup()`'i çağırın. CSS ve yerel radyo seçenekleri JS olmadan çalışır; taşma okları davranışa ihtiyaç duyar. Seçili öğe, semantik drop-shadow renklerinden iki katmanlı tasarım gölgesini kullanır; bu, mevcut bir `--instui-elevation-*` bileşimi yerine ayrı bir aktif-öğe gölgesidir. Taşma butonları, `--pantoken-segmented-overflow-shadow` üzerinden upstream elevation3 bileşen tokenlarını kullanır.

### İskelet yükleme

`skeleton-loader.css` alt yolu, dekoratif bir Text, Avatar veya Image şekli için stiller sağlar. Text, `-size-xxs`'yi `-size-xxl` aracılığıyla kabul eder; Avatar ve Image orta boyuttur. Her isteğe bağlı `.skeleton-row`, boyutu değiştirmeden bir metin satırı ekler. CSS shimmer üç 1.5 saniyelik süpürmeden sonra durur ve kullanıcı azaltılmış hareket tercih ederse statik kalır. JavaScript yüklenmeden önce çalışır.

Şekilleri yalnızca sorguya bağlı içeriğin görüneceği yerlere koyun; sunucuda bilinen gezinme, filtreler, başlıklar veya kontroller üzerine koymayın. Bir iskelet ilerleme ölçeri veya bir eylem-meşgul durumu değildir. Arka plan yenilemeleri sırasında mevcut içeriği görünür tutun; eylemler için spinner veya buton meşgul durumunu kullanın.

Üst uygulama yükleniyor, yüklendi, boş ve hata işaretlemesini yönetir. Sayfa başına bir boş durum bölgesi ve sunucu HTML'sinde ayrı bir boş uyarı sağlayın; her ikisi de meşgul içerik bölgesinin **dışında** olmalıdır:

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

İstek durumu değiştiğinde üst-seviye davranışı çağırın. Bu, `aria-busy` ve önceden var olan iki duyuruyu günceller, ancak içeriği asla değiştirmez veya odağı taşımaz:

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

Bileşen başına etkileşim paketini doğrudan içe aktarmak yerine kullanıyorsanız, `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }` ile birlikte `[data-skeleton-region]` öğesinde bir `pantoken:skeleton-state` olayı gönderin. Hızlı istekler için yer tutucuları gösterme süresini 200–500ms erteleyin; davranış yükleniyor duyurusunu bağımsız olarak 400ms erteleyebilir. Pasif sayfa yüklemelerinde odağı olduğu yerde bırakın. Sadece kullanıcının kendi eylemi bunu istediyse odağı yeni yüklenmiş bir sonuca taşıyın. Durum düğümü sonuçları ve boş durumları duyurur; uyarı düğümü hataları duyurur. Bir öğede `aria-busy`, `role="status"` ve `role="alert"`'i birleştirmeyin.

Lucide Lab'in kaydı tembel (lazy) olarak yüklenebilir, sonra eşzamanlı token kancasına geçirilir:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Eskiden eklenti olan bazı şeyler artık `@pantoken/components` içinde paketlenmiş halde gelir; çünkü birçok bileşen bunlara kutudan çıktığı gibi ihtiyaç duyar: yükseltme gölgeleri (`--instui-elevation-*`, `components.css` içinde), odak-outline halkası (`base.css` içinde — pantoken sayfaya sahip olduğunda her odaklanabilir öğe bunu alır) ve Instructure marka fontları (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` uygular; isteğe bağlı `@pantoken/components/fonts.css` `@font-face` woff2'leri yükler).

## Tema renkleri

`@pantoken/plugin-custom-theme-colors`, her palet için bir `[data-pantoken-color="…"]` bloğu üretir
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Her blok, marka ilkel değerlerini (`--instui-primitive-color-navy-*` ve `-blue-*`) seçilen palete yönlendirir. Ayrıca upstream'in literal hex'e düzleştirdiği marka yüzeylerini yeniden türetir ve `color-mix()` aracılığıyla onların pişmiş alfa değerini korur. Semantik durum renkleri, açık mavi aksanlar ve yükseltme gölgeleri yerinde kalır. Denemek için
[swatch tabanlı temalandırma demosu](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html)'a bakın.

```html
<html data-pantoken-color="sea"></html>
```

### Özel marka rengi

Herhangi bir hex'ten yeniden markalamak için `data-pantoken-color="custom"`'i ayarlayın; örneğin Canvas yöneticisinin Tema Düzenleyici'ye yazdığı birincil renk. pantoken, bundan tam bir 10–200 `--instui-primitive-color-custom-*` skalası türetir:

1. **Referans eğrisi.** Her adımın hedef açıkılığı, o adımda 13 paletin OKLCH açıklık ortalamasıdır; 0 beyaz, 210 siyah olarak sabitlenmiştir. Böylece özel skaladaki aralıklar gönderilen paletlerle eşleşir.
2. **Çapa.** Girdi, hedef açıkılığı kendi açıklığına en yakın olan adıma iner ve sonra tam olarak o açıklığa sabitlenir. `#cccccc`, `#c9c9c9`'de `custom-40` olur: girdiye yakın ama her zaman aynı olmayabilir. "En yakın", eğrideki en yakın adım demektir; mevcut palet renginin en yakın olanı demek değildir.
3. **Doldurma.** Diğer tüm adımlar girdinin tonunu korur. Doygunluğu, çapanın göreli olarak paletlerin ortalama doygunluk eğrisini takip eder ve sadece bir renk sRGB dışında kaldığında azaltılır.

Sadece `#rgb` ve `#rrggbb` kabul edilir; başka herhangi bir şey `TypeError` fırlatır, bu yüzden bir formdan gelen bir hex CSS'e enjekte edemez.

Derlenen ilkel değerlerin zaten beyan edildiği tüm kuralı derleme zamanında yayınlayın:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Çalışma zamanında rengi seçmek için token setini göndermeden eğriyi ve yeniden eşleme kuralını derleme zamanında hesaplayın. Ardından tarayıcıda bağımlılığı olmayan `/scale` girişini kullanın ve yalnızca 20 türetilmiş ilkel değeri ayarlayın:

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

Doküman sitesinin tema seçici, Canvas tema düzenleyicisi ve yukarıdaki demo bu şekilde çalışır.

Her eklentinin dışa aktarımları için [API referansına](/api/) bakın.
