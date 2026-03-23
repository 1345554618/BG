export type UestoneProduct = {
  code: string;
  series: 'SD' | 'SAD';
  textureName: string;
  baseType: string;
  size: string;
  thickness: string;
  packing: string;
  price: string;
  images: string[];
};

export const uestoneProducts: UestoneProduct[] = [
  {
    code: 'SD-1000',
    series: 'SD',
    textureName: '維多利亞白',
    baseType: '石皮',
    size: '120 x 60 cm',
    thickness: '4 mm',
    packing: '4 片 / 箱',
    price: '$3900 / 片',
    images: [
      '/products/uestone/SD/1000/sd-1000(1).png',
      '/products/uestone/SD/1000/sd-1000(2).png',
      '/products/uestone/SD/1000/sd-1000(3).png',
      '/products/uestone/SD/1000/sd-1000(4).png',
    ],
  },
  {
    code: 'SD-2489',
    series: 'SD',
    textureName: '黃金麻',
    baseType: '石皮',
    size: '120 x 60 cm',
    thickness: '4 mm',
    packing: '4 片 / 箱',
    price: '$3900 / 片',
    images: [
      '/products/uestone/SD/2489/sd-2489 (1).png',
      '/products/uestone/SD/2489/sd-2489 (2).png',
      '/products/uestone/SD/2489/sd-2489 (3).png',
      '/products/uestone/SD/2489/sd-2489 (4).png',
    ],
  },
  {
    code: 'SD-3901',
    series: 'SD',
    textureName: '淺灰',
    baseType: '石皮',
    size: '120 x 60 cm',
    thickness: '4 mm',
    packing: '4 片 / 箱',
    price: '$3900 / 片',
    images: [
      '/products/uestone/SD/3901/sd-3901 (1).png',
      '/products/uestone/SD/3901/sd-3901 (2).png',
      '/products/uestone/SD/3901/sd-3901 (3).png',
      '/products/uestone/SD/3901/sd-3901 (4).png',
    ],
  },
  {
    code: 'SD-4900',
    series: 'SD',
    textureName: '羅馬黑',
    baseType: '石皮',
    size: '120 x 60 cm',
    thickness: '4 mm',
    packing: '4 片 / 箱',
    price: '$3900 / 片',
    images: [
      '/products/uestone/SD/4900/sd-4900(1).jpg',
      '/products/uestone/SD/4900/sd-4900(2).jpg',
      '/products/uestone/SD/4900/sd-4900(3).jpg',
      '/products/uestone/SD/4900/sd-4900(4).jpg',
    ],
  },
  {
    code: 'SAD-2489',
    series: 'SAD',
    textureName: '黃金麻',
    baseType: '萬黃石',
    size: '120 x 60 cm',
    thickness: '11 mm',
    packing: '4 片 / 箱',
    price: '$3900 / 片',
    images: [
      '/products/uestone/SAD/2489/SAD-2489 (1).png',
      '/products/uestone/SAD/2489/SAD-2489 (2).png',
      '/products/uestone/SAD/2489/SAD-2489 (3).png',
      '/products/uestone/SAD/2489/SAD-2489 (4).png',
    ],
  },
  {
    code: 'SAD-3489',
    series: 'SAD',
    textureName: '灰麻',
    baseType: '萬黃石',
    size: '120 x 60 cm',
    thickness: '11 mm',
    packing: '4 片 / 箱',
    price: '$3900 / 片',
    images: [
      '/products/uestone/SAD/3489/SAD-3489 (1).png',
      '/products/uestone/SAD/3489/SAD-3489 (2).png',
      '/products/uestone/SAD/3489/SAD-3489 (3).png',
      '/products/uestone/SAD/3489/SAD-3489 (4).png',
    ],
  },
  {
    code: 'SAD-4900',
    series: 'SAD',
    textureName: '羅馬黑',
    baseType: '萬黃石',
    size: '120 x 60 cm',
    thickness: '11 mm',
    packing: '4 片 / 箱',
    price: '$3900 / 片',
    images: [
      '/products/uestone/SAD/4900/SAD-4900 (1).png',
      '/products/uestone/SAD/4900/SAD-4900 (2).png',
      '/products/uestone/SAD/4900/SAD-4900 (3).png',
      '/products/uestone/SAD/4900/SAD-4900 (4).png',
    ],
  },
];
