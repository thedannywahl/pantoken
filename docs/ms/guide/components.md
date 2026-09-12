# Komponen

`@pantoken/components` menghantar gaya komponen berasaskan kelas yang dibina dari token Instructure. Import helaian gaya dan tag markup anda — tiada rangka kerja diperlukan.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Lebih suka elemen tersuai? `@pantoken/web-components` membalut gaya yang sama ini sebagai `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, dan banyak lagi — lihat [peta pakej](/api/).

## Konvensyen

Konvensyen CSS dalam pakej ini berasaskan versi diubah suai [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifier adalah **kunci-nilai** — `-<prop>-<val>`, selaras dengan nama prop InstUI — jadi ia terbaca sendiri: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Prop boolean ialah nama prop sahaja, di mana kehadiran bermaksud `true` (`-has-shadow`, `-clickable`); boolean yang lalai-aktif yang dimatikan membalikkan (`-without-background`, `-without-border`). Saiz menerima ejaan pendek dan panjang (`-size-sm` = `-size-small`). Apabila nama menyimpang daripada InstUI, kelas semantik InstUI masih berfungsi tetapi ditandakan usang (contohnya `-variant-info` → guna `-color-info`).

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

Untuk prop `timeout` InstUI, tetapkan sifat tersuai tanpa unit `--timeout` dalam milisaat dan muatkan interaksi Alert. Nilai positif menjadualkan pembatalan; `0` (lalai) membiarkan amaran kekal. Tambah kelas `instui-transition -fade-entered` utiliti `transition` untuk pudar InstUI; tinggalkan ia untuk penghapusan segera. Interaksi menggerakkan keadaan `-fade-exiting` dan memancarkan acara `dismiss` yang boleh dibatalkan dan menggelembung sebelum penghapusan, supaya aplikasi boleh memanggil `preventDefault()` untuk mengekalkan pemasangan amaran.

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

Bar kemajuan menerima skala sewenang-wenangnya melalui `--min` (`0` secara lalai), `--value`, dan `--max` (`100` secara lalai), dengan alias usang `--value-now` dan `--value-max`. Tambah `-should-animate` untuk memohon peralihan separuh saat InstUI bila nilai berubah. `.value` berdiri bersama `.bar` sebagai anak akar; tambah `-render-value-inside` untuk merendernya di atas trek, diselaraskan ke permulaan, sebaliknya (gayakan untuk keterbacaan terhadap warna meter). Gunakan `<progress>` natif untuk julat berasaskan sifar dan `<meter>` apabila minimum bukan sifar; komponen web memilih antara keduanya secara automatik dari atribut `min`. InstUI tiada keadaan tidak tentu, jadi `<progress>` yang hilang atribut `value` adalah anggaran terbaik pantoken: `progress-bar` menganimasikan `.bar` sebagai segmen meluncur dan `progress-circle` memutar cincin pada busur tetap, kedua-duanya menyembunyikan `.value`.

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

Bulatan kemajuan menerima skala sewenang-wenangnya yang sama melalui `--min`, `--value`, dan `--max`. `--value-now` dan `--value-max` kekal sebagai alias fungsional usang. Tambah `-should-animate` dan muatkan pek interaksi fokus untuk menghasilkan semula animasi pemasangan InstUI; `--animation-delay` ialah kelewatan tanpa unit dalam milisaat. Ejaan usang `-should-animate-on-mount` dan `-shold-animate-on-mount` kekal alias fungsional.

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

## Awalan kelas

Setiap kelas dinamasakan `instui-` secara lalai. Bina helaian gaya dengan awalan sendiri — atau tiada — dengan menyerahkan `prefix` kepada mana-mana pembina. Mana-mana nilai palsu (`null`, `undefined`, `""`, atau mengabaikannya) menjatuhkan awalan sepenuhnya, jadi anda boleh mengarang `class="heading -level-h1"` menggantikan `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Modifier berawalan sengkang (`.-color-secondary`, `.-level-h1`) tidak berubah sama ada. Helaian gaya yang dihantar oleh pakej mengekalkan awalan `instui`.

## Asas

