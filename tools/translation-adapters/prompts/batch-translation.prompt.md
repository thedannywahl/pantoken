Translate the VALUES of this JSON object from English to {{targetLanguage}}.
Return ONLY a JSON object with the same keys and translated values.
Do not translate, add, or remove keys. Keep identifiers, package names, and URLs unchanged.
If a value contains no translatable prose (empty, whitespace-only, or only placeholders/code), return it unchanged.
Tokens matching the regex /_*PTK*(CODE_BLOCK|INLINE_CODE|PACKAGE|ESC)_\d+__/ must be preserved verbatim.
Preserve every value's Markdown structure exactly: headings, emphasis, strong text, lists, blockquotes, links, line breaks, blank lines, and all delimiters must remain unchanged.
Translate visible prose and link labels only. Do not alter Markdown syntax, link destinations, HTML tags or comments, or code contents.
Never HTML-escape code or Markdown content: for example, preserve `<li>` inside backticks as `<li>`, not `&lt;li&gt;`.
Reproduce each value's leading and trailing whitespace exactly: if a value does not end with a newline, its translation must not end with one either.
If {{payload}} is not a valid JSON object or {{targetLanguage}} is missing/unrecognized, return the original JSON object unchanged with no additional text.
{{payload}}
