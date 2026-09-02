# Allbwn a gynhyrchwyd

Mae sawl pecyn pantoken yn allyrru ffeiliau yn ystod y broses adeiladu — taflen arddull, `theme.json`, modiwl tokenau wedi'i fewnosod. I gadw'r repositorïa'n daclus a'r allbynnau'n ddibynadwy, mae pob pecyn yn dilyn un confensiwn ac mae tasg gweithle yn dilysu popeth.

## Y confensiwn `generated/`

Mae pob pecyn sy'n cynhyrchu arteffact adeiladu yn ei ysgrifennu i gyfeiriadur `generated/` per-pecyn, ac nid oes dim arall yn byw yno. Mae un rheol yn `.gitignore` yn eu cwmpasu i gyd:

```txt
**/generated/
```

Felly nid oes unrhyw ffeil a gynhyrchir sy'n cael ei chyflwyno — mae adeilad yn ei atgynhyrchu. Mae dau fath o allbwn yn dod yno:

- **Stâtigau llongadwy** — ffeiliau y mae cwsmer yn eu mewnforio, megis `@pantoken/css`'s `style.css` neu
  `@pantoken/scss`'s `tokens.scss`. Mae map `exports` y pecyn yn cadw'r allwedd gyhoeddus
  (`"./style.css"`) ond yn ei phwyntio at `generated/`, felly nid yw API'r cwsmer byth yn newid.
- **Canolbwyntiau adeiladu** — ffeiliau y mae ffynhonnell y pecyn ei hun yn eu mewnforio a'u bundleio i `dist`, megis
  JSON wedi'i gynnwys gan `@pantoken/tokens`. Nid ydynt yn cael eu cyhoeddi ar eu pen eu hunain; mae'n cael eu cyfansoddi ynddo.

## Dilysu'r allbwn

`@pantoken/validate-generated` (offeryn preifat) yn rhedeg ar ôl adeiladu ac yn gwirio tair peth:

1. bod pob pecyn generadur wedi gwirioneddol ysgrifennu cyfeiriadur `generated/` nad yw'n wag,
2. bod y CLI `pantoken` yn allyrru o leiaf un ffeil ar gyfer pob targed a gefnogir, a
3. nad yw unrhyw daflen arddull a gynhyrchir yn llithro o'r token IR — `danglingReferences` ar gyfer taflenni hunangynhwysol,
   a `unknownReferences` ar gyfer y pontydd sydd ond yn cyfeirio at tokenau a ddiffinnir yn rhywle arall.

## Gorchmynion

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Mae'r dilysydd hefyd wedi'i gysylltu â `pnpm run ready`, felly caiff llithriad ei ddal yn y giât safonol.
