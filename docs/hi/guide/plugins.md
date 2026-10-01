# प्लगइन्स

एक pantoken प्लगइन टोकन या CSS आउटपुट को बिना किसी पैकेज को फ़ोर्क किए विस्तारित करता है। इसे `definePlugin` से `@pantoken/plugin-kit` के साथ बनाएं, फिर इसे `buildTokens` या `toCss` को पास करें।

## प्लगइन लेखक

उन हुक्स को `definePlugin` को दें जिन्हें आप लागू करते हैं। यह उन हुक्स से अनुमानित क्षमताओं के साथ ब्रांडेड एक सामान्य प्लगइन लौटाता है। एक प्लगइन IR (`tokens`, `icons`), CSS आउटपुट (`css`), या दोनों का विस्तार कर सकता है।

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## क्षमता-सूचित पंजीकरण

`buildTokens` और `toCss` उन प्लगइनों पर `checkPlugins` चलाते हैं जिन्हें आप पास करते हैं। यह चेतावनी देता है — कभी थ्रो नहीं करता — जब किसी प्लगइन के पास उस स्टेज के लिए कोई मेल खाता हुक नहीं होता जिसमें यह रेजिस्टर किया गया है, इसलिए एक केवल-टोकन प्लगइन जिसे `toCss` को पास किया गया है, नोट के साथ स्किप कर दिया जाता है बजाए चुपचाप कुछ न करने के।

## प्लगइन्स को जोड़ें

किसी अन्य प्लगइन के ऊपर `extendPlugin` के साथ बिल्ड करें, या समकक्षों को `mergePlugin` के साथ मिलाएँ:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

समान-स्टेज हुक्स संयोजित होते हैं: `tokens` बेस को फिर अतिरिक्त चलाता है, `css` दोनों योगदानों को मर्ज करता है, और `icons` दोनों को चलाता है।

## अपने प्लगइन के आउटपुट को सत्यापित करें

अपने प्लगइन के स्वयं के आउटपुट पर परीक्षण में साझा ड्रिफ्ट चेक्स `@pantoken/utils` चलाएँ, ताकि कोई टाइपो या पुनर्नामित टोकन जल्दी और स्थानीय रूप से फेल हो:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## बंडल किए गए प्लगइन्स

