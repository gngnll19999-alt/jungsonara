# 중소나라 — 중소기업 가전 B2B 납품몰

로컬 디자인/웹뷰 단계. 데이터는 `lib/data.ts` 목업, 장바구니/견적은 localStorage.

## 실행
```bash
npm install
npm run dev   # http://localhost:3000
```

## Higgsfield 이미지 생성 (로고 3D 아이콘·워드마크, 히어로, 상품 20종)
1. https://console.higgsfield.ai 에서 API 키 발급
2. `.env.local` 에 `HF_CREDENTIALS=KEY_ID:KEY_SECRET`
3. `npm run gen:images` → `public/img/*.jpg|png` (있는 파일은 건너뜀, 다시 만들려면 파일 삭제)
   - 모델 바꾸려면 `HF_MODEL=...` (기본 `flux-pro/kontext/max/text-to-image`). 한글 워드마크가 깨지면 텍스트 잘 그리는 모델(Ideogram 등)로.
   - 프롬프트는 `lib/data.ts` 의 `heroPrompts` / 각 상품 `look`

## 서버 연결 (다음 단계)
- 백엔드: Medusa v2 b2b-starter → `lib/data.ts` 를 fetch 로 교체
- 견적: `app/quote/page.tsx` 의 localStorage 저장을 `POST /api/quotes` 로
- 결제: 토스페이먼츠/포트원 → `app/cart/page.tsx` "바로 주문" 활성화
