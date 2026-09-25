/**
 * Injected into the rendered `canvas-theme-editor` starter by `build-canvas-rce.ts` — docs-only, so
 * the published scaffold template stays free of embedding concerns. Reports the document's content
 * height to the embedding page (`.vitepress/theme/components/CanvasRcePage.vue`), which grows the
 * `<iframe>` to match so the iframe never scrolls independently of the docs page.
 *
 * Plain JS served from the static bundle rather than a Vite entry: bundling merges it into the app
 * chunk, where a runtime error in the app would stop it from ever reporting.
 */
(function () {
  /** Must stay in sync with `CANVAS_RCE_HEIGHT_MESSAGE` in `.vitepress/theme/canvas-rce.ts`. */
  var MESSAGE_TYPE = "pantoken:canvas-rce:height";

  if (window.parent === window) return;

  function contentHeight() {
    var body = document.body;
    var style = getComputedStyle(body);
    var margins = Number.parseFloat(style.marginTop) + Number.parseFloat(style.marginBottom);
    // `documentElement`'s box is content-sized (so it can shrink again), but body margins collapse
    // out of it — add them back rather than using `scrollHeight`, which can never report less than
    // the iframe's own height and so would only ever grow.
    return Math.ceil(
      Math.max(
        document.documentElement.getBoundingClientRect().height,
        body.offsetHeight + margins,
      ),
    );
  }

  var last = -1;
  var lastFullscreen = null;
  var timer = 0;

  /**
   * True while the preview pane or TinyMCE (which puts `tox-fullscreen` on the root and body) is
   * overlaying the viewport. Those overlays are sized in `vh`, which inside a content-height iframe
   * resolves to the whole document — the parent has to clamp the frame to its own viewport instead.
   */
  function isFullscreen() {
    return (
      document.documentElement.classList.contains("tox-fullscreen") ||
      document.body.classList.contains("tox-fullscreen") ||
      document.querySelector(".preview-pane.-fullscreen") !== null
    );
  }

  function report() {
    timer = 0;
    var height = contentHeight();
    var fullscreen = isFullscreen();
    if (height === last && fullscreen === lastFullscreen) return;
    last = height;
    lastFullscreen = fullscreen;
    window.parent.postMessage(
      { type: MESSAGE_TYPE, height: height, fullscreen: fullscreen },
      window.location.origin,
    );
  }

  function schedule() {
    // The parent resizes the iframe in response, which re-fires the observers; coalescing keeps that
    // from thrashing. A timer rather than `requestAnimationFrame`, which browsers throttle (to the
    // point of never firing) for framed documents.
    if (timer) return;
    timer = setTimeout(report, 50);
  }

  new ResizeObserver(schedule).observe(document.documentElement);
  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
  });
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  schedule();
})();
