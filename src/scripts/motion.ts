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
// data-ms sets the duration, data-delay holds the count at zero first.
const countUp = (el: HTMLElement, ms = Number(el.dataset.ms ?? 1400)) => {
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
  const delay = Number(el.dataset.delay ?? 0);
  let start = -1;
  const tick = (now: number) => {
    if (start < 0) start = now + delay;
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

// ---------------------------------------------------------------- switchers that advance on their own (spaces, alert channels)

for (const box of document.querySelectorAll<HTMLElement>("[data-cycle]")) {
  const tabs = [...box.querySelectorAll<HTMLButtonElement>("[data-cycle-btn]")];
  const panes = [...box.querySelectorAll<HTMLElement>("[data-cycle-pane]")];
  const interval = Number(box.dataset.interval ?? 4000);
  box.style.setProperty("--interval", `${interval}ms`);
  let index = 0;
  let timer = 0;
  let visible = false;
  let manual = reduce;
  if (manual) box.classList.add("manual");

  const restartBar = () => {
    const bar = tabs[index].querySelector<HTMLElement>("[data-progress]");
    if (!bar) return;
    bar.style.animation = "none";
    void bar.offsetWidth;
    bar.style.animation = "";
  };
  const schedule = () => {
    clearTimeout(timer);
    if (manual || !visible || document.hidden || box.classList.contains("paused")) return;
    timer = window.setTimeout(() => show(index + 1), interval);
  };
  const show = (i: number, focus = false) => {
    index = (i + tabs.length) % tabs.length;
    tabs.forEach((t, j) => {
      t.setAttribute("aria-selected", String(j === index));
      t.tabIndex = j === index ? 0 : -1;
    });
    panes.forEach((p, j) => (p.hidden = j !== index));
    replay(panes[index]);
    restartBar();
    if (focus) tabs[index].focus();
    schedule();
  };
  const pick = (i: number, focus = false) => {
    manual = true;
    box.classList.add("manual");
    show(i, focus);
  };

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => pick(i));
    t.addEventListener("keydown", (e) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      pick(index + step, true);
    });
  });
  box.addEventListener("pointerenter", () => {
    box.classList.add("paused");
    clearTimeout(timer);
  });
  box.addEventListener("pointerleave", () => {
    box.classList.remove("paused");
    restartBar();
    schedule();
  });
  document.addEventListener("visibilitychange", schedule);
  new IntersectionObserver(
    ([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) show(index);
      else if (!visible) clearTimeout(timer);
    },
    { threshold: 0.3 },
  ).observe(box);
}

// ---------------------------------------------------------------- XTB report guide (cursor and highlight over an SVG of xStation)

const easeOut = (k: number) => 1 - Math.pow(1 - k, 4);

