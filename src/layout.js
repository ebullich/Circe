import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ici = dirname(fileURLToPath(import.meta.url));
export const etab = JSON.parse(readFileSync(join(ici, '../content/etablissement.json'), 'utf8'));
export const horaires = JSON.parse(readFileSync(join(ici, '../content/horaires.json'), 'utf8'));
export const cartes = JSON.parse(readFileSync(join(ici, '../content/carte.json'), 'utf8'));

export const carte = (id) => cartes.cartes.find((c) => c.id === id);

export const navigation = [
  { url: '/restaurant-beaulieu-sur-mer/', titre: 'Le lieu' },
  { url: '/le-chef/', titre: 'Le chef' },
  { url: '/la-carte/', titre: 'La carte' },
  { url: '/brunch-beaulieu-sur-mer/', titre: 'Brunch' },
  { url: '/programme/', titre: 'Programme' },
  { url: '/privatisation-evenements/', titre: 'Privatiser' },
  { url: '/contact/', titre: 'Contact' }
];

export const e = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---- Données structurées ------------------------------------------------ */

const adressePostale = {
  '@type': 'PostalAddress',
  streetAddress: etab.adresse.rue,
  postalCode: etab.adresse.codePostal,
  addressLocality: etab.adresse.ville,
  addressRegion: etab.adresse.region,
  addressCountry: etab.adresse.pays
};

/* Les horaires ne partent en JSON-LD que s'ils ont été confirmés par le
   restaurant : mieux vaut aucune donnée qu'une donnée fausse. */
function ouvertures() {
  if (!horaires.confirme) return undefined;
  return horaires.services.map((s) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: s.jours,
    opens: s.ouvre,
    closes: s.ferme,
    name: s.service
  }));
}

export function restaurantLd() {
  return nettoie({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': etab.domaine + '/#restaurant',
    name: etab.nomComplet,
    alternateName: etab.nom,
    description: 'Restaurant méditerranéen, bar à cocktails et terrasse vue mer, installé dans la Rotonde Belle Époque au-dessus du port de Beaulieu-sur-Mer, face au Cap-Ferrat.',
    url: etab.domaine + '/',
    telephone: etab.telephone.affichage,
    email: etab.email,
    address: adressePostale,
    geo: { '@type': 'GeoCoordinates', latitude: etab.geo.lat, longitude: etab.geo.lon },
    hasMap: etab.itineraire,
    logo: etab.domaine + '/assets/logo/circe-beaulieu.png',
    image: [etab.domaine + '/assets/og/circe-og.png'],
    servesCuisine: etab.cuisine,
    priceRange: etab.gammeDePrix,
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cartes bancaires, espèces',
    acceptsReservations: etab.reservation,
    openingHoursSpecification: ouvertures(),
    sameAs: etab.reseaux,
    areaServed: etab.zonesDesservies.map((v) => ({ '@type': 'City', name: v })),
    hasMenu: etab.domaine + '/la-carte/',
    publicAccess: true,
    smokingAllowed: false
  });
}

/* Menu / MenuSection / MenuItem, engendrés depuis content/carte.json.
   Les prix ne partent en JSON-LD que lorsqu'ils sont réellement renseignés. */
