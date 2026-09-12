# Komponen

`@pantoken/components` mengirimkan gaya komponen berbasis kelas yang dibuat dari token Instructure. Impor
lembar gaya dan beri tag markup Anda — tanpa kerangka kerja diperlukan.

```ts
import "@pantoken/components/components.css";
```

> [!CATATAN]
> Lebih suka elemen kustom? `@pantoken/web-components` membungkus gaya yang sama ini sebagai `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, dan lainnya — lihat
> [peta paket](/api/).

## Konvensi

Konvensi CSS dalam paket ini didasarkan pada versi modifikasi dari [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifier adalah **kunci-nilai** — `-<prop>-<val>`, selaras dengan nama properti InstUI — sehingga mereka terbaca sendiri:
`-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Properti boolean adalah
nama properti saja, di mana keberadaan berarti `true` (`-has-shadow`, `-clickable`); boolean default-on yang
dimatikan membalik (`-without-background`, `-without-border`). Ukuran menerima ejaan singkat dan panjang
(`-size-sm` = `-size-small`). Jika sebuah nama menyimpang dari InstUI, kelas dengan semantik InstUI
masih berfungsi tetapi sudah usang (mis. `-variant-info` → gunakan `-color-info`).

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

Untuk properti `timeout` InstUI, atur properti kustom tanpa unit `--timeout` dalam milidetik dan muat
interaksi Alert. Nilai positif menjadwalkan penghapusan; `0` (default) membiarkan alert tetap di
tempat. Tambahkan kelas `instui-transition -fade-entered` dari utilitas `transition` untuk fade InstUI; hilangkan
mereka untuk penghapusan segera. Interaksi menggerakkan keadaan `-fade-exiting` dan memicu event
`dismiss` yang dapat dibatalkan dan menggelembung sebelum penghapusan, sehingga aplikasi dapat memanggil `preventDefault()` untuk menjaga
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

Bar kemajuan menerima skala arbitrer melalui `--min` (`0` secara default), `--value`, dan `--max`
(`100` secara default), dengan alias usang `--value-now` dan `--value-max`. Tambahkan `-should-animate`
untuk menerapkan transisi setengah detik InstUI kapan pun nilai berubah. `.value` berdampingan dengan `.bar` sebagai
anak dari root; tambahkan `-render-value-inside` untuk merendernya di atas track, diselaraskan ke awalnya,
sebagai gantinya (gaya agar terbaca terhadap warna meter). Gunakan `<progress>` native untuk rentang
berbasis-nol dan `<meter>` ketika minimum bukan nol; web components memilih di antara keduanya
secara otomatis dari atribut `min`. InstUI tidak memiliki keadaan tak tentu, jadi `<progress>`
yang kehilangan atribut `value` adalah tebakan terbaik khusus pantoken: `progress-bar` menganimasikan `.bar` sebagai
segmen geser dan `progress-circle` memutar cincinnya pada busur tetap, keduanya menyembunyikan `.value`.

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

Lingkar kemajuan menerima skala arbitrer yang sama melalui `--min`, `--value`, dan `--max`.
`--value-now` dan `--value-max` tetap sebagai alias fungsional yang usang. Tambahkan `-should-animate` dan
muat bundle interaksi fokus untuk mereproduksi animasi mount InstUI; `--animation-delay` adalah
delay tanpa unit dalam milidetik. Ejaan usang `-should-animate-on-mount` dan
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

