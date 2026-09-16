// 목업 데이터. 필드 구성은 Medusa product/variant 와 1:1 매핑되게 단순화.
// 서버 연결 시 이 파일만 fetch 로 교체하면 됨.

export type Category = { handle: string; name: string; icon: string; blurb: string };
export type Brand = { handle: string; name: string; region: string; since: number; blurb: string; tags: string[] };
export type Product = {
  id: string;
  handle: string;
  title: string;
  brand: string; // Brand.handle
  category: string; // Category.handle
  price: number; // KRW, 1개 단가 (VAT 별도)
  moq: number; // 최소주문수량
  lead: string; // 납기
  specs: string[];
  desc: string;
  thumbnail: string; // /img/{handle}.jpg — scripts/gen-images.mjs 가 생성
  badge?: string;
  imagePrompt: string; // Higgsfield 프롬프트
};

export const categories: Category[] = [
  { handle: "kitchen", name: "주방가전", icon: "🍚", blurb: "밥솥·인덕션·에어프라이어" },
  { handle: "living", name: "생활가전", icon: "🌬️", blurb: "공기청정기·청소기·제습기" },
  { handle: "season", name: "계절가전", icon: "☀️", blurb: "서큘레이터·히터·이동식에어컨" },
  { handle: "office", name: "사무·업소용", icon: "🏢", blurb: "업소용 냉장고·커피머신·세단기" },
  { handle: "health", name: "건강·미용", icon: "💆", blurb: "안마기·온열매트·가습기" },
  { handle: "smart", name: "스마트·IoT", icon: "📡", blurb: "스마트플러그·CCTV·센서" },
];

export const brands: Brand[] = [
  { handle: "hanbit", name: "한빛전자", region: "경기 화성", since: 2004, blurb: "20년 밥솥 외길. OEM 납품 경험 다수.", tags: ["주방가전", "ISO9001"] },
  { handle: "cheongwoo", name: "청우테크", region: "인천 남동", since: 2011, blurb: "공기청정·제습 전문. 자체 필터 생산라인 보유.", tags: ["생활가전", "KC인증"] },
  { handle: "nuri", name: "누리가전", region: "대구 달서", since: 2015, blurb: "서큘레이터·히터 등 계절가전. 관공서 납품 실적.", tags: ["계절가전", "조달등록"] },
  { handle: "serim", name: "세림산업", region: "경남 김해", since: 1998, blurb: "업소용 냉장·냉동 설비. 전국 A/S망.", tags: ["업소용", "전국AS"] },
  { handle: "miso", name: "미소테크", region: "충북 청주", since: 2018, blurb: "안마기·온열기기. 병원·요양원 납품.", tags: ["건강·미용", "의료기기"] },
  { handle: "onnuri", name: "온누리에너지", region: "서울 구로", since: 2016, blurb: "스마트플러그·IoT 센서. 앱 연동 자체 개발.", tags: ["스마트·IoT", "벤처인증"] },
];

const P = (
  p: Omit<Product, "id" | "thumbnail" | "imagePrompt"> & { look: string },
): Product => ({
  id: `prod_${p.handle}`,
  thumbnail: `/img/${p.handle}.jpg`,
  imagePrompt: `Professional e-commerce product photo of ${p.look}, Korean small-business appliance brand, clean matte finish, minimal studio set, soft daylight from the left, off-white seamless background, subtle shadow, centered, 1:1, no text, no logo, photorealistic`,
  ...p,
});

