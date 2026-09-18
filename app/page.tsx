import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { brands, categories, products } from "@/lib/data";

const stats: { v: number | string; d?: number; suffix?: string; l: string }[] = [
  { v: 126, l: "입점 중소기업" },
  { v: 1840, l: "등록 상품" },
  { v: 98.7, d: 1, suffix: "%", l: "납기 준수율" },
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
      {/* HERO — shadcn/ui + Magic UI (DotPattern · AnimatedShinyText · NumberTicker · BorderBeam · Marquee) */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <DotPattern width={22} height={22} cr={1.1} className="[mask-image:radial-gradient(60%_60%_at_50%_0%,#000_30%,transparent_100%)] text-navy/40" />
        <div className="container-x relative flex flex-col items-center pt-16 text-center md:pt-24">
          <Link href="/brands" className="group rounded-full border border-line bg-bg px-1 py-1 pr-4 text-sm transition hover:border-navy/40">
            <AnimatedShinyText className="inline-flex items-center gap-2 text-ink-muted">
              <Badge className="rounded-full bg-orange text-white">NEW</Badge>
              이달의 신규 입점 중소기업 12곳
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </Link>

          <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-navy md:text-7xl">
            대기업 말고,<br />
            <span className="relative isolate inline-block">
              우리 중소기업 가전.
              <span aria-hidden className="absolute inset-x-0 -bottom-1 -z-10 h-4 rounded bg-orange/25 md:h-6" />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            검증된 국내 제조사 제품을 공장 단가로. 대량구매 견적부터 세금계산서까지, 사업자번호 하나로 끝냅니다.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="h-12 rounded-full px-7 text-base" nativeButton={false} render={<Link href="/quote" />}>
              무료 견적요청 <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-full px-7 text-base" nativeButton={false} render={<Link href="/products" />}>
              상품 둘러보기
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
            {["세금계산서 즉시 발행", "제조사 직접 A/S", "24시간 내 견적 회신", "재고 품목 익일 출고"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5"><Check className="size-4 text-orange" />{t}</li>
            ))}
          </ul>

          {/* 지표 카드 */}
          <Card className="relative mt-14 w-full max-w-4xl overflow-hidden rounded-3xl border-line py-0 shadow-xl shadow-navy/5">
            <BorderBeam size={220} duration={9} colorFrom="#ff7a1a" colorTo="#12305b" />
            <div className="grid divide-y divide-line sm:grid-cols-4 sm:divide-x sm:divide-y-0">
              {stats.map((s) => (
                <div key={s.l} className="px-6 py-7">
                  <div className="text-3xl font-extrabold text-navy md:text-4xl">
                    {typeof s.v === "number" ? <NumberTicker value={s.v} decimalPlaces={s.d} className="text-navy" /> : s.v}{s.suffix}
                  </div>
                  <div className="mt-1 text-sm text-ink-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 입점 중소기업 마퀴 */}
        <div className="relative mt-12 border-t border-line bg-bg py-5">
          <div className="container-x mb-3 text-center text-xs font-semibold tracking-wider text-ink-muted">입점 중소기업 · 전국 A/S · KC 인증</div>
          <Marquee pauseOnHover className="[--duration:36s] [--gap:1.25rem]">
            {[...brands, ...brands].map((b, i) => (
              <Link key={b.handle + i} href={`/products?brand=${b.handle}`} className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-navy transition hover:border-navy/40">
                <span className="grid size-6 place-items-center rounded-md bg-navy text-[11px] font-extrabold text-white">{b.name[0]}</span>
                {b.name}<span className="font-normal text-ink-muted">· {b.region}</span>
              </Link>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg" />
        </div>
      </section>

      {/* 카테고리 */}
      <section className="container-x mt-16">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold">카테고리</h2>
          <Link href="/products" className="text-sm text-ink-muted hover:text-navy">전체보기 →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.handle} href={`/products?category=${c.handle}`} className="card p-5 transition hover:-translate-y-0.5 hover:border-navy/40 hover:shadow-md">
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-3 font-semibold">{c.name}</div>
              <div className="mt-0.5 text-xs text-ink-muted">{c.blurb}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 베스트 */}
      <section className="container-x mt-14">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">이번 주 납품 베스트</h2>
            <p className="mt-1 text-sm text-ink-muted">사업자 구매 기준 상위 품목</p>
          </div>
          <Link href="/products" className="text-sm text-ink-muted hover:text-navy">전체보기 →</Link>
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
            <p className="mt-1 text-sm text-ink-muted">재고 보유 · 오늘 발주 시 익일 출고</p>
          </div>
          <Link href="/products?lead=즉시" className="text-sm text-ink-muted hover:text-navy">전체보기 →</Link>
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
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
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
                      <span className="text-xs text-ink-muted">{b.region} · since {b.since}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{b.blurb}</p>
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
              <div className="text-sm font-extrabold text-orange">{s.n}</div>
              <div className="mt-2 text-lg font-bold">{s.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.d}</p>
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
          <Link href="/quote" className="btn-orange shrink-0">무료 견적요청</Link>
        </div>
      </section>
    </>
  );
}
