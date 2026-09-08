# Bắt đầu

Pantoken lấy các design token và biểu tượng từ [Instructure UI](https://instructure.design), giải quyết chúng một lần, và biến mẫu đó thành các gói cho nhiều nền tảng: stylesheet thuần, SCSS và Less, React và Vue và Svelte, Tailwind và Panda, Swift và Kotlin gốc, WordPress và Drupal, Figma, và nhiều hơn nữa.

Cài gói nhỏ nhất phù hợp với nhiệm vụ. Mọi thứ cũng được xuất lại bởi gói hợp nhất `pantoken`, nên có thể bắt đầu từ đó rồi thu hẹp sau.

## Tạo khung dự án khởi đầu

Cách nhanh nhất để thử pantoken: tạo khung dự án khởi đầu đã cài và cấu hình sẵn.

```sh
npx create-pantoken-app
```

Nền tảng: `components` (HTML/CSS thuần), `react`, `vue`, `svelte`, `web-components`, `angular`. Xem [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) để biết `--dir <path>` và sử dụng theo chương trình.

Dùng một agent lập trình AI? Không cần cài — trỏ trực tiếp kỹ năng vào nó:

```prompt
Lấy create.pantoken.app/SKILL.md và làm theo hướng dẫn trong đó để thiết lập pantoken trong dự án này.
```

Nếu muốn tích hợp vĩnh viễn quy tắc agent của pantoken vào repo (AGENTS.md, quy tắc editor, bản sao local của kỹ năng này), chạy `npx @pantoken/ai init` thay thế.

## Mô hình token

Token là các thuộc tính tùy chỉnh CSS đặt tên `--instui-<group>-<name>`, ví dụ `--instui-color-background-brand` hoặc `--instui-spacing-space-md`. Ba theme được phát hành: `rebrand` (mặc định, với `light-dark()` nơi light và dark khác nhau), `canvas`, và `canvasHighContrast`. Biểu tượng là token `<image>` (`--instui-icon-<name>`) được suy ra từ Lucide cộng với glyph tùy chỉnh của Instructure.

## Tạo kiểu cho ứng dụng web

Cài stylesheet và import một lần. Nó định nghĩa mọi thuộc tính `--instui-*`, nên tham chiếu trực tiếp từ CSS của bạn.

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

## Sử dụng biểu tượng ở bất kỳ đâu

Web component hoạt động trong bất kỳ framework nào, không cần chuyển đổi.

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

Biểu tượng là thuộc tính tùy chỉnh CSS (`--instui-icon-<name>`). Tải stylesheet một lần và tham chiếu bất kỳ biểu tượng nào như `mask-image` hoặc `background-image` — không cần import từng biểu tượng.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — biểu tượng đơn lẻ vs bộ đầy đủ

`@pantoken/icons` cung cấp hai export đặt tên. Dùng `iconsByName` để lấy một biểu tượng mà không cần lặp toàn bộ mảng:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Dùng `icons` khi cần toàn bộ tập (ví dụ để xây bộ chọn):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Cả hai export đều tải toàn bộ IR khi module khởi tạo — không có tree-shaking theo biểu tượng ở cấp này. Để tải nhẹ chỉ bằng CSS, dùng [CDN picker](/guide/cdn-picker) để tạo URL kết hợp chỉ cho các biểu tượng bạn cần.

## Tạo cho nền tảng gốc

CLI ghi nguồn token vào repo đích. Không cần cài gì thêm ngoài runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Xem [the pantoken CLI](/guide/cli) cho mọi đích.

## Mẹo soạn thảo VS Code

`@pantoken/pantoken` hiện cung cấp file custom-data VS Code để dự án downstream có thể nhận gợi ý class và token trong HTML/CSS mà không cần cài extension riêng cho pantoken.

1. Cài gói hợp nhất:

```sh
npm i @pantoken/pantoken
```

1. Trỏ VS Code tới JSON custom-data được phát hành từ workspace người dùng:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reload VS Code (hoặc chạy "Developer: Reload Window") để áp dụng dữ liệu mới.

Điều này bật gợi ý cho token class `instui-*` (và token class `-modifier`) cùng với thuộc tính tùy chỉnh `--instui-*`.

## Tiếp theo ở đâu

- [Bản đồ gói](/guide/packages) — nên dùng gói nào cho nhiệm vụ.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — cài tài sản và quy tắc agent trong repo consumer.
- [Kiến trúc](/guide/architecture) — cách mô hình token, core, và outputs kết hợp với nhau.
- [Tham chiếu API](/api/) — mọi symbol được xuất, sinh từ nguồn.
