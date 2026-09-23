# Pemalam

Pemalam pantoken meluaskan output token atau CSS tanpa memecah pakej. Anda bina satu dengan
`definePlugin` dari `@pantoken/plugin-kit`, kemudian pass ia ke `buildTokens` atau `toCss`.

## Menulis pemalam

Berikan `definePlugin` hak kait (hooks) yang anda laksanakan. Ia mengembalikan pemalam biasa, berjenama dengan
keupayaan yang ditentukan daripada hak kait tersebut. Pemalam boleh meluaskan IR (`tokens`, `icons`), output CSS
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

## Pendaftaran berkesedaran-keupayaan

`buildTokens` dan `toCss` menjalankan `checkPlugins` ke atas pemalam yang anda pass. Ia memberi amaran — ia tidak pernah melempar —
apabila pemalam tidak mempunyai hak kait yang sepadan untuk peringkat ia didaftarkan, jadi pemalam hanya-token yang passed
ke `toCss` akan dilangkau dengan nota dan bukannya tidak melakukan apa-apa secara senyap.

## Menggabungkan pemalam

Bina di atas pemalam lain dengan `extendPlugin`, atau gabungkan rakan sebaya dengan `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hak kait pada peringkat yang sama boleh digabungkan: `tokens` menjalankan asas kemudian tambahan, `css` menggabungkan kedua-dua
sumbangan, dan `icons` menjalankan kedua-duanya.

## Sahkan output pemalam anda

Jalankan pemeriksaan drift kongsi dari `@pantoken/utils` ke atas output pemalam anda sendiri dalam ujiannya, supaya
salah eja atau token yang ditukar nama gagal dengan cepat dan secara tempatan:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Pemalam terbundel

- `@pantoken/plugin-simple-icons` — ikon jenama dari simple-icons, didaftarkan sebagai token ikon.
- `@pantoken/plugin-lucide-lab` — ikon Lucide Lab, didaftarkan sebagai token imej `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo produk Instructure sebagai SVG, URI data, dan token imej `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — pemalam PostCSS (bukan pemalam pantoken) yang mengeluarkan
  properti tersuai yang tidak digunakan dari helaian gaya.

Registry Lucide Lab boleh dimuatkan secara malas, kemudian dipass ke hak kait token segerak:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Beberapa perkara yang dahulu adalah pemalam kini dihantar dalam `@pantoken/components`, kerana begitu banyak komponen memerlukannya secara lalai: bayang ketinggian (`--instui-elevation-*`, dalam `components.css`), cincin garisan fokus-outline (dalam `base.css` — setiap elemen boleh-fokus mendapatkannya apabila pantoken mengawal halaman), dan fon jenama Instructure (Atkinson Hyperlegible Next: `base.css` menerapkan `--instui-font-family-base`; `@pantoken/components/fonts.css` pilihan memuatkan woff2 `@font-face`).

Lihat [rujukan API](/api/) untuk eksport setiap pemalam.
