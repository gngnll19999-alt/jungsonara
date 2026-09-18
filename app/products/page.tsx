import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { brands, categories, products } from "@/lib/data";

type SP = Promise<{ category?: string; brand?: string; q?: string; lead?: string }>;

export default async function Products({ searchParams }: { searchParams: SP }) {
  const { category, brand, q, lead } = await searchParams;
  const kw = q?.trim().toLowerCase();
  const list = products.filter((p) =>
    (!category || p.category === category) &&
    (!brand || p.brand === brand) &&
    (!lead || p.lead === lead) &&
    (!kw || [p.title, p.desc, ...p.specs, brands.find((b) => b.handle === p.brand)?.name ?? ""].join(" ").toLowerCase().includes(kw)),
  );
  const title = category ? categories.find((c) => c.handle === category)?.name
    : brand ? brands.find((b) => b.handle === brand)?.name
    : lead ? `${lead}납품`
    : kw ? `“${q}” 검색결과` : "전체상품";

  const side = (href: string, label: string, on: boolean) => (
    <Link key={href} href={href} className={`block rounded-lg px-3 py-2 text-sm ${on ? "bg-navy font-semibold text-white" : "hover:bg-bg"}`}>{label}</Link>
  );

  return (
    <div className="container-x grid gap-8 py-8 md:grid-cols-[200px_1fr]">
      <aside className="hidden md:block">
        <div className="mb-2 px-3 text-xs font-semibold text-ink-muted">카테고리</div>
        {side("/products", "전체", !category && !brand && !lead)}
        {categories.map((c) => side(`/products?category=${c.handle}`, c.name, category === c.handle))}
        <div className="mb-2 mt-6 px-3 text-xs font-semibold text-ink-muted">제조사</div>
        {brands.map((b) => side(`/products?brand=${b.handle}`, b.name, brand === b.handle))}
        <div className="mb-2 mt-6 px-3 text-xs font-semibold text-ink-muted">납기</div>
        {side("/products?lead=즉시", "즉시납품", lead === "즉시")}
      </aside>
      <div>
        <div className="mb-5 flex items-end justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <span className="text-sm text-ink-muted">{list.length}개</span>
        </div>
        {list.length === 0 ? (
          <div className="card p-16 text-center text-ink-muted">조건에 맞는 상품이 없습니다. <Link href="/quote" className="text-navy underline">견적요청</Link>으로 문의해 주세요.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
