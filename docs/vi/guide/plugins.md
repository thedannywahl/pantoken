# Plugins

Một plugin pantoken mở rộng đầu ra token hoặc CSS mà không phải fork một package. Xây dựng một plugin với
`definePlugin` từ `@pantoken/plugin-kit`, rồi truyền nó vào `buildTokens` hoặc `toCss`.

## Tạo plugin

Cung cấp cho `definePlugin` các hook bạn triển khai. Nó trả về một plugin thông thường, được đánh dấu bằng
các khả năng được suy ra từ những hook đó. Một plugin có thể mở rộng IR (`tokens`, `icons`), đầu ra CSS
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

## Đăng ký theo khả năng

`buildTokens` và `toCss` chạy `checkPlugins` trên các plugin bạn truyền vào. Nó cảnh báo — nó không bao giờ ném lỗi —
khi một plugin không có hook phù hợp với giai đoạn nó được đăng ký, nên một plugin chỉ token được truyền
vào `toCss` sẽ bị bỏ qua kèm theo một ghi chú thay vì im lặng không làm gì.

## Ghép (compose) plugin

Xây dựng dựa trên một plugin khác với `extendPlugin`, hoặc kết hợp các plugin ngang hàng với `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Các hook cùng giai đoạn ghép lại: `tokens` chạy base rồi chạy phần bổ sung, `css` hợp nhất hai
đóng góp, và `icons` chạy cả hai.

## Kiểm tra hợp lệ đầu ra plugin

Chạy các kiểm tra drift chung từ `@pantoken/utils` trên đầu ra của chính plugin trong test của nó, để một
lỗi gõ hoặc một token bị đổi tên sẽ gây lỗi nhanh và cục bộ:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Các plugin được đóng gói

- `@pantoken/plugin-simple-icons` — ký hiệu thương hiệu từ simple-icons, đăng ký như token icon.
- `@pantoken/plugin-lucide-lab` — icon Lucide Lab, đăng ký như token hình ảnh `--instui-icon-*`.
- `@pantoken/plugin-logos` — logo sản phẩm Instructure dưới dạng SVG, data URI, và token hình ảnh `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — một plugin PostCSS (không phải plugin pantoken) loại bỏ
  các custom property không dùng đến khỏi một stylesheet.
