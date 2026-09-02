# Komponen

`@pantoken/components` menghantar gaya komponen berasaskan kelas yang dibina daripada token Instructure. Import helaian gaya dan tandakan markup anda — tiada rangka kerja diperlukan.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Suka elemen tersuai? `@pantoken/web-components` membungkus gaya yang sama ini sebagai `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, dan banyak lagi — lihat
> [peta pakej](/guide/packages).

## Konvensyen

Konvensyen CSS dalam pakej ini berdasar pada versi diubah suai [RSCSS](https://ricostacruz.com/rscss/index.html).

Pengubah (modifier) adalah **kunci-nilai** — `-<prop>-<val>`, selari dengan nama prop InstUI — jadi ia dibaca
dengan sendiri: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Prop boolean adalah nama prop sahaja, di mana kewujudan bermaksud `true` (`-has-shadow`, `-clickable`); boolean lalai-pada yang dimatikan
membalikkan (`-without-background`, `-without-border`). Saiz menerima ejaan pendek dan panjang
(`-size-sm` = `-size-small`). Di mana nama menyimpang dari InstUI, kelas bersemantik InstUI masih berfungsi
tetapi ditandakan usang (contoh `-variant-info` → gunakan `-color-info`).

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

Untuk prop `timeout` InstUI, tetapkan sifat tersuai tanpa unit `--timeout` dalam milisaat dan muatkan
interaksi Alert. Nilai positif menjadualkan penutupan; `0` (lalai) membiarkan amaran di
tempat. Tambah kelas `instui-transition -fade-entered` utiliti `transition` untuk fade InstUI; tinggalkan
mereka untuk pengalih keluaran segera. Interaksi mengawal keadaan `-fade-exiting` dan memancarkan acara
batal-boleh (cancelable), menggelembung `dismiss` sebelum penghapusan, jadi aplikasi boleh memanggil `preventDefault()` untuk mengekalkan
amaran dipasang.

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

Bar kemajuan menerima skala sewenang-wenangnya melalui `--min` (`0` secara lalai), `--value`, dan `--max`
(`100` secara lalai), dengan alias usang `--value-now` dan `--value-max`. Tambah `-should-animate`
untuk menggunakan peralihan setengah saat InstUI setiap kali nilai berubah. `.value` berdampingan dengan `.bar` sebagai
anak kepada root; tambah `-render-value-inside` untuk merendernya di atas trek, diselaraskan ke permulaan,
sebagai ganti (gayakan untuk keterbacaan terhadap warna meter). Gunakan `<progress>` asli untuk julat berasaskan sifar dan `<meter>` apabila minimum bukan sifar; web components memilih di antara mereka
secara automatik daripada atribut `min`. InstUI tiada keadaan tak tentu (indeterminate), jadi `<progress>`
yang hilang atribut `value` adalah anggaran terbaik pantoken sahaja: `progress-bar` menganimasikan `.bar` sebagai
segmen gelongsor dan `progress-circle` memusingkan cincangnya pada busur tetap, kedua-duanya menyembunyikan `.value`.

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

Bulatan kemajuan menerima skala sewenang-wenangnya yang sama melalui `--min`, `--value`, dan `--max`.
`--value-now` dan `--value-max` kekal sebagai alias fungsional usang. Tambah `-should-animate` dan
muatkan bundle interaksi fokus untuk menyerupai animasi mount InstUI; `--animation-delay` adalah
tangguh tanpa unit dalam milisaat. Ejaan usang `-should-animate-on-mount` dan
`-shold-animate-on-mount` kekal sebagai alias fungsional.

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

Setiap kelas diberi namespace `instui-` secara lalai. Bina helaian gaya dengan prefix anda sendiri — atau tiada — dengan
menyampaikan `prefix` kepada mana-mana pembina. Mana-mana nilai palsu (`null`, `undefined`, `""`, atau mengabaikannya) membuang
prefix sepenuhnya, jadi anda boleh menulis `class="heading -level-h1"` bukannya `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Modifier berawalan sengkang (`.-color-secondary`, `.-level-h1`) tidak berubah sama ada. Helaian gaya yang dihantar oleh pakej mengekalkan prefix `instui`.

## Asas

