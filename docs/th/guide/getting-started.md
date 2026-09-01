# เริ่มต้น

pantoken รับโทเค็นการออกแบบและไอคอนของ Instructure UI คำนวณและปรับรูปแบบโมเดลเดียวกันนั้นใหม่เป็นแพ็กเกจสำหรับหลายแพลตฟอร์ม: แผ่นสไตล์ธรรมดา, SCSS และ Less, React และ Vue และ Svelte, Tailwind และ Panda, native Swift และ Kotlin, WordPress และ Drupal, Figma, และอื่นๆ

ติดตั้งแพ็กเกจที่เล็กที่สุดที่ตรงกับงานของคุณ ทุกอย่างยังถูก re-export โดยแพ็กเกจรวม `pantoken` ดังนั้นสามารถเริ่มที่นั่นแล้วค่อยจำกัดลงภายหลัง

## สร้างโครงงานเริ่มต้น

วิธีที่เร็วที่สุดในการลองใช้ pantoken: สร้างโครงงานเริ่มต้นที่ติดตั้งและเชื่อมต่อไว้แล้ว

```sh
npx create-pantoken-app react
```

แพลตฟอร์ม: `components` (plain HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. ดู [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) สำหรับ `--dir <path>` และการใช้งานเชิงโปรแกรม

ใช้เอเย่นต์เขียนโค้ดด้วย AI อยู่หรือไม่? ไม่ต้องติดตั้ง — ชี้ให้มันไปที่สกิลโดยตรง:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

ทำงานแบบเดียวกันสำหรับ Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, และ Amazon Q Developer CLI — แทนที่ `claude` ด้วย `gemini`, `agent`, `codex`, `copilot -p`, หรือ `q chat`. หากต้องการเชื่อมกฎเอเย่นต์ของ pantoken เข้ากับรีโปอย่างถาวร (AGENTS.md, กฎของ editor, สำเนาท้องถิ่นของสกิลนี้) ให้รัน `npx @pantoken/ai init` แทน

## โมเดลโทเค็น

โทเค็นเป็นคุณสมบัติ CSS แบบกำหนดเองที่มีชื่อ `--instui-<group>-<name>` เช่น `--instui-color-background-brand` หรือ `--instui-spacing-space-md`. มีธีมสามชุด: `rebrand` (ค่าเริ่มต้น, พร้อม `light-dark()` เมื่อ light และ dark แตกต่างกัน), `canvas`, และ `canvasHighContrast`. ไอคอนเป็นโทเค็น `<image>` (`--instui-icon-<name>`) ที่ได้จาก Lucide บวกกับสัญลักษณ์ที่กำหนดเองของ Instructure

## ตกแต่งเว็บแอป

ติดตั้งสไตล์ชีทแล้วนำเข้าเพียงครั้งเดียว มันกำหนดคุณสมบัติ `--instui-*` ทุกตัว ดังนั้นจึงอ้างอิงจาก CSS ของคุณโดยตรงได้

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

## ใช้ไอคอนไปที่ไหนก็ได้

เว็บคอมโพเนนต์ทำงานได้ในทุกเฟรมเวิร์ก โดยไม่ต้องพอร์ต

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

ไอคอนเป็นคุณสมบัติ CSS แบบกำหนดเอง (`--instui-icon-<name>`). โหลดสไตล์ชีทครั้งเดียวและอ้างอิงไอคอนใดก็ได้เป็น `mask-image` หรือ `background-image` — ไม่ต้องนำเข้าแยกต่อไอคอน

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — ไอคอนเดี่ยวเทียบกับชุดทั้งหมด

`@pantoken/icons` เปิดเผยการส่งออกชื่อสองตัว ใช้ `iconsByName` เพื่อดึงไอคอนตัวเดียวโดยไม่ต้องวนผ่านอาเรย์ทั้งหมด:

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

ทั้งสองการส่งออกโหลด IR ทั้งหมดตอนเริ่มโมดูล — ไม่มีการ tree-shaking ต่อไอคอนในระดับนี้ สำหรับการโหลดเฉพาะ CSS ที่บางเบา ให้ใช้ [CDN picker](/guide/cdn-picker) เพื่อสร้าง URL รวมสำหรับเฉพาะไอคอนที่คุณต้องการ

## สร้างสำหรับแพลตฟอร์มเนทีฟ

CLI เขียนแหล่งโทเค็นลงในรีโปเป้าหมาย ไม่ต้องติดตั้งนอกจาก runner:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

ดู [the pantoken CLI](/guide/cli) สำหรับทุกเป้าหมาย

## เคล็ดลับการเขียนใน VS Code

`@pantoken/pantoken` ตอนนี้มาพร้อมไฟล์ custom-data ของ VS Code เพื่อให้โปรเจ็กต์ผู้บริโภคได้รับการเติมข้อความอัตโนมัติสำหรับคลาสและโทเค็นใน HTML/CSS โดยไม่ต้องติดตั้งส่วนขยายเฉพาะ pantoken

1. ติดตั้งแพ็กเกจรวม:

```sh
npm i @pantoken/pantoken
```

1. ชี้ VS Code ไปที่ไฟล์ custom-data JSON ที่มาพร้อมจาก workspace ผู้บริโภคของคุณ:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. รีโหลด VS Code (หรือรัน "Developer: Reload Window") เพื่อใช้ข้อมูลใหม่

สิ่งนี้เปิดใช้งานคำแนะนำสำหรับโทเค็นคลาส `instui-*` (และโทเค็นคลาส `-modifier`) พร้อมกับคุณสมบัติแบบกำหนดเอง `--instui-*`

## ไปที่ไหนต่อ

- [แผนผังแพ็กเกจ](/guide/packages) — เลือกแพ็กเกจที่ควรใช้ตามงาน
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — ติดตั้งแอสเซ็ตและกฎของเอเย่นต์ในรีโปผู้บริโภค
- [สถาปัตยกรรม](/guide/architecture) — วิธีที่โมเดลโทเค็น, core, และเอาต์พุตเชื่อมต่อกัน
- [เอกสารอ้างอิง API](/api/) — ทุกสัญลักษณ์ที่ส่งออก สร้างจากซอร์ส
