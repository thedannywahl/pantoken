# Components

`@pantoken/components` cung cấp các kiểu component dựa trên lớp được xây dựng từ các token Instructure. Nhập
stylesheet và gắn thẻ vào markup của bạn — không cần framework.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> Ưa dùng custom elements hơn? `@pantoken/web-components` bọc cùng các kiểu này dưới dạng `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, và nhiều hơn nữa — xem
> [bản đồ package](/guide/packages).

## Quy ước

Các quy ước CSS trong package này dựa trên phiên bản sửa đổi của [RSCSS](https://ricostacruz.com/rscss/index.html).

Modifiers là **key-value** — `-<prop>-<val>`, căn theo tên prop của InstUI — nên tự giải nghĩa: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. Các prop boolean là tên prop đơn thuần, sự hiện diện nghĩa là `true` (`-has-shadow`, `-clickable`); một boolean mặc định-bật khi tắt sẽ đảo nghĩa (`-without-background`, `-without-border`). Kích thước chấp nhận cả cách viết ngắn và dài (`-size-sm` = `-size-small`). Khi một tên lệch so với InstUI, lớp theo ngữ nghĩa InstUI vẫn hoạt động nhưng bị deprecated (ví dụ `-variant-info` → dùng `-color-info`).

### Ví dụ

Component React của Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken components:

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

Với prop `timeout` của InstUI, đặt custom property đơn vị-không `--timeout` theo mili-giây và tải interaction Alert. Giá trị dương lên lịch đóng; `0` (mặc định) giữ alert ở
nguyên vị. Thêm các lớp `instui-transition -fade-entered` của tiện ích `transition` cho fade của InstUI; bỏ
chúng nếu muốn gỡ bỏ ngay lập tức. Interaction điều khiển trạng thái `-fade-exiting` và phát một sự kiện `dismiss` có thể hủy, bong bóng trước khi gỡ, nên ứng dụng có thể gọi `preventDefault()` để giữ
alert còn mounted.

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

Thanh tiến độ chấp nhận thang đo tùy ý thông qua `--min` (`0` theo mặc định), `--value`, và `--max`
(`100` theo mặc định), với các bí danh bị deprecated `--value-now` và `--value-max`. Thêm `-should-animate`
để áp dụng chuyển tiếp nửa giây của InstUI mỗi khi giá trị thay đổi. `.value` nằm cạnh `.bar` như
một con của root; thêm `-render-value-inside` để render nó phía trên track, căn về đầu,
thay vào đó (style để dễ đọc trên màu meter). Dùng native `<progress>` cho
phạm vi bắt đầu tại không và `<meter>` khi minimum khác không; web components chọn giữa chúng
tự động từ thuộc tính `min`. InstUI không có trạng thái indeterminate, nên `<progress>`
thiếu thuộc tính `value` là một phỏng đoán chỉ dành cho pantoken: `progress-bar` hoạt ảnh `.bar` như một
đoạn trượt và `progress-circle` quay vòng ở một cung cố định, cả hai đều ẩn `.value`.

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

Các vòng tiến độ (progress circles) chấp nhận cùng thang đo tùy ý thông qua `--min`, `--value`, và `--max`.
`--value-now` và `--value-max` vẫn tồn tại như các bí danh chức năng bị deprecated. Thêm `-should-animate` và
tải bundle interaction focused để tái tạo animation mount của InstUI; `--animation-delay` là
một độ trễ đơn vị-không tính theo mili-giây. Viết cách `-should-animate-on-mount` và
`-shold-animate-on-mount` bị deprecated vẫn là các bí danh chức năng.

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

Mỗi lớp được namespace `instui-` theo mặc định. Xây một stylesheet với tiền tố riêng — hoặc không sử dụng — bằng cách
truyền `prefix` cho bất kỳ builder nào. Giá trị falsy nào (`null`, `undefined`, `""`, hoặc bỏ qua) sẽ loại bỏ hoàn toàn
tiền tố, nên bạn có thể viết `class="heading -level-h1"` thay vì `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

Các modifiers tiền tố-dấu-gạch ngang (`.-color-secondary`, `.-level-h1`) không thay đổi dù thế nào. Các
stylesheet được đóng gói bởi package giữ tiền tố `instui`.

## Cơ sở

