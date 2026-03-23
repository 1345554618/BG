import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, FileText, Layers3, Package, Ruler } from 'lucide-react';
import { catalogs } from '../data/catalogs';
import { woodFloorProducts } from '../data/woodFloorProducts';

export default function WoodFloorGallery({ onNavigate }: { onNavigate: (view: string) => void }) {
  const woodFloorCatalog = catalogs.find((catalog) => catalog.id === 'wood-floor')!;
  const [selectedProductCode, setSelectedProductCode] = useState(woodFloorProducts[0].code);
  const selectedProduct =
    woodFloorProducts.find((product) => product.code === selectedProductCode) ?? woodFloorProducts[0];
  const [activeImage, setActiveImage] = useState(selectedProduct.images[0]);

  useEffect(() => {
    setActiveImage(selectedProduct.images[0]);
  }, [selectedProduct]);

  return (
    <div className="uestone-tone min-h-screen bg-[#f5f2ec] text-[#2d241e]">
      <header className="sticky top-0 z-50 border-b border-[#ddd4c7] bg-[#f5f2ec]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="flex items-center gap-3" onClick={() => onNavigate('lux')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2d241e] font-bold text-white">W</div>
            <div className="text-left">
              <p className="text-lg font-bold tracking-[0.16em] text-[#2d241e]">WOOD FLOOR</p>
              <p className="hidden text-[11px] uppercase tracking-[0.32em] text-[#8b745c] sm:block">SPC Collection</p>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#6d5c4d] md:flex">
            <a href="#featured" className="transition-colors hover:text-[#2d241e]">
              精選展示
            </a>
            <a href="#products" className="transition-colors hover:text-[#2d241e]">
              產品列表
            </a>
            <a href={woodFloorCatalog.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#2d241e]">
              型錄下載
            </a>
          </nav>

          <a
            href={woodFloorCatalog.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2d241e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8b745c]"
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
              <div className="overflow-hidden rounded-[32px] border border-[#ddd4c7] bg-white shadow-[0_24px_60px_rgba(45,36,30,0.08)]">
                <img src={activeImage} alt={selectedProduct.code} className="aspect-square w-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`overflow-hidden rounded-2xl border transition ${
                      activeImage === image
                        ? 'border-[#2d241e] shadow-[0_10px_24px_rgba(45,36,30,0.12)]'
                        : 'border-[#ddd4c7] hover:border-[#8b745c]'
                    }`}
                    aria-label={`查看 ${selectedProduct.code} 第 ${index + 1} 張圖片`}
                  >
                    <img src={image} alt={`${selectedProduct.code} ${index + 1}`} className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#ddd4c7] bg-white p-8 shadow-[0_24px_60px_rgba(45,36,30,0.08)] lg:p-10">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">SPC Wood Floor</p>
              <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#2d241e] lg:text-5xl">{selectedProduct.code}</h1>
              <p className="mb-6 text-xl text-[#6d5c4d]">SPC 木地板</p>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                    <Layers3 className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">系列</span>
                  </div>
                  <p className="font-bold text-[#2d241e]">SPC 木地板</p>
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

              <div className="mb-8 rounded-3xl border border-[#e1d2bd] bg-[#f0e8dc] p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b745c]">Company Price</p>
                <p className="mb-1 text-3xl font-bold text-[#2d241e]">{selectedProduct.marketPricePerBox}</p>
                <p className="text-lg font-semibold text-[#6d5c4d]">{selectedProduct.designerPricePerBox}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#6d5c4d]">適合提案、選樣與比較不同木地板規格時快速參考。</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={woodFloorCatalog.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d241e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8b745c]"
                >
                  <FileText className="h-4 w-4" />
                  查看型錄
                </a>
                <button
                  type="button"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d1c3b2] px-6 py-3 text-sm font-semibold text-[#2d241e] transition-colors hover:bg-[#f0e8dc]"
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
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">Product Grid</p>
              <h2 className="mb-3 text-3xl font-bold text-[#2d241e] lg:text-4xl">SPC 木地板產品一覽</h2>
              <p className="max-w-3xl leading-relaxed text-[#6d5c4d]">
                查看各型號的規格、厚度、裝箱數與價格資訊，方便快速比對不同花色與條件。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {woodFloorProducts.map((product) => (
              <article
                key={product.code}
                className={`group overflow-hidden rounded-[28px] border bg-white shadow-[0_20px_40px_rgba(45,36,30,0.06)] transition-all ${
                  selectedProduct.code === product.code
                    ? 'border-[#2d241e] ring-1 ring-[#2d241e]'
                    : 'border-[#ddd4c7] hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(45,36,30,0.12)]'
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
                  <div className="aspect-square overflow-hidden bg-[#f0e8dc]">
                    <img
                      src={product.images[0]}
                      alt={product.code}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b745c]">SPC Wood Floor</p>
                        <h3 className="text-2xl font-bold text-[#2d241e]">{product.code}</h3>
                      </div>
                    </div>

                    <div className="mb-5 grid grid-cols-1 gap-3 text-sm text-[#6d5c4d]">
                      <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-3">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#8b745c]">尺寸 / 厚度</p>
                        <p className="font-semibold text-[#2d241e]">
                          {product.size} / {product.thickness}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-3">
                        <p className="mb-1 text-[11px] uppercase tracking-[0.24em] text-[#8b745c]">市場價 / 設計師價</p>
                        <p className="font-semibold text-[#2d241e]">{product.marketPricePerBox}</p>
                        <p>{product.designerPricePerBox}</p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d241e] transition-colors hover:text-[#8b745c]">
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
