export const BADGE_CLASS_BY_LABEL = {
  Experimental: "instui-pill -color-danger pantoken-doc-tag",
  Alpha: "instui-pill -color-warning pantoken-doc-tag",
  Beta: "instui-pill -color-warning pantoken-doc-tag",
  Deprecated: "instui-pill -color-danger pantoken-doc-tag",
  Stable: "instui-pill -color-success  pantoken-doc-tag",
} as const;

export type BadgeLabel = keyof typeof BADGE_CLASS_BY_LABEL;
