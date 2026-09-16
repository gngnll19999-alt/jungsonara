import Link from "next/link";
import { brands, products } from "@/lib/data";

export default function BrandsPage() {
  return (
    <div className="container-x py-8">
      <div className="grid items-end gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <span className="chip">입점 중소기업</span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">대기업 OEM 수십 년,<br />이제 자기 이름으로 납품합니다.</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            중소나라 입점 제조사는 KC 인증·ISO·조달등록 등 서류 심사와 현장 실사를 거칩니다. 중간 유통 없이 제조사가 직접 견적·납품·A/S를 책임집니다.
          </p>
        </div>
        <div className="relative min-h-52 overflow-hidden rounded-xl2 bg-sky md:col-span-5 [background:url('/img/brands.jpg')_center/cover,#e8f0fb]" />
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => {
          const n = products.filter((p) => p.brand === b.handle).length;
          return (
            <div key={b.handle} className="card flex flex-col p-6">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-navy text-lg font-extrabold text-white">{b.name[0]}</div>
                <div>
                  <div className="font-bold">{b.name}</div>
                  <div className="text-xs text-muted">{b.region} · since {b.since}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{b.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">{b.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              <Link href={`/products?brand=${b.handle}`} className="btn-ghost mt-5 w-full">등록 상품 {n}개 보기</Link>
            </div>
          );
        })}
      </div>

      <section id="apply" className="mt-20 rounded-xl2 bg-navy p-8 text-white md:p-12">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-2xl font-extrabold md:text-3xl">제조사이신가요? 입점을 신청하세요</h2>
            <p className="mt-3 text-white/70">입점비 무료. 판매 수수료만 부담하며, 견적·계약·세금계산서 도구를 제공합니다.</p>
            <ul className="mt-5 grid gap-2 text-sm text-white/85 sm:grid-cols-2">
              {["국내 제조 (자체 또는 협력 공장)", "KC 등 필수 인증 보유", "A/S 체계 운영", "사업자 등록 1년 이상"].map((t) => <li key={t}>✓ {t}</li>)}
            </ul>
          </div>
          <div className="flex items-center md:col-span-5 md:justify-end">
            <a href="mailto:partner@jungsonara.kr?subject=입점 신청" className="btn-accent">입점 신청 메일 보내기</a>
          </div>
        </div>
      </section>
    </div>
  );
}
