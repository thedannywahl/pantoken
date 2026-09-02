# Komponen

`@pantoken/components` mengirimkan gaya komponen berbasis kelas yang dibangun dari token Instructure. Impor
stylesheet dan beri tag markup Anda — tidak perlu framework.

```ts
import "@pantoken/components/components.css";
```

> [!CATATAN]
> Lebih suka elemen kustom? `@pantoken/web-components` membungkus gaya yang sama ini sebagai `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, dan lainnya — lihat
> [peta paket](/guide/packages).

## Konvensi

Konvensi CSS dalam paket ini didasarkan pada versi termodifikasi dari [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifier adalah **kunci-nilai** — `-<prop>-<val>`, diselaraskan dengan nama prop InstUI — sehingga dibaca sendiri:
`-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Prop boolean adalah nama prop
saja, keberadaan berarti `true` (`-has-shadow`, `-clickable`); boolean dengan default aktif yang dimatikan
membalik (`-without-background`, `-without-border`). Ukuran menerima ejaan pendek dan panjang
(`-size-sm` = `-size-small`). Jika sebuah nama menyimpang dari InstUI, kelas semantik InstUI masih berfungsi
tetapi sudah usang (mis. `-variant-info` → gunakan `-color-info`).

### Contoh

Komponen React Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

komponen pantoken:

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

Untuk prop `timeout` InstUI, atur properti kustom tanpa satuan `--timeout` dalam milidetik dan muat
interaksi Alert. Nilai positif menjadwalkan penghapusan; `0` (default) membiarkan alert tetap
terpasang. Tambahkan kelas `instui-transition -fade-entered` dari utilitas `transition` untuk fade InstUI; hilangkan
mereka untuk penghapusan segera. Interaksi mengendalikan state `-fade-exiting` dan memicu event `dismiss` yang dapat dibatalkan dan bubbling sebelum penghapusan, sehingga aplikasi dapat memanggil `preventDefault()` untuk mempertahankan
alert tetap terpasang.

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

Bilah progres menerima skala arbitrer melalui `--min` (`0` secara default), `--value`, dan `--max`
(`100` secara default), dengan alias usang `--value-now` dan `--value-max`. Tambahkan `-should-animate`
untuk menerapkan transisi setengah detik InstUI setiap kali nilai berubah. `.value` berdampingan dengan `.bar` sebagai
anak dari akar; tambahkan `-render-value-inside` untuk merendernya di atas track, disejajarkan ke awalnya,
sebagai gantinya (gaya agar terbaca terhadap warna meter). Gunakan native `<progress>` untuk
rentang berbasis nol dan `<meter>` ketika minimum bukan nol; web components memilih di antara keduanya
secara otomatis dari atribut `min` mereka. InstUI tidak memiliki state indeterminate, jadi `<progress>`
yang kehilangan atribut `value` adalah tebakan terbaik khusus pantoken: `progress-bar` menganimasikan `.bar` sebagai
segmen geser dan `progress-circle` memutar ring-nya pada busur tetap, kedua-duanya menyembunyikan `.value`.

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

Lingkaran progres menerima skala arbitrer yang sama melalui `--min`, `--value`, dan `--max`.
`--value-now` dan `--value-max` tetap sebagai alias fungsional yang usang. Tambahkan `-should-animate` dan
muat bundel interaksi fokus untuk mereproduksi animasi mount InstUI; `--animation-delay` adalah
delay tanpa satuan dalam milidetik. Ejaan usang `-should-animate-on-mount` dan
`-shold-animate-on-mount` tetap sebagai alias fungsional.

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

## Prefiks kelas

