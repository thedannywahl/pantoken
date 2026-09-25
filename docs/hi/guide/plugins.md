# प्लगइन्स

एक pantoken प्लगइन पैकेज को फोर्क किए बिना टोकन या CSS आउटपुट का विस्तार करता है। इसे `definePlugin` से `@pantoken/plugin-kit` द्वारा बनाइए, फिर `buildTokens` या `toCss` को पास कीजिए।

## प्लगइन बनाएं (Author a plugin)

उसी हुक्स को `definePlugin` को दीजिए जिन्हें आप लागू करते हैं। यह सामान्य प्लगइन लौटाता है, जिसे उन हुक्स से अनुमानित क्षमताओं के साथ ब्रांड किया जाता है। एक प्लगइन IR (`tokens`, `icons`), CSS आउटपुट (`css`), या दोनों का विस्तार कर सकता है।

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## क्षमता-संज्ञानी पंजीकरण

`buildTokens` और `toCss` उन प्लगइन्स पर `checkPlugins` चलाते हैं जिन्हें आप पास करते हैं। यह चेतावनी देता है — यह कभी थ्रो नहीं करता — जब किसी प्लगइन के पास उस चरण के लिए कोई मिलान करने वाला हुक नहीं होता जिसमें वह पंजीकृत है, इसलिए एक केवल-टोकन प्लगइन जिसे `toCss` को पास किया गया है, उसे नोट के साथ स्किप किया जाता है बजाय कि चुपचाप कुछ न करने के।

## प्लगइन्स को संयोजित करें

किसी दूसरे प्लगइन के ऊपर `extendPlugin` के साथ बनाइए, या समकक्षों को `mergePlugin` के साथ मिलाइए:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

समान-चरण हुक संयोजित होते हैं: `tokens` बेस फिर अतिरिक्त चलाता है, `css` दोनों योगदानों को मर्ज करता है, और `icons` दोनों को चलाता है।

## अपने प्लगइन के आउटपुट को सत्यापित करें

अपने प्लगइन के अपने आउटपुट पर साझा ड्रिफ्ट चेक्स `@pantoken/utils` को उसके टेस्ट में चलाइए, ताकि कोई टाइपो या रीनैम किया गया टोकन तेज़ी से और लोकली फेल हो जाए:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## बंडल किए गए प्लगइन्स

