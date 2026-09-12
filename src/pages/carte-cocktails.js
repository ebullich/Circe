import { etab, carte, menuLd, platsHtml, arche } from '../layout.js';
const c = carte('cocktails');

export default {
  url: c.url,
  titre: 'Bar à cocktails à Beaulieu-sur-Mer — la carte de Circé',
  description: 'Le bar à cocktails de Circé à Beaulieu-sur-Mer : macérations maison, herbes du jardin, philtres signature et classiques revisités, face au Cap-Ferrat.',
  ariane: [{ nom: 'La carte', url: '/la-carte/' }, { nom: 'Cocktails', url: c.url }],
  ld: [menuLd(c)],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>Le bar à cocktails</h1>
    <p class="plomb">${c.chapeau}</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    <div class="duo duo--large-droite" style="align-items:start">
      <div>${arche('Photographie à produire — préparation d’un cocktail signature')}</div>
      <div class="prose">
        <p>
          Dans l’Odyssée, Circé prépare des philtres. Le bar a pris la métaphore au mot : macérations
          maison, infusions d’herbes coupées au jardin de la Rotonde, amers élaborés sur place,
          agrumes de la région. Les signatures portent des noms empruntés au récit ; le reste est
          affaire de dosage.
        </p>
        <p>
          Le comptoir se visite pour lui-même, avant ou après la table, ou sans table du tout. En
          soirée, DJ sets et musique live prennent le relais —
          <a class="lien" href="/programme/">voir le programme</a>.
        </p>
      </div>
    </div>

    ${platsHtml(c.sections)}

    <div class="note-travail" style="margin-top:3rem;max-width:62ch">
      <b>Carte de démonstration</b>
      Intitulés et compositions à remplacer par la carte réelle du bar, prix à publier après
      validation. Fichier à modifier : <code>content/carte.json</code>.
    </div>

    <div class="boutons" style="margin-top:2.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
    </div>
  </div>
</section>
`
};
