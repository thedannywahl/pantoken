# เริ่มต้นใช้งาน

Pantoken นำ design tokens และไอคอนจาก [Instructure UI](https://instructure.design) มาแก้ไขให้เรียบร้อยครั้งเดียว แล้วแปลงโมเดลนั้นเป็นแพ็กเกจสำหรับหลายแพลตฟอร์ม: สไตล์ชีตปกติ, SCSS และ Less, React, Vue, Svelte, Tailwind และ Panda, native Swift และ Kotlin, WordPress และ Drupal, Figma และอื่นๆ

ติดตั้งแพ็กเกจที่เล็กที่สุดซึ่งเหมาะกับงานของคุณ ทุกอย่างยังถูก re-export โดยแพ็กเกจรวม `pantoken` ดังนั้นสามารถเริ่มจากที่นั่นแล้วค่อยจำกัดลงภายหลัง

## สร้างโปรเจกต์เริ่มต้น

วิธีที่เร็วที่สุดในการลอง pantoken: สร้างโปรเจกต์เริ่มต้นที่ติดตั้งและเชื่อมต่อแล้ว

```sh
npx create-pantoken-app
```

แพลตฟอร์ม: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. ดู [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) สำหรับ `--dir <path>` และการใช้งานเชิงโปรแกรม

ใช้เอเจนต์โค้ดด้วย AI อยู่หรือ? ไม่ต้องติดตั้ง — ชี้ไปที่สกิลโดยตรง:

```prompt
ดึง create.pantoken.app/SKILL.md และทำตามเพื่อตั้งค่า pantoken ในโปรเจกต์นี้
```

หากต้องการเชื่อมกฎเอเจนต์ของ pantoken เข้ากับรีโปอย่างถาวร (AGENTS.md, กฎ editor, สำเนาท้องถิ่นของสกิลนี้) ให้รัน `npx @pantoken/ai init` แทน

## โมเดลโทเค็น

โทเค็นคือ CSS custom properties ที่มีชื่อเป็น `--instui-<group>-<name>` เช่น `--instui-color-background-brand` หรือ `--instui-spacing-space-md`. มีธีมสามชุด: `rebrand` (ค่าเริ่มต้น, โดยมี `light-dark()` เมื่อแสงและมืดแตกต่าง), `canvas`, และ `canvasHighContrast`. ไอคอนเป็นโทเค็น `<image>` (`--instui-icon-<name>`) ที่ได้จาก Lucide บวกกับ glyph แบบกำหนดเองของ Instructure

## การตกแต่งแอปเว็บ

ติดตั้ง stylesheet และ import มันครั้งเดียว มันกำหนดทุก `--instui-*` property ดังนั้นให้อ้างอิงโดยตรงจาก CSS ของคุณ

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

## ใช้ไอคอนได้ทุกที่

web component ทำงานได้ในทุกเฟรมเวิร์กโดยไม่ต้องพอร์ต

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

ไอคอนเป็น CSS custom properties (`--instui-icon-<name>`). โหลด stylesheet ครั้งเดียวแล้วอ้างอิงไอคอนใดๆ เป็น `mask-image` หรือ `background-image` — ไม่ต้อง import แยกต่อไอคอน

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ไอคอนเดี่ยว vs ชุดเต็ม

`@pantoken/icons` มีสอง named exports ใช้ `iconsByName` เพื่อดึงไอคอนตัวเดียวโดยไม่ต้องวนผ่านอาร์เรย์ทั้งหมด:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

ใช้ `icons` เมื่อคุณต้องการชุดทั้งหมด (เช่น เพื่อสร้างตัวเลือก):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

ทั้งสอง export โหลด IR เต็มเมื่อเริ่มต้นโมดูล — ไม่มีการ tree-shaking ต่อไอคอนในระดับนี้ สำหรับการโหลดที่บางและเป็น CSS เท่านั้น ให้ใช้ [CDN picker](/guide/cdn-picker) เพื่อสร้าง URL รวมสำหรับเฉพาะไอคอนที่คุณต้องการ

## สร้างสำหรับแพลตฟอร์ม native

CLI เขียนแหล่งโทเค็นลงในรีโปเป้าหมาย ไม่ต้องติดตั้งนอกจาก runner:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

ดู [the pantoken CLI](/guide/cli) สำหรับทุกเป้าหมาย

## เคล็ดลับการเขียนใน VS Code

`@pantoken/pantoken` ตอนนี้มาพร้อมกับไฟล์ VS Code custom-data เพื่อให้โปรเจกต์ผู้บริโภคได้รับการเติมคำสำหรับคลาสและโทเค็นใน HTML/CSS โดยไม่ต้องติดตั้งส่วนขยายเฉพาะ pantoken

1. ติดตั้งแพ็กเกจรวม:

```sh
npm i @pantoken/pantoken
```

1. ชี้ VS Code ไปที่ไฟล์ custom-data JSON ที่มาพร้อมจาก workspace ของผู้บริโภค:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. โหลด VS Code ใหม่ (หรือรัน "Developer: Reload Window") เพื่อใช้ข้อมูลใหม่

สิ่งนี้เปิดคำแนะนำสำหรับโทเค็นคลาส `instui-*` (และโทเค็นคลาส `-modifier`) พร้อมทั้ง custom properties `--instui-*`

## ไปต่อที่ไหน

- [แผนที่แพ็กเกจ](/api/) — แพ็กเกจใดเหมาะกับงานแบบไหน
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ติดตั้งเอเจนต์แอสเซ็ตและกฎในรีโปผู้บริโภค
- [สถาปัตยกรรม](/guide/architecture) — วิธีการที่โมเดลโทเค็น, core, และ output ประสานกัน
- [เอกสาร API](/api/) — ทุกสัญลักษณ์ที่ถูก export, สร้างจากซอร์ส
