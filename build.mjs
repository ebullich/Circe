/* Génération du site statique. Aucune dépendance : node build.mjs */
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { page, etab } from './src/layout.js';

const SORTIE = 'dist';
const modules = [
  './src/pages/accueil.js',
  './src/pages/le-lieu.js',
  './src/pages/le-chef.js',
  './src/pages/la-carte.js',
  './src/pages/carte-diner.js',
  './src/pages/carte-cocktails.js',
  './src/pages/brunch.js',
  './src/pages/programme.js',
  './src/pages/privatisation.js',
  './src/pages/contact.js',
  './src/pages/mentions-legales.js'
];

rmSync(SORTIE, { recursive: true, force: true });
mkdirSync(SORTIE, { recursive: true });

const pages = [];
for (const m of modules) {
  if (!existsSync(m.replace('./', ''))) { console.warn('  ignoré (absent) :', m); continue; }
  const { default: p } = await import(m);
  pages.push(p);
  const chemin = join(SORTIE, p.url === '/' ? 'index.html' : p.url.replace(/^\/|\/$/g, '') + '/index.html');
  mkdirSync(dirname(chemin), { recursive: true });
  writeFileSync(chemin, page(p));
  console.log('  ✓', p.url);
}

/* Ressources */
cpSync('src/styles', join(SORTIE, 'css'), { recursive: true });
cpSync('src/scripts', join(SORTIE, 'js'), { recursive: true });
cpSync('assets', join(SORTIE, 'assets'), { recursive: true });

/* Sitemap — lastmod réel, tiré de la date du fichier source */
const urls = pages.map((p) => {
  const src = modules.find((m) => m.includes(nomFichier(p.url)));
  const d = src && existsSync(src.replace('./', '')) ? statSync(src.replace('./', '')).mtime : new Date();
  return `  <url>
    <loc>${etab.domaine}${p.url}</loc>
    <lastmod>${d.toISOString().slice(0, 10)}</lastmod>
    <priority>${p.url === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
}).join('\n');

writeFileSync(join(SORTIE, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

writeFileSync(join(SORTIE, 'robots.txt'),
`User-agent: *
Allow: /

Sitemap: ${etab.domaine}/sitemap.xml
`);

/* Redirections 301 depuis les anciennes URL Squarespace (Netlify / Vercel) */
writeFileSync(join(SORTIE, '_redirects'),
`# Anciennes URL Squarespace -> nouvelles URL. Une seule étape, jamais de chaîne.
/menus                       /la-carte/                      301
/menu                        /la-carte/                      301
/menu-brunch                 /brunch-beaulieu-sur-mer/       301
/brunch                      /brunch-beaulieu-sur-mer/       301
/concept                     /restaurant-beaulieu-sur-mer/   301
/events                      /programme/                     301
/evenements                  /programme/                     301
/la-table-du-chef            /programme/                     301
/vente-emporter-traiteur     /privatisation-evenements/      301
/privatisation               /privatisation-evenements/      301
/presse                      /                               301
/politique-de-confidentialite /mentions-legales/             301
/cart                        /                               301
/fr/*                        /:splat                         301
`);

function nomFichier(url) {
  if (url === '/') return 'accueil';
  return url.replace(/^\/|\/$/g, '').split('/').pop();
}

console.log(`\n${pages.length} pages générées dans ${SORTIE}/`);
