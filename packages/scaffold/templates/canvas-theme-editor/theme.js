/**
 * pantoken for Canvas Theme Editor
 * Upload this file under Theme Editor → Advanced → JavaScript.
 *
 * Canvas loads this script directly, in the page's global scope, alongside Canvas's own JS and
 * any other admin's Theme Editor JS — so treat window/document as shared, and keep this a
 * well-scoped no-op by default. Add behavior only inside the marked extension point below.
 */
(function pantokenTheme() {
  "use strict";

  /**
   * Runs once the DOM is ready. Add page-level behavior for your RCE templates' markup here
   * (e.g. wiring up a callout's dismiss button) — this file ships with no behavior by default.
   */
  function onReady() {
    // Extension point: add behavior for your RCE templates' markup here.
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady, { once: true });
  } else {
    onReady();
  }
})();
