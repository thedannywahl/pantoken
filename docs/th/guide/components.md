# Components

`@pantoken/components` จัดส่งสไตล์คอมโพเนนต์แบบคลาสที่สร้างจากโทเค็นของ Instructure ให้นำเข้า
สไตล์ชีตแล้วแท็กมาร์กอัปของคุณ — ไม่ต้องการเฟรมเวิร์ก

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> ชอบ custom elements ไหม? `@pantoken/web-components` ห่อสไตล์เดียวกันไว้เป็น `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, และอื่น ๆ — ดูที่
> [package map](/guide/packages).

## Conventions

ข้อบังคับ CSS ในแพ็กเกจนี้อ้างอิงจากเวอร์ชันที่ปรับแก้ของ [RSCSS](https://ricostacruz.com/rscss/index.html)

Modifiers เป็นแบบ **key-value** — `-<prop>-<val>`, จัดแนวตามชื่อ prop ของ InstUI — ดังนั้นอ่านได้ด้วยตัวมันเอง:
`-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. prop แบบบูลีนคือตัวชื่อ prop เพียงอย่างเดียว ซึ่งการมีอยู่หมายถึง `true` (`-has-shadow`, `-clickable`); บูลีนที่เปิดเป็นค่าเริ่มต้นแล้วปิดจะกลับค่า (`-without-background`, `-without-border`). ขนาดรองรับการสะกดสั้นและยาวทั้งสองแบบ
(`-size-sm` = `-size-small`). เมื่อชื่อเบี่ยงเบนจาก InstUI คลาสเชิงความหมายของ InstUI ยังคงทำงาน
แต่ถูกเลิกใช้ (เช่น `-variant-info` → ใช้ `-color-info`).

### Example

คอมโพเนนต์ Instructure UI React:

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

สำหรับ prop `timeout` ของ InstUI ให้ตั้งค่าคุณสมบัติแบบกำหนดเอง `--timeout` ที่ไม่มีหน่วยเป็นมิลลิวินาทีและโหลด
การโต้ตอบ Alert ค่าบวกจะกำหนดการปิด; `0` (ค่าเริ่มต้น) จะปล่อยให้ alert อยู่
เพิ่มคลาส `instui-transition -fade-entered` ของยูทิลิตี้ `transition` สำหรับการเฟดของ InstUI; ไม่ต้องใส่
ถ้าต้องการลบทันที การโต้ตอบจะขับเคลื่อนสถานะ `-fade-exiting` และยิงเหตุการณ์ `dismiss` ที่ยกเลิกได้และลอยขึ้นก่อนการลบ เพื่อให้แอปสามารถเรียก `preventDefault()` เพื่อเก็บ
alert ไว้ได้

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

แถบความคืบหน้ารองรับสเกลใด ๆ ผ่าน `--min` (`0` เป็นค่าเริ่มต้น), `--value`, และ `--max`
(`100` เป็นค่าเริ่มต้น), พร้อมอีลิแอสที่ถูกเลิกใช้ `--value-now` และ `--value-max`. เพิ่ม `-should-animate`
เพื่อใช้การเปลี่ยนแปลงครึ่งวินาทีของ InstUI เมื่อค่ามีการเปลี่ยนแปลง `.value` นั่งคู่กับ `.bar` ในฐานะ
ลูกของรูท; เพิ่ม `-render-value-inside` เพื่อเรนเดอร์มันเหนือแทร็ก จัดชิดที่จุดเริ่มต้นของมัน
แทน (สไตล์ให้อ่านได้กับสีเมตร) ใช้ `<progress>` ดั้งเดิมสำหรับช่วงที่เริ่มที่ศูนย์และ `<meter>` เมื่อค่าต่ำสุดไม่ใช่ศูนย์; web components จะเลือกอัตโนมัติระหว่างพวกมันจากแอตทริบิวต์ `min` ของตน InstUI ไม่มีสถานะ indeterminate ดังนั้น `<progress>`
ที่ขาดแอตทริบิวต์ `value` เป็นการประมาณการณ์ของ pantoken: `progress-bar` เคลื่อนที่ `.bar` เป็น
เซกเมนต์เลื่อนและ `progress-circle` หมุนวงแหวนที่มุมคงที่ ทั้งคู่ซ่อน `.value`.

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

