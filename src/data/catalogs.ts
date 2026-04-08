export type Catalog = {
  id: string;
  title: string;
  year: string;
  description: string;
  url: string;
};

export const catalogs: Catalog[] = [
  {
    id: 'wood-floor',
    title: '美綠 SPC 木地板型錄',
    year: '2025-2026',
    description: '收錄 SPC 木地板系列花色與規格，方便快速選樣與比較。',
    url: '/catalogs/mei-lu-wood-floor-catalog-2025-2026.pdf',
  },
  {
    id: 'grille',
    title: '美綠 格柵型錄',
    year: '2025-2026',
    description: '整理格柵系列款式與尺寸，適合牆面、天花與商空應用提案。',
    url: '/catalogs/mei-lu-grille-catalog-2025-2026.pdf',
  },
  {
    id: 'youyishi',
    title: '美綠 優易石型錄',
    year: '2025-2026',
    description: '彙整優易石主要產品花色，方便選樣與整體搭配。',
    url: '/catalogs/mei-lu-youyishi-catalog-2025-2026.pdf',
  },
  {
    id: 'carbon-crystal-board',
    title: '美綠 碳晶板型錄',
    year: '2026',
    description: '提供碳晶板系列花色與應用方向，方便快速查看完整資料。',
    url: '/catalogs/mei-lu-carbon-crystal-board-catalog-2026.pdf',
  },
];

export const timberCatalogs = catalogs.filter((catalog) =>
  ['wood-floor', 'grille'].includes(catalog.id),
);

export const crystalCatalog = catalogs.find(
  (catalog) => catalog.id === 'carbon-crystal-board',
)!;

export const youyishiCatalog = catalogs.find(
  (catalog) => catalog.id === 'youyishi',
)!;