`base.css` adalah reset opt-in yang menetapkan default dokumen global dari token: `box-sizing`, satu
reset `body`, permukaan halaman, warna dan fon teks asas, `color-scheme` (supaya token `light-dark()` dan kawalan asli mengikuti tema), dan pautan asas. Muatkannya sekali, sebelum helaian komponen dan prosa,
apabila pantoken menguasai halaman.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Langkau ia apabila anda menyematkan komponen ke hos yang sudah membuat tema `html` dan `body` sendiri —
reset mengecat permukaan halaman, jadi anda tidak mahu ia bertindan dengan hos. Semua yang ditetapkannya menggunakan
pemilih `:where()` ber-spesifiti rendah, jadi peraturan anda sendiri sentiasa menang.

`base.css` _menerapkan_ fon jenama (`font-family: var(--instui-font-family-base)`, dengan fallback sistem); untuk _memuatkannya_, import `fonts.css` opt-in — `@font-face` peraturan untuk Atkinson Hyperlegible
Next, menunjuk ke woff2 yang dihantar dalam pakej. Ia dipisahkan kerana muka fon adalah ~350 kB dan
menjalankan hosting sendiri untuk fon adalah pilihan yang disengajakan.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Kandungan pembaca skrin

<p>Ada mesej tersembunyi selepas ayat ini.<span class="instui-screen-reader-content">Hanya pembaca skrin yang akan mengumumkannya.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` menyembunyikan elemen secara visual sambil mengekalkannya dalam pokok kebolehaksesan
— untuk label dan teks status yang harus dibaca oleh teknologi bantuan tetapi reka bentuk tidak perlu paparkan.

## Utiliti

`utilities.css` adalah lapisan opt-in kelas lintas-gugus: primitif `View`, jarak pada skala token,
dan ganti warna semantik. Berbeza dengan kelas komponen `-modifier`, ini menggunakan **dua sengkang**
(`--mod`) supaya ia tidak pernah bertembung dengan nama modifier komponen, dan ia terpakai kepada mana-mana
elemen — tunggal, atau digabungkan pada komponen.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Permukaan accent-blue dengan teks on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Diselaraskan tengah dengan mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` adalah `View` InstUI. Ia adalah asas yang anda lapiskan dengan jarak dan warna, dan ia
membawa modifier kunci-nilai untuk prop visualnya sendiri supaya anda tidak perlu bergantung pada utiliti:
`-background-*` (permukaannya), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, dan `-cursor-*` — ini adalah modifier sengkang-tunggal milik `view`,
tidak berkaitan dengan utiliti dua-sengkang di bawah. Prop nilai bebas
(lebar/tinggi/inset) kekal sebagai gaya sebaris; `margin`/`padding` menggunakan utiliti jarak.

**Spacing** — kelas setiap sisi pada skala jarak. Baca mereka sebagai `{m|p}{side}-{step}`: `m` untuk
margin atau `p` untuk padding (atau perkataan penuh `margin`/`padding`), satu sisi logik pilihan, kemudian langkah. Jadi `.--m-lg` dan `.--margin-lg` sama, serta `.--pt-md` dan `.--paddingt-md`.

- Sisi: none (semua), `t`/`b` (permulaan/akhir blok), `s`/`e` (permulaan/akhir dalam-garis), `x`/`y` (paksi dalam/blok). Sisi logik kekal betul dalam susunan kanan-ke-kiri.
- Langkah: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, serta `auto` untuk margin sahaja.

Gabungkan mereka untuk singkatan `margin="small auto large"` InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — ganti semantik yang tetap pada palet: `.--bg-<name>` (latar),
`.--text-<name>` (warna teks), dan `.--border-<name>` (warna sempadan). Setiap `<name>` adalah
token warna semantik — niat (intents) (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) ditambah palet `accent-*` (`accent-blue`, `accent-green`, dan seterusnya). Nama hanya ada jika token wujud dalam keluarga itu, jadi `text-brand` bukan kelas — teks tiada token jenama. Tiada cara untuk mencapai primitif atau hex sewenang-wenangnya, dan setiap ganti mengikuti tema.

**Keluarga token** — setiap keluarga "satu token, satu properti" mendapat satu kelas per token, dinamakan mengikut token. Gabungkan mereka dengan bebas:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (dan `-depth1`…`-card`) → `box-shadow`

