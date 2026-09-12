# Bileşenler

`@pantoken/components` Instructure token'larından oluşturulmuş sınıf tabanlı bileşen stillerini içerir. Stil sayfasını içe aktarın ve işaretlemenize etiket ekleyin — herhangi bir çerçeve gerekmez.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Özel elemanları tercih mi ediyorsunuz? `@pantoken/web-components` aynı stilleri `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` ve daha fazlası olarak sarar — bakınız [paket haritası](/api/).

## Konvansiyonlar

Bu paketteki CSS konvansiyonları, değiştirilmiş bir [RSCSS](https://ricostacruz.com/rscss/index.html) sürümüne dayanır.

Değiştiriciler **anahtar-değer** şeklindedir — `-<prop>-<val>`, InstUI prop isimleriyle hizalanmıştır — böylece kendi başlarına okunurlar: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean prop'lar yalnızca prop adı olarak verilir; varlığı `true` anlamına gelir (`-has-shadow`, `-clickable`); varsayılan açık bir boolean kapatıldığında tersine döner (`-without-background`, `-without-border`). Boyutlar hem kısa hem uzun yazımları kabul eder (`-size-sm` = `-size-small`). Bir isim InstUI'dan sapıyorsa, InstUI-semantikli sınıf hâlâ çalışır ancak kullanımdan kaldırılmıştır (ör. `-variant-info` → `-color-info` kullanın).

### Örnek

Instructure UI React bileşeni:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken bileşenleri:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

InstUI'nin `timeout` prop'u için, birimsiz `--timeout` özel özelliğini milisaniye cinsinden ayarlayın ve Alert etkileşimini yükleyin. Pozitif bir değer kapatmayı zamanlar; `0` (varsayılan) uyarıyı yerinde bırakır. InstUI'nin fade efektini almak için `transition` yardımcı sınıfının `instui-transition -fade-entered` sınıflarını ekleyin; anında kaldırma için bunları atlayın. Etkileşim, `-fade-exiting` durumunu sürer ve kaldırmadan önce iptal edilebilir, kabarcıklı bir `dismiss` olayı tetikler, böylece bir uygulama `preventDefault()` çağırarak uyarının takılı kalmasını sağlayabilir.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

İlerleme çubukları, `--min` (`0` varsayılan olarak), `--value` ve `--max` (`100` varsayılan) aracılığıyla rastgele ölçekleri kabul eder; kullanımdan kaldırılmış `--value-now` ve `--value-max` takma adları da mevcuttur. Bir değer değiştiğinde InstUI'nin yarım saniyelik geçişini uygulamak için `-should-animate` ekleyin. `.value`, kökün çocuğu olarak `.bar` ile birlikte durur; yerine parkurun üzerine, başlangıcına hizalanmış şekilde render etmek için `-render-value-inside` ekleyin (ölçer renginin üzerine okunaklı olması için stil verin). Sıfır tabanlı bir aralık için yerel bir `<progress>` kullanın ve minimum sıfır değilse `<meter>` kullanın; web bileşenleri bunlar arasında kendi `min` niteliğinden otomatik olarak seçim yapar. InstUI'nin belirsiz (indeterminate) durumu yoktur, bu yüzden `<progress>` `value` niteliği yoksa pantoken için en iyi tahmindir: `progress-bar` `.bar`'yı kayan bir segment olarak animasyonlar ve `progress-circle` halkaını sabit bir yayda döndürür; her iki durumda da `.value` gizlenir.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

İlerleme daireleri aynı rastgele ölçekleri `--min`, `--value` ve `--max` aracılığıyla kabul eder. `--value-now` ve `--value-max` kullanımdan kaldırılmış fonksiyonel takma adlar olarak kalır. Mount animasyonunu yeniden üretmek için `-should-animate` ekleyin ve odaklanmış etkileşim paketini yükleyin; `--animation-delay` birimsiz milisaniye gecikmesidir. Kullanımdan kaldırılmış `-should-animate-on-mount` ve `-shold-animate-on-mount` yazımları da fonksiyonel takma adlar olarak kalır.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## Sınıf öneki

Her sınıf varsayılan olarak `instui-` ile ad alanına yerleştirilir. Kendi önekinizle — veya hiç önek olmadan — bir stil sayfası oluşturmak için herhangi bir oluşturucuya `prefix` verin. Herhangi bir yanlış (falsy) değer (`null`, `undefined`, `""` veya atlama) öneki tamamen kaldırır, böylece `class="heading -level-h1"` yerine `class="instui-heading -level-h1"` yazabilirsiniz:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Tire-ön ekli değiştiriciler (`.-color-secondary`, `.-level-h1`) her iki durumda da değişmez. Paket tarafından dağıtılan stil sayfaları `instui` önekini korur.

## Temel

`base.css` token'lardan küresel belge varsayılanlarını ayarlayan isteğe bağlı bir sıfırlamadır: `box-sizing`, bir `body` sıfırlaması, sayfa yüzeyi, temel metin rengi ve yazı tipi, `color-scheme` (böylece `light-dark()` token'ları ve yerel kontroller temayı takip eder), ve temel bir bağlantı. Pantoken sayfaya hakim olduğunda bileşen ve düz yazı sayfalarından önce bir kez yükleyin.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Kendi temasını zaten uygulayan bir ana ev sahibi içine bileşenleri gömüyorsanız bunu atlayın — sıfırlama sayfa yüzeyini boyar, bu yüzden ana ev sahibi ile çakışmasını istemezsiniz. Ayarladığı her şey düşük özgüllükte `:where()` seçiciler kullanır, bu yüzden kendi kurallarınız her zaman kazanır.

