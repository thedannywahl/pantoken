# CDN & distribusi

pantoken menerbitkan setiap paket ke npm, sehingga Anda dapat mengambil tokens, components, dan web components langsung dari CDN — tanpa langkah build, tanpa bundler. Halaman ini membahas URL gabungan CSS (dengan pembangun interaktif), plus drop-in web-component.

## Fondasi token

Setiap komponen pantoken membaca `--instui-*` custom properties dari sebuah token sheet di halaman. Dua varian dikirimkan:

- `@pantoken/css/dist/style.lean.css` — fondasi CDN yang direkomendasikan. Ini memuat semua token kecuali
  set ikon penuh, jadi ukurannya sekitar 23 KB gzipped.
- `@pantoken/css/dist/style.css` — sheet penuh, termasuk semua ~1.777 token glyf ikon
  (`--instui-icon-*`). Sekitar 140 KB gzipped. Muat ini jika Anda merujuk ikon secara luas melalui
  `var(--instui-icon-*)`.

Skala elevasi dan variabel focus-ring ada di kedua sheet, jadi bayangan dan cincin fokus bekerja dengan
hanya memuat fondasi.

## Pilih komponen dan ikon Anda

[interactive CDN picker](/guide/cdn-picker) membuat URL combine jsDelivr untuk CSS dan snippet untuk paket JavaScript. Buka, centang apa yang Anda perlukan, dan salin output yang dihasilkan.

- **Tab Components** — pilih stylesheet komponen individual atau seluruh barrel `components.css`. Tambahkan base reset atau utilities spacing/color jika Anda membutuhkannya.
- **Tab JS** — salin snippet import ESM untuk `@pantoken/interactions`.
- **Tab Icons** — pilih ikon individual dari set InstUI (~1.800 ikon) atau dari Simple Icons (~3.300 glyf brand). Picker mengeluarkan URL combine terpisah untuk file CSS ikon sehingga Anda hanya memuat ikon yang sebenarnya Anda gunakan.
- **Tab Web Components** — buat snippet `@pantoken/web-components` (ESM selective register atau classic script bootstrap).

Setiap file komponen kecil — kebanyakan sekitar 2 KB. Komponen yang merender ikon (`alert`, `checkbox`,
dan beberapa lainnya) membutuhkan glyf tersebut, jadi pembangun menambahkan `@pantoken/components/dist/component-icons.css` (sekitar
0.5 KB gzipped — 11 ikon yang digunakan set komponen) kapan pun Anda memilih lean sheet. Sheet penuh
sudah memuatnya.

### Urutan pemuatan dan font

Muat fondasi token terlebih dahulu, lalu base reset opsional, lalu file komponen, dan utilities terakhir — mereka adalah utilities override, jadi mereka hanya benar-benar menimpa aturan komponen ketika mereka datang setelahnya dalam cascade. URL combine di atas sudah mengurutkannya untuk Anda. Font adalah satu pengecualian:
`@pantoken/components/dist/fonts.css` menunjuk ke file font dengan path relatif, jadi combine tidak bisa menulis ulang
mereka — muat sebagai `<link>` sendiri:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Semua sekaligus

Centang **All components** di picker untuk menggantinya ke barrel, atau arahkan langsung ke situ (sekitar 141 KB
gzipped) bersama sheet token:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` mendaftarkan framework-agnostic `<instui-*>` custom elements. Mereka menyisipkan
CSS mereka sendiri, tetapi masih membaca token dari sheet di halaman, jadi muat juga fondasi token.

### ES modules (direkomendasikan)

Sebuah CDN ESM menyelesaikan dependensi paket untuk Anda. Ini mendaftarkan setiap elemen:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Gunakan sheet token penuh (atau lean sheet ditambah `component-icons.css`) supaya elemen perender-ikon seperti
`<instui-alert>` dapat menemukan glyf mereka.

Untuk mendaftarkan hanya beberapa elemen — dan dependensi bersarangnya — import `register` dan lewati `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Tag script klasik

Untuk drop-in tanpa modul, muat build IIFE. Ia membundel dependensinya dan otomatis mendaftarkan setiap
elemen saat dimuat, mengekspos global `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Ukuran lebih besar daripada jalur ESM — ia menyisipkan `@pantoken/components` dan `@pantoken/icons` — jadi gunakan hanya ketika Anda tidak bisa memakai modules.

## Mengunci versi (pinning)

URL di atas — dan yang ditulis picker — mengikuti rilis terbaru. Pin major (atau versi tepat) untuk produksi — misalnya `@pantoken/css@0` — sehingga upgrade tidak mengejutkan Anda.
