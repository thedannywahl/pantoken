/* c8 ignore file */
import { initSkeletonLoading } from "../behaviors/skeleton-loader.js";

function initSkeletonLoadingRegions(): void {
  for (const wrapper of document.querySelectorAll<HTMLElement>(".instui-skeleton-loading")) {
    const busyRegion = wrapper.querySelector<HTMLElement>("[data-skeleton-region]");
    const status = wrapper.querySelector<HTMLElement>("[data-skeleton-status]");
    const error = wrapper.querySelector<HTMLElement>("[data-skeleton-error]");
    if (busyRegion && status && error) initSkeletonLoading(busyRegion, { status, error });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSkeletonLoadingRegions);
} else {
  initSkeletonLoadingRegions();
}
