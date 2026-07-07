# Generált kimenet

Több pantoken csomag generál fájlokat a build során — egy stíluslapot, egy `theme.json`-t, egy beágyazott token
modult. A repó tisztán tartása és a kimenetek megbízhatósága érdekében minden csomag ugyanazt a konvenciót követi, és
egy workspace feladat validálja az egészet.

## A `generated/` konvenció

Minden csomag, amely build műterméket állít elő, egy csomagonkénti `generated/` könyvtárba írja azt, és
semmi más nem él ott. Egyetlen szabály a `.gitignore` fájlban mindet lefedi:

```txt
**/generated/
```

Így nincs commitolt generált fájl — a build újra előállítja. Kétféle kimenet kerül oda:

- **Szállítható statikus fájlok** — olyan fájlok, amelyeket a felhasználó importál, például `@pantoken/css` `style.css` fájlja vagy
  `@pantoken/scss` `tokens.scss` fájlja. A csomag `exports` leképezése megtartja a nyilvános kulcsot
  (`"./style.css"`), de a `generated/` helyre mutat, így a fogyasztói API sosem változik.
- **Build köztes fájlok** — olyan fájlok, amelyeket a csomag saját forrása importál és bundlingol a `dist` mappába, például
  `@pantoken/tokens` beágyazott JSON-ja. Ezeket önmagukban nem publikálják; be vannak fordítva.

## A kimenet validálása

A `@pantoken/validate-generated` (egy privát eszköz) fut a build után, és három dolgot ellenőriz:

1. minden generátor csomag ténylegesen írt egy nem üres `generated/` könyvtárat,
2. a `pantoken` CLI legalább egy fájlt generál minden támogatott célra, és
3. egyetlen generált stíluslap sem tér el a token IR-től — `danglingReferences` az önálló
   lapokhoz, és `unknownReferences` a hidakhoz, amelyek csak máshol definiált tokenekre hivatkoznak.

## Parancsok

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

A validátor a `pnpm run ready` folyamatba is be van kötve, így az eltérést a szabványos ellenőrzés elkapja.
