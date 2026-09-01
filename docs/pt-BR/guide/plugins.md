# Plugins

Um plugin do pantoken estende a saída de tokens ou CSS sem criar um fork de um pacote. Você o constrói com
`definePlugin` de `@pantoken/plugin-kit`, então o passa para `buildTokens` ou `toCss`.

## Autorando um plugin

Dê a `definePlugin` os hooks que você implementa. Ele retorna um plugin normal, marcado com as
capacidades inferidas a partir desses hooks. Um plugin pode estender o IR (`tokens`, `icons`), a saída CSS
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

## Registro consciente das capacidades

`buildTokens` e `toCss` executam `checkPlugins` sobre os plugins que você passa. Ele avisa — nunca lança —
quando um plugin não tem um hook correspondente para a fase em que está registrado, então um plugin que só fornece tokens passado
para `toCss` é ignorado com uma nota em vez de ficar silenciosamente sem efeito.

## Compor plugins

Construa sobre outro plugin com `extendPlugin`, ou combine pares com `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks da mesma fase compõem: `tokens` executa a base e depois a adição, `css` mescla as duas
contribuições, e `icons` executa ambas.

## Validar a saída do seu plugin

Execute as verificações de drift compartilhadas de `@pantoken/utils` sobre a própria saída do seu plugin no seu teste, assim um
erro de digitação ou um token renomeado falha rapidamente e localmente:

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
- `@pantoken/plugin-logos` — logos de produto Instructure como SVGs, URIs de dados, e tokens de imagem `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — um plugin PostCSS (não um plugin do pantoken) que remove
  propriedades customizadas não utilizadas de uma folha de estilo.

Algumas coisas que costumavam ser plugins agora são distribuídas em `@pantoken/components`, já que muitos componentes
precisam delas por padrão: sombras de elevação (`--instui-elevation-*`, em `components.css`), o anel de foco-outline
(em `base.css` — todo elemento focável o recebe quando o pantoken é responsável pela página), e as fontes da marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; o opcional `@pantoken/components/fonts.css` carrega os woff2s de `@font-face`).

Veja a [referência da API](/api/) para as exportações de cada plugin.
