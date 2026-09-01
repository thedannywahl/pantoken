# Soti jenere

Plizyè pake pantoken pwodwi fichye pandan konstriksyon — yon estil fey, yon `theme.json`, yon modil token entegre. Pou kenbe depo a pwòp epi fè rezilta yo onèt, chak pake swiv yon konvansyon e yon travay workspace valide tout bagay la.

## Konvansyon `generated/`

Chak pake ki pwodwi yon atifakt build ekri li nan yon repèrtwar `generated/` pou chak pake, e pa gen anyen lòt ki rete la. Yonn règ nan `.gitignore` kouvri yo tout:

```txt
**/generated/
```

Kidonk pa gen okenn fichye jenere ki komite — yon build reprodwi li. De kalite sòti tonbe la a:

- **Estatik livrezab** — fichye yon konsomatè enpòte, tankou `@pantoken/css`'s `style.css` oswa
  `@pantoken/scss`'s `tokens.scss`. Kat jeyografik `exports` pake a kenbe kle piblik la
  (`"./style.css"`) men li vize l sou `generated/`, konsa API konsomatè a pa janm chanje.
- **Entèmedyè build** — fichye sous pake a menm enpòte epi pake nan `dist`, tankou
  JSON vannè `@pantoken/tokens`. Sa yo pa pibliye pou kont yo; yo konpile andedan.

## Validasyon sòti a

`@pantoken/validate-generated` (yon zouti prive) kouri apre yon build epi li verifye twa bagay:

1. chak pake jeneratè aktyèlman ekri yon repèrtwar `generated/` ki pa vid,
2. CLI `pantoken` pwodui omwen yon fichye pou chak sib ki sipòte, e
3. pa gen okenn fey estil jenere ki devye de IR token yo — `danglingReferences` pou fichye ki oto-sèten
   (self-contained) yo, ak `unknownReferences` pou pon yo ki sèlman refere a token defini lòt kote.

## Kòmand

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Validatè a konekte tou nan `pnpm run ready`, konsa devyasyon (drift) trape nan pòtay estanda a.
