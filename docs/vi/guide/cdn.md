# CDN & phân phối

pantoken xuất bản mọi package lên npm, vì vậy bạn có thể kéo tokens, components và web components trực tiếp
từ CDN — không cần bước build, không cần bundler. Trang này bao gồm URL kết hợp CSS (với trình
xây dựng tương tác), cùng các web-component drop-in.

## Nền tảng token

Mỗi component pantoken đọc các thuộc tính tuỳ chỉnh `--instui-*` từ một bảng token trên trang. Có hai
biến thể được phát hành:

- `@pantoken/css/dist/style.lean.css` — nền tảng CDN được khuyên dùng. Nó chứa mọi token ngoại trừ
  bộ biểu tượng đầy đủ, nên khoảng 23 KB gzip.
- `@pantoken/css/dist/style.css` — bảng đầy đủ, bao gồm tất cả ~1,777 token ký tự biểu tượng
  (`--instui-icon-*`). Khoảng 140 KB gzip. Tải cái này nếu bạn tham chiếu biểu tượng rộng rãi qua
  `var(--instui-icon-*)`.

Thang elevation và các biến focus-ring nằm trong cả hai bảng, nên bóng và vòng focus hoạt động chỉ với
nền tảng được tải.

## Chọn components và biểu tượng

[trình chọn CDN tương tác](/guide/cdn-picker) xây dựng URL ghép jsDelivr cho CSS và các đoạn mã cho package JavaScript. Mở nó, chọn những gì bạn cần, và sao chép đầu ra đã tạo.

- **Tab Components** — chọn stylesheet cho từng component hoặc toàn bộ thùng `components.css`. Thêm base reset hoặc utilities spacing/color nếu cần.
- **Tab JS** — sao chép đoạn import ESM cho `@pantoken/interactions`.
- **Tab Icons** — chọn biểu tượng riêng lẻ từ bộ InstUI (~1,800 icons) hoặc từ Simple Icons (~3,300 glyph thương hiệu). Trình chọn xuất một URL kết hợp riêng cho các file CSS biểu tượng để bạn chỉ tải những biểu tượng thực sự dùng.
- **Tab Web Components** — xây dựng các đoạn `@pantoken/web-components` (đăng ký chọn lọc ESM hoặc bootstrap script cổ điển).

Mỗi file component nhỏ — phần lớn khoảng 2 KB. Một component có render biểu tượng (`alert`, `checkbox`,
và một vài cái khác) cần các glyph đó, nên trình tạo thêm `@pantoken/components/dist/component-icons.css` (khoảng
0.5 KB gzip — 11 biểu tượng mà bộ component sử dụng) mỗi khi bạn chọn bảng gọn. Bảng đầy đủ
đã chứa sẵn chúng.

### Thứ tự tải và phông chữ

Tải nền token trước, sau đó base reset tùy chọn, rồi các file component, và utilities ở cuối — chúng là utilities ghi đè, nên chỉ thực sự ghi đè quy tắc của component khi chúng xuất hiện
sau nó trong cascade. URL kết hợp ở trên đã sắp xếp chúng cho bạn. Phông chữ là ngoại lệ duy nhất:
`@pantoken/components/dist/fonts.css` trỏ tới các file font bằng đường dẫn tương đối, nên combine không thể viết lại
chúng — tải nó như `<link>` riêng:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Tất cả cùng lúc

Chọn **All components** trong trình chọn để chuyển sang thùng, hoặc trỏ trực tiếp tới nó (khoảng 141 KB
gzip) cùng với bảng token:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` đăng ký các phần tử tuỳ chỉnh `<instui-*>` không phụ thuộc framework. Chúng nhúng CSS riêng,
nhưng vẫn đọc token từ một bảng trên trang, nên cũng phải tải một nền token.

### ES modules (khuyến nghị)

CDN ESM phân giải phụ thuộc của package cho bạn. Điều này đăng ký mọi phần tử:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Dùng bảng token đầy đủ (hoặc bảng gọn cộng `component-icons.css`) để các phần tử render biểu tượng như
`<instui-alert>` tìm được glyph của chúng.

Để chỉ đăng ký một vài phần tử — và các phụ thuộc lồng của chúng — import `register` và truyền `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### Thẻ script cổ điển

Cho một drop-in không dùng modules, tải bản build IIFE. Nó đóng gói phụ thuộc và tự đăng ký mọi
phần tử khi tải, cung cấp một global `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

Nó lớn hơn so với đường dẫn ESM — nó nhúng `@pantoken/components` và `@pantoken/icons` — nên chỉ dùng
khi không thể dùng modules.

## Ghim phiên bản

Các URL ở trên — và những URL mà trình chọn tạo — theo dõi release mới nhất. Ghim một major (hoặc chính xác)
phiên bản cho production — ví dụ `@pantoken/css@0` — để nâng cấp không gây bất ngờ.
