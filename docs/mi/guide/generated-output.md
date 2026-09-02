# Putanga i hangaia

He maha ngā mōrearea pantoken e whakaputa ana i ngā kōnae i te wā hanga — he pepa āhuahanga, he `theme.json`, he wāhanga tohu whakauru. Kia māmā te repo, kia tika hoki ngā putanga, ka whai ia mōrearea i tētahi kawa kotahi, ā, ka whakamana tētahi mahi papaworkspace i aua mea katoa.

## Te kawa `generated/`

Ia mōrearea e whakaputa ana i tētahi taonga hanga, ka tuhia atu ki tētahi kōpaki `generated/` mō ia mōrearea, ā, kāore he mea kē e noho ana ki reira. He ture kotahi i roto i `.gitignore` e kapi ana i a rātou katoa:

```txt
**/generated/
```

Nō reira kāore he kōnae i hangaia e tukuna ana ki te putunga — ka whakaputa anō te hanga i a ia. E rua ngā momo putanga e tae atu ki reira:

- **Ngā mea taketake ka tukuna** — ngā kōnae ka kawemai e te kaihoko, pērā i te `@pantoken/css`'s `style.css` rānei te
  `@pantoken/scss`'s `tokens.scss`. Ko te mapi `exports` o te mōrearea e pupuri ana i te matua tūmatanui
  (`"./style.css"`) engari ka tohu ana ki `generated/`, nō reira kāore e rerekē te API kaihoko.
- **Ngā puku hanga-whāhanga** — ngā kōnae e kawemai ana te pūtake o te mōrearea, ā, ka kohia ki roto i `dist`, pērā i te JSON panoni a `@pantoken/tokens`. Kāore ēnei e whakaputaina ā-rātou anō; ka whakarerekea rānei ka tāpirihia ki te hanga.

## Te whakamana i ngā putanga

`@pantoken/validate-generated` (he taputapu tūmataiti) ka rere i muri i te hanga, ā, ka tirotiro i ngā mea e toru:

1. ia mōrearea kaiwhakawhanake i tuhia tūturu he kōpaki `generated/` kāore i te koropupū,
2. kei roto i te CLI `pantoken` he kōnae kotahi iti rawa mō ia whāinga kua tautokohia, me
3. kāore he pepa āhuahanga i hangaia e rere noa i waho i te IR tohu — `danglingReferences` mō ngā pepa motuhake,
   me `unknownReferences` mō ngā tūāhanga e tohu ana noa ki ngā tohu i tautuhia i ētahi atu wāhi.

## Ngā whakahau

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Kua hono hoki te kaiwhakamana ki `pnpm run ready`, nō reira ka kitea te kōrere i roto i te ara tatau paerewa.