`base.css` marka yazı tipini (_`font-family: var(--instui-font-family-base)`, sistem yedekleriyle_) uygular; _yüklemek_ için isteğe bağlı `fonts.css`'i içe aktarın — `@font-face` Atkinson Hyperlegible Next için kurallar, pakette gönderilen woff2'lere işaret eder. Yazı tipleri ~350 kB olduğu ve yazı tiplerini self-host etmek kasıtlı bir tercih olduğu için ayrı tutulmuştur.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Ekran okuyucu içeriği

<p>Bu cümlenin ardından gizli bir mesaj var.<span class="instui-screen-reader-content">Sadece ekran okuyucular bunu duyurur.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` bir elementi görsel olarak gizlerken erişilebilirlik ağacında tutar — yardımcı teknolojilerin okuması gereken ancak tasarımın göstermemesi gereken etiketler ve durum metinleri için.

## Yardımcılar

`utilities.css` çapraz-kesit sınıfların isteğe bağlı bir katmanıdır: bir `View` ilkel, token ölçeğinde boşluklar ve semantik renk geçersiz kılmaları. Bileşen `-modifier` sınıflarından farklı olarak, bunlar **çift tire** (`--mod`) kullanır, böylece bir bileşenin kendi değiştirici isimleriyle asla çakışmazlar ve herhangi bir elemente uygulanabilir — çıplak veya bir bileşene eklenmiş olarak.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue yüzeyi, on-color metin ile.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">mx-auto ile ortalanmış.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` InstUI'nin `View`'sidir. Üzerine boşluk ve renk katmanlarını yerleştirdiğiniz tabandır ve kendi görsel prop'ları için anahtar-değer değiştiricileri taşır, böylece yardımcı sınıflara başvurmanıza gerek kalmaz: `-background-*` (yüzeyleri), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*` ve `-cursor-*` — bunlar `view`'in kendi tek-tire değiştiricileridir; çift-tire yardımcı sınıflardan farklıdır. Serbest-değer prop'lar (genişlik/yükseklik/inset) satır içi stiller olarak kalır; `margin`/`padding` boşluk yardımcılarını kullanır.

**Boşluk** — boşluk ölçeğinde taraf başına sınıflar. Bunları `{m|p}{side}-{step}` olarak okuyun: margin için `m` veya padding için `p` (veya tam kelimeler `margin`/`padding`), isteğe bağlı mantıksal bir taraf ve ardından bir adım. Yani `.--m-lg` ve `.--margin-lg` aynı, tıpkı `.--pt-md` ve `.--paddingt-md` gibi.

- Taraflar: none (tümü), `t`/`b` (blok başlangıcı/sonu), `s`/`e` (satır içi başlangıç/son), `x`/`y` (satır içi/blok ekseni). Mantıksal taraflar sağdan sola düzenlerde doğru kalır.
- Adımlar: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, artı yalnızca margin için `auto`.

Bunları InstUI'nin `margin="small auto large"` kısaltması için birleştirin:
`class="--mt-sm --mx-auto --mb-lg"`.

**Renk** — palet üzerinde kalan semantik geçersiz kılmalar: `.--bg-<name>` (arka plan),
`.--text-<name>` (metin rengi) ve `.--border-<name>` (kenar rengi). Her `<name>` bir semantik renk token'ıdır — niyetler (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) artı `accent-*` paleti (`accent-blue`, `accent-green`, vb.). Bir isim yalnızca o ailede token varsa vardır, bu yüzden `text-brand` bir sınıf değildir — metnin marka token'ı yoktur. Primitife veya rastgele bir hex'e erişmenin bir yolu yoktur ve her geçersiz kılma tema ile uyumludur.

**Token aileleri** — her "bir token, bir özellik" ailesi token başına bir sınıf alır, token adından adlandırılır. Serbestçe birleştirin:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ve `-depth1`…`-card`) → `box-shadow`

