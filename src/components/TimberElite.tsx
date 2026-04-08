import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Download, FileText, Layers3, Package, Ruler } from 'lucide-react';
import ProductImageGallery from './ProductImageGallery';
import ImageActionCard from './ImageActionCard';
import { timberCatalogs } from '../data/catalogs';
import { grilleProducts } from '../data/grilleProducts';

export default function TimberElite({ onNavigate }: { onNavigate: (view: string) => void }) {
  const filters = useMemo(() => ['全部', ...Array.from(new Set(grilleProducts.map((product) => product.series)))], []);
  const [activeFilter, setActiveFilter] = useState('全部');
  const filteredProducts =
    activeFilter === '全部' ? grilleProducts : grilleProducts.filter((product) => product.series === activeFilter);

  const [selectedProductCode, setSelectedProductCode] = useState(filteredProducts[0].code);
  const selectedProduct =
    filteredProducts.find((product) => product.code === selectedProductCode) ?? filteredProducts[0] ?? grilleProducts[0];
  const [activeImage, setActiveImage] = useState(selectedProduct.images[0]);

  useEffect(() => {
    if (!filteredProducts.some((product) => product.code === selectedProductCode)) {
      setSelectedProductCode(filteredProducts[0].code);
    }
  }, [filteredProducts, selectedProductCode]);

  useEffect(() => {
    setActiveImage(selectedProduct.images[0]);
  }, [selectedProduct]);

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
              格柵系列
            </a>
            {timberCatalogs[0] ? (
              <a href={timberCatalogs[0].url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#2d241e]">
                線上型錄
              </a>
            ) : null}
          </nav>

          {timberCatalogs[0] ? (
            <a
              href={timberCatalogs[0].url}
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
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <ProductImageGallery
              images={selectedProduct.images}
              activeImage={activeImage}
              onSelect={setActiveImage}
              altBase={selectedProduct.code}
              aspectClass="aspect-[4/3]"
              thumbAspectClass="aspect-[16/10]"
            />

            <div className="rounded-[32px] border border-[#ddd4c7] bg-white p-8 shadow-[0_24px_60px_rgba(45,36,30,0.08)] lg:p-10">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">GRILLE COLLECTION</p>
              <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#2d241e] lg:text-5xl">{selectedProduct.code}</h1>
              <p className="mb-2 text-xl text-[#6d5c4d]">{selectedProduct.finish}</p>
              <p className="mb-6 text-base text-[#8b745c]">{selectedProduct.series}</p>

              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                    <Layers3 className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">覆蓋尺寸</span>
                  </div>
                  <p className="font-bold text-[#2d241e]">{selectedProduct.coverSize}</p>
                </div>
                <div className="rounded-2xl border border-[#e5dccf] bg-[#fbf8f4] p-4">
                  <div className="mb-2 flex items-center gap-2 text-[#8b745c]">
                    <Ruler className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">產品尺寸</span>
                  </div>
                  <p className="font-bold text-[#2d241e]">{selectedProduct.productSize}</p>
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
                <p className="mb-1 text-3xl font-bold text-[#2d241e]">{selectedProduct.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#6d5c4d]">
                  適用於商業空間、天花與牆面立體造型，提供清晰線條與層次感。
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {timberCatalogs[0] ? (
                  <a
                    href={timberCatalogs[0].url}
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
                    ? 'bg-[#2d241e] text-white'
                    : 'border border-[#d1c3b2] bg-white text-[#6d5c4d] hover:border-[#8b745c] hover:text-[#2d241e]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">Product Grid</p>
            <h2 className="mb-3 text-3xl font-bold text-[#2d241e] lg:text-4xl">格柵產品系列</h2>
            <p className="max-w-3xl leading-relaxed text-[#6d5c4d]">
              點選下方產品卡片會切換上方展示圖與產品資料，並自動回到頁面上方方便查看。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ImageActionCard
                key={product.code}
                imageSrc={product.images[0]}
                alt={product.code}
                selected={selectedProduct.code === product.code}
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
        </section>
      </main>
    </div>
  );
}








