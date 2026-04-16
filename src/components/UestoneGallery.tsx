import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CircleAlert, Clock3, Download, FileText, Package, PackageCheck, Ruler, SquareStack } from 'lucide-react';
import ProductImageGallery from './ProductImageGallery';
import ImageActionCard from './ImageActionCard';
import { catalogs } from '../data/catalogs';
import { uestoneProducts } from '../data/uestoneProducts';

const isAvailableNow = (status?: string) => status === '現貨' || status === '少量現貨';

const formatSpecSize = (size?: string, thickness?: string) => {
  const normalizedSize = size?.replace(/cm/gi, '').trim() ?? '';
  const normalizedThickness = thickness?.replace(/cm/gi, '').trim() ?? '';

  if (!normalizedSize && !normalizedThickness) return '-';
  if (!normalizedThickness || normalizedThickness === '-') return size ?? '-';
  if (!normalizedSize || normalizedSize === '-') return thickness ?? '-';

  return normalizedSize + ' x ' + normalizedThickness + ' cm';
};

const formatCoverageArea = (size?: string) => {
  const normalizedSize = size?.replace(/cm/gi, '').replace(/\s+/g, '').trim() ?? '';

  const coverageMap: Record<string, string> = {
    '120x33': '0.12 / 坪',
    '122x33': '0.12 / 坪',
    '122x34': '0.12 / 坪',
    '120x18': '0.01 / 坪',
    '120x30': '0.11 / 坪',
    '110x40': '0.01 / 坪',
    '100x40': '0.01 / 坪',
    '120x60': '0.21 / 坪',
    '240x80': '0.58 / 坪',
    '128x46': '0.17 / 坪',
    '150x75': '0.34 / 坪',
    '161x86': '0.41 / 坪',
    '60x60': '0.11 / 坪',
  };

  return coverageMap[normalizedSize] ?? '待補';
};

const seriesNameMap: Record<string, string> = {
  全部: '全部',
  SD: '石皮',
  XSD: '斜拼石皮',
  SAD: '蘑菇石',
  SYD: '菠蘿石',
  SS: '頁岩石',
  LSD: '山水石',
  CBD: '水泥平板模',
  SBD: '文化磚',
  SUD: '小岩石',
  SJD: '銹石',
  SRD: '石岩石',
  SSD: '水流石',
  SDD: '山岩石',
  YSD: '長條石',
  WWD: '模板木',
  TD: '瓦片',
  CHD: '九宮格T型',
  CHO: '九宮格圓型',
  CHL: '九宮格三角型',
  'CHD-D': '九宮格雙面',
  GB: '立體拼接格',
  MGB: '金屬拼接格',
  'SS-C': '連紋大頁岩石',
  'SSD-L': '大水流石',
  YHD: '水立方',
  PDD: '金字塔',
  WED: '英格蘭木',
  TBD: '洞石交丁磚',
  TJD: '立型洞石磚',
  TTD: '洞石板',
  CTS: '城堡石',
  MRD: '龜紋石',
  ELS: '鵝卵石',
  HJS: '海礁石',
  CWS: '城墻石',
};

const preferredSeriesOrder = [
  'SD',
  'XSD',
  'SAD',
  'SYD',
  'SS',
  'LSD',
  'CBD',
  'SBD',
  'SUD',
  'SJD',
  'SRD',
  'SSD',
  'SDD',
  'YSD',
  'WWD',
  'TD',
  'CHD',
  'CHO',
  'CHL',
  'CHD-D',
  'GB',
  'MGB',
  'SS-C',
  'SSD-L',
  'YHD',
  'PDD',
  'WED',
  'TBD',
  'TJD',
  'TTD',
  'CTS',
  'MRD',
  'ELS',
  'HJS',
  'CWS',
];

