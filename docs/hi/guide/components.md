# घटक

`@pantoken/components` Instructure टोकन से निर्मित क्लास-आधारित कंपोनेंट स्टाइल भेजता है। स्टाइलशीट इम्पोर्ट करें और अपने मार्कअप को टैग करें — किसी फ्रेमवर्क की आवश्यकता नहीं।

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> कस्टम एलेमेंट पसंद हैं? `@pantoken/web-components` इन उन्हीं शैलियों को `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` और अन्य के रूप में लपेटता है — देखें [package map](/api/)।

## कन्वेंशन्स

इस पैकेज में CSS कन्वेंशन्स संशोधित [RSCSS](https://ricostacruz.com/rscss/index.html) के एक संस्करण पर आधारित हैं।

मॉडिफायर्स **key-value** हैं — `-<prop>-<val>`, InstUI prop नामों के अनुरूप — इसलिए वे खुद पढ़ने लायक होते हैं: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. बूलियन props केवल prop नाम होते हैं, जिनकी उपस्थिति का अर्थ है `true` (`-has-shadow`, `-clickable`); एक डिफ़ॉल्ट-ऑन बूलियन को बंद करने पर यह उलट जाता है (`-without-background`, `-without-border`). साइज छोटे और लंबे दोनों वर्तनों को स्वीकार करते हैं (`-size-sm` = `-size-small`). जहाँ नाम InstUI से भिन्न होता है, InstUI-सेमेंटिक क्लास अभी भी काम करती है पर यह अप्रचलित है (उदाहरण: `-variant-info` → `-color-info` का उपयोग करें)।

### उदाहरण

Instructure UI React कंपोनेंट:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

pantoken घटक:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

InstUI के `timeout` prop के लिए, मिलीसेकंड में यूनिटलेस `--timeout` कस्टम प्रॉपर्टी सेट करें और Alert interaction लोड करें। सकारात्मक मान dismissal शेड्यूल करता है; `0` (डिफ़ॉल्ट) अलर्ट को अपनी जगह पर छोड़ता है। InstUI के fade के लिए `transition` यूटिलिटी की `instui-transition -fade-entered` क्लासें जोड़ें; त्वरित हटाने के लिए इन्हें छोड़ दें। इंटरैक्शन `-fade-exiting` स्थिति को संचालित करता है और हटाने से पहले एक cancelable, bubbling `dismiss` इवेंट फायर करता है, ताकि एक एप्लिकेशन `preventDefault()` कॉल करके अलर्ट को माउंटेड रख सके।

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

प्रोग्रेस बार `--min` (डिफ़ॉल्ट `0`), `--value`, और `--max` (`100` डिफ़ॉल्ट) के माध्यम से मनमानी स्केल स्वीकार करते हैं, साथ ही अप्रचलित `--value-now` और `--value-max` उपनाम भी हैं। मान बदलने पर InstUI का आधा-सेकंड ट्रांज़िशन लागू करने के लिए `-should-animate` जोड़ें। `.value` रूट का चाइल्ड होते हुए `.bar` के साथ बैठता है; इसे ट्रैक के ऊपर शुरू पर रेंडर करने के लिए `-render-value-inside` जोड़ें (इसे मीटर रंग के खिलाफ पठनीयता के लिए स्टाइल करें)। जीरो-आधारित रेंज के लिए नेटिव `<progress>` का उपयोग करें और जब न्यूनतम शून्य न हो तब `<meter>` का उपयोग करें; वेब कॉम्पोनेंट्स अपने `min` एट्रिब्यूट से स्वचालित रूप से चुनते हैं। InstUI का कोई indeterminate स्टेट नहीं है, इसलिए एक `<progress>` जिसका `value` एट्रिब्यूट गायब है, pantoken-विशिष्ट सर्वश्रेष्ट अनुमान है: `progress-bar` `.bar` को स्लाइडिंग सेगमेंट के रूप में एनिमेट करता है और `progress-circle` अपने रिंग को तय त्रिज्या पर घुमाता है, दोनों `.value` छिपाते हैं।

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

प्रोग्रेस सर्कल समान मनमानी स्केल `--min`, `--value`, और `--max` के माध्यम से स्वीकार करते हैं। `--value-now` और `--value-max` अप्रचलित कार्यात्मक उपनाम के रूप में बने रहते हैं। InstUI के माउंट एनीमेशन को पुन: उत्पन्न करने के लिए `-should-animate` जोड़ें और फोकस्ड इंटरैक्शन बंडल लोड करें; `--animation-delay` एक यूनिटलेस मिलीसेकंड डिले है। अप्रचलित `-should-animate-on-mount` और `-shold-animate-on-mount` वर्तनी कार्यशील उपनाम बने रहते हैं।

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## क्लास प्रीफिक्स

हर क्लास डिफ़ॉल्ट रूप से `instui-` नामस्थान में रहती है। अपना स्टाइलशीट अपना प्रीफिक्स — या कोई नहीं — पास करके किसी बिल्डर को `prefix` दे कर बनाएं। कोई falsy मान (`null`, `undefined`, `""`, या इसे छोड़ देना) प्रीफिक्स को पूरी तरह हटा देता है, ताकि आप `class="heading -level-h1"` लिख सकें बजाय `class="instui-heading -level-h1"` के:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

डैश-प्रिफिक्स्ड मॉडिफायर्स (`.-color-secondary`, `.-level-h1`) दोनों ही तरीकों से अपरिवर्तित रहते हैं। पैकेज द्वारा भेजे गए स्टाइलशीट `instui` प्रीफिक्स रखते हैं।

## बेस

`base.css` एक ऑप्ट-इन रिसेट है जो टोकन्स से वैश्विक डॉक्यूमेंट डिफ़ॉल्ट सेट करता है: `box-sizing`, एक `body` रिसेट, पेज सतह, बेस टेक्स्ट रंग और फ़ॉन्ट, `color-scheme` (ताकि `light-dark()` टोकन्स और नेटिव कंट्रोल्स थीम को ट्रैक करें), और एक बेस लिंक। जब pantoken पेज का मालिक हो तो इसे एक बार लोड करें, कंपोनेंट और प्रोज़ शीट्स से पहले।

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

जब आप घटकों को ऐसे होस्ट में एम्बेड कर रहे हों जो पहले से अपनी `html` और `body` थीम करता हो तो इसे छोड़ दें — रिसेट पेज सतह को पेंट करता है, इसलिए आप नहीं चाहेंगे कि यह होस्ट से टकराए। यह जो कुछ भी सेट करता है वे सभी कम-स्पेसिफ़िसिटी `:where()` सेलेक्टर्स का उपयोग करते हैं, इसलिए आपके अपने नियम हमेशा जीतते हैं।

`base.css` ब्रांड फ़ॉन्ट लागू करता है (`font-family: var(--instui-font-family-base)`, सिस्टम फॉलबैक के साथ); इसे लोड करने के लिए ऑप्ट-इन `fonts.css` इम्पोर्ट करें — `@font-face` Atkinson Hyperlegible Next के नियम हैं, जो पैकेज में भेजे गए woff2s की ओर संकेत करते हैं। यह अलग इसलिए है क्योंकि फ़ॉन्ट्स ~350 kB हैं और फ़ॉन्ट्स को स्वयं होस्ट करना एक जानबूझकर विकल्प है।

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## स्क्रीन रीडर सामग्री

<p>इस वाक्य के बाद एक छिपा संदेश है।<span class="instui-screen-reader-content">केवल स्क्रीन रीडर यह घोषित करते हैं।</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` किसी तत्व को विज़ुअली छुपाता है जबकि उसे एक्सेसिबिलिटी ट्री में रखता है — लेबल और स्टेटस टेक्स्ट के लिए जिसे सहायक तकनीक पढ़े पर डिज़ाइन नहीं दिखाना चाहती।

## यूटिलिटीज़

`utilities.css` क्रॉस-कटिंग क्लासों की एक ऑप्ट-इन परत है: एक `View` प्रिमिटिव, टोकन स्केल पर स्पेसिंग, और सैमेंटिक रंग ओवरराइड। कंपोनेंट `-modifier` क्लासों के विपरीत, ये **डबल डैश** (`--mod`) का उपयोग करते हैं ताकि वे कभी किसी कंपोनेंट के अपने मॉडिफायर्स के नाम से टकराएँ नहीं, और ये किसी भी तत्व पर लागू होते हैं — न्यक्लियर या किसी कंपोनेंट पर कम्पोज़ किए गए।

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue सतह पर on-color टेक्स्ट।</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">mx-auto के साथ केंद्रित।</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` InstUI का `View` है। यह बेस है जिस पर आप स्पेसिंग और रंग लेयर करते हैं, और यह अपनी विजुअल प्रॉप्स के लिए key-value मॉडिफायर्स रखता है ताकि आपको यूटिलिटीज़ तक पहुंचने की आवश्यकता न पड़े: `-background-*` (इसके सतहें), `-border-radius-{small,medium,large,circle,pill}`, `-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`, `-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, और `-cursor-*` — ये `view` के अपने single-dash मॉडिफायर्स हैं, जो नीचे दिए गए double-dash यूटिलिटीज़ से अप्रासंगिक हैं। मुक्त-मूल्य props (width/height/inset) इनलाइन स्टाइल्स में रहते हैं; `margin`/`padding` स्पेसिंग यूटिलिटीज़ का उपयोग करते हैं।

**Spacing** — स्पेसिंग स्केल पर प्रति-पार्श्व क्लासें। इन्हें `{m|p}{side}-{step}` के रूप में पढ़ें: `m` मार्जिन के लिए या `p` पैडिंग के लिए (या पूरे शब्द `margin`/`padding`), एक वैकल्पिक लॉजिकल साइड, फिर एक स्टेप। इसलिए `.--m-lg` और `.--margin-lg` समान हैं, जैसे `.--pt-md` और `.--paddingt-md` समान हैं।

- साइड्स: none (सभी), `t`/`b` (ब्लॉक शुरू/खत्म), `s`/`e` (इनलाइन शुरू/खत्म), `x`/`y` (इनलाइन/ब्लॉक अक्ष)। लॉजिकल साइड्स राइट-टू-लेफ्ट लेआउट्स में सही रहते हैं।
- स्टेप्स: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, और मार्जिन के लिए केवल `auto`।

इन्हें InstUI के `margin="small auto large"` शॉर्टहैंड के लिए मिलाकर बनाएं: `class="--mt-sm --mx-auto --mb-lg"`।

**Color** — पैलेट पर बने सैमेंटिक ओवरराइड: `.--bg-<name>` (पृष्ठभूमि), `.--text-<name>` (टेक्स्ट रंग), और `.--border-<name>` (बॉर्डर रंग)। प्रत्येक `<name>` एक सैमेंटिक रंग टोकन है — इर्रेंट्स (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …) और `accent-*` पैलेट (`accent-blue`, `accent-green`, आदि)। एक नाम केवल तभी वहाँ होता है जब उस फैमिली में टोकन मौजूद हो, इसलिए `text-brand` एक क्लास नहीं है — टेक्स्ट का कोई ब्रांड टोकन नहीं है। किसी प्रिमिटिव या मनमाना हेक्स तक पहुँचने का तरीका नहीं है, और हर ओवरराइड थीम का पालन करता है।

**Token परिवार** — हर "एक टोकन, एक प्रॉपर्टी" परिवार को प्रत्‍येक टोकन के लिए एक क्लास मिलती है, टोकन के नाम पर नामित। स्वतंत्र रूप से संयोजित करें:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (और `-depth1`…`-card`) → `box-shadow`

प्रत्येक केवल अपनी एक प्रॉपर्टी सेट करता है, इसलिए `border-width`/`border-radius` को वास्तव में बॉर्डर ड्रॉ करने के लिए एक `border-*` रंग और एक बॉर्डर स्टाइल चाहिए। ये पूर्ण टोकन नाम (`.--border-radius-md`) का उपयोग करते हैं, जबकि ऊपर के रंग और स्पेसिंग हेल्पर्स शॉर्ट उपनाम (`.--bg-brand`, `.--mt-lg`) का उपयोग करते हैं — उपनाम एर्गोनॉमिक शॉर्टकट हैं; टोकन क्लासें अक्षरशः और व्यापक हैं।

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) और `.--text-align-<value>` (`start`, `center`, `end`, `justify`) InstUI के क्रॉस-कटिंग `display` और `textAlign` प्रॉप्स (View, Button, Metric, Tabs, …) को कवर करते हैं जैसे कॉम्पोज़ेबल क्लासेस — इसलिए वे प्रति-कंपोनेंट मॉडिफायर्स नहीं हैं।

हर डबल-डैश क्लास एक समान-नाम के single-dash कंपोनेंट मॉडिफायर पर कास्केड को निर्णायक रूप से जीतती है, स्टाइलशीट इम्पोर्ट ऑर्डर की परवाह किए बिना — तंत्र के लिए [Authoring conventions](/conventions/authoring) देखें।

यहाँ सब कुछ शुद्ध CSS है जो `--instui-*` टोकन्स द्वारा संचालित होता है, इसलिए यह टोकन लेयर के माध्यम से InstUI का पालन करता है। `componentsCss` और प्रति-कंपोनेंट बिल्डर्स के लिए [API reference](/api/) देखें।

## ओवरले: डायलॉग और पॉपओवर

ओवरले कंपोनेंट नेटिव प्लेटफ़ॉर्म प्रिमिटिव्स पर चलते हैं, इसलिए वे कम या बिना JavaScript के एक्सेसिबल व्यवहार करते हैं।

**Modal** — नेटिव `<dialog>` पर `.instui-modal` लगाएँ। इसे फ़ोकस ट्रैपिंग, `Esc`-to-close, और एक `::backdrop` मुफ्त में मिलता है; बैकड्रॉप को वही `--instui-component-mask-background-color` टोकन डिम करता है जो `.instui-mask` के लिए भी है (इसे frost करने के लिए `-blur` जोड़ें)। Invoker कमांड्स के साथ इसे खोलें और बंद करें — कोई स्क्रिप्ट नहीं:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**Context view / popover** — `.instui-context-view` को `[popover]` एलिमेंट पर रखें और इसे `popovertarget` से टॉगल करें। यह टॉप लेयर पर चलता है और बाहर-क्लिक या `Esc` पर लाइट-डिसमिस होता है, फिर से कोई स्क्रिप्ट नहीं:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — लेआउट रूट पर `.instui-drawer-layout` रखें जिसमें `.tray` और `.content` चाइल्ड हों। ट्रे दिखाने के लिए `open` एट्रिब्यूट (या `-open`) जोड़ें, और इसे inline-end साइड पर डॉक करने के लिए `placement="end"` (या `-placement-end`) का उपयोग करें — प्लेसमेंट लॉजिकल `inset-inline-*`/`flex-direction` प्रॉपर्टीज़ के माध्यम से हल होता है, इसलिए यह `dir="rtl"` के तहत स्वतः पलट जाता है बिना अतिरिक्त नियमों के। फोकस्ड इंटरैक्शन बंडल Invoker कमांड रूटिंग जोड़ता है और जब चौड़ाई `--drawer-layout-min-width` पार करती है तो ओवरले मोड (`should-overlay-tray`) टॉगल करता है (डिफ़ॉल्ट `--instui-breakpoints-sm`, फिर `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — इन-फ्लो ओवरलेज़ के लिए `.instui-mask` रहता है (कार्ड पर स्पिनर); एक मोडाल का `::backdrop` मोडाल केस को कवर करता है।

दोनों पैटर्न `@pantoken/web-components` में बिहेवियरल कस्टम एलेमेंट्स के रूप में भी लपे हुए हैं: `<instui-modal open>` (एक `<dialog>` जो अपने `open` एट्रिब्यूट द्वारा चलाया जाता है) और `<instui-context-view>` (एक नेटिव पॉपओवर)।

ब्राउज़र समर्थन: पॉपओवर API और `popovertarget` Baseline 2024 हैं; invoker कमांड्स (`command`/`commandfor`) Baseline 2025 हैं, इसलिए पुराने ब्राउज़रों पर बटनों को `dialog.showModal()` के साथ एक-लाइन फॉलबैक के रूप में बाँधें। ट्रिगर के पास पॉपओवर को पोजिशन करना CSS एंकर पोजिशनिंग का उपयोग करता है जहाँ समर्थित (Chromium); अन्यथा यह टॉप लेयर में सेंटर होता है।

## फॉर्म्स

**FormField** — `.instui-form-field` एक CSS-Grid रैपर है जो लेबल, कंट्रोल, और किसी भी संदेश को लेआउट करता है। इसे `<label>` पर रखें ताकि लेबल अपने कंट्रोल के साथ नेटिव तरीके से जुड़ सके। इसमें तीन ग्रिड एरियाज हैं — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (डिफ़ॉल्ट) एरियाज़ को स्टैक करता है; `-layout-inline` लेबल को कंट्रोल के बगल में रखता है (कोण `-label-align-{start,end}` और `-v-align-{top,middle,bottom}` से ट्यून करें)। `-readonly` लेबल का रंग बदल देता है।

**required asterisk** तब दिखाई देता है जब फील्ड आवश्यक हो _या_ `-required` क्लास द्वारा _या_ उसके अंदर किसी नेटिव `required` कंट्रोल द्वारा — इसलिए आप केवल इनपुट पर `required` सेट कर सकते हैं और निशान दिखेगा। यह सजावटी है (लेबल पर एक `::after`, एक्सेसिबिलिटी ट्री से बाहर); इसे "फील्ड जिन पर \* है वे आवश्यक हैं" जैसी नोट के साथ जोड़ीए जब तक फ़ॉर्म स्पष्ट न हो।

**FormFieldGroup** — `.instui-form-field-group` संबंधित फ़ील्ड्स को `<fieldset>` में समूहित करता है जिसमें एक `<legend>` विवरण होता है। यह शुद्ध लेआउट है (कोई समर्पित टोकन नहीं): डिफ़ॉल्ट फ़ील्ड्स को स्टैक करता है; `-layout-columns` / `-layout-inline` उन्हें रेस्पॉन्सिव कॉलम में प्रवाहित करते हैं, `-row-spacing-*` / `-col-spacing-*` और `-v-align-*` ग्रिड को ट्यून करने के लिए हैं।

**RadioInputGroup** — `.instui-radio-input-group` वही `<fieldset>`/`<legend>` समूह है, रेडियो के लिए विशिष्ट। चूँकि चाइल्ड रेडियो एक `name` साझा करते हैं, चयन नेटिव रूप से सिंगल-चॉइस होता है — इसलिए एक सेट टॉगल बटनों का एक नियंत्रण की तरह व्यवहार करता है, ढीले बटनों की तरह नहीं। `-variant-simple` (डिफ़ॉल्ट) मानक रेडियोज़ को लेआउट करता है (`-layout-columns`/`-inline` उन्हें रो में प्रवाहित करते हैं); `-variant-toggle` चाइल्ड `.instui-radio.-variant-toggle` बटनों को एक ही सेगमेंटेड कंट्रोल में जोड़ता है (कॉलैप्स्ड बॉर्डर, गोल बाहरी किनारे):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**Messages** — `.instui-form-field-messages` कंटेनर है; प्रत्येक `.instui-form-field-message` एक `-type-*` लेता है: `-type-hint` (ग्रे, डिफ़ॉल्ट), `-type-error` (लाल टेक्स्ट + सर्कल-अलर्ट ग्लिफ़), `-type-success` (हरा टेक्स्ट + सर्कल-चेक ग्लिफ़), और `-type-screenreader-only` (विज़ुअली क्लिप किया गया, फिर भी घोषित)। ग्लिफ़्स `currentColor` में पेंट होते हैं, इसलिए वे हमेशा संदेश के रंग से मेल खाते हैं। `-type-new-error` `-type-error` का अप्रचलित उपनाम है। कंटेनर को कंट्रोल से `aria-describedby` के साथ जोड़ें, और जब त्रुटि हो तो कंट्रोल पर `aria-invalid` सेट करें।

FormField के अंदर, एक `-type-error` संदेश क्लाइंट-साइड वैलिडेशन के बाद आता है: यह तब तक छिपा रहता है जब तक फ़ील्ड का कंट्रोल `:user-invalid` न हो (नेटिव, उपयोगकर्ता के इंटरैक्ट करने के बाद) — या आप इसे `-invalid` के साथ `.instui-form-field` पर मजबूर कर सकते हैं (सर्वर-साइड त्रुटि के लिए)। एक स्टैंडअलोन `.instui-form-field-messages` (फील्ड में न हो) अप्रभावित रहता है। कंट्रोल की फ़ोकस रिंग उसी के अनुसार बदलती है: खतरे पर `:user-invalid`/`-invalid`, सफलता पर `-success`।

**Text controls** — `.instui-text-input` (नेटिव `<input>`), `.instui-text-area` (नेटिव `<textarea>`, रिसाइज़ेबल), और `.instui-simple-select` (नेटिव `<select>` के साथ एक कैरेट) एक ही लुक और वही राज्य साझा करते हैं: `-invalid` (एरर बॉर्डर), `-success` (सक्सेस बॉर्डर), `-readonly`, नेटिव `:disabled`, और `-size-{sm,md,lg}`. एक लीडिंग/ट्रेलिंग आइकन के लिए (InstUI का `renderBeforeInput`/`renderAfterInput`), इनपुट को `.instui-input-group` में रैप करें और एक `.before`/`.after` स्लॉट जोड़ें (एक `-icon-*` ग्लिफ़); `-should-not-wrap` इसे एक पंक्ति पर रखता है। `.instui-number-input` वह फेसैड है साथ में एक `.arrows` +/- स्पिनर कॉलम (नेटिव `type="number"`; बटनों को `stepUp()`/`stepDown()` से बाँधें)। `.instui-range-input` एक स्टाइल्ड `input[type="range"]` है जिसकी वैल्यू एक `.instui-range-input-value` इनवर्स बबल में रेंडर होती है। एक लिस्टबॉक्स पॉपओवर के साथ रिच कॉम्बोबॉक्स के लिए, `@instructure/ui` की ओर देखें — यह लाइब्रेरी नेटिव कंट्रोल्स को कवर करती है।

**Styled select dropdown (प्रायोगिक)** — एक ऑप्ट-इन `select.css` उसी `.instui-simple-select` एलिमेंट को अपग्रेड करता है: यह CSS Customizable Select मॉडल का उपयोग करके खुला ड्रॉपडाउन (पैनल और प्रत्येक विकल्प, hover और selected स्टेट्स सहित) स्टाइल करता है।

> [!WARNING]
> `select.css` `appearance: base-select` / `::picker(select)` पर निर्भर करता है, जो **प्रायोगिक** है (Chrome 135+, अभी तक Baseline नहीं)। यह एक अलग ऑप्ट-इन शीट के रूप में भेजा जाता है और हर नियम `@supports (appearance: base-select)` के पीछे गेटेड है, इसलिए अप्रयुक्त ब्राउज़रों में यह कुछ नहीं करता — `.instui-simple-select` कंट्रोल केवल साधारण नेटिव select ही रहता है। केवल तभी लोड करें जब आप उन्नत ड्रॉपडाउन चाहते हों और सीमित सपोर्ट स्वीकार करते हों।

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
