# ปลั๊กอิน

ปลั๊กอิน pantoken ขยายเอาต์พุตของโทเค็นหรือ CSS โดยไม่ต้องแยกเป็นแพ็กเกจใหม่ สร้างปลั๊กอินด้วย
`definePlugin` จาก `@pantoken/plugin-kit` แล้วส่งให้ `buildTokens` หรือ `toCss`.

## การเขียนปลั๊กอิน

ให้ `definePlugin` รูปแบบ hooks ที่คุณนำไปใช้ มันจะคืนค่าเป็นปลั๊กอินปกติที่ได้รับการแบรนด์ด้วย
ความสามารถที่อนุมานจาก hooks เหล่านั้น ปลั๊กอินสามารถขยาย IR (`tokens`, `icons`), เอาต์พุต CSS
(`css`), หรือทั้งสองอย่าง

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

`buildTokens` และ `toCss` รัน `checkPlugins` เหนือปลั๊กอินที่คุณส่งเข้ามา มันจะแจ้งเตือน — แต่ไม่เคยโยนข้อผิดพลาด —
เมื่อปลั๊กอินไม่มี hook ที่ตรงกับขั้นตอนที่ลงทะเบียนไว้ ดังนั้นปลั๊กอินที่เป็นโทเค็นเท่านั้นซึ่งส่งไปยัง `toCss` จะถูกข้ามพร้อมหมายเหตุแทนที่จะเงียบๆ ไม่ทำอะไร

## การประกอบปลั๊กอิน

สร้างต่อบนปลั๊กอินอื่นด้วย `extendPlugin` หรือรวมเพื่อนร่วมชั้นด้วย `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

hooks ในชั้นเดียวกันประกอบกัน: `tokens` รันฐานก่อนแล้วจึงรันส่วนเสริม, `css` รวมสอง
ผลงานเข้าด้วยกัน, และ `icons` รันทั้งสอง

## ตรวจสอบผลลัพธ์ของปลั๊กอินของคุณ

รันการตรวจสอบ drift ร่วมจาก `@pantoken/utils` เหนือผลลัพธ์ของปลั๊กอินในชุดทดสอบของมัน เพื่อให้การพิมพ์ผิดหรือการเปลี่ยนชื่อโทเค็นล้มเหลวอย่างรวดเร็วและในพื้นที่:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## ปลั๊กอินที่รวมมาพร้อมแพ็กเกจ

- `@pantoken/plugin-simple-icons` — แบรนด์ไอคอนจาก simple-icons, ลงทะเบียนเป็นโทเค็นไอคอน
- `@pantoken/plugin-lucide-lab` — ไอคอน Lucide Lab, ลงทะเบียนเป็น `--instui-icon-*` image tokens
- `@pantoken/plugin-logos` — โลโก้ผลิตภัณฑ์ Instructure เป็น SVGs, data URIs, และ `--instui-logo-*`
  image tokens
- `@pantoken/plugin-prune-custom-props` — ปลั๊กอิน PostCSS (ไม่ใช่ปลั๊กอิน pantoken) ที่ลบ
  custom properties ที่ไม่ถูกใช้ออกจากสไตล์ชีท
- `@pantoken/plugin-custom-theme-colors` — เปลี่ยนแบรนด์ของหน้าโดยตั้งคุณสมบัติหนึ่งค่า
  (`data-pantoken-color`) ให้เป็นหนึ่งใน 13 พาเลต หรือเป็น `custom` สำหรับ hex แบรนด์ใดๆ ดู
  [สีธีม](#theme-colors)
- `@pantoken/plugin-custom-components` — คอนโทรลแบบกำหนดเองที่อิงโทเค็น รวมถึง SegmentedControl
  และ SkeletonLoader

### Segmented control

ใช้ segmented control สำหรับมุมมองหรือฟิลเตอร์ที่เกี่ยวข้องสองถึงห้า ตัวเลือกแต่ละอันเป็น radio เนทีฟที่มีป้ายชื่อในกลุ่มชื่อเดียว; ทำเครื่องหมายหนึ่งอันเป็น checked เริ่มต้น ใช้แท็บหรือ dropdown หากตัวเลือกไม่พอดีอย่างสบาย และใช้ button groups สำหรับการกระทำแทนตัวเลือก สไตล์ `-size-md` เป็นค่าเริ่มต้น โดยมี `-size-sm` และ `-size-lg` สำหรับบริบทที่กระชับหรือเด่นกว่า

นำเข้า `@pantoken/plugin-custom-components/segmented-control.css` สำหรับคอนโทรลและปุ่ม overflow ของมัน ใช้คลาส `-icon-*` บนป้าย segment เมื่อ segment ต้องการ glyph; helper การโต้ตอบยังโปรโมตคลาส `-icon-*` จาก input เนทีฟไปยัง painter ของป้าย ให้ fieldset มี `aria-label` ที่มีคำอธิบายหรือ legend ที่มองเห็นได้ Helper รักษาการประกาศ radio เนทีฟ เพิ่มการนำทางด้วยคีย์บอร์ด และเปิดเผยหนึ่ง segment ที่ถูกตัดต่อการกดลูกศรหนึ่งครั้งเป็นทางเลือก มั่นใจการใช้ควบคุมเริ่ม/สิ้นสุดเชิงตรรกะและป้ายปุ่มที่เข้าถึงได้ทั้งสองทิศทาง:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

นำเข้า `@pantoken/interactions/segmented-control.iife.js` สำหรับการลงทะเบียนเมื่อ DOM พร้อมใช้งาน หรือเรียก
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` จาก `@pantoken/interactions`
และเรียก `cleanup()` เมื่อเอาออก CSS และตัวเลือก radio เนทีฟทำงานได้โดยไม่ต้องใช้ JS; ลูกศร overflow ต้องการพฤติกรรม ผลิตภัณฑ์ที่เลือกใช้เงาดีไซน์สองชั้นจากสี semantic drop-shadow; มันเป็นเงาของไอเท็มที่กำลังใช้งานแยกต่างหากแทนที่จะเป็น composite `--instui-elevation-*` ที่มีอยู่ ปุ่ม overflow ใช้โทเค็น elevation3 ของ upstream ผ่าน `--pantoken-segmented-overflow-shadow`