export default function UestoneGallery({ onNavigate }: { onNavigate: (view: string) => void }) {
  const uestoneCatalog = catalogs.find((catalog) => catalog.id === 'youyishi');
  const filters = useMemo(() => {
    const availableSeries = Array.from(new Set(uestoneProducts.map((product) => product.series).filter((series): series is string => Boolean(series))));
    return [
      ...preferredSeriesOrder.filter((series) => availableSeries.includes(series)),
      ...availableSeries.filter((series) => !preferredSeriesOrder.includes(series)).sort(),
    ];
  }, []);

  const [activeFilter, setActiveFilter] = useState(filters[0] ?? '');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const baseFilteredProducts = uestoneProducts.filter((product) => product.series === activeFilter);
  const filteredProducts = showInStockOnly ? baseFilteredProducts.filter((product) => isAvailableNow(product.stockStatus)) : baseFilteredProducts;
  const hasSeriesStock = baseFilteredProducts.some((product) => isAvailableNow(product.stockStatus));

  const [selectedProductCode, setSelectedProductCode] = useState(uestoneProducts[0]?.code ?? '');
  const selectedProduct =
    filteredProducts.find((product) => product.code === selectedProductCode) ?? filteredProducts[0] ?? null;
  const [activeImage, setActiveImage] = useState(selectedProduct?.images[0] ?? '');

  useEffect(() => {
    if (!filteredProducts.length) {
      setActiveImage('');
      return;
    }

    if (!filteredProducts.some((product) => product.code === selectedProductCode)) {
      setSelectedProductCode(filteredProducts[0].code);
    }
  }, [filteredProducts, selectedProductCode]);

  useEffect(() => {
    setActiveImage(selectedProduct?.images[0] ?? '');
  }, [selectedProduct?.code]);

  const activeSeriesLabel = seriesNameMap[activeFilter] ?? activeFilter;
  const productGridTitle = `${activeSeriesLabel}系列`;
  const stockStatus = selectedProduct?.stockStatus ?? '請洽詢';
  const selectedSeriesLabel = selectedProduct ? seriesNameMap[selectedProduct.series] ?? selectedProduct.series : activeSeriesLabel;
  const StockIcon = stockStatus === '現貨' ? PackageCheck : stockStatus === '少量現貨' ? CircleAlert : Clock3;
  const stockTone =
    stockStatus === '現貨'
      ? 'border-[#88a790] bg-[linear-gradient(135deg,#5d7d66,#7ea085)] text-white shadow-[0_16px_32px_rgba(93,125,102,0.24)]'
      : stockStatus === '少量現貨'
        ? 'border-[#c48c5a] bg-[linear-gradient(135deg,#b66f3c,#d29a68)] text-white shadow-[0_16px_32px_rgba(182,111,60,0.24)]'
        : stockStatus === '期貨'
          ? 'border-[#c9a372] bg-[linear-gradient(135deg,#b88c58,#d4ae79)] text-white shadow-[0_16px_32px_rgba(184,140,88,0.24)]'
          : 'border-[#d8cbb9] bg-[linear-gradient(135deg,#cabaa6,#dfd3c5)] text-white shadow-[0_16px_32px_rgba(160,136,108,0.18)]';
  const stockDotTone =
    stockStatus === '現貨' ? 'bg-[#dff7e5]' : stockStatus === '少量現貨' ? 'bg-[#ffe8d5]' : stockStatus === '期貨' ? 'bg-[#fff2dc]' : 'bg-[#f9f2ea]';

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-[#2e2a26]">
      <header className="sticky top-0 z-50 border-b border-[#ddd1c2] bg-[#f6f1ea]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="flex items-center" onClick={() => onNavigate('lux')}>
            <img src="/logo/BG_logo.png" alt="Beauty Green" className="h-12 w-auto object-contain sm:h-14" />
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#6f6254] md:flex">
            <a href="#featured" className="transition-colors hover:text-[#2e2a26]">
              產品展示
            </a>
            <a href="#products" className="transition-colors hover:text-[#2e2a26]">
              系列商品
            </a>
            {uestoneCatalog ? (
              <a href={uestoneCatalog.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#2e2a26]">
                線上型錄
              </a>
            ) : null}
          </nav>

          {uestoneCatalog ? (
            <a
              href={uestoneCatalog.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#2e2a26] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8b7a67]"
            >
              <Download className="h-4 w-4" />
              開啟型錄
            </a>
          ) : null}
        </div>
      </header>

      <main>
        <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {selectedProduct ? (
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <ProductImageGallery
                images={selectedProduct.images}
                activeImage={activeImage}
                onSelect={setActiveImage}
                altBase={selectedProduct.code}
                aspectClass="aspect-[16/10]"
                thumbAspectClass="aspect-[16/10]"
              />

              <div className="rounded-[32px] border border-[#ddd1c2] bg-white p-8 shadow-[0_24px_60px_rgba(46,42,38,0.08)] lg:p-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-[#8b7a67]">UESTONE SURFACE</p>

                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-bold tracking-tight text-[#2e2a26] lg:text-5xl">{selectedProduct.code}</h1>
                  <div className={`inline-flex items-center gap-3 rounded-2xl border px-4 py-2.5 ${stockTone}`}>
                    <span className={`h-3 w-3 rounded-full ${stockDotTone} ring-4 ring-white/15`} />
                    <div className="leading-tight">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75">供應狀態</p>
                      <p className="text-sm font-bold tracking-[0.08em]">{stockStatus}</p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12">
                      <StockIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <p className="mb-2 text-xl text-[#6f6254]">{selectedProduct.textureName}</p>
                <p className="mb-2 text-base text-[#8b7a67]">{selectedProduct.baseType} / {selectedSeriesLabel}</p>

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e4d9ca] bg-[#fbf8f3] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b7a67]">
                      <SquareStack className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">系列</span>
                    </div>
                    <p className="font-bold text-[#2e2a26]">{selectedSeriesLabel}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e4d9ca] bg-[#fbf8f3] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b7a67]">
                      <Ruler className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">尺寸</span>
                    </div>
                    <p className="font-bold text-[#2e2a26]">{formatSpecSize(selectedProduct.size, selectedProduct.thickness)}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e4d9ca] bg-[#fbf8f3] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b7a67]">
                      <ArrowRight className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">覆蓋面積</span>
                    </div>
                    <p className="font-bold text-[#2e2a26]">{formatCoverageArea(selectedProduct.size)}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e4d9ca] bg-[#fbf8f3] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b7a67]">
                      <Package className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">裝箱數</span>
                    </div>
                    <p className="font-bold text-[#2e2a26]">{selectedProduct.packing}</p>
                  </div>
                </div>

                <div className="mb-8 rounded-3xl border border-[#e4d5c2] bg-[#f3ebdf] p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7a67]">Price</p>
                  <p className="mb-1 text-3xl font-bold text-[#2e2a26]">{selectedProduct.price}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#6f6254]">
                    優易石系列可運用於住宅牆面、商空展示面與接待區域，呈現自然紋理與溫潤質感。
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {uestoneCatalog ? (
                    <a
                      href={uestoneCatalog.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2e2a26] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8b7a67]"
                    >
                      <FileText className="h-4 w-4" />
                      查看型錄
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d7c7b5] px-6 py-3 text-sm font-semibold text-[#2e2a26] transition-colors hover:bg-[#f3ebdf]"
                  >
                    查看全部產品
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-[#ddd1c2] bg-white p-10 text-center shadow-[0_24px_60px_rgba(46,42,38,0.08)]">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#8b7a67]">Stock Filter</p>
              <h2 className="mb-3 text-3xl font-bold text-[#2e2a26]">
                {hasSeriesStock ? `目前「${activeSeriesLabel}」沒有現貨產品` : `「${activeSeriesLabel}」目前沒有現貨資料`}
              </h2>
              <p className="text-[#6f6254]">
                {hasSeriesStock ? '切換回全部系列商品即可繼續查看完整列表。' : '這個系列目前都不是現貨，或尚未建立現貨標記資料。'}
              </p>
            </div>
          )}
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? 'bg-[#2e2a26] text-white'
                    : 'border border-[#d7c7b5] bg-white text-[#6f6254] hover:border-[#8b7a67] hover:text-[#2e2a26]'
                }`}
              >
                {seriesNameMap[filter] ?? filter}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowInStockOnly((current) => !current)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                showInStockOnly
                  ? 'bg-[#2e2a26] text-white shadow-[0_12px_24px_rgba(46,42,38,0.16)]'
                  : 'border border-[#d7c7b5] bg-white text-[#6f6254] hover:border-[#8b7a67] hover:text-[#2e2a26]'
              }`}
            >
              <Clock3 className="h-4 w-4" />
              只看現貨
            </button>
          </div>

          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b7a67]">Product Grid</p>
            <h2 className="mb-3 text-3xl font-bold text-[#2e2a26] lg:text-4xl">{productGridTitle}</h2>
            <p className="max-w-3xl leading-relaxed text-[#6f6254]">
              點選下方卡片會自動切換上方展示區並捲回頁面頂部，方便快速查看不同系列與產品色號。
            </p>
          </div>

          {filteredProducts.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ImageActionCard
                  key={product.code}
                  imageSrc={product.images[0]}
                  alt={product.code}
                  selected={selectedProduct?.code === product.code}
                  aspectClass="aspect-[5/4]"
                  imageBackgroundClass="bg-[#f0e8dc]"
                  imageBorderClass="border-[#e8ddd0]"
                  onClick={() => {
                    setSelectedProductCode(product.code);
                    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#ddd1c2] bg-white p-8 text-center text-[#6f6254] shadow-[0_18px_40px_rgba(46,42,38,0.06)]">
              {hasSeriesStock ? `目前沒有符合「只看現貨」條件的${activeSeriesLabel}產品。` : `${activeSeriesLabel}目前沒有現貨可篩選。`}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}








