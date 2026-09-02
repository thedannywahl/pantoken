# प्लगइन्स

एक pantoken प्लगइन बिना किसी पैकेज को फोर्क किए टोकन या CSS आउटपुट को बढ़ाता है। आप इसे `definePlugin` से `@pantoken/plugin-kit` बनाकर बनाते हैं, फिर इसे `buildTokens` या `toCss` को पास करते हैं।

## एक प्लगइन लिखें

उन हुक्स को `definePlugin` को दें जिन्हें आप लागू करते हैं। यह उन हुक्स से व्युत्पन्न क्षमताओं के साथ ब्रांडेड एक सामान्य प्लगइन लौटाता है। एक प्लगइन IR (`tokens`, `icons`), CSS आउटपुट (`css`) या दोनों का विस्तार कर सकता है।

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

`buildTokens` और `toCss` आपके द्वारा पास किए गए प्लगइन्स पर `checkPlugins` चलाते हैं। यह चेतावनी देता है — यह कभी फेंकता नहीं है — जब किसी प्लगइन के पास उस चरण के लिए कोई मेल खाता हुक नहीं होता जिसमें वह पंजीकृत है, इसलिए एक टोकन-केवल प्लगइन जिसे `toCss` को पास किया गया है उसे चुप्पी से कुछ न करके छोड़ देने के बजाय एक नोट के साथ स्किप कर दिया जाता है।

## प्लगइन्स को संयोजित करें

किसी अन्य प्लगइन के ऊपर `extendPlugin` के साथ निर्माण करें, या समकक्षों को `mergePlugin` के साथ संयोजित करें:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

समान-चरण हुक्स संयोजित होते हैं: `tokens` बेस को फिर जोड़ को चलाता है, `css` दोनों योगदानों को मर्ज करता है, और `icons` दोनों को चलाता है।

## अपने प्लगइन के आउटपुट को सत्यापित करें

अपने प्लगइन के स्वयं के आउटपुट पर उसके टेस्ट में साझा ड्रिफ्ट चेक्स को `@pantoken/utils` से चलाएँ, ताकि कोई टाइपो या पुनर्नामित टोकन जल्दी और लोकल रूप से फेल हो जाए:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## बंडिल किए गए प्लगइन्स

- `@pantoken/plugin-simple-icons` — simple-icons से ब्रांड आइकन, जिन्हें आइकन टोकन्स के रूप में पंजीकृत किया गया है।
- `@pantoken/plugin-logos` — Instructure उत्पाद लोगो SVGs, डेटा URI, और `--instui-logo-*` इमेज टोकन्स के रूप में।
- `@pantoken/plugin-prune-custom-props` — एक PostCSS प्लगइन (pantoken प्लगइन नहीं) जो स्टाइलशीट से अप्रयुक्त कस्टम प्रॉपर्टीज़ हटा देता है।

कुछ चीज़ें जो पहले प्लगइन्स थीं अब इतने सारे कंपोनेंट्स को आउट-ऑफ़-द-बॉक्स चाहिए होने के कारण `@pantoken/components` में शिप होती हैं: एलेवेशन शैडोज़ (`--instui-elevation-*`, `components.css` में), फोकस-आउटलाइन रिंग ( `base.css` में — जब pantoken पेज का मालिक है तो हर फोकस-योग्य को यह मिलता है), और Instructure ब्रांड फ़ॉन्ट्स (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` लागू करता है; ऑप्ट-इन `@pantoken/components/fonts.css` `@font-face` woff2s लोड करता है)।

प्रत्येक प्लगइन के एक्सपोर्ट के लिए [API संदर्भ](/api/) देखें।
