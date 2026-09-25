# ปลั๊กอิน

ปลั๊กอิน pantoken ขยายโทเค็นหรือเอาต์พุต CSS โดยไม่ต้องแยกแพ็กเกจ ออกแบบปลั๊กอินด้วย
`definePlugin` จาก `@pantoken/plugin-kit` แล้วส่งให้ `buildTokens` หรือ `toCss`.

## เขียนปลั๊กอิน

ให้ `definePlugin` รับ hooks ที่คุณนำไปใช้งาน มันจะคืนค่าปลั๊กอินปกติ ซึ่งติดแบรนด์ด้วย
ความสามารถที่อนุมานจาก hooks เหล่านั้น ปลั๊กอินสามารถขยาย IR (`tokens`, `icons`), เอาต์พุต CSS
(`css`), หรือทั้งสองอย่างได้

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

`buildTokens` และ `toCss` จะรัน `checkPlugins` เหนือปลั๊กอินที่คุณส่งเข้าไป มันจะแจ้งเตือน — แต่จะไม่ขว้างข้อยกเว้น —
เมื่อปลั๊กอินไม่มี hook ที่ตรงกับเวทีที่มันลงทะเบียนไว้ ดังนั้นปลั๊กอินที่เป็น token-only ที่ส่ง
ไปยัง `toCss` จะถูกข้ามพร้อมบันทึกแทนที่จะเงียบ ๆ ไม่ทำอะไร

## ประกอบปลั๊กอิน