`base.css` là một reset tùy chọn áp dụng các mặc định toàn trang từ token: `box-sizing`, một
reset `body`, bề mặt trang, màu chữ và font cơ sở, `color-scheme` (để `light-dark()` tokens
và controls native theo theme), và một liên kết cơ bản. Tải nó một lần, trước các sheet component và prose,
khi pantoken sở hữu trang.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

Bỏ qua khi nhúng component vào host đã có theme cho `html` và `body` —
reset sơn lên bề mặt trang, nên bạn không muốn nó tranh chỗ host. Mọi thứ nó đặt dùng
selectors `:where()` có specificity thấp, nên quy tắc của bạn luôn thắng.

`base.css` _áp dụng_ font thương hiệu (`font-family: var(--instui-font-family-base)`, với fallback hệ thống); để _tải_ nó, nhập sheet tùy chọn `fonts.css` — các quy tắc `@font-face` cho Atkinson Hyperlegible
Next, trỏ tới các woff2 được đóng gói trong package. Nó tách riêng vì các mặt chữ ~350 kB và
tự-host fonts là một lựa chọn có chủ đích.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Nội dung cho trình đọc màn hình

<p>Có một thông điệp ẩn sau câu này.<span class="instui-screen-reader-content">Chỉ trình đọc màn hình mới thông báo điều này.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` ẩn một phần tử về mặt thị giác trong khi giữ nó trong cây truy cập
— cho nhãn và văn bản trạng thái mà công nghệ hỗ trợ nên đọc nhưng thiết kế không nên hiển thị.

## Tiện ích

`utilities.css` là một lớp tùy chọn của các lớp chéo-ngành: một nguyên thủy `View`, khoảng cách trên thang token,
và override màu theo ngữ nghĩa. Khác với các lớp `-modifier` của component, những cái này dùng **hai dấu gạch ngang**
(`--mod`) nên chúng không bao giờ trùng tên với modifiers của component, và chúng áp dụng cho bất kỳ
phần tử nào — trần, hoặc ghép lên một component.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Bề mặt accent-blue với văn bản on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">Căn giữa với mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` là `View` của InstUI. Nó là nền để chồng spacing và màu lên, và nó
mang các modifiers key-value cho các prop trực quan của chính nó để bạn không phải dùng utilities:
`-background-*` (các bề mặt của nó), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, và `-cursor-*` — đây là các
modifiers một-dấu-gạch của `view` riêng, không liên quan tới double-dash utilities dưới đây. Các prop giá trị-tự-do
(width/height/inset) giữ ở inline styles; `margin`/`padding` dùng utilities spacing.

**Spacing** — các lớp theo từng cạnh trên thang spacing. Đọc chúng như `{m|p}{side}-{step}`: `m` cho
margin hoặc `p` cho padding (hoặc từ đầy đủ `margin`/`padding`), một tùy chọn cạnh logic, rồi một bước. Vậy `.--m-lg` và `.--margin-lg` cùng nghĩa, cũng như `.--pt-md` và `.--paddingt-md`.

- Các cạnh: none (tất cả), `t`/`b` (bắt đầu/ kết thúc block), `s`/`e` (bắt đầu/ kết thúc inline), `x`/`y` (trục inline/block). Các cạnh logic giữ đúng trong layout phải-trái.
- Các bước: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, cộng `auto` chỉ cho margin.

Kết hợp chúng cho shorthand `margin="small auto large"` của InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — các override theo ngữ nghĩa vẫn ở trên palette: `.--bg-<name>` (nền),
`.--text-<name>` (màu chữ), và `.--border-<name>` (màu viền). Mỗi `<name>` là một
token màu theo ngữ nghĩa — các ý định (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) cộng với palette `accent-*` (`accent-blue`, `accent-green`, và cứ như vậy). Một tên chỉ tồn tại nếu token đó có trong gia đình, nên `text-brand` không phải là một lớp — văn bản không có token brand. Không có cách nào tới primitive hay hex tùy ý, và mọi override đều tuân theo theme.

**Gia đình token** — mỗi gia đình "một token, một thuộc tính" có một lớp cho mỗi token, đặt theo tên token. Kết hợp thoải mái:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (và `-depth1`…`-card`) → `box-shadow`

