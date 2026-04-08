import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Clock3, Download, FileText, Layers3, Package, PackageCheck, Ruler } from 'lucide-react';
import ProductImageGallery from './ProductImageGallery';
import ImageActionCard from './ImageActionCard';
import { carbonCrystalAccessories, carbonCrystalProducts } from '../data/carbonCrystalProducts';
import { crystalCatalog } from '../data/catalogs';

const isAvailableNow = (status?: string) => status === '現貨' || status === '少量現貨';

const seriesLabels: Record<string, string> = {
  all: '全部',
  wood: '木紋',
  fabric: '布紋',
  metal: '金屬',
  marble: '大理石',
  cave: '洞石',
  relief: '浮雕',
  skin: '膚感',
};

export default function CrystalTech({ onNavigate }: { onNavigate: (view: string) => void }) {
  const filters = useMemo(() => ['all', 'wood', 'fabric', 'metal', 'marble', 'cave', 'relief', 'skin'], []);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const baseFilteredProducts =
    activeFilter === 'all'
      ? carbonCrystalProducts
      : carbonCrystalProducts.filter((product) => product.series === activeFilter);
  const filteredProducts = showInStockOnly ? baseFilteredProducts.filter((product) => isAvailableNow(product.stockStatus)) : baseFilteredProducts;
  const hasStockInScope = baseFilteredProducts.some((product) => isAvailableNow(product.stockStatus));

  const [selectedProductCode, setSelectedProductCode] = useState(carbonCrystalProducts[0]?.code ?? '');
  const selectedProduct = filteredProducts.find((product) => product.code === selectedProductCode) ?? filteredProducts[0] ?? null;
  const currentImages = selectedProduct?.image ? [selectedProduct.image] : [];
  const [activeImage, setActiveImage] = useState(currentImages[0] ?? '');

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
    setActiveImage(currentImages[0] ?? '');
  }, [selectedProduct?.code, currentImages]);

  const scopeLabel = seriesLabels[activeFilter] ?? '碳晶板';
  const stockStatus = selectedProduct?.stockStatus ?? '請洽詢';
  const isInStock = stockStatus === '現貨';
  const StockIcon = isInStock ? PackageCheck : Clock3;
  const stockTone = isInStock
    ? 'border-[#88a790] bg-[linear-gradient(135deg,#5d7d66,#7ea085)] text-white shadow-[0_16px_32px_rgba(93,125,102,0.24)]'
    : 'border-[#c9a372] bg-[linear-gradient(135deg,#b88c58,#d4ae79)] text-white shadow-[0_16px_32px_rgba(184,140,88,0.24)]';
  const stockDotTone = isInStock ? 'bg-[#dff7e5]' : 'bg-[#fff2dc]';

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#2d241e]">
      <header className="sticky top-0 z-50 border-b border-[#ddd4c7] bg-[#f5f2ec]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="flex items-center" onClick={() => onNavigate('lux')}>
            <img src="/logo/BG_logo.png" alt="Beauty Green" className="h-12 w-auto object-contain sm:h-14" />
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#6d5c4d] md:flex">
            <a href="#featured" className="transition-colors hover:text-[#2d241e]">
              產品展示
            </a>
            <a href="#products" className="transition-colors hover:text-[#2d241e]">
              碳晶板系列
            </a>
            {crystalCatalog ? (
              <a href={crystalCatalog.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#2d241e]">
                線上型錄
              </a>
            ) : null}
          </nav>

          {crystalCatalog ? (
            <a
              href={crystalCatalog.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#2d241e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8b745c]"
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
                images={currentImages}
                activeImage={activeImage}
                onSelect={setActiveImage}
                altBase={selectedProduct.code}
                aspectClass="aspect-[16/10]"
                thumbAspectClass="aspect-[16/10]"
                placeholderText="尚未提供產品照片"
              />

              <div className="rounded-[32px] border border-[#ddd4c7] bg-white p-8 shadow-[0_24px_60px_rgba(45,36,30,0.08)] lg:p-10">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">CARBON CRYSTAL PANEL</p>

                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-bold tracking-tight text-[#2d241e] lg:text-5xl">{selectedProduct.code}</h1>
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

                <p className="mb-2 text-xl text-[#6d5c4d]">{selectedProduct.seriesLabel}</p>
                {selectedProduct.note ? <p className="mb-6 text-sm text-[#8b745c]">{selectedProduct.note}</p> : <div className="mb-6" />}

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                      <Layers3 className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">系列</span>
                    </div>
                    <p className="font-bold text-[#2d241e]">{selectedProduct.seriesLabel}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                      <Ruler className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">尺寸</span>
                    </div>
                    <p className="font-bold text-[#2d241e]">{selectedProduct.size}</p>
                  </div>
                  <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                      <ArrowRight className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">厚度</span>
                    </div>
                    <p className="font-bold text-[#2d241e]">{selectedProduct.thickness}</p>
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
                  <p className="mb-1 text-3xl font-bold text-[#2d241e]">{selectedProduct.marketPrice ?? '請洽詢'}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#6d5c4d]">
                    適合牆面、櫃體立面與展示空間使用，呈現俐落材質層次與現代空間質感。
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {crystalCatalog ? (
                    <a
                      href={crystalCatalog.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d241e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8b745c]"
                    >
                      <FileText className="h-4 w-4" />
                      查看型錄
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d1c3b2] px-6 py-3 text-sm font-semibold text-[#2d241e] transition-colors hover:bg-[#f0e8dc]"
                  >
                    查看全部產品
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-[#ddd4c7] bg-white p-10 text-center shadow-[0_24px_60px_rgba(45,36,30,0.08)]">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#8b745c]">Stock Filter</p>
              <h2 className="mb-3 text-3xl font-bold text-[#2d241e]">
                {hasStockInScope ? `目前「${scopeLabel}」沒有現貨碳晶板` : `「${scopeLabel}」目前沒有現貨資料`}
              </h2>
              <p className="text-[#6d5c4d]">
                {hasStockInScope ? '切換回全部產品後，就能繼續查看這個系列的完整內容。' : '這個系列目前都不是現貨，或尚未建立現貨標記資料。'}
              </p>
            </div>
          )}
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? 'bg-[#2d241e] text-white'
                    : 'border border-[#d1c3b2] bg-white text-[#6d5c4d] hover:border-[#8b745c] hover:text-[#2d241e]'
                }`}
              >
                {seriesLabels[filter]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowInStockOnly((current) => !current)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                showInStockOnly
                  ? 'bg-[#2d241e] text-white shadow-[0_12px_24px_rgba(45,36,30,0.16)]'
                  : 'border border-[#d1c3b2] bg-white text-[#6d5c4d] hover:border-[#8b745c] hover:text-[#2d241e]'
              }`}
            >
              <Clock3 className="h-4 w-4" />
              只看現貨
            </button>
          </div>

          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">Product Grid</p>
            <h2 className="mb-3 text-3xl font-bold text-[#2d241e] lg:text-4xl">碳晶板產品系列</h2>
            <p className="max-w-3xl leading-relaxed text-[#6d5c4d]">
              木紋、布紋、金屬、大理石、洞石、浮雕與膚感系列都可快速切換，點選型號後會自動回到上方展示區查看主圖、價格與供應狀態。
            </p>
          </div>

          {filteredProducts.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ImageActionCard
                  key={product.code}
                  imageSrc={product.image}
                  alt={product.code}
                  selected={selectedProduct?.code === product.code}
                  aspectClass="aspect-[5/4]"
                  imageBackgroundClass="bg-[#f0e8dc]"
                  imageBorderClass="border-[#e8ddd0]"
                  placeholderText="尚未提供照片"
                  onClick={() => {
                    setSelectedProductCode(product.code);
                    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#ddd4c7] bg-white p-8 text-center text-[#6d5c4d] shadow-[0_18px_40px_rgba(45,36,30,0.06)]">
              {hasStockInScope ? `目前沒有符合「只看現貨」條件的${scopeLabel}產品。` : `${scopeLabel}目前沒有現貨可篩選。`}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-[#ddd4c7] bg-white p-8 shadow-[0_24px_60px_rgba(45,36,30,0.08)] lg:p-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">Accessories</p>
            <h2 className="mb-6 text-3xl font-bold text-[#2d241e]">收邊配件</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {carbonCrystalAccessories.map((item) => (
                <div key={item.name} className="rounded-3xl border border-[#e5dccf] bg-[#fbf8f4] p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-[#2d241e]">{item.name}</h3>
                    <span className="rounded-full bg-[#f0e8dc] px-3 py-2 text-sm font-semibold text-[#8b745c]">{item.size}</span>
                  </div>
                  <div className="rounded-2xl border border-[#e1d2bd] bg-[#f0e8dc] p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b745c]">Price</p>
                    <p className="text-2xl font-bold text-[#2d241e]">{item.marketPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