วงกลมความคืบหน้ารองรับสเกลใด ๆ เดียวกันผ่าน `--min`, `--value`, และ `--max`.
`--value-now` และ `--value-max` ยังคงเป็นอีลิแอสที่ถูกเลิกใช้ในเชิงฟังก์ชัน เพิ่ม `-should-animate` และ
โหลดแพ็กการโต้ตอบแบบมีโฟกัสเพื่อทำซ้ำแอนิเมชันการเมานต์ของ InstUI; `--animation-delay` เป็น
ความหน่วงเวลาเป็นมิลลิวินาทีแบบไม่มีหน่วย การสะกดที่ถูกเลิกใช้ `-should-animate-on-mount` และ
`-shold-animate-on-mount` ยังคงเป็นอีลิแอสที่ทำงานได้

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

## Class prefix

ทุกคลาสถูกนิมเนมสเปซเป็น `instui-` โดยค่าเริ่มต้น สร้างสไตล์ชีตด้วย prefix ของคุณเอง — หรือไม่มีเลย — โดย
ส่ง `prefix` ให้กับตัวสร้างใด ๆ ค่า falsy ใด ๆ (`null`, `undefined`, `""`, หรือการเว้นมัน) จะเอา
prefix ออกทั้งหมด ดังนั้นคุณสามารถเขียน `class="heading -level-h1"` แทน `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

ตัวแก้แบบมีขีดหน้าด้วย dash (`.-color-secondary`, `.-level-h1`) จะไม่เปลี่ยนไม่ว่าจะอย่างไร สไตล์ชีตที่จัดส่งโดยแพ็กเกจจะเก็บ prefix `instui` ไว้

## Base

`base.css` เป็นรีเซ็ตแบบ opt-in ที่ตั้งค่าเริ่มต้นเอกสารระดับโลกจากโทเค็น: `box-sizing`, รีเซ็ต `body`,
พื้นผิวเพจ, สีข้อความและฟอนต์ฐาน, `color-scheme` (ดังนั้น `light-dark()` โทเค็น
และคอนโทรลเนทีฟจะติดตามธีม), และลิงก์ฐาน โหลดมันครั้งเดียว ก่อนแผ่นคอมโพเนนต์และโปรสชีต
เมื่อ pantoken ครอบงำหน้า

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

ข้ามมันเมื่อต้องฝังคอมโพเนนต์เข้าไปในโฮสต์ที่จัดธีม `html` และ `body` ของตัวเองแล้ว —
รีเซ็ตจะทาสีพื้นผิวเพจ ดังนั้นคุณไม่ต้องการให้มันต่อสู้กับโฮสต์ ทุกอย่างที่มันตั้งใช้นั้นใช้
ตัวเลือกตัวเลือก `:where()` ที่มีความจำเพาะต่ำ ดังนั้นกฎของคุณชนะเสมอ

`base.css` _ใช้_ ฟอนต์แบรนด์ (`font-family: var(--instui-font-family-base)`, พร้อม fallback ระบบ);
เพื่อ _โหลด_ มัน ให้ import `fonts.css` แบบ opt-in — `@font-face` กฎสำหรับ Atkinson Hyperlegible
Next ชี้ไปที่ woff2s ที่จัดส่งในแพ็กเกจ แยกไว้เพราะฟอนต์มีขนาด ~350 kB และการโฮสต์ฟอนต์ด้วยตนเองเป็นการตัดสินใจโดยจงใจ

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## Screen reader content

<p>มีข้อความที่ซ่อนอยู่หลังประโยคนี้.<span class="instui-screen-reader-content">มีแต่ screen reader เท่านั้นที่จะประกาศ</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` ซ่อนองค์ประกอบทางสายตาในขณะที่เก็บไว้ใน accessibility tree
— สำหรับป้ายชื่อและข้อความสถานะที่เทคโนโลยีช่วยเหลือควรอ่านแต่การออกแบบไม่ควรแสดง

