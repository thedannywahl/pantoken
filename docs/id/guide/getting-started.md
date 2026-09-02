# Memulai

pantoken mengambil design tokens dan ikon Instructure UI, menyelesaikannya sekali, dan merombak model tersebut menjadi paket untuk banyak platform: stylesheet biasa, SCSS dan Less, React dan Vue dan Svelte, Tailwind dan Panda, native Swift dan Kotlin, WordPress dan Drupal, Figma, dan lainnya.

Pasang paket terkecil yang cocok untuk tugas Anda. Semua juga diekspor ulang oleh paket terpadu `pantoken`, jadi bisa mulai dari sana lalu mempersempit nanti.

## Membuat proyek starter

Cara tercepat untuk mencoba pantoken: buat proyek starter yang sudah terpasang dan terhubung.

```sh
npx create-pantoken-app react
```

Platform: `components` (HTML/CSS biasa), `react`, `vue`, `svelte`, `web-components`, `angular`. Lihat [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) untuk `--dir <path>` dan penggunaan programatik.

Menggunakan agen pengkodean AI? Tidak perlu instal — arahkan langsung ke skill:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Bekerja dengan cara yang sama untuk Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, dan Amazon Q Developer CLI — ganti `claude` dengan `gemini`, `agent`, `codex`, `copilot -p`, atau `q chat`. Jika ingin menyematkan aturan agen pantoken ke repo secara permanen (AGENTS.md, aturan editor, salinan lokal skill ini), jalankan `npx @pantoken/ai init` sebagai gantinya.

## Model token

Token adalah custom properties CSS bernama `--instui-<group>-<name>`, misalnya `--instui-color-background-brand` atau `--instui-spacing-space-md`. Tiga tema dikirim: `rebrand` (default, dengan `light-dark()` ketika light dan dark berbeda), `canvas`, dan `canvasHighContrast`. Ikon adalah token `<image>` (`--instui-icon-<name>`) yang diturunkan dari Lucide ditambah glyph kustom Instructure.

## Menata aplikasi web

Pasang stylesheet dan impor sekali. Ia mendefinisikan setiap properti `--instui-*`, sehingga Anda merujuknya langsung dari CSS Anda sendiri.

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

Web component bekerja di framework apa pun, tanpa perlu porting.

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

Ikon adalah custom properties CSS (`--instui-icon-<name>`). Muat stylesheet sekali dan rujuk ikon apa pun sebagai `mask-image` atau `background-image` — tidak perlu impor per-ikon.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — satu ikon vs. seluruh set

`@pantoken/icons` mengekspos dua ekspor bernama. Gunakan `iconsByName` untuk mengambil satu ikon tanpa mengiterasi seluruh array:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Gunakan `icons` ketika membutuhkan seluruh set (mis. untuk membangun picker):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Kedua ekspor memuat IR penuh saat inisialisasi modul — tidak ada tree-shaking per-ikon di level ini. Untuk pemuatan yang ramping hanya-CSS, gunakan [CDN picker](/guide/cdn-picker) untuk menghasilkan URL gabungan hanya untuk ikon yang Anda butuhkan.

## Menghasilkan untuk platform native

CLI menulis sumber token ke dalam repo target. Tidak perlu instal selain runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Lihat [pantoken CLI](/guide/cli) untuk setiap target.

## Petunjuk penulisan di VS Code

`@pantoken/pantoken` sekarang mengirimkan berkas custom-data VS Code sehingga proyek downstream dapat mendapatkan completion kelas dan token di HTML/CSS tanpa memasang ekstensi khusus pantoken.

1. Pasang paket terpadu:

```sh
npm i @pantoken/pantoken
```

1. Arahkan VS Code ke custom-data JSON yang dikirimkan dari workspace konsumen Anda:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Muat ulang VS Code (atau jalankan "Developer: Reload Window") untuk menerapkan data baru.

Ini mengaktifkan saran untuk token kelas `instui-*` (dan token kelas `-modifier`) serta properti kustom `--instui-*`.

## Kemana selanjutnya

- [Peta paket](/guide/packages) — paket mana yang perlu diambil, menurut tugas.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — pasang aset dan aturan agen di repo konsumen.
- [Arsitektur](/guide/architecture) — bagaimana model token, core, dan output saling cocok.
- [Referensi API](/api/) — setiap simbol yang diekspor, dihasilkan dari sumber.
