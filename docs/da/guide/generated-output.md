# Genereret output

Flere pantoken-pakker genererer filer ved build-tid — et stylesheet, en `theme.json`, et indlejret token
modul. For at holde repo'et rent og outputtet ærligt følger hver pakke en konvention, og en
workspace-opgave validerer det hele.

## Konventionen for `generated/`

Hver pakke, der producerer et build-artifact, skriver det til en per-pakke `generated/`-mappe, og
intet andet ligger der. Én regel i `.gitignore` dækker dem alle:

```txt
**/generated/
```

Så ingen genererede filer bliver committet — et build reproducerer dem. To typer output lander der:

- **Publicerbare statiske filer** — filer en consumer importerer, såsom `@pantoken/css`'s `style.css` eller
  `@pantoken/scss`'s `tokens.scss`. Pakkens `exports`-mappe bevarer den offentlige nøgle
  (`"./style.css"`) men peger den på `generated/`, så consumer-API'en aldrig ændrer sig.
- **Build-intermediater** — filer pakkens egen kildekode importerer og bundler ind i `dist`, såsom
  `@pantoken/tokens`'s vendorerede JSON. Disse publiceres ikke separat; de kompileres ind.

## Validering af output

`@pantoken/validate-generated` (et privat værktøj) kører efter et build og tjekker tre ting:

1. at hver generator-pakke rent faktisk skrev en ikke-tom `generated/`-mappe,
2. at `pantoken` CLI'en udsender mindst én fil for hvert understøttet target, og
3. at ingen genereret stylesheet driver fra token-IR'en — `danglingReferences` for selvstændige
   sheets, og `unknownReferences` for broerne, der kun refererer tokens defineret andetsteds.

## Kommandoer

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validatoren er også koblet ind i `pnpm run ready`, så drift fanges i den standardmæssige gate.