Setiap kelas diberi namespace `instui-` secara default. Bangun lembar gaya dengan prefiks Anda sendiri — atau tanpa — dengan
meneruskan `prefix` ke pembangun mana pun. Nilai falsy apa pun (`null`, `undefined`, `""`, atau menghilangkannya) menghapus
prefiks sepenuhnya, sehingga Anda dapat menulis `class="heading -level-h1"` alih-alih `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Modifier diawali-dash (`.-color-secondary`, `.-level-h1`) tidak berubah dalam kedua cara. Lembaran gaya yang dikirim oleh paket menjaga prefiks `instui`.

## Dasar

`base.css` adalah reset opt-in yang menetapkan default dokumen global dari token: `box-sizing`, sebuah
reset `body`, permukaan halaman, warna teks dan font dasar, `color-scheme` (sehingga token `light-dark()` dan kontrol native
mengikuti tema), dan tautan dasar. Muat sekali, sebelum lembar komponen dan prosa
ketika pantoken menguasai halaman.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Lewati ketika Anda menyematkan komponen ke host yang sudah memberi tema `html` dan `body` sendiri —
reset melukis permukaan halaman, sehingga Anda tidak ingin itu bertentangan dengan host. Semua yang diaturnya menggunakan
selektor `:where()` ber-spesifisitas rendah, sehingga aturan Anda sendiri selalu menang.

`base.css` _menerapkan_ font merek (`font-family: var(--instui-font-family-base)`, dengan fallback sistem); untuk _memuat_-nya, impor `fonts.css` opt-in — `@font-face` aturan untuk Atkinson Hyperlegible
Next, yang menunjuk ke woff2 yang dikirim dalam paket. Ini terpisah karena face sekitar ~350 kB dan
self-hosting font adalah pilihan yang disengaja.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Konten pembaca layar

<p>Ada pesan tersembunyi setelah kalimat ini.<span class="instui-screen-reader-content">Hanya pembaca layar yang mengumumkannya.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` menyembunyikan elemen secara visual sambil tetap mempertahankannya dalam pohon aksesibilitas
— untuk label dan teks status yang harus dibaca teknologi bantu tetapi desain tidak boleh menampilkannya.

## Utilitas

`utilities.css` adalah lapisan opt-in dari kelas lintas-potong: sebuah primitif `View`, spasi pada skala token,
dan override warna semantik. Berbeda dengan kelas `-modifier` komponen, ini menggunakan **double
dash** (`--mod`) sehingga tidak pernah bertabrakan dengan nama modifier komponen, dan mereka berlaku untuk
elemen apa pun — kosong, atau disusun pada sebuah komponen.

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

**View** — `.instui-view` adalah `View` InstUI. Ini adalah dasar yang Anda lapisi spasi dan warna, dan
membawa modifier kunci-nilai untuk properti visualnya sendiri sehingga Anda tidak perlu menjangkau utilitas:
`-background-*` (permukaannya), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, dan `-cursor-*` — ini adalah modifier
single-dash milik `view`, tidak terkait dengan utilitas double-dash di bawah. Properti nilai-bebas
(width/height/inset) tetap sebagai style inline; `margin`/`padding` menggunakan utilitas spasi.

**Spacing** — kelas per-sisi pada skala spacing. Bacalah sebagai `{m|p}{side}-{step}`: `m` untuk
margin atau `p` untuk padding (atau kata penuh `margin`/`padding`), sebuah sisi logis opsional, lalu sebuah
langkah. Jadi `.--m-lg` dan `.--margin-lg` sama, seperti juga `.--pt-md` dan `.--paddingt-md`.

- Sisi: none (semua), `t`/`b` (awal/akhir blok), `s`/`e` (awal/akhir inline), `x`/`y` (sumbu inline/blok). Sisi logis tetap benar dalam tata letak kanan-ke-kiri.
- Langkah: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, ditambah `auto` hanya untuk margin.

