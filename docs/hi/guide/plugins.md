# प्लगइन्स

एक pantoken प्लगइन बिना किसी पैकेज को फ़ोर्क किए टोकन या CSS आउटपुट का विस्तार करता है। आप इसे `definePlugin` का उपयोग करके `@pantoken/plugin-kit` से बनाते हैं, फिर इसे `buildTokens` या `toCss` को पास करते हैं।

## एक प्लगइन लिखें

`definePlugin` को वे हुक दें जिन्हें आप लागू करते हैं। यह उन हुक्स से अनुमानित क्षमताओं के साथ ब्रांडेड एक सामान्य प्लगइन लौटाता है। एक प्लगइन IR (`tokens`, `icons`), CSS आउटपुट (`css`), या दोनों का विस्तार कर सकता है।

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## क्षमता-सचेत पंजीकरण

`buildTokens` और `toCss` उन प्लगइन्स पर `checkPlugins` चलाते हैं जिन्हें आप पास करते हैं। यह चेतावनी देता है — यह कभी थ्रो नहीं करता — जब किसी प्लगइन के पास उस स्टेज के लिए कोई मिलता-जुलता हुक नहीं होता है जिसमें वह पंजीकृत है, इसलिए टोकन-केवल प्लगइन जिसे `toCss` को पास किया गया है, नोट के साथ स्किप कर दिया जाता है बजाय चुपचाप कुछ न करने के।

## प्लगइन्स को संयोजित करें

किसी अन्य प्लगइन के ऊपर `extendPlugin` के साथ बनाएं, या समकक्षों को `mergePlugin` के साथ मिलाएं:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

एक ही स्टेज के हुक्स रचना कर सकते हैं: `tokens` बेस फिर अतिरिक्त चलाता है, `css` दोनों योगदानों को मर्ज करता है, और `icons` दोनों को चलाता है।

## अपने प्लगइन के आउटपुट को सत्यापित करें

अपने प्लगइन के अपने आउटपुट पर इसके टेस्ट में साझा ड्रिफ्ट चेक्स `@pantoken/utils` चलाएँ, ताकि कोई टाइपो या नाम बदले हुए टोकन के कारण जल्दी और स्थानीय रूप से फेल हो:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## बंडल किए गए प्लगइन्स

- `@pantoken/plugin-simple-icons` — simple-icons से ब्रांड आइकन, जिन्हें आइकन टोकन्स के रूप में पंजीकृत किया गया है।
- `@pantoken/plugin-lucide-lab` — Lucide Lab आइकन, जिन्हें `--instui-icon-*` इमेज टोकन्स के रूप में पंजीकृत किया गया है।
- `@pantoken/plugin-logos` — Instructure उत्पाद लोगो SVGs, डेटा URI, और `--instui-logo-*` इमेज टोकन्स के रूप में।
- `@pantoken/plugin-prune-custom-props` — एक PostCSS प्लगइन (pantoken प्लगइन नहीं) जो स्टाइलशीट से अप्रयुक्त कस्टम प्रॉपर्टीज़ हटाता है।

Lucide Lab का रजिस्ट्री लेज़िली लोड किया जा सकता है, फिर सिंक्रोनस टोकन हुक को पास किया जा सकता है:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

कुछ चीज़ें जो पहले प्लगइन्स हुआ करती थीं अब `@pantoken/components` में शिप होती हैं, क्योंकि कई कंपोनेंट्स को उन्हें बॉक्स से बाहर चाहिए: elevation शैडोज़ (`--instui-elevation-*`, `components.css` में), फोकस-आउटलाइन रिंग ( `base.css` में — जब pantoken पेज का मालिक होता है तो हर फोकसयोग्य उसे पाता है), और Instructure ब्रांड फ़ॉन्ट्स (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` लागू करता है; opt-in `@pantoken/components/fonts.css` `@font-face` woff2s लोड करता है)।

प्रत्येक प्लगइन के एक्सपोर्ट्स के लिए [API संदर्भ](/api/) देखें।