`base.css` ialah reset pilihan yang menetapkan lalai dokumen global dari token: `box-sizing`, reset `body`, permukaan halaman, warna teks asas dan fon, `color-scheme` (supaya token `light-dark()` dan kawalan natif mengikuti tema), dan pautan asas. Muat sekali, sebelum helaian komponen dan prosa, apabila pantoken menguruskan halaman.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Langkau ia apabila anda menyematkan komponen ke hos yang sudah menentukalkan `html` dan `body` sendiri — reset itu mengecat permukaan halaman, jadi anda tidak mahu ia bertembung dengan hos. Semua yang ditetapkan menggunakan pemilih `:where()` berspesifik rendah, jadi peraturan anda sendiri sentiasa menang.

`base.css` _menggunakan_ fon jenama (`font-family: var(--instui-font-family-base)`, dengan fallback sistem); untuk _memuatkannya_, import `fonts.css` pilihan — `@font-face` peraturan untuk Atkinson Hyperlegible Next, menunjuk kepada woff2 yang dihantar dalam pakej. Ia berasingan kerana muka huruf sekitar ~350 kB dan mengehos sendiri fon adalah pilihan yang disengajakan.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Kandungan pembaca skrin

<p>Ada mesej tersembunyi selepas ayat ini.<span class="instui-screen-reader-content">Hanya pembaca skrin yang mengumumkannya.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` menyembunyikan elemen secara visual sambil mengekalkannya dalam pokok aksesibiliti — untuk label dan teks status yang harus dibaca oleh teknologi bantuan tetapi reka bentuk tidak harus memaparkannya.

## Utiliti

`utilities.css` ialah lapisan pilihan kelas rentas: primitif `View`, jarak pada skala token, dan ganti warna semantik. Berbeza dengan kelas `-modifier` komponen, ini menggunakan **sengkang berganda** (`--mod`) supaya ia tidak pernah bertembung dengan nama modifier komponen, dan ia terpakai pada mana-mana elemen — kosong, atau digabungkan pada komponen.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Permukaan accent-blue dengan teks on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Disediakan tengah dengan mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` ialah `View` InstUI. Ia asas yang anda lapisi dengan jarak dan warna, dan ia membawa modifier kunci-nilai untuk prop visualnya sendiri supaya anda tidak perlu mencari utiliti:
`-background-*` (permukaannya), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, dan `-cursor-*` — ini ialah modifier sengkang tunggal `view` sendiri, tidak berkaitan dengan utiliti sengkang berganda di bawah. Prop nilai-bebas (lebar/tinggi/inset) kekal gaya sebaris; `margin`/`padding` menggunakan utiliti jarak.

**Jarak** — kelas per-sisi pada skala jarak. Bacanya sebagai `{m|p}{side}-{step}`: `m` untuk margin atau `p` untuk padding (atau perkataan penuh `margin`/`padding`), pilihan sisi logik, kemudian langkah. Jadi `.--m-lg` dan `.--margin-lg` adalah sama, begitu juga `.--pt-md` dan `.--paddingt-md`.

- Sisi: none (semua), `t`/`b` (permulaan/akhir blok), `s`/`e` (permulaan/akhir sebaris), `x`/`y` (paksi sebaris/blok). Sisi logik kekal betul dalam susun atur kanan-ke-kiri.
- Langkah: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, ditambah `auto` untuk margin sahaja.

