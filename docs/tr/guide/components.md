# Bileşenler

`@pantoken/components` Instructure token'larından oluşturulmuş sınıf tabanlı bileşen stillerini gönderir. Stil sayfasını içe aktarın ve işaretlemenizi etiketleyin — herhangi bir çerçeve gerekmez.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Özel elementleri mi tercih ediyorsunuz? `@pantoken/web-components` aynı stilleri `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` ve daha fazlası olarak sarar — bkz. [package map](/guide/packages).

## Konvansiyonlar

Bu paketteki CSS konvansiyonları, [RSCSS](https://ricostacruz.com/rscss/index.html)'in değiştirilmiş bir sürümüne dayanır.

Modifier'lar **anahtar-değer** şeklindedir — `-<prop>-<val>`, InstUI prop adlarıyla hizalanmış — böylece kendileri için okunur: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Boolean prop'lar sadece prop adı olur; varlığı `true` anlamına gelir (`-has-shadow`, `-clickable`); varsayılan-açık bir boolean kapatıldığında tersine döner (`-without-background`, `-without-border`). Boyutlar hem kısa hem uzun yazımları kabul eder (`-size-sm` = `-size-small`). Bir ad InstUI'den saparsa, InstUI-semantik sınıfı yine çalışır ama kullanımdan kaldırılmıştır (ör. `-variant-info` → `-color-info` kullanın).

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

InstUI'nin `timeout` prop'u için, milisaniye cinsinden birimsiz `--timeout` özel özelliğini ayarlayın ve Alert etkileşimini yükleyin. Pozitif bir değer kapatmayı zamanlar; `0` (varsayılan) uyarıyı yerinde bırakır. InstUI'nin fade'ı için `transition` yardımcı sınıfının `instui-transition -fade-entered` sınıflarını ekleyin; anında kaldırma için bunları dahil etmeyin. Etkileşim `-fade-exiting` durumunu yönetir ve kaldırmadan önce iptal edilebilir, bubbling olan bir `dismiss` etkinliği tetikler, böylece bir uygulama uyarıyı monte tutmak için `preventDefault()` çağırabilir.

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

İlerleme çubukları, `--min` (`0` varsayılan), `--value` ve `--max` (`100` varsayılan) aracılığıyla keyfi ölçekleri kabul eder; kullanımdan kaldırılmış `--value-now` ve `--value-max` alias'ları mevcuttur. Bir değer değiştiğinde InstUI'nin yarım saniyelik geçişini uygulamak için `-should-animate` ekleyin. `.value`, kökün bir çocuğu olarak `.bar` ile yan yana durur; onun yerine rayın üzerinde, başlangıcına hizalanmış şekilde render etmek için `-render-value-inside` ekleyin (metre renginin karşısında okunaklı olması için stil verin). Sıfır tabanlı bir aralık için yerel bir `<progress>` kullanın ve minimum sıfır değilse `<meter>` kullanın; web bileşenleri bunlar arasında `min` özniteliklerinden otomatik seçim yapar. InstUI'nin belirlenemeyen (indeterminate) durumu yoktur; bu yüzden `<progress>` `value` özniteliği eksikse pantoken için en iyi tahmin yapılır: `progress-bar` `.bar`'yı kayan bir segment olarak animeler ve `progress-circle` sabit bir yay üzerindeki halkasını döndürür; her ikisi de `.value`'i gizler.

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

İlerleme çemberleri aynı keyfi ölçekleri `--min`, `--value` ve `--max` aracılığıyla kabul eder. `--value-now` ve `--value-max` işlevsel alias'lar olarak kullanımdan kaldırılmış halde kalır. InstUI'nin mount animasyonunu yeniden üretmek için `-should-animate` ekleyin ve odaklu etkileşim paketini yükleyin; `--animation-delay` birimsiz milisaniye gecikmesidir. Kullanımdan kaldırılmış `-should-animate-on-mount` ve `-shold-animate-on-mount` yazımları da işlevsel alias olarak kalır.

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

Her sınıf varsayılan olarak `instui-` ile ad alanlanır. Kendi önekinizle — veya hiç önek olmadan — bir stil sayfası oluşturmak için herhangi bir oluşturucuya `prefix` geçirin. Herhangi bir falsy değer (`null`, `undefined`, `""` veya onu atlamak) öneki tamamen kaldırır, böylece `class="heading -level-h1"` yerine `class="instui-heading -level-h1"` yazabilirsiniz:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Tire-ön ekli modifier'lar (`.-color-secondary`, `.-level-h1`) her iki durumda da değişmez. Paket tarafından gönderilen stil sayfaları `instui` önekinin korunmasını sağlar.

## Temel

`base.css` token'lardan sayfa genelinde varsayılanları ayarlayan isteğe bağlı bir reset'tir: `box-sizing`, bir `body` reset'i, sayfa yüzeyi, temel metin rengi ve font, `color-scheme` (böylece `light-dark()` token'ları ve yerel kontroller tema ile eşlenir) ve temel bir link. Pantoken sayfaya hükmediyorsa, bileşen ve prose sayfalarından önce bir kez yükleyin.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Kendi temasını zaten uygulayan bir host'a bileşenler gömüyorsanız atlayın — reset sayfa yüzeyini boyar, bu yüzden host ile çarpışmasını istemezsiniz. Ayarladığı her şey düşük özgüllükte `:where()` seçiciler kullanır, böylece kendi kurallarınız her zaman kazanır.

