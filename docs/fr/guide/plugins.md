# Plugins

Un plugin pantoken étend la sortie de tokens ou de CSS sans forker un package. On en crée un avec
`definePlugin` depuis `@pantoken/plugin-kit`, puis on le passe à `buildTokens` ou `toCss`.

## Rédiger un plugin

Donnez à `definePlugin` les hooks que vous implémentez. Il renvoie un plugin normal, marqué avec les
capacités déduites de ces hooks. Un plugin peut étendre l'IR (`tokens`, `icons`), la sortie CSS
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

`buildTokens` et `toCss` exécutent `checkPlugins` sur les plugins que vous leur passez. Il affiche un avertissement — il ne lance jamais d'exception — lorsque qu'un plugin n'a aucun hook correspondant à l'étape où il est enregistré, ainsi un plugin uniquement pour les tokens passé à `toCss` est ignoré avec une note plutôt que d'être silencieusement inactif.

## Composer des plugins

Construisez sur un autre plugin avec `extendPlugin`, ou combinez des pairs avec `mergePlugin` :

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Les hooks du même stade se composent : `tokens` exécute la base puis l'ajout, `css` fusionne les deux
contributions, et `icons` exécute les deux.

## Valider la sortie de votre plugin

Exécutez les vérifications de dérive partagées depuis `@pantoken/utils` sur la propre sortie de votre plugin dans son test, afin qu'une
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
- `@pantoken/plugin-lucide-lab` — icônes Lucide Lab, enregistrées comme tokens image `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos produits Instructure en SVG, data URI, et tokens image `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — un plugin PostCSS (pas un plugin pantoken) qui supprime
  les custom properties inutilisées d'une feuille de style.

Le registre de Lucide Lab peut être chargé paresseusement, puis passé au hook de tokens synchrone :

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Quelques éléments qui étaient auparavant des plugins sont maintenant intégrés dans `@pantoken/components`, puisque tant de composants en ont
besoin par défaut : ombres d'élévation (`--instui-elevation-*`, dans `components.css`), l'anneau de focus-outline
(dans `base.css` — chaque élément focusable l'obtient quand pantoken contrôle la page), et les polices de marque Instructure
(Atkinson Hyperlegible Next : `base.css` applique `--instui-font-family-base` ; le `@pantoken/components/fonts.css` optionnel charge les woff2s `@font-face`).

Voir la [référence API](/api/) pour les exports de chaque plugin.
