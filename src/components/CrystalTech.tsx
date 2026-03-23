import React, { CSSProperties, useMemo, useState } from 'react';
import { ArrowRight, Download, FileText, Package, Palette, Ruler } from 'lucide-react';
import { crystalCatalog } from '../data/catalogs';
import {
  carbonCrystalAccessories,
  carbonCrystalProducts,
  type CarbonCrystalProduct,
} from '../data/carbonCrystalProducts';

const seriesOptions = [
  { id: 'all', label: '全部系列' },
  { id: 'wood', label: '木紋' },
  { id: 'fabric', label: '布紋' },
  { id: 'metal', label: '金屬' },
  { id: 'marble', label: '大理石' },
] as const;

const seriesLabelMap: Record<CarbonCrystalProduct['series'], string> = {
  wood: '木紋',
  fabric: '布紋',
  metal: '金屬',
  marble: '大理石',
};

const accessoryLabelMap = ['L 型收邊條', '工字條'] as const;

function getPreviewStyle(product: CarbonCrystalProduct): CSSProperties {
  switch (product.series) {
    case 'wood':
      return {
        backgroundImage:
          'linear-gradient(135deg, rgba(82,51,24,0.18), rgba(193,144,92,0.15)), repeating-linear-gradient(90deg, #6a4326 0, #6a4326 18px, #8a5a33 18px, #8a5a33 40px, #4d3019 40px, #4d3019 54px)',
      };
    case 'fabric':
      return {
        backgroundImage:
          'linear-gradient(135deg, rgba(90,90,90,0.12), rgba(215,206,191,0.3)), repeating-linear-gradient(0deg, #c8c2b8 0, #c8c2b8 8px, #d8d0c5 8px, #d8d0c5 16px), repeating-linear-gradient(90deg, rgba(126,117,102,0.25) 0, rgba(126,117,102,0.25) 2px, transparent 2px, transparent 18px)',
      };
    case 'metal':
      return {
        backgroundImage:
          product.code === '7109'
            ? 'linear-gradient(135deg, #4f5561 0%, #8e96a4 25%, #d8dde5 50%, #747d89 75%, #404751 100%)'
            : 'linear-gradient(135deg, #7b6647 0%, #c1ab88 22%, #f0e7d5 50%, #b19672 72%, #6c5a40 100%)',
      };
    case 'marble':
      return {
        backgroundImage:
          'linear-gradient(135deg, #f4f4f1, #ddd8cf), linear-gradient(115deg, transparent 0, transparent 36%, rgba(120,120,120,0.18) 36%, rgba(120,120,120,0.18) 38%, transparent 38%, transparent 52%, rgba(180,170,160,0.24) 52%, rgba(180,170,160,0.24) 54%, transparent 54%)',
      };
    default:
      return {
        backgroundImage: 'linear-gradient(135deg, #ece7df, #d8cdc0)',
      };
  }
}

function displayPrice(price: string | null) {
  return price ?? '洽詢';
}

function ProductVisual({ product, mode }: { product: CarbonCrystalProduct; mode: 'hero' | 'card' }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.code}
        className={`h-full w-full object-cover ${mode === 'card' ? 'transition-transform duration-500 group-hover:scale-105' : ''}`}
      />
    );
  }

  return (
    <div className="h-full w-full" style={getPreviewStyle(product)}>
      <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.45),transparent_38%)]" />
    </div>
  );
}

