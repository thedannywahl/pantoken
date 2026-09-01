# Pemalam

Pemalam pantoken meluaskan keluaran token atau CSS tanpa memecah pakej. Anda bina satu dengan
`definePlugin` dari `@pantoken/plugin-kit`, kemudian serahkan kepada `buildTokens` atau `toCss`.

## Menulis pemalam

Berikan `definePlugin` hook yang anda laksanakan. Ia mengembalikan pemalam biasa, berjenama dengan
keupayaan yang disimpulkan dari hook tersebut. Pemalam boleh meluaskan IR (`tokens`, `icons`), keluaran CSS
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

## Pendaftaran yang sedar-keupayaan

`buildTokens` dan `toCss` menjalankan `checkPlugins` ke atas pemalam yang anda serahkan. Ia memberi amaran — ia tidak pernah melempar —
apabila pemalam tidak mempunyai hook yang sepadan untuk peringkat ia didaftarkan, jadi pemalam hanya-token yang diserahkan
kepada `toCss` diabaikan dengan nota dan bukannya diam-diam tidak melakukan apa-apa.

## Gabungkan pemalam

Bina di atas pemalam lain dengan `extendPlugin`, atau gabungkan rakan sebaya dengan `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hook peringkat-sama bergabung: `tokens` menjalankan pangkalan kemudian penambahan, `css` menggabungkan dua
sumbangan itu, dan `icons` menjalankan kedua-duanya.

## Sahkan keluaran pemalam anda

Jalankan pemeriksaan drift berkongsi dari `@pantoken/utils` ke atas keluaran pemalam anda sendiri dalam ujinya, supaya
kesalahan taip atau token yang ditukar nama gagal dengan cepat dan secara setempat:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Pemalam terbundel

- `@pantoken/plugin-simple-icons` — menjenama ikon dari simple-icons, didaftarkan sebagai token ikon.
- `@pantoken/plugin-logos` — logo produk Instructure sebagai SVG, URI data, dan token imej `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — pemalam PostCSS (bukan pemalam pantoken) yang membuang
  properti tersuai yang tidak digunakan dari helaian gaya.

Beberapa perkara yang dahulu merupakan pemalam kini dihantar dalam `@pantoken/components`, kerana begitu banyak komponen memerlukannya terus daripada kotak: bayang-bayang elevasi (`--instui-elevation-*`, dalam `components.css`), cincin garisan fokus (dalam `base.css` — setiap elemen boleh fokus menerimanya apabila pantoken mengawal halaman), dan fon jenama Instructure (Atkinson Hyperlegible Next: `base.css` menggunakan `--instui-font-family-base`; pilihan `@pantoken/components/fonts.css` memuatkan woff2s `@font-face`).

Lihat [rujukan API](/api/) untuk eksport setiap pemalam.
