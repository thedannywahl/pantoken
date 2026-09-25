# Plugin

Plugin pantoken memperluas keluaran token atau CSS tanpa membuat fork paket. Plugin dibuat dengan `definePlugin` dari `@pantoken/plugin-kit`, lalu diteruskan ke `buildTokens` atau `toCss`.

## Menulis plugin

Berikan `definePlugin` hook yang diimplementasikan. Ia mengembalikan plugin biasa, diberi merek dengan kapabilitas yang disimpulkan dari hook tersebut. Plugin dapat memperluas IR (`tokens`, `icons`), keluaran CSS (`css`), atau keduanya.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Pendaftaran peka-kapabilitas

`buildTokens` dan `toCss` menjalankan `checkPlugins` pada plugin yang diberikan. Ia memberi peringatan — tidak pernah melempar — ketika sebuah plugin tidak memiliki hook yang cocok untuk tahap tempat ia didaftarkan, sehingga plugin yang hanya token dan diteruskan ke `toCss` akan dilewati dengan catatan daripada diam-diam tidak melakukan apa-apa.

## Menggabungkan plugin

Bangun di atas plugin lain dengan `extendPlugin`, atau gabungkan rekan dengan `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook pada tahap yang sama dapat disusun: `tokens` menjalankan basis lalu tambahan, `css` menggabungkan kedua kontribusi, dan `icons` menjalankan keduanya.

## Validasi keluaran plugin

Jalankan pemeriksaan drift bersama dari `@pantoken/utils` pada keluaran plugin dalam test-nya, sehingga salah ketik atau token yang diganti nama gagal cepat dan lokal:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Plugin yang dibundel

- `@pantoken/plugin-simple-icons` — ikon brand dari simple-icons, didaftarkan sebagai token ikon.
- `@pantoken/plugin-lucide-lab` — ikon Lucide Lab, didaftarkan sebagai token gambar `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo produk Instructure sebagai SVG, data URI, dan token gambar `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — plugin PostCSS (bukan plugin pantoken) yang menghapus properti kustom yang tidak terpakai dari stylesheet.
- `@pantoken/plugin-custom-theme-colors` — merek ulang halaman dengan menetapkan satu atribut (`data-pantoken-color`) ke salah satu dari 13 palet, atau ke `custom` untuk hex merek apa pun. Lihat [Warna tema](#theme-colors).

Registry Lucide Lab dapat dimuat secara malas, lalu diteruskan ke hook token sinkron:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Beberapa hal yang sebelumnya berupa plugin kini dikirim dalam `@pantoken/components`, karena begitu banyak komponen membutuhkannya secara bawaan: bayangan elevasi (`--instui-elevation-*`, di `components.css`), cincin fokus-outline (di `base.css` — setiap elemen yang dapat difokuskan mendapatkannya ketika pantoken menguasai halaman), dan font merek Instructure (Atkinson Hyperlegible Next: `base.css` menerapkan `--instui-font-family-base`; `@pantoken/components/fonts.css` opsional memuat woff2 `@font-face`).

## Warna tema

`@pantoken/plugin-custom-theme-colors` menghasilkan satu blok `[data-pantoken-color="…"]` per palet
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Setiap blok mengarahkan primitif merek (`--instui-primitive-color-navy-*` dan `-blue-*`)
ke palet yang dipilih. Ia juga menurunkan kembali permukaan merek yang upstream ubah menjadi hex literal, mempertahankan alfa yang tertanam melalui `color-mix()`. Warna status semantik, aksen biru eksplisit, dan bayangan elevasi tetap utuh. Coba di
[demo theming berbasis swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Warna merek kustom

Tetapkan `data-pantoken-color="custom"` untuk merek ulang dari hex apa pun, seperti warna utama yang diketik admin Canvas
ke Editor Tema. pantoken menurunkan skala `--instui-primitive-color-custom-*` lengkap 10–200 darinya:

1. **Kurva referensi.** Target kecerahan setiap langkah adalah rata‑rata kecerahan OKLCH dari 13
   palet pada langkah tersebut, dengan 0 tetap putih dan 210 tetap hitam. Jadi spasi skala kustom cocok dengan palet yang dikirim.
2. **Anchor.** Input ditempatkan pada langkah yang target kecerahannya paling dekat dengan sendiri, lalu disesuaikan ke kecerahan itu persis. `#cccccc` menjadi `custom-40` pada `#c9c9c9`: dekat dengan input, tetapi tidak selalu identik. "Paling dekat" berarti langkah terdekat pada kurva, bukan warna palet yang ada paling mirip.
3. **Mengisi.** Setiap langkah lain mempertahankan hue input. Saturasinya mengikuti kurva saturasi rata‑rata palet relatif terhadap anchor, dan dikurangi hanya ketika warna jatuh di luar sRGB.

Hanya `#rgb` dan `#rrggbb` yang diterima; lainnya melempar `TypeError`, jadi hex dari formulir tidak dapat menyuntikkan CSS.

Pada waktu build, hasilkan seluruh aturan dengan primitif turunan yang sudah dideklarasikan:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Untuk memilih warna saat runtime tanpa mengirimkan set token, prakomput kurva dan aturan remap pada waktu build. Lalu gunakan entri bebas-dependensi `/scale` di browser, dan tetapkan hanya 20 primitif turunan:

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

Pemilih tema situs dokumentasi, editor tema Canvas, dan demo di atas semuanya bekerja dengan cara ini.

Lihat [referensi API](/api/) untuk ekspor tiap plugin.
