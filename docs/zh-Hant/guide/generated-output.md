# 生成的輸出

若干 pantoken 套件在建置時會輸出檔案 — 一份樣式表、一個 `theme.json`、一個內嵌的 token 模組。為了保持儲存庫整潔並確保輸出可重現，每個套件遵循一項慣例，且有一個工作區任務會驗證整個流程。

## `generated/` 慣例

每個產生建置產物的套件都會將其寫入每套件專屬的 `generated/` 目錄，而該目錄中不會有其他檔案。`.gitignore` 裡的一條規則涵蓋全部：

```txt
**/generated/
```

因此不會有任何產生的檔案被提交 — 建置會重現它們。兩類輸出會放在那裡：

- **可發布的靜態檔** — 使用者會匯入的檔案，例如 `@pantoken/css` 的 `style.css` 或
  `@pantoken/scss` 的 `tokens.scss`。該套件的 `exports` 映射保留公共鍵
  (`"./style.css"`)，但將它指向 `generated/`，因此消費者 API 永遠不會改變。
- **建置中間產物** — 套件自身原始碼匯入並打包進 `dist` 的檔案，例如
  `@pantoken/tokens` 的內含 JSON。這些不會單獨發佈；它們會被編譯進去。

## 驗證輸出

`@pantoken/validate-generated`（一個私有工具）在建置後執行並檢查三件事：

1. 每個產生器套件實際寫入了一個非空的 `generated/` 目錄，
2. `pantoken` CLI 為每個支援的目標至少輸出一個檔案，及
3. 沒有任何產生的樣式表偏離 token IR — 對於自包含的樣式表使用 `danglingReferences`，
   對於僅參考在其他處定義 token 的橋接使用 `unknownReferences`。

## 指令

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

該驗證器也已掛鉤到 `pnpm run ready`，因此偏移會在標準門禁中被偵測。
