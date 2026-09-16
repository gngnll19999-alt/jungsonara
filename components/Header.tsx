"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/data";
import { useCart } from "@/lib/cart";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="grid size-8 place-items-center rounded-lg bg-navy text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" /><path d="M5 21V9l7-5 7 5v12" /><path d="M9 21v-6h6v6" />
        </svg>
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-navy"}`}>
        중소나라
      </span>
    </Link>
  );
}

export default function Header() {
  const lines = useCart();
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const path = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="bg-navy-deep text-[12px] text-white/80">
        <div className="container-x flex h-8 items-center justify-between">
          <span>사업자 전용 B2B 몰 · 세금계산서 즉시 발행 · 대량구매 견적 무료</span>
          <span className="hidden gap-4 md:flex">
            <Link href="/brands" className="hover:text-white">입점기업 신청</Link>
            <a href="tel:1588-0000" className="hover:text-white">고객센터 1588-0000</a>
          </span>
        </div>
      </div>
      <div className="container-x flex h-16 items-center gap-4">
        <Logo />
        <form
          className="hidden flex-1 md:block"
          onSubmit={(e) => { e.preventDefault(); router.push(`/products?q=${encodeURIComponent(q)}`); }}
        >
          <label className="flex h-11 max-w-xl items-center gap-2 rounded-full border border-line bg-bg px-4 focus-within:border-navy">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="제품명, 브랜드, 모델명 검색" className="w-full bg-transparent text-sm outline-none placeholder:text-muted" />
          </label>
        </form>
        <nav className="ml-auto flex items-center gap-2">
          <Link href="/quote" className="btn-accent hidden h-10 px-4 sm:inline-flex">견적요청</Link>
          <Link href="/cart" className="relative grid size-10 place-items-center rounded-full hover:bg-bg" aria-label="장바구니">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 8h-12z" /><path d="M6 6 5 3H2" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></svg>
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">{count}</span>}
          </Link>
        </nav>
      </div>
      <div className="container-x -mb-px hidden h-11 items-center gap-6 text-sm font-medium md:flex">
        <Link href="/products" className={`border-b-2 py-3 ${path === "/products" ? "border-navy text-navy" : "border-transparent hover:text-navy"}`}>전체상품</Link>
        {categories.map((c) => (
          <Link key={c.handle} href={`/products?category=${c.handle}`} className="border-b-2 border-transparent py-3 hover:text-navy">{c.name}</Link>
        ))}
        <Link href="/brands" className={`border-b-2 py-3 ${path === "/brands" ? "border-navy text-navy" : "border-transparent hover:text-navy"}`}>입점 중소기업</Link>
      </div>
    </header>
  );
}
