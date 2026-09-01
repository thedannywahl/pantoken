# Saída gerada

Diversos pacotes pantoken emitem arquivos em tempo de build — uma folha de estilos, um `theme.json`, um módulo de tokens incorporado. Para manter o repositório limpo e as saídas honestas, todo pacote segue uma convenção e uma tarefa do workspace valida o conjunto.

## A convenção `generated/`

Todo pacote que produz um artefato de build grava-o em um diretório por-pacote `generated/`, e
nada mais vive ali. Uma regra em `.gitignore` cobre todos eles:

```txt
**/generated/
```

Assim, nenhum arquivo gerado é comitado — um build o reproduz. Dois tipos de saída aparecem lá:

- **Estáticos para publicação** — arquivos que um consumidor importa, como o `@pantoken/css`'s `style.css` ou
  o `@pantoken/scss`'s `tokens.scss`. O mapa `exports` do pacote mantém a chave pública
  (`"./style.css"`) mas a aponta para `generated/`, então a API do consumidor nunca muda.
- **Intermediários de build** — arquivos que a própria fonte do pacote importa e empacota em `dist`, como
  o JSON empacotado de `@pantoken/tokens`. Estes não são publicados por si só; são compilados internamente.

## Validando a saída

`@pantoken/validate-generated` (uma ferramenta privada) roda após um build e verifica três coisas:

1. todo pacote gerador realmente escreveu um diretório `generated/` não vazio,
2. o CLI `pantoken` emite pelo menos um arquivo para cada alvo suportado, e
3. nenhuma folha de estilos gerada deriva do IR de tokens — `danglingReferences` para folhas autocontidas,
   e `unknownReferences` para as bridges que apenas referenciam tokens definidos em outro lugar.

## Comandos

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

O validador também está integrado ao `pnpm run ready`, então derivações são detectadas no gate padrão.
