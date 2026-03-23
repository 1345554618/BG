import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, FileText, Package, Palette, Ruler } from 'lucide-react';
import { timberCatalogs } from '../data/catalogs';
import { grilleProducts } from '../data/grilleProducts';

const seriesOptions = ['全部商品', '170 格柵系列', '149 格柵系列'] as const;

export default function TimberElite({ onNavigate }: { onNavigate: (view: string) => void }) {
  const grilleCatalog = timberCatalogs.find((catalog) => catalog.id === 'grille')!;
  const [selectedSeries, setSelectedSeries] = useState<(typeof seriesOptions)[number]>('全部商品');
  const [selectedProductCode, setSelectedProductCode] = useState(grilleProducts[0].code);
  const selectedProduct =
    grilleProducts.find((product) => product.code === selectedProductCode) ?? grilleProducts[0];
  const [activeImage, setActiveImage] = useState(selectedProduct.images[0]);

  useEffect(() => {
    setActiveImage(selectedProduct.images[0]);
  }, [selectedProduct]);

  const filteredProducts =
    selectedSeries === '全部商品'
      ? grilleProducts
      : grilleProducts.filter((product) => product.series === selectedSeries);

  const seriesSummary = [
    {
      name: '170 格柵系列',
      description: '以較厚的 2.2 cm 規格呈現更強烈的立體層次，適合形象牆與主視覺牆面。',
      price: '$680 / 條',
      coverSize: '260 x 16 cm',
    },
    {
      name: '149 格柵系列',
      description: '較纖細的 1.4 cm 規格，適合需要輕量感與細節節奏的空間牆面。',
      price: '$790 / 條',
      coverSize: '260 x 13.9 cm',
    },
  ];

  return (
    <div className="uestone-tone bg-[#f7f4ef] min-h-screen text-[#2f2923]">
      <header className="sticky top-0 z-50 border-b border-[#ddd4c7] bg-[#f7f4ef]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button className="flex items-center gap-3" onClick={() => onNavigate('lux')}>
            <span className="text-xl font-bold tracking-[0.18em] text-[#3a3128]">BG GRILLE</span>
            <span className="hidden sm:inline text-xs uppercase tracking-[0.32em] text-[#9a8269] border-l border-[#d8cab9] pl-3">
              Current Collection
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6b5b4a]">
            <a href="#featured" className="hover:text-[#2f2923] transition-colors">精選商品</a>
            <a href="#products" className="hover:text-[#2f2923] transition-colors">全部商品</a>
            <a href="#series" className="hover:text-[#2f2923] transition-colors">系列比較</a>
            <a href={grilleCatalog.url} target="_blank" rel="noreferrer" className="hover:text-[#2f2923] transition-colors">
              型錄下載
            </a>
          </nav>

          <a
            href={grilleCatalog.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#3a3128] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white uppercase hover:bg-[#9a8269] transition-colors"
          >
            <Download className="w-4 h-4" />
            開啟格柵型錄
          </a>
        </div>
      </header>

      <main>
        <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-[28px] border border-[#ddd4c7] bg-white shadow-[0_24px_60px_rgba(58,49,40,0.08)]">
                <img src={activeImage} alt={selectedProduct.code} className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(image)}
                    className={`overflow-hidden rounded-2xl border transition ${
                      activeImage === image
                        ? 'border-[#3a3128] shadow-[0_10px_24px_rgba(58,49,40,0.12)]'
                        : 'border-[#ddd4c7] hover:border-[#9a8269]'
                    }`}
                    aria-label={`切換 ${selectedProduct.code} 第 ${index + 1} 張商品圖`}
                  >
                    <img src={image} alt={`${selectedProduct.code} ${index + 1}`} className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#ddd4c7] bg-white p-8 lg:p-10 shadow-[0_24px_60px_rgba(58,49,40,0.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.36em] text-[#9a8269] mb-4">{selectedProduct.series}</p>
              <div className="flex flex-col gap-3 mb-6">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#2f2923]">{selectedProduct.code}</h1>
                <p className="text-xl text-[#6b5b4a]">{selectedProduct.finish}</p>
              </div>

              <div className="rounded-3xl bg-[#f3ede4] p-6 mb-6 border border-[#e4dacc]">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9a8269] mb-2">Company Price</p>
                <p className="text-3xl font-bold text-[#2f2923] mb-1">{selectedProduct.price}</p>
                <p className="text-sm text-[#7c6a58]">依 2026-03-18 公司價目表整理，實際成交可依專案另議。</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl border border-[#e4dacc] bg-[#fcfaf6] p-4">
                  <div className="flex items-center gap-2 text-[#9a8269] mb-2">
                    <Ruler className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">覆蓋尺寸</span>
                  </div>
                  <p className="font-bold text-[#2f2923]">{selectedProduct.coverSize}</p>
                </div>
                <div className="rounded-2xl border border-[#e4dacc] bg-[#fcfaf6] p-4">
                  <div className="flex items-center gap-2 text-[#9a8269] mb-2">
                    <Package className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">產品尺寸</span>
                  </div>
                  <p className="font-bold text-[#2f2923]">{selectedProduct.productSize}</p>
                </div>
                <div className="rounded-2xl border border-[#e4dacc] bg-[#fcfaf6] p-4">
                  <div className="flex items-center gap-2 text-[#9a8269] mb-2">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">厚度</span>
                  </div>
                  <p className="font-bold text-[#2f2923]">{selectedProduct.thickness}</p>
                </div>
                <div className="rounded-2xl border border-[#e4dacc] bg-[#fcfaf6] p-4">
                  <div className="flex items-center gap-2 text-[#9a8269] mb-2">
                    <Palette className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.24em]">包裝 / 飾面</span>
                  </div>
                  <p className="font-bold text-[#2f2923]">{selectedProduct.packing}</p>
                  <p className="text-sm text-[#7c6a58] mt-1">{selectedProduct.finish}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={grilleCatalog.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3a3128] px-6 py-3 text-sm font-semibold text-white hover:bg-[#9a8269] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  查看格柵型錄
                </a>
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cdbca7] px-6 py-3 text-sm font-semibold text-[#3a3128] hover:bg-[#f3ede4] transition-colors"
                >
                  瀏覽全部商品
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.36em] text-[#9a8269] mb-3">Product Grid</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2f2923] mb-3">目前有照片與價格的格柵商品</h2>
              <p className="max-w-3xl text-[#6b5b4a] leading-relaxed">
                已依照你的公司價目表與資料夾照片，把目前可上架的 6 個型號整理進網站。點選卡片後，上方會同步切換成該商品的大圖與規格。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {seriesOptions.map((series) => (
                <button
                  key={series}
                  onClick={() => setSelectedSeries(series)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    selectedSeries === series
                      ? 'bg-[#3a3128] text-white'
                      : 'border border-[#cdbca7] text-[#6b5b4a] hover:bg-[#f3ede4]'
                  }`}
                >
                  {series}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <article
                key={product.code}
                className={`group overflow-hidden rounded-[28px] border bg-white shadow-[0_20px_40px_rgba(58,49,40,0.06)] transition-all ${
                  selectedProduct.code === product.code
                    ? 'border-[#3a3128] ring-1 ring-[#3a3128]'
                    : 'border-[#ddd4c7] hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(58,49,40,0.12)]'
                }`}
              >
                <button
                  className="block w-full text-left"
                  onClick={() => {
                    setSelectedProductCode(product.code);
                    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#f3ede4]">
                    <img
                      src={product.images[0]}
                      alt={product.code}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9a8269] mb-2">{product.series}</p>
                        <h3 className="text-2xl font-bold text-[#2f2923]">{product.code}</h3>
                        <p className="text-[#6b5b4a] mt-1">{product.finish}</p>
                      </div>
                      <span className="rounded-full bg-[#f3ede4] px-3 py-1 text-sm font-bold text-[#3a3128]">{product.price}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-[#6b5b4a] mb-5">
                      <div className="rounded-2xl bg-[#fcfaf6] border border-[#eee2d5] p-3">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a8269] mb-1">覆蓋尺寸</p>
                        <p className="font-semibold text-[#2f2923]">{product.coverSize}</p>
                      </div>
                      <div className="rounded-2xl bg-[#fcfaf6] border border-[#eee2d5] p-3">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a8269] mb-1">厚度</p>
                        <p className="font-semibold text-[#2f2923]">{product.thickness}</p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3a3128] group-hover:text-[#9a8269] transition-colors">
                      切換到精選區查看
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="series" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seriesSummary.map((series) => (
              <article key={series.name} className="rounded-[28px] border border-[#ddd4c7] bg-white p-8 shadow-[0_20px_40px_rgba(58,49,40,0.06)]">
                <p className="text-xs font-bold uppercase tracking-[0.36em] text-[#9a8269] mb-3">Series Overview</p>
                <h3 className="text-2xl font-bold text-[#2f2923] mb-3">{series.name}</h3>
                <p className="text-[#6b5b4a] leading-relaxed mb-6">{series.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-[#fcfaf6] border border-[#eee2d5] p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a8269] mb-2">參考價格</p>
                    <p className="font-bold text-[#2f2923]">{series.price}</p>
                  </div>
                  <div className="rounded-2xl bg-[#fcfaf6] border border-[#eee2d5] p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#9a8269] mb-2">代表覆蓋尺寸</p>
                    <p className="font-bold text-[#2f2923]">{series.coverSize}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#ddd4c7] bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold tracking-[0.18em] text-[#3a3128] mb-2">BG GRILLE COLLECTION</p>
            <p className="text-sm text-[#6b5b4a]">本頁商品資料依目前格柵照片資料夾與公司價目表整理。</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#6b5b4a]">
            <a href={grilleCatalog.url} target="_blank" rel="noreferrer" className="hover:text-[#2f2923] transition-colors">格柵型錄</a>
            <button onClick={() => onNavigate('crystal')} className="hover:text-[#2f2923] transition-colors">碳晶板頁面</button>
            <button onClick={() => onNavigate('lux')} className="hover:text-[#2f2923] transition-colors">回到首頁</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
