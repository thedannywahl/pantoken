# Thành phần

`@pantoken/components` cung cấp các kiểu thành phần theo lớp được xây dựng từ các token Instructure. Nhập stylesheet và gắn thẻ vào markup của bạn — không cần framework.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Thích phần tử tùy chỉnh? `@pantoken/web-components` bọc cùng các kiểu này dưới dạng `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, và nhiều hơn — xem [bản đồ gói](/api/).

## Quy ước

Các quy ước CSS trong gói này dựa trên phiên bản sửa đổi của [RSCSS](https://ricostacruz.com/rscss/index.html).

Các modifier là **khóa-giá trị** — `-<prop>-<val>`, căn theo tên prop của InstUI — nên chúng tự diễn đạt: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Các prop boolean chỉ là tên prop, sự hiện diện có nghĩa là `true` (`-has-shadow`, `-clickable`); một boolean mặc định bật mà bị tắt sẽ đảo nghĩa (`-without-background`, `-without-border`). Kích thước chấp nhận cả dạng ngắn và dài (`-size-sm` = `-size-small`). Khi một tên lệch so với InstUI, lớp ngữ nghĩa InstUI vẫn hoạt động nhưng bị đánh dấu không khuyến khích (ví dụ `-variant-info` → dùng `-color-info`).

### Ví dụ

Thành phần React của Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

thành phần pantoken:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

Với prop `timeout` của InstUI, đặt biến tùy chỉnh không đơn vị `--timeout` theo mili giây và tải interaction Alert. Giá trị dương lên lịch đóng; `0` (mặc định) giữ alert ở nguyên vị trí. Thêm các lớp `instui-transition -fade-entered` của tiện ích `transition` để có hiệu ứng fade của InstUI; bỏ qua chúng để loại bỏ ngay lập tức. Interaction điều khiển trạng thái `-fade-exiting` và phát một sự kiện `dismiss` có thể hủy, nổi bong bóng trước khi loại bỏ, vì vậy ứng dụng có thể gọi `preventDefault()` để giữ alert gắn.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

Thanh tiến trình chấp nhận thang đo tùy ý qua `--min` (`0` theo mặc định), `--value`, và `--max` (`100` theo mặc định), với các bí danh `--value-now` và `--value-max` đã bị deprecate. Thêm `-should-animate` để áp dụng chuyển tiếp nửa giây của InstUI mỗi khi giá trị thay đổi. `.value` nằm bên cạnh `.bar` như một con của root; thêm `-render-value-inside` để render nó lên trên track, căn về đầu thay vào đó (style để dễ đọc trên màu meter). Dùng `<progress>` gốc cho phạm vi bắt đầu từ không và `<meter>` khi minimum khác không; web components sẽ tự chọn giữa chúng dựa trên thuộc tính `min`. InstUI không có trạng thái indeterminate, nên một `<progress>` thiếu thuộc tính `value` là phán đoán tối ưu của pantoken: `progress-bar` hoạt ảnh `.bar` như một đoạn trượt và `progress-circle` xoay vòng của nó ở một cung cố định, cả hai ẩn `.value`.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

Vòng tiến trình chấp nhận cùng các thang đo tùy ý qua `--min`, `--value`, và `--max`. `--value-now` và `--value-max` vẫn tồn tại như các bí danh chức năng đã deprecate. Thêm `-should-animate` và tải bundle interaction focused để tái tạo animation mount của InstUI; `--animation-delay` là một độ trễ đơn vị không có giá trị (mili giây). Các cách viết `-should-animate-on-mount` và `-shold-animate-on-mount` đã deprecate vẫn là các bí danh chức năng.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## Tiền tố lớp

Mỗi lớp đều có namespace `instui-` theo mặc định. Xây stylesheet với tiền tố của riêng bạn — hoặc không có — bằng cách truyền `prefix` cho bất kỳ builder nào. Bất kỳ giá trị falsy nào (`null`, `undefined`, `""`, hoặc bỏ qua) sẽ loại bỏ hoàn toàn tiền tố, vì vậy bạn có thể viết `class="heading -level-h1"` thay vì `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Các modifier có tiền tố dấu gạch ngang (`.-color-secondary`, `.-level-h1`) không đổi dù thế nào. Các stylesheet được đóng gói bởi gói giữ tiền tố `instui`.

