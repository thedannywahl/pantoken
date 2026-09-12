# आरंभ करना

Pantoken [Instructure UI](https://instructure.design) डिज़ाइन टोकन और आइकन लेता है, उन्हें एक बार resolve करता है, और उस एक
मॉडल को कई प्लेटफ़ॉर्म के लिए पैकेजों में रूपांतरित करता है: साधारण स्टाइलशीट, SCSS और Less, React और Vue और Svelte,
Tailwind और Panda, नेटिव Swift और Kotlin, WordPress और Drupal, Figma, और अन्य।

अपने कार्य के लिए सबसे छोटा उपयुक्त पैकेज इंस्टॉल करें। सब कुछ समेकित `pantoken` पैकेज द्वारा भी re-export किया जाता है, इसलिए आप वहीं से शुरू कर सकते हैं और बाद में 좁ा कर सकते हैं।

## एक स्टार्टर प्रोजेक्ट स्कैफ़ोल्ड करें

Pantoken आज़माने का सबसे तेज़ तरीका: ऐसा स्टार्टर प्रोजेक्ट स्कैफ़ोल्ड करें जिसमें यह पहले से इंस्टॉल और वायर्ड हो।

```sh
npx create-pantoken-app
```

प्लेटफ़ॉर्म: `components` (साधारण HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. देखें
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) `--dir <path>` और
प्रोग्रामैटिक उपयोग के लिए।

AI कोडिंग एजेंट का उपयोग कर रहे हैं? कोई इंस्टॉल आवश्यक नहीं — सीधे उसे इस स्किल की ओर इंगित करें:

```prompt
create.pantoken.app/SKILL.md को प्राप्त करें और इस प्रोजेक्ट में pantoken सेटअप करने के लिए इसका पालन करें।
```

यदि आप pantoken के एजेंट नियमों को रिपॉजिटरी में स्थायी रूप से वायर्ड करना चाहते हैं (AGENTS.md, एडिटर नियम, इस स्किल की लोकल कॉपी), तो इसके बजाय `npx @pantoken/ai init` चलाएँ।

## टोकन मॉडल

टोकन CSS कस्टम प्रॉपर्टीज़ के रूप में नामित होते हैं `--instui-<group>-<name>`, उदाहरण के लिए
`--instui-color-background-brand` या `--instui-spacing-space-md`. तीन थीम भेजी जाती हैं: `rebrand`
(डिफ़ॉल्ट, जहाँ light और dark अलग होते हैं `light-dark()`), `canvas`, और `canvasHighContrast`.
आइकन `<image>` टोकन हैं (`--instui-icon-<name>`) जो Lucide और Instructure के कस्टम
ग्लिफ्स से व्युत्पन्न हैं।

## वेब ऐप को स्टाइल करें

स्टाइलशीट इंस्टॉल करें और एक बार इम्पोर्ट करें। यह हर `--instui-*` प्रॉपर्टी को परिभाषित करता है, इसलिए आप
इन्हें सीधे अपनी CSS से संदर्भित कर सकते हैं।

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

## किसी भी जगह आइकन उपयोग करें

वेब कंपोनेंट किसी भी फ्रेमवर्क में काम करता है, बिना पोर्टिंग के।

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### CSS टोकन

आइकन CSS कस्टम प्रॉपर्टीज़ हैं (`--instui-icon-<name>`). स्टाइलशीट एक बार लोड करें और किसी भी
आइकन को `mask-image` या `background-image` के रूप में संदर्भित करें — प्रति-आइकन इम्पोर्ट की आवश्यकता नहीं।

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — एकल आइकन बनाम पूरा सेट

`@pantoken/icons` दो नामित एक्सपोर्ट उजागर करता है। एक आइकन को बिना पूरे array को iterate किए खींचने के लिए `iconsByName` का उपयोग करें:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

जब आपको पूरा सेट चाहिए (उदा. एक पिकर बनाने के लिए) तो `icons` का उपयोग करें:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

दोनों एक्सपोर्ट मॉड्यूल इनिशियलाइज़ेशन पर पूरा IR लोड करते हैं — इस स्तर पर प्रति-आइकन tree-shaking नहीं होता। हल्के CSS-ओनली लोडिंग के लिए, केवल आवश्यक आइकनों के लिए एक संयुक्त URL जनरेट करने के लिये [CDN picker](/guide/cdn-picker) का उपयोग करें।

## नेटिव प्लेटफ़ॉर्म के लिए जेनरेट करें

CLI टोकन स्रोत को लक्ष्य रिपॉज़िटरी में लिखता है। रनर के अलावा किसी इंस्टॉल की आवश्यकता नहीं:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

हर टारगेट के लिए [the pantoken CLI](/guide/cli) देखें।

## VS Code लेखन संकेत

`@pantoken/pantoken` अब VS Code कस्टम-डेटा फ़ाइलें भेजता है ताकि डाउनस्ट्रीम प्रोजेक्ट बिना pantoken-विशिष्ट एक्सटेंशन इंस्टॉल किए HTML/CSS में क्लास और टोकन पूर्णता पा सकें।

1. समेकित पैकेज इंस्टॉल करें:

```sh
npm i @pantoken/pantoken
```

1. अपने कंज्यूमर वर्कस्पेस से भेजी गई custom-data JSON की ओर VS Code इंगित करें:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. नए डेटा को लागू करने के लिए VS Code को रीलोड करें (या "Developer: Reload Window" चलाएँ).

यह `instui-*` क्लास टोकन (और `-modifier` क्लास टोकन) के साथ-साथ
`--instui-*` कस्टम प्रॉपर्टीज़ के लिए सुझाव सक्षम करता है।

## आगे कहाँ जाएँ

- [पैकेज मानचित्र](/api/) — कार्य के अनुसार किस पैकेज तक पहुँचें।
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — कंज्यूमर रिपॉज़िटरी में एजेंट एसेट्स और नियम इंस्टॉल करें।
- [आर्किटेक्चर](/guide/architecture) — कैसे टोकन मॉडल, कोर, और आउटपुट एक साथ फिट होते हैं।
- [API संदर्भ](/api/) — स्रोत से जनरेट किए गए हर एक्सपोर्टेड सिम्बल।
