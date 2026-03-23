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
    title: '美綠木地板型錄',
    year: '2025-2026',
    description: '木地板系列完整花色、規格與施工應用。',
    url: '/catalogs/mei-lu-wood-floor-catalog-2025-2026.pdf',
  },
  {
    id: 'grille',
    title: '美綠格柵型錄',
    year: '2025-2026',
    description: '格柵造型、尺寸配置與空間搭配參考。',
    url: '/catalogs/mei-lu-grille-catalog-2025-2026.pdf',
  },
  {
    id: 'youyishi',
    title: '美綠優易石型錄',
    year: '2025-2026',
    description: '優易石系列材質特色、紋理與選型資訊。',
    url: '/catalogs/mei-lu-youyishi-catalog-2025-2026.pdf',
  },
  {
    id: 'carbon-crystal-board',
    title: '美綠碳晶板型錄',
    year: '2026',
    description: '碳晶板產品介紹、技術資料與應用建議。',
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
