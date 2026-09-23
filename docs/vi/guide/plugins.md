# Plugins

Một plugin pantoken mở rộng đầu ra token hoặc CSS mà không cần fork gói. Xây dựng plugin bằng `definePlugin` từ `@pantoken/plugin-kit`, sau đó truyền nó cho `buildTokens` hoặc `toCss`.

## Tạo plugin

Cung cấp cho `definePlugin` các hook bạn hiện thực hóa. Nó trả về một plugin bình thường, được gắn nhãn với các năng lực suy ra từ những hook đó. Một plugin có thể mở rộng IR (`tokens`, `icons`), đầu ra CSS (`css`), hoặc cả hai.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Đăng ký theo năng lực

`buildTokens` và `toCss` chạy `checkPlugins` trên các plugin bạn truyền vào. Chúng cảnh báo — không bao giờ ném lỗi — khi một plugin không có hook phù hợp cho giai đoạn nó được đăng ký, vì vậy một plugin chỉ dành cho token được truyền cho `toCss` sẽ bị bỏ qua kèm thông báo thay vì im lặng không làm gì.

## Ghép nối plugin

Xây dựng chồng lên một plugin khác với `extendPlugin`, hoặc kết hợp các plugin ngang hàng với `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Các hook cùng giai đoạn có thể ghép: `tokens` chạy base rồi chạy phần thêm, `css` hợp nhất hai đóng góp, và `icons` chạy cả hai.

## Xác thực đầu ra của plugin

Chạy các kiểm tra drift chia sẻ từ `@pantoken/utils` trên đầu ra của chính plugin trong bài test của nó, để một lỗi đánh máy hoặc token bị đổi tên sẽ thất bại nhanh và cục bộ:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Các plugin được đóng gói

- `@pantoken/plugin-simple-icons` — gắn nhãn biểu tượng từ simple-icons, đăng ký như token icon.
- `@pantoken/plugin-lucide-lab` — biểu tượng Lucide Lab, đăng ký như token hình ảnh `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo sản phẩm Instructure dưới dạng SVG, data URI, và token hình ảnh `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — một plugin PostCSS (không phải plugin pantoken) loại bỏ
  các custom property không dùng tới khỏi stylesheet.

Registry của Lucide Lab có thể được nạp theo lazy, sau đó truyền cho hook token đồng bộ:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Một vài thứ từng là plugin giờ được giao kèm trong `@pantoken/components`, vì nhiều component cần chúng sẵn: bóng nâng (elevation) (`--instui-elevation-*`, trong `components.css`), vòng focus-outline
(in trong `base.css` — mọi phần có thể nhận focus sẽ được áp dụng khi pantoken kiểm soát trang), và font thương hiệu Instructure (Atkinson Hyperlegible Next: `base.css` áp dụng `--instui-font-family-base`; tuỳ chọn `@pantoken/components/fonts.css` nạp các woff2 `@font-face`).

Xem [API reference](/api/) cho các export của từng plugin.