- `@pantoken/plugin-simple-icons` — simple-icons से ब्रांड आइकन, आइकन टोकन के रूप में रजिस्टर किए गए।
- `@pantoken/plugin-lucide-lab` — Lucide Lab आइकन, `--instui-icon-*` इमेज टोकन के रूप में रजिस्टर किए गए।
- `@pantoken/plugin-logos` — Instructure उत्पाद लोगो SVGs, डेटा URI, और `--instui-logo-*` इमेज टोकन के रूप में।
- `@pantoken/plugin-prune-custom-props` — एक PostCSS प्लगइन (pantoken प्लगइन नहीं) जो स्टाइलशीट से अनउपयोग किए गए कस्टम प्रॉपर्टीज़ हटा देता है।
- `@pantoken/plugin-custom-theme-colors` — एक पृष्ठ को रीब्रांड करता है एक एट्रिब्यूट सेट करके (`data-pantoken-color`) को 13 पेलट्स में से एक पर, या किसी भी ब्रांड हेक्स के लिए `custom` पर सेट करके। देखें [थीम रंग](#theme-colors)।
- `@pantoken/plugin-custom-components` — टोकन-समर्थित कस्टम कंट्रोल्स जिनमें SegmentedControl और SkeletonLoader शामिल हैं।

### सेगमेंटेड कंट्रोल

दो से पाँच संबंधित दृश्य या फिल्टर के लिए सेगमेंटेड कंट्रोल का उपयोग करें। प्रत्येक विकल्प एक लेबल्ड नेटिव रेडियो होता है एक नामक समूह में; प्रारंभ में एक को चेकेड मार्क करें। यदि विकल्प आराम से फिट नहीं होंगे तो टैब या ड्रॉपडाउन का उपयोग करें, और क्रियाओं के लिए विकल्पों के बजाय बटन समूहों का उपयोग करें। `-size-md` शैली डिफ़ॉल्ट है, और अधिक तंग या अधिक प्रमुख प्रसंगों के लिए `-size-sm` और `-size-lg` उपलब्ध हैं।

कंट्रोल और इसके ओवरफ़्लो बटनों के लिए `@pantoken/plugin-custom-components/segmented-control.css` को इम्पोर्ट करें। जब सेगमेंट को एक ग्लिफ़ की आवश्यकता हो तो सेगमेंट लेबल पर `-icon-*` क्लास का उपयोग करें; इंटरेक्शन हेल्पर भी इसके नेटिव इनपुट से `-icon-*` क्लास को लेबल पेंटयर पर प्रोमोट करता है। फ़ील्डसेट को एक वर्णनात्मक `aria-label` या एक दृश्यमान लेजेंड दें। हेल्पर नेटिव रेडियो घोषणा को संरक्षित करता है, कीबोर्ड नेविगेशन जोड़ता है, और वैकल्पिक रूप से हर एरो प्रेस पर एक क्लिप्ड सेगमेंट को प्रकट करता है। दोनों दिशाओं में तार्किक प्रारंभ/अंत नियंत्रण और पहुंचयोग्य बटन लेबल का उपयोग करें:

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

DOM-रेडी रजिस्ट्रेशन के लिए `@pantoken/interactions/segmented-control.iife.js` को इम्पोर्ट करें, या कॉल करें
`initSegmentedControl(fieldset, { size: "md", isOverflown: true })` को `@pantoken/interactions` से
और हटाते समय `cleanup()` को कॉल करें। CSS और नेटिव रेडियो विकल्प बिना JS के काम करते हैं; ओवरफ़्लो एरो को व्यवहार की आवश्यकता होती है। चयनित आइटम सेमांटिक ड्रॉप-शैडो रंगों से दो-लेयर डिज़ाइन शैडो का उपयोग करता है; यह एक अलग सक्रिय-आइटम शैडो है न कि मौजूदा `--instui-elevation-*` कंपोजिट। ओवरफ़्लो बटनों में अपस्ट्रीम elevation3 कंपोनेंट टोकन `--pantoken-segmented-overflow-shadow` के माध्यम से उपयोग होते हैं।

### स्केलेटन लोडिंग

`skeleton-loader.css` सबपाथ एक सजावटी Text, Avatar, या Image आकार को स्टाइल करता है। Text `-size-xxs` से `-size-xxl` तक स्वीकार करता है; Avatar और Image मध्यम आकार के होते हैं। प्रत्येक वैकल्पिक `.skeleton-row` एक टेक्स्ट लाइन जोड़ता है बिना आकार बदले। CSS शिमर तीन 1.5-सेकंड स्वीप के बाद रुक जाता है और जब उपयोगकर्ता ने कम गति पसंद की हो तब स्थिर रहता है। यह जावास्क्रिप्ट लोड होने से पहले काम करता है।

शेप्स को केवल उन स्थानों पर रखें जहां क्वेरी-निर्भर सामग्री दिखाई देगी, सर्वर-ज्ञात नेविगेशन, फ़िल्टर, हेडिंग्स, या कंट्रोल्स के ऊपर नहीं। एक स्केलेटन प्रगति मीटर या क्रिया-ब्याज़ी स्थिति नहीं है। बैकग्राउंड रिफ्रेश के दौरान मौजूदा सामग्री दृश्यमान रखें; क्रियाओं के लिए स्पिनर या बटन ब्याज़ी स्थिति का उपयोग करें।

पैरेंट एप्लिकेशन लोडिंग, लोडेड, खाली, और एरर मार्कअप का मालिक है। प्रत्येक पृष्ठ के लिए एक खाली स्टेटस रीज़न और सर्वर HTML में एक अलग खाली अलर्ट प्रदान करें, दोनों व्यस्त सामग्री क्षेत्र के बाहर:

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

जब अनुरोध स्थिति बदलती है तो पैरेंट-लेवल व्यवहार को कॉल करें। यह `aria-busy` और दो पूर्व-मौजूद घोषणाओं को अपडेट करता है, पर यह कभी भी सामग्री को बदलता या फोकस नहीं मूव करता:

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

यदि पर-कम्पोनेंट इंटरैक्शन बंडल के बजाय डायरेक्ट इम्पोर्ट का उपयोग कर रहे हैं, तो `pantoken:skeleton-state` ईवेंट को `[data-skeleton-region]` एलिमेंट पर `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }` के साथ डिस्पैच करें। तेज़ अनुरोधों के लिए प्लेसहोल्डर्स को 200–500ms द्वारा देरी से दिखाएँ; व्यवहार लोडिंग घोषणा को स्वतंत्र रूप से 400ms से देरी करता है। पैसिव पेज लोड्स पर फोकस वहीं छोड़ दें जहाँ वह है। केवल तब फोकस को नए लोड किए गए परिणाम पर ले जाएँ जब उपयोगकर्ता की अपनी क्रिया ने उसे अनुरोध किया हो। स्टेटस नोड परिणामों और खाली स्टेट्स की घोषणा करता है; अलर्ट नोड विफलताओं की घोषणा करता है। एक ही एलिमेंट पर `aria-busy`, `role="status"`, और `role="alert"` को मिलाकर उपयोग न करें।

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

कुछ चीजें जो पहले प्लगइन्स थीं अब `@pantoken/components` में शिप होती हैं, क्योंकि बहुत से कंपोनेंट्स को ये आउट-ऑफ-द-बॉक्स चाहिए: एलेवेशन शैडोज़ (`--instui-elevation-*`, `components.css` में), फोकस-आउटलाइन रिंग ( `base.css` में — जब pantoken पेज का मालिक होता है तो हर फोकसेबल इसे पाता है), और Instructure ब्रांड फॉण्ट्स (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` लागू करता है; ऑप्ट-इन `@pantoken/components/fonts.css` `@font-face` woff2s लोड करता है)।

## थीम रंग

`@pantoken/plugin-custom-theme-colors` प्रत्येक पेलट के लिए एक `[data-pantoken-color="…"]` ब्लॉक इमिट करता है
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). प्रत्येक ब्लॉक ब्रांड प्रिमिटिव्स (`--instui-primitive-color-navy-*` और `-blue-*`) को चुनी हुई पेलट की ओर पॉइंट करता है। यह उन ब्रांड सतहों को भी पुनः-व्युत्पन्न करता है जिन्हें अपस्ट्रीम ने लिटरल हेक्स में फ्लैटन कर दिया था, और उनके बेक्ड अल्फा को `color-mix()` के माध्यम से बनाए रखता है। सेमान्टिक स्टेटस रंग, स्पष्ट नीले एक्सेंट, और एलेवेशन शैडोज़ वहीं बने रहते हैं। इसे [swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) में आज़माएँ।

```html
<html data-pantoken-color="sea"></html>
```

### कस्टम ब्रांड रंग

किसी भी हेक्स से रीब्रांड करने के लिए `data-pantoken-color="custom"` सेट करें, जैसे कि Canvas एडमिन द्वारा थीम एडिटर में टाइप किया गया प्राइमरी रंग। pantoken इससे एक पूरा 10–200 `--instui-primitive-color-custom-*` स्केल व्युत्पन्न करता है:

1. **संदर्भ वक्र।** हर स्टेप का लक्ष्य लाइटनेस 13 पेलट्स के उस स्टेप पर OKLCH लाइटनेस का औसत है, जिसमें 0 को सफेद और 210 को काला फ़िक्स किया गया है। इसलिए कस्टम स्केल की स्पेसिंग शिप्ड पेलट्स से मेल खाती है।
2. **एंकर।** इनपुट उस स्टेप पर उतरता है जिसका लक्ष्य लाइटनेस उसके अपने के निकटतम होता है, फिर उसी सटीक लाइटनेस पर स्नैप करता है। `#cccccc` `custom-40` बन जाता है `#c9c9c9` पर: इनपुट के करीब, पर हमेशा समान नहीं। "निकटतम" का अर्थ वक्र पर निकटतम स्टेप है, न कि किसी मौजूदा पेलट रंग के सबसे पास।
3. **फ़िल।** हर दूसरे स्टेप में इनपुट का ह्यू रखा जाता है। इसकी सैचुरेशन एंकर के सापेक्ष पेलट्स के औसत सैचुरेशन वक्र का पालन करती है, और केवल तब कम की जाती है जहाँ रंग sRGB के बाहर गिरता है।

केवल `#rgb` और `#rrggbb` स्वीकार किए जाते हैं; अन्य कुछ भी `TypeError` थ्रो करता है, इसलिए फॉर्म से आने वाला हेक CSS इंजेक्ट नहीं कर सकता।

बिल्ड टाइम पर, व्युत्पन्न प्रिमिटिव्स पहले से घोषित करके पूरा नियम इमिट करें:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

रनटाइम पर रंग चुनने के लिए बिना टोकन सेट शिप किए, वक्र और रीमैप नियम को बिल्ड टाइम पर प्री-कम्प्यूट करें। फिर ब्राउज़र में डिपेंडेंसी-फ्री `/scale` एंट्री का उपयोग करें, और केवल 20 व्युत्पन्न प्रिमिटिव्स सेट करें:

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

प्रत्येक प्लगइन के एक्सपोर्ट्स के लिए [API reference](/api/) देखें।
