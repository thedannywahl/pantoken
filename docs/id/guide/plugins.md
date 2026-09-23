# Plugin

Plugin pantoken memperluas output token atau CSS tanpa me-fork paket. Buat satu dengan `definePlugin` dari `@pantoken/plugin-kit`, lalu serahkan ke `buildTokens` atau `toCss`.

## Menulis plugin

Berikan `definePlugin` hook yang Anda implementasikan. Itu mengembalikan plugin normal, diberi merek dengan kapabilitas yang diinferensi dari hook tersebut. Sebuah plugin dapat memperluas IR (`tokens`, `icons`), output CSS (`css`), atau keduanya.

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

`buildTokens` dan `toCss` menjalankan `checkPlugins` pada plugin yang Anda berikan. Ia memperingatkan — tidak pernah melempar — ketika sebuah plugin tidak memiliki hook yang cocok untuk tahap tempat ia didaftarkan, jadi plugin hanya-token yang diberikan ke `toCss` akan dilewati dengan catatan daripada diam-diam tidak melakukan apa-apa.

## Menggabungkan plugin

Bangun di atas plugin lain dengan `extendPlugin`, atau gabungkan rekan dengan `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook tahap-sama dapat dikomposisi: `tokens` menjalankan base kemudian tambahan, `css` menggabungkan kedua kontribusi, dan `icons` menjalankan keduanya.

## Validasi output plugin Anda

Jalankan pemeriksaan drift bersama dari `@pantoken/utils` pada output plugin Anda sendiri dalam test-nya, sehingga salah ketik atau token yang diganti nama gagal cepat dan secara lokal:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Plugin yang dibundel

- `@pantoken/plugin-simple-icons` — merek ikon dari simple-icons, didaftarkan sebagai token ikon.
- `@pantoken/plugin-lucide-lab` — ikon Lucide Lab, didaftarkan sebagai token gambar `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo produk Instructure sebagai SVG, data URI, dan token gambar `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — plugin PostCSS (bukan plugin pantoken) yang menghapus properti kustom yang tidak terpakai dari stylesheet.

Registri Lucide Lab dapat dimuat secara malas, lalu diberikan ke hook token sinkron:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Beberapa hal yang dulunya plugin sekarang dikirimkan di `@pantoken/components`, karena begitu banyak komponen memerlukannya langsung: bayangan elevasi (`--instui-elevation-*`, di `components.css`), cincin fokus-outline (di `base.css` — setiap elemen yang dapat difokuskan mendapatkannya ketika pantoken mengendalikan halaman), dan font merek Instructure (Atkinson Hyperlegible Next: `base.css` menerapkan `--instui-font-family-base`; opsi `@pantoken/components/fonts.css` memuat woff2 `@font-face`).

Lihat [referensi API](/api/) untuk ekspor masing-masing plugin.
