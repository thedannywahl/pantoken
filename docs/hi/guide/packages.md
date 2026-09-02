# पैकेज मानचित्र

pantoken छोटे, एक-उद्देश्य वाले पैकेजों का एक मोनोरिपो है जिन्हें बकेट्स में समूहित किया गया है। वह पैकेज इंस्टॉल करें जो आपके कार्य के लिए उपयुक्त हो, या संहिताबद्ध `pantoken` पैकेज इंस्टॉल करके उसके सबपाथ से इम्पोर्ट करें (उदाहरण के लिए `pantoken/css`, `pantoken/react`, `pantoken/tailwind`)।

## कोर

साझा मॉडल और वह ट्रांसफॉर्मर जिस पर बाकी सब कुछ बनता है।

| पैकेज                                                   | यह क्या करता है                                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | शून्य-निर्भरता TypeScript प्रकार: `Token` आकार और प्लगइन कॉन्ट्रैक्ट।                           |
| [`@pantoken/core`](/api/packages/core/src/)             | अपस्ट्रीम टोकन और आइकन को canonical IR में हल करता है, और CSS रेंडर करता है।                    |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | हल किया हुआ IR स्थैतिक JSON के रूप में, प्रति थीम, साथ में Tokens Studio का raw स्रोत।          |
| [`@pantoken/utils`](/api/packages/utils/src/)           | टोकन रेजॉल्वर, रेफरेंस regexes, केस और कलर हेल्पर, ड्रिफ्ट चेक, और token→utility-class इमिटर्स। |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | pantoken प्लगइन्स को `definePlugin` के साथ बिल्ड और compose करने के लिए।                        |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — नेटिव और प्लेटफ़ॉर्म स्रोत इमिट करता है।                         |

## फ़ॉर्मेट्स

टोकन्स को किसी फ़ाइल फ़ॉर्मेट में बदलना।

| पैकेज                                                  | आउटपुट                                                                                                                                                                                       |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-टाइप्ड CSS जिसमें `light-dark()` और डेटा-URI आइकन शामिल हैं।                                                                                                                     |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS वेरिएबल्स, एक single mode में हल किए हुए।                                                                                                                                               |
| [`@pantoken/less`](/api/formats/less/src/)             | Less वेरिएबल्स।                                                                                                                                                                              |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus वेरिएबल्स।                                                                                                                                                                            |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | एक W3C Design Tokens (DTCG) दस्तावेज़।                                                                                                                                                       |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR को JavaScript और JSON के रूप में (Core के अंतर्गत भी सूचीबद्ध)।                                                                                                                           |
| [`@pantoken/icons`](/api/formats/icons/src/)           | आइकन टोकन्स पर एक ergonomic दृश्य।                                                                                                                                                           |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | एक आइकन वेब फ़ॉन्ट (TTF, WOFF2) और उसका CSS।                                                                                                                                                 |
| [`@pantoken/components`](/api/formats/components/src/) | InstUI-लुक CSS कंपोनेंट लाइब्रेरी (बटन, अलर्ट, टेबल और अन्य) साथ ही बेस रीसेट, फोकस रिंग, prose स्टाइलिंग, क्रॉस-कटिंग यूटिलिटीज़ और ब्रांड फ़ॉन्ट्स। देखें [Components](/guide/components). |

## रेंडरर्स

फ्रेमवर्क और टूल इंटीग्रेशन्स।

