# Aschur ginte

Scaoileann roinnt pacáistí pantoken comhaid ag am an tógála — stíleálán, `theme.json`, modúl foinse comharthaí cuimsitheach. Chun an stór a chothabháil glan agus an aschur a bheith ionraic, leanann gach pacáiste nós imeachta amháin agus fíoraíonn tasc an spáis oibre an méid go léir.

## An nós imeachta `generated/`

Scríobhann gach pacáiste a tháirgeann ealaín tógtha é chuig eolaire `generated/` in aghaidh an phacáiste, agus ní chónaíonn tada eile ann. Clúdaíonn riail amháin i `.gitignore` iad go léir:

```txt
**/generated/
```

Mar sin ní chuirtear aon chomhad ginte isteach sa chóras — tá sé in-athghinte ag tógáil. Téann dhá chineál aschuir ann:

- **Staiticí in-phacáistithe** — comhaid a iompórtálann tomhaltóir, mar `@pantoken/css`'s `style.css` nó
  `@pantoken/scss`'s `tokens.scss`. Coinníonn léarscáil `exports` an phacáiste an eochair phoiblí
  (`"./style.css"`) ach léiríonn sí í chuig `generated/`, mar sin ní athraíonn API an tomhaltóra riamh.
- **Idirmheánacha tógála** — comhaid a iompórtálann foinsí an phacáiste féin agus a chumascann isteach i `dist`, mar shampla
  JSONí díoltar `@pantoken/tokens`. Níl siad sin foilsithe ar a n-aonar; déantar iad a chomhdhlúthú sa tógáil.

## Ag bailíochtú an aschuir

Reáchtáiltear `@pantoken/validate-generated` (uirlis phríobháideach) tar éis tógáil agus seiceálann sé trí ruda:

1. gur scríobh gach pacáiste gineadóra eolaire neamh-fholamh `generated/`,
2. go sroicheann an CLI `pantoken` ar a laghad comhad amháin do gach sprioc tacaithe, agus
3. nach mbíonn aon stíleáil ginte ag drifteáil ó IR na n-íomhán — `danglingReferences` do leatháin féinchuidithe,
   agus `unknownReferences` do na droichid a tagraíonn do thóicní atá sainmhínithe áit eile amháin.

## Orduithe

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Tá an fhíoróir ceangailte freisin le `pnpm run ready`, mar sin gabhtar drifte sa gheata caighdeánach.
