export type WoodFloorProduct = {
  code: string;
  series: string;
  size: string;
  thickness: string;
  packing: string;
  marketPricePerBox: string;
  designerPricePerBox: string;
  images: string[];
};

export const woodFloorProducts: WoodFloorProduct[] = [
  {
    code: 'M291',
    series: 'SPC 系列',
    size: '122 x 18 cm',
    thickness: '0.5 cm',
    packing: '12 片 / 箱 (0.79 坪 / 箱)',
    marketPricePerBox: '$1,750 / 箱',
    designerPricePerBox: '$1,435 / 箱',
    images: [
      '/products/woodfloor/M291/M291 (1).png',
      '/products/woodfloor/M291/M291 (2).png',
    ],
  },
  {
    code: 'M304',
    series: 'SPC 系列',
    size: '122 x 18 cm',
    thickness: '0.6 cm',
    packing: '10 片 / 箱 (0.66 坪 / 箱)',
    marketPricePerBox: '$1,700 / 箱',
    designerPricePerBox: '$1,400 / 箱',
    images: [
      '/products/woodfloor/M304/M304 (1).png',
      '/products/woodfloor/M304/M304 (2).png',
    ],
  },
  {
    code: 'M001',
    series: 'SPC 系列',
    size: '122 x 18 cm',
    thickness: '0.6 cm',
    packing: '10 片 / 箱 (0.66 坪 / 箱)',
    marketPricePerBox: '$1,700 / 箱',
    designerPricePerBox: '$1,400 / 箱',
    images: [
      '/products/woodfloor/M001/M001(1).png',
      '/products/woodfloor/M001/M001(2).png',
    ],
  },
  {
    code: 'M037',
    series: 'SPC 系列',
    size: '122 x 18 cm',
    thickness: '0.6 cm',
    packing: '10 片 / 箱 (0.66 坪 / 箱)',
    marketPricePerBox: '$1,700 / 箱',
    designerPricePerBox: '$1,400 / 箱',
    images: [
      '/products/woodfloor/M037/M037(1).png',
      '/products/woodfloor/M037/M037(2).png',
    ],
  },
];
