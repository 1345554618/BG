import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProductImageGalleryProps = {
  images: string[];
  activeImage: string;
  onSelect: (image: string) => void;
  altBase: string;
  aspectClass: string;
  thumbAspectClass: string;
  placeholderText?: string;
};

export default function ProductImageGallery({
  images,
  activeImage,
  onSelect,
  altBase,
  aspectClass,
  thumbAspectClass,
  placeholderText = '尚未提供產品照片',
}: ProductImageGalleryProps) {
  const hasImages = images.length > 0;
  const currentIndex = images.findIndex((image) => image === activeImage);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const canNavigate = images.length > 1;

  const goToNextImage = () => {
    if (!canNavigate) return;
    const nextIndex = (safeIndex + 1) % images.length;
    onSelect(images[nextIndex]);
  };

  const goToPreviousImage = () => {
    if (!canNavigate) return;
    const previousIndex = (safeIndex - 1 + images.length) % images.length;
    onSelect(images[previousIndex]);
  };

  return (
    <div className="space-y-4">
      <div className="group relative overflow-hidden rounded-[32px] border border-[#ddd4c7] bg-white shadow-[0_24px_60px_rgba(45,36,30,0.08)]">
        {hasImages ? (
          <img src={images[safeIndex]} alt={altBase} className={`${aspectClass} w-full object-cover`} />
        ) : (
          <div className={`flex items-center justify-center bg-[#f0e8dc] text-sm text-[#8b745c] ${aspectClass}`}>
            {placeholderText}
          </div>
        )}

        {canNavigate ? (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#2d241e]/18 via-transparent to-[#2d241e]/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <button
              type="button"
              onClick={goToPreviousImage}
              aria-label={`查看 ${altBase} 上一張圖片`}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-[#2d241e] opacity-0 shadow-lg transition-all duration-300 hover:bg-white group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNextImage}
              aria-label={`查看 ${altBase} 下一張圖片`}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-[#2d241e] opacity-0 shadow-lg transition-all duration-300 hover:bg-white group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {canNavigate ? (
        <div className="mx-auto flex max-w-full flex-nowrap justify-center gap-2 overflow-x-auto px-1 pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => onSelect(image)}
              className={`w-[84px] shrink-0 overflow-hidden rounded-2xl border transition sm:w-[96px] ${
                image === images[safeIndex]
                  ? 'border-[#2d241e] shadow-[0_10px_24px_rgba(45,36,30,0.12)]'
                  : 'border-[#ddd4c7] hover:border-[#8b745c]'
              }`}
              aria-label={`查看 ${altBase} 第 ${index + 1} 張圖片`}
            >
              <img src={image} alt={`${altBase} ${index + 1}`} className={`${thumbAspectClass} w-full object-cover`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}