Mỗi lớp chỉ đặt duy nhất thuộc tính của nó, nên `border-width`/`border-radius` cần một màu `border-*` và một kiểu viền
để thật sự hiển thị viền. Những cái này dùng tên token đầy đủ (`.--border-radius-md`), trong khi
các helper màu và spacing phía trên dùng alias ngắn (`.--bg-brand`, `.--mt-lg`) — alias là phím tắt tiện dụng; các lớp token là chữ-literal và toàn diện.

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) và `.--text-align-<value>` (`start`, `center`, `end`, `justify`) bao phủ các prop `display` và `textAlign` xuyên-ngành của InstUI (View, Button, Metric, Tabs, …) dưới dạng các lớp có thể kết hợp —
vậy chúng không phải modifiers riêng cho từng component.

Mọi lớp hai-dấu-gạch thắng ngầm định trong cascade so với cùng tên modifier một-dấu-gạch của component, bất kể thứ tự import stylesheet — xem [Quy ước Authoring](/conventions/authoring)
để biết cơ chế.

Mọi thứ ở đây là CSS thuần điều khiển bởi token `--instui-*`, nên nó theo kịp InstUI qua tầng token. Xem [API reference](/api/) cho `componentsCss` và các builders theo component.

## Overlays: dialog và popover

Các component overlay dùng primitives nền tảng native, nên chúng hành xử truy cập được với ít hoặc không cần
JavaScript.

**Modal** — đặt `.instui-modal` lên một native `<dialog>`. Nó được trap focus, `Esc`-để-đóng, và một
`::backdrop` miễn phí; backdrop được làm mờ với cùng token `--instui-component-mask-background-color`
như `.instui-mask` (thêm `-blur` để làm frosted). Mở và đóng bằng invoker commands — không cần script:

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

