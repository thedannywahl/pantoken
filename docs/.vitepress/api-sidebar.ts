import type { DefaultTheme } from "vitepress";

type SidebarItem = DefaultTheme.SidebarItem;
type SidebarRoutes = Record<string, SidebarItem[]>;

const isCssSection = (item: SidebarItem): boolean => item.text === "CSS";

const collapseTree = (item: SidebarItem): SidebarItem => {
  if (!item.items) return { ...item };
  return {
    ...item,
    collapsed: true,
    items: item.items.map(collapseTree),
  };
};

/** Keep navigation to a linked page, but omit the descendants VitePress would render into every page. */
const compactTree = (item: SidebarItem, activePackage?: string): SidebarItem => {
  if (item.link) {
    if (item.link === activePackage) return collapseTree(item);
    const { items: _items, ...compact } = item;
    return compact;
  }

  if (!item.items) return { ...item };
  return {
    ...item,
    collapsed: true,
    items: item.items.map((child) => compactTree(child, activePackage)),
  };
};

const packageRoots = (items: SidebarItem[]): string[] => {
  const links: string[] = [];

  const visit = (item: SidebarItem): void => {
    // TypeDoc package entry pages are emitted as `<workspace path>/src/index.md`. Symbol pages live
    // below that route, so the entry link is also the exact VitePress multi-sidebar prefix we need.
    if (item.link?.endsWith("/src/") && item.items?.length) links.push(item.link);
    item.items?.forEach(visit);
  };

  items.forEach(visit);
  return links;
};

const normalizeCssSection = (item: SidebarItem): SidebarItem => {
  if (!item.items) return { ...item };
  return {
    ...item,
    collapsed: false,
    items: item.items.map(collapseTree),
  };
};

/**
 * Partition the merged TypeDoc + CSS navigation into route-specific VitePress sidebars.
 *
 * VitePress server-renders every item in the selected sidebar even when a group is collapsed. A
 * single monorepo-wide tree therefore duplicates hundreds of kilobytes into every generated API
 * page. Each package route gets the full active package subtree plus linked package roots for
 * cross-package navigation; the CSS route gets its full reference tree.
 */
export const partitionApiSidebar = (
  merged: SidebarItem[],
  apiLabel: string,
  apiPrefix: string,
  apiOverviewLabel: string,
): SidebarRoutes => {
  const cssSections = merged.filter(isCssSection);
  const typedocSections = merged.filter((item) => !isCssSection(item));
  const apiOverview: SidebarItem = { text: apiOverviewLabel, link: apiPrefix };
  const cssOverview: SidebarItem = { text: "CSS", link: `${apiPrefix}css/` };

  const makeSidebar = (activePackage?: string, includeFullCss = false): SidebarItem[] => {
    const apiSection: SidebarItem = {
      text: apiLabel,
      items: [apiOverview, ...typedocSections.map((item) => compactTree(item, activePackage))],
    };

    if (cssSections.length === 0) return [apiSection];
    return [apiSection, ...(includeFullCss ? cssSections.map(normalizeCssSection) : [cssOverview])];
  };

  const routes: SidebarRoutes = { [apiPrefix]: makeSidebar() };
  for (const packageRoot of packageRoots(typedocSections)) {
    routes[packageRoot] = makeSidebar(packageRoot);
  }
  if (cssSections.length > 0) routes[`${apiPrefix}css/`] = makeSidebar(undefined, true);

  return routes;
};
