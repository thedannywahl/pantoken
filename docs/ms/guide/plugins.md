# Pemalam

Pemalam pantoken meluaskan output token atau CSS tanpa membuat forky pakej. Bangunkan satu dengan
`definePlugin` daripada `@pantoken/plugin-kit`, kemudian serahkan ia kepada `buildTokens` atau `toCss`.

## Menulis pemalam

Berikan `definePlugin` hak kait (hooks) yang anda laksanakan. Ia mengembalikan pemalam biasa, berjenama dengan
keupayaan yang ditentukan dari hak kait tersebut. Pemalam boleh meluaskan IR (`tokens`, `icons`), output CSS
(`css`), atau kedua-duanya.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Pendaftaran sedar-keupayaan

`buildTokens` dan `toCss` menjalankan `checkPlugins` ke atas pemalam yang anda serahkan. Ia memberi amaran — ia tidak pernah melempar —
apabila pemalam tiada hak kait yang sepadan untuk tahap ia didaftarkan, jadi pemalam yang hanya token yang diserahkan
kepada `toCss` akan diabaikan dengan nota dan bukannya diam-diam tidak melakukan apa-apa.

## Menggabungkan pemalam

Bina di atas pemalam lain dengan `extendPlugin`, atau gabungkan rakan sebaya dengan `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hak kait pada tahap yang sama bergabung: `tokens` menjalankan asas kemudian tambahan, `css` menggabungkan kedua-dua
sumbangan, dan `icons` menjalankan kedua-duanya.

## Sahkan output pemalam anda

Jalankan pemeriksaan drift kongsi dari `@pantoken/utils` ke atas output pemalam anda sendiri dalam ujian, supaya
kesalahan taip atau token yang ditukar nama gagal dengan cepat dan secara tempatan:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Pemalam terbundel

- `@pantoken/plugin-simple-icons` — menjenamakan ikon daripada simple-icons, didaftarkan sebagai token ikon.
- `@pantoken/plugin-lucide-lab` — ikon Lucide Lab, didaftarkan sebagai token imej `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo produk Instructure sebagai SVG, data URI, dan token imej `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — pemalam PostCSS (bukan pemalam pantoken) yang membuang
  custom properties yang tidak digunakan dari helaian gaya.
- `@pantoken/plugin-custom-theme-colors` — menjenamakan semula halaman dengan menetapkan satu atribut
  (`data-pantoken-color`) kepada salah satu daripada 13 palet, atau kepada `custom` untuk sebarang hex jenama. Lihat
  [Warna tema](#theme-colors).
- `@pantoken/plugin-custom-components` — kawalan tersuai yang disokong token termasuk SegmentedControl
  dan SkeletonLoader.

### Kawalan bersegmen

Gunakan kawalan bersegmen untuk dua hingga lima pandangan atau penapis berkaitan. Setiap pilihan adalah radio asli berlabel dalam satu kumpulan bernama; tandakan satu yang dipilih awalnya. Gunakan tab atau dropdown jika pilihan tidak muat dengan selesa, dan gunakan kumpulan butang untuk tindakan bukan pilihan. Gaya `-size-md` adalah lalai, dengan `-size-sm` dan `-size-lg` untuk konteks yang lebih rapat dan lebih menonjol.

Import `@pantoken/plugin-custom-components/segmented-control.css` untuk kawalan dan butang limpahan
nya. Gunakan kelas `-icon-*` pada label segmen apabila segmen memerlukan glif; pembantu interaksi
juga mempromosikan kelas `-icon-*` dari input asli ke pelukis label.
Berikan fieldset `aria-label` yang deskriptif atau legenda yang dapat dilihat. Pembantu mengekalkan pengumuman radio asli, menambah navigasi papan kekunci, dan pilihan untuk mendedahkan satu segmen yang dipotong setiap tekan anak panah. Gunakan kawalan mula/akhir logik dan label butang boleh diakses kedua-dua arah:

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

Import `@pantoken/interactions/segmented-control.iife.js` untuk pendaftaran apabila DOM sedia, atau panggil
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` dari `@pantoken/interactions`
dan panggil `cleanup()` apabila mengeluarkannya. CSS dan pilihan radio asli berfungsi tanpa JS; anak panah limpahan memerlukan tingkah laku itu. Item yang dipilih menggunakan bayang reka bentuk dua-lapis dari warna drop-shadow semantik; ia adalah bayang item-aktif yang berbeza dan bukannya komposit `--instui-elevation-*` sedia ada. Butang limpahan menggunakan token komponen elevation3 hulu melalui `--pantoken-segmented-overflow-shadow`.

### Pemuat rangka (skeleton loading)

Subpath `skeleton-loader.css` menggayakan satu bentuk hiasan Teks, Avatar, atau Imej. Teks menerima `-size-xxs` melalui `-size-xxl`; Avatar dan Imej adalah saiz sederhana. Setiap `.skeleton-row` pilihan menambah satu baris teks tanpa mengubah saiz. Shimmer CSS berhenti selepas tiga sapuan 1.5 saat dan kekal statik apabila pengguna mengutamakan pergerakan dikurangkan. Ia berfungsi sebelum JavaScript dimuatkan.