**Context view / popover** — đặt `.instui-context-view` lên một phần tử `[popover]` và chuyển trạng thái bằng
`popovertarget`. Nó ngồi trên layer trên cùng và bị đóng nhẹ khi nhấp ngoài hoặc `Esc`, cũng không cần script:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — đặt `.instui-drawer-layout` trên một root layout với con `.tray` và `.content`.
Thêm thuộc tính `open` (hoặc `-open`) để tiết lộ tray, và dùng `placement="end"`
(hoặc `-placement-end`) để ghim nó về phía inline-end — vị trí được giải quyết qua các thuộc tính logic
`inset-inline-*`/`flex-direction`, nên nó tự lật dưới `dir="rtl"` mà không cần
quy tắc thêm. Bundle interaction focused thêm routing Invoker command và chuyển overlay mode
(`should-overlay-tray`) khi chiều rộng vượt ngưỡng `--drawer-layout-min-width` (mặc định
`--instui-breakpoints-sm`, rồi `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` dành cho overlays trong luồng (một spinner trên card); `::backdrop`
của modal bao phủ trường hợp modal.

Cả hai mẫu này cũng được gói dưới dạng custom elements có behavior trong `@pantoken/web-components`:
`<instui-modal open>` (một `<dialog>` điều khiển bởi thuộc tính `open`) và `<instui-context-view>` (một
popover native).

Hỗ trợ trình duyệt: popover API và `popovertarget` là Baseline 2024; invoker commands
(`command`/`commandfor`) là Baseline 2025, nên trên các trình duyệt cũ hơn hãy nối các nút tới `dialog.showModal()`
như một fallback một dòng. Định vị popover cạnh trigger dùng CSS anchor positioning khi được hỗ trợ (Chromium); nơi khác nó căn giữa trong layer trên cùng.

## Forms

**FormField** — `.instui-form-field` là một wrapper CSS-Grid bố trí label, control, và bất kỳ
message nào. Đặt nó lên một `<label>` để label liên kết với control một cách native. Nó có ba vùng lưới — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (mặc định) xếp chồng các vùng; `-layout-inline` đặt label bên cạnh control (tùy chỉnh
bằng `-label-align-{start,end}` và `-v-align-{top,middle,bottom}`). `-readonly` đổi màu label.

Dấu hoa thị **bắt buộc** xuất hiện khi field được yêu cầu bởi _hoặc_ lớp `-required` _hoặc_ một
control native `required` bên trong nó — nên bạn chỉ cần đặt `required` trên input và dấu sẽ hiển thị.
Nó mang tính trang trí (một `::after` trên label, nằm ngoài cây truy cập); kết hợp nó với chú thích như
"fields marked \* are required" trừ khi form đã rõ ràng.

**FormFieldGroup** — `.instui-form-field-group` gom các trường liên quan trong một `<fieldset>` với
một mô tả `<legend>`. Nó chỉ là layout (không có token riêng): mặc định xếp chồng các trường;
`-layout-columns` / `-layout-inline` đặt chúng thành các cột phản hồi, với `-row-spacing-*` /
`-col-spacing-*` và `-v-align-*` để tinh chỉnh lưới.

**RadioInputGroup** — `.instui-radio-input-group` là cùng loại nhóm `<fieldset>`/`<legend>`,
chuyên cho radio. Vì các radio con chia sẻ một `name`, việc chọn là một-lựa-chọn-native —
nên một bộ toggle buttons hành xử như một control duy nhất, không phải các nút rời rạc. `-variant-simple` (mặc định) bố trí
radio tiêu chuẩn (`-layout-columns`/`-inline` đặt chúng thành một hàng); `-variant-toggle` nối các
nút `.instui-radio.-variant-toggle` con thành một control phân đoạn (viền gộp,
đầu tròn):

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

**Messages** — `.instui-form-field-messages` là container; mỗi `.instui-form-field-message` mang một
`-type-*`: `-type-hint` (xám, mặc định), `-type-error` (chữ đỏ + glyph circle-alert), `-type-success`
(chữ xanh + glyph circle-check), và `-type-screenreader-only` (bị cắt về mặt hiển thị, vẫn được thông báo).
Các glyphs tô bằng `currentColor`, nên luôn khớp màu message. `-type-new-error` là một
bí danh deprecated của `-type-error`. Nối container với control bằng `aria-describedby`, và đặt
`aria-invalid` lên control khi có lỗi.

Trong một FormField, một message `-type-error` tuân theo validation phía client: nó ẩn cho đến khi
control của field `:user-invalid` (native, sau khi người dùng tương tác) — hoặc bạn ép nó bằng `-invalid`
trên `.instui-form-field` (cho lỗi phía server). Một `.instui-form-field-messages` độc lập (không nằm trong
field) không bị ảnh hưởng. Vòng focus của control tương ứng: danger khi `:user-invalid`/`-invalid`,
success khi `-success`.

**Controls văn bản** — `.instui-text-input` (native `<input>`), `.instui-text-area` (native `<textarea>`,
có thể thay đổi kích thước), và `.instui-simple-select` (native `<select>` có caret) chia sẻ một diện mạo và cùng
các trạng thái: `-invalid` (viền lỗi), `-success` (viền thành công), `-readonly`, native `:disabled`, và
`-size-{sm,md,lg}`. Cho icon đầu/cuối (InstUI's `renderBeforeInput`/`renderAfterInput`), bọc
input trong `.instui-input-group` và thêm slot `.before`/`.after` (một glyph `-icon-*`); `-should-not-wrap`
giữ nó trên một dòng. `.instui-number-input` là facade đó cộng một cột spinner +/- `.arrows` (native
`type="number"`; nối các nút tới `stepUp()`/`stepDown()`). `.instui-range-input` là một styled
`input[type="range"]` mà giá trị của nó hiển thị trong một `.instui-range-input-value` bubble nghịch đảo. Cho một combobox rich với listbox popover, dùng `@instructure/ui` — thư viện này bao phủ các control native.

**Styled select dropdown (thử nghiệm)** — một `select.css` tùy chọn nâng cấp cùng
`.instui-simple-select` element: nó style dropdown mở (panel và từng option, với hover và
trạng thái selected) bằng mô hình CSS Customizable Select.

> [!WARNING]
> `select.css` phụ thuộc vào `appearance: base-select` / `::picker(select)`, điều này **thử nghiệm**
> (Chrome 135+, chưa phải Baseline). Nó được đóng gói như một sheet tùy chọn và mọi quy tắc đều được rào
> sau `@supports (appearance: base-select)`, nên nó không làm gì trên trình duyệt không hỗ trợ — control `.instui-simple-select` chỉ
> giữ nguyên select native cơ bản. Chỉ tải khi bạn muốn dropdown nâng cao và chấp nhận hỗ trợ hạn chế.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
