# ส่วนประกอบ

`@pantoken/components` แจกสไตล์คอมโพเน้นท์แบบคลาสที่สร้างจากโทเค็นของ Instructure นำเข้าชีตสไตล์แล้วติดแท็กในมาร์กอัปของคุณ — ไม่จำเป็นต้องใช้เฟรมเวิร์ก

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> ชอบองค์ประกอบแบบกำหนดเองไหม? `@pantoken/web-components` ห่อสไตล์ชุดเดียวกันไว้เป็น `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` และอื่น ๆ — ดู [package map](/api/).

## ข้อตกลง

ข้อปฏิบัติ CSS ในแพ็กเกจนี้อิงจากเวอร์ชันปรับแต่งของ [RSCSS](https://ricostacruz.com/rscss/index.html)

มอดิฟายเออร์เป็นแบบ **คีย์-ค่า** — `-<prop>-<val>` ซึ่งสอดคล้องกับชื่อ prop ของ InstUI — ดังนั้นมันอ่านได้ด้วยตัวเอง: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. prop แบบบูลีนคือชื่อ prop เพียงอย่างเดียว โดยการมีอยู่หมายถึง `true` (`-has-shadow`, `-clickable`); บูลีนที่เปิดเป็นค่าเริ่มต้นแล้วปิดจะกลับค่า (`-without-background`, `-without-border`). ขนาดรับได้ทั้งการสะกดสั้นและยาว (`-size-sm` = `-size-small`). เมื่อชื่อเบี่ยงเบนจาก InstUI คลาสความหมายของ InstUI ยังคงใช้งานได้แต่ถูกเลิกใช้ (เช่น `-variant-info` → ใช้ `-color-info` แทน)

### ตัวอย่าง

คอมโพเน้นท์ Instructure UI React:

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

สำหรับ prop `timeout` ของ InstUI ให้ตั้งตัวแปรคัสตอมหน่วยไม่มีหน่วย `--timeout` เป็นมิลลิเซกันด์และโหลด interaction ของ Alert ค่าบวกจะกำหนดเวลาให้ปิด; `0` (ค่าเริ่มต้น) จะปล่อยให้ alert ยังคงอยู่ เพิ่มคลาส `instui-transition -fade-entered` ของยูทิลิตี้ `transition` เพื่อใช้ fade ของ InstUI; ไม่ใส่จะลบออกทันที อินเตอร์แอคชันขับสถานะ `-fade-exiting` และยิงอีเวนต์ `dismiss` ซึ่งยกเลิกได้และฟองขึ้นก่อนการลบ เพื่อให้แอปเรียก `preventDefault()` เพื่อเก็บ alert ไว้ได้

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

แถบความคืบหน้ารับสเกลใดก็ได้ผ่าน `--min` (`0` โดยค่าเริ่มต้น), `--value` และ `--max` (`100` โดยค่าเริ่มต้น), พร้อมอาลิแยสที่ถูกเลิกใช้ `--value-now` และ `--value-max`. เพิ่ม `-should-animate` เพื่อใช้ทรานซิชันครึ่งวินาทีของ InstUI เมื่อค่ามีการเปลี่ยน `.value` อยู่เคียงข้าง `.bar` ในฐานะลูกของรูท; เพิ่ม `-render-value-inside` เพื่อเรนเดอร์มันเหนือตามแนวแทร็ก จัดชิดที่จุดเริ่มต้นแทน (จัดสไตล์ให้มองเห็นได้เทียบกับสีมิเตอร์). ใช้ `<progress>` ของเนทีฟสำหรับช่วงที่เริ่มที่ศูนย์ และ `<meter>` เมื่อมินิมัมไม่ใช่ศูนย์; เว็บคอมโพเน้นท์จะเลือกให้โดยอัตโนมัติตามแอตทริบิวต์ `min` ของพวกมัน. InstUI ไม่มีสถานะไม่แน่นอน ดังนั้น `<progress>` ที่ขาดแอตทริบิวต์ `value` จะเป็นการเดาของ pantoken: `progress-bar` จะอนิเมต `.bar` เป็นเซกเมนต์เลื่อน และ `progress-circle` หมุนวงแหวนที่ส่วนโค้งคงที่ ทั้งสองซ่อน `.value`.

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

วงกลมความคืบหน้ารับสเกลเดียวกันผ่าน `--min`, `--value` และ `--max`. `--value-now` และ `--value-max` ยังคงเป็นอาลิแยสทางฟังก์ชันที่ถูกเลิกใช้ เพิ่ม `-should-animate` และโหลด bundle อินเตอร์แอคชันสำหรับโฟกัสเพื่อทำซ้ำอนิเมชันการมอนต์ของ InstUI; `--animation-delay` เป็นดีเลย์หน่วยไม่มีหน่วยเป็นมิลลิเซกันด์. การสะกดที่ถูกเลิกใช้ `-should-animate-on-mount` และ `-shold-animate-on-mount` ยังคงเป็นอาลิแยสที่ใช้งานได้

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

## คำนำหน้าคลาส

ทุกคลาสมี namespace เป็น `instui-` โดยค่าเริ่มต้น สร้างชีตสไตล์ด้วยคำนำหน้าของคุณเอง — หรือไม่มีเลย — โดยส่ง `prefix` ไปยังตัวสร้างใดก็ได้ ค่า falsy ใด ๆ (`null`, `undefined`, `""` หรือละเว้น) จะยกเลิกคำนำหน้าโดยสิ้นเชิง ดังนั้นคุณสามารถเขียน `class="heading -level-h1"` แทน `class="instui-heading -level-h1"` ได้:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

มอดิฟายเออร์ที่ขึ้นต้นด้วยขีดกลาง (`.-color-secondary`, `.-level-h1`) จะไม่เปลี่ยนแปลงไม่ว่าจะมีคำนำหน้าหรือไม่ก็ตาม. ชีตสไตล์ที่แพ็กเกจส่งมาพร้อมคงคำนำหน้า `instui` ไว้

## เบส

`base.css` เป็นรีเซ็ตแบบเลือกใช้ที่ตั้งค่าเริ่มต้นเอกสารระดับโลกจากโทเค็น: `box-sizing`, รีเซ็ต `body`, ผิวหน้าของเพจ, สีข้อความฐานและฟอนต์, `color-scheme` (ดังนั้นโทเค็น `light-dark()` และคอนโทรลเนทีฟจะติดตามธีม), และลิงก์ฐาน โหลดมันครั้งเดียว ก่อนชีตคอมโพเน้นท์และโปรสชีต เมื่อ pantoken ควบคุมหน้า

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

ข้ามมันเมื่อคุณฝังคอมโพเน้นท์เข้าในโฮสต์ที่ธีม `html` และ `body` ของตัวเองแล้ว — รีเซ็ตจะทาส์ผิวหน้าของเพจ ดังนั้นคุณไม่ต้องการให้มันต่อสู้กับโฮสต์ ทุกสิ่งที่มันตั้งใช้ตัวเลือกตัวเลือกความเฉพาะต่ำ `:where()` ดังนั้นกฎของคุณเองจะชนะเสมอ

`base.css` _นำไปใช้_ ฟอนต์แบรนด์ (`font-family: var(--instui-font-family-base)`, พร้อม fallback ของระบบ); เพื่อ _โหลด_ มัน ให้นำเข้า `fonts.css` แบบเลือกใช้ — กฎ `@font-face` สำหรับ Atkinson Hyperlegible Next ชี้ไปที่ woff2 ที่มาพร้อมแพ็กเกจ แยกไว้เพราะไฟล์ฟอนต์ประมาณ ~350 kB และการโฮสต์ฟอนต์ด้วยตนเองเป็นการตัดสินใจที่ตั้งใจ

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## เนื้อหาสำหรับเครื่องอ่านหน้าจอ

<p>มีข้อความที่ซ่อนอยู่หลังประโยคนี้แล้ว.<span class="instui-screen-reader-content">เฉพาะเครื่องอ่านหน้าจอเท่านั้นที่จะประกาศสิ่งนี้.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` ซ่อนองค์ประกอบทางสายตาในขณะที่เก็บไว้ในต้นไม้การเข้าถึงได้ — สำหรับป้ายและข้อความสถานะที่เทคโนโลยีผู้ช่วยควรอ่านแต่การออกแบบไม่ควรแสดง

## ยูทิลิตี้

`utilities.css` เป็นเลเยอร์แบบเลือกใช้ของคลาสข้ามส่วน: พริมิทีฟ `View`, การเว้นระยะบนสเกลโทเค็น, และการแทนสีเชิงความหมาย. ต่างจากคลาส `-modifier` ของคอมโพเน้นท์ ยูทิลิตี้เหล่านี้ใช้ **ขีดคู่** (`--mod`) ดังนั้นจะไม่ชนกับชื่อมอดิฟายเออร์ของคอมโพเน้นท์ และสามารถนำไปใช้กับองค์ประกอบใดก็ได้ — เปลือยหรือประกอบเข้ากับคอมโพเน้นท์

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">พื้นผิว accent-blue พร้อมข้อความ on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">จัดตรงกลางด้วย mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` คือ `View` ของ InstUI. มันเป็นฐานที่คุณวางการเว้นระยะและสี และมันมีมอดิฟายเออร์คีย์-ค่าเพื่อพร็อพภาพของตัวเองเพื่อให้คุณไม่ต้องใช้ยูทิลิตี้:
`-background-*` (พื้นผิวของมัน), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, และ `-cursor-*` — เหล่านี้เป็นมอดิฟายเออร์ขีดเดี่ยวของ `view` เอง ไม่เกี่ยวข้องกับยูทิลิตี้ขีดคู่ด้านล่าง. พร็อพค่าฟรี (ความกว้าง/ความสูง/การยึด) ให้เป็นสไตล์อินไลน์; `margin`/`padding` ใช้ยูทิลิตี้การเว้นระยะ

**Spacing** — คลาสต่อด้านบนสเกลการเว้นระยะ อ่านเป็น `{m|p}{side}-{step}`: `m` สำหรับมาร์จิน หรือ `p` สำหรับแพดดิ้ง (หรือคำเต็ม `margin`/`padding`), ด้านตรรกะไม่บังคับ, แล้วตามด้วยขั้น. ดังนั้น `.--m-lg` และ `.--margin-lg` เหมือนกัน, เช่นเดียวกับ `.--pt-md` และ `.--paddingt-md`.

- ด้าน: none (ทั้งหมด), `t`/`b` (จุดเริ่ม/จบบล็อก), `s`/`e` (จุดเริ่ม/จบอินไลน์), `x`/`y` (แกนอินไลน์/บล็อก). ด้านตรรกะยังถูกต้องในเค้าโครงขวาเป็นซ้าย
- ขั้น: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, บวก `auto` สำหรับมาร์จินเท่านั้น

ประกอบพวกมันเป็นตัวย่อ `margin="small auto large"` ของ InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**Color** — การแทนสีเชิงความหมายที่อยู่บนพาเลต: `.--bg-<name>` (พื้นหลัง),
`.--text-<name>` (สีข้อความ), และ `.--border-<name>` (สีขอบ). แต่ละ `<name>` เป็นโทเค็นสีเชิงความหมาย — ความตั้งใจ (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) บวกพาเลต `accent-*` (`accent-blue`, `accent-green`, เป็นต้น). ชื่อมีเฉพาะเมื่อโทเค็นมีในตระกูลนั้น ดังนั้น `text-brand` จึงไม่ใช่คลาส — ข้อความไม่มีโทเค็นแบรนด์. ไม่มีวิธีเข้าถึง primitive หรือ hex แบบสุ่ม และการแทนแต่ละครั้งจะตามธีม

**Token families** — ทุกตระกูล "โทเค็นหนึ่งค่า, คุณสมบัติหนึ่งอย่าง" จะได้คลาสต่อโทเค็น ตั้งชื่อตามโทเค็น ประกอบใช้อย่างเสรี:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (และ `-depth1`…`-card`) → `box-shadow`

แต่ละคลาสตั้งค่าเพียงคุณสมบัติเดียว ดังนั้น `border-width`/`border-radius` ต้องการสี `border-*` และสไตล์ขอบเพื่อให้วาดขอบได้จริง. เหล่านี้ใช้ชื่อโทเค็นเต็ม (`.--border-radius-md`), ขณะที่ตัวช่วยสีและการเว้นระยะข้างต้นใช้ทางลัด (`.--bg-brand`, `.--mt-lg`) — ทางลัดเพื่อความสะดวก; คลาสโทเค็นคือแบบตัวอักษรและครอบคลุมทั้งหมด

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) และ `.--text-align-<value>` (`start`, `center`, `end`, `justify`) ครอบคลุมพร็อพข้ามส่วน `display` และ `textAlign` ของ InstUI (View, Button, Metric, Tabs, …) ในรูปแบบคลาสที่ประกอบได้ — ดังนั้นพวกนั้นจึงไม่ใช่มอดิฟายเออร์เฉพาะต่อคอมโพเน้นท์

