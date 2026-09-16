"use client";
import Link from "next/link";
import { useState } from "react";
import { brandOf, won, type Product } from "@/lib/data";

// 이미지가 아직 없으면(Higgsfield 미생성) 타이포 타일로 폴백
export function ProductImage({ p, className = "" }: { p: Product; className?: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`ph relative overflow-hidden ${className}`}>
      {!broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.thumbnail} alt={p.title} onError={() => setBroken(true)} className="size-full object-cover" loading="lazy" />
      )}
      {broken && (
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <span className="text-[11px] font-semibold text-navy/60">{brandOf(p).name}</span>
          <span className="line-clamp-2 text-lg font-bold leading-tight text-navy">{p.title}</span>
        </div>
      )}
    </div>
  );
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.handle}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
      <ProductImage p={p} className="aspect-square" />
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center gap-1.5">
          {p.badge && <span className={`chip ${p.badge === "즉시납품" ? "bg-accent-soft text-accent" : ""}`}>{p.badge}</span>}
          <span className="text-xs text-muted">{brandOf(p).name}</span>
        </div>
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug group-hover:text-navy">{p.title}</h3>
        <div className="mt-auto pt-2">
          <div className="text-lg font-extrabold">{won(p.price)} <span className="text-xs font-normal text-muted">/ 개 (VAT별도)</span></div>
          <div className="text-xs text-muted">최소 {p.moq}개 · 납기 {p.lead}</div>
        </div>
      </div>
    </Link>
  );
}
