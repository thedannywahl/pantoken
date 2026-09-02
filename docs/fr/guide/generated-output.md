# Sortie générée

Plusieurs packages pantoken émettent des fichiers au moment de la construction — une feuille de style, un `theme.json`, un module de tokens embarqué. Pour garder le dépôt propre et les résultats honnêtes, chaque package suit une convention et une tâche de l'espace de travail valide l'ensemble.

## La convention `generated/`

Chaque package qui produit un artefact de build l'écrit dans un répertoire `generated/` par package, et rien d'autre n'y vit. Une règle dans `.gitignore` les couvre tous :

```txt
**/generated/
```

Ainsi aucun fichier généré n'est commité — un build le reproduit. Deux types de sorties y atterrissent :

- **Statique livrable** — fichiers qu'un consommateur importe, tels que `@pantoken/css`'s `style.css` ou
  `@pantoken/scss`'s `tokens.scss`. La map `exports` du package conserve la clé publique
  (`"./style.css"`) mais la pointe vers `generated/`, donc l'API consommateur ne change jamais.
- **Intermédiaires de build** — fichiers que la source du package importe elle-même et regroupe dans `dist`, tels que
  le JSON fourni par `@pantoken/tokens`. Ceux-ci ne sont pas publiés seuls ; ils sont compilés dans le bundle.

## Validation de la sortie

`@pantoken/validate-generated` (un outil privé) s'exécute après un build et vérifie trois choses :

1. que chaque package générateur a effectivement écrit un répertoire `generated/` non vide,
2. que l'outil CLI `pantoken` émet au moins un fichier pour chaque cible prise en charge, et
3. qu'aucune feuille de style générée ne diverge de l'IR des tokens — `danglingReferences` pour les feuilles autonomes,
   et `unknownReferences` pour les ponts qui ne référencent que des tokens définis ailleurs.

## Commandes

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Le validateur est aussi connecté à `pnpm run ready`, donc la dérive est détectée dans la gate standard.
