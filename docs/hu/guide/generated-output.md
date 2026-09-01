# Generált kimenet

Több pantoken csomag építéskor hoz létre fájlokat — egy stíluslapot, egy `theme.json`, egy beágyazott token
modult. A repó tisztán tartása és a kimenetek hitelessége érdekében minden csomag egy konvenciót követ, és egy
workspace feladat ellenőrzi az egészet.

## A `generated/` konvenció

Minden csomag, amely build-artefaktumot állít elő, azt egy csomagonkénti `generated/` könyvtárba írja, és
semmi más nem lakik ott. Egy szabály a `.gitignore`-ban mindet lefedi:

```txt
**/generated/
```

Tehát egyetlen generált fájl sem kerül becommittolásra — egy build reprodukálja azt. Két fajta kimenet érkezik oda:

- **Kiszállítható statikusok** — olyan fájlok, amelyeket a fogyasztó importál, például `@pantoken/css` `style.css`-je vagy
  `@pantoken/scss` `tokens.scss`-je. A csomag `exports` map-je tartja a nyilvános kulcsot
  (`"./style.css"`), de azt `generated/`-ra mutatja, így a fogyasztói API soha nem változik.
- **Build köztes fájlok** — olyan fájlok, amelyeket a csomag saját forrása importál és beépít `dist`-be, például
  `@pantoken/tokens` vendorizált JSON-je. Ezek önmagukban nem kerülnek publikálásra; le vannak fordítva.

## A kimenet érvényesítése

`@pantoken/validate-generated` (egy privát eszköz) a build után lefut és három dolgot ellenőriz:

1. minden generátor csomag ténylegesen írt egy nem üres `generated/` könyvtárat,
2. az `pantoken` CLI legalább egy fájlt kibocsát minden támogatott célhoz, és
3. egyetlen generált stíluslap sem tér el a token IR-től — `danglingReferences` az önálló
   lapokhoz, és `unknownReferences` azokhoz a hidakhoz, amelyek csak máshol definiált tokenekre hivatkoznak.

## Parancsok

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

A validátor be van kötve az `pnpm run ready`-be is, így a driftet a standard gate megfogja.