สร้างบนพื้นฐานปลั๊กอินอื่นด้วย `extendPlugin` หรือรวมเพียร์ด้วย `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

hooks ของเวทีเดียวกันจะประกอบกัน: `tokens` รันฐานแล้วจึงรันส่วนเพิ่มเติม, `css` ผสานสอง
ผลลัพธ์เข้าด้วยกัน, และ `icons` รันทั้งสองอย่าง

## ตรวจสอบเอาต์พุตของปลั๊กอินของคุณ

รันการตรวจสอบ drift ที่แชร์จาก `@pantoken/utils` เหนือเอาต์พุตของปลั๊กอินในชุดทดสอบของมัน เพื่อให้
การพิมพ์ผิดหรือการเปลี่ยนชื่อโทเค็นล้มเหลวอย่างรวดเร็วและในพื้นที่:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## ปลั๊กอินที่บันเดิลมา

- `@pantoken/plugin-simple-icons` — แบรนด์ไอคอนจาก simple-icons, ลงทะเบียนเป็นไอคอนโทเค็น
- `@pantoken/plugin-lucide-lab` — ไอคอน Lucide Lab, ลงทะเบียนเป็น `--instui-icon-*` image tokens
- `@pantoken/plugin-logos` — โลโก้ผลิตภัณฑ์ Instructure เป็น SVG, data URIs, และ `--instui-logo-*`
  image tokens
- `@pantoken/plugin-prune-custom-props` — ปลั๊กอิน PostCSS (ไม่ใช่ปลั๊กอิน pantoken) ที่ลบ
  custom properties ที่ไม่ได้ใช้จากสไตล์ชีต
- `@pantoken/plugin-custom-theme-colors` — รีแบรนด์เพจโดยตั้งหนึ่ง attribute
  (`data-pantoken-color`) เป็นหนึ่งใน 13 พาเล็ตต์ หรือเป็น `custom` สำหรับ hex ของแบรนด์ใด ๆ ดู
  [Theme colors](#theme-colors)

รีจิสทรีของ Lucide Lab สามารถโหลดแบบ lazy แล้วส่งให้ hook โทเค็นแบบ synchronous:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

บางอย่างที่เคยเป็นปลั๊กอินตอนนี้รวมมากับ `@pantoken/components` ตั้งแต่หลายคอมโพเนนต์ต้องการ
พวกมันโดยตรง: เงาความสูง (elevation shadows) (`--instui-elevation-*`, ใน `components.css`), แหวน focus-outline
(ใน `base.css` — ทุกองค์ประกอบที่รับ focus จะได้มันเมื่อ pantoken เป็นเจ้าของหน้า), และฟอนต์แบรนด์ Instructure
(Atkinson Hyperlegible Next: `base.css` ใช้ `--instui-font-family-base`; ส่วน opt-in
`@pantoken/components/fonts.css` โหลด `@font-face` woff2s)

## สีธีม {#theme-colors}

`@pantoken/plugin-custom-theme-colors` ผลิตบล็อก `[data-pantoken-color="…"]` หนึ่งบล็อกต่อพาเล็ตต์
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). แต่ละบล็อกจะชี้ primitives ของแบรนด์ (`--instui-primitive-color-navy-*` และ `-blue-*`)
ไปยังพาเล็ตต์ที่เลือก นอกจากนี้ยังคำนวณใหม่สำหรับพื้นผิวแบรนด์ที่ upstream แปลงเป็น hex แบบ literal,
รักษา alpha ที่ฝังมาไว้ผ่าน `color-mix()` สีสถานะเชิงความหมาย, accent สีน้ำเงินที่ชัดเจน, และ
เงาความสูง (elevation shadows) ยังคงอยู่ ลองดูใน
[swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html)

```html
<html data-pantoken-color="sea"></html>
```

### สีแบรนด์แบบกำหนดเอง

ตั้งค่า `data-pantoken-color="custom"` เพื่อรีแบรนด์จาก hex ใด ๆ เช่น สีหลักที่ผู้ดูแล Canvas
พิมพ์เข้าไปใน Theme Editor pantoken จะสังเคราะห์สเกล `--instui-primitive-color-custom-*` ขนาดเต็ม 10–200 จากมัน:

1. **เส้นอ้างอิง.** เป้าหมายความสว่างของแต่ละขั้นคือค่าเฉลี่ยของความสว่าง OKLCH ของ 13
   พาเล็ตต์ในขั้นนั้น โดยมี 0 ตายตัวเป็นสีขาวและ 210 เป็นสีดำ ดังนั้นการกระจายของสเกลแบบกำหนดเอง
   จะตรงกับช่องว่างของพาเล็ตต์ที่จัดมา
2. **สมอ.** ค่าที่ป้อนจะลงบนขั้นที่มีเป้าหมายความสว่างใกล้เคียงที่สุดกับของมันเอง แล้วจะจับไปที่
   ความสว่างนั้นโดยตรง `#cccccc` จะกลายเป็น `custom-40` ที่ `#c9c9c9`: ใกล้กับอินพุต แต่ไม่
   เสมอเหมือนกัน "ใกล้ที่สุด" หมายถึงขั้นที่ใกล้ที่สุดบนเส้นโค้ง ไม่ใช่สีที่อยู่ใกล้กับพาเล็ตต์ที่มีอยู่แล้วที่สุด
3. **เติม.** ทุกขั้นอื่นรักษา hue ของอินพุตไว้ ความอิ่มตัวจะตามเส้นความอิ่มตัวเฉลี่ยของพาเล็ตต์สัมพันธ์กับสมอ, และจะลดลงเฉพาะเมื่อสีอยู่นอก sRGB

ยอมรับเฉพาะ `#rgb` และ `#rrggbb` เท่านั้น; อื่น ๆ จะขว้าง `TypeError`, ดังนั้น hex จากฟอร์ม
จึงไม่สามารถฉีด CSS ได้

ในเวลาสร้าง, ออกกฎทั้งกฎพร้อม primitives ที่คำนวณแล้วประกาศไว้ล่วงหน้า:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

เพื่อเลือกสีใน runtime โดยไม่ต้องส่งชุดโทเค็น, คำนวณเส้นโค้งและกฎ remap
ในเวลาสร้างล่วงหน้า จากนั้นใช้ entry แบบไม่มีการพึ่งพา `/scale` ในเบราว์เซอร์, และตั้งค่าเฉพาะ 20
primitives ที่คำนวณแล้ว:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

ตัวเลือกธีมของไซต์เอกสาร, ตัวแก้ธีมของ Canvas, และเดโมข้างต้นทั้งหมดทำงานในลักษณะนี้

ดู [API reference](/api/) สำหรับการส่งออกของแต่ละปลั๊กอิน