export default function CrystalTech({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [selectedSeries, setSelectedSeries] = useState<(typeof seriesOptions)[number]['id']>('all');
  const [selectedProductCode, setSelectedProductCode] = useState(carbonCrystalProducts[0].code);

  const filteredProducts = useMemo(
    () =>
      selectedSeries === 'all'
        ? carbonCrystalProducts
        : carbonCrystalProducts.filter((product) => product.series === selectedSeries),
    [selectedSeries],
  );

  const selectedProduct =
    carbonCrystalProducts.find((product) => product.code === selectedProductCode) ?? carbonCrystalProducts[0];

  return (
    <div className="uestone-tone min-h-screen bg-[#f4f5f7] text-[#20242c]">
      <header className="sticky top-0 z-50 border-b border-[#d8dde5] bg-[#f4f5f7]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="flex items-center gap-3" onClick={() => onNavigate('lux')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#20242c] font-bold text-white">C</div>
            <div className="text-left">
              <p className="text-lg font-bold tracking-[0.16em] text-[#20242c]">CRYSTAL BOARD</p>
              <p className="hidden text-[11px] uppercase tracking-[0.32em] text-[#7e8a9a] sm:block">Material Collection</p>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#586171] md:flex">
            <a href="#featured" className="transition-colors hover:text-[#20242c]">
              精選展示
            </a>
            <a href="#products" className="transition-colors hover:text-[#20242c]">
              產品列表
            </a>
            <a href="#accessories" className="transition-colors hover:text-[#20242c]">
              配件
            </a>
            <a href={crystalCatalog.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#20242c]">
              型錄下載
            </a>
          </nav>

          <a
            href={crystalCatalog.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#20242c] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#4c5666]"
          >
            <Download className="h-4 w-4" />
            開啟型錄
          </a>
        </div>
      </header>

      <main>
        <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-[#d8dde5] bg-white shadow-[0_24px_60px_rgba(32,36,44,0.08)]">
              <ProductVisual product={selectedProduct} mode="hero" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,16,24,0.55),transparent_45%)]" />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <div className="max-w-lg">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-white/75">
                    {seriesLabelMap[selectedProduct.series]}
                  </p>
                  <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)] lg:text-6xl">
                    {selectedProduct.code}
                  </h1>
                </div>
                <div className="mt-6 grid max-w-lg grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/88 p-4 backdrop-blur">
                    <p className="mb-1 text-[11px] uppercase tracking-[0.26em] text-[#7e8a9a]">尺寸</p>
                    <p className="font-bold text-[#20242c]">{selectedProduct.size}</p>
                  </div>
                  <div className="rounded-2xl bg-white/88 p-4 backdrop-blur">
                    <p className="mb-1 text-[11px] uppercase tracking-[0.26em] text-[#7e8a9a]">包裝</p>
                    <p className="font-bold text-[#20242c]">{selectedProduct.packing}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-[#d8dde5] bg-white p-8 shadow-[0_24px_60px_rgba(32,36,44,0.08)] lg:p-10">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-[#7e8a9a]">Price Sheet</p>
              <h2 className="mb-3 text-4xl font-bold tracking-tight text-[#20242c]">{selectedProduct.code}</h2>
              <p className="mb-6 text-xl text-[#586171]">{seriesLabelMap[selectedProduct.series]} 碳晶板</p>

              <div className="mb-6 rounded-3xl border border-[#d8dde5] bg-[#eef1f5] p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#7e8a9a]">Market Price</p>
                <p className="mb-1 text-3xl font-bold text-[#20242c]">{displayPrice(selectedProduct.marketPrice)}</p>
                <p className="text-sm text-[#6c7483]">提供市場價與各通路價格帶，方便快速掌握不同型號的選材預算。</p>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#7e8a9a]">
                    <Ruler className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">尺寸</span>
                  </div>
                  <p className="font-bold text-[#20242c]">{selectedProduct.size}</p>
                </div>
                <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#7e8a9a]">
                    <Package className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">包裝</span>
                  </div>
                  <p className="font-bold text-[#20242c]">{selectedProduct.packing}</p>
                </div>
                <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#7e8a9a]">
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">厚度</span>
                  </div>
                  <p className="font-bold text-[#20242c]">{selectedProduct.thickness}</p>
                </div>
                <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#7e8a9a]">
                    <Palette className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">系列</span>
                  </div>
                  <p className="font-bold text-[#20242c]">{seriesLabelMap[selectedProduct.series]}</p>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-4">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">設計師價</p>
                  <p className="font-bold text-[#20242c]">{displayPrice(selectedProduct.designerPrice)}</p>
                </div>
                <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-4">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">經銷價</p>
                  <p className="font-bold text-[#20242c]">{displayPrice(selectedProduct.distributorPrice)}</p>
                </div>
                <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-4">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">專業經銷價</p>
                  <p className="font-bold text-[#20242c]">{displayPrice(selectedProduct.professionalDealerPrice)}</p>
                </div>
                <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-4">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">型錄</p>
                  <a href={crystalCatalog.url} target="_blank" rel="noreferrer" className="font-bold text-[#20242c] transition-colors hover:text-[#586171]">
                    查看 PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#7e8a9a]">Product Grid</p>
              <h2 className="mb-3 text-3xl font-bold text-[#20242c] lg:text-4xl">碳晶板系列總覽</h2>
              <p className="max-w-3xl leading-relaxed text-[#586171]">
                依木紋、布紋、金屬與大理石系列分類瀏覽，快速查看尺寸、厚度與價格資訊。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {seriesOptions.map((series) => (
                <button
                  key={series.id}
                  type="button"
                  onClick={() => setSelectedSeries(series.id)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    selectedSeries === series.id
                      ? 'bg-[#20242c] text-white'
                      : 'border border-[#cfd5de] text-[#586171] hover:bg-white'
                  }`}
                >
                  {series.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.code}
                className={`group overflow-hidden rounded-[28px] border bg-white shadow-[0_20px_40px_rgba(32,36,44,0.06)] transition-all ${
                  selectedProduct.code === product.code
                    ? 'border-[#20242c] ring-1 ring-[#20242c]'
                    : 'border-[#d8dde5] hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(32,36,44,0.12)]'
                }`}
              >
                <button
                  type="button"
                  className="block w-full text-left"
                  onClick={() => {
                    setSelectedProductCode(product.code);
                    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#eef1f5]">
                    <ProductVisual product={product} mode="card" />
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7e8a9a]">
                          {seriesLabelMap[product.series]}
                        </p>
                        <h3 className="text-2xl font-bold text-[#20242c]">{product.code}</h3>
                      </div>
                      <span className="rounded-full bg-[#eef1f5] px-3 py-1 text-sm font-bold text-[#20242c]">
                        {displayPrice(product.marketPrice)}
                      </span>
                    </div>

                    <div className="mb-5 grid grid-cols-2 gap-3 text-sm text-[#586171]">
                      <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-3">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">尺寸</p>
                        <p className="font-semibold text-[#20242c]">{product.size}</p>
                      </div>
                      <div className="rounded-2xl border border-[#e1e5eb] bg-[#fafbfd] p-3">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">包裝</p>
                        <p className="font-semibold text-[#20242c]">{product.packing}</p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#20242c] transition-colors hover:text-[#586171]">
                      查看詳情
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="accessories" className="mx-auto max-w-7xl px-4 py-12 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-[#d8dde5] bg-white p-8 shadow-[0_20px_40px_rgba(32,36,44,0.06)] lg:p-10">
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#7e8a9a]">Accessories</p>
                <h2 className="mb-3 text-3xl font-bold text-[#20242c]">碳晶板配件</h2>
                <p className="max-w-3xl text-[#586171]">配件價格可與板材一併參考，方便估算整體收邊與施工需求。</p>
              </div>
              <a
                href={crystalCatalog.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#cfd5de] px-5 py-3 text-sm font-semibold text-[#20242c] transition-colors hover:bg-[#eef1f5]"
              >
                <FileText className="h-4 w-4" />
                查看型錄
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {carbonCrystalAccessories.map((accessory, index) => (
                <article key={`${accessory.name}-${index}`} className="rounded-[24px] border border-[#e1e5eb] bg-[#fafbfd] p-6">
                  <h3 className="mb-2 text-2xl font-bold text-[#20242c]">{accessoryLabelMap[index] ?? accessory.name}</h3>
                  <p className="mb-5 text-sm text-[#586171]">尺寸：{accessory.size}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-[#e1e5eb] bg-white p-4">
                      <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">市場價</p>
                      <p className="font-bold text-[#20242c]">{accessory.marketPrice}</p>
                    </div>
                    <div className="rounded-2xl border border-[#e1e5eb] bg-white p-4">
                      <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">設計師價</p>
                      <p className="font-bold text-[#20242c]">{accessory.designerPrice}</p>
                    </div>
                    <div className="rounded-2xl border border-[#e1e5eb] bg-white p-4">
                      <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">經銷價</p>
                      <p className="font-bold text-[#20242c]">{accessory.distributorPrice}</p>
                    </div>
                    <div className="rounded-2xl border border-[#e1e5eb] bg-white p-4">
                      <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#7e8a9a]">專業經銷價</p>
                      <p className="font-bold text-[#20242c]">{accessory.professionalDealerPrice}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d8dde5] bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="mb-2 text-lg font-bold tracking-[0.16em] text-[#20242c]">CRYSTAL BOARD</p>
            <p className="text-sm text-[#586171]">碳晶板產品與價格資訊展示頁</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#586171]">
            <a href={crystalCatalog.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#20242c]">
              碳晶板型錄
            </a>
            <button type="button" onClick={() => onNavigate('timber')} className="transition-colors hover:text-[#20242c]">
              格柵系列
            </button>
            <button type="button" onClick={() => onNavigate('lux')} className="transition-colors hover:text-[#20242c]">
              回到首頁
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