Her biri yalnızca kendi tek özelliğini ayarlar, bu yüzden `border-width`/`border-radius` gerçekten bir sınır çizmek için bir `border-*` renk ve bir kenar stili gerektirir. Bunlar tam token adını (`.--border-radius-md`) kullanır, oysa renk ve boşluk yardımcıları yukarıda kısa takma adlar (`.--bg-brand`, `.--mt-lg`) kullanır — takma adlar ergonomik kısayollardır; token sınıfları ise literal ve kapsamlıdır.

**Yerleşim** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) ve `.--text-align-<value>` (`start`, `center`, `end`, `justify`) InstUI'nin çapraz-kesit `display` ve `textAlign` prop'larını (View, Button, Metric, Tabs, …) kapsayan ve birleştirilebilir sınıflar olarak sağlar — bunlar bileşen başına değiştiriciler değildir.

Her çift-tire sınıf, aynı adlı tek-tire bileşen değiştiricisinin üzerine şablon belirleme sırasından bağımsız olarak deterministik olarak kazanır — mekanizma için [Authoring conventions](/conventions/authoring)'a bakın.

Buradaki her şey, `--instui-*` token'larıyla yönlendirilen saf CSS olduğundan token katmanından InstUI'yi takip eder. `componentsCss` ve bileşen başına oluşturucular için [API reference](/api/)'ye bakın.

## Örtüler: dialog ve popover

Örtü bileşenleri yerel platform ilkel öğelerini kullanır, bu yüzden çok az veya hiç JavaScript olmadan erişilebilir davranırlar.