Gabungkan mereka untuk singkatan `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Warna** — ganti semantik yang kekal dalam palet: `.--bg-<name>` (latar),
`.--text-<name>` (warna teks), dan `.--border-<name>` (warna sempadan). Setiap `<name>` ialah token warna semantik — niat (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …) plus palet `accent-*` (`accent-blue`, `accent-green`, dan seterusnya). Nama wujud hanya jika token ada dalam keluarga itu, jadi `text-brand` bukan kelas — teks tiada token jenama. Tiada cara untuk mencapai primitif atau hex sewenang-wenangnya, dan setiap ganti mengikuti tema.

**Keluarga token** — setiap keluarga "satu token, satu sifat" mendapat kelas bagi setiap token, dinamakan selepas token. Gabungkan secara bebas:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (dan `-depth1`…`-card`) → `box-shadow`

Setiap satu hanya menetapkan satu sifatnya, jadi `border-width`/`border-radius` memerlukan warna `border-*` dan gaya sempadan untuk benar-benar melukis sempadan. Ini menggunakan nama token penuh (`.--border-radius-md`), manakala pembantu warna dan jarak di atas menggunakan alias pendek (`.--bg-brand`, `.--mt-lg`) — alias adalah pintasan ergonomik; kelas token adalah literal dan menyeluruh.

**Susun atur** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) dan `.--text-align-<value>` (`start`, `center`, `end`, `justify`) merangkumi prop rentas `display` dan `textAlign` InstUI (View, Button, Metric, Tabs, …) sebagai kelas boleh-gabung — jadi itu bukan modifier per-komponen.

Setiap kelas sengkang berganda menang kaskad secara pasti terhadap modifier komponen sengkang tunggal yang bernama sama, tanpa mengira susunan import helaian gaya — lihat [Konvensyen pengarang](/conventions/authoring) untuk mekanisme.

Semua di sini adalah CSS tulen yang digerakkan oleh token `--instui-*`, jadi ia mengikuti InstUI melalui lapisan token. Lihat [rujukan API](/api/) untuk `componentsCss` dan pembina per-komponen.

## Overlay: dialog dan popover

Komponen overlay menggunakan primitif platform natif, jadi mereka berkelakuan boleh diakses dengan sedikit atau tiada JavaScript.

**Modal** — letakkan `.instui-modal` pada `<dialog>` natif. Ia mendapat perangkap fokus, tutup-dengan-`Esc`, dan `::backdrop` secara percuma; latar belakang diredam dengan token `--instui-component-mask-background-color` yang sama seperti `.instui-mask` (tambah `-blur` untuk memutihkannya). Buka dan tutup dengan arahan invoker — tiada skrip:

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

**Context view / popover** — letakkan `.instui-context-view` pada elemen `[popover]` dan togólnya dengan `popovertarget`. Ia berada di lapisan teratas dan menutup ringan pada klik luar atau `Esc`, sekali lagi tiada skrip:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Susun atur laci** — letakkan `.instui-drawer-layout` pada akar susun atur dengan `.tray` dan `.content` anak. Tambah atribut `open` (atau `-open`) untuk mendedahkan dulang, dan gunakan `placement="end"` (atau `-placement-end`) untuk dokkannya ke sisi akhir-inline — penempatan diselesaikan melalui sifat logik `inset-inline-*`/`flex-direction`, jadi ia berbalik secara automatik di bawah `dir="rtl"` tanpa peraturan tambahan. Pek interaksi fokus menambah penghalaan arahan Invoker dan menogol mod overlay (`should-overlay-tray`) apabila lebar melintasi `--drawer-layout-min-width` (lalai `--instui-breakpoints-sm`, kemudian `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Topeng** — `.instui-mask` kekal untuk overlay dalam-aliran (spinner di atas kad); `::backdrop` modal merangkumi kes modal.

Kedua-dua corak juga dibungkus sebagai elemen tersuai berkelakuan dalam `@pantoken/web-components`: `<instui-modal open>` (sebuah `<dialog>` dikawal oleh atribut `open`) dan `<instui-context-view>` (popover natif).

Sokongan penyemak imbas: API popover dan `popovertarget` adalah Baseline 2024; arahan invoker (`command`/`commandfor`) adalah Baseline 2025, jadi pada penyemak imbas lama pautkan butang kepada `dialog.showModal()` sebagai fallback satu baris. Menempatkan popover bersebelahan pencetusnya menggunakan penentuan kedudukan anchor CSS di mana disokong (Chromium); di tempat lain ia memusat dalam lapisan teratas.

## Borang

**FormField** — `.instui-form-field` ialah pembungkus CSS-Grid yang menyusun label, kawalan, dan apa-apa mesej. Letakkan ia pada `<label>` supaya label mengait dengan kawalannya secara natif. Ia mempunyai tiga kawasan grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (lalai) menumpuk kawasan; `-layout-inline` meletakkan label di sebelah kawalan (laraskan dengan `-label-align-{start,end}` dan `-v-align-{top,middle,bottom}`). `-readonly` menukar warna label.

**Asterisk wajib** muncul apabila medan diperlukan oleh _sama ada_ kelas `-required` _atau_ kawalan natif `required` di dalamnya — jadi anda boleh hanya menetapkan `required` pada input dan tanda akan muncul. Ia hiasan (sebuah `::after` pada label, di luar pokok aksesibiliti); padankan dengan nota seperti "medan yang ditandakan \* adalah wajib" melainkan borang jelas sendiri.

