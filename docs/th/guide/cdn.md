# CDN & การแจกจ่าย

pantoken เผยแพ็กเกจทุกตัวไปยัง npm ดังนั้นจึงสามารถดึงโทเค็น คอมโพเนนต์ และเว็บคอมโพเนนต์ตรงจาก CDN — ไม่มีขั้นตอนบิวด์ ไม่มีบันเดลเลอร์ หน้าสิ่งนี้ครอบคลุม URL การรวม CSS (พร้อมตัวสร้างแบบโต้ตอบ) รวมทั้งการวางเว็บคอมโพเนนต์แบบพร้อมใช้งาน

## พื้นฐานโทเค็น

ทุกคอมโพเนนต์ pantoken อ่าน `--instui-*` custom properties จากแผ่นโทเค็นบนหน้า มีสองแบบที่แจกจ่าย:

- `@pantoken/css/dist/style.lean.css` — พื้นฐาน CDN ที่แนะนำ แผ่นนี้มีโทเค็นทุกตัวยกเว้นชุดไอคอนเต็ม ดังนั้นจะประมาณ 23 KB gzip
- `@pantoken/css/dist/style.css` — แผ่นเต็ม รวมถึง ~1,777 ไอคอน glyph tokens (`--instui-icon-*`) ประมาณ 140 KB gzip โหลดแผ่นนี้ถ้าจะอ้างอิงไอคอนอย่างกว้างขวางผ่าน `var(--instui-icon-*)`

สเกลเงา (elevation) และตัวแปรวงแหวนโฟกัสอยู่ทั้งสองแผ่น ดังนั้นเงาและวงแหวนโฟกัสจะทำงานแม้โหลดเฉพาะพื้นฐานเท่านั้น

## เลือกคอมโพเนนต์และไอคอนของคุณ

[interactive CDN picker](/guide/cdn-picker) สร้าง jsDelivr combine URLs สำหรับ CSS และสแนิปเพ็ตสำหรับแพ็กเกจ JavaScript เปิดตัวมัน เลือกสิ่งที่ต้องการ และคัดลอกผลลัพธ์ที่สร้างขึ้น

- แท็บ **Components** — เลือกสไตล์ชีตของคอมโพเนนต์ทีละตัวหรือทั้งบาร์เรล `components.css` เพิ่ม base reset หรือ utilities ของ spacing/color หากต้องการ
- แท็บ **JS** — คัดลอกสแนิปเพ็ต ESM import สำหรับ `@pantoken/interactions`
- แท็บ **Icons** — เลือกไอคอนแต่ละรายการจากชุด InstUI (~1,800 ไอคอน) หรือจาก Simple Icons (~3,300 แบรนด์ glyphs) ตัว picker จะสร้าง combine URL แยกสำหรับไฟล์ไอคอน CSS เพื่อให้โหลดเฉพาะไอคอนที่ใช้จริงเท่านั้น
- แท็บ **Web Components** — สร้างสแนิปเพ็ต `@pantoken/web-components` (ESM selective register หรือ classic script bootstrap)

แต่ละไฟล์คอมโพเนนต์มีขนาดเล็ก — ส่วนใหญ่ประมาณ 2 KB คอมโพเนนต์ที่แสดงไอคอน (`alert`, `checkbox`,
และบางตัวอื่น) ต้องการ glyph เหล่านั้น ดังนั้นตัวสร้างจะเพิ่ม `@pantoken/components/dist/component-icons.css` (ประมาณ
0.5 KB gzip — 11 ไอคอนที่ชุดคอมโพเนนต์ใช้) ทุกครั้งที่คุณเลือกแผ่นแบบ lean แผ่นเต็มมีอยู่แล้ว

### ลำดับการโหลดและฟอนต์

โหลดพื้นฐานโทเค็นก่อน จากนั้น base reset แบบไม่จำเป็น แล้วไฟล์คอมโพเนนต์ และสุดท้าย utilities — พวกมันเป็น override utilities ดังนั้นจะ override กฎของคอมโพเนนต์จริงๆ ก็ต่อเมื่อมันมาหลังใน cascade URL การรวมข้างต้นจัดลำดับให้แล้ว ฟอนต์เป็นข้อยกเว้นเดียว: `@pantoken/components/dist/fonts.css` ชี้ไปที่ไฟล์ฟอนต์โดยเส้นทางสัมพัทธ์ ดังนั้น combine ไม่สามารถเขียนทับพวกมันได้ — โหลดมันเป็น `<link>` แยกต่างหาก:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### ทุกอย่างพร้อมกัน

เลือก **All components** ใน picker เพื่อสลับไปยังบาร์เรล หรือชี้ไปที่มันเอง (ประมาณ 141 KB gzip) ควบคู่กับแผ่นโทเค็น:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## เว็บคอมโพเนนต์

`@pantoken/web-components` ลงทะเบียน framework-agnostic `<instui-*>` custom elements พวกมันฝัง CSS ของตัวเอง แต่ยังอ่านโทเค็นจากแผ่นบนหน้า ดังนั้นให้โหลดพื้นฐานโทเค็นด้วย

### ES modules (แนะนำ)

CDN แบบ ESM แก้ไขการพึ่งพาของแพ็กเกจให้คุณ นี่ลงทะเบียนทุก element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

ใช้แผ่นโทเค็นแบบเต็ม (หรือแผ่น lean พร้อม `component-icons.css`) เพื่อให้ element ที่เรนเดอร์ไอคอน เช่น `<instui-alert>` หา glyph ได้

เพื่อจะลงทะเบียนแค่บาง element — และการพึ่งพาแบบซ้อนของพวกมัน — import `register` แล้วส่ง `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### แท็กสคริปต์แบบคลาสสิก

สำหรับการวางแบบไม่ใช้โมดูล ให้โหลด build แบบ IIFE มันบันเดิลการพึ่งพาและลงทะเบียนทุก element อัตโนมัติเมื่อโหลด โดยเผยแพร่ global `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

มันใหญ่กว่าเส้นทาง ESM — ฝัง `@pantoken/components` และ `@pantoken/icons` — ใช้เมื่อไม่สามารถใช้โมดูลได้เท่านั้น

## การตรึงเวอร์ชัน (Pinning versions)

URL ข้างต้น — และ URL ที่ picker เขียน — ติดตามรีลีสล่าสุด ตรึง major (หรือ exact) เวอร์ชันสำหรับ production — ตัวอย่าง `@pantoken/css@0` — เพื่อให้การอัปเกรดไม่สร้างความประหลาดใจ
