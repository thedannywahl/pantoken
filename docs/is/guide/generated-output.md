# Framleitt úttak

Nokkrir pantoken pakkar framleiða skrár við byggingu — stíll, `theme.json`, innfellt táknamódúl. Til að halda geymslunni hreinni og úttakinu heiðarlegu fylgja öll pakkarnir sömu reglu og verkefni í vinnusvæðinu sannprófar allt.

## Regla `generated/`

Sá pakki sem býr til byggingarafurð skrifar hana í per-pakka `generated/` möppu, og ekkert annað býr þar. Ein regla í `.gitignore` nær til þeirra allra:

```txt
**/generated/
```

Þannig er engin framleidd skrá skuldbundin — bygging endurgerir hana. Tveir flokkar úttaks lenda þar:

- **Útgefanlegar static skrár** — skrár sem neytandi innflytur, svo sem `@pantoken/css`'s `style.css` eða
  `@pantoken/scss`'s `tokens.scss`. Pakkans `exports` kort heldur utan um opinbera lykilinn
  (`"./style.css"`) en bendir á `generated/`, þannig breytist neytenda-viðmótið aldrei.
- **Byggingar milliúttak** — skrár sem pakkans eiginn kóði innflytur og bundle-ar í `dist`, eins og
  `@pantoken/tokens`'s innbyggða JSON. Þessar eru ekki birtar sjálfstætt; þær eru þýddar inn.

## Staðfesting úttaksins

`@pantoken/validate-generated` (einkahleður tól) keyrir eftir byggingu og athugar þrjú atriði:

1. að hver generator pakki hafi í raun skrifað ekki-tóma `generated/` möppu,
2. að `pantoken` CLI skili að minnsta kosti einni skrá fyrir hvert studd markmið, og
3. enginn framleiddur stíll sveiflist frá tákn IR — `danglingReferences` fyrir sjálfstæðar
   töflur, og `unknownReferences` fyrir brýrnar sem aðeins vísa í tákn skilgreind annars staðar.

## Skipanir

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Vottarinn er einnig tengdur inn í `pnpm run ready`, svo sveiflur uppgötvast í venjulegu hleypihliðinni.
