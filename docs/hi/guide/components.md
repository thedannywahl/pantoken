# घटक

`@pantoken/components` Instructure टोकन्स से बने क्लास-आधारित घटक स्टाइल भेजता है। स्टाइलशीट आयात करें और अपना मार्कअप टैग करें — किसी फ्रेमवर्क की आवश्यकता नहीं।

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> कस्टम एलिमेंट पसंद हैं? `@pantoken/web-components` इन्हीं स्टाइल्स को `<instui-button>`, `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>` आदि के रूप में रैप करता है — देखें [package map](/guide/packages).

## कन्वेंशन्स

इस पैकेज में CSS कन्वेंशन्स संशोधित [RSCSS](https://ricostacruz.com/rscss/index.html) संस्करण पर आधारित हैं।

मॉडिफायर्स **key-value** होते हैं — `-<prop>-<val>`, जो InstUI प्रॉप नामों के अनुरूप हैं — इसलिए वे स्वयं अर्थ रखते हैं: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. बूलियन प्रॉप्स केवल प्रॉप नाम होते हैं, जहाँ मौजूदगी का अर्थ है `true` (`-has-shadow`, `-clickable`) ; एक डिफ़ॉल्ट-ऑन बूलियन को बंद करने पर वह उलट जाता है (`-without-background`, `-without-border`). साइज छोटे और लंबे दोनों रूप स्वीकार करते हैं (`-size-sm` = `-size-small`). जहाँ नाम InstUI से भिन्न होता है, InstUI-सेमान्टिक क्लास अभी भी काम करती है पर यह अप्रचलित है (उदा. `-variant-info` → प्रयोग करें `-color-info`)।

### उदाहरण

Instructure UI React घटक:

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

InstUI के `timeout` प्रॉप के लिये, मिलीसेकंड में यूनिटलेस `--timeout` कस्टम प्रॉपर्टी सेट करें और Alert इंटरैक्शन लोड करें। एक सकारात्मक मान dismissal शेड्यूल करता है; `0` (डिफ़ॉल्ट) अलर्ट को वहीं छोड़ता है। InstUI के fade के लिए `transition` उपयोगिता की `instui-transition -fade-entered` क्लासें जोड़ें; तुरंत हटाने के लिये इन्हें न जोड़ें। इंटरैक्शन `-fade-exiting` स्टेट को ड्राइव करता है और हटाने से पहले cancelable, bubbling `dismiss` इवेंट फायर करता है, ताकि एक एप्लिकेशन `preventDefault()` को कॉल करके अलर्ट को माउंटेड रखा जा सके।

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

प्रोग्रेस बार `--min` (`0` डिफ़ॉल्ट) , `--value` और `--max` (`100` डिफ़ॉल्ट) के माध्यम से मनमाने स्केल स्वीकार करते हैं, पुराने `--value-now` और `--value-max` उपनामों के साथ। मान बदलने पर InstUI के आधे-सेकंड ट्रांज़िशन को लागू करने के लिये `-should-animate` जोड़ें। `.value` `.bar` के साथ रूट का एक चाइल्ड के रूप में मौजूद है; इसे ट्रैक के ऊपर रेंडर करने के लिये `-render-value-inside` जोड़ें, इसकी शुरुआत पर संरेखित — (इसे मीटर रंग के विरुद्ध पठनीयता के लिये स्टाइल करें)। शून्य-आधारित रेंज के लिये नेटिव `<progress>` का उपयोग करें और जब न्यूनतम शून्य न हो तब `<meter>` का; वेब कंपोनेंट्स अपने `min` एट्रिब्यूट से स्वचालित रूप से चयन करते हैं। InstUI में कोई indeterminate स्टेट नहीं है, इसलिए एक `<progress>` जिसका `value` एट्रिब्यूट गायब है, pantoken-विशिष्ट सर्वश्रेष्ठ अनुमान है: `progress-bar` स्लाइडिंग खंड के रूप में `.bar` को एनीमेट करता है और `progress-circle` अपनी रिंग को निश्चित आर्क पर घुमाता है, दोनों `.value` को छुपाते हैं।

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

प्रोग्रेस सर्कल वही मनमाने स्केल `--min`, `--value`, और `--max` के माध्यम से स्वीकार करते हैं। `--value-now` और `--value-max` अप्रचलित फंक्शनल उपनाम के रूप में बने रहते हैं। InstUI की माउंट एनीमेशन को दोहराने के लिए `-should-animate` जोड़ें और फोकस्ड इंटरैक्शन बंडल लोड करें; `--animation-delay` एक यूनिटलेस मिलीसेकंड डिले है। पुराने `-should-animate-on-mount` और `-shold-animate-on-mount` वर्तनी कार्यात्मक उपनाम के रूप में बनी रहती हैं।

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

## क्लास प्रीफ़िक्स

हर क्लास डिफ़ॉल्ट रूप से `instui-` नामस्थान के साथ है। अपना स्वयं का प्रीफ़िक्स — या कोई नहीं — देकर स्टाइलशीट बनाएं `prefix` किसी भी बिल्डर को पास करके। कोई falsy मान (`null`, `undefined`, `""`, या इसे छोड़ना) पूरी तरह प्रीफ़िक्स हटा देता है, इसलिए आप `class="heading -level-h1"` लिख सकते हैं बजाय `class="instui-heading -level-h1"` के:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

डैश-प्रिफिक्स वाले मॉडिफायर्स (`.-color-secondary`, `.-level-h1`) किसी भी स्थिति में अपरिवर्तित रहते हैं। पैकेज द्वारा भेजी गई स्टाइलशीटें `instui` प्रीफ़िक्स रखती हैं।

## बेस

`base.css` एक ऑप्ट-इन रिसेट है जो टोकन्स से ग्लोबल डॉक्यूमेंट डिफ़ॉल्ट सेट करता है: `box-sizing`, एक `body` रिसेट, पेज सतह, बेस टेक्स्ट रंग और फॉन्ट, `color-scheme` (ताकि `light-dark()` टोकन्स और नेटिव कंट्रोल्स थीम को ट्रैक करें), और एक बेस लिंक। जब pantoken पेज का मालिक हो तो इसे कंपोनेंट और प्रोज़ शीट्स से पहले एक बार लोड करें।

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

जब आप घटकों को ऐसे होस्ट में एम्बेड कर रहे हों जो पहले से अपनी `html` और `body` थीम करता हो तो इसे स्किप करें — रिसेट पेज सतह को पेंट करता है, इसलिए आप नहीं चाहेंगे कि यह होस्ट के साथ संघर्ष करे। यह जो कुछ भी सेट करता है वे कम-विशिष्टता `:where()` सेलेक्टर्स का उपयोग करते हैं, इसलिए आपकी अपनी नियम हमेशा जीतते हैं।

`base.css` ब्रांड फ़ॉन्ट लागू करता है (`font-family: var(--instui-font-family-base)`, सिस्टम फॉलबैक्स के साथ); इसे लोड करने के लिए ऑप्ट-इन `fonts.css` को आयात करें — `@font-face` Atkinson Hyperlegible Next के नियम हैं, जो पैकेज में भेजे गए woff2s को इंगित करते हैं। यह अलग है क्योंकि फ़ॉन्ट्स लगभग ~350 kB हैं और self-hosting फ़ॉन्ट्स एक सावधानीपूर्ण विकल्प है।

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## स्क्रीन रीडर सामग्री

<p>इस वाक्य के बाद एक छिपा संदेश है।<span class="instui-screen-reader-content">केवल स्क्रीन रीडर्स इसे प्रकाशित करते हैं।</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` किसी तत्व को दृश्य रूप से छुपाता है जबकि उसे एक्सेसिबिलिटी ट्री में रखता है — लेबल और स्टेटस टेक्स्ट के लिए जिन्हें असिस्टिव टेक्नोलॉजी पढ़नी चाहिए पर डिज़ाइन नहीं दिखाना चाहता।

## यूटिलिटीज़

`utilities.css` एक ऑप्ट-इन क्रॉस-कटिंग क्लास लेयर है: एक `View` प्रिमिटिव, टोकन स्केल पर स्पेसिंग, और सेमान्टिक रंग ओवरराइड्स। कंपोनेंट `-modifier` क्लासों के विपरीत, ये **डबल डैश** (`--mod`) का उपयोग करते हैं ताकि वे कभी किसी कंपोनेंट के अपने मॉडिफायर नामों से टकराएं नहीं, और ये किसी भी तत्व पर लागू होते हैं — सादे, या किसी कंपोनेंट पर जोड़े गए।

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">Accent-blue सतह ऑन-कलर टेक्स्ट के साथ।</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">mx-auto के साथ केंद्रित।</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` InstUI का `View` है। यह वह बेस है जिस पर आप स्पेसिंग और रंग लेयर करते हैं, और यह अपनी विज़ुअल प्रॉप्स के लिए key-value मॉडिफायर्स ले जाता है ताकि आपको उपयोगिताओं तक नहीं पहुंचना पड़े: `-background-*` (इसकी सतहें), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, और `-cursor-*` — ये `view` के अपने single-dash मॉडिफायर्स हैं, जो नीचे दिए गए double-dash यूटिलिटीज़ से असंबंधित हैं। फ्री-वैल्यू प्रॉप्स (width/height/inset) इनलाइन स्टाइल्स रहें; `margin`/`padding` स्पेसिंग यूटिलिटीज़ का उपयोग करते हैं।

**Spacing** — स्पेसिंग स्केल पर प्रति-साइड क्लासें। इन्हें इस तरह पढ़ें `{m|p}{side}-{step}`: `m` मर्जिन के लिए या `p` पैडिंग के लिए (या पूरे शब्द `margin`/`padding`), एक वैकल्पिक लॉजिकल साइड, फिर एक स्टेप। तो `.--m-lg` और `.--margin-lg` समान हैं, जैसे `.--pt-md` और `.--paddingt-md` समान हैं।

- साइड्स: none (सभी), `t`/`b` (ब्लॉक स्टार्ट/एंड), `s`/`e` (इनलाइन स्टार्ट/एंड), `x`/`y` (इनलाइन/ब्लॉक अक्ष)। लॉजिकल साइड्स राइट-टू-लेफ्ट लेआउट में सही रहते हैं।
- स्टेप्स: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, और मर्जिन के लिये `auto`।

इन्हें InstUI के `margin="small auto large"` शॉर्टहैंड के लिये मिलाकर बनाएं:
`class="--mt-sm --mx-auto --mb-lg"`।

**Color** — वे सेमान्टिक ओवरराइड्स जो पैलेट पर बने रहते हैं: `.--bg-<name>` (बैकग्राउंड),
`.--text-<name>` (टेक्स्ट रंग), और `.--border-<name>` (बॉर्डर रंग). हर `<name>` एक सेमान्टिक रंग टोकन है — इरेंट्स (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) और `accent-*` पैलेट (`accent-blue`, `accent-green`, आदि)। केवल वही नाम मौजूद है यदि उस परिवार में टोकन मौजूद है, इसलिए `text-brand` एक क्लास नहीं है — टेक्स्ट में ब्रांड टोकन नहीं है। किसी प्रिमिटिव या मनमाने हेक्स तक पहुंचने का कोई मार्ग नहीं है, और हर ओवरराइड थीम का पालन करता है।

**Token families** — हर "एक टोकन, एक प्रॉपर्टी" परिवार के लिये प्रत्येक टोकन के लिए एक क्लास मिलती है, जिसका नाम टोकन के बाद होता है। इन्हें स्वतंत्र रूप से जोड़ा जा सकता है:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (और `-depth1`…`-card`) → `box-shadow`

हर एक सिर्फ अपनी एक प्रॉपर्टी सेट करता है, इसलिए `border-width`/`border-radius` को वास्तव में बॉर्डर ड्रा करने के लिये एक `border-*` रंग और एक बॉर्डर स्टाइल चाहिए। ये पूर्ण टोकन नाम (`.--border-radius-md`) का उपयोग करते हैं, जबकि ऊपर के रंग और स्पेसिंग हेल्पर शॉर्ट एलियास (`.--bg-brand`, `.--mt-lg`) उपयोग करते हैं — एलियास सुविधाजनक शॉर्टकट हैं; टोकन क्लासें शाब्दिक और व्यापक हैं।

**Layout** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) और `.--text-align-<value>` (`start`, `center`, `end`, `justify`) InstUI के क्रॉस-कटिंग `display` और `textAlign` प्रॉप्स को कवर करते हैं (View, Button, Metric, Tabs, …) जैसा कि कंपोज़ेबल क्लासें — इसलिए वे प्रति-कम्पोनेंट मॉडिफायर्स नहीं हैं।