Setiap kelas diberi namespace `instui-` secara default. Bangun stylesheet dengan prefiks sendiri — atau tanpa — dengan
meneruskan `prefix` ke builder mana pun. Nilai falsy apa pun (`null`, `undefined`, `""`, atau mengabaikannya) menghapus
prefiks sepenuhnya, sehingga Anda dapat menulis `class="heading -level-h1"` sebagai ganti `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Modifier yang diawali tanda hubung (`.-color-secondary`, `.-level-h1`) tidak berubah dalam kedua kasus. The
stylesheet yang dikirimkan oleh paket mempertahankan prefiks `instui`.

## Dasar

`base.css` adalah reset opsional yang menetapkan default dokumen global dari token: `box-sizing`, sebuah
reset `body`, permukaan halaman, warna teks dan font dasar, `color-scheme` (jadi token `light-dark()` dan kontrol native
mengikuti tema), dan link dasar. Muat sekali, sebelum lembar komponen dan prose,
ketika pantoken menguasai halaman.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Lewati jika Anda menyematkan komponen ke host yang sudah memberi tema pada `html` dan `body` sendiri —
reset mengecat permukaan halaman, jadi Anda tidak ingin bersaing dengan host. Semua yang diatur menggunakan
selektor `:where()` dengan spesifisitas rendah, sehingga aturan Anda sendiri selalu menang.

`base.css` _menerapkan_ font merek (`font-family: var(--instui-font-family-base)`, dengan fallback sistem); untuk _memuat_ nya, impor `fonts.css` opsional — `@font-face` aturan untuk Atkinson Hyperlegible
Next, menunjuk ke woff2 yang dikirimkan dalam paket. Ini terpisah karena face sekitar ~350 kB dan
self-hosting font adalah pilihan sadar.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Konten pembaca layar

<p>Ada pesan tersembunyi setelah kalimat ini.<span class="instui-screen-reader-content">Hanya pembaca layar yang mengumumkan ini.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` menyembunyikan elemen secara visual sambil tetap mempertahankannya di pohon aksesibilitas
— untuk label dan teks status yang harus dibaca teknologi bantu tetapi desain tidak boleh menampilkannya.

## Utilitas

`utilities.css` adalah lapisan opsional dari kelas lintas-potong: sebuah primitif `View`, spasi pada skala token,
dan override warna semantik. Berbeda dengan kelas `-modifier` komponen, ini menggunakan **double
dash** (`--mod`) sehingga tidak pernah bertabrakan dengan nama modifier komponen, dan mereka berlaku untuk elemen
apa pun — kosong, atau disusun ke atas sebuah komponen.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Permukaan accent-blue dengan teks on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Tengah dengan mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` adalah `View` InstUI. Ini adalah dasar yang Anda lapisi dengan spasi dan warna, dan membawa modifier kunci-nilai untuk prop visualnya sendiri sehingga Anda tidak perlu menggunakan utilitas:
`-background-*` (permukaannya), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, dan `-cursor-*` — ini adalah modifier satu-tanda hubung milik `view` sendiri,
tidak terkait dengan utilitas double-dash di bawah. Properti nilai bebas
(width/height/inset) tetap sebagai gaya inline; `margin`/`padding` menggunakan utilitas spasi.

**Spasi** — kelas per-sisi pada skala spasi. Baca sebagai `{m|p}{side}-{step}`: `m` untuk
margin atau `p` untuk padding (atau kata penuh `margin`/`padding`), sebuah sisi logis opsional, lalu langkah. Jadi `.--m-lg` dan `.--margin-lg` sama, seperti juga `.--pt-md` dan `.--paddingt-md`.

- Sisi: none (semua), `t`/`b` (awal/akhir blok), `s`/`e` (awal/akhir baris), `x`/`y` (sumbu inline/blok). Sisi logis tetap benar dalam layout kanan-ke-kiri.
- Langkah: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, plus `auto` hanya untuk margin.

Susun mereka untuk shorthand `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Warna** — override semantik yang tetap sesuai palet: `.--bg-<name>` (latar),
`.--text-<name>` (warna teks), dan `.--border-<name>` (warna border). Setiap `<name>` adalah
token warna semantik — intent (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus palet `accent-*` (`accent-blue`, `accent-green`, dan seterusnya). Nama hanya ada jika token itu ada dalam keluarga tersebut, jadi `text-brand` bukan kelas — teks tidak memiliki token brand.
Tidak ada cara untuk mencapai primitif atau hex sewenang-wenang, dan setiap override mengikuti
tema.

**Keluarga token** — setiap keluarga "satu token, satu properti" mendapat kelas per token, dinamai sesuai
token. Susun bebas:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (dan `-depth1`…`-card`) → `box-shadow`

Masing-masing hanya menetapkan propertinya sendiri, jadi `border-width`/`border-radius` membutuhkan warna `border-*` dan gaya border
untuk benar-benar menggambar border. Ini menggunakan nama token lengkap (`.--border-radius-md`), sedangkan
pembantu warna dan spasi di atas menggunakan alias pendek (`.--bg-brand`, `.--mt-lg`) — alias
adalah jalan pintas ergonomis; kelas token adalah literal dan lengkap.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) dan `.--text-align-<value>` (`start`, `center`, `end`, `justify`) mencakup prop lintas-potong InstUI
`display` dan `textAlign` (View, Button, Metric, Tabs, …) sebagai kelas yang dapat disusun —
jadi itu bukan modifier per-komponen.

