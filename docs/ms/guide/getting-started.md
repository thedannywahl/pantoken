# Memulakan

pantoken mengambil token reka bentuk dan ikon Instructure UI, menyelesaikannya sekali, dan membentuk semula model itu menjadi pakej untuk banyak platform: helaian gaya biasa, SCSS dan Less, React dan Vue dan Svelte, Tailwind dan Panda, Swift dan Kotlin asli, WordPress dan Drupal, Figma, dan lain-lain.

Pasang pakej terkecil yang sesuai dengan tugas anda. Semuanya juga dieksport semula oleh pakej bersepadu `pantoken`, jadi anda boleh bermula di situ dan mengecilkan pilihan kemudian.

## Sediakan projek permulaan

Cara terpantas untuk mencuba pantoken: sediakan projek permulaan dengan ia sudah dipasang dan dihubungkan.

```sh
npx create-pantoken-app react
```

Platform: `components` (HTML/CSS biasa), `react`, `vue`, `svelte`, `web-components`, `angular`. Lihat [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) untuk `--dir <path>` dan penggunaan berprogram.

Menggunakan ejen pengkodan AI? Tiada pemasangan diperlukan — arahkan sahaja kepada skill secara langsung:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Berfungsi dengan cara yang sama untuk Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, dan Amazon Q Developer CLI — gantikan `claude` dengan `gemini`, `agent`, `codex`, `copilot -p`, atau `q chat`. Jika anda lebih suka menghubungkan peraturan ejen pantoken ke repositori secara kekal (AGENTS.md, peraturan editor, salinan tempatan skill ini), jalankan `npx @pantoken/ai init` sebaliknya.

## Model token

Token adalah sifat tersuai CSS bernama `--instui-<group>-<name>`, contohnya `--instui-color-background-brand` atau `--instui-spacing-space-md`. Tiga tema disertakan: `rebrand` (lalai, dengan `light-dark()` di mana terang dan gelap berbeza), `canvas`, dan `canvasHighContrast`. Ikon adalah token `<image>` (`--instui-icon-<name>`) yang berasal dari Lucide ditambah glif tersuai Instructure.

## Gaya aplikasi web

Pasang helaian gaya dan import sekali. Ia mentakrifkan setiap sifat `--instui-*`, jadi anda boleh merujuknya terus dari CSS anda sendiri.

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

Komponen web berfungsi dalam mana-mana rangka kerja, tanpa penyesuaian.

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

Ikon adalah sifat tersuai CSS (`--instui-icon-<name>`). Muatkan helaian gaya sekali dan rujuk mana-mana ikon sebagai `mask-image` atau `background-image` — tiada import per-ikon diperlukan.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ikon tunggal vs. set penuh

`@pantoken/icons` mendedahkan dua eksport bernama. Gunakan `iconsByName` untuk menarik satu ikon tanpa mengiterasi seluruh tatasusunan:

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

Kedua-dua eksport memuatkan IR penuh semasa inisialisasi modul — tiada tree-shaking per-ikon pada peringkat ini. Untuk pemuatan CSS sahaja yang ringan, gunakan [pemilih CDN](/guide/cdn-picker) untuk menjana URL gabungan hanya untuk ikon yang anda perlukan.

## Jana untuk platform asli

CLI menulis sumber token ke dalam repositori sasaran. Tiada pemasangan selain pelari:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lihat [pantoken CLI](/guide/cli) untuk setiap sasaran.

## Petua penggubahan VS Code

`@pantoken/pantoken` kini dihantar dengan fail data-khusus VS Code supaya projek pengguna hiliran boleh mendapatkan pelengkap kelas dan token dalam HTML/CSS tanpa memasang sambungan khusus pantoken.

1. Pasang pakej bersepadu:

```sh
npm i @pantoken/pantoken
```

1. Arahkan VS Code kepada JSON data-khusus yang dihantar dari ruang kerja pengguna anda:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Muat semula VS Code (atau jalankan "Developer: Reload Window") untuk menerapkan data baru.

Ini membolehkan cadangan untuk token kelas `instui-*` (dan token kelas `-modifier`) serta sifat tersuai `--instui-*`.

## Ke mana seterusnya

- [Peta pakej](/guide/packages) — pakej mana yang patut dicapai, mengikut tugas.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — pasang aset ejen dan peraturan dalam repositori pengguna.
- [Senibina](/guide/architecture) — bagaimana model token, teras, dan keluaran sesuai bersama.
- [Rujukan API](/api/) — setiap simbol yang dieksport, dijana daripada sumber.