- `@pantoken/plugin-custom-theme-colors` — đổi thương hiệu một trang bằng cách đặt một thuộc tính
  (`data-pantoken-color`) thành một trong 13 bảng màu, hoặc thành `custom` cho bất kỳ hex thương hiệu nào. Xem
  [Màu chủ đề](#theme-colors).
- `@pantoken/plugin-custom-components` — điều khiển tùy chỉnh dựa trên token bao gồm SegmentedControl
  và SkeletonLoader.

### Segmented control

Sử dụng segmented control cho hai đến năm view hoặc bộ lọc liên quan. Mỗi lựa chọn là một radio native có nhãn trong một nhóm được đặt tên; đánh dấu một lựa chọn được checked ban đầu. Dùng tabs hoặc dropdown nếu các lựa chọn không vừa thoải mái, và dùng nhóm nút cho hành động thay vì lựa chọn. Kiểu `-size-md` là
mặc định, với `-size-sm` và `-size-lg` cho các ngữ cảnh chặt hơn và nổi bật hơn.

Import `@pantoken/plugin-custom-components/segmented-control.css` cho control và các nút overflow của nó. Dùng lớp `-icon-*` trên nhãn segment khi segment cần một glyph; helper tương tác cũng sẽ thăng lớp `-icon-*` từ input native lên bộ vẽ nhãn. Cung cấp cho fieldset một `aria-label` mô tả hoặc một legend hiển thị. Helper giữ nguyên thông báo radio native, thêm điều hướng bàn phím, và tùy chọn hiển thị một segment bị cắt mỗi lần nhấn mũi tên. Dùng điều khiển start/end hợp lý và nhãn nút truy cập được ở cả hai hướng:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

Import `@pantoken/interactions/segmented-control.iife.js` để đăng ký khi DOM sẵn sàng, hoặc gọi
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` từ `@pantoken/interactions`
và gọi `cleanup()` khi gỡ bỏ nó. CSS và lựa chọn radio native hoạt động không cần JS; các mũi tên overflow cần behavior. Mục được chọn sử dụng bóng thiết kế hai lớp từ các màu drop-shadow ngữ nghĩa; đó là một bóng mục-đang-kích-hoạt riêng biệt hơn là một composite `--instui-elevation-*` hiện có. Nút overflow sử dụng token elevation3 upstream
thông qua `--pantoken-segmented-overflow-shadow`.

### Skeleton loading

Đường dẫn con `skeleton-loader.css` định kiểu một hình dạng trang trí Text, Avatar, hoặc Image. Text chấp nhận
`-size-xxs` thông qua `-size-xxl`; Avatar và Image có kích thước trung bình. Mỗi `.skeleton-row` tùy chọn
thêm một dòng văn bản mà không thay đổi kích thước. Hiệu ứng shimmer CSS dừng sau ba lần quét 1.5 giây và
giữ tĩnh khi người dùng ưu tiên giảm chuyển động. Nó hoạt động trước khi JavaScript tải.

Đặt các hình dạng chỉ ở nơi nội dung phụ thuộc truy vấn sẽ xuất hiện, không ở trên điều hướng,
bộ lọc, tiêu đề, hoặc điều khiển đã biết từ server. Skeleton không phải là thanh tiến trình hay trạng thái bận hành động. Giữ
nội dung hiện có hiển thị trong khi làm mới nền; dùng spinner hoặc trạng thái bận trên nút cho hành động.

Ứng dụng cha chịu trách nhiệm markup loading, loaded, empty, và error. Cung cấp một khu vực trạng thái empty
mỗi trang và một alert empty riêng trong HTML server, cả hai **bên ngoài** vùng nội dung bận:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

Gọi behavior cấp cha khi trạng thái yêu cầu thay đổi. Nó cập nhật `aria-busy` và hai
thông báo đã tồn tại, nhưng nó không bao giờ thay thế nội dung hoặc di chuyển focus:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

Nếu dùng gói tương tác theo từng component thay vì import trực tiếp, phát một
sự kiện `pantoken:skeleton-state` trên phần tử `[data-skeleton-region]` với
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. Trì hoãn việc _hiển thị_
các placeholder trong 200–500ms cho các yêu cầu nhanh; behavior tự nó trì hoãn thông báo loading
khoảng 400ms. Trên các tải trang thụ động, để nguyên focus ở vị trí ban đầu. Chỉ di chuyển focus đến kết quả mới tải khi hành động của người dùng yêu cầu nó. Node trạng thái thông báo kết quả và trạng thái empty; node alert thông báo lỗi. Không kết hợp `aria-busy`, `role="status"`, và
`role="alert"` trên cùng một phần tử.

Registry của Lucide Lab có thể được tải trễ, sau đó chuyển cho hook token đồng bộ:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Một vài thứ từng là plugin giờ được đóng gói trong `@pantoken/components`, vì nhiều component cần
chúng sẵn theo mặc định: bóng elevation (`--instui-elevation-*`, trong `components.css`), vòng focus-outline
(trong `base.css` — mọi phần tử có thể focus đều nhận được khi pantoken quản lý trang), và font thương hiệu Instructure
(Atkinson Hyperlegible Next: `base.css` áp dụng `--instui-font-family-base`; tùy chọn `@pantoken/components/fonts.css` tải các
woff2s `@font-face`).

## Màu chủ đề

`@pantoken/plugin-custom-theme-colors` phát ra một khối `[data-pantoken-color="…"]` cho mỗi bảng màu
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). Mỗi khối hướng các primitive thương hiệu (`--instui-primitive-color-navy-*` và `-blue-*`)
vào bảng màu được chọn. Nó cũng tái suy ra các bề mặt thương hiệu mà upstream đã làm phẳng thành hex literal,
giữ lại alpha đã nướng thông qua `color-mix()`. Màu trạng thái ngữ nghĩa, điểm nhấn xanh rõ ràng, và
bóng elevation vẫn giữ nguyên. Thử trong
[ví dụ theming dựa trên swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### Màu thương hiệu tùy chỉnh

Đặt `data-pantoken-color="custom"` để đổi thương hiệu từ bất kỳ hex nào, như màu chính mà một quản trị Canvas
nhập vào trong Theme Editor. pantoken suy ra một thang `--instui-primitive-color-custom-*` đầy đủ từ 10–200
từ nó:

1. **Đường cong tham chiếu.** Mục tiêu lightness của mỗi bước là trung bình lightness OKLCH của 13
   bảng màu tại bước đó, với 0 cố định ở trắng và 210 ở đen. Vì vậy khoảng cách của thang tùy chỉnh
   khớp với các bảng màu được cung cấp.
2. **Neo.** Giá trị nhập được đặt trên bước có mục tiêu lightness gần nhất với chính nó, rồi được khớp
   về lightness chính xác đó. `#cccccc` trở thành `custom-40` tại `#c9c9c9`: gần với giá trị nhập, nhưng không
   luôn giống hệt. "Gần nhất" có nghĩa là bước gần nhất trên đường cong, không phải màu của bảng hiện có gần nhất.
3. **Lấp đầy.** Mỗi bước khác giữ hue của giá trị nhập. Độ bão hòa của nó theo đường cong trung bình của các bảng màu
   tương đối với neo, và chỉ giảm khi một màu rơi ra ngoài không gian sRGB.

Chỉ chấp nhận `#rgb` và `#rrggbb`; bất kỳ giá trị nào khác sẽ ném `TypeError`, nên một hex từ form
không thể inject CSS.

Ở thời điểm build, phát toàn bộ quy tắc với các primitive đã được suy ra và khai báo sẵn:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

Để chọn màu tại runtime mà không phải phát hành bộ token, tiền tính toán đường cong và quy tắc remap
trong thời gian build. Sau đó dùng entry `/scale` không phụ thuộc trong trình duyệt, và chỉ đặt 20
primitive đã suy ra:

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

Trình chọn theme của site docs, trình chỉnh sửa theme của Canvas, và ví dụ ở trên đều hoạt động theo cách này.

Xem [Tham chiếu API](/api/) cho các export của từng plugin.
