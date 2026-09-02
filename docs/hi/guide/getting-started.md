# शुरू करें

pantoken Instructure UI के डिजाइन टोकन और आइकन लेता है, उन्हें एक बार रिसॉल्व करता है, और उस एक
मॉडल को कई प्लेटफ़ॉर्म्स के लिए पैकेजों में फिर आकार देता है: साधारण स्टाइलशीट्स, SCSS और Less, React और Vue और Svelte,
Tailwind और Panda, नेटिव Swift और Kotlin, WordPress और Drupal, Figma, और अन्य।

अपने कार्य के अनुरूप सबसे छोटा पैकेज इंस्टॉल करें। सब कुछ एकीकृत `pantoken` पैकेज द्वारा भी री-एक्सपोर्ट किया जाता है, इसलिए आप वहीं से शुरू करके बाद में संकुचित कर सकते हैं।

## एक स्टार्टर्स प्रोजेक्ट बनाएं

pantoken आज़माने का सबसे तेज़ तरीका: एक स्टार्टर्स प्रोजेक्ट स्कैफ़ोल्ड करें जिसमें यह पहले से इंस्टॉल और वायर किया गया हो।

```sh
npx create-pantoken-app react
```

प्लेटफ़ॉर्म्स: `components` (साधारण HTML/CSS), `react`, `vue`, `svelte`, `web-components`, `angular`. देखें
[`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) के लिए `--dir <path>` और
प्रोग्रामेटिक उपयोग।

AI कोडिंग एजेंट का उपयोग कर रहे हैं? कोई इंस्टॉल आवश्यक नहीं — सीधे स्किल की ओर पॉइंट करें:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

यह Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, और Amazon Q
Developer CLI के साथ भी समान रूप से काम करता है — `claude` को `gemini`, `agent`, `codex`, `copilot -p`, या `q chat` से बदल दें। अगर आप pantoken के एजेंट नियमों को रिपो में स्थायी रूप से वायर करना चाहते हैं (AGENTS.md, एडिटर नियम, इस स्किल की लोकल कॉपी), तो इसके बजाय `npx @pantoken/ai init` चलाएँ।

## टोकन मॉडल

टोकन CSS कस्टम प्रॉपर्टीज़ हैं जिनके नाम `--instui-<group>-<name>` हैं, उदाहरण के लिए
`--instui-color-background-brand` या `--instui-spacing-space-md`. तीन थीम आती हैं: `rebrand`
(डिफ़ॉल्ट, जहाँ light और dark अलग होते हैं वहां `light-dark()`), `canvas`, और `canvasHighContrast`।
आइकन `<image>` टोकन हैं (`--instui-icon-<name>`) जो Lucide से निकले हुए और Instructure के कस्टम
ग्लिफ़्स से व्युत्पन्न हैं।

## एक वेब ऐप को स्टाइल करें

स्टाइलशीट इंस्टॉल करें और एक बार इम्पोर्ट करें। यह हर `--instui-*` प्रॉपर्टी को परिभाषित करता है, इसलिए आप
उन्हें सीधे अपने CSS से रेफ़र कर सकते हैं।

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

## कहीं भी आइकन का उपयोग करें

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

आइकन CSS कस्टम प्रॉपर्टीज़ हैं (`--instui-icon-<name>`)। स्टाइलशीट को एक बार लोड करें और किसी भी
आइकन को `mask-image` या `background-image` के रूप में संदर्भित करें — किसी-एक-आइकन के लिए अलग इम्पोर्ट की ज़रूरत नहीं।

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### JavaScript — एकल आइकन बनाम पूरा सेट

`@pantoken/icons` दो नामित एक्सपोर्ट प्रदान करता है। एक आइकन को बिना पूरे एरे को इतरेट किए खींचने के लिए `iconsByName` का उपयोग करें:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

पूरा सेट (उदाहरण के लिए, एक पिकर बनाने के लिए) जब चाहिए तो `icons` का उपयोग करें:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

दोनों एक्सपोर्ट मॉड्यूल इनिशियलाईज़ेशन पर पूरा IR लोड करते हैं — इस लेयर पर प्रति-आइकन ट्री-शेकिंग नहीं होती। हल्की केवल CSS-लोडिंग के लिए, केवल उन आइकॉनों के लिए एक संयोजित URL जनरेट करने हेतु [CDN picker](/guide/cdn-picker) का उपयोग करें जो आपको चाहिए।

## नेटिव प्लेटफ़ॉर्म के लिए जनरेट करें

CLI टोकन स्रोत को लक्षित रिपो में लिखता है। रनर को छोड़कर कोई इंस्टॉल नहीं:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

हर लक्ष्य के लिए देखें [the pantoken CLI](/guide/cli)।

## VS Code लेखन संकेत

`@pantoken/pantoken` अब VS Code कस्टम-डेटा फ़ाइलें भेजता है ताकि डाउनस्ट्रीम प्रोजेक्ट बिना pantoken-विशिष्ट एक्सटेंशन इंस्टॉल किए HTML/CSS में क्लास और टोकन कम्पलीशन प्राप्त कर सकें।

1. एकीकृत पैकेज इंस्टॉल करें:

```sh
npm i @pantoken/pantoken
```

1. अपने कंज़्यूमर वर्कस्पेस से भेजी गई कस्टम-डेटा JSON की ओर VS Code को पॉइंट करें:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. नए डेटा को लागू करने के लिए VS Code री-लोड करें (या "Developer: Reload Window" चलाएँ)।

यह `instui-*` क्लास टोकन्स (और `-modifier` क्लास टोकन्स) साथ ही
`--instui-*` कस्टम प्रॉपर्टीज़ के लिए सुझाव सक्षम करता है।

## आगे कहां जाएँ

- [पैकेज मैप](/guide/packages) — कार्य के हिसाब से कौन सा पैकेज चुनना है।
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — एक कंज़्यूमर रिपो में एजेंट ऐसेट्स और नियम इंस्टॉल करें।
- [आर्किटेक्चर](/guide/architecture) — कैसे टोकन मॉडल, कोर, और आउटपुट एक साथ फिट होते हैं।
- [API संदर्भ](/api/) — स्रोत से जनरेट किए गए हर एक्सपोर्टेड सिम्बल।
