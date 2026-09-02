# Plugin

Plugin pantoken memperluas keluaran token atau CSS tanpa me-fork paket. Anda membuatnya dengan
`definePlugin` dari `@pantoken/plugin-kit`, lalu meneruskannya ke `buildTokens` atau `toCss`.

## Menulis plugin

Berikan `definePlugin` hook yang Anda implementasikan. Ini mengembalikan plugin normal, diberi merek dengan
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

## Pendaftaran yang sadar kapabilitas

`buildTokens` dan `toCss` menjalankan `checkPlugins` pada plugin yang Anda berikan. Ini memberikan peringatan — tidak pernah melempar —
ketika sebuah plugin tidak memiliki hook yang cocok untuk tahap tempat ia didaftarkan, jadi plugin yang hanya token yang diteruskan
ke `toCss` dilewati dengan catatan daripada diam-diam tidak melakukan apa-apa.

## Menggabungkan plugin

Bangun di atas plugin lain dengan `extendPlugin`, atau gabungkan rekan dengan `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook pada tahap yang sama dapat tersusun: `tokens` menjalankan basis lalu tambahan, `css` menggabungkan dua
kontribusi, dan `icons` menjalankan keduanya.

## Validasi keluaran plugin Anda

Jalankan pemeriksaan drift bersama dari `@pantoken/utils` pada keluaran plugin Anda sendiri dalam testnya, sehingga
kesalahan ketik atau token yang diubah namanya gagal cepat dan secara lokal:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Plugin bawaan

- `@pantoken/plugin-simple-icons` — memberi merek ikon dari simple-icons, didaftarkan sebagai token ikon.
- `@pantoken/plugin-logos` — logo produk Instructure sebagai SVG, data URI, dan `--instui-logo-*`
  token gambar.
- `@pantoken/plugin-prune-custom-props` — sebuah plugin PostCSS (bukan plugin pantoken) yang menghapus
  custom property yang tidak terpakai dari stylesheet.

Beberapa hal yang dulu berupa plugin sekarang dikirimkan dalam `@pantoken/components`, karena begitu banyak komponen membutuhkan
mereka secara default: bayangan elevasi (`--instui-elevation-*`, dalam `components.css`), cincin outline fokus
(di `base.css` — setiap elemen yang dapat difokus akan mendapatkannya ketika pantoken mengelola halaman), dan font merek Instructure
(Atkinson Hyperlegible Next: `base.css` menerapkan `--instui-font-family-base`; `@pantoken/components/fonts.css` opsional memuat `@font-face` woff2s).

Lihat [referensi API](/api/) untuk ekspor masing-masing plugin.