for (const guide of document.querySelectorAll<HTMLElement>("[data-guide]")) {
  const steps = [...guide.querySelectorAll<HTMLButtonElement>("[data-guide-step]")];
  const ring = guide.querySelector<SVGRectElement>("[data-guide-ring]")!;
  const badge = guide.querySelector<SVGGElement>("[data-guide-badge]")!;
  const cursor = guide.querySelector<SVGGElement>("[data-guide-cursor]")!;
  const click = guide.querySelector<SVGElement>("[data-guide-click]")!;
  const toggle = guide.querySelector<HTMLButtonElement>("[data-guide-toggle]");
  const ms = Number(guide.dataset.stepMs ?? 2800);
  const boxOf = (i: number) => steps[i].dataset.box!.split(" ").map(Number);
  let at = boxOf(0);
  let index = 0;
  let timer = 0;
  let frame = 0;
  let clickTimer = 0;
  let visible = false;
  let hover = false;
  let playing = !reduce;

  // The highlight hugs the control; the cursor points at it a little right of its centre.
  const draw = ([x, y, w, h]: number[]) => {
    ring.setAttribute("x", String(x - 4));
    ring.setAttribute("y", String(y - 4));
    ring.setAttribute("width", String(w + 8));
    ring.setAttribute("height", String(h + 8));
    badge.setAttribute("transform", `translate(${x - 4} ${y - 4})`);
    cursor.setAttribute("transform", `translate(${x + w * 0.6} ${y + h * 0.6})`);
  };
  const moveTo = (to: number[]) => {
    cancelAnimationFrame(frame);
    if (reduce) {
      draw((at = to));
      return;
    }
    const from = at;
    let start = -1;
    const tick = (now: number) => {
      if (start < 0) start = now;
      const k = easeOut(Math.min(1, (now - start) / 650));
      at = from.map((v, j) => v + (to[j] - v) * k);
      draw(at);
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };
  const schedule = () => {
    clearTimeout(timer);
    if (!playing || hover || !visible || document.hidden) return;
    timer = window.setTimeout(() => go(index + 1), ms);
  };
  const go = (i: number) => {
    index = (i + steps.length) % steps.length;
    const s = steps[index];
    guide.dataset.scene = s.dataset.scene;
    guide.dataset.flags = s.dataset.flags ?? "";
    steps.forEach((b, j) => (j === index ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));
    badge.querySelector("text")!.textContent = String(index + 1);
    moveTo(boxOf(index));
    clearTimeout(clickTimer);
    click.classList.remove("go");
    if (!reduce) clickTimer = window.setTimeout(() => click.classList.add("go"), 700);
    schedule();
  };
  const setPlaying = (on: boolean) => {
    playing = on;
    if (toggle) {
      toggle.setAttribute("aria-label", (on ? toggle.dataset.pause : toggle.dataset.play) ?? "");
      toggle.querySelector<HTMLElement>("[data-icon=pause]")!.hidden = !on;
      toggle.querySelector<HTMLElement>("[data-icon=play]")!.hidden = on;
    }
    schedule();
  };

  steps.forEach((b, i) => b.addEventListener("click", () => go(i)));
  toggle?.addEventListener("click", () => setPlaying(!playing));
  setPlaying(playing);
  guide.addEventListener("pointerenter", () => {
    hover = true;
    clearTimeout(timer);
  });
  guide.addEventListener("pointerleave", () => {
    hover = false;
    schedule();
  });
  document.addEventListener("visibilitychange", schedule);
  new IntersectionObserver(
    ([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) go(index);
      else if (!visible) clearTimeout(timer);
    },
    { threshold: 0.3 },
  ).observe(guide);
}

// ---------------------------------------------------------------- win rate: closed trades counted one by one

for (const wr of document.querySelectorAll<HTMLElement>("[data-winrate]")) {
  if (reduce) continue; // the final numbers are rendered at build time
  const rows = [...wr.querySelectorAll<HTMLElement>("[data-wr-row]")];
  const rate = wr.querySelector<HTMLElement>("[data-wr-rate]")!;
  const sub = wr.querySelector<HTMLElement>("[data-wr-sub]")!;
  const lang = wr.dataset.lang ?? "en";
  const step = Number(wr.dataset.step ?? 420);
  const show = (n: number) => {
    const wins = rows.slice(0, n).filter((r) => r.dataset.win === "1").length;
    rate.textContent = formatValue(wins / n, "pct", lang, 0);
    sub.textContent = sub.dataset.tpl!.replace("{w}", String(wins)).replace("{n}", String(n));
  };
  // Rows pop in at 200 + i * step ms (CSS); the count follows each one as it lands.
  new IntersectionObserver(
    ([e], obs) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      show(1);
      rows.forEach((_, i) => i && window.setTimeout(() => show(i + 1), 320 + i * step));
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  ).observe(wr);
}

// ---------------------------------------------------------------- upload demo: plays each time it scrolls into view, and on request

for (const up of document.querySelectorAll<HTMLElement>("[data-upload]")) {
  let inView = false;
  new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting && !inView) replay(up);
      inView = e.isIntersecting;
    },
    { threshold: 0.35 },
  ).observe(up);
  up.querySelector("[data-upload-replay]")?.addEventListener("click", () => replay(up));
}
