# पैंटोकेन CLI

`@pantoken/cli` `pantoken generate <target>` प्रदान करता है, जो टोकन स्रोत को लक्ष्य रिपो में लिखता है।
जब किसी प्लेटफ़ॉर्म को रनटाइम निर्भरता के बजाय जनरेट किया गया कोड चाहिए — जैसे नेटिव ऐप्स,
CMS थीम, और स्टेटिक-साइट जनरेटर — तब इसके लिए उपयोग करें।

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## लक्ष्य

| लक्ष्य      | आउटपुट                                                                                |
| ----------- | ------------------------------------------------------------------------------------- |
| `swift`     | `Sources/<name>` के अंतर्गत Swift स्रोत और एक `Package.swift` SwiftPM manifest स्टब.  |
| `android`   | Android XML संसाधन फ़ाइलें.                                                           |
| `compose`   | एक Jetpack Compose Kotlin फ़ाइल.                                                      |
| `flutter`   | एक Flutter Dart फ़ाइल.                                                                |
| `rust`      | egui (डिफ़ॉल्ट) या iced (`--format iced`) के लिए एक `tokens.rs`.                      |
| `wordpress` | एक block-theme `theme.json`.                                                          |
| `vanilla`   | एक Vanilla Forums `variables.json`.                                                   |
| `drupal`    | Drupal थीम एसेट्स.                                                                    |
| `jekyll`    | Jekyll साइट डेटा.                                                                     |
| `hugo`      | Hugo साइट डेटा.                                                                       |
| `swatches`  | Color swatches — `ase` (डिफ़ॉल्ट), `gpl`, `sketch`, या `svg` `--format` के माध्यम से। |
| `icon-font` | एक आइकन वेब फ़ॉन्ट (TTF, WOFF2), इसका CSS, और एक codepoints मैप.                      |
| `pendo`     | Pendo गाइड्स के लिए Instructure-स्टाइल्ड `global.css`.                                |

## सामान्य फ्लैग

- `--out <dir>` — कहां लिखना है (डिफ़ॉल्ट `./pantoken-out`)।
- `--theme <name>` — `rebrand` (डिफ़ॉल्ट), `canvas`, या `canvasHighContrast`।
- `--icons a,b,c` — उन आइकन नामों को जो नेटिव एसेट्स के रूप में इमिट किए जाने चाहिए, उन लक्ष्यों के लिए जो उन्हें समर्थन करते हैं।
- `--class <Name>` — जनरेट किया गया टाइप या पैकेज नाम, उन लक्ष्यों के लिए जिन्हें इसकी आवश्यकता है।
- `--format <fmt>` — आउटपुट फ़ॉर्मेट, `swatches` और `rust` के लिए।

## उदाहरण

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

कई लक्ष्य एक साधारण फ़ंक्शन भी एक्सपोज़ करते हैं, ताकि आप CLI के बजाय अपने बिल्ड से उन्हें कॉल कर सकें। प्रत्येक प्लेटफ़ॉर्म पैकेज के लिए [API reference](/api/) देखें।