### Skeleton loading

เส้นทางย่อย `skeleton-loader.css` จัดสไตล์รูปร่างตกแต่งหนึ่งชิ้นสำหรับ Text, Avatar, หรือ Image Text รับ `-size-xxs` ผ่าน `-size-xxl`; Avatar และ Image ขนาดกลาง แต่ละ `.skeleton-row` ที่เป็นทางเลือกเพิ่มบรรทัดข้อความหนึ่งบรรทัดโดยไม่เปลี่ยนขนาด shimmer ของ CSS หยุดหลังจาก sweep 1.5 วินาทีสามครั้งและคงที่เมื่อผู้ใช้ตั้งค่าการลดการเคลื่อนไหว มันทำงานก่อน JavaScript จะโหลด

วางรูปร่างเฉพาะที่ที่เนื้อหาที่ขึ้นกับคิวรีจะปรากฏ ไม่ใช่เหนือการนำทางที่ทราบจากเซิร์ฟเวอร์, ฟิลเตอร์, หัวเรื่อง, หรือคอนโทรล Skeleton ไม่ใช่ตัวชี้วัดความคืบหน้าหรือสถานะงานที่รัน ใช้ spinner หรือสถานะ busy ของปุ่มสำหรับการกระทำ ให้เนื้อหาที่มีอยู่ยังมองเห็นได้ระหว่างการรีเฟรชพื้นหลัง

แอปหลักเป็นเจ้าของมาร์กอัป loading, loaded, empty, และ error ให้จัดเตรียมโซนสถานะว่างหนึ่งโซนต่อหน้า และ alert ว่างแยกใน HTML ของเซิร์ฟเวอร์ ทั้งคู่ **อยู่นอก** โซนเนื้อหาที่กำลังทำงาน:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

เรียกพฤติกรรมระดับพาเรนต์เมื่อสถานะคำขอเปลี่ยน มันจะอัปเดต `aria-busy` และสองการประกาศที่มีอยู่ก่อนแล้ว แต่มันไม่เคยแทนที่เนื้อหาหรือย้ายโฟกัส:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

หากใช้ bundle การโต้ตอบแบบ per-component แทนการนำเข้าโดยตรง ให้ dispatch เหตุการณ์ `pantoken:skeleton-state` บนองค์ประกอบ `[data-skeleton-region]` พร้อม
`detail: { state: "loading" | "loaded" | "empty" | "error", message: string }` ล่าช้า _การแสดง_
placeholders เป็นเวลา 200–500ms สำหรับคำขอที่รวดเร็ว; พฤติกรรมหน่วงการประกาศ loading อยู่ที่ 400ms โดยอิสระ ในการโหลดหน้าแบบ passive ให้ปล่อยโฟกัสไว้ที่เดิม ย้ายโฟกัสไปยังผลลัพธ์ที่โหลดใหม่เฉพาะเมื่อการกระทำของผู้ใช้ร้องขอ มาตราสถานะประกาศผลลัพธ์และสถานะว่าง; โหนด alert ประกาศความล้มเหลว อย่ารวม `aria-busy`, `role="status"`, และ
`role="alert"` ไว้บนองค์ประกอบเดียวกัน

