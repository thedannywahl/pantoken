# Vendored Noto social-card fonts

These unmodified font binaries come from
[`google/fonts` revision `205859f680703e449fe05dce0f792cc041d6dc89`](https://github.com/google/fonts/tree/205859f680703e449fe05dce0f792cc041d6dc89/ofl).
They let the documentation renderer generate localized social cards without network access.
The renderer checks font signatures and the SHA-256 digests recorded in
[`og-fonts.ts`](../../../scripts/lib/og-fonts.ts) before loading a file.

Each font is distributed under the SIL Open Font License 1.1. The files in
[`licenses/`](./licenses/) retain each family's upstream copyright notice and full license.
The font binaries are unchanged; their shorter local filenames do not rename the font families.

| Local file               | Source path under upstream `ofl/`                      | License                                      |
| ------------------------ | ------------------------------------------------------ | -------------------------------------------- |
| `sans.ttf`               | `notosans/NotoSans[wdth,wght].ttf`                     | [OFL](./licenses/sans-OFL.txt)               |
| `arabic.ttf`             | `notosansarabic/NotoSansArabic[wdth,wght].ttf`         | [OFL](./licenses/arabic-OFL.txt)             |
| `hebrew.ttf`             | `notosanshebrew/NotoSansHebrew[wdth,wght].ttf`         | [OFL](./licenses/hebrew-OFL.txt)             |
| `devanagari.ttf`         | `notosansdevanagari/NotoSansDevanagari[wdth,wght].ttf` | [OFL](./licenses/devanagari-OFL.txt)         |
| `armenian.ttf`           | `notosansarmenian/NotoSansArmenian[wdth,wght].ttf`     | [OFL](./licenses/armenian-OFL.txt)           |
| `thai.ttf`               | `notosansthai/NotoSansThai[wdth,wght].ttf`             | [OFL](./licenses/thai-OFL.txt)               |
| `japanese.ttf`           | `notosansjp/NotoSansJP[wght].ttf`                      | [OFL](./licenses/japanese-OFL.txt)           |
| `korean.ttf`             | `notosanskr/NotoSansKR[wght].ttf`                      | [OFL](./licenses/korean-OFL.txt)             |
| `simplifiedChinese.ttf`  | `notosanssc/NotoSansSC[wght].ttf`                      | [OFL](./licenses/simplifiedChinese-OFL.txt)  |
| `traditionalChinese.ttf` | `notosanstc/NotoSansTC[wght].ttf`                      | [OFL](./licenses/traditionalChinese-OFL.txt) |

## Updating the fonts

1. Select and review a new immutable upstream revision, including font and license changes.
2. Obtain the ten original binaries and each family's `OFL.txt` from that revision.
   Do not subset, convert, or otherwise modify the font binaries.
3. Independently review and record the new SHA-256 digests with `shasum -a 256`.
   Replace the local files, their licenses, and the digests/source paths in
   [`og-fonts.ts`](../../../scripts/lib/og-fonts.ts) together.
4. Update this revision link and run
   `vp test docs/scripts/lib/og-fonts.test.ts` and `vp run @pantoken/docs#docs:og`.
   Review every locale's resulting card before committing.

Vendoring removes build-time downloads, not the need to trust and review upstream font updates.
