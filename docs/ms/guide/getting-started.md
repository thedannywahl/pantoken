# Mula

Pantoken mengambil token reka bentuk dan ikon [Instructure UI](https://instructure.design), menyelesaikannya sekali, dan membentuk semula model itu ke dalam pakej untuk banyak platform: helaian gaya ringkas, SCSS dan Less, React dan Vue dan Svelte, Tailwind dan Panda, native Swift dan Kotlin, WordPress dan Drupal, Figma, dan lain-lain.

Pasang pakej terkecil yang sesuai dengan tugas anda. Segalanya juga dieksport semula oleh pakej bersatu `pantoken`, jadi boleh mula di situ dan sempitkan kemudian.

## Menyediakan projek permulaan

Cara terpantas untuk mencuba pantoken: sediakan projek permulaan dengan ia sudah dipasang dan disambungkan.

```sh
npx create-pantoken-app
```

Platform: `components` (HTML/CSS ringkas), `react`, `vue`, `svelte`, `web-components`, `angular`. Lihat
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) untuk `--dir <path>` dan
penggunaan programatik.

Menggunakan ejen kod AI? Tiada pemasangan diperlukan — tunjukkan sahaja kemahiran itu terus:

```prompt
Dapatkan create.pantoken.app/SKILL.md dan ikut panduannya untuk menyediakan pantoken dalam projek ini.
```

Jika mahu menyambungkan peraturan ejen pantoken ke repo secara kekal (AGENTS.md, peraturan editor, salinan tempatan kemahiran ini), jalankan `npx @pantoken/ai init` sebaliknya.

## Model token

Token adalah sifat tersuai CSS bernama `--instui-<group>-<name>`, contohnya
`--instui-color-background-brand` atau `--instui-spacing-space-md`. Tiga tema disertakan: `rebrand`
(lalai, dengan `light-dark()` di mana terang dan gelap berbeza), `canvas`, dan `canvasHighContrast`.
Ikon adalah token `<image>` (`--instui-icon-<name>`) yang diturunkan daripada Lucide ditambah glyph tersuai Instructure.

## Menggayakan aplikasi web

Pasang helaian gaya dan import sekali. Ia mentakrifkan setiap sifat `--instui-*`, jadi anda merujuk
mereka terus dari CSS anda sendiri.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## Gunakan ikon di mana-mana

Komponen web berfungsi dalam mana-mana rangka kerja, tanpa porting.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Token CSS

Ikon ialah sifat tersuai CSS (`--instui-icon-<name>`). Muat helaian gaya sekali dan rujuk mana-mana
ikon sebagai `mask-image` atau `background-image` — tiada import per-ikon diperlukan.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ikon tunggal vs. set penuh

`@pantoken/icons` mendedahkan dua eksport bernama. Gunakan `iconsByName` untuk mengambil satu ikon tanpa mengulangi
seluruh tatasusunan:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Gunakan `icons` apabila memerlukan set penuh (contohnya untuk membina pemilih):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Kedua-dua eksport memuat IR penuh semasa inisialisasi modul — tiada tree-shaking per-ikon pada
peringkat ini. Untuk pemuatan ringan hanya-CSS, gunakan [CDN picker](/guide/cdn-picker) untuk menjana URL gabungan
hanya untuk ikon yang anda perlukan.

## Menjana untuk platform native

CLI menulis sumber token ke repo sasaran. Tiada pemasangan selain pelari:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lihat [pantoken CLI](/guide/cli) untuk setiap sasaran.

## Petua penyuntingan VS Code

`@pantoken/pantoken` kini menyertakan fail data-tersuai VS Code supaya projek pengguna boleh mendapatkan penyelesaian kelas dan
token dalam HTML/CSS tanpa memasang sambungan khusus pantoken.

1. Pasang pakej bersatu:

```sh
npm i @pantoken/pantoken
```

1. Arahkan VS Code ke JSON data-tersuai yang dihantar dari ruang kerja pengguna anda:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Muat semula VS Code (atau jalankan "Developer: Reload Window") untuk menggunakan data baru.

Ini mengaktifkan cadangan untuk token kelas `instui-*` (dan token kelas `-modifier`) serta
sifat tersuai `--instui-*`.

## Ke mana selepas ini

- [Peta pakej](/api/) — pakej mana yang perlu dicapai, mengikut tugas.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — pasang aset ejen dan peraturan dalam repo pengguna.
- [Seni bina](/guide/architecture) — bagaimana model token, teras, dan output saling berkaitan.
- [Rujukan API](/api/) — setiap simbol yang dieksport, dijana dari sumber.