हर डबल-डैश क्लास किसी समान-नाम वाले single-dash कंपोनेंट मॉडिफायर पर कैस्केड में निर्णायक रूप से जीत जाती है, चाहे स्टाइलशीट आयात ऑर्डर कुछ भी हो — मेकेनिज़्म के लिए देखें [Authoring conventions](/conventions/authoring)।

यहाँ सब कुछ शुद्ध CSS है जो `--instui-*` टोकन्स से चलता है, इसलिए यह टोकन परत के माध्यम से InstUI को ट्रैक करता है। `componentsCss` और प्रति-कम्पोनेंट बिल्डर्स के लिए देखें [API reference](/api/)।

## ओवरले: डायलॉग और पोपओवर

ओवरले कंपोनेंट्स नेटिव प्लेटफॉर्म प्रिमिटिव्स का उपयोग करते हैं, इसलिए वे कम या बिना जावास्क्रिप्ट के एक्सेसिबल व्यवहार करते हैं।

**Modal** — नेटिव `<dialog>` पर `.instui-modal` लगाएं। यह फोकस ट्रैपिंग, `Esc`-to-close, और एक `::backdrop` मुफ़्त में प्राप्त करता है; बैकड्रॉप को वही `--instui-component-mask-background-color` टोकन डिम करता है जो `.instui-mask` के लिये है (इसे फ्रोस्ट करने के लिये `-blur` जोड़ें)। इसे invoker कमांड्स के साथ खोले और बंद करें — कोई स्क्रिप्ट नहीं:

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

