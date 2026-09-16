import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { brands, categories, products } from "@/lib/data";

const stats = [
  { v: "126", l: "입점 중소기업" },
  { v: "1,840", l: "등록 상품" },
  { v: "98.7%", l: "납기 준수율" },
  { v: "즉시", l: "세금계산서 발행" },
];

const steps = [
  { n: "01", t: "견적요청", d: "상품을 담고 수량·납기만 적어주세요. 사업자번호 하나면 됩니다." },
  { n: "02", t: "견적서 수령", d: "제조사가 24시간 내 단가·납기 확정 견적서를 보냅니다." },
  { n: "03", t: "계약·납품", d: "전자계약 후 지정일 납품. 세금계산서는 자동 발행됩니다." },
];

export default function Home() {
  const best = products.filter((p) => p.badge === "베스트");
  const quick = products.filter((p) => p.lead === "즉시").slice(0, 4);

  return (
    <>
      {/* HERO — 벤토 그리드 */}
      <section className="container-x pt-6 md:pt-8">
        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="relative overflow-hidden rounded-xl2 bg-navy-deep p-8 text-white md:col-span-7 md:row-span-2 md:p-12">
            <div
              className="absolute inset-0 opacity-40 [background:url('/img/hero.jpg')_center/cover,radial-gradient(80%_60%_at_100%_0%,#2d5aa8_0%,transparent_60%)]"
              aria-hidden
            />
            <div className="relative flex h-full flex-col">
              <span className="chip w-fit bg-white/10 text-white">사업자 전용 B2B</span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] tracking-tight md:text-5xl">
                대기업 말고,<br />우리 중소기업 가전.
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">
                검증된 국내 제조사 제품을 공장 단가로. 대량구매 견적부터 세금계산서까지 한 번에.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className="btn-accent">무료 견적요청</Link>
                <Link href="/products" className="btn bg-white/10 text-white hover:bg-white/20">상품 둘러보기</Link>
              </div>
              <dl className="mt-auto grid grid-cols-2 gap-4 pt-10 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.l}>
                    <dt className="text-[12px] text-white/60">{s.l}</dt>
                    <dd className="text-2xl font-extrabold">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <Link href="/products?lead=즉시" className="card group flex flex-col justify-between p-6 md:col-span-5">
            <div className="flex items-start justify-between">
              <span className="chip bg-accent-soft text-accent">즉시납품</span>
              <span className="text-2xl transition group-hover:translate-x-1">→</span>
            </div>
            <div className="mt-6">
              <div className="text-xl font-bold">오늘 발주, 내일 도착</div>
              <p className="mt-1 text-sm text-muted">재고 보유 {quick.length + 12}개 품목 · 수도권 익일 배송</p>
            </div>
          </Link>

          <Link href="/brands" className="group relative overflow-hidden rounded-xl2 bg-sky p-6 md:col-span-5">
            <div className="flex items-start justify-between">
              <span className="chip">이달의 입점기업</span>
              <span className="text-2xl transition group-hover:translate-x-1">→</span>
            </div>
            <div className="mt-6">
              <div className="text-xl font-bold text-navy">청우테크 · 인천</div>
              <p className="mt-1 text-sm text-navy/70">자체 필터 생산라인 보유, 공기청정기 학원 납품 1위</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 카테고리 */}
      <section className="container-x mt-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold">카테고리</h2>
          <Link href="/products" className="text-sm text-muted hover:text-navy">전체보기 →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.handle} href={`/products?category=${c.handle}`} className="card p-5 transition hover:-translate-y-0.5 hover:border-navy/40 hover:shadow-md">
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-3 font-semibold">{c.name}</div>
              <div className="mt-0.5 text-xs text-muted">{c.blurb}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 베스트 */}
      <section className="container-x mt-14">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">이번 주 납품 베스트</h2>
            <p className="mt-1 text-sm text-muted">사업자 구매 기준 상위 품목</p>
          </div>
          <Link href="/products" className="text-sm text-muted hover:text-navy">전체보기 →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {best.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* 즉시납품 */}
      <section className="container-x mt-14">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">즉시납품 가능</h2>
            <p className="mt-1 text-sm text-muted">재고 보유 · 오늘 발주 시 익일 출고</p>
          </div>
          <Link href="/products?lead=즉시" className="text-sm text-muted hover:text-navy">전체보기 →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quick.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* 입점 중소기업 */}
      <section className="mt-20 bg-surface py-16">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="chip">우리가 만듭니다</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight">이름은 낯설어도,<br />품질은 20년입니다.</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                대기업 OEM을 수십 년 해온 국내 제조사들이 자기 이름으로 직접 납품합니다. 중간 마진 없이, A/S도 제조사가 직접.
              </p>
              <Link href="/brands" className="btn-primary mt-6">입점 중소기업 보기</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-8">
              {brands.map((b) => (
                <Link key={b.handle} href={`/products?brand=${b.handle}`} className="card flex gap-4 p-5 transition hover:border-navy/40 hover:shadow-md">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy text-lg font-extrabold text-white">{b.name[0]}</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="font-bold">{b.name}</span>
                      <span className="text-xs text-muted">{b.region} · since {b.since}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{b.blurb}</p>
                    <div className="mt-2 flex gap-1.5">{b.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 프로세스 */}
      <section className="container-x mt-20">
        <h2 className="text-2xl font-bold">납품, 이렇게 진행됩니다</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card p-6">
              <div className="text-sm font-extrabold text-accent">{s.n}</div>
              <div className="mt-2 text-lg font-bold">{s.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl2 bg-navy p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">지금 필요한 수량, 바로 견적 받으세요</h2>
            <p className="mt-2 text-white/70">사업자번호만 있으면 됩니다. 24시간 내 회신.</p>
          </div>
          <Link href="/quote" className="btn-accent shrink-0">무료 견적요청</Link>
        </div>
      </section>
    </>
  );
}
