# CDN ve dağıtım

pantoken her paketi npm'e yayınlar, böylece token'ları, bileşenleri ve web bileşenlerini doğrudan bir CDN'den çekebilirsiniz — derleme adımı yok, paketleyici yok. Bu sayfa CSS birleştirme URL'sini (etkileşimli bir oluşturucu ile) ve web-bileşen drop-in'lerini kapsar.

## Token temeli

Her pantoken bileşeni sayfadaki bir token sayfasından `--instui-*` özel değişkenlerini okur. İki
varyant gönderilir:

- `@pantoken/css/dist/style.lean.css` — önerilen CDN temeli. Tam ikon seti hariç her token'ı taşır, bu yüzden yaklaşık 23 KB gzip'lenmiş boyuttadır.
- `@pantoken/css/dist/style.css` — tüm ~1.777 ikon glif token'larını içeren tam sayfa
  (`--instui-icon-*`). Yaklaşık 140 KB gzip'lenmiş. İkonları geniş çapta `var(--instui-icon-*)` aracılığıyla referanslıyorsanız bunu yükleyin.

Yükselti ölçeği ve odak-halkası değişkenleri her iki sayfada da bulunur, bu yüzden gölgeler ve odak halkası yalnızca temel yüklü olsa bile çalışır.

## Bileşenlerinizi ve ikonlarınızı seçin

[etkileşimli CDN seçici](/guide/cdn-picker) CSS için jsDelivr birleştirme URL'leri ve JavaScript paketleri için snippet'ler oluşturur. Açın, ihtiyacınızı işaretleyin ve oluşturulan çıktıyı kopyalayın.

- **Components sekmesi** — tek tek bileşen stillerini veya tüm `components.css` barel'ini seçin. Gerekirse base reset veya spacing/color yardımcılarını ekleyin.
- **JS sekmesi** — `@pantoken/interactions` için bir ESM import snippet'i kopyalayın.
- **Icons sekmesi** — InstUI setinden (~1.800 ikon) veya Simple Icons'tan (~3.300 marka glifi) tek tek ikonlar seçin. Seçici, ikon CSS dosyaları için ayrı bir birleştirme URL'si üretir, böylece yalnızca gerçekten kullandığınız ikonları yükleyebilirsiniz.
- **Web Components sekmesi** — `@pantoken/web-components` snippet'leri (ESM seçici register veya klasik script bootstrap) oluşturun.

Her bileşen dosyası küçüktür — çoğu yaklaşık 2 KB civarındadır. İkon render eden bir bileşen (`alert`, `checkbox`,
ve birkaç diğerleri) bu gliflere ihtiyaç duyar, bu nedenle oluşturucu, ince sayfayı seçtiğinizde `@pantoken/components/dist/component-icons.css` (yaklaşık
0.5 KB gzip'lenmiş — bileşen setinin kullandığı 11 ikon) ekler. Tam sayfa zaten bunları taşır.

### Yükleme sırası ve fontlar

Token temelini önce yükleyin, ardından isteğe bağlı base reset'i, sonra bileşen dosyalarını ve en sona yardımcıları — bunlar geçersiz kılma yardımcılarıdır, bu yüzden bir bileşenin kuralını gerçekten geçersiz kılmaları için kaskad içinde ondan sonra gelmeleri gerekir. Yukarıdaki birleştirme URL'si zaten bunları sizin için sıralar. Fontlar tek istisnadır:
`@pantoken/components/dist/fonts.css` font dosyalarına göreli yollarla işaret ettiği için, birleştirme bunları yeniden yazamaz — bunu kendi `<link>` olarak yükleyin:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Hepsi bir arada

Seçicide **All components** işaretleyerek barel'e geçiş yapın veya kendiniz işaret edin (yaklaşık 141 KB
gzip'lenmiş) token sayfası ile birlikte:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web bileşenleri

`@pantoken/web-components` framework bağımsız `<instui-*>` özel elementleri kaydeder. Kendi CSS'lerini inline ederler, ancak yine de sayfadaki bir sayfadan token'ları okurlar; bu yüzden bir token temeli de yükleyin.

### ES modülleri (önerilen)

Bir ESM CDN paketin bağımlılıklarını sizin için çözer. Bu her elementi kaydeder:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

İkon render eden elementlerin (`<instui-alert>` gibi) gliflerini çözmesi için tam token sayfasını (veya ince sayfa artı `component-icons.css`) kullanın.

Sadece bazı elementleri — ve onların iç içe bağımlılıklarını — kaydetmek için `register`'yi import edin ve `only`'i iletin:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Klasik bir script etiketi

Modulsüz bir drop-in için IIFE build'i yükleyin. Bu, bağımlılıklarını paketler ve yüklemede her elementi otomatik olarak kaydeder, bir `PantokenWebComponents` global'i açığa çıkarır:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

ESM yolundan daha büyüktür — `@pantoken/components` ve `@pantoken/icons`'i inline eder — bu yüzden yalnızca modülleri kullanamıyorsanız ona yönelin.

## Sürümleri sabitleme

Yukarıdaki URL'ler — ve seçicinin yazdığı URL'ler — en son sürümü takip eder. Üretimde bir major (veya tam) sürüm sabitlemesi yapın — örneğin `@pantoken/css@0` — böylece bir yükseltme sizi hiç şaşırtmaz.