เรจิสทรีของ Lucide Lab สามารถโหลดแบบ lazy แล้วส่งไปยัง synchronous token hook:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

บางสิ่งที่เคยเป็นปลั๊กอินตอนนี้มาพร้อมใน `@pantoken/components` เพราะคอมโพเนนต์จำนวนมากต้องการมันตั้งแต่กล่อง: เงาการยก (elevation) (`--instui-elevation-*`, ใน `components.css`), วงแหวน focus-outline
(ใน `base.css` — ทุกองค์ประกอบที่รับโฟกัสจะได้มันเมื่อ pantoken เป็นเจ้าของหน้า), และฟอนต์แบรนด์ Instructure (Atkinson Hyperlegible Next: `base.css` ใช้ `--instui-font-family-base`; ตัวเลือก opt-in
`@pantoken/components/fonts.css` โหลด `@font-face` woff2s)

## สีธีม {#theme-colors}

`@pantoken/plugin-custom-theme-colors` ส่งออกบล็อก `[data-pantoken-color="…"]` หนึ่งบล็อกต่อพาเลต
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). แต่ละบล็อกชี้ primitive ของแบรนด์ (`--instui-primitive-color-navy-*` และ `-blue-*`)
ไปที่พาเลตที่เลือก มันยังสืบค้นใหม่พื้นผิวแบรนด์ที่ upstream เปลี่ยนเป็น hex ตรงๆ, คง alpha ที่ฝังไว้ผ่าน `color-mix()` สีสถานะเชิงความหมาย, จุดเน้นสีน้ำเงินที่ชัดเจน, และเงาการยกยังคงอยู่ ลองใช้ใน
[ชุดสวอชสำหรับธีม](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html)

```html
<html data-pantoken-color="sea"></html>
```

### สีแบรนด์ที่กำหนดเอง

ตั้งค่า `data-pantoken-color="custom"` เพื่อรีแบรนด์จาก hex ใดๆ เช่น สีหลักที่ผู้ดูแล Canvas พิมพ์เข้าไปใน Theme Editor pantoken จะสืบทอดตาราง `--instui-primitive-color-custom-*` ขนาด 10–200 จากมัน:

1. **เส้นอ้างอิง.** เป้าหมายความสว่างของแต่ละขั้นเป็นค่าเฉลี่ยของความสว่าง OKLCH ของทั้ง 13 พาเลต ณ ขั้นนั้น โดยมี 0 กำหนดเป็นสีขาวและ 210 เป็นสีดำ ดังนั้นการกระจายช่องว่างของสเกลที่กำหนดเองจะตรงกับของพาเลตที่มาพร้อมแพ็กเกจ
2. **จุดยึด.** ค่าป้อนข้อมูลจะลงบนขั้นที่มีความสว่างเป้าหมายใกล้เคียงที่สุดกับของมันเอง แล้วจะ snap ไปยังความสว่างที่แน่นอนนั้น `#cccccc` กลายเป็น `custom-40` ณ `#c9c9c9`: ใกล้เคียงกับค่าป้อนข้อมูล แต่ไม่
   จำเป็นต้องเหมือนเสมอไป "ใกล้ที่สุด" หมายถึงขั้นที่ใกล้ที่สุดบนเส้นโค้ง ไม่ใช่สีในพาเลตที่มีอยู่ที่ใกล้ที่สุด
3. **เติมเต็ม.** ทุกขั้นอื่นๆ คง hue ของค่าป้อนข้อมูลไว้ ความอิ่มตัวของมันตามเส้นอิ่มตัวเฉลี่ยของพาเลตเมื่อเทียบกับจุดยึด และลดลงเฉพาะเมื่อสีตกอยู่นอก sRGB

รับได้เพียง `#rgb` และ `#rrggbb`; อย่างอื่นจะโยน `TypeError`, ดังนั้น hex จากฟอร์มจะไม่สามารถฉีด CSS ได้

ในเวลาสร้าง (build time), ส่งออกกฎทั้งหมวดพร้อม primitive ที่สืบทอดแล้วประกาศไว้ล่วงหน้า:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

เพื่อเลือกสีที่เวลารันไทม์โดยไม่ต้องส่งชุดโทเค็น ให้คำนวณเส้นโค้งและกฎ remap ล่วงหน้าที่เวลาสร้าง จากนั้นใช้ entry `/scale` ที่ไม่ขึ้นกับไลบรารีในเบราว์เซอร์ และตั้งเพียง 20 primitive ที่สืบทอด:

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

ตัวเลือกธีมของไซต์เอกสาร, ตัวแก้ไขธีมของ Canvas, และตัวอย่างด้านบนทั้งหมดทำงานในลักษณะนี้

ดู [API reference](/api/) สำหรับการส่งออกของแต่ละปลั๊กอิน
