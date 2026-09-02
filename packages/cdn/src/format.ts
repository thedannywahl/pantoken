/**
 * Turn a list of resolved URLs into the markup/code snippets consumers actually paste — shared by
 * every picker so a provider without combine support still renders sensibly (one line per file).
 */

/** One `<link rel="stylesheet">` tag per URL, newline-joined. */
export function toLinkTags(urls: string[]): string {
  return urls.map((url) => `<link rel="stylesheet" href="${url}">`).join("\n");
}

/** One CSS `@import` statement per URL, newline-joined. */
export function toImportStatements(urls: string[]): string {
  return urls.map((url) => `@import url("${url}");`).join("\n");
}

/** One JS `import` statement per URL, newline-joined. */
export function toEsmImportStatements(urls: string[]): string {
  return urls.map((url) => `import "${url}";`).join("\n");
}

/** One `document.createElement("script")` + `appendChild` block per URL, newline-joined. */
export function toScriptTagLines(urls: string[]): string {
  return urls
    .map(
      (url) =>
        `  var script = document.createElement("script");\n` +
        `  script.src = "${url}";\n` +
        `  document.head.appendChild(script);`,
    )
    .join("\n");
}