export function menuLd(c) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Carte ${c.nom} — ${etab.nomComplet}`,
    url: etab.domaine + c.url,
    inLanguage: 'fr-FR',
    provider: { '@id': etab.domaine + '/#restaurant' },
    hasMenuSection: c.sections.map((s) => ({
      '@type': 'MenuSection',
      name: s.nom,
      hasMenuItem: s.plats.map((p) => {
        const item = { '@type': 'MenuItem', name: p.nom, description: p.desc };
        if (p.prix != null) item.offers = { '@type': 'Offer', price: p.prix, priceCurrency: 'EUR' };
        return item;
      })
    }))
  };
}

export function platsHtml(sections) {
  return sections.map((s) => `
    <div style="margin-top:clamp(2.5rem,5vw,4rem)">
      <h2 class="carte-section">${e(s.nom)}</h2>
      <div class="plats" style="margin-top:1.25rem">
        ${s.plats.map((p) => `<article class="plat">
          <span class="plat__nom">${e(p.nom)}</span>
          ${p.prix != null ? `<span class="plat__prix">${e(p.prix)} €</span>` : ''}
          <p class="plat__desc">${e(p.desc)}</p>
        </article>`).join('\n        ')}
      </div>
    </div>`).join('');
}

export function filAriane(chemin) {
  if (!chemin.length) return null;
  const items = [{ nom: 'Accueil', url: '/' }, ...chemin];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nom,
      item: etab.domaine + it.url
    }))
  };
}

export function faqLd(questions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.r.replace(/<[^>]+>/g, '') }
    }))
  };
}

function nettoie(o) {
  return JSON.parse(JSON.stringify(o, (k, v) => (v === undefined ? undefined : v)));
}

/* ---- Fragments de page -------------------------------------------------- */

export function faq(questions) {
  return `<div class="faq">${questions.map((q) => `
      <details>
        <summary>${q.q}</summary>
        <div class="reponse">${q.r}</div>
      </details>`).join('')}
  </div>`;
}

export function chapitre(num, titre) {
  return `<div class="chapitre">
      <span class="chapitre__num">${num}</span>
      <span class="chapitre__filet"></span>
      <h2 class="chapitre__titre">${titre}</h2>
    </div>`;
}

export function arche(legende, { classe = '', photo = true } = {}) {
  return `<figure class="arche ${classe}"${photo ? ` data-photo="${e(legende)}"` : ''}>
      ${photo ? '<span class="horizon"></span>' : ''}
    </figure>`;
}

export function horairesHtml() {
  const lignes = horaires.services.map((s) => `
      <div><dt>${e(s.service)}</dt><dd>${e(s.libelleJours)}, ${e(s.ouvre.replace(':', 'h'))} – ${e(s.ferme.replace(':', 'h'))}</dd></div>`).join('');
  return `<dl class="definitions">${lignes}
      <div><dt>Fermeture</dt><dd>${e(horaires.fermeture)}</dd></div>
    </dl>`;
}

function entete(url) {
  const lien = (n) => `<a href="${n.url}"${url === n.url ? ' aria-current="page"' : ''}>${n.titre}</a>`;
  return `<a class="evitement" href="#contenu">Aller au contenu</a>
  <header class="entete" data-fige="non">
    <a class="marque" href="/" aria-label="Circé, Beaulieu-sur-Mer — accueil">
      <img src="/assets/logo/circe-beaulieu.png" alt="Circé Beaulieu-sur-Mer" width="1600" height="635">
    </a>
    <nav class="nav" id="nav" aria-label="Navigation principale">
      ${navigation.map(lien).join('\n      ')}
      <a class="bouton" href="${etab.reservation}" target="_blank" rel="noopener">Réserver</a>
    </nav>
    <div class="entete__actions">
      <a class="bouton bouton--entete" href="${etab.reservation}" target="_blank" rel="noopener">Réserver</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="nav">
        <span></span><span></span>
        <span class="invisible">Menu</span>
      </button>
    </div>
  </header>`;
}

function pied() {
  return `<footer class="pied">
    <div class="enveloppe">
      <div class="pied__grille">
        <div>
          <h2 class="metal">Circé</h2>
          <p style="margin-top:1.1rem;max-width:34ch;color:var(--encre-douce)">
            La Rotonde, au-dessus du port de Beaulieu-sur-Mer. Cuisine méditerranéenne,
            bar à cocktails et terrasse face au Cap-Ferrat.
          </p>
          <div class="boutons" style="margin-top:2rem">
            <a class="bouton" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
          </div>
        </div>
        <div>
          <span class="fine">Nous trouver</span>
          <address>
            ${e(etab.adresse.rue)}<br>
            ${e(etab.adresse.codePostal)} ${e(etab.adresse.ville)}<br>
            ${e(etab.adresse.paysNom)}<br><br>
            <a href="${etab.telephone.lien}">${e(etab.telephone.affichage)}</a><br>
            <a href="mailto:${etab.email}">${e(etab.email)}</a><br><br>
            <a href="${etab.itineraire}" target="_blank" rel="noopener">Itinéraire</a>
          </address>
        </div>
        <div>
          <span class="fine">Le site</span>
          <ul>
            ${navigation.map((n) => `<li><a href="${n.url}">${n.titre}</a></li>`).join('\n            ')}
            <li><a href="${etab.bonCadeau}" target="_blank" rel="noopener">Bon cadeau</a></li>
            <li><a href="${etab.reseaux[0]}" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="${etab.reseaux[1]}" target="_blank" rel="noopener">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div class="pied__bas">
        <span>© ${new Date().getFullYear()} Circé — ${e(etab.nap)}</span>
        <nav aria-label="Informations légales">
          <a href="/mentions-legales/">Mentions légales</a>
          <a href="/mentions-legales/#confidentialite">Confidentialité</a>
        </nav>
      </div>
    </div>
  </footer>
  <nav class="barre-mobile" aria-label="Réservation rapide">
    <a href="${etab.reservation}" target="_blank" rel="noopener">Réserver</a>
    <a href="${etab.telephone.lien}">Appeler</a>
  </nav>`;
}

/* ---- Gabarit ------------------------------------------------------------ */

export function page(p) {
  const canonique = etab.domaine + p.url;
  const lds = [p.ld, filAriane(p.ariane || [])].flat().filter(Boolean);
  const ariane = (p.ariane || []).length
    ? `<nav class="ariane enveloppe" aria-label="Fil d'Ariane">
        <ol>
          <li><a href="/">Accueil</a></li>
          ${p.ariane.map((a, i) => (i === p.ariane.length - 1
            ? `<li aria-current="page">${e(a.nom)}</li>`
            : `<li><a href="${a.url}">${e(a.nom)}</a></li>`)).join('\n          ')}
        </ol>
      </nav>`
    : '';

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(p.titre)}</title>
<meta name="description" content="${e(p.description)}">
<link rel="canonical" href="${canonique}">
<meta name="theme-color" content="#0A1620">
<meta property="og:type" content="${p.url === '/' ? 'website' : 'article'}">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Circé — Beaulieu-sur-Mer">
<meta property="og:title" content="${e(p.titre)}">
<meta property="og:description" content="${e(p.description)}">
<meta property="og:url" content="${canonique}">
<meta property="og:image" content="${etab.domaine}/assets/og/circe-og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/logo/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Jost:wght@200;300;400&display=swap">
<link rel="stylesheet" href="/css/circe.css">
${lds.map((l) => `<script type="application/ld+json">${JSON.stringify(l)}</script>`).join('\n')}
</head>
<body>
${entete(p.url)}
${ariane}
<main id="contenu">
${p.corps}
</main>
${pied()}
<script src="/js/circe.js" defer></script>
</body>
</html>
`;
}