Susun mereka untuk shorthand `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Warna** — override semantik yang tetap di-palette: `.--bg-<name>` (latar),
`.--text-<name>` (warna teks), dan `.--border-<name>` (warna border). Setiap `<name>` adalah token
warna semantik — intent (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) plus palet `accent-*` (`accent-blue`, `accent-green`, dan seterusnya). Nama hanya ada jika token ada dalam keluarga itu, jadi `text-brand` bukan kelas — teks tidak memiliki
token brand. Tidak ada cara untuk mencapai primitif atau hex sembarang, dan setiap override mengikuti
tema.

**Keluarga token** — setiap keluarga "satu token, satu properti" mendapatkan satu kelas per token, dinamai sesuai
token. Susun mereka dengan bebas:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (dan `-depth1`…`-card`) → `box-shadow`

Masing-masing hanya mengatur propertinya, jadi `border-width`/`border-radius` membutuhkan warna `border-*` dan gaya border untuk benar-benar menggambar border. Ini menggunakan nama token lengkap (`.--border-radius-md`), sementara pembantu warna dan spasi di atas menggunakan alias pendek (`.--bg-brand`, `.--mt-lg`) — alias adalah pintasan ergonomis; kelas token bersifat literal dan menyeluruh.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) dan `.--text-align-<value>` (`start`, `center`, `end`, `justify`) mencakup properti lintas-potong InstUI
`display` dan `textAlign` (View, Button, Metric, Tabs, …) sebagai kelas yang dapat disusun —
jadi itu bukan modifier per-komponen.

Setiap kelas double-dash menang secara deterministik dalam kaskade atas modifier komponen single-dash yang bernama sama, terlepas dari urutan impor stylesheet — lihat [Konvensi authoring](/conventions/authoring)
untuk mekanismenya.

Semua di sini murni CSS yang digerakkan oleh token `--instui-*`, jadi mengikuti InstUI melalui lapisan token.
Lihat [referensi API](/api/) untuk `componentsCss` dan pembangun per-komponen.

## Overlay: dialog dan popover

Komponen overlay menggunakan primitif platform native, sehingga mereka berperilaku aksesibel dengan sedikit atau tanpa
JavaScript.

**Modal** — letakkan `.instui-modal` pada `<dialog>` native. Ia mendapatkan trapping fokus, `Esc`-to-close, dan sebuah
`::backdrop` secara gratis; backdrop diredupkan dengan token `--instui-component-mask-background-color`
yang sama seperti `.instui-mask` (tambahkan `-blur` untuk memberi efek frost). Buka dan tutup dengan perintah invoker — tanpa skrip:

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
`popovertarget`. Ia berada di lapisan atas dan menutup ringan pada klik di luar atau `Esc`, lagi-lagi tanpa skrip:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — letakkan `.instui-drawer-layout` pada root layout dengan anak `.tray` dan `.content`.
Tambahkan atribut `open` (atau `-open`) untuk menampilkan tray, dan gunakan `placement="end"`
(atau `-placement-end`) untuk mendocking ke sisi inline-end — penempatan terselesaikan melalui properti logis
`inset-inline-*`/`flex-direction`, sehingga otomatis membalik di bawah `dir="rtl"` tanpa aturan tambahan. Bundle interaksi fokus menambahkan routing perintah Invoker dan mengubah mode overlay
(`should-overlay-tray`) ketika lebar melewati `--drawer-layout-min-width` (default
`--instui-breakpoints-sm`, kemudian `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` dipakai untuk overlay in-flow (spinner di atas kartu); `::backdrop` modal mencakup kasus modal.

Kedua pola juga dibungkus sebagai elemen kustom behaviorial dalam `@pantoken/web-components`:
`<instui-modal open>` (sebuah `<dialog>` yang digerakkan oleh atribut `open`) dan `<instui-context-view>` (sebuah
popover native).

Dukungan browser: API popover dan `popovertarget` adalah Baseline 2024; perintah invoker
(`command`/`commandfor`) adalah Baseline 2025, jadi pada browser lama hubungkan tombol ke `dialog.showModal()`
sebagai fallback satu baris. Memposisikan popover di samping trigger-nya menggunakan posisi anchor CSS ketika
didukung (Chromium); di tempat lain ia dipusatkan di lapisan atas.

## Formulir

**FormField** — `.instui-form-field` adalah pembungkus CSS-Grid yang menata label, kontrol, dan pesan apa pun. Letakkan pada `<label>` sehingga label berasosiasi dengan kontrol secara native. Ia memiliki tiga area grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (default) menumpuk area; `-layout-inline` menempatkan label di sebelah kontrol (sesuaikan
dengan `-label-align-{start,end}` dan `-v-align-{top,middle,bottom}`). `-readonly` mewarnai ulang label.

Asterisk **required** muncul ketika field diperlukan oleh _baik_ kelas `-required` _atau_ kontrol native `required` di dalamnya — jadi Anda bisa cukup mengatur `required` pada input dan tanda akan muncul.
Ia bersifat dekoratif (sebuah `::after` pada label, di luar pohon aksesibilitas); pasangkan dengan catatan seperti
"fields marked \* are required" kecuali formulirnya sudah jelas.

**FormFieldGroup** — `.instui-form-field-group` mengelompokkan field terkait dalam sebuah `<fieldset>` dengan deskripsi `<legend>`. Ini murni tata letak (tanpa token khusus): default menumpuk field;
`-layout-columns` / `-layout-inline` mengalirkan mereka ke kolom responsif, dengan `-row-spacing-*` /
`-col-spacing-*` dan `-v-align-*` untuk menyetel grid.

**RadioInputGroup** — `.instui-radio-input-group` adalah pengelompokan `<fieldset>`/`<legend>` yang sama,
dispesialisasi untuk radio. Karena radio anak berbagi `name`, pemilihan secara native bersifat pilihan-tunggal —
sehingga satu set tombol toggle berperilaku sebagai satu kontrol, bukan tombol terpisah. `-variant-simple` (default) menata
radio standar (`-layout-columns`/`-inline` mengalirkannya ke baris); `-variant-toggle` menghubungkan
tombol `.instui-radio.-variant-toggle` anak menjadi satu kontrol tersegmentasi (border terkolaps, ujung luar membulat):

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

**Pesan** — `.instui-form-field-messages` adalah kontainer; setiap `.instui-form-field-message` mengambil sebuah
`-type-*`: `-type-hint` (abu-abu, default), `-type-error` (teks merah + glyph lingkar-alert), `-type-success`
(teks hijau + glyph lingkar-ceklis), dan `-type-screenreader-only` (terpotong secara visual, masih diumumkan).
Glyph dicat dalam `currentColor`, sehingga selalu cocok dengan warna pesan. `-type-new-error` adalah
alias usang dari `-type-error`. Sambungkan kontainer ke kontrol dengan `aria-describedby`, dan atur
`aria-invalid` pada kontrol saat ada kesalahan.

Di dalam FormField, pesan `-type-error` mengikuti validasi sisi-klien: ia tetap tersembunyi sampai
kontrol field `:user-invalid` (native, setelah pengguna berinteraksi) — atau Anda memaksanya dengan `-invalid`
pada `.instui-form-field` (untuk kesalahan sisi-server). `.instui-form-field-messages` mandiri (tidak dalam
field) tidak terpengaruh. Cincin fokus kontrol mengikuti: berbahaya ketika `:user-invalid`/`-invalid`,
sukses pada `-success`.

**Kontrol teks** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
dapat diubah ukuran), dan `.instui-simple-select` (native `<select>` dengan karet) berbagi tampilan yang sama dan keadaan yang sama: `-invalid` (border error), `-success` (border success), `-readonly`, native `:disabled`, dan
`-size-{sm,md,lg}`. Untuk ikon di depan/belakang (InstUI's `renderBeforeInput`/`renderAfterInput`), bungkus
input dalam `.instui-input-group` dan tambahkan slot `.before`/`.after` (sebuah glyph `-icon-*`); `-should-not-wrap`
menjaganya dalam satu baris. `.instui-number-input` adalah fasad itu plus kolom spinner +/- `.arrows` (native
`type="number"`; sambungkan tombol ke `stepUp()`/`stepDown()`). `.instui-range-input` adalah
`input[type="range"]` bertata gaya yang nilainya dirender dalam `.instui-range-input-value` bubble terbalik. Untuk combobox kaya dengan listbox popover, gunakan `@instructure/ui` — pustaka ini mencakup kontrol native.

**Styled select dropdown (eksperimental)** — sebuah `select.css` opt-in meningkatkan _sama_
elemen `.instui-simple-select`: ia menata dropdown terbuka (panel dan setiap opsi, dengan keadaan hover dan
terpilih) menggunakan model CSS Customizable Select.

> [!PERINGATAN]
> `select.css` bergantung pada `appearance: base-select` / `::picker(select)`, yang **eksperimental**
> (Chrome 135+, belum Baseline). Ini dikirim sebagai lembar terpisah opt-in dan setiap aturan digated
> di belakang `@supports (appearance: base-select)`, sehingga tidak melakukan apa-apa di browser yang tidak mendukung — kontrol
> `.instui-simple-select` tetap menjadi select native biasa. Muat hanya jika Anda menginginkan
> dropdown yang ditingkatkan dan menerima dukungan yang terbatas.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
