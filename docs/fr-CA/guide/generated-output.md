# Sortie générée

Plusieurs paquets pantoken émettent des fichiers lors de la construction — une feuille de style, un `theme.json`, un module de jetons embarqué. Pour garder le dépôt propre et les sorties honnêtes, chaque paquet suit une convention et une tâche du workspace valide l’ensemble.

## La convention `generated/`

Chaque paquet qui produit un artefact de build l’écrit dans un répertoire `generated/` par paquet, et rien d’autre n’y vit. Une règle dans `.gitignore` les couvre tous :

```txt
**/generated/
```

Ainsi, aucun fichier généré n’est commité — une compilation le reproduit. Deux types de sorties y atterrissent :

- **Statique livrable** — fichiers qu’un consommateur importe, comme le `@pantoken/css` de `style.css` ou le `@pantoken/scss` de `tokens.scss`. La map `exports` du paquet garde la clé publique (`"./style.css"`) mais la pointe vers `generated/`, donc l’API consommateur ne change jamais.
- **Intermédiaires de build** — fichiers que la source du paquet importe et bundle dans `dist`, comme le JSON fournis par `@pantoken/tokens`. Ceux-ci ne sont pas publiés seuls ; ils sont compilés dans le binaire.

## Validation de la sortie

`@pantoken/validate-generated` (un outil privé) s’exécute après une build et vérifie trois choses :

1. chaque paquet générateur a effectivement écrit un répertoire `generated/` non vide,
2. l’outil en ligne de commande `pantoken` émet au moins un fichier pour chaque cible prise en charge, et
3. aucune feuille de style générée ne diverge de l’IR des jetons — `danglingReferences` pour les feuilles autonomes,
   et `unknownReferences` pour les ponts qui ne font que référencer des jetons définis ailleurs.

## Commandes

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

Le validateur est aussi relié à `pnpm run ready`, donc la dérive est détectée dans la gate standard.