| पैकेज                                                                                                                                            | किसके लिए                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks, `<Icon>`, और एक टोकन प्रोवाइडर के लिए।           |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | वेब कंपोनेंट, प्रत्येक फ्रेमवर्क में वायर किया हुआ।           |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-फ्रेंडली टोकन ऑब्जेक्ट्स (कोई CSS वेरिएबल्स नहीं)। |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` और styled प्रिमिटिव्स, फ्रेमवर्क-agnostic।    |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Astro साइट्स के लिए टोकन सेटअप।                               |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Markdown में आइकन टोकन्स और स्वैचेस।                          |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | आइकन कोड्स और कलर स्वैचेस के लिए एक markdown-it प्लगइन।       |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | styled-components और Emotion के लिए एक टाइप-सेफ थीम।          |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | एक Material UI थीम।                                           |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Bootstrap और shadcn/ui के लिए CSS-वेरिएबल ब्रिजेज़।           |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Foundation के लिए एक Sass सेटिंग्स ओवरराइड और CSS ओवरले।      |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Docusaurus और VitePress के लिए थीम्स।                         |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify `docs.json` थीम (रंग + बैकग्राउंड)।                  |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | एक Storybook थीम।                                             |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Pendo गाइड्स के लिए Instructure-स्टाइल्ड ग्लोबल CSS।          |

## बंडलर्स

बिल्ड-टूल इंटीग्रेशन्स।

| पैकेज                                               | किसके लिए                                                 |
| --------------------------------------------------- | --------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | वर्चुअल मॉड्यूल्स और CSS इन्जेक्शन के साथ एक Vite प्लगइन। |
| [`@pantoken/next`](/api/bundlers/next/src/)         | Next.js के लिए `withPantoken` `transpilePackages`।        |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | एक webpack प्लगइन।                                        |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule।                                     |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | एक Tailwind प्रीसैट।                                      |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | एक Panda CSS प्रीसैट।                                     |

## प्लेटफ़ॉर्म्स

नेटिव और साइट-जनरेटर लक्ष्य, CLI द्वारा या उनके अपने API से इमिट किए जाते हैं।

| पैकेज                                                                                          | आउटपुट                                     |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift स्रोत साथ एक SwiftPM मैनिफेस्ट स्टब। |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML संसाधन।                        |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin।                    |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart।                              |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | egui या iced के लिए Rust consts।           |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | एक WordPress block-theme `theme.json`।     |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | एक Vanilla Forums `variables.json`।        |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal थीम एसेट्स।                         |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo और Jekyll साइट डेटा।                  |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | HTML ईमेल के लिए इनलाइन-फ्रेंडली वैल्यूज़। |

## डिज़ाइन

डिज़ाइन टूल्स के लिए।

| पैकेज                                             | आउटपुट                                                       |
| ------------------------------------------------- | ------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | एक Figma Variables payload।                                  |
| [`@pantoken/swatches`](/api/design/swatches/src/) | रंग स्वैचेस (ASE, GPL, Sketch) साथ एक व्यूएबल SVG नमूना शीट। |

## प्लगइन्स

वैकल्पिक ट्रांसफ़ॉर्म्स जो टोकन या CSS आउटपुट का विस्तार करते हैं। देखें [Plugins](/guide/plugins).

| पैकेज                                                                                 | यह क्या जोड़ता है                                                     |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | नामित z-index डेप्थ्स को `--instui-stacking-*` टोकन्स के रूप में।     |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` लेआउट-डिबगिंग आउटलाइन।                           |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | simple-icons से ब्रांड आइकन।                                          |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure प्रोडक्ट लोगो SVGs, डेटा URIs, और इमेज टोकन्स के रूप में। |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | एक PostCSS प्लगइन जो अनउपयुक्त custom properties हटा देता है।         |

## टूल्स

मोनोरिपो के स्वयं के बिल्ड, डॉक्स, और डेमो इन्फ्रास्ट्रक्चर। अधिकांश आंतरिक हैं, पर टुकड़े स्व-विहित हैं, इसलिए यहाँ दस्तावेज़ित हैं और कुछ अपने आप npm पर शिप होते हैं।

| पैकेज                                              | यह क्या करता है                                                                                                                                                                                                                                          |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | संयुक्त `pantoken` पैकेज बैरल और उसकी डिपेंडेंसीज़ से `exports` जनरेट करता है।                                                                                                                                                                           |
| `@pantoken/validate-generated`                     | ड्रिफ्ट गेट: जाँचता है कि हर जनरेटेड स्टाइलशीट टोकन IR के विरुद्ध resolve होता है या नहीं।                                                                                                                                                               |
| [`@pantoken/demo`](/api/tools/demo/src/)           | self-hosted लाइव-डेमो रनर: `@demo` स्पेसिफिकेशन को iframe में resolve करता है और bare HTML/CSS/JS same-origin, token-themed रेंडर करता है।                                                                                                               |
| `@cssdoc/core` (external)                          | एक सामान्य CSS डोक्युमेंटेशन एक्स्ट्रैक्टर (TSDoc, CSS के लिए): doc-comments + CSS AST को पार्स कर के एक मॉडल बनाता है जिसे docs CSS API रेफरेंस के रूप में इमिट करते हैं। यह अपने अलग रेपो में रहता है; लिंक डिपेंडेंसी के रूप में प्रयोग किया जाता है। |

`@pantoken/validate-generated` एक रन-वनस स्क्रिप्ट है (जो `pnpm run ready` द्वारा इनवोक होती है), इसलिए इसकी कोई API पेज नहीं है; बाकी के पास हैं।

## AI

कन्ज्यूमर-फेसिंग AI सेटअप एसेट्स। ये उन प्रोजेक्ट्स के लिए हैं जो pantoken का उपयोग करते हैं, pantoken के विकास के लिए नहीं।

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) `AGENTS.md`, `llms.txt`, और असिस्टेंट/एडिटर नियम (Cursor, Copilot, Windsurf, Claude Code) को एक कन्ज्यूमर रिपॉजिटरी में इंस्टॉल करता है।

## डेवलपर प्लगइन्स

वे प्लगइन्स जिन्हें हम उन टूल्स के लिए बनाते हैं जिनके साथ हम काम करते हैं, होस्ट के हिसाब से समूहित। ये standalone और publishable हैं।

| पैकेज                                                                                    | किसमें प्लग होता है                                                                                 |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: एक `@demo <provider>:<ref>` ब्लॉक टैग को एक एम्बेड करने योग्य डेमो फ़ेन्स में बदल देता है। |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: upstream workspace पैकेजों (और उनके dependents) को उनके स्रोत बदलने पर पुनर्निर्मित करता है।  |
