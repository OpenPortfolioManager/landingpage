// Animations for the landing page. Everything is rendered in its final state at build time;
// this file only plays it in: reveal on scroll, count-ups, the demo tabs and simulated live ticks.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------- number formatting

const LOCALES: Record<string, string> = { en: "en-GB", pl: "pl-PL" };
const nfCache = new Map<string, Intl.NumberFormat>();
const nf = (lang: string, opts: Intl.NumberFormatOptions) => {
  const key = lang + JSON.stringify(opts);
  let f = nfCache.get(key);
  if (!f) nfCache.set(key, (f = new Intl.NumberFormat(LOCALES[lang] ?? "en-GB", opts)));
  return f;
};
export const formatValue = (v: number, fmt: string, lang: string, digits?: number, ccy = "PLN"): string => {
  const sign = v >= 0 ? "+" : "−";
  switch (fmt) {
    case "money":
      return nf(lang, { style: "currency", currency: ccy, minimumFractionDigits: digits ?? 0, maximumFractionDigits: digits ?? 0 }).format(v);
    case "smoney":
      return sign + nf(lang, { style: "currency", currency: ccy, minimumFractionDigits: digits ?? 0, maximumFractionDigits: digits ?? 0 }).format(Math.abs(v));
    case "spct":
      return sign + nf(lang, { style: "percent", minimumFractionDigits: digits ?? 2, maximumFractionDigits: digits ?? 2 }).format(Math.abs(v));
    case "pct":
      return nf(lang, { style: "percent", minimumFractionDigits: digits ?? 2, maximumFractionDigits: digits ?? 2 }).format(v);
    case "int":
      return nf(lang, { maximumFractionDigits: 0 }).format(Math.round(v));
    default:
      return nf(lang, { minimumFractionDigits: digits ?? 2, maximumFractionDigits: digits ?? 2 }).format(v);
  }
};

// ---------------------------------------------------------------- count-up

const counters = new WeakMap<HTMLElement, number>();
const countUp = (el: HTMLElement, ms = 1400) => {
  const to = Number(el.dataset.count);
  const fmt = el.dataset.fmt ?? "num";
  const lang = el.dataset.lang ?? "en";
  const digits = el.dataset.digits ? Number(el.dataset.digits) : undefined;
  const finalText = el.dataset.final ?? el.textContent ?? "";
  el.dataset.final = finalText;
  if (reduce || !Number.isFinite(to)) {
    el.textContent = finalText;
    return;
  }
  cancelAnimationFrame(counters.get(el) ?? 0);
  let start = -1;
  const tick = (now: number) => {
    if (start < 0) start = now;
    const k = Math.min(1, Math.max(0, (now - start) / ms));
    const eased = 1 - Math.pow(1 - k, 4);
    el.textContent = k >= 1 ? finalText : formatValue(to * eased, fmt, lang, digits, el.dataset.ccy);
    if (k < 1) counters.set(el, requestAnimationFrame(tick));
  };
  counters.set(el, requestAnimationFrame(tick));
};
const countAll = (scope: Element) => scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => countUp(el));

// ---------------------------------------------------------------- reveal on scroll

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("in");
      countAll(e.target);
      io.unobserve(e.target);
    }
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
);
document.querySelectorAll("[data-reveal], [data-animate]").forEach((el) => io.observe(el));

// ---------------------------------------------------------------- demo tabs

const replay = (pane: HTMLElement) => {
  pane.classList.remove("in");
  void pane.offsetWidth; // restart CSS transitions
  pane.classList.add("in");
  countAll(pane);
};

