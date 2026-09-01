# Gaskavuohta ovddit

Muitalusat pantoken-pakčat čuovvut failaid buot gillii gávdnain — stylesheet, `theme.json`, embeddejohkka token-moduála. Dát repo birgejuvvon ja ovddasat gaskavuođaid válddeheapmi birget go dan, buot pakčat leat ovttasvuođa ja oassi workspacesta hálddaša ovddit gohčoduvvon.

## `generated/` konveártša

Buot pakčat maid birget build-artifaktal skrivvadit das per-pakča `generated/` dihte, ja dat eatná eará dan maŋemus. Ođđa reegel `.gitignore` deattuhit buot:

```txt
**/generated/
```

Dakkár ii leat gaskavuohta faila girječuvvan — build dohkket son ovddas. Divrras ovddit leat dahkat das:

- **Skohtejuvvon statikat** — failat mii konsummea importera, nuppást `@pantoken/css`-s `style.css` dahje
  `@pantoken/scss`-s `tokens.scss`. Pakčan `exports` mapa rihtagat publicaála dálkká
  (`"./style.css"`) muhto johtá dan `generated/`-i, nuppi konsummera API ii geavaha.
- **Build-intermediáhta** — failat mii pakčan iežaset soeruid importera ja bundlera `dist`-i, nuppást
  `@pantoken/tokens`-s vendorojuvvon JSON. Dát ii leat publiserret eanet; daid leat kompilerejuvvon.

## Ovddasat vahkádusat

`@pantoken/validate-generated` (priváhta alat) čađahuvvo go build lea dovddan ja girjjuhit golbma:

1. buot generator-pakčat realluš gievdán mii lea eanemearri `generated/` dihte,
2. `pantoken` CLI guhkkin leat dahkan dánboahtit faila buot suporterašii targetta, ja
3. in eará gaskavuohta stylesheet dollo token IR-st — `danglingReferences` ovttasvuohta
   sheets-s, ja `unknownReferences` nu bridges mat doarjávvut maid rihtit tokenat mii leat definerejuvvon eará stuorran.

## Kommandot

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validator leat muhto hirbmat `pnpm run ready`-in, nuppást drift čađahit standard-gate-s.
