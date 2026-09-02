# CDN & pengedaran

pantoken menerbitkan setiap pakej ke npm, jadi anda boleh menarik token, komponen, dan komponen web terus
dari CDN — tiada langkah bina, tiada pembundler. Halaman ini menerangkan URL gabungan CSS (dengan pembina
interaktif), serta drop-in komponen web.

## Asas token

Setiap komponen pantoken membaca `--instui-*` sifat tersuai dari helaian token pada halaman. Dua
varian dihantar:

- `@pantoken/css/dist/style.lean.css` — asas CDN yang disyorkan. Ia mengandungi hampir semua token kecuali
  set ikon penuh, jadi saiznya kira-kira 23 KB gzipped.
- `@pantoken/css/dist/style.css` — helaian penuh, termasuk semua ~1,777 token glif ikon
  (`--instui-icon-*`). Kira-kira 140 KB gzipped. Muatkan ini jika anda merujuk ikon secara meluas melalui
  `var(--instui-icon-*)`.

Skala elevasi dan pembolehubah cincin fokus berada dalam kedua-dua helaian, jadi bayang dan cincin fokus berfungsi dengan
hanya asas dimuatkan.

## Pilih komponen dan ikon anda

[CDN picker interaktif](/guide/cdn-picker) membina URL gabungan jsDelivr untuk CSS dan petikan untuk pakej JavaScript. Buka, tandakan apa yang anda perlukan, dan salin output yang dijana.

- **Tab Komponen** — pilih helaian gaya komponen individu atau seluruh tonggak `components.css`. Tambah reset asas atau utiliti spacing/warna jika perlu.
- **Tab JS** — salin petikan import ESM untuk `@pantoken/interactions`.
- **Tab Ikon** — pilih ikon individu dari set InstUI (~1,800 ikon) atau dari Simple Icons (~3,300 glif jenama). Picker menghasilkan URL gabungan berasingan untuk fail CSS ikon supaya anda hanya memuatkan ikon yang sebenar anda gunakan.
- **Tab Komponen Web** — bina petikan `@pantoken/web-components` (pendaftaran selektif ESM atau bootstrap skrip klasik).

Setiap fail komponen kecil — kebanyakan sekitar 2 KB. Komponen yang merender ikon (`alert`, `checkbox`,
dan beberapa lain) memerlukan glif tersebut, jadi pembina menambah `@pantoken/components/dist/component-icons.css` (kira-kira
0.5 KB gzipped — 11 ikon yang digunakan set komponen) apabila anda memilih helaian ringan. Helaian penuh
telah mengandungi mereka.

### Susunan pemuatan dan fon

Muatkan asas token terlebih dahulu, kemudian reset asas pilihan, kemudian fail komponen, dan utiliti
akhir — mereka adalah utiliti pengganti, jadi mereka hanya benar-benar menimpa peraturan komponen apabila mereka tiba
selepasnya dalam kaskad. URL gabungan di atas sudah menyusunnya untuk anda. Fon adalah satu pengecualian:
`@pantoken/components/dist/fonts.css` menunjuk pada fail fon dengan laluan relatif, jadi gabungan tidak boleh menulis semula
mereka — muatkan ia sebagai `<link>` sendiri:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Semua sekaligus

Tandakan **All components** dalam picker untuk menukarnya ke tonggak, atau tunjukkannya sendiri (kira-kira 141 KB
gzipped) bersama helaian token:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Komponen web

`@pantoken/web-components` mendaftarkan `<instui-*>` elemen tersuai yang bebas rangka kerja. Mereka menyisipkan
CSS mereka sendiri, tetapi masih membaca token dari helaian pada halaman, jadi muatkan juga asas token.

### Modul ES (disyorkan)

CDN ESM menyelesaikan kebergantungan pakej untuk anda. Ini mendaftarkan setiap elemen:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Gunakan helaian token penuh (atau helaian ringan ditambah `component-icons.css`) supaya elemen yang merender ikon seperti
`<instui-alert>` boleh menyelesaikan glif mereka.

Untuk mendaftarkan hanya beberapa elemen — dan kebergantungan bersarang mereka — import `register` dan berikan `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Tag skrip klasik

Untuk drop-in tanpa modul, muatkan binaan IIFE. Ia membundel kebergantungan dan mendaftar setiap
elemen secara automatik semasa dimuat, mendedahkan global `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Ia lebih besar daripada laluan ESM — ia menyisipkan `@pantoken/components` dan `@pantoken/icons` — jadi gunakannya
hanya apabila anda tidak boleh menggunakan modul.

## Memaku versi

URL di atas — dan yang ditulis oleh picker — mengesan pelepasan terkini. Paku versi utama (atau tepat)
untuk produksi — contohnya `@pantoken/css@0` — supaya naik taraf tidak mengejutkan anda.
