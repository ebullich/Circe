/* Prépare un aperçu consultable en ligne à partir de dist/.
   L'hébergement d'aperçu ne sert que des fichiers, pas des dossiers : les URL
   propres du site (/la-carte/diner/) deviennent des fichiers plats
   (la-carte-diner.html) et tous les liens racine deviennent relatifs.
   La production, elle, garde ses vraies URL : ce script ne touche pas à dist/. */
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SOURCE = 'dist';
const SORTIE = 'apercu';

rmSync(SORTIE, { recursive: true, force: true });
mkdirSync(SORTIE, { recursive: true });

/* Recense les pages de dist/ et calcule leur nom de fichier plat. */
function pages(dossier, prefixe = '') {
  const out = [];
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) out.push(...pages(chemin, prefixe + nom + '/'));
    else if (nom === 'index.html') out.push({ url: '/' + prefixe, chemin });
  }
  return out;
}

const liste = pages(SOURCE).sort((a, b) => b.url.length - a.url.length);
const plat = (url) => (url === '/' ? 'index.html' : url.replace(/^\/|\/$/g, '').replace(/\//g, '-') + '.html');

/* Réécrit les liens absolus d'un document. */
function relier(html) {
  for (const p of liste) {
    const f = plat(p.url);
    html = html.split(`href="${p.url}"`).join(`href="${f}"`);
    html = html.split(`href="${p.url}#`).join(`href="${f}#`);
  }
  return html
    .split('href="/css/').join('href="css/')
    .split('src="/js/').join('src="js/')
    .split('href="/assets/').join('href="assets/')
    .split('src="/assets/').join('src="assets/');
}

const css = readFileSync(join(SOURCE, 'css/circe.css'), 'utf8');
const js = readFileSync(join(SOURCE, 'js/circe.js'), 'utf8');
const fichiers = [];

for (const p of liste) {
  const html = relier(readFileSync(p.chemin, 'utf8'));
  const nom = plat(p.url);

  if (p.url === '/') {
    /* La page d'entrée est enveloppée par l'hébergeur : on lui livre le contenu
       seul, feuille de style et script compris en ligne. */
    /* L'aperçu porte le nom de la maison ; le titre de référencement de la
       vraie page d'accueil reste intact dans dist/. */
    const titre = 'Circé Beaulieu-sur-Mer';
    const polices = (html.match(/<link rel="stylesheet" href="https:\/\/fonts[^>]*>/) || [''])[0];
    const corps = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'))
      .replace(/<script src="js\/circe.js" defer><\/script>/, '');
    writeFileSync(join(SORTIE, 'index.html'),
`<title>${titre}</title>
${polices}
<style>
${css}
</style>
${corps}
<script>
${js}
</script>
`);
  } else {
    writeFileSync(join(SORTIE, nom), html);
    fichiers.push(nom);
  }
}

cpSync(join(SOURCE, 'css'), join(SORTIE, 'css'), { recursive: true });
cpSync(join(SOURCE, 'js'), join(SORTIE, 'js'), { recursive: true });
cpSync(join(SOURCE, 'assets'), join(SORTIE, 'assets'), { recursive: true });

console.log('Aperçu écrit dans', SORTIE + '/');
console.log('Pages :', ['index.html', ...fichiers].join(', '));