ทุกคลาสขีดคู่จะชนะการเรียงลำดับ (cascade) แบบกำหนดได้เหนือมอดิฟายเออร์ขีดเดี่ยวที่มีชื่อเดียวกัน โดยไม่คำนึงถึงลำดับการนำเข้าชีตสไตล์ — ดู [Authoring conventions](/conventions/authoring) สำหรับกลไก

ทุกอย่างที่นี่เป็น CSS ล้วนขับเคลื่อนโดยโทเค็น `--instui-*` ดังนั้นมันจึงติดตาม InstUI ผ่านเลเยอร์โทเค็น ดู [API reference](/api/) สำหรับ `componentsCss` และตัวสร้างต่อคอมโพเน้นท์

## ออบเลย์: dialog และ popover

คอมโพเน้นท์ออบเลย์ใช้พรีมิติฟของแพลตฟอร์มเนทีฟ ดังนั้นพวกมันทำงานแบบเข้าถึงได้ด้วย JavaScript เล็กน้อยหรือไม่ต้องใช้เลย

**Modal** — ใส่ `.instui-modal` บน `<dialog>` เนทีฟ มันได้การขังโฟกัส, ปิดด้วย `Esc`, และได้ `::backdrop` ฟรี; แบ็คดรอปถูกลดความสว่างด้วยโทเค็น `--instui-component-mask-background-color` เดียวกับ `.instui-mask` (เพิ่ม `-blur` เพื่อทำให้เป็นฟรอสต์). เปิดและปิดด้วยคำสั่ง invoker — ไม่มีสคริปต์:

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

