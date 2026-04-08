export type GrilleProduct = {
  code: string;
  series: string;
  finish: string;
  coverSize: string;
  productSize: string;
  thickness: string;
  packing: string;
  price: string;
  stockStatus?: '現貨' | '少量現貨' | '期貨' | '請洽詢';
  images: string[];
};

export const grilleProducts: GrilleProduct[] = [
  {
    code: 'SGAL-5084',
    series: '170 格柵系列',
    finish: '柚木',
    coverSize: '260 x 16 cm',
    productSize: '260 x 17 cm',
    thickness: '2.2 cm',
    packing: '10 支 / 箱',
    price: '$680 / 支',
    stockStatus: '現貨',
    images: [
      '/products/grille/SGAL-5084/SGAL-5084 (1).png',
      '/products/grille/SGAL-5084/SGAL-5084 (2).png',
      '/products/grille/SGAL-5084/SGAL-5084 (3).png',
    ],
  },
  {
    code: 'SGAL-6078',
    series: '170 格柵系列',
    finish: '江南煙雨2',
    coverSize: '260 x 16 cm',
    productSize: '260 x 17 cm',
    thickness: '2.2 cm',
    packing: '10 支 / 箱',
    price: '$680 / 支',
    stockStatus: '現貨',
    images: [
      '/products/grille/SGAL-6078/SGAL-6078 (1).png',
      '/products/grille/SGAL-6078/SGAL-6078 (2).png',
      '/products/grille/SGAL-6078/SGAL-6078 (3).png',
    ],
  },
  {
    code: 'SGAL-6106',
    series: '170 格柵系列',
    finish: '浮雕淺灰',
    coverSize: '260 x 16 cm',
    productSize: '260 x 17 cm',
    thickness: '2.2 cm',
    packing: '10 支 / 箱',
    price: '$680 / 支',
    stockStatus: '現貨',
    images: [
      '/products/grille/SGAL-6106/SGAL-6106 (1).png',
      '/products/grille/SGAL-6106/SGAL-6106 (2).png',
      '/products/grille/SGAL-6106/SGAL-6106 (3).png',
    ],
  },
  {
    code: 'SGAS-6070',
    series: '149 格柵系列',
    finish: '浮雕科技木3',
    coverSize: '260 x 13.9 cm',
    productSize: '260 x 14.8 cm',
    thickness: '1.4 cm',
    packing: '10 支 / 箱',
    price: '$790 / 支',
    stockStatus: '現貨',
    images: [
      '/products/grille/SGAS-6070/SGAL-6070 (1).png',
      '/products/grille/SGAS-6070/SGAL-6070 (2).png',
      '/products/grille/SGAS-6070/SGAL-6070 (3).png',
    ],
  },
  {
    code: 'SGAS-6072',
    series: '149 格柵系列',
    finish: '浮雕科技木2',
    coverSize: '260 x 13.9 cm',
    productSize: '260 x 14.8 cm',
    thickness: '1.4 cm',
    packing: '10 支 / 箱',
    price: '$790 / 支',
    stockStatus: '現貨',
    images: [
      '/products/grille/SGAS-6072/SGAS-6072 (1).png',
      '/products/grille/SGAS-6072/SGAS-6072 (2).png',
      '/products/grille/SGAS-6072/SGAS-6072 (3).png',
    ],
  },
  {
    code: 'SGAS-6163',
    series: '149 格柵系列',
    finish: '漆感白',
    coverSize: '260 x 13.9 cm',
    productSize: '260 x 14.8 cm',
    thickness: '1.4 cm',
    packing: '10 支 / 箱',
    price: '$790 / 支',
    stockStatus: '現貨',
    images: [
      '/products/grille/SGAS-6163/SGAS-6136 (1).png',
      '/products/grille/SGAS-6163/SGAS-6136 (2).png',
      '/products/grille/SGAS-6163/SGAS-6136 (3).png',
    ],
  },
];


