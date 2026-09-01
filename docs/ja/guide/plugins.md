# プラグイン

pantoken プラグインはパッケージをフォークせずにトークンや CSS 出力を拡張します。`definePlugin` を `@pantoken/plugin-kit` から使って作成し、それを `buildTokens` または `toCss` に渡します。

## プラグインを作成する

実装するフックを `definePlugin` に渡してください。これはそのフックから推測される機能でブランディングされた通常のプラグインを返します。プラグインは IR（`tokens`, `icons`）、CSS 出力（`css`）、またはその両方を拡張できます。

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## 機能対応の登録

`buildTokens` と `toCss` は、渡されたプラグインに対して `checkPlugins` を実行します。プラグインが登録されているステージに対して一致するフックを持たない場合、例外は投げずに警告するだけです。したがってトークン専用のプラグインを `toCss` に渡した場合、何も行わずに黙ってスキップされるのではなく、注記と共にスキップされます。

## プラグインを合成する

`extendPlugin` を使って他のプラグインの上に構築するか、`mergePlugin` で同等のものを組み合わせます:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

同じステージのフックは合成されます: `tokens` はベースを実行してから追加を実行し、`css` は二つの寄与をマージし、`icons` は両方を実行します。

## プラグインの出力を検証する

プラグインのテスト内で共有のドリフトチェック（`@pantoken/utils`）を実行して、タイプミスや名前変更されたトークンが早期かつローカルで失敗するようにします:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## バンドルされたプラグイン

- `@pantoken/plugin-simple-icons` — simple-icons からアイコンをブランディングし、アイコントークンとして登録します。
- `@pantoken/plugin-logos` — Instructure のプロダクトロゴを SVG、データ URI、および `--instui-logo-*` 画像トークンとして提供します。
- `@pantoken/plugin-prune-custom-props` — 未使用のカスタムプロパティをスタイルシートから削除する PostCSS プラグイン（pantoken プラグインではありません）。

以前はプラグインだったいくつかの機能は、今や多くのコンポーネントでデフォルトで必要とされるため `@pantoken/components` に同梱されています: エレベーションシャドウ（`--instui-elevation-*`、`components.css` に含まれる）、フォーカスアウトラインリング（`base.css` に含まれる — pantoken がページを管理しているときはすべてのフォーカス可能要素に適用されます）、および Instructure ブランドフォント（Atkinson Hyperlegible Next: `base.css` が `--instui-font-family-base` を適用します; オプトインの `@pantoken/components/fonts.css` は `@font-face` の woff2 を読み込みます）。

各プラグインのエクスポートについては [API リファレンス](/api/) を参照してください。
