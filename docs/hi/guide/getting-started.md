# शुरूआत

Pantoken [Instructure UI](https://instructure.design) डिज़ाइन टोकन और आइकन लेता है, उन्हें एक बार रिज़ॉल्व करता है, और उस एक मॉडल को कई प्लेटफ़ॉर्म के लिए पैकेजेस में पुनः आकार देता है: सादा स्टाइलशीट्स, SCSS और Less, React और Vue और Svelte, Tailwind और Panda, नेटिव Swift और Kotlin, WordPress और Drupal, Figma, और अन्य।

आप उस सबसे छोटे पैकेज को इंस्टॉल करते हैं जो आपके कार्य के अनुरूप हो। सबकुछ समेकित `pantoken` पैकेज द्वारा भी री‑एक्सपोर्ट किया जाता है, इसलिए आप वहां से शुरू कर सकते हैं और बाद में संकुचित कर सकते हैं।

## एक शुरुआती प्रोजेक्ट बनाएं

pantoken आज़माने का सबसे तेज़ तरीका: एक स्टार्ट‑प्रोजेक्ट स्कैफ़ोल्ड करें जिसमें यह पहले से इंस्टॉल और वायर किया गया हो।

```sh
npx create-pantoken-app
```

प्लेटफ़ॉर्म: `components` (सादा HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. देखिए
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) में `--dir <path>` और प्रोग्रामैटिक उपयोग के लिए।

AI कोडिंग एजेंट का उपयोग कर रहे हैं? कोई इंस्टॉल आवश्यक नहीं — सीधे उस स्किल की ओर पॉइंट करें:

```prompt
create.pantoken.app/SKILL.md को प्राप्त करें और इस परियोजना में pantoken सेट अप करने के लिए इसका पालन करें।
```

यदि आप pantoken के एजेंट नियमों को रेपो में स्थायी रूप से जोड़ना चाहते हैं (AGENTS.md, एडिटर नियम, इस स्किल की लोकल कॉपी), तो इसके बजाय `npx @pantoken/ai init` चलाएँ।

## टोकन मॉडल

टोकन CSS कस्टम प्रॉपर्टीज़ हैं जिन्हें `--instui-<group>-<name>` के रूप में नामित किया गया है, उदाहरण के लिए
`--instui-color-background-brand` या `--instui-spacing-space-md`. तीन थीम शिप होती हैं: `rebrand`
(डिफ़ॉल्ट, जहां light और dark भिन्न होते हैं `light-dark()`), `canvas`, और `canvasHighContrast`।
आइकन `<image>` टोकन हैं (`--instui-icon-<name>`) जो Lucide से और Instructure के कस्टम ग्लिफ़्स से व्युत्पन्न होते हैं।

## वेब ऐप को स्टाइल करें

स्टाइलशीट इंस्टॉल करें और एक बार आयात करें। यह हर `--instui-*` प्रॉपर्टी परिभाषित करता है, इसलिए आप उन्हें सीधे अपनी CSS में संदर्भित कर सकते हैं।

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

आइकन CSS कस्टम प्रॉपर्टीज़ हैं (`--instui-icon-<name>`). स्टाइलशीट एक बार लोड करें और किसी भी आइकन को `mask-image` या `background-image` के रूप में संदर्भित करें — प्रति‑आइकन आयात की आवश्यकता नहीं।

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — एकल आइकन बनाम पूरा सेट

`@pantoken/icons` दो नामित एक्सपोर्ट्स प्रकट करता है। पूरा एरे इटरैट किए बिना एक आइकन खींचने के लिए `iconsByName` का उपयोग करें:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

जब आपको पूरा सेट चाहिए (उदा. एक पिकर बनाने के लिए), तो ```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
``` में `icons` का उपयोग करें:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

दोनों एक्सपोर्ट्स मॉड्यूल इनिशियलाइज़ेशन पर पूरा IR लोड करते हैं — इस स्तर पर प्रति‑आइकन ट्री‑शेकिंग नहीं होती। हल्की CSS‑केवल लोडिंग के लिए, केवल आवश्यक आइकन के लिए संयोजित URL जनरेट करने हेतु [CDN picker](/guide/cdn-picker) का उपयोग करें।

## नेटिव प्लेटफ़ॉर्म के लिए जनरेट करें

CLI टोकन स्रोत को लक्षित रेपो में लिखता है। रनर के अलावा कोई इंस्टॉल आवश्यक नहीं:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

हर लक्ष्य के लिए देखिए [the pantoken CLI](/guide/cli)।

## VS Code लेखन संकेत

`@pantoken/pantoken` अब VS Code कस्टम‑डेटा फ़ाइलें शिप करता है ताकि डाउनस्ट्रीम प्रोजेक्ट बिना pantoken‑विशिष्ट एक्सटेंशन इंस्टॉल किए HTML/CSS में क्लास और टोकन ऑटो‑कम्प्लीशन प्राप्त कर सकें।

1. समेकित पैकेज इंस्टॉल करें:

```sh
npm i @pantoken/pantoken
```

1. अपने कंज्यूमर वर्कस्पेस से शिप की गई कस्टम‑डेटा JSON की ओर VS Code पॉइंट करें:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. नया डेटा लागू करने के लिए VS Code री‑लोड करें (या "Developer: Reload Window" चलाएँ)।

यह `instui-*` क्लास टोकन (और `-modifier` क्लास टोकन) के साथ-साथ `--instui-*` कस्टम प्रॉपर्टीज़ के लिए सुझाव सक्षम करता है।

## आगे कहां

- [पैकेज मैप](/guide/packages) — कार्य के अनुसार किस पैकेज तक पहुंचें।
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — कंज्यूमर रेपो में एजेंट एसेट्स और नियम इंस्टॉल करें।
- [आर्किटेक्चर](/guide/architecture) — टोकन मॉडल, कोर, और आउटपुट कैसे मेल खाते हैं।
- [API संदर्भ](/api/) — हर एक्सपोर्ट किया गया सिंबल, स्रोत से जनरेट किया गया।