`base.css` marka fontunu (`font-family: var(--instui-font-family-base)`, sistem yedekleriyle) _uygular_; fontu _yüklemek_ için isteğe bağlı `fonts.css`'i içe aktarın — `@font-face` Atkinson Hyperlegible Next için kurallar, pakette gönderilen woff2'lere işaret eder. Ayrıdır çünkü fontlar ~350 kB'dir ve fontların self-host edilmesi bilinçli bir tercihtir.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Ekran okuyucu içeriği

<p>Bu cümlenin ardından gizli bir mesaj var.<span class="instui-screen-reader-content">Sadece ekran okuyucular bunu duyurur.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` bir elementi görsel olarak gizlerken erişilebilirlik ağacında tutar — yardımcı teknolojilerin okuması gereken ama tasarımın göstermemesi gereken etiketler ve durum metinleri için.

## Yardımcılar

`utilities.css` çapraz-kesit sınıfların isteğe bağlı bir katmanıdır: bir `View` ilkel, token ölçeğinde boşluk ve semantik renk geçersizlemeleri. Bileşen `-modifier` sınıflarından farklı olarak, bunlar **çift tire** (`--mod`) kullanır, böylece hiçbir zaman bir bileşenin kendi modifier adlarıyla çakışmazlar ve herhangi bir elemente — düz veya bileşene uygulanmış — uygulanabilirler.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue yüzey, on-color metin ile.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">mx-auto ile ortalanmış.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` InstUI'nin `View`'sidir. Üzerine boşluk ve renk katmanlayacağınız tabandır ve kendi görsel prop'ları için anahtar-değer modifier'ları taşır, böylece yardımcı sınıflara başvurmak zorunda kalmazsınız: `-background-*` (yüzeyleri), `-border-radius-{small,medium,large,circle,pill}`, `-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`, `-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*` ve `-cursor-*` — bunlar `view`'in kendi tek-tire modifier'larıdır, çift-tire yardımcılarla ilgisi yoktur. Serbest-değer prop'lar (width/height/inset) inline stiller olarak kalır; `margin`/`padding` spacing yardımcılarını kullanır.

**Boşluk** — spacing ölçeğinde taraf-başına sınıflar. Bunları `{m|p}{side}-{step}` olarak okuyun: `m` margin için veya `p` padding için (veya tam kelimeler `margin`/`padding`), isteğe bağlı mantıksal taraf ve ardından bir adım. Yani `.--m-lg` ve `.--margin-lg` aynı, `.--pt-md` ve `.--paddingt-md` de aynıdır.

- Taraflar: none (tümü), `t`/`b` (blok başlangıcı/sonu), `s`/`e` (satır içi başlangıç/son), `x`/`y` (satır içi/blok ekseni). Mantıksal taraflar sağdan sola düzenlerde doğru kalır.
- Adımlar: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, ayrıca sadece margin için `auto`.

InstUI'nin `margin="small auto large"` kısaltması için bunları bileştirin: `class="--mt-sm --mx-auto --mb-lg"`.

**Renk** — palet üzerinde kalan semantik geçersizlemeler: `.--bg-<name>` (arka plan), `.--text-<name>` (metin rengi) ve `.--border-<name>` (çerçeve rengi). Her `<name>` bir semantik renk token'ıdır — intent'ler (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …) artı `accent-*` paleti (`accent-blue`, `accent-green`, vb.). Bir isim yalnızca o ailede token varsa vardır, yani `text-brand` bir sınıf değildir — metnin marka token'ı yoktur. Bir primitive'ye veya rastgele bir hex'e erişmenin yolu yoktur ve her geçersizleme tema ile uyumludur.

**Token aileleri** — her "bir token, bir özellik" ailesi için token başına bir sınıf vardır; bunlar token adlarıyla isimlendirilir. Serbestçe bileştirin:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (ve `-depth1`…`-card`) → `box-shadow`