## Cơ sở

`base.css` là reset tuỳ chọn áp đặt mặc định tài liệu toàn cục từ các token: `box-sizing`, một reset `body`, bề mặt trang, màu chữ và font cơ bản, `color-scheme` (vì vậy các token `light-dark()` và các control gốc theo theme), và một link cơ bản. Tải nó một lần, trước các component và prose sheets, khi pantoken quản lý trang.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Bỏ qua khi bạn embed component vào một host đã tự theme `html` và `body` — reset sơn lên bề mặt trang, nên bạn không muốn nó đấu với host. Mọi thứ nó đặt dùng selector `:where()` có độ specificity thấp, nên quy tắc của bạn luôn thắng.

`base.css` _áp dụng_ font thương hiệu (`font-family: var(--instui-font-family-base)`, với fallback hệ thống); để _tải_ nó, import tuỳ chọn `fonts.css` — quy tắc `@font-face` cho Atkinson Hyperlegible Next, trỏ tới các woff2 được đóng gói trong gói. Nó tách ra vì các font ~350 kB và tự host font là lựa chọn có chủ ý.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Nội dung cho trình đọc màn hình

<p>Có một thông điệp ẩn sau câu này.<span class="instui-screen-reader-content">Chỉ trình đọc màn hình mới đọc phần này.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` ẩn phần tử về mặt hiển thị trong khi giữ nó trong cây hỗ trợ truy cập — cho labels và văn bản trạng thái mà công nghệ hỗ trợ nên đọc nhưng thiết kế không hiển thị.

## Tiện ích

`utilities.css` là một lớp tùy chọn gồm các lớp chéo: một primitive `View`, khoảng cách trên thang token, và ghi đè màu ngữ nghĩa. Khác với các lớp `-modifier` của component, những cái này dùng **hai dấu gạch ngang** (`--mod`) nên chúng không bao giờ va chạm với tên modifier của component, và chúng áp dụng cho bất kỳ phần tử nào — trần trụi, hoặc ghép lên một component.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Bề mặt accent-blue với chữ on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Căn giữa với mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` là `View` của InstUI. Nó là nền tảng để bạn chồng spacing và màu lên, và nó mang các modifier khóa-giá trị cho các prop trực quan của chính nó nên bạn không phải dùng utilities: `-background-*` (các bề mặt của nó), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, và `-cursor-*` — đây là các modifier một dấu gạch của `view`, không liên quan tới các tiện ích hai dấu gạch dưới. Các prop giá trị tự do (width/height/inset) giữ làm inline styles; `margin`/`padding` dùng các tiện ích spacing.

**Spacing** — lớp theo mỗi cạnh trên thang spacing. Đọc chúng như `{m|p}{side}-{step}`: `m` cho margin hoặc `p` cho padding (hoặc từ đầy đủ `margin`/`padding`), một kiểu logical side tùy chọn, rồi một bước. Vậy `.--m-lg` và `.--margin-lg` giống nhau, cũng như `.--pt-md` và `.--paddingt-md`.

- Các cạnh: none (tất cả), `t`/`b` (bắt đầu/kết thúc block), `s`/`e` (bắt đầu/kết thúc inline), `x`/`y` (trục inline/block). Các cạnh logic giữ đúng trong bố cục phải-trái.
- Các bước: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, cộng `auto` chỉ cho margin.

Kết hợp chúng cho shorthand `margin="small auto large"` của InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Màu** — ghi đè ngữ nghĩa nằm trên palette: `.--bg-<name>` (nền),
`.--text-<name>` (màu chữ), và `.--border-<name>` (màu viền). Mỗi `<name>` là một token màu ngữ nghĩa — các intent (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) cộng với palette `accent-*` (`accent-blue`, `accent-green`, v.v.). Một tên chỉ tồn tại nếu token đó có trong gia đình, nên `text-brand` không phải là một lớp — text không có token brand. Không có cách nào để truy cập primitive hoặc hex tùy ý, và mọi ghi đè đều theo theme.

**Gia đình token** — mỗi gia đình "một token, một thuộc tính" có một lớp cho mỗi token, đặt tên theo token. Kết hợp tự do:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (và `-depth1`…`-card`) → `box-shadow`

