"use client";
import Link from "next/link";
import Img from "@/components/Img";
import { brandOf, won, type Product } from "@/lib/data";

// 이미지가 아직 없으면(Higgsfield 미생성) 타이포 타일로 폴백
export function ProductImage({ p, className = "" }: { p: Product; className?: string }) {
  return (
    <div className={`ph @container relative overflow-hidden ${className}`}>
      <Img
        src={p.thumbnail}
        alt={p.title}
        className="size-full object-cover"
        fallback={
          <div className="absolute inset-0 flex flex-col justify-end p-2 @[120px]:p-4">
            <span className="hidden text-[11px] font-semibold text-navy/60 @[120px]:block">{brandOf(p).name}</span>
            <span className="line-clamp-2 text-[11px] font-bold leading-tight text-navy @[120px]:text-lg">{p.title}</span>
          </div>
        }
      />
    </div>
  );
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.handle}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
      <ProductImage p={p} className="aspect-square" />
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center gap-1.5">
          {p.badge && <span className={`chip ${p.badge === "즉시납품" ? "bg-orange-soft text-orange" : ""}`}>{p.badge}</span>}
          <span className="text-xs text-ink-muted">{brandOf(p).name}</span>
        </div>
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug group-hover:text-navy">{p.title}</h3>
        <div className="mt-auto pt-2">
          <div className="text-lg font-extrabold">{won(p.price)} <span className="text-xs font-normal text-ink-muted">/ 개 (VAT별도)</span></div>
          <div className="text-xs text-ink-muted">최소 {p.moq}개 · 납기 {p.lead}</div>
        </div>
      </div>
    </Link>
  );
}
