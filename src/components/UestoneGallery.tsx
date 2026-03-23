import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Download, FileText, Layers3, Package, Palette, Ruler } from 'lucide-react';
import { youyishiCatalog } from '../data/catalogs';
import { uestoneProducts } from '../data/uestoneProducts';

const seriesOptions = ['全部', 'SD', 'SAD'] as const;

const uestoneMeta = {
  'SD-1000': { textureName: '維多利亞白', baseType: '石皮' },
  'SD-2489': { textureName: '黃金麻', baseType: '石皮' },
  'SD-3901': { textureName: '淺灰', baseType: '石皮' },
  'SD-4900': { textureName: '羅馬黑', baseType: '石皮' },
  'SAD-2489': { textureName: '黃金麻', baseType: '萬黃石' },
  'SAD-3489': { textureName: '灰麻', baseType: '萬黃石' },
  'SAD-4900': { textureName: '羅馬黑', baseType: '萬黃石' },
} satisfies Record<string, { textureName: string; baseType: string }>;

export default function UestoneGallery({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [selectedSeries, setSelectedSeries] = useState<(typeof seriesOptions)[number]>('全部');
  const [selectedProductCode, setSelectedProductCode] = useState(uestoneProducts[0].code);

  const filteredProducts = useMemo(
    () =>
      selectedSeries === '全部'
        ? uestoneProducts
        : uestoneProducts.filter((product) => product.series === selectedSeries),
    [selectedSeries],
  );

  const selectedProduct =
    uestoneProducts.find((product) => product.code === selectedProductCode) ?? uestoneProducts[0];
  const [activeImage, setActiveImage] = useState(selectedProduct.images[0]);

  useEffect(() => {
    setActiveImage(selectedProduct.images[0]);
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-[#f6f1ea] text-[#2e2a26]">
      <header className="sticky top-0 z-50 border-b border-[#ddd1c2] bg-[#f6f1ea]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="flex items-center gap-3" onClick={() => onNavigate('lux')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2e2a26] font-bold text-white">U</div>
            <div className="text-left">
              <p className="text-lg font-bold tracking-[0.16em] text-[#2e2a26]">UESTONE</p>
              <p className="hidden text-[11px] uppercase tracking-[0.32em] text-[#8b7a67] sm:block">Surface Gallery</p>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#6b5a49] md:flex">
            <a href="#featured" className="transition-colors hover:text-[#2e2a26]">
              精選展示
            </a>
            <a href="#products" className="transition-colors hover:text-[#2e2a26]">
              產品列表
            </a>
            <a href={youyishiCatalog.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#2e2a26]">
              型錄下載
            </a>
          </nav>

          <a
            href={youyishiCatalog.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2e2a26] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#7e6e5d]"
          >
            <Download className="h-4 w-4" />
            開啟型錄
          </a>
        </div>
      </header>

      <main>
        <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[32px] border border-[#ddd1c2] bg-white shadow-[0_24px_60px_rgba(46,42,38,0.08)]">
                <img src={activeImage} alt={selectedProduct.code} className="aspect-[16/10] w-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`overflow-hidden rounded-2xl border transition ${
                      activeImage === image
                        ? 'border-[#2e2a26] shadow-[0_10px_24px_rgba(46,42,38,0.12)]'
                        : 'border-[#ddd1c2] hover:border-[#7e6e5d]'
                    }`}
                    aria-label={`查看 ${selectedProduct.code} 第 ${index + 1} 張圖片`}
                  >
                    <img src={image} alt={`${selectedProduct.code} ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#ddd1c2] bg-white p-8 shadow-[0_24px_60px_rgba(46,42,38,0.08)] lg:p-10">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-[#8b7a67]">Uestone Surface</p>
              <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#2e2a26] lg:text-5xl">{selectedProduct.code}</h1>
              <p className="mb-6 text-xl text-[#6b5a49]">{uestoneMeta[selectedProduct.code]?.textureName ?? selectedProduct.code}</p>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e6dccf] bg-[#fbf8f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#8b7a67]">
                    <Layers3 className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">系列</span>
                  </div>
                  <p className="font-bold text-[#2e2a26]">{selectedProduct.series}</p>
                </div>
                <div className="rounded-2xl border border-[#e6dccf] bg-[#fbf8f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#8b7a67]">
                    <Palette className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">材質</span>
                  </div>
                  <p className="font-bold text-[#2e2a26]">{uestoneMeta[selectedProduct.code]?.baseType ?? '-'}</p>
                </div>
                <div className="rounded-2xl border border-[#e6dccf] bg-[#fbf8f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#8b7a67]">
                    <Ruler className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">尺寸</span>
                  </div>
                  <p className="font-bold text-[#2e2a26]">{selectedProduct.size}</p>
                </div>
                <div className="rounded-2xl border border-[#e6dccf] bg-[#fbf8f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#8b7a67]">
                    <Package className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">厚度 / 包裝</span>
                  </div>
                  <p className="font-bold text-[#2e2a26]">{selectedProduct.thickness}</p>
                  <p className="mt-1 text-sm text-[#6b5a49]">{selectedProduct.packing}</p>
                </div>
              </div>

              <div className="mb-8 rounded-3xl border border-[#e1d3c0] bg-[#f1e8dc] p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7a67]">Company Price</p>
                <p className="mb-1 text-3xl font-bold text-[#2e2a26]">{selectedProduct.price}</p>
                <p className="text-sm leading-relaxed text-[#6b5a49]">適合選樣、提案與現場搭配時快速確認規格與價格。</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={youyishiCatalog.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2e2a26] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7e6e5d]"
                >
                  <FileText className="h-4 w-4" />
                  查看型錄
                </a>
                <button
                  type="button"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d1c3b2] px-6 py-3 text-sm font-semibold text-[#2e2a26] transition-colors hover:bg-[#f1e8dc]"
                >
                  查看產品
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b7a67]">Product Grid</p>
              <h2 className="mb-3 text-3xl font-bold text-[#2e2a26] lg:text-4xl">優易石系列選樣</h2>
              <p className="max-w-3xl leading-relaxed text-[#6b5a49]">
                可依系列瀏覽 SD 與 SAD 花色，並查看尺寸、厚度、裝箱數與單片價格。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {seriesOptions.map((series) => (
                <button
                  key={series}
                  type="button"
                  onClick={() => setSelectedSeries(series)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    selectedSeries === series
                      ? 'bg-[#2e2a26] text-white'
                      : 'border border-[#d1c3b2] text-[#6b5a49] hover:bg-white'
                  }`}
                >
                  {series}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.code}
                className={`group overflow-hidden rounded-[28px] border bg-white shadow-[0_20px_40px_rgba(46,42,38,0.06)] transition-all ${
                  selectedProduct.code === product.code
                    ? 'border-[#2e2a26] ring-1 ring-[#2e2a26]'
                    : 'border-[#ddd1c2] hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(46,42,38,0.12)]'
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
                  <div className="aspect-[16/10] overflow-hidden bg-[#f1e8dc]">
                    <img
                      src={product.images[0]}
                      alt={product.code}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b7a67]">
                          {product.series} Series
                        </p>
                        <h3 className="text-2xl font-bold text-[#2e2a26]">{product.code}</h3>
                        <p className="mt-1 text-[#6b5a49]">{uestoneMeta[product.code]?.textureName ?? product.code}</p>
                      </div>
                      <span className="rounded-full bg-[#f1e8dc] px-3 py-1 text-sm font-bold text-[#2e2a26]">
                        {product.price}
                      </span>
                    </div>

                    <div className="mb-5 grid grid-cols-2 gap-3 text-sm text-[#6b5a49]">
                      <div className="rounded-2xl border border-[#e6dccf] bg-[#fbf8f4] p-3">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#8b7a67]">尺寸</p>
                        <p className="font-semibold text-[#2e2a26]">{product.size}</p>
                      </div>
                      <div className="rounded-2xl border border-[#e6dccf] bg-[#fbf8f4] p-3">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#8b7a67]">厚度</p>
                        <p className="font-semibold text-[#2e2a26]">{product.thickness}</p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#2e2a26] transition-colors hover:text-[#7e6e5d]">
                      查看詳情
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
