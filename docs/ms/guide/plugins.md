# Pemalam

Pemalam pantoken meluaskan output token atau CSS tanpa memecah pakej. Ia dibina dengan `definePlugin` dari `@pantoken/plugin-kit`, kemudian diberi kepada `buildTokens` atau `toCss`.

## Menulis pemalam

Berikan `definePlugin` hak kait (hooks) yang anda laksanakan. Ia mengembalikan pemalam biasa, diberi jenama dengan keupayaan yang ditafsirkan daripada hak kait tersebut. Pemalam boleh meluaskan IR (`tokens`, `icons`), output CSS (`css`), atau kedua-duanya.

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

`buildTokens` dan `toCss` menjalankan `checkPlugins` ke atas pemalam yang anda berikan. Ia memberi amaran — ia tidak pernah melempar — apabila pemalam tiada hak kait yang sepadan untuk peringkat ia didaftarkan, jadi pemalam hanya-token yang diberi kepada `toCss` akan dilangkau dengan nota daripada menjadi tidak melakukan apa-apa secara senyap.

## Menggabungkan pemalam

Bina di atas pemalam lain dengan `extendPlugin`, atau gabungkan rakan sebaya dengan `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hak kait peringkat-sama boleh digabungkan: `tokens` menjalankan asas kemudian tambahan, `css` menggabungkan dua sumbangan, dan `icons` menjalankan kedua-duanya.

## Sahkan output pemalam anda

Jalankan pemeriksaan drift bersama dari `@pantoken/utils` ke atas output pemalam anda sendiri dalam ujian, supaya kesilapan taip atau penamaan semula token gagal dengan cepat dan secara tempatan:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Pemalam terbundel

- `@pantoken/plugin-simple-icons` — ikon jenama daripada simple-icons, didaftarkan sebagai token ikon.
- `@pantoken/plugin-lucide-lab` — ikon Lucide Lab, didaftarkan sebagai token imej `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo produk Instructure sebagai SVG, URI data, dan token imej `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — pemalam PostCSS (bukan pemalam pantoken) yang membuang sifat tersuai yang tidak digunakan dari helaian gaya.
- `@pantoken/plugin-custom-theme-colors` — menjenamakan semula halaman dengan menetapkan satu atribut (`data-pantoken-color`) kepada salah satu daripada 13 palet, atau kepada `custom` untuk mana-mana hex jenama. Lihat [Warna tema](#theme-colors).

Daftar Lucide Lab boleh dimuatkan secara malas (lazy), kemudian diberi kepada hak kait token segerak:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Beberapa perkara yang dulu merupakan pemalam kini dihantar dalam `@pantoken/components`, kerana begitu banyak komponen memerlukannya secara lalai: bayang-bayang elevasi (`--instui-elevation-*`, dalam `components.css`), cincin fokus-outline (dalam `base.css` — setiap elemen boleh-fokus akan menerimanya apabila pantoken menguasai halaman), dan fon jenama Instructure (Atkinson Hyperlegible Next: `base.css` mengenakan `--instui-font-family-base`; pilihan opt-in `@pantoken/components/fonts.css` memuatkan woff2 `@font-face`).

## Warna tema {#theme-colors}

`@pantoken/plugin-custom-theme-colors` mengeluarkan satu blok `[data-pantoken-color="…"]` bagi setiap palet
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Setiap blok menunjuk primitif jenama (`--instui-primitive-color-navy-*` dan `-blue-*`)
kepada palet yang dipilih. Ia juga menurunkan semula permukaan jenama yang asalnya ditetapkan kepada hex literal,
mengekalkan alpha tersemat mereka melalui `color-mix()`. Warna status semantik, aksen biru eksplisit, dan
bayang elevasi kekal seperti sediakala. Cuba ia dalam demo
[theming berasaskan swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Warna jenama tersuai

Tetapkan `data-pantoken-color="custom"` untuk menjenamakan semula daripada mana-mana hex, seperti warna utama yang seorang pentadbir Canvas
taipkan ke dalam Penyunting Tema. pantoken menurunkan skala `--instui-primitive-color-custom-*` 10–200 penuh daripadanya:

1. **Lengkung rujukan.** Sasaran kecerahan setiap langkah ialah purata kecerahan OKLCH bagi 13
   palet pada langkah itu, dengan 0 tetap pada putih dan 210 pada hitam. Jadi jarak skala tersuai sepadan
   dengan palet yang dihantar.
2. **Sauh.** Input mendarat pada langkah yang sasaran kecerahannya paling hampir dengan kecerahannya sendiri, kemudian disnap kepada
   kecerahan tepat itu. `#cccccc` menjadi `custom-40` pada `#c9c9c9`: dekat dengan input, tetapi tidak
   selalu serupa. "Paling hampir" bermaksud langkah terdekat pada lengkung, bukan warna palet sedia ada yang paling hampir.
3. **Isian.** Setiap langkah lain mengekalkan rona (hue) input. Ketepuan (saturation) mengikut lengkung purata ketepuan palet relatif kepada sauh, dan dikurangkan hanya apabila warna berada di luar julat sRGB.

Hanya `#rgb` dan `#rrggbb` diterima; apa-apa selain itu akan melemparkan `TypeError`, jadi hex dari borang
tidak boleh menyuntik CSS.

Pada masa binaan, keluarkan keseluruhan peraturan dengan primitif terbitan sudah diisytiharkan:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Untuk memilih warna pada masa jalan (runtime) tanpa menghantar set token, kira lengkung dan peraturan pemeta semula pada masa binaan. Kemudian gunakan entri bebas-kebergantungan `/scale` dalam pelayar, dan tetapkan hanya 20
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

Pemilih tema laman dokumen, penyunting tema Canvas, dan demo di atas semuanya berfungsi dengan cara ini.

Lihat [rujukan API](/api/) untuk eksport setiap pemalam.
