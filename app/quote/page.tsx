"use client";
import Link from "next/link";
import { useState } from "react";
import { cart, useCart } from "@/lib/cart";
import { byHandle, won } from "@/lib/data";

const F = ({ label, name, type = "text", required = true, placeholder = "", className = "" }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; className?: string }) => (
  <label className={`block ${className}`}>
    <span className="text-sm font-semibold">{label}{required && <span className="text-orange"> *</span>}</span>
    <input name={name} type={type} required={required} placeholder={placeholder} className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none focus:border-navy" />
  </label>
);

export default function QuotePage() {
  const lines = useCart().map((l) => ({ ...l, p: byHandle(l.handle)! })).filter((l) => l.p);
  const [sent, setSent] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const payload = { ...data, items: lines.map((l) => ({ handle: l.handle, qty: l.qty })), at: new Date().toISOString() };
    // ponytail: 서버 연결 시 POST /api/quotes 로 교체. 지금은 localStorage 에 누적.
    const all = JSON.parse(localStorage.getItem("jsn_quotes") || "[]");
    const id = "Q" + Date.now().toString().slice(-8);
    localStorage.setItem("jsn_quotes", JSON.stringify([...all, { id, ...payload }]));
    cart.clear();
    setSent(id);
  };

  if (sent) {
    return (
      <div className="container-x py-24 text-center">
        <div className="text-5xl">📨</div>
        <h1 className="mt-4 text-2xl font-bold">견적요청이 접수되었습니다</h1>
        <p className="mt-2 text-ink-muted">접수번호 <b className="text-ink">{sent}</b> · 담당 제조사가 24시간 내 회신드립니다.</p>
        <Link href="/products" className="btn-primary mt-6">계속 둘러보기</Link>
      </div>
    );
  }

  return (
    <div className="container-x grid gap-8 py-8 md:grid-cols-[1fr_340px]">
      <form onSubmit={submit} className="card p-6 md:p-8">
        <h1 className="text-2xl font-bold">견적요청</h1>
        <p className="mt-1 text-sm text-ink-muted">사업자 정보와 필요 수량을 알려주시면 제조사가 직접 견적서를 보내드립니다.</p>

        <h2 className="mt-8 text-sm font-bold text-navy">사업자 정보</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <F label="회사명" name="company" placeholder="(주)중소나라" />
          <F label="사업자등록번호" name="bizno" placeholder="000-00-00000" />
          <F label="담당자" name="person" />
          <F label="연락처" name="phone" type="tel" placeholder="010-0000-0000" />
          <F label="이메일 (견적서 수신)" name="email" type="email" className="sm:col-span-2" />
        </div>

        <h2 className="mt-8 text-sm font-bold text-navy">납품 조건</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <F label="희망 납기일" name="due" type="date" required={false} />
          <F label="납품 지역" name="region" placeholder="서울 구로구" />
          <label className="block sm:col-span-2">
            <span className="text-sm font-semibold">요청사항</span>
            <textarea name="memo" rows={4} placeholder="장바구니에 없는 품목, 사양 변경, 설치 여부 등을 자유롭게 적어주세요." className="mt-1.5 w-full rounded-lg border border-line bg-surface p-3 text-sm outline-none focus:border-navy" />
          </label>
        </div>

        <label className="mt-6 flex items-start gap-2 text-sm text-ink-muted">
          <input type="checkbox" required className="mt-1" />
          <span>견적 산출을 위해 입력한 정보를 해당 제조사에 전달하는 것에 동의합니다.</span>
        </label>
        <button className="btn-orange mt-6 w-full sm:w-auto">견적요청 보내기</button>
      </form>

      <aside className="card h-fit p-5 md:sticky md:top-32">
        <div className="font-bold">요청 품목 <span className="text-sm font-normal text-ink-muted">{lines.length}개</span></div>
        {lines.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">담긴 품목이 없어도 요청사항에 적어 보내실 수 있습니다. <Link href="/products" className="text-navy underline">상품 담기</Link></p>
        ) : (
          <ul className="mt-3 divide-y divide-line">
            {lines.map(({ p, qty }) => (
              <li key={p.handle} className="flex justify-between gap-3 py-2.5 text-sm">
                <span className="line-clamp-1">{p.title}</span>
                <span className="shrink-0 text-ink-muted">{qty}개 · {won(p.price * qty)}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
