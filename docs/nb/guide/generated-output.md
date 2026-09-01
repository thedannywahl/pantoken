# Generert utdata

Flere pantoken-pakker genererer filer under bygging — et stilark, en `theme.json`, en innebygd token-
modul. For å holde repoet rent og output ærlig følger hver pakke én konvensjon, og en
workspace-oppgave validerer alt.

## Konvensjonen for `generated/`

Hver pakke som produserer et byggeartefakt skriver det til en per-pakke `generated/`-mappe, og
ingenting annet ligger der. En regel i `.gitignore` dekker dem alle:

```txt
**/generated/
```

Så ingen genererte filer blir committed — et build replikerer dem. To typer output havner der:

- **Distribuerbare statiske filer** — filer en forbruker importerer, som `@pantoken/css` sin `style.css` eller
  `@pantoken/scss` sin `tokens.scss`. Pakkens `exports`-kart holder den offentlige nøkkelen
  (`"./style.css"`) men peker den mot `generated/`, så forbruker-APIet endres aldri.
- **Bygge-mellomprodukter** — filer pakkens egen kildekode importerer og bundle'r inn i `dist`, som
  `@pantoken/tokens` sin vendorerte JSON. Disse publiseres ikke for seg selv; de kompileres inn.

## Validering av output

`@pantoken/validate-generated` (et privat verktøy) kjører etter et build og sjekker tre ting:

1. at hver generatorpakke faktisk skrev en ikke-tom `generated/`-mappe,
2. at `pantoken` CLIen emitterer minst én fil for hvert støttet target, og
3. at ingen generert stilark driver fra token-IR — `danglingReferences` for selvstendige
   ark, og `unknownReferences` for broene som kun refererer tokens definert andre steder.

## Kommandoer

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validatoren er også koblet inn i `pnpm run ready`, så drift fanges i standard-gaten.
