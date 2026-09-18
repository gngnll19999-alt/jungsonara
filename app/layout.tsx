import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Header, { Logo } from "@/components/Header";

export const metadata: Metadata = {
  title: "중소나라 — 중소기업 가전 B2B 납품몰",
  description: "대기업 말고, 우리 중소기업 가전. 사업자 전용 대량구매·견적·세금계산서.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="mt-20 border-t border-line bg-surface">
          <div className="container-x grid gap-8 py-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
                중소나라는 검증된 국내 중소기업 가전 제조사와 사업자 구매자를 직접 연결하는 B2B 납품 플랫폼입니다.
              </p>
            </div>
            <div className="text-sm">
              <div className="mb-2 font-semibold">구매자</div>
              <ul className="space-y-1.5 text-ink-muted">
                <li><Link href="/products" className="hover:text-ink">전체상품</Link></li>
                <li><Link href="/quote" className="hover:text-ink">견적요청</Link></li>
                <li><Link href="/cart" className="hover:text-ink">장바구니</Link></li>
              </ul>
            </div>
            <div className="text-sm">
              <div className="mb-2 font-semibold">제조사</div>
              <ul className="space-y-1.5 text-ink-muted">
                <li><Link href="/brands" className="hover:text-ink">입점 중소기업</Link></li>
                <li><Link href="/brands#apply" className="hover:text-ink">입점 신청</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-line">
            <div className="container-x py-5 text-[12px] leading-relaxed text-ink-muted">
              (주)중소나라 · 대표 홍길동 · 사업자등록번호 000-00-00000 · 통신판매업신고 제0000-서울구로-0000호 · 서울시 구로구 디지털로 00 · 고객센터 1588-0000
              <br />© {new Date().getFullYear()} Jungsonara. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
