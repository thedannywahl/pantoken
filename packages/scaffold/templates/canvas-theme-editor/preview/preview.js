/**
 * Loads the starter template manifest, wires the template picker to load a snippet into TinyMCE,
 * and copies the editor's HTML to the clipboard for pasting into Canvas's RCE.
 *
 * Requires a local static server (e.g. `npx serve .`) — `file://` pages can't `fetch()` their own
 * directory due to browser CORS restrictions on the file protocol.
 */
(async function main() {
  const select = document.getElementById("template-select");
  const copyButton = document.getElementById("copy-html");
  const status = document.getElementById("copy-status");

  const manifest = await fetch("../templates/manifest.json").then((res) => res.json());

  for (const entry of manifest.templates) {
    const option = document.createElement("option");
    option.value = entry.file;
    option.textContent = entry.label;
    select.append(option);
  }

  async function loadTemplate(file) {
    const html = await fetch(`../templates/pages/${file}`).then((res) => res.text());
    const editor = tinymce.get("editor");
    if (editor) editor.setContent(html);
  }

  tinymce.init({
    selector: "#editor",
    menubar: false,
    height: 480,
    setup(editor) {
      editor.on("init", () => {
        if (manifest.templates[0]) void loadTemplate(manifest.templates[0].file);
      });
    },
  });

  select.addEventListener("change", () => void loadTemplate(select.value));

  copyButton.addEventListener("click", async () => {
    const editor = tinymce.get("editor");
    if (!editor) return;
    await navigator.clipboard.writeText(editor.getContent());
    status.textContent = "Copied. Paste into Canvas's Rich Content Editor HTML view.";
  });
})().catch((err) => console.error(err));
