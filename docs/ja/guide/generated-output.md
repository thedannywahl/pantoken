# 生成された出力

いくつかの pantoken パッケージはビルド時にファイル（スタイルシート、`theme.json`、埋め込みトークンモジュールなど）を出力します。リポジトリをクリーンに保ち出力の正当性を担保するため、すべてのパッケージは一つの規約に従い、ワークスペースのタスクがそれらを検証します。

## `generated/` 規約

ビルド成果物を生成するすべてのパッケージは、それを各パッケージごとの `generated/` ディレクトリに書き出し、そこには他のものは存在しません。`.gitignore` の一つのルールがそれらをすべてカバーします：

```txt
**/generated/
```

したがって生成されたファイルはコミットされず、ビルドで再現されます。そこに置かれる出力は二種類です：

- **配布可能な静的ファイル** — 消費者がインポートするファイル（例：`@pantoken/css` の `style.css` や `@pantoken/scss` の `tokens.scss`）。パッケージの `exports` マップは公開キー（`"./style.css"`）を保持しますが、実体を `generated/` に向けるので、消費者向け API は変わりません。
- **ビルド中間物** — パッケージ自身のソースがインポートして `dist` にバンドルするファイル（例：`@pantoken/tokens` のベンダリングされた JSON）。これらは単独で公開されず、コンパイルされます。

## 出力の検証

ビルド後に実行される `@pantoken/validate-generated`（プライベートツール）は、次の三点をチェックします：

1. すべてのジェネレータパッケージが非空の `generated/` ディレクトリを書き出していること、
2. `pantoken` CLI がサポートされる各ターゲットに対して少なくとも一つのファイルを出力すること、
3. 生成されたスタイルシートがトークン IR から逸脱していないこと — 自立したシートの場合は `danglingReferences`、外部で定義されたトークンのみを参照するブリッジの場合は `unknownReferences`。

## コマンド

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

バリデータは `pnpm run ready` にも組み込まれているため、ドリフトは標準のゲートで検出されます。
