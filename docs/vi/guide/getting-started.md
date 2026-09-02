# Bắt đầu

pantoken lấy các design token và biểu tượng của Instructure UI, resolve chúng một lần, và biến mô hình đó thành các gói cho nhiều nền tảng: stylesheet thuần, SCSS và Less, React và Vue và Svelte, Tailwind và Panda, native Swift và Kotlin, WordPress và Drupal, Figma, và hơn thế nữa.

Cài gói nhỏ nhất phù hợp với nhiệm vụ của bạn. Mọi thứ cũng được re-export bởi gói hợp nhất `pantoken`, vì vậy có thể bắt đầu từ đó rồi thu hẹp sau.

## Tạo khung dự án khởi đầu

Cách nhanh nhất để thử pantoken: scaffold một dự án khởi đầu đã cài và nối sẵn.

```sh
npx create-pantoken-app react
```

Nền tảng: `components` (HTML/CSS thuần), `react`, `vue`, `svelte`, `web-components`, `angular`. Xem [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) cho `--dir <path>` và việc sử dụng theo chương trình.

Sử dụng agent mã hóa AI? Không cần cài — chỉ trỏ nó tới skill trực tiếp:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

Hoạt động tương tự với Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, và Amazon Q Developer CLI — thay `claude` bằng `gemini`, `agent`, `codex`, `copilot -p`, hoặc `q chat`. Nếu muốn nối quy tắc agent của pantoken vào repo vĩnh viễn (AGENTS.md, quy tắc editor, một bản sao local của skill này), chạy `npx @pantoken/ai init` thay vào đó.

## Mô hình token

Tokens là CSS custom properties có tên `--instui-<group>-<name>`, ví dụ `--instui-color-background-brand` hoặc `--instui-spacing-space-md`. Ba theme được đóng gói: `rebrand` (mặc định, với `light-dark()` nơi light và dark khác nhau), `canvas`, và `canvasHighContrast`. Biểu tượng là các token `<image>` (`--instui-icon-<name>`) được suy ra từ Lucide cộng với các glyph tùy chỉnh của Instructure.

## Tạo style cho ứng dụng web

Cài stylesheet và import nó một lần. Nó định nghĩa mọi thuộc tính `--instui-*`, vì vậy bạn tham chiếu trực tiếp từ CSS của mình.

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

## Sử dụng biểu tượng ở bất cứ đâu

Web component hoạt động trong bất kỳ framework nào, không cần port.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### Tokens CSS

Biểu tượng là CSS custom properties (`--instui-icon-<name>`). Tải stylesheet một lần và tham chiếu bất kỳ biểu tượng nào như một `mask-image` hoặc `background-image` — không cần import theo từng biểu tượng.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — một biểu tượng riêng lẻ vs. toàn bộ tập

`@pantoken/icons` xuất hai export có tên. Dùng `iconsByName` để kéo một biểu tượng mà không cần lặp toàn bộ mảng:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

Dùng `icons` khi cần toàn bộ tập (ví dụ để xây một bộ chọn):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

Cả hai export đều load toàn bộ IR khi module khởi tạo — không có tree-shaking theo từng biểu tượng ở cấp này. Để tải nhẹ chỉ bằng CSS, dùng [CDN picker](/guide/cdn-picker) để tạo URL gộp chỉ cho những biểu tượng bạn cần.

## Sinh cho nền tảng native

CLI ghi nguồn token vào repo đích. Không cần cài thêm ngoài runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

Xem [the pantoken CLI](/guide/cli) cho mọi target.

## Gợi ý soạn thảo VS Code

`@pantoken/pantoken` hiện đi kèm các file VS Code custom-data để các dự án downstream có thể nhận hoàn thành class và token trong HTML/CSS mà không cần cài extension đặc thù cho pantoken.

1. Cài gói hợp nhất:

```sh
npm i @pantoken/pantoken
```

1. Trỏ VS Code tới custom-data JSON được đóng gói từ workspace consumer của bạn:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. Reload VS Code (hoặc chạy "Developer: Reload Window") để áp dụng dữ liệu mới.

Điều này kích hoạt gợi ý cho các token lớp `instui-*` (và token lớp `-modifier`) cùng các custom properties `--instui-*`.

## Đi đâu tiếp theo

- [Bản đồ gói](/guide/packages) — nên dùng gói nào cho nhiệm vụ gì.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — cài tài sản và quy tắc agent vào repo consumer.
- [Kiến trúc](/guide/architecture) — cách mô hình token, core, và outputs khớp với nhau.
- [Tham chiếu API](/api/) — mọi symbol export, được sinh từ nguồn.
