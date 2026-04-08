import React from 'react';

type ImageActionCardProps = {
  key?: React.Key;
  imageSrc?: string;
  alt: string;
  onClick: () => void;
  selected?: boolean;
  aspectClass?: string;
  imageBackgroundClass?: string;
  imageBorderClass?: string;
  actionLabel?: string;
  placeholderText?: string;
  codeLabel?: string;
};

export default function ImageActionCard({
  imageSrc,
  alt,
  onClick,
  selected = false,
  aspectClass = 'aspect-[5/4]',
  imageBackgroundClass = 'bg-[#f0e8dc]',
  imageBorderClass = 'border-[#e8ddd0]',
  actionLabel = '瞭解詳細',
  placeholderText = '尚未提供照片',
  codeLabel,
}: ImageActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden rounded-[28px] border bg-white p-3 pb-[4.9rem] text-left shadow-[0_20px_40px_rgba(45,36,30,0.06)] transition-all active:scale-[0.985] ${
        selected
          ? 'border-[#2d241e] ring-1 ring-[#2d241e]'
          : 'border-[#ddd4c7] hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(45,36,30,0.12)]'
      }`}
    >
      <div className={`${aspectClass} overflow-hidden rounded-[22px] border ${imageBorderClass} ${imageBackgroundClass}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#8b745c]">{placeholderText}</div>
        )}
      </div>

      <div className="absolute left-4 bottom-[3.25rem] text-base font-semibold tracking-[0.08em] text-[#2d241e] transition-colors duration-200 group-hover:text-[#5f4b3a]">
        {codeLabel ?? alt}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[62%] bg-[#e7d9c7] px-5 py-4 text-sm font-semibold tracking-[0.18em] text-[#5f4b3a] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        {actionLabel}
      </div>
    </button>
  );
}