- `@pantoken/plugin-simple-icons` — simple-icons से ब्रांड आइकन, आइकन टोकन के रूप में पंजीकृत।
- `@pantoken/plugin-lucide-lab` — Lucide Lab आइकन, `--instui-icon-*` इमेज टोकन के रूप में पंजीकृत।
- `@pantoken/plugin-logos` — Instructure उत्पाद लोगो SVGs, डेटा URI, और `--instui-logo-*` इमेज टोकन के रूप में।
- `@pantoken/plugin-prune-custom-props` — एक PostCSS प्लगइन (pantoken प्लगइन नहीं) जो स्टाइलशीट से अनयूज़्ड कस्टम प्रॉपर्टीज़ हटाता है।
- `@pantoken/plugin-custom-theme-colors` — एक पृष्ठ को रीब्रांड करता है एक एट्रिब्यूट सेट करके (`data-pantoken-color`) जिसे 13 पैलेट्स में से कोई एक या किसी भी ब्रांड हेक्स के लिए `custom` पर सेट किया जा सकता है। देखें [थीम रंग](#theme-colors).

Lucide Lab का रजिस्ट्री आलसी रूप से लोड किया जा सकता है, फिर सिंक्रोनस टोकन हुक को पास किया जा सकता है:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

कुछ चीज़ें जो पहले प्लगइन्स हुआ करती थीं अब `@pantoken/components` में शिप होती हैं, क्योंकि बहुत से कॉम्पोनेंट्स को बॉक्स से बाहर वे चाहिए: एलेवेशन शैडोज़ (`--instui-elevation-*`, `components.css` में), फ़ोकस-आउटलाइन रिंग (`base.css` में — जब pantoken पेज का मालिक होता है तो हर फोकस-योग्य को यह मिलता है), और Instructure ब्रांड फोंट्स (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` लागू करता है; ऑप्ट-इन `@pantoken/components/fonts.css` `@font-face` woff2s लोड करता है)।

## थीम रंग {#theme-colors}

`@pantoken/plugin-custom-theme-colors` प्रत्येक पैलेट के लिए एक `[data-pantoken-color="…"]` ब्लॉक उत्पन्न करता है (`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`, `aurora`)। प्रत्येक ब्लॉक ब्रांड प्रिमिटिव्स (`--instui-primitive-color-navy-*` और `-blue-*`) को चुनी हुई पैलेट की ओर इशारा करता है। यह उन ब्रांड सरफेसेस को भी पुनः व्युत्पन्न करता है जिन्हें अपस्ट्रीम ने लिटेरल हेक्स में फ्लैटन कर दिया था, और `color-mix()` के माध्यम से उनके बेक्ड अल्फा को बनाए रखता है। सेमांटिक स्टेट्स कलर, स्पष्ट नीले एक्सेंट और एलेवेशन शैडो जस के तस रहते हैं। इसे
[स्वैच-आधारित थीमिंग डेमो](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) में आज़माएँ।

```html
<html data-pantoken-color="sea"></html>
```

### कस्टम ब्रांड रंग

किसी भी हेक्स से रीब्रांड करने के लिए `data-pantoken-color="custom"` सेट करें, जैसे कि थीम एडिटर में Canvas एडमिन द्वारा टाइप किया गया प्राइमरी रंग। pantoken इससे एक पूरा 10–200 `--instui-primitive-color-custom-*` स्केल निकालता है:

1. **संदर्भ वक्र।** प्रत्येक स्टेप का लक्ष्य लाइटनेस 13 पैलेट्स के उस स्टेप पर OKLCH लाइटनेस का औसत होता है, जिसमें 0 सफेद पर फ़िक्स्ड है और 210 काले पर। इसलिए कस्टम स्केल का स्पेसिंग शिप किए गए पैलेट्स के समान होता है।
2. **एंकर।** इनपुट उस स्टेप पर उतरता है जिसका लक्ष्य लाइटनेस उसके अपने के सबसे नज़दीक होता है, फिर उस सटीक लाइटनेस पर स्नैप हो जाता है। `#cccccc` `custom-40` बन जाता है `#c9c9c9` पर: इनपुट के करीब, पर हमेशा बिल्कुल समान नहीं। "नज़दीक" का अर्थ वक्र पर निकटतम स्टेप है, न कि किसी मौजूदा पैलेट के सबसे क्लोज़ कलर से।
3. **फिल।** हर दूसरे स्टेप में इनपुट का ह्यू रखा जाता है। इसकी सैचुरेशन एंकर के सापेक्ष पैलेट्स की औसत सैचुरेशन वक्र का अनुसरण करती है, और केवल तब घटाई जाती है जहां रंग sRGB के बाहर गिरता है।

केवल `#rgb` और `#rrggbb` स्वीकार किए जाते हैं; अन्यथा कुछ भी `TypeError` थ्रो कर देता है, इसलिए फॉर्म से प्राप्त कोई हेक्स CSS में इंजेक्ट नहीं कर सकता।

बिल्ड समय पर, व्युत्पन्न प्रिमिटिव्स पहले से घोषित करके पूरा नियम इमिट कीजिए:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

रनटाइम पर रंग चुनने के लिए बिना टोकन सेट शिप किए, वक्र और रीमैप नियम को बिल्ड समय पर प्रीकम्प्यूट करें। फिर ब्राउज़र में डिपेंडेंसी-फ्री `/scale` एंट्री का उपयोग करें, और केवल 20 व्युत्पन्न प्रिमिटिव्स सेट करें:

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

डॉक्स साइट का थीम पिकर, Canvas थीम एडिटर, और ऊपर दिया गया डेमो सभी इसी तरह काम करते हैं।

प्रत्येक प्लगइन के एक्सपोर्ट्स के लिए [API रेफरेंस](/api/) देखें।