**FormFieldGroup** — `.instui-form-field-group` mengumpulkan medan berkaitan dalam `<fieldset>` dengan penerangan `<legend>`. Ia susun atur tulen (tiada token khusus): lalai menumpuk medan; `-layout-columns` / `-layout-inline` mengalirkannya ke lajur responsif, dengan `-row-spacing-*` / `-col-spacing-*` dan `-v-align-*` untuk melaras grid.

**RadioInputGroup** — `.instui-radio-input-group` adalah pengelompokan yang sama `<fieldset>`/`<legend>`, dioptimumkan untuk radio. Kerana radio anak berkongsi `name`, pemilihan secara natif adalah pilihan-tunggal — jadi set butang togol berkelakuan sebagai satu kawalan, bukan butang bebas. `-variant-simple` (lalai) menyusun radio standard (`-layout-columns`/`-inline` mengalirkannya ke baris); `-variant-toggle` menghubungkan butang `.instui-radio.-variant-toggle` anak menjadi kawalan bersegmen tunggal (sempadan terkumpul, hujung luar dibulatkan):

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

**Mesej** — `.instui-form-field-messages` ialah bekas; setiap `.instui-form-field-message` mengambil `-type-*`: `-type-hint` (kelabu, lalai), `-type-error` (teks merah + glif amaran bulat), `-type-success` (teks hijau + glif semak bulat), dan `-type-screenreader-only` (dipotong secara visual, masih diumumkan). Glif mengecat dalam `currentColor`, jadi ia sentiasa sepadan dengan warna mesej. `-type-new-error` ialah alias usang bagi `-type-error`. Pautkan bekas ke kawalan dengan `aria-describedby`, dan tetapkan `aria-invalid` pada kawalan apabila terdapat ralat.

Dalam FormField, mesej `-type-error` mengikuti pengesahan sisi-klien: ia kekal tersembunyi sehingga kawalan medan `:user-invalid` (natif, selepas pengguna berinteraksi) — atau anda paksakannya dengan `-invalid` pada `.instui-form-field` (untuk ralat sisi-pelayan). `.instui-form-field-messages` berdiri sendiri (bukan dalam medan) tidak terjejas. Cincin fokus kawalan mengikuti: bahaya apabila `:user-invalid`/`-invalid`, kejayaan pada `-success`.

**Kawalan teks** — `.instui-text-input` (natif `<input>`), `.instui-text-area` (natif `<textarea>`, boleh diubah saiz), dan `.instui-simple-select` (natif `<select>` dengan karet) berkongsi rupa dan keadaan yang sama: `-invalid` (sempadan ralat), `-success` (sempadan kejayaan), `-readonly`, `:disabled` natif, dan `-size-{sm,md,lg}`. Untuk ikon hadapan/belakang (InstUI `renderBeforeInput`/`renderAfterInput`), bungkus input dalam `.instui-input-group` dan tambah slot `.before`/`.after` (glif `-icon-*`); `-should-not-wrap` mengekalkannya dalam satu baris. `.instui-number-input` ialah fasad itu ditambah lajur spinner +/- `.arrows` (natif `type="number"`; pautkan butang kepada `stepUp()`/`stepDown()`). `.instui-range-input` ialah `input[type="range"]` bergaya yang nilainya dirender dalam `.instui-range-input-value` gelembung songsang. Untuk combobox kaya dengan popover listbox, gunakan `@instructure/ui` — perpustakaan ini merangkumi kawalan natif.

**Pilihan dropdown bergaya (eksperimen)** — `select.css` pilihan menaik taraf elemen `.instui-simple-select` yang _sama_: ia menggayakan dropdown terbuka (panel dan setiap pilihan, dengan keadaan hover dan dipilih) menggunakan model Select Boleh-Diubahsuai CSS.

> [!WARNING]
> `select.css` bergantung pada `appearance: base-select` / `::picker(select)`, yang **eksperimen** (Chrome 135+, belum Baseline). Ia dihantar sebagai helaian berasingan pilihan dan setiap peraturan digatekan di belakang `@supports (appearance: base-select)`, jadi ia tidak melakukan apa-apa dalam penyemak imbas yang tidak menyokong — kawalan `.instui-simple-select` hanya kekal sebagai select natif biasa. Muatkannya hanya jika anda mahukan dropdown dipertingkat dan menerima sokongan terhad.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
