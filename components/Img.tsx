"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// 이미지가 없으면(아직 Higgsfield 미생성) fallback 렌더. 하이드레이션 전 404 도 마운트 시 재확인.
export default function Img({ src, alt = "", className = "", fallback }: { src: string; alt?: string; className?: string; fallback: ReactNode }) {
  const [broken, setBroken] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => { const i = ref.current; if (i?.complete && i.naturalWidth === 0) setBroken(true); }, []);
  if (broken) return <>{fallback}</>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={src} alt={alt} onError={() => setBroken(true)} className={className} />;
}