Setiap satu hanya menetapkan satu propertinya, jadi `border-width`/`border-radius` memerlukan warna `border-*` dan gaya sempadan untuk benar-benar menggambar sempadan. Ini menggunakan nama token penuh (`.--border-radius-md`), manakala pembantu warna dan jarak di atas menggunakan alias pendek (`.--bg-brand`, `.--mt-lg`) — alias adalah pintasan ergonomik; kelas token adalah literal dan lengkap.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) dan `.--text-align-<value>` (`start`, `center`, `end`, `justify`) merangkumi prop lintas-gugus `display` dan `textAlign` InstUI (View, Button, Metric, Tabs, …) sebagai kelas boleh gabung —
jadi itu bukan modifier setiap-komponen.

Setiap kelas dua-sengkang memenangi cascadenya secara deterministik berbanding modifier komponen satu-sengkang yang bernama sama, tanpa mengira susunan import helaian gaya — lihat [Konvensyen authoring](/conventions/authoring)
untuk mekanisme.

Semua di sini adalah CSS tulen yang digerakkan oleh token `--instui-*`, jadi ia menjejaki InstUI melalui lapisan token. Lihat [rujukan API](/api/) untuk `componentsCss` dan pembina per-komponen.

## Overlay: dialog dan popover

Komponen overlay menggunakan primitif platform asli, jadi mereka berperilaku boleh diakses dengan sedikit atau tanpa
JavaScript.

**Modal** — letakkan `.instui-modal` pada `<dialog>` asli. Ia mendapat penjebakan fokus, penutupan dengan `Esc`, dan
`::backdrop` secara percuma; backdrop diredupkan dengan token `--instui-component-mask-background-color`
yang sama seperti `.instui-mask` (tambah `-blur` untuk membekukannya). Buka dan tutup dengan perintah invoker — tiada skrip:

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

