# Plugin

Plugin pantoken memperluas keluaran token atau CSS tanpa melakukan fork paket. Bangun satu dengan
`definePlugin` dari `@pantoken/plugin-kit`, lalu berikan ke `buildTokens` atau `toCss`.

## Menulis plugin

Berikan `definePlugin` hook yang diimplementasikan. Itu mengembalikan plugin biasa, diberi merek dengan
kapabilitas yang disimpulkan dari hook tersebut. Sebuah plugin dapat memperluas IR (`tokens`, `icons`), keluaran CSS
(`css`), atau keduanya.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registrasi yang sadar kapabilitas

`buildTokens` dan `toCss` menjalankan `checkPlugins` pada plugin yang Anda berikan. Ia memperingatkan — tidak pernah melempar —
saat sebuah plugin tidak memiliki hook yang cocok untuk tahap tempat ia didaftarkan, sehingga plugin yang hanya token dan diberikan
ke `toCss` dilewati dengan catatan daripada diam-diam tidak melakukan apa-apa.

## Menyusun plugin

Bangun di atas plugin lain dengan `extendPlugin`, atau gabungkan rekan dengan `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook pada tahap yang sama bisa disusun: `tokens` menjalankan basis lalu tambahan, `css` menggabungkan dua
kontribusi, dan `icons` menjalankan keduanya.

## Validasi keluaran plugin Anda

Jalankan pemeriksaan drift bersama dari `@pantoken/utils` pada keluaran plugin Anda sendiri dalam test-nya, sehingga
typo atau token yang diubah namanya gagal cepat dan lokal:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Plugin bawaan

- `@pantoken/plugin-simple-icons` — merek ikon dari simple-icons, didaftarkan sebagai token ikon.
- `@pantoken/plugin-lucide-lab` — ikon Lucide Lab, didaftarkan sebagai token gambar `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo produk Instructure sebagai SVG, data URI, dan token gambar `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — plugin PostCSS (bukan plugin pantoken) yang menghapus
  custom property yang tidak terpakai dari stylesheet.
- `@pantoken/plugin-custom-theme-colors` — merubah merek halaman dengan mengatur satu atribut
  (`data-pantoken-color`) ke salah satu dari 13 palet, atau ke `custom` untuk hex merek apa pun. Lihat
  [Warna tema](#tema-warna).
- `@pantoken/plugin-custom-components` — kontrol khusus yang didukung token termasuk SegmentedControl
  dan SkeletonLoader.

### Segmented control

Gunakan segmented control untuk dua sampai lima tampilan atau filter terkait. Setiap opsi adalah radio native berlabel dalam satu grup bernama; tandai satu sebagai checked awalnya. Gunakan tab atau dropdown jika opsi tidak muat dengan nyaman, dan gunakan grup tombol untuk aksi bukan pilihan. Gaya `-size-md` adalah
default, dengan `-size-sm` dan `-size-lg` untuk konteks yang lebih rapat dan lebih menonjol.

Impor `@pantoken/plugin-custom-components/segmented-control.css` untuk control dan tombol overflow-nya. Gunakan kelas `-icon-*` pada label segmen ketika segmen memerlukan glyph; helper interaksi juga mempromosikan kelas `-icon-*` dari input native ke pelukis label.
Berikan fieldset `aria-label` yang deskriptif atau legend yang terlihat. Helper mempertahankan pengumuman radio native, menambah navigasi keyboard, dan secara opsional memperlihatkan satu segmen terpotong per tekan panah. Gunakan kontrol awal/akhir logis dan label tombol yang dapat diakses di kedua arah:

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

Impor `@pantoken/interactions/segmented-control.iife.js` untuk registrasi saat DOM siap, atau panggil
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` dari `@pantoken/interactions`
dan panggil `cleanup()` saat menghapusnya. CSS dan pilihan radio native bekerja tanpa JS; panah overflow membutuhkan perilaku. Item terpilih menggunakan shadow desain dua-lapisan dari warna drop-shadow semantik; itu adalah shadow item-aktif yang berbeda daripada composite `--instui-elevation-*` yang ada. Tombol overflow menggunakan token komponen elevation3 upstream
melalui `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

Subpath `skeleton-loader.css` memberi gaya satu bentuk dekoratif Text, Avatar, atau Image. Text menerima
`-size-xxs` melalui `-size-xxl`; Avatar dan Image berukuran sedang. Setiap `.skeleton-row` opsional
menambahkan satu baris teks tanpa mengubah ukuran. CSS shimmer berhenti setelah tiga sapuan 1.5 detik dan
tetap statis ketika pengguna memilih preferensi pengurangan gerak. Itu bekerja sebelum JavaScript dimuat.

Tempatkan bentuk hanya di tempat konten bergantung query akan muncul, bukan di atas navigasi,
filter, heading, atau kontrol yang diketahui server. Skeleton bukan meter progres atau status sibuk aksi. Biarkan
konten yang ada terlihat selama refresh latar; gunakan spinner atau state sibuk tombol untuk aksi.

Aplikasi induk memiliki markup loading, loaded, empty, dan error. Sediakan satu area status kosong
per halaman dan alert kosong terpisah di HTML server, keduanya **di LUAR** region konten sibuk:

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

Panggil perilaku level-induk saat status permintaan berubah. Ia memperbarui `aria-busy` dan dua
pengumuman yang sudah ada, tetapi tidak pernah mengganti konten atau memindahkan fokus:

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

Jika menggunakan bundel interaksi per-komponen alih-alih impor langsung, dispatch sebuah
event `pantoken:skeleton-state` pada elemen `[data-skeleton-region]` dengan
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Tunda _menampilkan_
placeholder selama 200–500ms untuk permintaan cepat; perilaku secara independen menunda pengumuman loading
selama 400ms. Pada pemuatan halaman pasif, biarkan fokus tetap di tempatnya. Pindahkan fokus ke hasil yang baru dimuat hanya ketika aksi pengguna sendiri memintanya. Node status mengumumkan hasil dan status kosong; node alert mengumumkan kegagalan. Jangan gabungkan `aria-busy`, `role="status"`, dan
`role="alert"` pada satu elemen.

Registry Lucide Lab dapat dimuat secara malas, lalu diberikan ke hook token sinkron:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Beberapa hal yang dulu plugin sekarang dikirim dalam `@pantoken/components`, karena begitu banyak komponen membutuhkannya secara bawaan: bayangan elevasi (`--instui-elevation-*`, di `components.css`), cincin focus-outline
(di `base.css` — setiap elemen yang dapat difokus mendapatkannya saat pantoken mengendalikan halaman), dan font merek Instructure (Atkinson Hyperlegible Next: `base.css` menerapkan `--instui-font-family-base`; opt-in
`@pantoken/components/fonts.css` memuat woff2 `@font-face`).

## Tema warna

`@pantoken/plugin-custom-theme-colors` menerbitkan satu blok `[data-pantoken-color="…"]` per palet
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Setiap blok mengarahkan primitive merek (`--instui-primitive-color-navy-*` dan `-blue-*`)
pada palet yang dipilih. Ia juga menurunkan kembali permukaan merek yang upstream telah meratakan menjadi hex literal,
menjaga alpha yang sudah dibakar melalui `color-mix()`. Warna status semantik, aksen biru eksplisit, dan
bayangan elevasi tetap dipertahankan. Coba di
[demo theming berbasis swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Warna merek kustom

Setel `data-pantoken-color="custom"` untuk merubah merek dari hex apa pun, seperti warna primer yang diketik admin Canvas
ke Editor Tema. pantoken menurunkan skala `--instui-primitive-color-custom-*` 10–200 lengkap darinya:

1. **Kurva referensi.** Target kecerahan setiap langkah adalah rata-rata kecerahan OKLCH dari 13
   palet pada langkah itu, dengan 0 dipatok pada putih dan 210 pada hitam. Jadi jarak skala kustom
   cocok dengan palet yang dikirim.
2. **Anchor.** Input mendarat pada langkah yang target kecerahannya paling dekat dengan miliknya sendiri, lalu menempel pada
   kecerahan itu persis. `#cccccc` menjadi `custom-40` pada `#c9c9c9`: dekat dengan input, tetapi tidak
   selalu identik. "Paling dekat" berarti langkah terdekat pada kurva, bukan warna palet yang sudah ada.
3. **Pengisian.** Setiap langkah lain mempertahankan hue input. Saturasinya mengikuti kurva saturasi rata-rata palet relatif terhadap anchor, dan dikurangi hanya ketika warna jatuh di luar sRGB.

Hanya `#rgb` dan `#rrggbb` yang diterima; apapun selain itu melempar `TypeError`, sehingga hex dari formulir
tidak dapat menyuntikkan CSS.

Pada waktu build, terbitkan seluruh aturan dengan primitive yang diturunkan sudah dideklarasikan:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Untuk memilih warna saat runtime tanpa mengirimkan set token, prahitungkan kurva dan aturan remap
pada waktu build. Kemudian gunakan entri `/scale` yang bebas dependensi di browser, dan atur hanya 20
primitive turunan:

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

Picker tema situs docs, editor tema Canvas, dan demo di atas semuanya bekerja dengan cara ini.

Lihat [Referensi API](/api/) untuk ekspor masing-masing plugin.
