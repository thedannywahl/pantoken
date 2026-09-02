# ปลั๊กอิน

ปลั๊กอิน pantoken ขยายเอาต์พุตของโทเค็นหรือ CSS โดยไม่ต้องแยกเป็นแพ็กเกจใหม่ สร้างปลั๊กอินด้วย
`definePlugin` จาก `@pantoken/plugin-kit` แล้วส่งมันไปที่ `buildTokens` หรือ `toCss`.

## เขียนปลั๊กอิน

ให้ `definePlugin` รับ hooks ที่คุณใช้งาน มันจะคืนค่าปลั๊กอินปกติ พร้อมแบรนด์ความสามารถที่อนุมานได้จาก hooks เหล่านั้น ปลั๊กอินสามารถขยาย IR (`tokens`, `icons`), เอาต์พุต CSS (`css`), หรือทั้งสองอย่าง

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## การลงทะเบียนที่ตระหนักถึงความสามารถ

`buildTokens` และ `toCss` รัน `checkPlugins` บนปลั๊กอินที่คุณส่งเข้าไป มันจะแจ้งเตือน — แต่ไม่เคยโยนข้อผิดพลาด — เมื่อปลั๊กอินไม่มี hook ที่ตรงกับขั้นตอนที่มันถูกลงทะเบียน ดังนั้นปลั๊กอินที่มีเฉพาะโทเค็นแต่ถูกส่งไปยัง `toCss` จะถูกข้ามพร้อมโน้ตแทนการไม่ทำอะไรโดยเงียบ ๆ

## ประกอบปลั๊กอิน

สร้างทับบนปลั๊กอินอื่นด้วย `extendPlugin` หรือรวมเพื่อนร่วมขั้นตอนด้วย `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

hooks ของขั้นตอนเดียวกันสามารถประกอบกันได้: `tokens` จะรันฐานก่อนแล้วค่อยรันส่วนเสริม, `css` จะรวมสองการมีส่วนร่วมกัน, และ `icons` จะรันทั้งสองแบบ

## ตรวจสอบเอาต์พุตของปลั๊กอินของคุณ

รันการตรวจสอบ drift ที่แชร์จาก `@pantoken/utils` กับเอาต์พุตของปลั๊กอินของคุณในการทดสอบของมัน เพื่อให้พิมพ์ผิดหรือการเปลี่ยนชื่อโทเค็นล้มเหลวอย่างรวดเร็วและภายในเครื่อง:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## ปลั๊กอินที่มาพร้อมแพ็กเกจ

- `@pantoken/plugin-simple-icons` — แบรนด์ไอคอนจาก simple-icons ลงทะเบียนเป็นโทเค็นไอคอน
- `@pantoken/plugin-logos` — โลโก้ผลิตภัณฑ์ Instructure เป็น SVG, data URI และ `--instui-logo-*`
  โทเค็นรูปภาพ
- `@pantoken/plugin-prune-custom-props` — ปลั๊กอิน PostCSS (ไม่ใช่ปลั๊กอิน pantoken) ที่ตัด custom properties ที่ไม่ได้ใช้จากสไตล์ชีต

มีบางอย่างที่เคยเป็นปลั๊กอินตอนนี้ถูกบรรจุใน `@pantoken/components` เพราะหลายคอมโพเนนต์ต้องการโดยตรง: เงายกพื้น (`--instui-elevation-*`, ใน `components.css`), วงแหวน focus-outline (ใน `base.css` — ทุกองค์ประกอบที่สามารถโฟกัสจะได้รับเมื่อ pantoken เป็นเจ้าของหน้า), และฟอนต์แบรนด์ Instructure (Atkinson Hyperlegible Next: `base.css` ใช้ `--instui-font-family-base`; ตัวเลือกแบบ opt-in `@pantoken/components/fonts.css` โหลด `@font-face` woff2s)

ดู [API reference](/api/) สำหรับการส่งออกของแต่ละปลั๊กอิน.