**Context view / popover** — ใส่ `.instui-context-view` บนองค์ประกอบ `[popover]` แล้วสลับด้วย `popovertarget`. มันอยู่ชั้นบนสุดและปิดเมื่อคลิกภายนอกหรือ `Esc`, อีกครั้งไม่มีสคริปต์:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — ใส่ `.instui-drawer-layout` บนรูทเลย์เอาต์ที่มีลูก `.tray` และ `.content`. เพิ่มแอตทริบิวต์ `open` (หรือ `-open`) เพื่อเผยถาด และใช้ `placement="end"` (หรือ `-placement-end`) เพื่อจอดมันที่ด้านสิ้นสุดอินไลน์ — การวางตำแหน่งแก้ผ่านพร็อพตรรกะ `inset-inline-*`/`flex-direction`, ดังนั้นมันจะพลิกอัตโนมัติภายใต้ `dir="rtl"` โดยไม่ต้องมีกฎเพิ่มเติม. bundle อินเตอร์แอคชันสำหรับโฟกัสเพิ่มการกำหนดเส้นทางคำสั่ง Invoker และสลับโหมดออบเลย์ (`should-overlay-tray`) เมื่อความกว้างข้าม `--drawer-layout-min-width` (ค่าเริ่มต้น `--instui-breakpoints-sm`, จากนั้น `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` ใช้กับออบเลย์ที่อยู่ในไหล (เช่น spinner เหนือการ์ด); `::backdrop` ของ modal ครอบคลุมกรณี modal

ทั้งสองรูปแบบถูกห่อเป็นองค์ประกอบกำหนดพฤติกรรมใน `@pantoken/web-components`: `<instui-modal open>` (เป็น `<dialog>` ขับเคลื่อนโดยแอตทริบิวต์ `open`) และ `<instui-context-view>` (popover เนทีฟ)

การรองรับเบราว์เซอร์: popover API และ `popovertarget` เป็น Baseline 2024; คำสั่ง invoker (`command`/`commandfor`) เป็น Baseline 2025 ดังนั้นในเบราว์เซอร์เก่าให้เชื่อมปุ่มกับ `dialog.showModal()` เป็น fallback หนึ่งบรรทัด การจัดวาง popover ติดกับทริกเกอร์ใช้การจัดตำแหน่ง anchor ของ CSS เมื่อรองรับ (Chromium); ที่อื่นจะจัดกึ่งกลางในชั้นบนสุด

## ฟอร์ม

**FormField** — `.instui-form-field` เป็น wrapper แบบ CSS-Grid ที่จัดเลย์เอาต์ป้าย, คอนโทรล, และข้อความใด ๆ ใส่มันบน `<label>` เพื่อให้ป้ายเชื่อมโยงกับคอนโทรลอย่างเนทีฟ. มันมีสามพื้นที่กริด — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (ค่าเริ่มต้น) เรียงพื้นที่เป็นสแต็ก; `-layout-inline` วางป้ายข้างคอนโทรล (ปรับด้วย `-label-align-{start,end}` และ `-v-align-{top,middle,bottom}`). `-readonly` เปลี่ยนสีป้าย

เครื่องหมาย **required asterisk** ปรากฏเมื่อฟิลด์ถูกกำหนดเป็น required โดย _หรือ_ คลาส `-required` _หรือ_ คอนโทรลเนทีฟ `required` ภายใน — ดังนั้นคุณสามารถตั้ง `required` บนอินพุตและเครื่องหมายจะปรากฏ มันเป็นเชิงตกแต่ง (เป็น `::after` บนป้าย นอกต้นไม้การเข้าถึง); จับคู่กับข้อสังเกตเช่น "ฟิลด์ที่มีเครื่องหมาย \* จำเป็นต้องกรอก" เว้นแต่ฟอร์มจะชัดเจนด้วยตัวมันเอง

**FormFieldGroup** — `.instui-form-field-group` รวมฟิลด์ที่เกี่ยวข้องใน `<fieldset>` พร้อมคำอธิบาย `<legend>`. มันเป็นเพียงเลย์เอาต์ (ไม่มีโทเค็นเฉพาะ): ค่าเริ่มต้นเรียงสแตกฟิลด์; `-layout-columns` / `-layout-inline` ไหลเป็นคอลัมน์ที่ตอบสนอง, พร้อม `-row-spacing-*` / `-col-spacing-*` และ `-v-align-*` เพื่อปรับกริด

**RadioInputGroup** — `.instui-radio-input-group` เป็นการจัดกลุ่ม `<fieldset>`/`<legend>` เดียวกัน, ที่เชี่ยวชาญสำหรับเรดิโอส์. เพราะเรดิโอแต่ละตัวเป็นลูกของ `name`, การเลือกจึงเป็นแบบเลือกเดียวเนทีฟ — ดังนั้นชุดปุ่มสลับทำงานเป็นคอนโทรลเดียวไม่ใช่ปุ่มกระจัดกระจาย. `-variant-simple` (ค่าเริ่มต้น) วางเรดิโอมาตรฐาน (`-layout-columns`/`-inline` ไหลเป็นแถว); `-variant-toggle` เชื่อมปุ่ม `.instui-radio.-variant-toggle` ลูกให้เป็นคอนโทรลแยกส่วนเดียว (ขอบยุบ, ปลายภายนอกโค้ง):

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

**Messages** — `.instui-form-field-messages` เป็นคอนเทนเนอร์; แต่ละ `.instui-form-field-message` รับ `-type-*`: `-type-hint` (เทา, ค่าเริ่มต้น), `-type-error` (ข้อความแดง + ไอคอนวงกลมเตือน), `-type-success` (ข้อความเขียว + ไอคอนวงกลมถูกเช็ค), และ `-type-screenreader-only` (ถูกตัดภาพ แต่ยังประกาศ). ไอคอนทาสีด้วย `currentColor`, ดังนั้นจึงตรงกับสีข้อความเสมอ. `-type-new-error` เป็นอาลิแยสที่ถูกเลิกใช้ของ `-type-error`. เชื่อมคอนเทนเนอร์กับคอนโทรลด้วย `aria-describedby`, และตั้ง `aria-invalid` บนคอนโทรลเมื่อมีข้อผิดพลาด

ภายใน FormField, ข้อความ `-type-error` ตามการตรวจสอบฝั่งไคลเอนต์: มันซ่อนจนกว่าคอนโทรลของฟิลด์จะ `:user-invalid` (เนทีฟ หลังจากผู้ใช้โต้ตอบ) — หรือคุณบังคับมันด้วย `-invalid` บน `.instui-form-field` (สำหรับข้อผิดพลาดฝั่งเซิร์ฟเวอร์). `.instui-form-field-messages` ยืนเดี่ยว (ไม่อยู่ในฟิลด์) จะไม่ถูกกระทบ. แหวนโฟกัสของคอนโทรลจะเปลี่ยนตาม: อันตรายเมื่อ `:user-invalid`/`-invalid`, สำเร็จเมื่อ `-success`.

**คอนโทรลข้อความ** — `.instui-text-input` (เนทีฟ `<input>`), `.instui-text-area` (เนทีฟ `<textarea>`, ปรับขนาดได้), และ `.instui-simple-select` (เนทีฟ `<select>` พร้อมเคิร์ท) แบ่งปันรูปลักษณ์และสถานะเดียวกัน: `-invalid` (ขอบข้อผิดพลาด), `-success` (ขอบสำเร็จ), `-readonly`, เนทีฟ `:disabled`, และ `-size-{sm,md,lg}`. สำหรับไอคอนนำ/ตาม (ของ InstUI `renderBeforeInput`/`renderAfterInput`), ห่ออินพุตด้วย `.instui-input-group` และเพิ่มสลอต `.before`/`.after` (ไอคอน `-icon-*`); `-should-not-wrap` ทำให้มันอยู่บรรทัดเดียว. `.instui-number-input` เป็นฟาซาดนั้นพร้อมคอลัมน์สปินเนอร์ +/- `.arrows` (เนทีฟ `type="number"`; เชื่อมปุ่มกับ `stepUp()`/`stepDown()`). `.instui-range-input` เป็น `input[type="range"]` ที่มีสไตล์ ซึ่งค่าจะแสดงในฟองอินเวิร์ส `.instui-range-input-value`. สำหรับคอมโบบอกซ์ที่มี listbox popover ให้ใช้ `@instructure/ui` — ไลบรารีนี้ครอบคลุมคอนโทรลเนทีฟ

**Styled select dropdown (ทดลอง)** — `select.css` แบบเลือกใช้ ยกระดับ _same_ `.instui-simple-select` องค์ประกอบ: มันจัดสไตล์ dropdown ที่เปิด (พาเนลและแต่ละออปชัน พร้อมสถานะ hover และ selected) โดยใช้โมเดล CSS Customizable Select

> [!WARNING]
> `select.css` พึ่งพา `appearance: base-select` / `::picker(select)`, ซึ่งเป็น **ทดลอง**
> (Chrome 135+, ยังไม่ใช่ Baseline). มันถูกส่งเป็นชีตแยกแบบเลือกใช้และกฎทั้งหมดถูกควบคุมโดย `@supports (appearance: base-select)`, ดังนั้นจะไม่ทำอะไรในเบราว์เซอร์ที่ไม่รองรับ — คอนโทรล `.instui-simple-select` จะยังคงเป็น select เนทีฟธรรมดา โหลดมันเฉพาะเมื่อคุณต้องการ dropdown ที่ปรับปรุงและยอมรับการรองรับที่จำกัด

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