Letakkan bentuk hanya di tempat kandungan bergantung pertanyaan akan muncul, bukan di atas navigasi, penapis, tajuk, atau kawalan yang diketahui pelayan. Skeleton bukan pengukur kemajuan atau keadaan sibuk tindakan. Kekalkan kandungan sedia ada kelihatan semasa penyegaran latar; gunakan spinner atau keadaan sibuk butang untuk tindakan.

Aplikasi induk memiliki markup loading, loaded, empty, dan error. Sediakan satu rantau status kosong per halaman dan amaran kosong berasingan dalam HTML pelayan, kedua-duanya **di LUAR** rantau kandungan sibuk:

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

Panggil tingkah laku peringkat induk apabila keadaan permintaan berubah. Ia mengemas kini `aria-busy` dan dua pengumuman pra-sedia, tetapi ia tidak pernah menggantikan kandungan atau memindahkan fokus:

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

Jika menggunakan bundel interaksi per-komponen bukannya import langsung, kirim satu acara `pantoken:skeleton-state` pada elemen `[data-skeleton-region]` dengan
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Tangguhkan _menunjukkan_
placeholder selama 200–500ms untuk permintaan pantas; tingkah laku itu secara bebas menangguhkan pengumuman loading sebanyak 400ms. Pada muatkan halaman pasif, biarkan fokus kekal di tempatnya. Hanya pindahkan fokus kepada hasil yang baru dimuat apabila tindakan pengguna sendiri memintanya. Node status mengumumkan hasil dan keadaan kosong; node amaran mengumumkan kegagalan. Jangan gabungkan `aria-busy`, `role="status"`, dan
`role="alert"` pada satu elemen.

Pendaftaran Lucide Lab boleh dimuat secara malas, kemudian diserahkan kepada hook token segerak:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Beberapa perkara yang dulu menjadi pemalam kini dihantar dalam `@pantoken/components`, kerana begitu banyak komponen memerlukannya secara siap keluar dari kotak: bayang elevasi (`--instui-elevation-*`, dalam `components.css`), cincin fokus-outline (dalam `base.css` — setiap elemen boleh-fokus mendapatkannya apabila pantoken menguasai halaman), dan fon jenama Instructure (Atkinson Hyperlegible Next: `base.css` menerapkan `--instui-font-family-base`; `@pantoken/components/fonts.css` opt-in memuatkan `@font-face` woff2s).

## Warna tema

`@pantoken/plugin-custom-theme-colors` mengeluarkan satu blok `[data-pantoken-color="…"]` bagi setiap palet
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Setiap blok mengarahkan primitif jenama (`--instui-primitive-color-navy-*` dan `-blue-*`)
kepada palet terpilih. Ia juga menurunkan semula permukaan jenama yang hulu datarkan kepada hex literal,
mengekalkan alpha yang telah dibakar melalui `color-mix()`. Warna status semantik, aksen biru eksplisit, dan
bayang elevasi kekal. Cuba dalam
[demo theming berasaskan swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Warna jenama tersuai

Tetapkan `data-pantoken-color="custom"` untuk menjenamakan semula dari sebarang hex, seperti warna utama yang pentadbir Canvas
taipkan ke dalam Editor Tema. pantoken menurunkan satu skala `--instui-primitive-color-custom-*` lengkap 10–200 daripadanya:

1. **Lengkung rujukan.** Sasaran kecerahan setiap langkah adalah purata kecerahan OKLCH bagi 13
   palet pada langkah itu, dengan 0 ditetapkan pada putih dan 210 pada hitam. Jadi jarak skala tersuai sepadan
   dengan palet yang dihantar.
2. **Sauh.** Input mendarat pada langkah yang sasaran kecerahannya paling hampir dengan sendiri, kemudian menjepit kepada
   kecerahan tepat itu. `#cccccc` menjadi `custom-40` pada `#c9c9c9`: hampir kepada input, tetapi tidak
   sentiasa sama. "Paling hampir" bermaksud langkah paling hampir pada lengkung, bukan warna palet sedia ada yang terdekat.
3. **Isian.** Setiap langkah lain mengekalkan warna hue input. Penyaturannya mengikuti lengkung purata penyaturation palet relatif kepada sauh, dan dikurangkan hanya apabila warna jatuh di luar sRGB.

Hanya `#rgb` dan `#rrggbb` yang diterima; apa-apa selain itu melempar `TypeError`, jadi hex dari borang
tidak boleh menyuntik CSS.

Semasa binaan, hasilkan keseluruhan peraturan dengan primitif terbitan yang telah diisytiharkan:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Untuk memilih warna pada waktu jalan tanpa menghantar set token, kira lengkung dan aturan pemeta semula semasa binaan. Kemudian gunakan entri `/scale` bebas-kebergantungan di pelayar, dan tetapkan hanya 20
primitif terbitan:

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

Pemilih tema laman dokumen, editor tema Canvas, dan demo di atas semuanya berfungsi dengan cara ini.

Lihat [rujukan API](/api/) untuk eksport setiap pemalam.
