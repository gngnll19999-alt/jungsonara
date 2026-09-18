"use client";
import Link from "next/link";
import { ProductImage } from "@/components/ProductCard";
import { cart, useCart } from "@/lib/cart";
import { brandOf, byHandle, won } from "@/lib/data";

export default function CartPage() {
  const lines = useCart().map((l) => ({ ...l, p: byHandle(l.handle)! })).filter((l) => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const vat = Math.round(subtotal * 0.1);

  if (lines.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <div className="text-5xl">🛒</div>
        <h1 className="mt-4 text-2xl font-bold">장바구니가 비어 있습니다</h1>
        <Link href="/products" className="btn-primary mt-6">상품 보러가기</Link>
      </div>
    );
  }

  return (
    <div className="container-x grid gap-8 py-8 md:grid-cols-[1fr_320px]">
      <div>
        <h1 className="mb-5 text-2xl font-bold">장바구니 <span className="text-base font-normal text-ink-muted">{lines.length}개 품목</span></h1>
        <div className="card divide-y divide-line">
          {lines.map(({ p, qty }) => (
            <div key={p.handle} className="flex gap-4 p-4">
              <ProductImage p={p} className="size-20 shrink-0 rounded-lg" />
              <div className="min-w-0 flex-1">
                <div className="text-xs text-ink-muted">{brandOf(p).name}</div>
                <Link href={`/products/${p.handle}`} className="line-clamp-1 font-semibold hover:text-navy">{p.title}</Link>
                <div className="mt-0.5 text-xs text-ink-muted">단가 {won(p.price)} · 최소 {p.moq}개</div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-line">
                    <button onClick={() => cart.setQty(p.handle, Math.max(p.moq, qty - 1))} className="size-8 rounded-full hover:bg-bg">−</button>
                    <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                    <button onClick={() => cart.setQty(p.handle, qty + 1)} className="size-8 rounded-full hover:bg-bg">+</button>
                  </div>
                  <button onClick={() => cart.remove(p.handle)} className="text-xs text-ink-muted hover:text-ink">삭제</button>
                </div>
              </div>
              <div className="text-right font-extrabold">{won(p.price * qty)}</div>
            </div>
          ))}
        </div>
      </div>
      <aside className="card h-fit p-5 md:sticky md:top-32">
        <div className="flex justify-between text-sm"><span className="text-ink-muted">공급가액</span><span>{won(subtotal)}</span></div>
        <div className="mt-2 flex justify-between text-sm"><span className="text-ink-muted">부가세 (10%)</span><span>{won(vat)}</span></div>
        <div className="mt-3 flex justify-between border-t border-line pt-3"><span className="font-semibold">합계</span><span className="text-xl font-extrabold">{won(subtotal + vat)}</span></div>
        <div className="mt-5 grid gap-2">
          <Link href="/quote" className="btn-orange w-full">이 구성으로 견적요청</Link>
          {/* ponytail: 결제(토스/포트원)는 서버 연결 후 활성화 */}
          <button disabled className="btn-ghost w-full opacity-50" title="결제 연동 예정">바로 주문 (준비중)</button>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">대량 주문은 견적요청 시 제조사 협의 단가가 적용되어 표시 금액보다 낮아질 수 있습니다.</p>
      </aside>
    </div>
  );
}
