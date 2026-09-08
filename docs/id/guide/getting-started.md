# Memulai

Pantoken mengambil token desain dan ikon [Instructure UI](https://instructure.design), menyelesaikannya sekali, dan membentuk ulang model itu menjadi paket untuk banyak platform: stylesheet biasa, SCSS dan Less, React dan Vue dan Svelte, Tailwind dan Panda, native Swift dan Kotlin, WordPress dan Drupal, Figma, dan lainnya.

Pasang paket terkecil yang sesuai tugas Anda. Semua juga diekspor ulang oleh paket terpadu `pantoken`, jadi Anda bisa mulai dari sana dan mempersempit nanti.

## Menyiapkan proyek awal

Cara tercepat mencoba pantoken: buat proyek awal yang sudah terpasang dan terhubung.

```sh
npx create-pantoken-app
```

Platform: `components` (HTML/CSS biasa), `react`, `vue`, `svelte`, `web-components`, `angular`. Lihat [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) untuk `--dir <path>` dan penggunaan programatik.

Menggunakan agen pengkodean AI? Tidak perlu instal — arahkan langsung ke skill tersebut:

```prompt
Ambil create.pantoken.app/SKILL.md dan ikuti instruksinya untuk menyiapkan pantoken di proyek ini.
```

Jika Anda ingin menghubungkan aturan agen pantoken ke repo secara permanen (AGENTS.md, aturan editor, salinan lokal skill ini), jalankan `npx @pantoken/ai init` sebagai gantinya.

## Model token

Token adalah properti kustom CSS bernama `--instui-<group>-<name>`, misalnya `--instui-color-background-brand` atau `--instui-spacing-space-md`. Tiga tema disertakan: `rebrand` (default, dengan `light-dark()` ketika terang dan gelap berbeda), `canvas`, dan `canvasHighContrast`. Ikon adalah token `<image>` (`--instui-icon-<name>`) yang diturunkan dari Lucide ditambah glif khusus Instructure.

## Menata aplikasi web

Pasang stylesheet dan impor sekali. Itu mendefinisikan setiap properti `--instui-*`, sehingga Anda dapat merujuknya langsung dari CSS Anda sendiri.

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

## Menggunakan ikon di mana saja

Web component bekerja di framework mana pun, tanpa porting.

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

Ikon adalah properti kustom CSS (`--instui-icon-<name>`). Muat stylesheet sekali dan rujuk ikon apa pun sebagai `mask-image` atau `background-image` — tidak perlu impor per-ikon.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — satu ikon vs. seluruh set

`@pantoken/icons` menyediakan dua ekspor bernama. Gunakan `iconsByName` untuk mengambil satu ikon tanpa mengiterasi seluruh array:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Gunakan `icons` ketika Anda membutuhkan seluruh set (mis. untuk membangun pemilih):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Kedua ekspor memuat IR penuh saat inisialisasi modul — tidak ada tree-shaking per-ikon pada level ini. Untuk pemuatan ramping hanya-CSS, gunakan [CDN picker](/guide/cdn-picker) untuk menghasilkan URL gabungan hanya untuk ikon yang Anda butuhkan.

## Menghasilkan untuk platform native

CLI menulis sumber token ke repo target. Tidak perlu instal selain runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lihat [pantoken CLI](/guide/cli) untuk setiap target.

## Petunjuk penulisan di VS Code

`@pantoken/pantoken` sekarang menyertakan file custom-data VS Code sehingga proyek downstream dapat mendapatkan pelengkapan kelas dan token di HTML/CSS tanpa memasang ekstensi khusus pantoken.

1. Pasang paket terpadu:

```sh
npm i @pantoken/pantoken
```

1. Arahkan VS Code ke JSON custom-data yang dikirim dari workspace konsumen Anda:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Muat ulang VS Code (atau jalankan "Developer: Reload Window") untuk menerapkan data baru.

Ini mengaktifkan saran untuk token kelas `instui-*` (dan token kelas `-modifier`) serta properti kustom `--instui-*`.

## Selanjutnya ke mana

- [Peta paket](/guide/packages) — paket mana yang digunakan, berdasarkan tugas.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — pasang aset agen dan aturan di repo konsumen.
- [Arsitektur](/guide/architecture) — bagaimana model token, core, dan output saling terkait.
- [Referensi API](/api/) — setiap simbol yang diekspor, dihasilkan dari sumber.
