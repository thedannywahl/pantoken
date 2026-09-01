# Plugins

Um plugin pantoken estende a saída de tokens ou CSS sem fork de um pacote. Você cria um com
`definePlugin` de `@pantoken/plugin-kit`, então o passa para `buildTokens` ou `toCss`.

## Criar um plugin

Dê a `definePlugin` os hooks que você implementa. Ele retorna um plugin normal, marcado com as
capacidades inferidas a partir desses hooks. Um plugin pode estender a IR (`tokens`, `icons`), a saída CSS
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

## Registro consciente de capacidades

`buildTokens` e `toCss` executam `checkPlugins` sobre os plugins que você passa. Ele avisa — nunca lança —
quando um plugin não tem um hook correspondente para a etapa em que foi registrado, então um plugin somente de tokens passado
para `toCss` é ignorado com uma nota em vez de simplesmente não fazer nada silenciosamente.

## Compor plugins

Construa sobre outro plugin com `extendPlugin`, ou combine pares com `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks do mesmo estágio se compõem: `tokens` executa a base e depois a adição, `css` mescla as duas
contribuições, e `icons` executa ambas.

## Validar a saída do seu plugin

Execute as verificações de drift compartilhadas de `@pantoken/utils` sobre a própria saída do seu plugin em seu teste, assim um
erro de digitação ou um token renomeado falha rápido e localmente:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## Os plugins empacotados

- `@pantoken/plugin-simple-icons` — marcas de ícones do simple-icons, registradas como tokens de ícone.
- `@pantoken/plugin-logos` — logos de produtos Instructure como SVGs, URIs de dados, e `--instui-logo-*`
  tokens de imagem.
- `@pantoken/plugin-prune-custom-props` — um plugin PostCSS (não um plugin pantoken) que remove
  propriedades customizadas não utilizadas de uma folha de estilo.

Algumas coisas que costumavam ser plugins agora são entregues em `@pantoken/components`, já que muitos componentes precisam
delas por padrão: sombras de elevação (`--instui-elevation-*`, em `components.css`), o anel de foco-outline
(em `base.css` — todo elemento focável o recebe quando pantoken controla a página), e as fontes da marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; o opt-in
`@pantoken/components/fonts.css` carrega os woff2s `@font-face`).

Veja a [referência da API](/api/) para os exports de cada plugin.