**Context view / popover** — letakkan `.instui-context-view` pada elemen `[popover]` dan togalkannya dengan
`popovertarget`. Ia berada di lapisan paling atas dan menutup secara ringan pada klik luar atau `Esc`, sekali lagi tiada skrip:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Susun atur laci (Drawer layout)** — letakkan `.instui-drawer-layout` pada root susun atur dengan anak `.tray` dan `.content`.
Tambah atribut `open` (atau `-open`) untuk mendedahkan dulang, dan gunakan `placement="end"`
(atau `-placement-end`) untuk dokkannya ke sisi akhir-inline — penempatan diselesaikan melalui sifat logik
`inset-inline-*`/`flex-direction`, jadi ia beralih secara automatik di bawah `dir="rtl"` tanpa
peraturan tambahan. Bundle interaksi fokus menambah penghalaan perintah Invoker dan menogol mod overlay
(`should-overlay-tray`) apabila lebar melintasi `--drawer-layout-min-width` (lalai
`--instui-breakpoints-sm`, kemudian `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` kekal untuk overlay dalam aliran (spinner di atas kad); `::backdrop`
modal menampung kes modal.

Kedua-dua corak juga dibungkus sebagai elemen tersuai berkelakuan dalam `@pantoken/web-components`:
`<instui-modal open>` (sebuah `<dialog>` didorong oleh atribut `open`) dan `<instui-context-view>` (sebuah
popover asli).

Sokongan pelayar: API popover dan `popovertarget` adalah Baseline 2024; perintah invoker
(`command`/`commandfor`) adalah Baseline 2025, jadi pada pelayar lama pautkan butang kepada `dialog.showModal()`
sebagai fallback satu baris. Menempatkan popover bersebelahan pencetusnya menggunakan penempatan anchor CSS di mana
disokong (Chromium); selain itu ia terpusatkan dalam lapisan atas.

## Borang

**FormField** — `.instui-form-field` adalah pembungkus CSS-Grid yang menyusun label, kawalan, dan sebarang
mesej. Letakkannya pada `<label>` supaya label berkaitan dengan kawalannya secara asli. Ia mempunyai tiga kawasan grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (lalai) menimbun kawasan; `-layout-inline` meletakkan label sebelah kawalan (sesuaikan
dengan `-label-align-{start,end}` dan `-v-align-{top,middle,bottom}`). `-readonly` menukar warna label.

Asterisk **diperlukan** muncul apabila medan diperlukan oleh _sama ada_ kelas `-required` _atau_ kawalan
`required` asli di dalamnya — jadi anda boleh sahaja menetapkan `required` pada input dan tanda akan muncul.
Ia bersifat hiasan (sebuah `::after` pada label, dikeluarkan dari pokok kebolehcapaian); padankan dengan nota seperti
"medan bertanda \* adalah wajib" melainkan borang itu mudah difahami.

**FormFieldGroup** — `.instui-form-field-group` mengumpulkan medan berkaitan dalam `<fieldset>` dengan
deskripsi `<legend>`. Ia adalah susun atur tulen (tiada token khusus): lalai menimbun medan;
`-layout-columns` / `-layout-inline` mengalirkannya ke lajur responsif, dengan `-row-spacing-*` /
`-col-spacing-*` dan `-v-align-*` untuk menala grid.

**RadioInputGroup** — `.instui-radio-input-group` adalah pengelompokan `<fieldset>`/`<legend>` yang sama,
dikhususkan untuk radio. Kerana radio anak berkongsi `name`, pemilihan adalah secara asli pilihan tunggal —
jadi set butang togol berkelakuan sebagai satu kawalan, bukan butang longgar. `-variant-simple` (lalai) menyusun
radio standard (`-layout-columns`/`-inline` mengalirkannya menjadi baris); `-variant-toggle` menghubungkan
butang `.instui-radio.-variant-toggle` anak menjadi kawalan bersegmen tunggal (sempadan mampat,
ujung luar dibundarkan):

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

**Mesej** — `.instui-form-field-messages` adalah bekas; setiap `.instui-form-field-message` mengambil
`-type-*`: `-type-hint` (kelabu, lalai), `-type-error` (teks merah + glif amaran bulatan), `-type-success`
(teks hijau + glif semak bulatan), dan `-type-screenreader-only` (terpotong secara visual, masih diumumkan).
Glif dicat dalam `currentColor`, jadi mereka sentiasa padan dengan warna mesej. `-type-new-error` adalah
alias usang `-type-error`. Sambungkan bekas ke kawalan dengan `aria-describedby`, dan tetapkan
`aria-invalid` pada kawalan apabila terdapat ralat.

Di dalam FormField, mesej `-type-error` mengikuti pengesahan sisi-klien: ia kekal tersembunyi sehingga
kawalan medan menjadi `:user-invalid` (asal, selepas pengguna berinteraksi) — atau anda memaksanya dengan `-invalid`
pada `.instui-form-field` (untuk ralat sisi-pelayan). `.instui-form-field-messages` berdiri sendiri (bukan dalam
medan) tidak terjejas. Cincin fokus kawalan mengikuti: bahaya apabila `:user-invalid`/`-invalid`,
kejayaan pada `-success`.

**Kawalan teks** — `.instui-text-input` ( `<input>` asli), `.instui-text-area` ( `<textarea>` asli,
boleh ubah saiz), dan `.instui-simple-select` ( `<select>` asli dengan kursor) berkongsi rupa yang sama dan keadaan yang sama: `-invalid` (sempadan ralat), `-success` (sempadan kejayaan), `-readonly`, `:disabled` asli, dan
`-size-{sm,md,lg}`. Untuk ikon hadapan/belakang (InstUI `renderBeforeInput`/`renderAfterInput`), bungkus
input dalam `.instui-input-group` dan tambah slot `.before`/`.after` (glif `-icon-*`); `-should-not-wrap`
mengekalkannya dalam satu baris. `.instui-number-input` adalah facade itu ditambah lajur spinner +/- `.arrows` ( `type="number"` asli; pautkan butang ke `stepUp()`/`stepDown()`). `.instui-range-input` adalah `input[type="range"]` berstail yang nilainya dirender dalam `.instui-range-input-value` gelembung songsang. Untuk combobox kaya dengan popover listbox, pilih `@instructure/ui` — perpustakaan ini merangkumi kawalan asli.

**Pilihan dropdown bergaya (eksperimental)** — `select.css` opt-in menaik taraf elemen `.instui-simple-select` yang _sama_: ia menggayakan dropdown terbuka (panel dan setiap pilihan, dengan hover dan
keadaan dipilih) menggunakan model Select Boleh-Tersuai CSS.

> [!WARNING]
> `select.css` bergantung pada `appearance: base-select` / `::picker(select)`, yang **eksperimen**
> (Chrome 135+, belum Baseline). Ia dihantar sebagai helaian opt-in berasingan dan setiap peraturan dibatasi
> di belakang `@supports (appearance: base-select)`, jadi ia tidak melakukan apa-apa pada pelayar yang tidak disokong — kawalan
> `.instui-simple-select` kekal sebagai select asli biasa. Muatkan hanya jika anda mahu dropdown
> dipertingkat dan menerima sokongan terhad.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
