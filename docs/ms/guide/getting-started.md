# Mula

Pantoken mengambil token reka bentuk dan ikon [Instructure UI](https://instructure.design), menyelesaikannya sekali, dan membentuk semula model tersebut ke dalam pakej untuk banyak platform: helaian gaya biasa, SCSS dan Less, React dan Vue dan Svelte, Tailwind dan Panda, native Swift dan Kotlin, WordPress dan Drupal, Figma, dan banyak lagi.

Pasang pakej terkecil yang sesuai dengan tugas anda. Segala-galanya juga dieksport semula oleh pakej bersepadu `pantoken`, jadi anda boleh mula di situ dan mempersempit kemudian.

## Menyediakan projek permulaan

Cara terpantas untuk mencuba pantoken: rangka projek permulaan yang telah dipasang dan disambungkan.

```sh
npx create-pantoken-app
```

Platform: `components` (HTML/CSS biasa), `react`, `vue`, `svelte`, `web-components`, `angular`. Lihat [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) untuk `--dir <path>` dan penggunaan programatik.

Menggunakan ejen pengekodan AI? Tiada pemasangan diperlukan — tunjukkan terus pada skill itu:

```prompt
Dapatkan create.pantoken.app/SKILL.md dan ikutinya untuk menyediakan pantoken dalam projek ini.
```

Jika anda mahu menyambungkan peraturan ejen pantoken ke repositori secara kekal (AGENTS.md, peraturan editor, salinan tempatan skill ini), jalankan `npx @pantoken/ai init` sebaliknya.

## Model token

Token ialah sifat tersuai CSS bernama `--instui-<group>-<name>`, contohnya `--instui-color-background-brand` atau `--instui-spacing-space-md`. Tiga tema disertakan: `rebrand` (lalai, dengan `light-dark()` di mana terang dan gelap berbeza), `canvas`, dan `canvasHighContrast`. Ikon adalah token `<image>` (`--instui-icon-<name>`) yang berasal dari Lucide ditambah glif tersuai Instructure.

## Gaya aplikasi web

Pasang helaian gaya dan import sekali. Ia mentakrifkan setiap sifat `--instui-*`, jadi anda merujuknya terus dari CSS anda sendiri.

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

Komponen web berfungsi dalam mana-mana rangka kerja, tanpa perlu porting.

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

Ikon ialah sifat tersuai CSS (`--instui-icon-<name>`). Muatkan helaian gaya sekali dan rujuk mana-mana ikon sebagai `mask-image` atau `background-image` — tiada import per-ikon diperlukan.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ikon tunggal vs set penuh

`@pantoken/icons` mendedahkan dua eksport bernama. Gunakan `iconsByName` untuk menarik satu ikon tanpa mengulangi keseluruhan
array:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Gunakan `icons` apabila anda memerlukan set penuh (contohnya untuk membina pemilih):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Kedua-dua eksport memuatkan IR penuh semasa inisialisasi modul — tiada tree-shaking per-ikon pada
peringkat ini. Untuk pemuatan CSS sahaja yang ringkas, gunakan [CDN picker](/guide/cdn-picker) untuk menjana URL gabungan
hanya bagi ikon yang anda perlukan.

## Jana untuk platform native

CLI menulis sumber token ke repositori sasaran. Tiada pemasangan selain pelari:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lihat [the pantoken CLI](/guide/cli) untuk setiap sasaran.

## Petua penyuntingan VS Code

`@pantoken/pantoken` kini disertakan dengan fail custom-data VS Code supaya projek pengguna dapat mendapatkan pelengkap kelas dan token dalam HTML/CSS tanpa memasang sambungan khusus pantoken.

1. Pasang pakej bersepadu:

```sh
npm i @pantoken/pantoken
```

1. Arahkan VS Code ke JSON custom-data yang disertakan dari ruang kerja pengguna anda:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Muat semula VS Code (atau jalankan "Developer: Reload Window") untuk menerapkan data baru.

Ini membolehkan cadangan untuk token kelas `instui-*` (dan token kelas `-modifier`) serta sifat tersuai `--instui-*`.

## Ke mana seterusnya

- [Peta pakej](/guide/packages) — pakej mana untuk dicapai mengikut tugas.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — pasang aset ejen dan peraturan dalam repositori pengguna.
- [Seni bina](/guide/architecture) — bagaimana model token, teras, dan output bersesuaian.
- [Rujukan API](/api/) — setiap simbol yang dieksport, dijana dari sumber.
