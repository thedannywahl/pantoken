# Plugins

Um plugin do pantoken estende a saída de tokens ou CSS sem criar um fork de um pacote. Você cria um com
`definePlugin` de `@pantoken/plugin-kit`, depois o passa para `buildTokens` ou `toCss`.

## Autorando um plugin

Dê ao `definePlugin` os hooks que você implementa. Ele retorna um plugin normal, marcado com as
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
quando um plugin não tem um hook correspondente para a etapa em que está registrado, então um plugin apenas de token passado
para `toCss` é pulado com uma nota em vez de não fazer nada silenciosamente.

## Compor plugins

Construa sobre outro plugin com `extendPlugin`, ou combine pares com `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

Hooks do mesmo estágio se compõem: `tokens` executa a base e depois o adicional, `css` mescla as duas
contribuições, e `icons` executa ambos.

## Valide a saída do seu plugin

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

- `@pantoken/plugin-simple-icons` — marca ícones do simple-icons, registrados como tokens de ícone.
- `@pantoken/plugin-lucide-lab` — ícones do Lucide Lab, registrados como tokens de imagem `--instui-icon-*`.
- `@pantoken/plugin-logos` — logos de produto da Instructure como SVGs, URIs de dados e tokens de imagem `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — um plugin PostCSS (não um plugin pantoken) que remove
  variáveis customizadas não usadas de uma folha de estilos.

O registro do Lucide Lab pode ser carregado de forma preguiçosa (lazy), e então passado ao hook de token síncrono:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

Algumas coisas que costumavam ser plugins agora são entregues em `@pantoken/components`, já que muitos componentes precisam
delas por padrão: sombras de elevação (`--instui-elevation-*`, em `components.css`), o anel de foco-outline
(em `base.css` — todo elemento focável o recebe quando o pantoken é responsável pela página), e as fontes da marca Instructure
(Atkinson Hyperlegible Next: `base.css` aplica `--instui-font-family-base`; o opt-in
`@pantoken/components/fonts.css` carrega os woff2s `@font-face`).

Veja a [referência da API](/api/) para as exports de cada plugin.
