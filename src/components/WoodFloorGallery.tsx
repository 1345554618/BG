import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock3, Download, FileText, Layers3, Package, Ruler } from 'lucide-react';
import ProductImageGallery from './ProductImageGallery';
import ImageActionCard from './ImageActionCard';
import { catalogs } from '../data/catalogs';
import { woodFloorProducts } from '../data/woodFloorProducts';

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

export default function WoodFloorGallery({ onNavigate }: { onNavigate: (view: string) => void }) {
  const woodFloorCatalog = catalogs.find((catalog) => catalog.id === 'wood-floor');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const filteredProducts = showInStockOnly ? woodFloorProducts.filter((product) => isAvailableNow(product.stockStatus)) : woodFloorProducts;
  const [selectedProductCode, setSelectedProductCode] = useState(woodFloorProducts[0].code);
  const selectedProduct = filteredProducts.find((product) => product.code === selectedProductCode) ?? filteredProducts[0] ?? null;
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

  const stockTone =
    'border-[#c9a372] bg-[linear-gradient(135deg,#b88c58,#d4ae79)] text-white shadow-[0_16px_32px_rgba(184,140,88,0.24)]';

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#2d241e]">
      <header className="sticky top-0 z-50 border-b border-[#ddd4c7] bg-[#f5f2ec]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="flex items-center" onClick={() => onNavigate('lux')}>
            <img src="/logo/BG_logo.png" alt="Beauty Green" className="h-12 w-auto object-contain sm:h-14" />
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#6d5c4d] md:flex">
            <a href="#featured" className="transition-colors hover:text-[#2d241e]">產品展示</a>
            <a href="#products" className="transition-colors hover:text-[#2d241e]">全部木地板</a>
            {woodFloorCatalog ? (
              <a href={woodFloorCatalog.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#2d241e]">線上型錄</a>
            ) : null}
          </nav>

          {woodFloorCatalog ? (
            <a href={woodFloorCatalog.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#2d241e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8b745c]">
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
                aspectClass="aspect-square"
                thumbAspectClass="aspect-[16/10]"
              />

              <div className="rounded-[32px] border border-[#ddd4c7] bg-white p-8 shadow-[0_24px_60px_rgba(45,36,30,0.08)] lg:p-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">SPC WOOD FLOOR</p>

                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-bold tracking-tight text-[#2d241e] lg:text-5xl">{selectedProduct.code}</h1>
                  <div className={`inline-flex items-center gap-3 rounded-2xl border px-4 py-2.5 ${stockTone}`}>
                    <span className="h-3 w-3 rounded-full bg-[#fff2dc] ring-4 ring-white/15" />
                    <div className="leading-tight">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75">供應狀態</p>
                      <p className="text-sm font-bold tracking-[0.08em]">{selectedProduct.stockStatus}</p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12">
                      <Clock3 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <p className="mb-2 text-xl text-[#6d5c4d]">SPC 木地板系列</p>

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                      <Layers3 className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">系列</span>
                    </div>
                    <p className="font-bold text-[#2d241e]">{selectedProduct.series}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                      <Ruler className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">尺寸</span>
                    </div>
                    <p className="font-bold text-[#2d241e]">{formatSpecSize(selectedProduct.size, selectedProduct.thickness)}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                      <ArrowRight className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">覆蓋面積</span>
                    </div>
                    <p className="font-bold text-[#2d241e]">{formatCoverageArea(selectedProduct.size)}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                      <Package className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">裝箱數</span>
                    </div>
                    <p className="font-bold text-[#2d241e]">{selectedProduct.packing}</p>
                  </div>
                </div>

                <div className="mb-8 rounded-3xl border border-[#e1d2bd] bg-[#f0e8dc] p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b745c]">Price</p>
                  <p className="mb-1 text-3xl font-bold text-[#2d241e]">{selectedProduct.marketPricePerBox}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#6d5c4d]">適合居家、商業空間與展示空間使用，兼顧美感與日常維護便利性。</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {woodFloorCatalog ? (
                    <a href={woodFloorCatalog.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d241e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8b745c]">
                      <FileText className="h-4 w-4" />
                      查看型錄
                    </a>
                  ) : null}
                  <button type="button" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d1c3b2] px-6 py-3 text-sm font-semibold text-[#2d241e] transition-colors hover:bg-[#f0e8dc]">
                    查看全部產品
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-[#ddd4c7] bg-white p-10 text-center shadow-[0_24px_60px_rgba(45,36,30,0.08)]">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#8b745c]">Stock Filter</p>
              <h2 className="mb-3 text-3xl font-bold text-[#2d241e]">目前沒有現貨木地板</h2>
              <p className="text-[#6d5c4d]">木地板目前皆為期貨商品，切換回全部產品即可查看完整列表。</p>
            </div>
          )}
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">Product Grid</p>
              <h2 className="mb-3 text-3xl font-bold text-[#2d241e] lg:text-4xl">SPC 木地板產品</h2>
              <p className="max-w-3xl leading-relaxed text-[#6d5c4d]">點選下方型號即可切換上方主圖與規格資訊，方便快速比對每一款木地板的尺寸與價格。</p>
            </div>
            <button
              type="button"
              onClick={() => setShowInStockOnly((current) => !current)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                showInStockOnly
                  ? 'bg-[#2d241e] text-white shadow-[0_12px_24px_rgba(45,36,30,0.16)]'
                  : 'border border-[#d1c3b2] bg-white text-[#6d5c4d] hover:border-[#8b745c] hover:text-[#2d241e]'
              }`}
            >
              <Clock3 className="h-4 w-4" />
              只看現貨
            </button>
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
            <div className="rounded-[28px] border border-[#ddd4c7] bg-white p-8 text-center text-[#6d5c4d] shadow-[0_18px_40px_rgba(45,36,30,0.06)]">
              目前沒有符合「只看現貨」條件的木地板產品。
            </div>
          )}
        </section>
      </main>
    </div>
  );
}






