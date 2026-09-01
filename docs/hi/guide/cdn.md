# CDN और वितरण

pantoken हर पैकेज को npm पर प्रकाशित करता है, इसलिए आप टोकन, कंपोनेंट और वेब कंपोनेंट सीधे CDN से खींच सकते हैं — कोई बिल्ड स्टेप नहीं, कोई बंडलर नहीं। यह पृष्ठ CSS कॉम्बाइन URL (इंटरएक्टिव बिल्डर के साथ) और वेब-कंपोनेंट ड्रॉप-इन कवर करता है।

## टोकन फाउंडेशन

हर pantoken कंपोनेंट पेज पर एक टोकन शीट से `--instui-*` कस्टम प्रॉपर्टी पढ़ता है। दो वेरिएंट शिप होते हैं:

- `@pantoken/css/dist/style.lean.css` — अनुशंसित CDN फाउंडेशन। यह सभी टोकन लेकर चलता है सिवाय पूर्ण आइकन सेट के, तो यह लगभग 23 KB gzipped है।
- `@pantoken/css/dist/style.css` — पूरा शीट, जिसमें सभी ~1,777 आइकन ग्लिफ़ टोकन शामिल हैं (`--instui-icon-*`)। लगभग 140 KB gzipped। इसे लोड करें यदि आप व्यापक रूप से आइकनों का संदर्भ लेते हैं `var(--instui-icon-*)` के माध्यम से।

एलीवेशन स्केल और फ़ोकस-रिंग वेरिएबल दोनों शीट्स में रहते हैं, इसलिए केवल फाउंडेशन लोड होने पर भी शैडोज़ और फ़ोकस रिंग काम करते हैं।

## अपने कंपोनेंट और आइकन चुनें

[इंटरएक्टिव CDN पिकर](/guide/cdn-picker) CSS के लिए jsDelivr कॉम्बाइन URL और JavaScript पैकेजों के स्निपेट बनाता है। इसे खोलें, जो चाहिए चुनें, और उत्पन्न आउटपुट कॉपी करें।

- **Components टैब** — व्यक्तिगत कॉम्पोनेंट स्टाइलशीट या पूरा `components.css` बैरल चुनें। यदि जरूरत हो तो बेस रिसेट या spacing/color यूटिलिटीज़ जोड़ें।
- **JS टैब** — `@pantoken/interactions` के लिए एक ESM import स्निपेट कॉपी करें।
- **Icons टैब** — InstUI सेट (~1,800 आइकन) या Simple Icons (~3,300 ब्रांड ग्लिफ़) से व्यक्तिगत आइकन चुनें। पिकर आइकन CSS फाइलों के लिए एक अलग कॉम्बाइन URL आउटपुट करता है ताकि आप केवल वही आइकन लोड करें जो आप वास्तव में उपयोग करते हैं।
- **Web Components टैब** — `@pantoken/web-components` स्निपेट (ESM selective register या क्लासिक स्क्रिप्ट बूटस्ट्रैप) बनाएँ।

प्रत्येक कंपोनेंट फ़ाइल छोटी होती है — अधिकतर लगभग 2 KB। एक कंपोनेंट जो आइकन रेंडर करता है (`alert`, `checkbox`, और कुछ अन्य) को वे ग्लिफ़ चाहिए, इसलिए बिल्डर lean शीट चुनने पर `@pantoken/components/dist/component-icons.css` (लगभग 0.5 KB gzipped — उन 11 आइकन जो कंपोनेंट सेट उपयोग करता है) जोड़ देता है। पूरा शीट पहले से ही उन्हें रखता है।

### लोड क्रम और फ़ॉन्ट्स

पहले टोकन फाउंडेशन लोड करें, फिर वैकल्पिक बेस रिसेट, फिर कंपोनेंट फ़ाइलें, और अंत में यूटिलिटीज़ — वे ओवरराइड यूटिलिटीज़ हैं, इसलिए वे किसी कंपोनेंट के अपने नियम को केवल तब ओवरराइड करते हैं जब वे कैस्केड में उसके बाद आते हैं। ऊपर दिया कॉम्बाइन URL पहले से ही इन्हें उचित क्रम में रखता है। फ़ॉन्ट्स एकमात्र अपवाद हैं: `@pantoken/components/dist/fonts.css` सापेक्ष पाथ द्वारा फ़ॉन्ट फ़ाइलों की ओर इशारा करता है, इसलिए combine उन्हें फिर से लिख नहीं सकता — इसे अपने अलग `<link>` के रूप में लोड करें:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### एक साथ सब कुछ

पिकर में **All components** चुनकर इसे बैरल पर स्विच करें, या खुद डायरेक्ट पॉइंट करें (लगभग 141 KB gzipped) साथ ही टोकन शीट:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## वेब कंपोनेंट्स

`@pantoken/web-components` framework-agnostic `<instui-*>` कस्टम एलिमेंट्स रजिस्टर करता है। वे अपनी खुद की CSS इनलाइन करते हैं, पर अभी भी पेज पर एक शीट से टोकन पढ़ते हैं, इसलिए एक टोकन फाउंडेशन भी लोड करें।

### ES मॉड्यूल (अनुशंसित)

एक ESM CDN पैकेज की निर्भरताओं को आपके लिए रिज़ॉल्व कर देता है। यह हर एलिमेंट को रजिस्टर करता है:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

फुल टोकन शीट का उपयोग करें (या lean शीट प्लस `component-icons.css`) ताकि `<instui-alert>` जैसे आइकन-रेंडरिंग एलिमेंट अपने ग्लिफ़्स को रिज़ॉल्व कर सकें।

केवल कुछ एलिमेंट — और उनके नेस्टेड डिपेंडेंसीज़ — रजिस्टर करने के लिए `register` इम्पोर्ट करें और `only` पास करें:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### क्लासिक स्क्रिप्ट टैग

नो-मॉड्यूल ड्रॉप-इन के लिए IIFE बिल्ड लोड करें। यह अपनी निर्भरताओं को बंडल करता है और लोड पर हर एलिमेंट को ऑटो-रजिस्टर करता है, एक `PantokenWebComponents` ग्लोबल एक्सपोज़ करते हुए:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

यह ESM पाथ से बड़ा है — यह `@pantoken/components` और `@pantoken/icons` को इनलाइन करता है — इसलिए केवल तब इसे चुनें जब आप मॉड्यूल का उपयोग नहीं कर सकते।

## वर्ज़न पिन करना

ऊपर के URLs — और जो पिकर लिखता है — नवीनतम रिलीज़ को ट्रैक करते हैं। प्रोडक्शन के लिए एक मेजर (या सटीक) वर्ज़न पिन करें — उदाहरण के लिए `@pantoken/css@0` — ताकि एक अपग्रेड आपको आश्चर्यचकित न करे।
