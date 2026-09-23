# Plugins

Um plugin do pantoken estende a saída de tokens ou CSS sem bifurcar um pacote. Construa um com
`definePlugin` de `@pantoken/plugin-kit`, em seguida passe-o para `buildTokens` ou `toCss`.

## Criar um plugin

Forneça a `definePlugin` os hooks que você implementa. Ela retorna um plugin normal, marcado com as
capacidades inferidas desses hooks. Um plugin pode estender a IR (`tokens`, `icons`), a saída CSS
(`css`), ou ambos.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## Registro ciente de capacidades

`buildTokens` e `toCss` executam `checkPlugins` sobre os plugins que você passa. Ele avisa — nunca lança —
quando um plugin não tem um hook correspondente para o estágio em que está registrado, então um plugin somente de tokens passado
para `toCss` é ignorado com uma nota em vez de silenciosamente não fazer nada.

## Compor plugins

Construa sobre outro plugin com `extendPlugin`, ou combine pares com `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks do mesmo estágio se compõem: `tokens` executa a base e então a adição, `css` mescla as duas
contribuições, e `icons` executa ambas.

## Validar a saída do seu plugin

Execute as verificações de drift compartilhadas de `@pantoken/utils` sobre a própria saída do seu plugin em seu teste, para que um
erro de digitação ou um token renomeado falhe rapidamente e localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Os plugins empacotados

- `@pantoken/plugin-simple-icons` — marca ícones do simple-icons, registrados como tokens de ícone.
- `@pantoken/plugin-lucide-lab` — ícones Lucide Lab, registrados como tokens de imagem `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos de produto Instructure como SVGs, URIs de dados e tokens de imagem `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — um plugin PostCSS (não é um plugin pantoken) que remove
  propriedades customizadas não usadas de uma folha de estilo.

O registro do Lucide Lab pode ser carregado de forma preguiçosa e então passado para o hook síncrono de tokens:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algumas coisas que costumavam ser plugins agora são distribuídas em `@pantoken/components`, já que muitos componentes
as precisam por padrão: sombras de elevação (`--instui-elevation-*`, em `components.css`), o anel de foco-outline
(em `base.css` — todo elemento focável o recebe quando o pantoken controla a página), e as fontes da marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; o opt-in
`@pantoken/components/fonts.css` carrega os woff2s `@font-face`).

Veja a [referência de API](/api/) para os exports de cada plugin.
