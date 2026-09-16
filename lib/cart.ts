"use client";
import { useSyncExternalStore } from "react";

// ponytail: localStorage 장바구니. 서버 연결 시 Medusa cart API 로 교체.
export type CartLine = { handle: string; qty: number };
const KEY = "jsn_cart";
const EV = "jsn_cart_change";

const read = (): CartLine[] => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};
const write = (lines: CartLine[]) => {
  localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(EV));
};

export const cart = {
  add(handle: string, qty: number) {
    const lines = read();
    const l = lines.find((x) => x.handle === handle);
    if (l) l.qty += qty; else lines.push({ handle, qty });
    write(lines);
  },
  setQty(handle: string, qty: number) {
    write(read().map((x) => (x.handle === handle ? { ...x, qty: Math.max(1, qty) } : x)));
  },
  remove(handle: string) { write(read().filter((x) => x.handle !== handle)); },
  clear() { write([]); },
};

let cache: CartLine[] = [];
let cacheRaw = "";
const snapshot = () => {
  const raw = localStorage.getItem(KEY) || "[]";
  if (raw !== cacheRaw) { cacheRaw = raw; cache = read(); }
  return cache;
};
const EMPTY: CartLine[] = [];
const subscribe = (cb: () => void) => {
  window.addEventListener(EV, cb);
  window.addEventListener("storage", cb);
  return () => { window.removeEventListener(EV, cb); window.removeEventListener("storage", cb); };
};

export const useCart = () => useSyncExternalStore(subscribe, snapshot, () => EMPTY);