Mỗi lớp chỉ đặt thuộc tính của chính nó, nên `border-width`/`border-radius` cần một màu `border-*` và một kiểu viền để thực sự vẽ viền. Những cái này dùng tên token đầy đủ (`.--border-radius-md`), trong khi các helper màu và spacing phía trên dùng bí danh ngắn (`.--bg-brand`, `.--mt-lg`) — các bí danh là phím tắt tiện dụng; các lớp token là chữ nghĩa và đầy đủ.

**Bố cục** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) và `.--text-align-<value>` (`start`, `center`, `end`, `justify`) bao phủ các prop `display` và `textAlign` của InstUI (View, Button, Metric, Tabs, …) dưới dạng các lớp có thể kết hợp — nên chúng không phải là modifier dành cho từng component.

Mỗi lớp hai dấu gạch thắng theo cascade một cách quyết định so với cùng tên modifier một dấu gạch của component, bất kể thứ tự import stylesheet — xem [Quy ước Authoring](/conventions/authoring) cho cơ chế.

Mọi thứ ở đây đều là CSS thuần được điều khiển bởi các token `--instui-*`, nên nó theo kịp InstUI qua lớp token. Xem [tham chiếu API](/api/) cho `componentsCss` và các builder theo thành phần.

## Overlay: dialog và popover

Các component overlay sử dụng primitives nền tảng gốc, nên chúng hoạt động có tiếp cận với ít hoặc không cần JavaScript.

