# 生成的输出

几个 pantoken 包在构建时会生成文件——样式表、一个 `theme.json`、一个内嵌的令牌模块。为了保持仓库整洁并且输出可靠，每个包遵循一项约定，并且有一个工作区任务会验证所有内容。

## `generated/` 约定

每个产生构建产物的包都会将其写入每包的 `generated/` 目录，且该目录中不包含其他内容。一个位于 `.gitignore` 的规则覆盖了它们全部：

```txt
**/generated/
```

因此没有生成的文件会被提交——构建可以重现它们。有两类输出会落在那里：

- **可发布的静态文件**——消费者会导入的文件，例如 `@pantoken/css` 的 `style.css` 或者
  `@pantoken/scss` 的 `tokens.scss`。包的 `exports` 映射保留了公共键
  (`"./style.css"`)，但将其指向 `generated/`，因此消费者 API 永远不会改变。
- **构建中间产物**——包自身源码导入并打包进 `dist` 的文件，例如
  `@pantoken/tokens` 中的供应商化 JSON。这些不会单独发布；它们会被编译进去。

## 验证输出

`@pantoken/validate-generated`（一个私有工具）在构建后运行并检查三件事：

1. 每个生成器包确实写入了非空的 `generated/` 目录，
2. `pantoken` CLI 对每个受支持的目标至少生成一个文件，及
3. 没有生成的样式表偏离令牌中间表示（IR）——对于自包含的样式表使用 `danglingReferences`，
   对于仅引用在别处定义的令牌的桥接器使用 `unknownReferences`。

## 命令

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

验证器也接入了 `pnpm run ready`，因此偏差会在标准准入检查中被捕获。
