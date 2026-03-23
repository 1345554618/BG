export type CarbonCrystalProduct = {
  code: string;
  series: 'wood' | 'fabric' | 'metal' | 'marble';
  seriesLabel: string;
  size: string;
  thickness: string;
  packing: string;
  marketPrice: string | null;
  designerPrice: string | null;
  distributorPrice: string | null;
  professionalDealerPrice: string | null;
  image?: string;
  note?: string;
};

export type CarbonCrystalAccessory = {
  name: string;
  size: string;
  marketPrice: string;
  designerPrice: string;
  distributorPrice: string;
  professionalDealerPrice: string;
};

export const carbonCrystalProducts: CarbonCrystalProduct[] = [
  {
    code: '7005',
    series: 'wood',
    seriesLabel: '木紋',
    size: '244 x 122 cm',
    thickness: '0.8 cm',
    packing: '3 片 / 箱',
    marketPrice: '$4,500 / 片',
    designerPrice: '$3,710 / 片',
    distributorPrice: '$2,970 / 片',
    professionalDealerPrice: '$1,500 / 片',
    image: '/products/TJB/wood/7005.png',
  },
  {
    code: '7047',
    series: 'wood',
    seriesLabel: '木紋',
    size: '244 x 122 cm',
    thickness: '0.8 cm',
    packing: '3 片 / 箱',
    marketPrice: '$4,100 / 片',
    designerPrice: '$3,400 / 片',
    distributorPrice: '$2,700 / 片',
    professionalDealerPrice: '$1,400 / 片',
    image: '/products/TJB/wood/7047.png',
  },
  {
    code: '8023',
    series: 'wood',
    seriesLabel: '木紋',
    size: '244 x 122 cm',
    thickness: '0.8 cm',
    packing: '3 片 / 箱',
    marketPrice: '$3,900 / 片',
    designerPrice: '$3,300 / 片',
    distributorPrice: '$2,600 / 片',
    professionalDealerPrice: '$1,300 / 片',
    image: '/products/TJB/wood/8023.png',
  },
  {
    code: '7051',
    series: 'fabric',
    seriesLabel: '布紋',
    size: '244 x 122 cm',
    thickness: '0.8 cm',
    packing: '3 片 / 箱',
    marketPrice: '$4,100 / 片',
    designerPrice: '$3,400 / 片',
    distributorPrice: '$2,700 / 片',
    professionalDealerPrice: '$1,400 / 片',
    image: '/products/TJB/fabric pattern/7051.png',
  },
  {
    code: '7081',
    series: 'fabric',
    seriesLabel: '布紋',
    size: '244 x 122 cm',
    thickness: '0.8 cm',
    packing: '3 片 / 箱',
    marketPrice: null,
    designerPrice: null,
    distributorPrice: null,
    professionalDealerPrice: null,
    image: '/products/TJB/fabric pattern/7081.png',
    note: '此型號的價位欄位在 PDF 萃取時未完整辨識，先保留商品資訊。',
  },
  {
    code: '7106',
    series: 'metal',
    seriesLabel: '金屬',
    size: '244 x 122 cm',
    thickness: '0.8 cm',
    packing: '3 片 / 箱',
    marketPrice: '$5,500 / 片',
    designerPrice: '$4,600 / 片',
    distributorPrice: '$3,700 / 片',
    professionalDealerPrice: '$1,900 / 片',
    image: '/products/TJB/iron/7106.png',
  },
  {
    code: '7109',
    series: 'metal',
    seriesLabel: '金屬',
    size: '244 x 122 cm',
    thickness: '0.8 cm',
    packing: '3 片 / 箱',
    marketPrice: '$4,500 / 片',
    designerPrice: '$3,710 / 片',
    distributorPrice: '$3,000 / 片',
    professionalDealerPrice: '$1,500 / 片',
    image: '/products/TJB/iron/7109.png',
  },
  {
    code: '8137',
    series: 'metal',
    seriesLabel: '金屬',
    size: '244 x 122 cm',
    thickness: '0.8 cm',
    packing: '3 片 / 箱',
    marketPrice: '$5,500 / 片',
    designerPrice: '$4,600 / 片',
    distributorPrice: '$3,700 / 片',
    professionalDealerPrice: '$1,900 / 片',
    image: '/products/TJB/iron/8137.png',
  },
  {
    code: '7125',
    series: 'marble',
    seriesLabel: '大理石',
    size: '260 x 122 cm',
    thickness: '-',
    packing: '4 片 / 箱',
    marketPrice: '$8,000 / 片',
    designerPrice: '$6,600 / 片',
    distributorPrice: '$5,300 / 片',
    professionalDealerPrice: '$2,700 / 片',
    note: '目前照片資料夾中尚未看到 7125 對應圖片，因此先保留材質示意底圖。',
  },
];

export const carbonCrystalAccessories: CarbonCrystalAccessory[] = [
  {
    name: 'L 型收邊條',
    size: '300 cm',
    marketPrice: '$940 / 條',
    designerPrice: '$780 / 條',
    distributorPrice: '$470 / 條',
    professionalDealerPrice: '$315 / 條',
  },
  {
    name: '工字條',
    size: '-',
    marketPrice: '$940 / 條',
    designerPrice: '$780 / 條',
    distributorPrice: '$470 / 條',
    professionalDealerPrice: '$315 / 條',
  },
];
