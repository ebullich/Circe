/* Contrôle qualité SEO et accessibilité sur toutes les pages du sitemap.
   Usage : node tests/seo.mjs   (le site doit être servi sur http://127.0.0.1:4321)
   Aucune dépendance : tout est vérifié dans le HTML brut, sans exécuter de JavaScript —
   c'est précisément ce que voit Googlebot au premier passage. */
import { readFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://127.0.0.1:4321';
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const erreurs = [];
const titres = new Map();
const descs = new Map();
let nb = 0;

for (const url of urls) {
  const r = await fetch(BASE + url);
  if (!r.ok) { erreurs.push(`${url} — statut ${r.status}`); continue; }
  const html = await r.text();
  nb++;
  const ko = (m) => erreurs.push(`${url} — ${m}`);

  const titre = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (titre.length < 30 || titre.length > 65) ko(`title de ${titre.length} caractères (attendu 30-65) : « ${titre} »`);
  if (titres.has(titre)) ko(`title dupliqué avec ${titres.get(titre)}`); else titres.set(titre, url);

  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (desc.length < 120 || desc.length > 165) ko(`meta description de ${desc.length} caractères (attendu 120-165)`);
  if (descs.has(desc)) ko(`meta description dupliquée avec ${descs.get(desc)}`); else descs.set(desc, url);

  const h1 = html.match(/<h1[\s>]/g) || [];
  if (h1.length !== 1) ko(`${h1.length} balises h1 (attendu 1)`);

  const niveaux = [...html.matchAll(/<h([1-4])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < niveaux.length; i++) {
    if (niveaux[i] - niveaux[i - 1] > 1) ko(`saut de niveau de titre h${niveaux[i - 1]} vers h${niveaux[i]}`);
  }

  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (!canon || !canon.startsWith('https://')) ko('canonique absente ou non absolue');
  if (canon && !canon.endsWith(url)) ko(`canonique incohérente : ${canon}`);

  const lds = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!lds.length) ko('aucune donnée structurée');
  for (const [, json] of lds) {
    try { JSON.parse(json); } catch (e) { ko('JSON-LD non parsable : ' + e.message); }
  }

  for (const [, balise] of html.matchAll(/<img([^>]*)>/g)) {
    if (!/alt="[^"]+"/.test(balise)) ko('image sans attribut alt utile : ' + balise.trim().slice(0, 70));
  }

  /* Le contenu principal doit être dans le HTML servi, sans JavaScript. */
  const texte = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (texte.length < 900) ko(`seulement ${texte.length} caractères de texte dans le HTML brut`);

  /* Aucun lien interne cassé. */
  for (const [, href] of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const rep = await fetch(BASE + href, { redirect: 'manual' });
    if (rep.status !== 200) ko(`lien interne ${href} → statut ${rep.status}`);
  }

  /* Le NAP doit être strictement identique partout. */
  if (!html.includes('2 avenue Fernand Dunan')) ko('adresse absente de la page');
  if (!html.includes('+33 4 22 45 05 80')) ko('téléphone absent de la page');
}

console.log(`\n${nb} pages contrôlées.`);
if (erreurs.length) {
  console.log(`\n${erreurs.length} anomalie(s) :`);
  for (const e of erreurs) console.log('  ✗', e);
  process.exit(1);
}
console.log('Aucune anomalie.');
