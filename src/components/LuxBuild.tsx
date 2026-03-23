import React from 'react';
import { ArrowRight, Download, FileText, Mail, Menu } from 'lucide-react';
import { catalogs } from '../data/catalogs';

type LuxBuildProps = {
  onNavigate: (view: string) => void;
};

const categories = [
  {
    title: '木地板',
    subtitle: 'SPC Wood Floor',
    img: '/products/woodfloor/M291/M291 (1).png',
    view: 'woodfloor',
  },
  {
    title: '碳晶板',
    subtitle: 'Carbon Crystal Board',
    img: '/products/TJB/wood/7005.png',
    view: 'crystal',
  },
  {
    title: '優易石',
    subtitle: 'Uestone',
    img: '/products/uestone/SD/1000/sd-1000(1).png',
    view: 'uestone',
  },
  {
    title: '格柵',
    subtitle: 'Grille',
    img: '/products/grille/SGAL-5084/116e1ade-c85a-4691-a490-80ea2b9fded5.png',
    view: 'timber',
  },
];

const catalogDisplay = {
  'wood-floor': {
    title: '美綠 SPC 木地板型錄',
    description: '收錄 SPC 木地板系列花色與規格，方便業主與設計端快速比對。',
  },
  grille: {
    title: '美綠 格柵型錄',
    description: '整理格柵系列款式與尺寸，適合牆面、天花與商空應用提案。',
  },
  youyishi: {
    title: '美綠 優易石型錄',
    description: '彙整優易石主要產品花色，方便選樣與整體搭配。',
  },
  'carbon-crystal-board': {
    title: '美綠 碳晶板型錄',
    description: '提供碳晶板系列花色與應用方向，方便快速查看完整資料。',
  },
} satisfies Record<string, { title: string; description: string }>;

export default function LuxBuild({ onNavigate }: LuxBuildProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="flex items-center text-2xl font-bold tracking-tighter text-brand-charcoal"
            onClick={() => onNavigate('lux')}
          >
            LUX<span className="text-brand-warm-wood">BUILD</span>
          </button>

          <nav className="hidden items-center space-x-8 md:flex">
            <button
              type="button"
              onClick={() => onNavigate('woodfloor')}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-warm-wood"
            >
              木地板
            </button>
            <button
              type="button"
              onClick={() => onNavigate('timber')}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-warm-wood"
            >
              格柵
            </button>
            <button
              type="button"
              onClick={() => onNavigate('crystal')}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-warm-wood"
            >
              碳晶板
            </button>
            <button
              type="button"
              onClick={() => onNavigate('uestone')}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-warm-wood"
            >
              優易石
            </button>
            <a
              href="#catalogs"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-warm-wood"
            >
              型錄下載
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-warm-wood"
            >
              聯絡我們
            </a>
          </nav>

          <a
            href="#catalogs"
            className="hidden rounded-sm bg-brand-charcoal px-6 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-warm-wood md:inline-flex"
          >
            查看型錄
          </a>

          <button type="button" className="text-gray-500 md:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main>
        <section className="relative h-[60vh] overflow-hidden bg-brand-charcoal">
          <img
            src="/products/woodfloor/M304/M304 (1).png"
            alt="美綠裝飾建材首頁主視覺"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-white">
              <span className="mb-6 inline-block bg-brand-warm-wood px-3 py-1 text-[10px] font-bold uppercase tracking-[0.35em]">
                Mei Lu Materials
              </span>
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
                美綠裝飾建材
                <span className="block text-brand-accent-gold">整合型材料展示平台</span>
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-gray-200">
                展示木地板、格柵、碳晶板與優易石系列，首頁可直接進入各產品頁並查看對應型錄。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-brand-soft-gray py-20" id="categories">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-brand-charcoal md:text-4xl">材料分類</h2>
              <div className="mx-auto mb-6 h-1 w-20 bg-brand-warm-wood" />
              <p className="mx-auto max-w-2xl text-gray-600">
                依照材料類型快速查看各系列產品資料與型錄內容。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <article
                  key={category.view}
                  className="group cursor-pointer overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => onNavigate(category.view)}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={category.img}
                      alt={category.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-warm-wood">
                      {category.subtitle}
                    </p>
                    <h3 className="mb-4 text-xl font-bold text-brand-charcoal">{category.title}</h3>
                    <div className="flex items-center text-xs font-bold uppercase tracking-[0.24em] text-brand-warm-wood group-hover:underline">
                      查看產品
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20" id="catalogs">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-warm-wood">
                  Catalog Library
                </p>
                <h2 className="mb-3 text-3xl font-bold text-brand-charcoal md:text-4xl">最新型錄專區</h2>
                <p className="max-w-2xl text-gray-600">
                  所有型錄都可直接線上開啟或下載，方便你在網站上快速查閱與分享給客戶。
                </p>
              </div>
              <a
                href={catalogs[0]?.url ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-brand-charcoal px-6 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-brand-charcoal hover:text-white"
              >
                立即開啟型錄
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {catalogs.map((catalog) => {
                const display = catalogDisplay[catalog.id] ?? {
                  title: catalog.title,
                  description: catalog.description,
                };

                return (
                  <article
                    key={catalog.id}
                    className="border border-gray-200 bg-brand-soft-gray/40 p-6 shadow-sm lg:p-8"
                  >
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-warm-wood">
                          {catalog.year}
                        </p>
                        <h3 className="mb-2 text-2xl font-bold text-brand-charcoal">{display.title}</h3>
                        <p className="leading-relaxed text-gray-600">{display.description}</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-charcoal">
                        <FileText className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a
                        href={catalog.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-brand-charcoal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-warm-wood"
                      >
                        <FileText className="h-4 w-4" />
                        線上開啟
                      </a>
                      <a
                        href={catalog.url}
                        download
                        className="inline-flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-white"
                      >
                        <Download className="h-4 w-4" />
                        下載 PDF
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-charcoal py-12 text-white" id="contact">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="text-center lg:text-left">
            <span className="mb-1 block text-2xl font-bold tracking-tighter text-white">
              LUX<span className="text-brand-warm-wood">BUILD</span>
            </span>
            <p className="text-xs text-gray-400">美綠裝飾建材展示網站</p>
          </div>

          <div className="flex flex-col items-center gap-4 text-sm text-gray-300 lg:items-end">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:contact@luxbuild.com" className="transition-colors hover:text-white">
                contact@luxbuild.com
              </a>
            </p>
            <p>© 2026 LuxBuild Materials Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