**Modal** — đặt `.instui-modal` lên một `<dialog>` gốc. Nó có focus trap, `Esc` để đóng, và một `::backdrop` miễn phí; backdrop được làm mờ bằng cùng token `--instui-component-mask-background-color` như `.instui-mask` (thêm `-blur` để làm băng mờ). Mở và đóng bằng invoker commands — không cần script:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — đặt `.instui-context-view` lên một phần tử `[popover]` và chuyển đổi nó bằng `popovertarget`. Nó nằm trên lớp trên cùng và đóng nhẹ khi click ngoài hoặc `Esc`, cũng không cần script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — đặt `.instui-drawer-layout` lên root bố cục với con `.tray` và `.content`. Thêm thuộc tính `open` (hoặc `-open`) để hiện tray, và dùng `placement="end"` (hoặc `-placement-end`) để neo nó về phía inline-end — vị trí được giải quyết qua các thuộc tính logic `inset-inline-*`/`flex-direction`, nên nó tự lật dưới `dir="rtl"` mà không cần quy tắc bổ sung. Bundle interaction focused thêm routing lệnh Invoker và chuyển chế độ overlay (`should-overlay-tray`) khi chiều rộng vượt `--drawer-layout-min-width` (mặc định `--instui-breakpoints-sm`, rồi `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` dành cho overlays trong flow (một spinner trên thẻ); `::backdrop` của modal dùng cho trường hợp modal.

Cả hai pattern cũng được bọc như các phần tử tùy biến hành vi trong `@pantoken/web-components`: `<instui-modal open>` (một `<dialog>` được điều khiển bởi thuộc tính `open`) và `<instui-context-view>` (một popover gốc).

Hỗ trợ trình duyệt: API popover và `popovertarget` là Baseline 2024; invoker commands (`command`/`commandfor`) là Baseline 2025, nên trên các trình duyệt cũ hơn hãy nối các nút tới `dialog.showModal()` như fallback một dòng. Định vị popover cạnh trigger dùng CSS anchor positioning khi được hỗ trợ (Chromium); ở nơi khác nó căn giữa trong lớp trên cùng.

## Biểu mẫu

**FormField** — `.instui-form-field` là wrapper CSS-Grid sắp xếp label, control, và bất kỳ message nào. Đặt nó lên một `<label>` để label liên kết với control một cách nguyên thủy. Nó có ba khu vực grid — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (mặc định) xếp chồng các khu vực; `-layout-inline` đặt label bên cạnh control (tinh chỉnh với `-label-align-{start,end}` và `-v-align-{top,middle,bottom}`). `-readonly` đổi màu label.

Dấu hoa thị **required** xuất hiện khi field được yêu cầu bởi _hoặc_ lớp `-required` _hoặc_ một control gốc `required` bên trong — nên bạn chỉ cần đặt `required` trên input và dấu sẽ hiển thị. Nó là trang trí (một `::after` trên label, ngoài cây truy cập); kết hợp nó với chú thích như "các trường có đánh dấu \* là bắt buộc" trừ khi biểu mẫu đã rõ ràng.

**FormFieldGroup** — `.instui-form-field-group` nhóm các field liên quan trong một `<fieldset>` với mô tả `<legend>`. Đây là layout thuần (không có token chuyên dụng): mặc định xếp chồng các field; `-layout-columns` / `-layout-inline` chuyển chúng thành các cột đáp ứng, với `-row-spacing-*` / `-col-spacing-*` và `-v-align-*` để tinh chỉnh grid.

**RadioInputGroup** — `.instui-radio-input-group` là cùng nhóm `<fieldset>`/`<legend>`, chuyên cho radios. Vì các radio con chia sẻ một `name`, lựa chọn là đơn chọn nguyên thủy — nên một bộ toggle buttons hoạt như một control duy nhất, không phải các nút rời rạc. `-variant-simple` (mặc định) sắp các radio tiêu chuẩn (`-layout-columns`/`-inline` chảy thành hàng); `-variant-toggle` nối các nút `.instui-radio.-variant-toggle` con thành một control phân đoạn duy nhất (viền thu gọn, đầu ngoài bo tròn):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Messages** — `.instui-form-field-messages` là container; mỗi `.instui-form-field-message` mang một `-type-*`: `-type-hint` (xám, mặc định), `-type-error` (chữ đỏ + glyph circle-alert), `-type-success` (chữ xanh + glyph circle-check), và `-type-screenreader-only` (bị cắt hiển thị, vẫn được thông báo). Các glyph được tô bằng `currentColor`, nên luôn khớp màu với message. `-type-new-error` là bí danh đã deprecate của `-type-error`. Nối container với control bằng `aria-describedby`, và đặt `aria-invalid` lên control khi có lỗi.

Bên trong FormField, một message `-type-error` theo validate phía client: nó ẩn cho tới khi control của field `:user-invalid` (nguyên thủy, sau khi người dùng tương tác) — hoặc bạn cưỡng chế nó với `-invalid` trên `.instui-form-field` (cho lỗi từ server). Một `.instui-form-field-messages` độc lập (không trong field) không bị ảnh hưởng. Vòng focus của control theo đó: nguy hiểm khi `:user-invalid`/`-invalid`, thành công khi `-success`.

**Controls văn bản** — `.instui-text-input` (gốc `<input>`), `.instui-text-area` (gốc `<textarea>`, có thể thay đổi kích thước), và `.instui-simple-select` (gốc `<select>` với caret) chia sẻ một kiểu nhìn và cùng trạng thái: `-invalid` (viền lỗi), `-success` (viền thành công), `-readonly`, `:disabled` gốc, và `-size-{sm,md,lg}`. Để có icon dẫn/trailing (InstUI's `renderBeforeInput`/`renderAfterInput`), bọc input trong `.instui-input-group` và thêm slot `.before`/`.after` (một glyph `-icon-*`); `-should-not-wrap` giữ nó trên một dòng. `.instui-number-input` là facade đó cộng một cột spinner +/- `.arrows` (gốc `type="number"`; nối các nút tới `stepUp()`/`stepDown()`). `.instui-range-input` là một `input[type="range"]` được style có giá trị hiển thị trong một bong bóng đảo `.instui-range-input-value`. Cho một combobox giàu tính năng với listbox popover, dùng `@instructure/ui` — thư viện này bao phủ các control gốc.

**Select được style (thử nghiệm)** — một `select.css` tuỳ chọn nâng cấp cùng phần tử `.instui-simple-select`: nó style dropdown mở (panel và từng option, với trạng thái hover và selected) dùng mô hình CSS Customizable Select.

> [!WARNING]
> `select.css` phụ thuộc `appearance: base-select` / `::picker(select)`, vốn **thử nghiệm**
> (Chrome 135+, chưa vào Baseline). Nó được đóng gói như một sheet tùy chọn riêng và mọi quy tắc đều được rào sau `@supports (appearance: base-select)`, nên nó không làm gì trên trình duyệt không hỗ trợ — control `.instui-simple-select` chỉ giữ kiểu select gốc. Chỉ tải khi bạn muốn dropdown nâng cao và chấp nhận hỗ trợ giới hạn.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
