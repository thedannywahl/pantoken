# Sortida generada

Diversos paquets pantoken emeten fitxers en temps de compilació — una fulla d'estils, un `theme.json`, un mòdul de tokens embegut. Per mantenir el repo net i les sortides honrades, cada paquet segueix una convenció i una tasca del workspace valida el conjunt.

## La convenció `generated/`

Cada paquet que produeix un artefacte de compilació l'escriu en un directori `generated/` per paquet, i no hi viu res més. Una regla a `.gitignore` els cobreix a tots:

```txt
**/generated/
```

Així que cap fitxer generat es compromet — una compilació el reprodueix. Hi arriben dos tipus de sortida:

- **Estàtics distribuïbles** — fitxers que un consumidor importa, com `@pantoken/css`'s `style.css` o
  `@pantoken/scss`'s `tokens.scss`. El mapa `exports` del paquet conserva la clau pública
  (`"./style.css"`) però la apunta a `generated/`, de manera que l'API del consumidor mai no canvia.
- **Intermedis de compilació** — fitxers que la pròpia font del paquet importa i empaqueta dins d'`dist`, com
  el JSON venedor d'`@pantoken/tokens`. Aquests no es publiquen per si sols; es compilen dins.

## Validació de la sortida

`@pantoken/validate-generated` (una eina privada) s'executa després d'una compilació i comprova tres coses:

1. cada paquet generador va escriure realment un directori `generated/` no buit,
2. la CLI `pantoken` emet almenys un fitxer per a cada target compatible, i
3. cap fulla d'estils generada deriva de l'IR de tokens — `danglingReferences` per a fulles autocontingudes,
   i `unknownReferences` per als ponts que només referencien tokens definits en un altre lloc.

## Comandes

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

El validador també està connectat a `pnpm run ready`, així que la deriva es captura a la porta estàndard.
