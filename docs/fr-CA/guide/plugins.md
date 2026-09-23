# Plugins

Un plugin pantoken étend la sortie des tokens ou du CSS sans forker un paquet. On en crée un avec
`definePlugin` depuis `@pantoken/plugin-kit`, puis on le passe à `buildTokens` ou `toCss`.

## Créer un plugin

Donnez à `definePlugin` les hooks que vous implémentez. Il retourne un plugin normal, marqué avec les
capabilités déduites de ces hooks. Un plugin peut étendre l'IR (`tokens`, `icons`), la sortie CSS
(`css`), ou les deux.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Enregistrement sensible aux capacités

`buildTokens` et `toCss` exécutent `checkPlugins` sur les plugins que vous passez. Ils préviennent — ils ne lèvent jamais d'exception —
lorsqu'un plugin n'a aucun hook correspondant à l'étape où il est enregistré, donc un plugin uniquement pour les tokens passé
à `toCss` est ignoré avec une note plutôt que de rester silencieusement inactif.

## Composer des plugins

Bâtissez par-dessus un autre plugin avec `extendPlugin`, ou combinez des pairs avec `mergePlugin` :

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Les hooks du même étage se composent : `tokens` exécute d'abord la base puis l'ajout, `css` fusionne les deux
contributions, et `icons` exécute les deux.

## Valider la sortie de votre plugin

Exécutez les vérifications de dérive partagées depuis `@pantoken/utils` sur la sortie de votre plugin dans son test, afin qu'une
faute de frappe ou un token renommé échoue rapidement et localement :

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Les plugins fournis

- `@pantoken/plugin-simple-icons` — marque les icônes de simple-icons, enregistrées comme tokens d'icônes.
- `@pantoken/plugin-lucide-lab` — icônes Lucide Lab, enregistrées comme tokens d'image `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos produits Instructure en SVG, URIs de données, et tokens d'image `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (pas un plugin pantoken) qui supprime
  les propriétés personnalisées inutilisées d'une feuille de style.

Le registre de Lucide Lab peut être chargé paresseusement, puis passé au hook de token synchrone :

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Quelques éléments qui étaient autrefois des plugins sont maintenant fournis dans `@pantoken/components`, car de nombreux composants
les requièrent immédiatement : les ombres d'élévation (`--instui-elevation-*`, dans `components.css`), l'anneau de focus-outline
(dans `base.css` — chaque élément focalisable l'obtient lorsque pantoken gère la page), et les polices de la marque Instructure
(Atkinson Hyperlegible Next : `base.css` applique `--instui-font-family-base`; le `@pantoken/components/fonts.css` optionnel charge les woff2 `@font-face`).

Voir la [référence API](/api/) pour les exports de chaque plugin.