Setiap kelas double-dash memenangkan cascade secara deterministik atas modifier komponen
dengan nama sama, tanpa memandang urutan impor stylesheet — lihat [Konvensi authoring](/conventions/authoring)
untuk mekanismenya.

Semua di sini adalah CSS murni yang digerakkan oleh token `--instui-*`, sehingga mengikuti InstUI melalui lapisan token.
Lihat [referensi API](/api/) untuk `componentsCss` dan builder per-komponen.

## Overlay: dialog dan popover

Komponen overlay menggunakan primitif platform native, sehingga berperilaku aksesibel dengan sedikit atau tanpa
JavaScript.

**Modal** — letakkan `.instui-modal` pada `<dialog>` native. Ini mendapatkan fokus trapping, penutupan dengan `Esc`, dan sebuah
`::backdrop` secara gratis; backdrop diredupkan dengan token `--instui-component-mask-background-color`
yang sama seperti `.instui-mask` (tambahkan `-blur` untuk memberi efek frost). Buka dan tutup dengan invoker commands — tanpa skrip:

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

**Context view / popover** — letakkan `.instui-context-view` pada elemen `[popover]` dan toggle dengan
`popovertarget`. Ini berada di lapisan atas dan light-dismiss pada klik di luar atau `Esc`, lagi-lagi tanpa skrip:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — letakkan `.instui-drawer-layout` pada root layout dengan anak `.tray` dan `.content`.
Tambahkan atribut `open` (atau `-open`) untuk menampilkan tray, dan gunakan `placement="end"`
(atau `-placement-end`) untuk mendaratkannya ke sisi inline-end — penempatan diselesaikan melalui properti logis
`inset-inline-*`/`flex-direction`, sehingga otomatis membalik di bawah `dir="rtl"` tanpa
aturan tambahan. Bundel interaksi fokus menambahkan routing perintah Invoker dan mengubah mode overlay
(`should-overlay-tray`) saat lebar melewati `--drawer-layout-min-width` (default
`--instui-breakpoints-sm`, lalu `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` digunakan untuk overlay yang tetap dalam aliran (spinner di atas kartu); `::backdrop`
modal menutupi kasus modal.

Kedua pola juga dibungkus sebagai elemen kustom berperilaku dalam `@pantoken/web-components`:
`<instui-modal open>` (sebuah `<dialog>` yang didorong oleh atribut `open`-nya) dan `<instui-context-view>` (sebuah
popover native).

Dukungan browser: API popover dan `popovertarget` adalah Baseline 2024; perintah invoker
(`command`/`commandfor`) adalah Baseline 2025, jadi pada browser lama hubungkan tombol ke `dialog.showModal()`
sebagai fallback satu baris. Menempatkan popover di samping trigger menggunakan posisi anchor CSS bila
didukung (Chromium); di tempat lain ia dipusatkan di lapisan atas.

## Formulir

**FormField** — `.instui-form-field` adalah pembungkus CSS-Grid yang menyusun label, kontrol, dan pesan apa pun. Letakkan pada `<label>` sehingga label berasosiasi dengan kontrolnya secara native. Ini memiliki tiga area grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (default) menumpuk area; `-layout-inline` menempatkan label di samping kontrol (sesuaikan
dengan `-label-align-{start,end}` dan `-v-align-{top,middle,bottom}`). `-readonly` mewarnai ulang label.

Asterisk **required** muncul ketika field diwajibkan oleh _baik_ kelas `-required` _atau_ kontrol native `required` di dalamnya — sehingga Anda cukup menetapkan `required` pada input dan tanda akan muncul.
Itu bersifat dekoratif (sebuah `::after` pada label, di luar pohon aksesibilitas); padukan dengan catatan seperti
"fields marked \* are required" kecuali formulirnya sudah jelas sendiri.

**FormFieldGroup** — `.instui-form-field-group` mengelompokkan field terkait dalam `<fieldset>` dengan
deskripsi `<legend>`. Ini murni layout (tanpa token khusus): default menumpuk field;
`-layout-columns` / `-layout-inline` mengalirkan mereka ke kolom responsif, dengan `-row-spacing-*` /
`-col-spacing-*` dan `-v-align-*` untuk menyetel grid.

**RadioInputGroup** — `.instui-radio-input-group` adalah pengelompokan `<fieldset>`/`<legend>` yang sama,
terspesialisasi untuk radio. Karena radio anak berbagi `name`, pemilihan secara native tunggal —
jadi satu set tombol toggle berperilaku sebagai satu kontrol, bukan tombol lepas. `-variant-simple` (default) menyusun
radio standar (`-layout-columns`/`-inline` mengalirkannya ke baris); `-variant-toggle` menghubungkan
tombol `.instui-radio.-variant-toggle` anak menjadi satu kontrol segmented (border terkolaps, ujung luar membulat):

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

**Messages** — `.instui-form-field-messages` adalah wadah; tiap `.instui-form-field-message` memakai
`-type-*`: `-type-hint` (abu-abu, default), `-type-error` (teks merah + glyph lingkaran-alert), `-type-success`
(teks hijau + glyph lingkaran-check), dan `-type-screenreader-only` (dipotong secara visual, masih diumumkan).
Glyph dicat dalam `currentColor`, jadi selalu cocok dengan warna pesan. `-type-new-error` adalah
alias usang dari `-type-error`. Sambungkan wadah ke kontrol dengan `aria-describedby`, dan tetapkan
`aria-invalid` pada kontrol saat ada error.

Di dalam FormField, pesan `-type-error` mengikuti validasi sisi-klien: tetap tersembunyi hingga kontrol
field menjadi `:user-invalid` (native, setelah pengguna berinteraksi) — atau Anda memaksanya dengan `-invalid`
pada `.instui-form-field` (untuk error sisi-server). `.instui-form-field-messages` yang berdiri sendiri (tidak dalam
field) tidak terpengaruh. Cincin fokus kontrol mengikuti: berbahaya saat `:user-invalid`/`-invalid`,
sukses pada `-success`.

**Kontrol teks** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
dapat diubah ukuran), dan `.instui-simple-select` (native `<select>` dengan caret) berbagi tampilan yang sama dan state yang sama: `-invalid` (border error), `-success` (border sukses), `-readonly`, native `:disabled`, dan
`-size-{sm,md,lg}`. Untuk ikon di depan/belakang (InstUI's `renderBeforeInput`/`renderAfterInput`), bungkus
input dengan `.instui-input-group` dan tambahkan slot `.before`/`.after` (glyph `-icon-*`); `-should-not-wrap`
menjaganya tetap satu baris. `.instui-number-input` adalah facade itu ditambah kolom spinner +/- `.arrows` (native
`type="number"`; sambungkan tombol ke `stepUp()`/`stepDown()`). `.instui-range-input` adalah `input[type="range"]` bergaya yang nilainya dirender dalam `.instui-range-input-value` bubble inverse. Untuk combobox kaya dengan listbox popover, gunakan `@instructure/ui` — pustaka ini menangani kontrol native.

**Styled select dropdown (eksperimental)** — `select.css` opsional meningkatkan elemen `.instui-simple-select` yang _sama_: ia memberi gaya pada dropdown terbuka (panel dan tiap opsi, dengan hover dan state terpilih) menggunakan model CSS Customizable Select.

> [!PERINGATAN]
> `select.css` bergantung pada `appearance: base-select` / `::picker(select)`, yang **eksperimental**
> (Chrome 135+, belum Baseline). Ini dikirim sebagai lembar opsional terpisah dan setiap aturan digating
> di belakang `@supports (appearance: base-select)`, sehingga tidak melakukan apa-apa di browser yang tidak mendukung — kontrol
> `.instui-simple-select` tetap select native biasa. Muat hanya jika Anda menginginkan
> dropdown yang ditingkatkan dan menerima dukungan terbatas.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