**Modal** — bir yerel `<dialog>` üzerine `.instui-modal` koyun. Odak tuzağı, `Esc` ile kapatma ve bir `::backdrop` ücretsiz olarak elde eder; arka plan, `.instui-mask` ile aynı `--instui-component-mask-background-color` token'ı ile karartılır (bunu frosting için `-blur` ekleyin). Açmak ve kapamak için invoker komutlarını kullanın — script gerekmez:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Bağlam görünümü / popover** — bir `[popover]` elementine `.instui-context-view` koyun ve `popovertarget` ile değiştirin. En üst katmanda yer alır ve dış tıklama veya `Esc` ile hafifçe kapatılır, yine script gerekmez:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Çekmece düzeni** — `.tray` ve `.content` çocukları olan bir düzen köküne `.instui-drawer-layout` koyun. Tepsiyi ortaya çıkarmak için `open` niteliğini (veya `-open`) ekleyin ve onu inline-end tarafına demirlemek için `placement="end"` (veya `-placement-end`) kullanın — yerleşim mantıksal `inset-inline-*`/`flex-direction` özellikleri aracılığıyla çözülür, böylece ek kural olmadan `dir="rtl"` altında otomatik olarak çevrilir. Odaklanmış etkileşim paketi Invoker komut yönlendirmesini ekler ve genişlik `--drawer-layout-min-width`'yi aştığında örtü modunu (`should-overlay-tray`) değiştirir (varsayılan `--instui-breakpoints-sm`, sonra `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Maske** — `.instui-mask` akış içi örtüler (bir kartın üzerindeki spinner) için kalır; bir modala ait `::backdrop` modal durumunu kapsar.

Her iki desen de `@pantoken/web-components` içinde davranışsal özel elemanlar olarak sarılmıştır:
`<instui-modal open>` (`open` niteliği tarafından sürülen bir `<dialog>`) ve `<instui-context-view>` (yerel bir popover).

Tarayıcı desteği: popover API'si ve `popovertarget` Baseline 2024'tür; invoker komutları (`command`/`commandfor`) Baseline 2025'tir, bu nedenle eski tarayıcılarda butonları bir satırlık geri dönüş olarak `dialog.showModal()`'e bağlayın. Bir popover'ı tetikleyicisinin yanına konumlandırmak desteklenen yerlerde CSS anchor konumlandırmayı kullanır (Chromium); diğer yerlerde üst katmanda ortalanır.

## Formlar

**FormField** — `.instui-form-field` bir etiket, kontrol ve varsa mesajları düzenleyen CSS-Grid sarmalayıcıdır. Etiketi kontrol ile yerel olarak ilişkilendirmek için bunu bir `<label>` üzerine koyun. Üç grid alanı vardır — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (varsayılan) alanları üst üste dizer; `-layout-inline` etiketi kontrolün yanına koyar (ayarlamak için `-label-align-{start,end}` ve `-v-align-{top,middle,bottom}` ile ince ayar yapın). `-readonly` etiketi yeniden renklendirir.

**Gerekli yıldız işareti** alanın gerekli olduğunu ya `-required` sınıfı ya da içindeki yerel bir `required` kontrolü ile belirlenir — bu yüzden input'a `required` koymanız yeterlidir ve işaret görünür. Dekoratif bir unsurdur (etikette bir `::after`, erişilebilirlik ağacının dışındadır); form kendini açıklamazsa "yıldızlı alanlar gereklidir" gibi bir notla eşleştirin.

**FormFieldGroup** — `.instui-form-field-group` ilgili alanları bir `<fieldset>` içinde `<legend>` açıklamasıyla gruplar. Tamamen düzen amaçlıdır (ayrık token yoktur): varsayılan alanları üst üste dizer; `-layout-columns` / `-layout-inline` bunları duyarlı sütunlara akıştırır, `-row-spacing-*` / `-col-spacing-*` ve `-v-align-*` ızgarayı ayarlamak için kullanılır.

**RadioInputGroup** — `.instui-radio-input-group` aynı `<fieldset>`/`<legend>` gruplamadır, radio'lar için özelleştirilmiştir. Çocuk radio'lar ortak bir `name` paylaştığı için seçim yerel olarak tek tercih olur — bu yüzden bir dizi toggle buton bir kontrol gibi davranır, serbest butonlar gibi değil. `-variant-simple` (varsayılan) standart radioları yerleştirir (`-layout-columns`/`-inline` bunları satıra akıtır); `-variant-toggle` çocuk `.instui-radio.-variant-toggle` butonlarını tek bir segment kontrolüne bağlar (çökük kenarlar, yuvarlatılmış dış uçlar):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Mesajlar** — `.instui-form-field-messages` konteynerdir; her `.instui-form-field-message` bir `-type-*` alır: `-type-hint` (gri, varsayılan), `-type-error` (kırmızı metin + daire-uyarı glifi), `-type-success` (yeşil metin + daire-onay glifi) ve `-type-screenreader-only` (görsel olarak kırpılmış, yine de duyurulur). Glifler `currentColor` içinde boyanır, böylece her zaman mesaj rengine uyarlar. `-type-new-error` `-type-error`'nın kullanımdan kaldırılmış bir takma adıdır. Konteyneri kontrol ile `aria-describedby` ile bağlayın ve hata olduğunda kontrolde `aria-invalid` ayarlayın.

Bir FormField içinde, bir `-type-error` mesajı istemci tarafı doğrulamasını takip eder: kontrol `:user-invalid` (yerel, kullanıcı etkileşimi sonrası) olana kadar gizli kalır — veya sunucu tarafı bir hata için `-invalid` ile `.instui-form-field` üzerine zorlayabilirsiniz. Bir bağımsız `.instui-form-field-messages` (alanda olmayan) bundan etkilenmez. Kontrolün odak halkası da uyum sağlar: `:user-invalid`/`-invalid` durumunda tehlike, `-success` durumunda başarı.

**Metin kontrolleri** — `.instui-text-input` (yerel `<input>`), `.instui-text-area` (yerel `<textarea>`, yeniden boyutlandırılabilir) ve `.instui-simple-select` (yerel `<select>` ile bir imleç) tek bir görünüm ve aynı durumları paylaşır: `-invalid` (hata kenarı), `-success` (başarı kenarı), `-readonly`, yerel `:disabled` ve `-size-{sm,md,lg}`. Önde/arkada bir simge (InstUI'nin `renderBeforeInput`/`renderAfterInput`) için input'u `.instui-input-group` içine sarın ve bir `.before`/`.after` yuvası ekleyin (bir `-icon-*` glifi); `-should-not-wrap` bunu tek satırda tutar. `.instui-number-input` bu cepheyi ve bir `.arrows` +/- spinner sütunu (yerel `type="number"`; butonları `stepUp()`/`stepDown()`'a bağlayın) içerir. `.instui-range-input` değeri bir `.instui-range-input-value` ters balon içinde render edilen stillendirilmiş bir `input[type="range"]`'dir. Açılır bir liste içeren zengin bir combobox için `@instructure/ui`'e yönelin — bu kütüphane yerel kontrolleri kapsar.

**Stil verilmiş select açılır menü (deneysel)** — isteğe bağlı bir `select.css` aynı `.instui-simple-select` elementini yükseltir: açık açılır menüyü (panel ve her seçenek, hover ve seçili durumlarıyla) CSS Customizable Select modeli kullanarak stiller.

> [!WARNING]
> `select.css` `appearance: base-select` / `::picker(select)`'e dayanır, bu da **deneyseldir**
> (Chrome 135+, henüz Baseline değil). Ayrı isteğe bağlı bir sayfa olarak gönderilir ve her kural `@supports (appearance: base-select)` ile kapatıldığı için desteklenmeyen tarayıcılarda hiçbir şey yapmaz — `.instui-simple-select` kontrolü sadece düz yerel select olarak kalır. Gelişmiş açılır menüyü istiyorsanız ve sınırlı desteği kabul ediyorsanız bunu yalnızca yükleyin.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
