export const mermaidPlugin = (md) => {
  const fence = md.renderer.rules.fence;

  if (!fence) {
    return;
  }

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    const lang = token.info.trim();

    if (lang === "mermaid") {
      const graph = encodeURIComponent(token.content.trim());
      return `<vitepress-mermaid graph="${graph}"></vitepress-mermaid>\n`;
    }

    return fence(...args);
  };
};
