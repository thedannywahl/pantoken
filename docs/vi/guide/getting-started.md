# Bắt đầu

Pantoken lấy các design token và biểu tượng từ [Instructure UI](https://instructure.design), giải quyết chúng một lần, rồi biến đổi mô hình đó thành các gói cho nhiều nền tảng: stylesheet thuần, SCSS và Less, React và Vue và Svelte, Tailwind và Panda, native Swift và Kotlin, WordPress và Drupal, Figma, và hơn thế nữa.

Cài gói nhỏ nhất phù hợp với nhiệm vụ của bạn. Mọi thứ cũng được xuất lại bởi gói hợp nhất `pantoken`, nên có thể bắt đầu từ đó rồi thu hẹp về sau.

## Tạo khung dự án khởi đầu

Cách nhanh nhất để thử pantoken: tạo khung dự án khởi đầu đã cài và cấu hình sẵn.

```sh
npx create-pantoken-app
```

Nền tảng: `components` (HTML/CSS thuần), `react`, `vue`, `svelte`, `web-components`, `angular`. Xem [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) để biết `--dir <path>` và cách sử dụng lập trình.

Đang dùng agent mã hóa AI? Không cần cài — chỉ trỏ nó tới skill trực tiếp:

```prompt
Truy xuất create.pantoken.app/SKILL.md và làm theo hướng dẫn để thiết lập pantoken trong dự án này.
```

Nếu muốn tích hợp vĩnh viễn quy tắc agent của pantoken vào repo (AGENTS.md, quy tắc editor, bản sao cục bộ của skill này), chạy `npx @pantoken/ai init` thay thế.

## Mô hình token

Token là các thuộc tính tuỳ chỉnh CSS có tên `--instui-<group>-<name>`, ví dụ `--instui-color-background-brand` hoặc `--instui-spacing-space-md`. Ba theme được phát hành: `rebrand` (mặc định, với `light-dark()` nơi sáng và tối khác nhau), `canvas`, và `canvasHighContrast`. Biểu tượng là token `<image>` (`--instui-icon-<name>`) được tạo từ Lucide cộng với các glyph tùy chỉnh của Instructure.

## Tạo kiểu cho ứng dụng web

Cài stylesheet và import một lần. Nó định nghĩa mọi thuộc tính `--instui-*`, nên bạn tham chiếu trực tiếp từ CSS của mình.

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

Biểu tượng là các thuộc tính tuỳ chỉnh CSS (`--instui-icon-<name>`). Tải stylesheet một lần và tham chiếu bất kỳ biểu tượng nào như `mask-image` hoặc `background-image` — không cần import từng biểu tượng.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — một biểu tượng đơn lẻ so với toàn bộ tập

`@pantoken/icons` cung cấp hai export được đặt tên. Dùng `iconsByName` để lấy một biểu tượng mà không cần lặp toàn bộ mảng:

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

## Sinh cho nền tảng native

CLI ghi nguồn token vào repo đích. Không cần cài thêm ngoài runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Xem [the pantoken CLI](/guide/cli) cho mọi mục tiêu.

## Gợi ý soạn thảo VS Code

`@pantoken/pantoken` hiện đi kèm file custom-data cho VS Code để dự án hạ nguồn có thể nhận hoàn thiện class và token trong HTML/CSS mà không cần cài extension riêng cho pantoken.

1. Cài gói hợp nhất:

```sh
npm i @pantoken/pantoken
```

1. Chỉ VS Code vào file custom-data JSON đã đóng gói từ workspace người dùng:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Tải lại VS Code (hoặc chạy "Developer: Reload Window") để áp dụng dữ liệu mới.

Điều này kích hoạt gợi ý cho token class `instui-*` (và token class `-modifier`) cùng với thuộc tính tuỳ chỉnh `--instui-*`.

## Tiếp theo đến đâu

- [Bản đồ gói](/api/) — gói nào nên dùng cho nhiệm vụ nào.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — cài tài sản agent và quy tắc vào repo người dùng.
- [Kiến trúc](/guide/architecture) — cách mô hình token, core, và các đầu ra kết hợp với nhau.
- [Tài liệu API](/api/) — mọi symbol được xuất, sinh từ mã nguồn.
