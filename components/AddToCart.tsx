"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cart } from "@/lib/cart";
import { won, type Product } from "@/lib/data";

export default function AddToCart({ p }: { p: Product }) {
  const [qty, setQty] = useState(p.moq);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const add = () => { cart.add(p.handle, qty); setDone(true); setTimeout(() => setDone(false), 1500); };

  return (
    <div className="card sticky top-32 p-5">
      <div className="text-sm text-ink-muted">단가 (VAT 별도)</div>
      <div className="text-3xl font-extrabold">{won(p.price)}</div>
      <div className="mt-1 text-xs text-ink-muted">최소주문 {p.moq}개 · 납기 {p.lead}</div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold">수량</span>
        <div className="flex items-center rounded-full border border-line">
          <button onClick={() => setQty((q) => Math.max(p.moq, q - 1))} className="size-9 rounded-full hover:bg-bg" aria-label="감소">−</button>
          <input value={qty} onChange={(e) => setQty(Math.max(p.moq, Number(e.target.value) || p.moq))} className="w-14 bg-transparent text-center text-sm font-semibold outline-none" />
          <button onClick={() => setQty((q) => q + 1)} className="size-9 rounded-full hover:bg-bg" aria-label="증가">+</button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-sm text-ink-muted">합계</span>
        <span className="text-xl font-extrabold">{won(p.price * qty)}</span>
      </div>

      <div className="mt-5 grid gap-2">
        <button onClick={add} className="btn-primary w-full">{done ? "담았습니다 ✓" : "장바구니 담기"}</button>
        <button onClick={() => { cart.add(p.handle, qty); router.push("/quote"); }} className="btn-orange w-full">이 수량으로 견적요청</button>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">{p.moq * 5}개 이상 주문 시 제조사 직접 협의 단가가 적용됩니다. 견적요청을 이용하세요.</p>
    </div>
  );
}
