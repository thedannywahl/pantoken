# ปลั๊กอิน

ปลั๊กอินของ pantoken ขยายผลลัพธ์โทเค็นหรือ CSS โดยไม่ต้องแยกเป็นแพ็กเกจใหม่ สร้างปลั๊กอินด้วย
`definePlugin` จาก `@pantoken/plugin-kit` แล้วส่งให้กับ `buildTokens` หรือ `toCss`。

## เขียนปลั๊กอิน

ให้ `definePlugin` ด้วยฮุคที่คุณลงมือทำ มันจะคืนปลั๊กอินปกติที่ติดแบรนด์ด้วยความสามารถที่อนุมานจากฮุคเหล่านั้น ปลั๊กอินสามารถขยาย IR (`tokens`, `icons`), ผลลัพธ์ CSS (`css`), หรือทั้งสองอย่างได้

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## การลงทะเบียนที่รับรู้ความสามารถ

`buildTokens` และ `toCss` จะรัน `checkPlugins` เหนือปลั๊กอินที่คุณส่งเข้าไป มันจะแจ้งเตือน — แต่ไม่เคยขว้างข้อยกเว้น — เมื่อปลั๊กอินไม่มีฮุคที่ตรงกับสเตจที่ลงทะเบียนไว้ ดังนั้นปลั๊กอินที่มีเฉพาะโทเค็นแต่ส่งให้กับ `toCss` จะถูกข้ามพร้อมบันทึกแทนที่จะทำงานเงียบ ๆ โดยไม่ทำอะไร

## ประกอบปลั๊กอิน

สร้างขึ้นบนปลั๊กอินอื่นด้วย `extendPlugin` หรือรวมเพื่อนร่วมชั้นด้วย `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

ฮุคในสเตจเดียวกันประกอบได้: `tokens` จะรันฐานแล้วตามด้วยส่วนเสริม, `css` รวมสองการมีส่วนร่วม, และ `icons` จะรันทั้งสองอัน

## ตรวจสอบผลลัพธ์ของปลั๊กอินของคุณ

รันการตรวจสอบ drift ร่วมจาก `@pantoken/utils` เหนือผลลัพธ์ของปลั๊กอินในเทสต์ของมันเอง เพื่อให้การพิมพ์ผิดหรือการเปลี่ยนชื่อโทเค็นทำให้ล้มเหลวเร็วและท้องถิ่น:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## ปลั๊กอินที่มาพร้อมแพ็กเกจ

- `@pantoken/plugin-simple-icons` — ติดแบรนด์ไอคอนจาก simple-icons, ลงทะเบียนเป็นโทเค็นไอคอน
- `@pantoken/plugin-lucide-lab` — ไอคอน Lucide Lab, ลงทะเบียนเป็น `--instui-icon-*` โทเค็นภาพ
- `@pantoken/plugin-logos` — โลโก้ผลิตภัณฑ์ Instructure เป็น SVG, data URI, และ `--instui-logo-*`
  โทเค็นภาพ
- `@pantoken/plugin-prune-custom-props` — ปลั๊กอิน PostCSS (ไม่ใช่ปลั๊กอิน pantoken) ที่ตัด
  custom properties ที่ไม่ได้ใช้จากสไตล์ชีต

รีจิสทรีของ Lucide Lab สามารถโหลดแบบ lazy แล้วส่งให้กับฮุคโทเค็นเชิงซิงโครนัส:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

สิ่งบางอย่างที่เคยเป็นปลั๊กอินตอนนี้รวมมาพร้อมใน `@pantoken/components` แล้ว เพราะมีหลายคอมโพเนนต์ต้องการโดยดีฟอลต์: เงายก (elevation shadows) (`--instui-elevation-*`, ใน `components.css`), วงแหวนรอบโฟกัส (focus-outline ring) (ใน `base.css` — ทุกองค์ประกอบที่โฟกัสได้จะได้รับเมื่อ pantoken ครอบครองหน้า), และฟอนต์แบรนด์ Instructure (Atkinson Hyperlegible Next: `base.css` ใช้ `--instui-font-family-base`; ตัวเลือกเสริม `@pantoken/components/fonts.css` โหลดไฟล์ woff2 ของ `@font-face`)

ดู [API reference](/api/) สำหรับการส่งออกของแต่ละปลั๊กอิน