**Context view / popover** — `.instui-context-view` को `[popover]` एलिमेंट पर लगाएं और `popovertarget` से इसे टॉगल करें। यह टॉप लेयर पर चलता है और बाहर-क्लिक या `Esc` पर लाइट-डिसमिस होता है, फिर से कोई स्क्रिप्ट नहीं:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — लेआउट रूट पर `.instui-drawer-layout` रखें जिसमें `.tray` और `.content` चाइल्ड्स हों। ट्रे को प्रकट करने के लिये `open` एट्रिब्यूट (या `-open`) जोड़ें, और इसे इनलाइन-एंड साइड पर डॉक करने के लिये `placement="end"` (या `-placement-end`) का उपयोग करें — प्लेसमेंट लॉजिकल `inset-inline-*`/`flex-direction` प्रॉपर्टीज़ के माध्यम से हल होती है, इसलिए यह `dir="rtl"` के तहत स्वचालित रूप से फ्लिप करती है बिना अतिरिक्त नियमों के। फोकस्ड इंटरैक्शन बंडल Invoker कमांड रूटिंग जोड़ता है और चौड़ाई `--drawer-layout-min-width` पार करने पर ओवरले मोड (`should-overlay-tray`) टॉगल करता है (डिफ़ॉल्ट `--instui-breakpoints-sm`, फिर `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — इन-फ्लो ओवरले (एक कार्ड पर स्पिनर) के लिए `.instui-mask` रहता है; एक मोडल का `::backdrop` मोडल केस को कवर करता है।

ये पैटर्न `@pantoken/web-components` में बिहेवियरल कस्टम एलिमेंट्स के रूप में भी रैप किए गए हैं: `<instui-modal open>` (`<dialog>` जिसे इसके `open` एट्रिब्यूट द्वारा संचालित किया जाता है) और `<instui-context-view>` (एक नेटिव पोपओवर)।

ब्राउज़र समर्थन: पोपओवर API और `popovertarget` Baseline 2024 हैं; invoker कमांड्स (`command`/`commandfor`) Baseline 2025 हैं, इसलिए पुराने ब्राउज़रों पर बटन को `dialog.showModal()` के एक-लाइन फॉलबैक से वायर करें। ट्रिगर के बगल में पोपओवर को पोजिशन करने के लिए CSS एंकर पोजिशनिंग का उपयोग जहाँ समर्थित (Chromium) है; अन्यथा यह टॉप लेयर में केंद्रित होता है।

## फॉर्म्स

**FormField** — `.instui-form-field` एक CSS-Grid रैपर है जो लेबल, कंट्रोल, और किसी भी संदेश का लेआउट करता है। इसे `<label>` पर रखें ताकि लेबल स्वाभाविक रूप से अपने कंट्रोल के साथ एसोसिएट हो। इसमें तीन ग्रिड एरिया हैं — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (डिफ़ॉल्ट) एरियाज़ को स्टैक करता है; `-layout-inline` लेबल को कंट्रोल के बगल में रखता है ( `-label-align-{start,end}` और `-v-align-{top,middle,bottom}` से ट्यून करें)। `-readonly` लेबल को रीकलर करता है।

**Required asterisk** तब दिखाई देता है जब फील्ड आवश्यक हो _या तो_ `-required` क्लास द्वारा _या_ इसके अंदर एक नेटिव `required` कंट्रोल द्वारा — इसलिए आप इनपुट पर बस `required` सेट कर सकते हैं और निशान दिखेगा। यह सजावटी है (लेबल पर एक `::after`, एक्सेसिबिलिटी ट्री के बाहर); इसे "fields marked \* are required" जैसे एक नोट के साथ पेयर करें जब तक फॉर्म स्पष्ट न हो।

**FormFieldGroup** — `.instui-form-field-group` संबंधित फील्ड्स को `<fieldset>` में एक `<legend>` विवरण के साथ ग्रुप करता है। यह शुद्ध लेआउट है (कोई समर्पित टोकन्स नहीं): डिफ़ॉल्ट फील्ड्स को स्टैक करता है; `-layout-columns` / `-layout-inline` उन्हें रिस्पॉन्सिव कॉलम्स में बहाते हैं, `-row-spacing-*` / `-col-spacing-*` और `-v-align-*` ग्रिड को ट्यून करने के लिये हैं।

**RadioInputGroup** — `.instui-radio-input-group` वही `<fieldset>`/`<legend>` ग्रुपिंग है, रेडियो के लिये विशिष्ट। क्योंकि चाइल्ड रेडियोज़ एक `name` साझा करते हैं, चयन स्वाभाविक रूप से single-choice होता है — इसलिए टॉगल बटन का सेट एक कंट्रोल के रूप में व्यवहार करता है, अलग-अलग बटन की तरह नहीं। `-variant-simple` (डिफ़ॉल्ट) मानक रेडियोज़ को लेआउट करता है (`-layout-columns`/`-inline` उन्हें एक पंक्ति में बहाते हैं); `-variant-toggle` चाइल्ड `.instui-radio.-variant-toggle` बटनों को एक सिंगल सेगमेंटेड कंट्रोल में जोड़ता है (कोलैप्स्ड बॉर्डर्स, गोल बाहरी किनारे):

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

**Messages** — `.instui-form-field-messages` कंटेनर है; हर `.instui-form-field-message` एक `-type-*` लेता है: `-type-hint` (ग्रे, डिफ़ॉल्ट), `-type-error` (लाल टेक्स्ट + सर्कल-अलर्ट ग्लिफ़), `-type-success` (हरा टेक्स्ट + सर्कल-चेक ग्लिफ़), और `-type-screenreader-only` (दृश्य रूप से क्लिप किया गया, फिर भी घोषित)। ग्लिफ़्स `currentColor` में पेंट होते हैं, इसलिए वे हमेशा संदेश रंग से मेल खाते हैं। `-type-new-error` `-type-error` का अप्रचलित उपनाम है। कंटेनर को कंट्रोल के साथ `aria-describedby` से वायर करें, और त्रुटि होने पर कंट्रोल पर `aria-invalid` सेट करें।

FormField के अंदर, एक `-type-error` संदेश क्लाइंट-साइड वैलिडेशन के बाद आता है: यह तब तक छिपा रहता है जब तक फील्ड का कंट्रोल `:user-invalid` न हो (नेटिव, उपयोगकर्ता की इंटरैक्शन के बाद) — या आप `-invalid` को `.instui-form-field` पर सेट करके इसे ज़बरदस्ती दिखा सकते हैं (सर्वर-साइड त्रुटि के लिये)। एक स्टैंडअलोन `.instui-form-field-messages` (फील्ड में नहीं) अप्रभावित रहता है। कंट्रोल की फोकस रिंग भी समान अनुशासन का पालन करती है: `:user-invalid`/`-invalid` पर danger, `-success` पर success।

**Text controls** — `.instui-text-input` (नेटिव `<input>`), `.instui-text-area` (नेटिव `<textarea>`, रिसाइज़ेबल), और `.instui-simple-select` (नेटिव `<select>` के साथ एक केयरट) एक ही लुक और स्टेट्स शेयर करते हैं: `-invalid` (error बॉर्डर), `-success` (success बॉर्डर), `-readonly`, नेटिव `:disabled`, और `-size-{sm,md,lg}`. लीडिंग/ट्रेलिंग आइकन (InstUI के `renderBeforeInput`/`renderAfterInput`) के लिये, इनपुट को `.instui-input-group` में रैप करें और `.before`/`.after` स्लॉट जोड़ें (एक `-icon-*` ग्लिफ़); `-should-not-wrap` इसे एक ही लाइन पर रखता है। `.instui-number-input` वह फेसाड है और एक `.arrows` +/- स्पिनर कॉलम (नेटिव `type="number"`; बटनों को `stepUp()`/`stepDown()` से वायर करें)। `.instui-range-input` एक स्टाइल्ड `input[type="range"]` है जिसका मान `.instui-range-input-value` इनवर्स बबल में रेंडर होता है। एक रिच कॉम्बोबॉक्स के लिये एक लिस्टबॉक्स पोपओवर के साथ, `@instructure/ui` का उपयोग करें — यह लाइब्रेरी नेटिव कंट्रोल्स को कवर करती है।

**Styled select dropdown (प्रायोगिक)** — एक ऑप्ट-इन `select.css` वही `.instui-simple-select` एलिमेंट अपग्रेड करता है: यह ओपन ड्रॉपडाउन (पैनल और प्रत्येक विकल्प, hover और selected स्टेट्स के साथ) को CSS Customizable Select मॉडल का उपयोग करके स्टाइल करता है।

> [!WARNING]
> `select.css` `appearance: base-select` / `::picker(select)` पर निर्भर करता है, जो **प्रायोगिक** है (Chrome 135+, अभी Baseline नहीं)। यह एक अलग ऑप्ट-इन शीट के रूप में भेजा जाता है और हर नियम `@supports (appearance: base-select)` के पीछे गेटेड है, इसलिए असमर्थित ब्राउज़रों में यह कुछ नहीं करता — `.instui-simple-select` कंट्रोल बस सामान्य नेटिव select रहता है। केवल तभी लोड करें जब आप उन्नत ड्रॉपडाउन चाहते हों और सीमित समर्थन स्वीकार करते हों।

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