for (const demo of document.querySelectorAll<HTMLElement>("[data-demo]")) {
  const tabs = [...demo.querySelectorAll<HTMLButtonElement>("[role=tab]")];
  const panes = [...demo.querySelectorAll<HTMLElement>("[data-pane]")];
  const interval = Number(demo.dataset.interval ?? 7000);
  demo.style.setProperty("--interval", `${interval}ms`);
  let index = 0;
  let timer = 0;
  let visible = false;
  let manual = false;

  const show = (i: number, focus = false) => {
    index = (i + tabs.length) % tabs.length;
    tabs.forEach((t, j) => {
      t.setAttribute("aria-selected", String(j === index));
      t.tabIndex = j === index ? 0 : -1;
      // restart the progress bar
      const bar = t.querySelector<HTMLElement>("[data-progress]");
      if (bar && j === index) {
        bar.style.animation = "none";
        void bar.offsetWidth;
        bar.style.animation = "";
      }
    });
    panes.forEach((p, j) => (p.hidden = j !== index));
    replay(panes[index]);
    if (focus) tabs[index].focus();
    schedule();
  };
  const schedule = () => {
    clearTimeout(timer);
    if (manual || reduce || !visible || document.hidden || demo.classList.contains("paused")) return;
    timer = window.setTimeout(() => show(index + 1), interval);
  };

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => {
      manual = true;
      demo.classList.add("manual");
      show(i);
    });
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        manual = true;
        demo.classList.add("manual");
        show(index + (e.key === "ArrowRight" ? 1 : -1), true);
      }
    });
  });
  demo.addEventListener("pointerenter", () => {
    demo.classList.add("paused");
    clearTimeout(timer);
  });
  demo.addEventListener("pointerleave", () => {
    demo.classList.remove("paused");
    // the progress bar was paused mid-way; start the step again so bar and timer agree
    if (!manual) show(index);
  });
  document.addEventListener("visibilitychange", schedule);
  new IntersectionObserver(([e]) => {
    const was = visible;
    visible = e.isIntersecting;
    if (visible && !was) show(index);
    else if (!visible) clearTimeout(timer);
  }, { threshold: 0.25 }).observe(demo);
  if (reduce) demo.classList.add("manual");

  // Simulated quote ticks on the dashboard pane (demo data; the real app refreshes quotes every 5 minutes).
  const live = demo.querySelector<HTMLElement>("[data-live]");
  const lang = document.documentElement.lang || "en";
  if (live && !reduce) {
    const rows = [...live.querySelectorAll<HTMLElement>("[data-row]")];
    window.setInterval(() => {
      if (!visible || document.hidden || panes[index]?.dataset.pane !== "dashboard") return;
      const row = rows[Math.floor(Math.random() * rows.length)];
      const price = Number(row.dataset.price);
      const pct = Number(row.dataset.pct);
      const val = Number(row.dataset.val);
      const move = (Math.random() - 0.5) * 0.004;
      const nextPrice = price * (1 + move);
      const nextPct = (1 + pct) * (1 + move) - 1;
      const nextVal = val + (val / (pct || 0.0001)) * ((1 + pct) * move);
      row.dataset.price = String(nextPrice);
      row.dataset.pct = String(nextPct);
      row.dataset.val = String(nextVal);
      const up = move >= 0;
      const pctOut = row.querySelector<HTMLElement>("[data-pct-out]")!;
      const valOut = row.querySelector<HTMLElement>("[data-val-out]")!;
      const priceOut = row.querySelector<HTMLElement>("[data-price-out]")!;
      pctOut.textContent = formatValue(nextPct, "spct", lang);
      valOut.textContent = formatValue(nextVal, "smoney", lang, 2);
      priceOut.textContent = formatValue(nextPrice, "money", lang, 2, row.dataset.ccy);
      for (const [el, v] of [[pctOut, nextPct], [valOut, nextVal]] as const) {
        el.classList.toggle("text-gain", v >= 0);
        el.classList.toggle("text-loss", v < 0);
      }
      row.classList.remove("flash-up", "flash-down");
      void row.offsetWidth;
      row.classList.add(up ? "flash-up" : "flash-down");
    }, 1800);
  }
}

// ---------------------------------------------------------------- range switchers (benchmark section)

for (const sw of document.querySelectorAll<HTMLElement>("[data-ranges]")) {
  const buttons = [...sw.querySelectorAll<HTMLButtonElement>("[data-range-btn]")];
  const groups = [...sw.querySelectorAll<HTMLElement>("[data-range]")];
  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      groups.forEach((g) => {
        const on = g.dataset.range === b.dataset.rangeBtn;
        g.hidden = !on;
        if (on) replay(g);
      });
    }),
  );
}

// ---------------------------------------------------------------- screenshot tabs

for (const box of document.querySelectorAll<HTMLElement>("[data-shots]")) {
  const buttons = [...box.querySelectorAll<HTMLButtonElement>("[data-shot-btn]")];
  const shots = [...box.querySelectorAll<HTMLElement>("[data-shot]")];
  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      buttons.forEach((x) => x.setAttribute("aria-selected", String(x === b)));
      shots.forEach((s) => (s.hidden = s.dataset.shot !== b.dataset.shotBtn));
    }),
  );
}