export const products: Product[] = [
  P({ handle: "hanbit-rice-10", title: "한빛 IH압력밥솥 10인용", brand: "hanbit", category: "kitchen", price: 189000, moq: 5, lead: "3~5일", badge: "베스트", specs: ["IH 통가열", "10인용 1.8L", "스테인리스 내솥", "KC 인증"], desc: "구내식당·펜션 납품 실적 300대 이상. 내솥 코팅 2년 보증.", look: "a 10-cup induction pressure rice cooker, dark navy body with brushed steel lid" }),
  P({ handle: "hanbit-induction-2", title: "한빛 2구 인덕션 렌지", brand: "hanbit", category: "kitchen", price: 129000, moq: 3, lead: "3~5일", specs: ["3,400W", "터치 조작", "강화유리 상판", "과열 방지"], desc: "빌트인·프리스탠딩 겸용. 원룸 임대사업자 대량 납품 가능.", look: "a two-burner black glass induction cooktop with touch controls" }),
  P({ handle: "hanbit-airfryer-7", title: "한빛 대용량 에어프라이어 7L", brand: "hanbit", category: "kitchen", price: 79000, moq: 10, lead: "즉시", badge: "즉시납품", specs: ["7L 대용량", "1,700W", "듀얼 히터", "분리세척 바스켓"], desc: "카페·소형 식당용. 바스켓 논스틱 코팅 1년 보증.", look: "a large 7-liter cream white air fryer with a digital knob" }),
  P({ handle: "serim-dishwasher-b", title: "세림 업소용 식기세척기 (도어형)", brand: "serim", category: "kitchen", price: 1490000, moq: 1, lead: "7~10일", specs: ["시간당 60랙", "스테인리스 304", "자동 세제 투입", "3상 380V"], desc: "설치·시운전 포함. 전국 A/S 지점 42곳.", look: "a commercial stainless steel hood-type dishwasher for restaurants" }),
  P({ handle: "cheongwoo-air-30", title: "청우 공기청정기 30평형", brand: "cheongwoo", category: "living", price: 249000, moq: 3, lead: "3~5일", badge: "베스트", specs: ["CADR 600", "H13 헤파", "PM1.0 센서", "저소음 22dB"], desc: "학원·사무실 납품 1위. 필터 정기배송 옵션 제공.", look: "a tall cylindrical white air purifier with a fabric-textured front panel and a small LED air quality ring" }),
  P({ handle: "cheongwoo-dehum-16", title: "청우 제습기 16L", brand: "cheongwoo", category: "living", price: 219000, moq: 2, lead: "3~5일", specs: ["일 16L", "연속배수", "의류건조 모드", "1등급"], desc: "지하 창고·물류센터용. 연속배수 호스 기본 포함.", look: "a compact light-gray dehumidifier with a water tank window and top handle" }),
  P({ handle: "cheongwoo-vac-cordless", title: "청우 무선 진공청소기 프로", brand: "cheongwoo", category: "living", price: 169000, moq: 5, lead: "즉시", specs: ["25kPa", "60분 사용", "교체형 배터리", "벽걸이 거치대"], desc: "청소용역·숙박업 납품. 배터리 추가 구매 가능.", look: "a modern cordless stick vacuum cleaner in graphite and orange accents standing upright" }),
  P({ handle: "cheongwoo-water-uf", title: "청우 직수 정수기 (냉온)", brand: "cheongwoo", category: "living", price: 329000, moq: 1, lead: "5~7일", specs: ["UF 4단계", "냉온정", "자가 필터교체", "탁상형"], desc: "렌탈 없이 구매형. 필터 6개월 세트 동봉.", look: "a slim tabletop hot and cold water purifier in white with a chrome tap" }),
  P({ handle: "nuri-circ-14", title: "누리 서큘레이터 14인치 (BLDC)", brand: "nuri", category: "season", price: 89000, moq: 5, lead: "즉시", badge: "즉시납품", specs: ["BLDC 모터", "3D 회전", "리모컨", "타이머 12h"], desc: "관공서 조달 등록 모델. 여름철 수량 확보 가능.", look: "a 14-inch white air circulator fan with a round grille on a short stand" }),
  P({ handle: "nuri-heater-carbon", title: "누리 카본 전기히터 2단", brand: "nuri", category: "season", price: 69000, moq: 10, lead: "3~5일", specs: ["900/1,800W", "넘어짐 자동차단", "과열 차단", "70° 회전"], desc: "학교·군부대 납품 실적. 겨울 시즌 조기 발주 권장.", look: "a tall slim carbon electric heater with a black grille and warm orange glow" }),
  P({ handle: "nuri-fanheater", title: "누리 PTC 온풍기 업소용", brand: "nuri", category: "season", price: 119000, moq: 3, lead: "3~5일", specs: ["2,000W PTC", "3단 풍량", "IPX2", "이동 바퀴"], desc: "매장 출입구·작업장용. 넓은 송풍 범위.", look: "a compact industrial-style PTC fan heater in dark gray with a carry handle" }),
  P({ handle: "nuri-portable-ac", title: "누리 이동식 에어컨 8평형", brand: "nuri", category: "season", price: 399000, moq: 1, lead: "5~7일", specs: ["8평형", "제습 겸용", "창문 키트", "리모컨"], desc: "설치 불가 임대 공간용. 자가 설치 5분.", look: "a white portable air conditioner on casters with a top control panel and exhaust hose" }),
  P({ handle: "serim-fridge-45", title: "세림 업소용 냉장고 45박스", brand: "serim", category: "office", price: 890000, moq: 1, lead: "5~7일", badge: "베스트", specs: ["1,150L", "스테인리스", "디지털 온도", "간냉식"], desc: "식당·급식소 표준 모델. 냉장·냉동 구성 선택 가능.", look: "a two-door stainless steel commercial refrigerator for restaurants" }),
  P({ handle: "serim-coffee-auto", title: "세림 전자동 커피머신 오피스", brand: "serim", category: "office", price: 590000, moq: 1, lead: "3~5일", specs: ["원두 500g", "우유 거품", "터치 LCD", "일 200잔"], desc: "사무실 탕비실용. 원두 정기배송 연계.", look: "a sleek black bean-to-cup office coffee machine with a touch display" }),
  P({ handle: "onnuri-shredder", title: "온누리 문서세단기 A4 12매", brand: "onnuri", category: "office", price: 149000, moq: 2, lead: "즉시", specs: ["12매 동시", "마이크로컷", "20L 통", "CD 투입구"], desc: "보안 4등급. 관공서·회계사무소 납품.", look: "a black office paper shredder with a transparent bin window" }),
  P({ handle: "miso-massage-chair", title: "미소 안마의자 라이트", brand: "miso", category: "health", price: 1290000, moq: 1, lead: "7~10일", specs: ["4D 롤러", "다리 마사지", "블루투스", "가죽 시트"], desc: "요양원·헬스장 납품. 설치 및 3년 무상 A/S.", look: "a compact modern massage chair in beige leather with wooden armrest accents" }),
  P({ handle: "miso-heatmat-queen", title: "미소 온수매트 퀸", brand: "miso", category: "health", price: 159000, moq: 5, lead: "3~5일", specs: ["온수 보일러 분리", "좌우 분리난방", "전자파 無", "세탁 가능"], desc: "펜션·모텔 대량 납품 실적. 커버 여분 제공.", look: "a queen-size hot water heated mattress pad folded neatly with a small white boiler unit" }),
  P({ handle: "miso-humid-5", title: "미소 가습기 5L 초음파", brand: "miso", category: "health", price: 49000, moq: 10, lead: "즉시", specs: ["5L", "상부 급수", "습도 센서", "무드등"], desc: "학원·어린이집용. 상부 급수로 세척 간편.", look: "a white 5-liter ultrasonic humidifier with a top-fill tank and soft mist" }),
  P({ handle: "onnuri-smartplug-4", title: "온누리 스마트 멀티탭 4구 (Wi-Fi)", brand: "onnuri", category: "smart", price: 39000, moq: 10, lead: "즉시", badge: "신제품", specs: ["4구 개별제어", "전력 측정", "USB-C 2포트", "앱 스케줄"], desc: "사무실 대기전력 절감. 관리자 앱으로 일괄 제어.", look: "a white smart power strip with four outlets and USB-C ports, minimal design" }),
  P({ handle: "onnuri-cctv-2k", title: "온누리 실내 CCTV 2K 팬틸트", brand: "onnuri", category: "smart", price: 59000, moq: 5, lead: "즉시", specs: ["2K QHD", "팬틸트 360°", "양방향 통화", "SD/클라우드"], desc: "소규모 매장·창고용. 다중 카메라 앱 통합.", look: "a small white pan-tilt indoor security camera on a round base" }),
];

export const heroPrompts = {
  hero: "Wide editorial hero photo for a Korean B2B home-appliance marketplace: a bright modern showroom table with a neat arrangement of small appliances (rice cooker, air purifier, circulator fan, coffee machine), navy and warm orange accents, soft natural light, minimal, premium, no text, 16:9, photorealistic",
  brands: "Documentary-style photo inside a clean Korean small-factory assembly line for home appliances, workers in navy uniforms inspecting an air purifier, bright daylight, shallow depth of field, no text, 4:3, photorealistic",
};

export const byHandle = (h: string) => products.find((p) => p.handle === h);
export const brandOf = (p: Product) => brands.find((b) => b.handle === p.brand)!;
export const categoryOf = (p: Product) => categories.find((c) => c.handle === p.category)!;
export const won = (n: number) => n.toLocaleString("ko-KR") + "원";
