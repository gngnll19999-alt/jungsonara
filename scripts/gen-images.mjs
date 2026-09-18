// Higgsfield 로 히어로/브랜드/상품 이미지 생성 → public/img/*.jpg (로고는 public/img/logo-icon.svg 고정)
// 사용: .env.local 에 HF_CREDENTIALS=KEY_ID:KEY_SECRET (console.higgsfield.ai) 넣고  npm run gen:images
// 이미 있는 파일은 건너뜀. 특정 것만 다시 만들려면 파일 지우고 재실행.
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

try { process.loadEnvFile(".env.local"); } catch {}
if (!process.env.HF_CREDENTIALS) {
  console.error("HF_CREDENTIALS 가 없습니다. .env.local 에 HF_CREDENTIALS=KEY_ID:KEY_SECRET 추가하세요.");
  process.exit(1);
}

const { higgsfield, config } = await import("@higgsfield/client/v2");
const { products, heroPrompts } = await import("../lib/data.ts");
config({ credentials: process.env.HF_CREDENTIALS });

const MODEL = process.env.HF_MODEL || "flux-pro/kontext/max/text-to-image";
const OUT = path.resolve("public/img");
await mkdir(OUT, { recursive: true });

const jobs = [
  { name: "hero", prompt: heroPrompts.hero, aspect_ratio: "16:9" },
  { name: "brands", prompt: heroPrompts.brands, aspect_ratio: "4:3" },
  ...products.map((p) => ({ name: p.handle, prompt: p.imagePrompt, aspect_ratio: "1:1" })),
];

const exists = (f) => access(f).then(() => true, () => false);

async function gen({ name, prompt, aspect_ratio, ext = "jpg" }) {
  const file = path.join(OUT, `${name}.${ext}`);
  if (await exists(file)) return console.log("skip ", name);
  const set = await higgsfield.subscribe(MODEL, { input: { prompt, aspect_ratio }, withPolling: true });
  const url = set.jobs?.[0]?.results?.raw?.url;
  if (!set.isCompleted || !url) throw new Error(`${name}: 실패 ${JSON.stringify(set.jobs?.[0]?.status ?? set)}`);
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(file, buf);
  console.log("done ", name, (buf.length / 1024).toFixed(0) + "KB");
}

// ponytail: 동시 3개. 429 뜨면 CONC 낮추기.
const CONC = Number(process.env.HF_CONC || 3);
let i = 0, fail = 0;
await Promise.all(Array.from({ length: CONC }, async () => {
  while (i < jobs.length) {
    const j = jobs[i++];
    try { await gen(j); } catch (e) { fail++; console.error("FAIL ", j.name, e.message); }
  }
}));
console.log(`끝. 실패 ${fail}/${jobs.length}`);
