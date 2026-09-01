# Plugin

Một plugin pantoken mở rộng đầu ra token hoặc CSS mà không cần fork package. Bạn xây dựng nó với
`definePlugin` từ `@pantoken/plugin-kit`, sau đó truyền nó vào `buildTokens` hoặc `toCss`.

## Viết một plugin

Cung cấp cho `definePlugin` các hook bạn triển khai. Nó trả về một plugin bình thường, được gắn nhãn với
các khả năng suy ra từ những hook đó. Một plugin có thể mở rộng IR (`tokens`, `icons`), đầu ra CSS
(`css`), hoặc cả hai.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Đăng ký nhận biết năng lực

`buildTokens` và `toCss` chạy `checkPlugins` trên các plugin bạn truyền vào. Nó cảnh báo — không bao giờ ném —
khi một plugin không có hook phù hợp cho giai đoạn nó được đăng ký, vì vậy một plugin chỉ cho token được truyền
vào `toCss` sẽ bị bỏ qua với một ghi chú thay vì im lặng không làm gì.

## Kết hợp plugin

Xây dựng trên một plugin khác với `extendPlugin`, hoặc kết hợp các plugin ngang hàng với `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Các hook cùng giai đoạn hợp thành: `tokens` chạy base rồi thêm vào, `css` hợp nhất hai
đóng góp, và `icons` chạy cả hai.

## Xác thực đầu ra của plugin

Chạy các kiểm tra drift dùng chung từ `@pantoken/utils` trên đầu ra của plugin trong test của nó, để một
lỗi gõ hoặc đổi tên token sẽ thất bại nhanh và tại chỗ:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Các plugin được đóng gói

- `@pantoken/plugin-simple-icons` — gắn nhãn biểu tượng từ simple-icons, đăng ký như các token icon.
- `@pantoken/plugin-logos` — logo sản phẩm Instructure dưới dạng SVG, data URI, và `--instui-logo-*`
  token hình ảnh.
- `@pantoken/plugin-prune-custom-props` — một plugin PostCSS (không phải plugin pantoken) loại bỏ
  các custom property không dùng tới khỏi stylesheet.

Một vài thứ trước đây là plugin giờ được ship trong `@pantoken/components`, vì rất nhiều component cần
chúng ngay khi dùng: bóng nâng cao (elevation) (`--instui-elevation-*`, trong `components.css`), vòng
outline khi focus (trong `base.css` — mọi phần tử có thể nhận focus sẽ có khi pantoken quản lý trang), và phông chữ thương hiệu Instructure
(Atkinson Hyperlegible Next: `base.css` áp dụng `--instui-font-family-base`; phần chọn tham gia
`@pantoken/components/fonts.css` tải các woff2 `@font-face`).

Xem [API reference](/api/) cho các export của từng plugin.