Her biri yalnızca kendi tek özelliğini ayarlar, bu yüzden `border-width`/`border-radius` gerçekten bir kenarlık çizmek için bir `border-*` renk ve bir kenarlık stili gerekir. Bunlar tam token adını kullanır (`.--border-radius-md`), oysa renk ve boşluk yardımcıları yukarıda kısa alias'lar kullanır (`.--bg-brand`, `.--mt-lg`) — alias'lar ergonomik kısayollardır; token sınıfları ise literal ve kapsamlıdır.

**Yerleşim** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) ve `.--text-align-<value>` (`start`, `center`, `end`, `justify`) InstUI'nin çapraz-kesit `display` ve `textAlign` prop'larını (View, Button, Metric, Tabs, …) kapsayan bileşime bağlı olmayan, birleştirilebilir sınıflar olarak sunar — bu yüzden bunlar per-bileşen modifier'ları değildir.

Her çift-tire sınıf, aynı isimli tek-tire bileşen modifier'ının üzerine şemaya deterministik olarak kazanır, stil sayfası import sırasından bağımsız — mekanizma için bkz. [Authoring conventions](/conventions/authoring).

Buradaki her şey `--instui-*` token'ları tarafından yönlendirilen saf CSS'dir, bu yüzden token katmanından InstUI ile uyumlu olarak takip eder. `componentsCss` ve bileşen başına oluşturucular için [API reference](/api/) bakınız.

## Örtüler: dialog ve popover

Örtü bileşenleri yerel platform primitifleri üzerinde çalışır, bu yüzden çok az veya hiç JavaScript olmadan erişilebilir davranır.

**Modal** — bir native `<dialog>` üzerine `.instui-modal` koyun. Bu, odak tuzağı, `Esc` ile kapatma ve bir `::backdrop` sağlar; backdrop, `.instui-mask` ile aynı `--instui-component-mask-background-color` token'ı ile karartılır (bunu buzlandırmak için `-blur` ekleyin). Açmak ve kapatmak için invoker komutlarını kullanın — script gerekmez:

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

