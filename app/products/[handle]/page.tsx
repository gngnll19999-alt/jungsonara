import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import ProductCard, { ProductImage } from "@/components/ProductCard";
import { brandOf, byHandle, categoryOf, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const p = byHandle(handle);
  if (!p) notFound();
  const brand = brandOf(p);
  const cat = categoryOf(p);
  const related = products.filter((x) => x.category === p.category && x.handle !== p.handle).slice(0, 4);

  return (
    <div className="container-x py-8">
      <nav className="mb-5 flex gap-2 text-sm text-ink-muted">
        <Link href="/products" className="hover:text-navy">전체상품</Link><span>/</span>
        <Link href={`/products?category=${cat.handle}`} className="hover:text-navy">{cat.name}</Link><span>/</span>
        <span className="text-ink">{p.title}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-12">
        <ProductImage p={p} className="aspect-square rounded-xl2 border border-line md:col-span-5" />
        <div className="md:col-span-4">
          <div className="flex items-center gap-2">
            {p.badge && <span className="chip">{p.badge}</span>}
            <Link href={`/products?brand=${brand.handle}`} className="text-sm text-ink-muted hover:text-navy">{brand.name} · {brand.region}</Link>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight md:text-3xl">{p.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{p.desc}</p>

          <h2 className="mt-8 text-sm font-semibold">주요 사양</h2>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {p.specs.map((s) => <li key={s} className="rounded-lg bg-surface px-3 py-2 text-sm">{s}</li>)}
          </ul>

          <h2 className="mt-8 text-sm font-semibold">제조사</h2>
          <div className="card mt-2 flex gap-4 p-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy font-extrabold text-white">{brand.name[0]}</div>
            <div>
              <div className="font-bold">{brand.name} <span className="text-xs font-normal text-ink-muted">since {brand.since}</span></div>
              <p className="text-sm text-ink-muted">{brand.blurb}</p>
              <div className="mt-2 flex gap-1.5">{brand.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs">
            {[["세금계산서", "즉시 발행"], ["A/S", "제조사 직접"], ["배송", "화물/택배 선택"]].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-surface py-3"><div className="text-ink-muted">{k}</div><div className="mt-0.5 font-semibold">{v}</div></div>
            ))}
          </div>
        </div>
        <div className="md:col-span-3"><AddToCart p={p} /></div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-bold">같은 카테고리 상품</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{related.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}
    </div>
  );
}
