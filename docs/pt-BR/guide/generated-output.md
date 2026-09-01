# Saída gerada

Vários pacotes pantoken geram arquivos em tempo de build — uma folha de estilo, um `theme.json`, um módulo de tokens embutido. Para manter o repositório limpo e as saídas honestas, cada pacote segue uma convenção e uma tarefa do workspace valida tudo.

## A convenção `generated/`

Todo pacote que produz um artefato de build grava-o em um diretório por-pacote `generated/`, e
nada mais vive ali. Uma regra em `.gitignore` os cobre todos:

```txt
**/generated/
```

Então nenhum arquivo gerado é comitado — um build o reproduz. Dois tipos de saída caem ali:

- **Estáticos entregáveis** — arquivos que um consumidor importa, como o `@pantoken/css`'s `style.css` ou
  o `@pantoken/scss`'s `tokens.scss`. O mapa `exports` do pacote mantém a chave pública
  (`"./style.css"`) mas aponta para `generated/`, então a API de consumidor nunca muda.
- **Intermediários de build** — arquivos que o próprio código-fonte do pacote importa e bundleia em `dist`, como o
  JSON empacotado do `@pantoken/tokens`. Estes não são publicados por conta própria; são compilados internamente.

## Validando a saída

`@pantoken/validate-generated` (uma ferramenta privada) executa após o build e verifica três coisas:

1. que todo pacote gerador de fato escreveu um diretório `generated/` não vazio,
2. que a CLI `pantoken` emite pelo menos um arquivo para cada alvo suportado, e
3. que nenhuma folha de estilo gerada diverge do IR de tokens — `danglingReferences` para folhas autocontidas,
   e `unknownReferences` para as bridges que apenas referenciam tokens definidos em outro lugar.

## Comandos

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

O validador também está ligado ao `pnpm run ready`, então o desvio é detectado no gate padrão.
