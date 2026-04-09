import React from 'react';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { catalogs } from '../data/catalogs';

const materialCards = [
  {
    id: 'woodfloor',
    title: '木地板',
    subtitle: 'SPC 系列',
    description: '整理 SPC 木地板型號、實拍照片與價格資訊，方便快速挑選。',
    image: '/products/woodfloor/M291/M291 (1).png',
  },
  {
    id: 'timber',
    title: '格柵',
    subtitle: '牆面與天花應用',
    description: '收錄 149 與 170 系列格柵產品，適合展示空間與商業空間設計。',
    image: '/products/grille cat.png',
  },
  {
    id: 'crystal',
    title: '碳晶板',
    subtitle: '多種材質風格',
    description: '提供木紋、布紋、金屬與大理石系列，適合現代室內設計應用。',
    image: '/products/TJB/wood/7005.png',
  },
  {
    id: 'uestone',
    title: '優易石',
    subtitle: '柔和米白石紋',
    description: '整合 SD 與 SAD 系列花色與產品照片，呈現溫潤石材質感。',
    image: '/products/sd-4900 (cat用).jpg',
  },
] as const;

export default function LuxBuild({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="min-h-screen bg-[#f7f3ed] text-[#2d241e]">
      <header className="sticky top-0 z-50 border-b border-[#e2d8cb] bg-[#f7f3ed]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="flex items-center" onClick={() => onNavigate('lux')}>
            <img src="/logo/BG_logo.png" alt="Beauty Green" className="h-14 w-auto object-contain sm:h-16" />
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#6d5c4d] md:flex">
            <a href="#materials" className="transition-colors hover:text-[#2d241e]">
              材料分類
            </a>
            <a href="#catalogs" className="transition-colors hover:text-[#2d241e]">
              最新型錄
            </a>
          </nav>

          <a
            href="#materials"
            className="inline-flex items-center gap-2 rounded-full bg-[#2d241e] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8b745c]"
          >
            進入選材
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">BEAUTY GREEN MATERIALS</p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-[#2d241e] sm:text-5xl lg:text-6xl">
              美綠裝飾建材
              <br />
              線上產品展示
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[#6d5c4d] sm:text-lg">
              將型錄、價格與產品照片整合成易於瀏覽的展示網站，讓客戶能更直覺地查看木地板、格柵、碳晶板與優易石系列。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#materials"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d241e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8b745c]"
              >
                查看材料分類
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#catalogs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d1c3b2] px-6 py-3 text-sm font-semibold text-[#2d241e] transition-colors hover:bg-[#efe6da]"
              >
                查看型錄
              </a>
            </div>
          </div>
        </section>

        <section id="materials" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">Material Categories</p>
            <h2 className="mb-3 text-3xl font-bold text-[#2d241e] lg:text-4xl">材料分類</h2>
            <p className="max-w-3xl leading-relaxed text-[#6d5c4d]">
              依照實際應用需求整理四大系列，從產品圖片、規格到型錄入口都能在同一頁面快速找到。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {materialCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => onNavigate(card.id)}
                className="overflow-hidden rounded-[24px] border border-[#e2d8cb] bg-white text-left shadow-[0_16px_36px_rgba(45,36,30,0.07)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(45,36,30,0.11)]"
              >
                <div className="aspect-[1/1] overflow-hidden bg-[#efe6da]">
                  <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b745c]">{card.subtitle}</p>
                  <h3 className="mb-2 text-lg font-bold text-[#2d241e]">{card.title}</h3>
                  <p className="mb-4 text-xs leading-6 text-[#6d5c4d]">{card.description}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2d241e] transition-colors hover:text-[#8b745c]">
                    進入頁面
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="catalogs" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.36em] text-[#8b745c]">Latest Catalogs</p>
            <h2 className="mb-3 text-3xl font-bold text-[#2d241e] lg:text-4xl">最新型錄</h2>
            <p className="max-w-3xl leading-relaxed text-[#6d5c4d]">
              目前網站已整合四本主要型錄，可直接開啟查看或下載提供給客戶參考。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {catalogs.map((catalog) => (
              <a
                key={catalog.id}
                href={catalog.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[28px] border border-[#e2d8cb] bg-white p-6 shadow-[0_20px_50px_rgba(45,36,30,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(45,36,30,0.12)]"
              >
                <div className="mb-5 inline-flex rounded-full bg-[#efe6da] p-3 text-[#8b745c]">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#2d241e]">{catalog.title}</h3>
                <p className="mb-4 text-xs leading-6 text-[#6d5c4d]">{catalog.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d241e] transition-colors group-hover:text-[#8b745c]">
                  開啟型錄
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}