**Context view / popover** — bir `[popover]` elementine `.instui-context-view` koyun ve `popovertarget` ile açıp kapatın. En üst katmanı kullanır ve dışarı tıklama veya `Esc` ile light-dismiss yapar, yine script gerekmez:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — `.instui-drawer-layout`'i bir düzen köküne `.tray` ve `.content` çocukları ile koyun. Tepsiyi göstermek için `open` (veya `-open`) özniteliğini ekleyin ve inline-end tarafına demirlemek için `placement="end"` (veya `-placement-end`) kullanın — yerleşim, mantıksal `inset-inline-*`/`flex-direction` özellikleri üzerinden çözüldüğünden, `dir="rtl"` altında otomatik olarak tersine döner, ekstra kurala gerek yoktur. Odaklu etkileşim paketi Invoker komut yönlendirmesi ekler ve genişlik `--drawer-layout-min-width`'yi (varsayılan `--instui-breakpoints-sm`, sonra `30rem`) geçince overlay moduna (`should-overlay-tray`) geçişleri yönetir:

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` akış içi örtüler için (kart üzerinde bir spinner); bir modalin `::backdrop` modal durumunu kapsar.

Her iki desen de `@pantoken/web-components` içinde davranışsal özel elementler olarak sarılmıştır: `<instui-modal open>` (bir `<dialog>` kendi `open` özniteliğiyle yönlendirilen) ve `<instui-context-view>` (bir native popover).

Tarayıcı desteği: popover API ve `popovertarget` Baseline 2024; invoker komutları (`command`/`commandfor`) Baseline 2025'te; daha eski tarayıcılarda butonları `dialog.showModal()` ile bir satırlık fallback olarak bağlayın. Bir popover'ı tetikleyicisinin yanına konumlandırmak, desteklendiği yerlerde CSS anchor positioning kullanır (Chromium); diğer yerlerde üst katmanda ortalanır.

## Formlar

**FormField** — `.instui-form-field` bir etiket, kontrol ve varsa mesajları yerleştiren CSS-Grid sarmalayıcısıdır. Yerel olarak etiketin kontrol ile ilişkilendirilmesi için bunu bir `<label>` üzerine koyun. Üç grid alanı vardır — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (varsayılan) alanları yığar; `-layout-inline` etiketi kontrolün yanına koyar (ayar için `-label-align-{start,end}` ve `-v-align-{top,middle,bottom}` ile ince ayar). `-readonly` etiketi yeniden renklendirir.

**Gerekli yıldız işareti** alanın gerekli olduğunu ya `-required` sınıfı ya da içindeki bir yerel `required` kontrolü belirlediğinde görünür — böylece sadece input'a `required` koyarsınız ve işaret görünür. Dekoratif bir işarettir (etikete bir `::after`, erişilebilirlik ağacının dışında); form kendiliğinden anlaşılmıyorsa "yıldızlı alanlar gereklidir" gibi bir notla eşleştirin.

**FormFieldGroup** — `.instui-form-field-group` ilgili alanları `<fieldset>` içinde bir `<legend>` açıklama ile gruplayan bir yapıdır. Tamamen yerleşim odaklıdır (özel token yok): varsayılan alanları yığar; `-layout-columns` / `-layout-inline` bunları responsive kolonlara akıtır, `-row-spacing-*` / `-col-spacing-*` ve `-v-align-*` grid'i ayarlamak için kullanılır.

**RadioInputGroup** — `.instui-radio-input-group` aynı `<fieldset>`/`<legend>` gruplaştırmasıdır, radyo için özelleşmiştir. Çocuk radyo'lar `name` paylaştığı için seçim yerel olarak tek-seçimlidir — böylece bir dizi toggle buton tek bir kontrol gibi davranır, serbest butonlar gibi değil. `-variant-simple` (varsayılan) standart radyoları yerleştirir (`-layout-columns`/`-inline` bunları satıra akar); `-variant-toggle` çocuk `.instui-radio.-variant-toggle` butonlarını tek bir segmentli kontrole dönüştürür (çakışan kenarlıklar, yuvarlak dış uçlar):

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

**Mesajlar** — `.instui-form-field-messages` konteynerdir; her `.instui-form-field-message` bir `-type-*` alır: `-type-hint` (gri, varsayılan), `-type-error` (kırmızı metin + daire-uyarı glifi), `-type-success` (yeşil metin + daire-onay glifi) ve `-type-screenreader-only` (görsel olarak kırpılmış, yine de duyurulur). Glifler `currentColor` içinde boyanır, böylece her zaman mesaj rengine uyar. `-type-new-error` `-type-error`'nın kullanımdan kaldırılmış alias'ıdır. Konteyneri kontrol ile `aria-describedby` ile bağlayın ve hata olduğunda kontrol üzerine `aria-invalid` koyun.

Bir FormField içinde, bir `-type-error` mesajı istemci tarafı doğrulamasını takip eder: kullanıcının etkileşimi sonrası kontrol `:user-invalid` (yerel) olana kadar gizli kalır — veya sunucu tarafı hatası için `.instui-form-field` üzerinde `-invalid` ile zorlayabilirsiniz. Bir bağımsız `.instui-form-field-messages` (bir alan içinde olmayan) bundan etkilenmez. Kontrolün odak halkası da aynı şekilde davranır: `:user-invalid`/`-invalid` durumunda tehlike, `-success` durumunda başarı.

**Metin kontrolleri** — `.instui-text-input` (yerel `<input>`), `.instui-text-area` (yerel `<textarea>`, yeniden boyutlandırılabilir) ve `.instui-simple-select` (yerel `<select>` ile bir caret) aynı görünümü ve aynı durumları paylaşır: `-invalid` (hata kenarlığı), `-success` (başarı kenarlığı), `-readonly`, yerel `:disabled` ve `-size-{sm,md,lg}`. Önde/arkada bir ikon için (InstUI'nin `renderBeforeInput`/`renderAfterInput`), input'u `.instui-input-group` içine sarın ve bir `.before`/`.after` slot'u ekleyin (bir `-icon-*` glifi); `-should-not-wrap` bunun tek satırda kalmasını sağlar. `.instui-number-input` o cephe görünümüdür artı bir `.arrows` +/- spinner sütunu (yerel `type="number"`; butonları `stepUp()`/`stepDown()`'a bağlayın). `.instui-range-input` değerinin `.instui-range-input-value` ters balon içinde render edildiği stilize bir `input[type="range"]`'dir. Zengin bir combobox için listbox popover'lı, `@instructure/ui`'e bakın — bu kütüphane yerel kontrolleri kapsar.

**Stilize seçici açılır (deneysel)** — isteğe bağlı `select.css` aynı `.instui-simple-select` elementini yükseltir: açık açılır panelini ve her seçeneği (hover ve seçilmiş durumlarla) CSS Customizable Select modeli kullanarak stiller.

> [!WARNING]
> `select.css` `appearance: base-select` / `::picker(select)`'e dayanır; bu **deneyseldir** (Chrome 135+, henüz Baseline değil). Ayrı isteğe bağlı bir sayfa olarak gönderilir ve her kural `@supports (appearance: base-select)` ile kapatılmıştır, bu yüzden desteklenmeyen tarayıcılarda hiçbir şey yapmaz — `.instui-simple-select` kontrolü sadece düz yerel select olarak kalır. Geliştirilmiş açılır menüyü istiyorsanız ve sınırlı desteği kabul ediyorsanız yalnızca bunu yükleyin.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
