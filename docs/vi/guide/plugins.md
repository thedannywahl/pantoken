# Plugin

Một plugin pantoken mở rộng đầu ra token hoặc CSS mà không cần fork package. Xây dựng nó với
`definePlugin` từ `@pantoken/plugin-kit`, rồi truyền nó cho `buildTokens` hoặc `toCss`.

## Tạo plugin

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

## Đăng ký nhận biết khả năng

`buildTokens` và `toCss` chạy `checkPlugins` trên các plugin bạn truyền vào. Nó cảnh báo — nó không bao giờ ném —
khi một plugin không có hook phù hợp cho giai đoạn mà nó được đăng ký, vì vậy một plugin chỉ token được truyền
cho `toCss` sẽ bị bỏ qua với một chú thích thay vì im lặng không làm gì.

## Kết hợp plugin

Xây dựng trên một plugin khác với `extendPlugin`, hoặc kết hợp các plugin ngang hàng với `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Các hook cùng giai đoạn được ghép: `tokens` chạy phần cơ sở rồi phần bổ sung, `css` hợp nhất hai
đóng góp, và `icons` chạy cả hai.

## Xác thực đầu ra của plugin

Chạy các kiểm tra drift chung từ `@pantoken/utils` trên đầu ra của chính plugin trong test của nó, để một
lỗi đánh máy hoặc token bị đổi tên sẽ thất bại nhanh và cục bộ:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Các plugin được đóng gói

- `@pantoken/plugin-simple-icons` — gắn nhãn icon từ simple-icons, đăng ký như token icon.
- `@pantoken/plugin-lucide-lab` — Lucide Lab icons, đăng ký như các `--instui-icon-*` image token.
- `@pantoken/plugin-logos` — logo sản phẩm Instructure dưới dạng SVG, data URI, và `--instui-logo-*`
  image token.
- `@pantoken/plugin-prune-custom-props` — một plugin PostCSS (không phải plugin pantoken) loại bỏ
  custom properties không dùng đến khỏi stylesheet.
- `@pantoken/plugin-custom-theme-colors` — đổi thương hiệu trang bằng cách đặt một thuộc tính
  (`data-pantoken-color`) thành một trong 13 palette, hoặc thành `custom` cho bất kỳ hex thương hiệu nào. Xem
  [Màu chủ đề](#theme-colors).

Đăng ký Lucide Lab có thể được nạp lười, rồi truyền cho hook token đồng bộ:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Một vài thứ từng là plugin giờ đã được đóng gói trong `@pantoken/components`, vì nhiều component cần
chúng sẵn sàng: bóng nâng (elevation shadows) (`--instui-elevation-*`, trong `components.css`), vòng viền focus-outline
(trong `base.css` — mọi phần có thể nhận focus sẽ có khi pantoken sở hữu trang), và font thương hiệu Instructure
(Atkinson Hyperlegible Next: `base.css` áp dụng `--instui-font-family-base`; tùy chọn `@pantoken/components/fonts.css` nạp các `@font-face` woff2s).

## Màu chủ đề {#theme-colors}

`@pantoken/plugin-custom-theme-colors` phát ra một khối `[data-pantoken-color="…"]` cho mỗi palette
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Mỗi khối trỏ các nguyên thủy thương hiệu (`--instui-primitive-color-navy-*` và `-blue-*`)
vào palette đã chọn. Nó cũng tái-phát sinh các bề mặt thương hiệu mà upstream đã làm phẳng thành hex nguyên mẫu,
giữ lại alpha đã nướng của chúng thông qua `color-mix()`. Màu trạng thái ngữ nghĩa, điểm nhấn xanh rõ ràng, và
bóng nâng vẫn giữ nguyên. Thử nó trong demo
[theming dựa trên swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Màu thương hiệu tùy chỉnh

Đặt `data-pantoken-color="custom"` để đổi thương hiệu từ bất kỳ hex nào, chẳng hạn như màu chính mà một quản trị viên Canvas
nhập vào Trình chỉnh sửa Chủ đề. pantoken sẽ suy ra một thang `--instui-primitive-color-custom-*` đầy đủ 10–200
từ nó:

1. **Đường cong tham chiếu.** Mục tiêu độ sáng của mỗi bước là trung bình độ sáng OKLCH của 13
   palette ở bước đó, với 0 cố định tại trắng và 210 tại đen. Vì vậy khoảng cách của thang tùy chỉnh khớp với các palette được phát hành.
2. **Mỏ neo.** Giá trị nhập rơi vào bước có độ sáng mục tiêu gần với độ sáng của nó nhất, rồi chụp về
   độ sáng chính xác đó. `#cccccc` trở thành `custom-40` tại `#c9c9c9`: gần với giá trị nhập, nhưng không
   luôn luôn giống hệt. "Gần nhất" có nghĩa là bước gần nhất trên đường cong, không phải màu palette hiện có gần nhất.
3. **Lấp đầy.** Mỗi bước khác giữ tông màu (hue) của giá trị nhập. Độ bão hòa của nó theo đường cong độ bão hòa trung bình của các palette so với mỏ neo, và chỉ giảm khi một màu rơi ra ngoài gamut sRGB.

Chỉ `#rgb` và `#rrggbb` được chấp nhận; bất kỳ thứ gì khác sẽ ném `TypeError`, nên một hex từ form
không thể chèn CSS.

Trong thời gian build, phát ra toàn bộ quy tắc với các nguyên thủy đã được suy ra đã khai báo sẵn:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Để chọn màu tại thời gian chạy mà không phát hành bộ token, tiền tính trước đường cong và quy tắc remap
tại thời gian build. Sau đó dùng entry không phụ thuộc `/scale` trong trình duyệt, và chỉ đặt 20
nguyên thủy đã được suy ra:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

Trình chọn chủ đề trên site docs, trình chỉnh sửa chủ đề Canvas, và demo ở trên đều hoạt động theo cách này.

Xem [tham chiếu API](/api/) cho các xuất khẩu của mỗi plugin.
