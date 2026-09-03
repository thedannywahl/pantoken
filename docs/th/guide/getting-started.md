# เริ่มต้น

Pantoken นำโทเค็นการออกแบบและไอคอนจาก [Instructure UI](https://instructure.design) มาสลักค่าเพียงครั้งเดียว แล้วแปลงโมเดลนั้นเป็นแพ็กเกจสำหรับหลายแพลตฟอร์ม: สไตล์ชีทธรรมดา, SCSS และ Less, React และ Vue และ Svelte, Tailwind และ Panda, native Swift และ Kotlin, WordPress และ Drupal, Figma และอื่นๆ

ติดตั้งแพ็กเกจที่เล็กที่สุดที่ตรงกับงานของคุณ ทุกอย่างยังถูก re-export โดยแพ็กเกจรวมเดียว `pantoken` ดังนั้นสามารถเริ่มจากตรงนั้นแล้วค่อยจำกัดขอบเขตทีหลังได้

## สร้างโปรเจกต์เริ่มต้น

วิธีที่เร็วที่สุดในการทดลองใช้ pantoken: สร้างโปรเจกต์เริ่มต้นที่ติดตั้งและผูกเข้ากับมันเรียบร้อยแล้ว

```sh
npx create-pantoken-app
```

แพลตฟอร์ม: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. ดู
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) สำหรับ `--dir <path>` และการใช้งานเชิงโปรแกรม

ใช้เอเจนต์โค้ดดิ้ง AI ไหม? ไม่ต้องติดตั้ง — ชี้มันไปที่สกิลโดยตรง:

```prompt
ดึงไฟล์ create.pantoken.app/SKILL.md แล้วทำตามเพื่อตั้งค่า pantoken ในโปรเจกต์นี้.
```

ถ้าต้องการผูกกฎเอเจนต์ของ pantoken เข้ากับรีโพโดยถาวร (AGENTS.md, กฎ editor, สำเนาท้องถิ่นของสกิลนี้) ให้รัน `npx @pantoken/ai init` แทน

## โมเดลโทเค็น

โทเค็นเป็น CSS custom properties ชื่อ `--instui-<group>-<name>` เช่น
`--instui-color-background-brand` หรือ `--instui-spacing-space-md`. มีธีมสามแบบ: `rebrand`
(ค่าเริ่มต้น, โดยมี `light-dark()` เมื่อ light และ dark แตกต่างกัน), `canvas`, และ `canvasHighContrast`.
ไอคอนเป็นโทเค็น `<image>` (`--instui-icon-<name>`) ที่ได้จาก Lucide บวก glyph เฉพาะของ Instructure

## จัดสไตล์เว็บแอป

ติดตั้งสไตล์ชีทแล้วนำเข้าเพียงครั้งเดียว มันกำหนดทุก `--instui-*` property ดังนั้นคุณสามารถอ้างอิง
พวกมันโดยตรงจาก CSS ของคุณเอง

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## ใช้ไอคอนไหนก็ได้ทุกที่

web component ทำงานได้ในทุกเฟรมเวิร์ก โดยไม่ต้องพอร์ต

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### โทเค็น CSS

ไอคอนเป็น CSS custom properties (`--instui-icon-<name>`). โหลดสไตล์ชีทครั้งเดียวและอ้างอิงไอคอนใดก็ได้เป็น `mask-image` หรือ `background-image` — ไม่ต้องนำเข้าแยกต่อไอคอน

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ไอคอนเดี่ยว vs ชุดทั้งหมด

`@pantoken/icons` ให้การส่งออกแบบมีชื่อสองรายการ ใช้ `iconsByName` เพื่อดึงไอคอนเดี่ยวโดยไม่ต้องวนผ่าน
อาร์เรย์ทั้งชุด:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

ใช้ `icons` เมื่อคุณต้องการทั้งชุด (เช่น เพื่อสร้างตัวเลือกไอคอน):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

ทั้งสองการส่งออกโหลด IR ทั้งหมดเมื่อเริ่มต้นโมดูล — ไม่มีการ tree-shaking ต่อไอคอนในระดับนี้ สำหรับการโหลดแบบประหยัดที่เป็น CSS เท่านั้น ให้ใช้ [CDN picker](/guide/cdn-picker) เพื่อสร้าง URL รวมสำหรับเฉพาะไอคอนที่คุณต้องการ

## สร้างสำหรับแพลตฟอร์มเนทีฟ

CLI เขียนแหล่งโทเค็นลงในรีโพเป้าหมาย ไม่ต้องติดตั้งนอกเหนือจาก runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

ดู [the pantoken CLI](/guide/cli) สำหรับทุกเป้าหมาย

## เคล็ดลับการเขียนด้วย VS Code

`@pantoken/pantoken` ตอนนี้มาพร้อมไฟล์ custom-data สำหรับ VS Code เพื่อให้โปรเจกต์ downstream ได้รับการเติมคำสำหรับ class และ
token ใน HTML/CSS โดยไม่ต้องติดตั้งส่วนขยายเฉพาะ pantoken

1. ติดตั้งแพ็กเกจรวม:

```sh
npm i @pantoken/pantoken
```

1. ชี้ VS Code ไปยัง custom-data JSON ที่มาพร้อมจาก workspace ผู้บริโภคของคุณ:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. รีโหลด VS Code (หรือรัน "Developer: Reload Window") เพื่อใช้ข้อมูลใหม่

สิ่งนี้เปิดใช้งานคำแนะนำสำหรับ token class `instui-*` (และ token class `-modifier`) รวมถึง
custom properties `--instui-*`

## ต่อไปที่ไหน

- [แผนผังแพ็กเกจ](/guide/packages) — แพ็กเกจใดควรใช้สำหรับงานใด
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ติดตั้งแอสเซ็ตและกฎของเอเจนต์ในรีโพผู้บริโภค
- [สถาปัตยกรรม](/guide/architecture) — วิธีที่โมเดลโทเค็น, core, และเอาต์พุตทำงานร่วมกัน
- [เอกสารอ้างอิง API](/api/) — ทุกสัญลักษณ์ที่ส่งออก สร้างจากซอร์ส
