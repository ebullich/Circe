/* Contrôle de contraste WCAG 2.2 AA sur le texte de toutes les pages.
   Usage : node tests/contraste.mjs  (site servi sur http://127.0.0.1:4321)
   Les fonds en dégradé sont évalués sur chacune de leurs bornes : c'est la
   plus défavorable qui compte. */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://127.0.0.1:4321';
const urls = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname);

const nav = await chromium.launch();
const anomalies = [];

for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const ctx = await nav.newContext({ viewport: vp });
  const p = await ctx.newPage();
  for (const u of urls) {
    await p.goto(BASE + u, { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => {
      const parse = (c) => {
        const n = (c.match(/-?[\d.]+(?:e-?\d+)?/g) || []).map(Number);
        if (c.startsWith('color(')) return [n[0] * 255, n[1] * 255, n[2] * 255, n[3] ?? 1];
        return [n[0], n[1], n[2], n[3] ?? 1];
      };
      const lum = ([r, g, b]) => {
        const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
      /* Toutes les couleurs de fond candidates pour un élément. */
      const fonds = (el) => {
        let n = el;
        while (n && n !== document.documentElement) {
          const cs = getComputedStyle(n);
          const img = cs.backgroundImage;
          /* Un dégradé ne compte comme fond que s'il couvre réellement l'élément :
             le soulignement animé des liens est un dégradé de 1 px de haut. */
          const taille = cs.backgroundSize;
          const couvre = !/\dpx/.test(taille.split(' ').slice(-1)[0] || '')
            || parseFloat(taille.split(' ').slice(-1)[0]) >= n.offsetHeight * 0.9;
          if (img && img.includes('gradient') && couvre) {
            const stops = [...img.matchAll(/rgba?\([^)]*\)|#[0-9a-fA-F]{6}/g)]
              .map((m) => (m[0][0] === '#' ? hex(m[0]) : parse(m[0]).slice(0, 3)));
            if (stops.length) return stops;
          }
          const c = parse(cs.backgroundColor);
          if (c[3] > 0.5) return [c.slice(0, 3)];
          n = n.parentElement;
        }
        return [[10, 22, 32]];
      };
      const sur = (fg, bg) => fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]));
      const out = [];
      document.querySelectorAll('p,li,a,dt,dd,h1,h2,h3,h4,span,summary,address,button').forEach((el) => {
        const propre = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
        if (!propre || el.offsetParent === null) return;
        const cs = getComputedStyle(el);
        const fgb = parse(cs.color);
        if (fgb[3] === 0 || cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)') return;
        const px = parseFloat(cs.fontSize);
        const gros = px >= 24 || (px >= 18.66 && parseInt(cs.fontWeight) >= 700);
        const min = gros ? 3 : 4.5;
        let pire = Infinity;
        for (const bg of fonds(el)) {
          const l1 = lum(sur(fgb, bg)), l2 = lum(bg);
          pire = Math.min(pire, (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
        }
        if (pire < min) out.push({ t: el.textContent.trim().slice(0, 40), px: px.toFixed(1), ratio: pire.toFixed(2), min });
      });
      return out;
    });
    for (const a of r) anomalies.push({ url: u, largeur: vp.width, ...a });
  }
  await ctx.close();
}
await nav.close();

console.log(`\n${urls.length} pages contrôlées en 1440 px et 390 px.`);
if (anomalies.length) {
  console.log(`\n${anomalies.length} texte(s) sous le seuil AA :`);
  for (const a of anomalies) console.log(`  ✗ ${a.url} (${a.largeur}px) — ${a.ratio}:1 pour ${a.min}:1 requis — ${a.px}px — « ${a.t} »`);
  process.exit(1);
}
console.log('Contraste WCAG AA : conforme.');