## Utilities

`utilities.css` เป็นเลเยอร์ opt-in ของคลาสข้ามตัด: พร็ิมิทีฟ `View`, ระยะห่างบนสเกลโทเค็น,
และการแทนสีเชิงความหมาย แตกต่างจากคลาส `-modifier` ของคอมโพเนนต์ ยูทิลิตี้เหล่านี้ใช้ **double
dash** (`--mod`) ดังนั้นจะไม่ชนกับชื่อ modifier ของคอมโพเนนต์ และสามารถนำไปใช้กับองค์ประกอบใด ๆ
เปล่า ๆ หรือประสมเข้ากับคอมโพเนนต์ได้

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">พื้นผิว accent-blue พร้อมข้อความบนสี</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">จัดกึ่งกลางด้วย mx-auto</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` คือ `View` ของ InstUI. มันคือฐานที่คุณวางระยะห่างและสีลงไป และมัน
มี modifiers แบบ key-value สำหรับ props ทางสายตาของตัวเองเพื่อให้คุณไม่ต้องพึ่งยูทิลิตี้:
`-background-*` (พื้นผิวของมัน), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, และ `-cursor-*` — เหล่านี้เป็น modifiers แบบ single-dash ของ `view` เอง
ไม่เกี่ยวกับ double-dash ยูทิลิตี้ด้านล่าง ค่า free-value props
(ความกว้าง/ความสูง/ตำแหน่ง) อยู่ใน inline styles; `margin`/`padding` ใช้ยูทิลิตี้ระยะห่าง

**Spacing** — คลาสต่อด้านบนสเกลระยะ อ่านเป็น `{m|p}{side}-{step}`: `m` สำหรับ
margin หรือ `p` สำหรับ padding (หรือตัวคำเต็ม `margin`/`padding`), ด้านตรรกะทางเลือก, แล้วตามด้วย
ขั้น ดังนั้น `.--m-lg` และ `.--margin-lg` เหมือนกัน เช่นเดียวกับ `.--pt-md` และ `.--paddingt-md`.

- ด้าน: none (ทั้งหมด), `t`/`b` (จุดเริ่ม/สิ้นสุดบล็อก), `s`/`e` (จุดเริ่ม/สิ้นสุดอินไลน์), `x`/`y` (แกนอินไลน์/บล็อก). ด้านตรรกะยังถูกต้องในเค้าโครงขวา-ไป-ซ้าย
- ขั้น: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, บวก `auto` สำหรับ margin เท่านั้น

ประกอบพวกมันเป็นทางย่อ `margin="small auto large"` ของ InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — การแทนสีเชิงความหมายที่ยังคงอยู่บนพาเลต: `.--bg-<name>` (พื้นหลัง),
`.--text-<name>` (สีข้อความ), และ `.--border-<name>` (สีเส้นขอบ). แต่ละ `<name>` เป็น
โทเค็นสีเชิงความหมาย — เจตนา (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) บวกพาเลต `accent-*` (`accent-blue`, `accent-green`, และอื่น ๆ). ชื่อมีอยู่ก็ต่อเมื่อโทเค็นมีในครอบครัวนั้น ดังนั้น `text-brand` ไม่ใช่คลาส — ข้อความไม่มีโทเค็นแบรนด์
ไม่มีวิธีเข้าถึง primitive หรือตัวเลข hex แบบอิสระ และการแทนแต่ละครั้งปฏิบัติตามธีม

**Token families** — แต่ละครอบครัว "หนึ่งโทเค็น หนึ่งคุณสมบัติ" จะมีคลาสต่อโทเค็น ชื่อเรียงตามโทเค็น ประกอบได้อย่างอิสระ:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (และ `-depth1`…`-card`) → `box-shadow`

แต่ละอันตั้งค่าคุณสมบัติเดียวของมัน ดังนั้น `border-width`/`border-radius` ต้องการสี `border-*` และสไตล์ขอบจริง ๆ เพื่อวาดเส้นขอบ พวกนี้ใช้ชื่อโทเค็นเต็ม (`.--border-radius-md`), ในขณะที่ helper สีและระยะข้างต้นใช้ตัวย่อ (`.--bg-brand`, `.--mt-lg`) — ตัวย่อเพื่อความสะดวก; คลาสโทเค็นเป็นตัวอักษรและครอบคลุมทั้งหมด

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) และ `.--text-align-<value>` (`start`, `center`, `end`, `justify`) ครอบคลุม props ข้ามตัดของ InstUI
เช่น `display` และ `textAlign` (View, Button, Metric, Tabs, …) เป็นคลาสที่ประกอบได้ —
ดังนั้นพวกนั้นไม่ใช่ modifiers ต่อคอมโพเนนต์

ทุกคลาส double-dash จะชนะ cascade อย่างแน่นอนเหนือ modifier แบบ single-dash ที่มีชื่อเดียวกัน โดยไม่คำนึงถึงลำดับการนำเข้า stylesheet — ดู [Authoring conventions](/conventions/authoring)
สำหรับกลไก

ทุกอย่างที่นี่ขับเคลื่อนด้วย CSS บริสุทธิ์จากโทเค็น `--instui-*`, ดังนั้นมันจะติดตาม InstUI ผ่านชั้นโทเค็น ดู [API reference](/api/) สำหรับ `componentsCss` และตัวสร้างต่อคอมโพเนนต์

## Overlays: dialog and popover

คอมโพเนนต์ overlay ใช้ primitives แพลตฟอร์มเนทีฟ ดังนั้นพวกมันทำงานแบบเข้าถึงได้ด้วย JavaScript น้อยหรือไม่ต้องใช้เลย

**Modal** — ใส่ `.instui-modal` บน `<dialog>` เนทีฟ มันจะได้ focus trapping, `Esc`-เพื่อปิด, และ
`::backdrop` ฟรี; backdrop ถูกทำให้มืดด้วยโทเค็น `--instui-component-mask-background-color`
เดียวกับ `.instui-mask` (เพิ่ม `-blur` เพื่อทำให้เป็นฝ้า) เปิดและปิดด้วยคำสั่ง invoker — ไม่มีสคริปต์:

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

**Context view / popover** — ใส่ `.instui-context-view` บนองค์ประกอบ `[popover]` และสลับด้วย
`popovertarget`. มันนั่งที่ชั้นบนสุดและปิดเบา ๆ เมื่อคลิกนอกหรือ `Esc`, อีกครั้งไม่มีสคริปต์:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — ใส่ `.instui-drawer-layout` บนรูทเลย์เอาต์ที่มีเด็ก `.tray` และ `.content`
เพิ่มแอตทริบิวต์ `open` (หรือ `-open`) เพื่อเผยให้เห็นถาด และใช้ `placement="end"`
(หรือ `-placement-end`) เพื่อติดมันที่ด้าน inline-end — การจัดวางจะตัดสินผ่านคุณสมบัติตรรกะ `inset-inline-*`/`flex-direction`, ดังนั้นมันจะพลิกโดยอัตโนมัติภายใต้ `dir="rtl"` โดยไม่ต้องมี
กฎพิเศษ ชุดการโต้ตอบแบบมีโฟกัสเพิ่มการส่งต่อคำสั่ง Invoker และสลับโหมด overlay
(`should-overlay-tray`) เมื่อความกว้างข้าม `--drawer-layout-min-width` (ค่าเริ่มต้น
`--instui-breakpoints-sm`, แล้ว `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` อยู่สำหรับ overlays แบบ in-flow (สปินเนอร์เหนือการ์ด); `::backdrop`
ของ modal ครอบคลุมกรณี modal

ทั้งสองรูปแบบยังถูกห่อเป็น custom elements เชิงพฤติกรรมใน `@pantoken/web-components`:
`<instui-modal open>` (a `<dialog>` ขับเคลื่อนโดยแอตทริบิวต์ `open`) และ `<instui-context-view>` (popover เนทีฟ)

การรองรับเบราว์เซอร์: popover API และ `popovertarget` เป็น Baseline 2024; คำสั่ง invoker
(`command`/`commandfor`) เป็น Baseline 2025 ดังนั้นบนเบราว์เซอร์เก่ากว่าให้เชื่อมปุ่มกับ `dialog.showModal()`
เป็น fallback บรรทัดเดียว การจัดตำแหน่ง popover ข้างทริกเกอร์ใช้การกำหนดตำแหน่ง anchor CSS เมื่อรองรับ (Chromium); ในที่อื่นมันจะจัดกึ่งกลางในชั้นบน

## Forms

**FormField** — `.instui-form-field` เป็น wrapper CSS-Grid ที่จัดวางป้ายชื่อ คอนโทรล และข้อความใด ๆ
ใส่มันบน `<label>` เพื่อให้ป้ายชื่อเชื่อมกับคอนโทรลโดยเนทีฟ มันมีสามกริดพื้นที่ — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (ค่าเริ่มต้น) ซ้อนพื้นที่; `-layout-inline` วางป้ายข้างคอนโทรล (จูนด้วย `-label-align-{start,end}` และ `-v-align-{top,middle,bottom}`). `-readonly` เปลี่ยนสีป้าย

ดอกจัน **required** ปรากฏเมื่อฟิลด์ถูกระบุว่าจำเป็นโดย _ทั้ง_ คลาส `-required` _หรือ_ คอนโทรลเนทีฟ `required` ภายใน — ดังนั้นคุณสามารถตั้ง `required` บน input และเครื่องหมายจะแสดง
มันเป็นเชิงตกแต่ง (เป็น `::after` บนป้าย ช่วงอยู่นอก accessibility tree); จับคู่กับบันทึกเช่น
"ฟิลด์ที่ถูกทำเครื่องหมาย \* จำเป็น" เว้นแต่ฟอร์มจะชัดเจนในตัวเอง

**FormFieldGroup** — `.instui-form-field-group` จัดกลุ่มฟิลด์ที่เกี่ยวข้องใน `<fieldset>` พร้อมคำอธิบาย `<legend>`. มันเป็นเพียงเลย์เอาต์ (ไม่มีโทเค็นเฉพาะ): ค่าเริ่มต้นจะซ้อนฟิลด์;
`-layout-columns` / `-layout-inline` ทำให้พวกมันเป็นคอลัมน์แบบตอบสนอง, พร้อม `-row-spacing-*` /
`-col-spacing-*` และ `-v-align-*` เพื่อปรับตาราง

**RadioInputGroup** — `.instui-radio-input-group` คือการจัดกลุ่ม `<fieldset>`/`<legend>` เดียวกัน,
เฉพาะสำหรับวิทยุ เพราะวิทยุลูกแชร์ `name` เลือกจึงเป็นแบบตัวเลือกเดียวโดยเนทีฟ —
ดังนั้นชุดปุ่มสลับจะทำงานเหมือนคอนโทรลเดียว ไม่ใช่ปุ่มกระจัดกระจาย `-variant-simple` (ค่าเริ่มต้น) วาง
วิทยุมาตรฐาน (`-layout-columns`/`-inline` ทำให้พวกมันเป็นแถว); `-variant-toggle` เชื่อมต่อ
ปุ่ม `.instui-radio.-variant-toggle` ลูกเป็น segmented control เดียว (ขอบย่อ ขอบกลมด้านนอก):

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

**Messages** — `.instui-form-field-messages` คือคอนเทนเนอร์; แต่ละ `.instui-form-field-message` รับ `-type-*`: `-type-hint` (เทา ค่าเริ่มต้น), `-type-error` (ข้อความแดง + glyph วงกลม-เตือน), `-type-success`
(ข้อความเขียว + glyph วงกลม-เช็ค), และ `-type-screenreader-only` (ถูกตัดทางสายตา ยังคงประกาศ) Glyphs จะทาสีใน `currentColor`, ดังนั้นพวกมันจะตรงกับสีข้อความเสมอ `-type-new-error` เป็นอีลิแอสที่ถูกเลิกใช้ของ `-type-error`. เชื่อมภาชนะกับคอนโทรลด้วย `aria-describedby`, และตั้ง
`aria-invalid` บนคอนโทรลเมื่อมีข้อผิดพลาด

ภายใน FormField, ข้อความ `-type-error` จะตามการตรวจสอบฝั่งไคลเอ็นต์: มันซ่อนจนกว่าคอนโทรลของฟิลด์จะ `:user-invalid` (เนทีฟ หลังผู้ใช้โต้ตอบ) — หรือคุณบังคับมันด้วย `-invalid`
บน `.instui-form-field` (สำหรับข้อผิดพลาดฝั่งเซิร์ฟเวอร์). `.instui-form-field-messages` แบบสแตนด์อโลน (ไม่อยู่ใน
ฟิลด์) จะไม่ถูกกระทบ วงแหวนโฟกัสของคอนโทรลตาม: อันตรายเมื่อ `:user-invalid`/`-invalid`,
สำเร็จเมื่อ `-success`.

**Text controls** — `.instui-text-input` (เนทีฟ `<input>`), `.instui-text-area` (เนทีฟ `<textarea>`,
ปรับขนาดได้), และ `.instui-simple-select` (เนทีฟ `<select>` พร้อม caret) แบ่งปันรูปลักษณ์เดียวกันและสถานะเดียวกัน: `-invalid` (ขอบข้อผิดพลาด), `-success` (ขอบความสำเร็จ), `-readonly`, เนทีฟ `:disabled`, และ
`-size-{sm,md,lg}`. สำหรับไอคอนนำ/ตาม (ของ InstUI `renderBeforeInput`/`renderAfterInput`), ห่อ
input ใน `.instui-input-group` และเพิ่ม slot `.before`/`.after` (glyph `-icon-*`); `-should-not-wrap`
เก็บมันให้อยู่บรรทัดเดียว `.instui-number-input` คือ facade นั้นบวกคอลัมน์ spinner +/- `.arrows` (neative
`type="number"`; เชื่อมปุ่มกับ `stepUp()`/`stepDown()`). `.instui-range-input` เป็น `input[type="range"]` ที่มีสไตล์ซึ่งค่าจะแสดงใน `.instui-range-input-value` bubble กลับด้าน สำหรับ combobox แบบริชที่มี listbox popover ให้เลือก `@instructure/ui` — ไลบรารีนี้ครอบคลุมคอนโทรลเนทีฟ

**Styled select dropdown (experimental)** — `select.css` แบบ opt-in อัปเกรด _same_
องค์ประกอบ `.instui-simple-select`: มันสไตล์ dropdown ที่เปิด (พาเนลและแต่ละออปชัน กับสถานะ hover และ selected) โดยใช้โมเดล CSS Customizable Select

> [!WARNING]
> `select.css` พึ่งพา `appearance: base-select` / `::picker(select)`, ซึ่งเป็น **ทดลอง**
> (Chrome 135+, ยังไม่เป็น Baseline). มันถูกจัดส่งเป็นแผ่นแยกและทุกกฎถูกกั้น
> ข้างหลัง `@supports (appearance: base-select)`, ดังนั้นจะไม่มีผลในเบราว์เซอร์ที่ไม่รองรับ — คอนโทรล `.instui-simple-select` จะยังคงเป็น select เนทีฟปกติ โหลดมันเฉพาะเมื่อคุณต้องการ
> dropdown ที่ปรับปรุงและยอมรับการรองรับที่จำกัด

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
