import { etab, carte, menuLd, platsHtml, arche } from '../layout.js';
const c = carte('diner');

export default {
  url: c.url,
  titre: 'Carte du dîner — restaurant Circé, Beaulieu-sur-Mer',
  description: 'La carte du dîner de Circé à Beaulieu-sur-Mer : poissons de la côte, viandes au feu, légumes du marché. Cuisine méditerranéenne du chef Jean Christiansen.',
  ariane: [{ nom: 'La carte', url: '/la-carte/' }, { nom: 'Dîner', url: c.url }],
  ld: [menuLd(c)],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>La carte du dîner</h1>
    <p class="plomb">${c.chapeau}</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    <div class="duo duo--large-droite" style="align-items:start">
      <div>${arche('Photographie à produire — poisson entier grillé au feu')}</div>
      <div class="prose">
        <p>
          Le dîner commence au coucher du soleil, sur la terrasse ou sous les baies de la Rotonde.
          La carte est volontairement courte : elle suit la pêche du jour et les légumes du
          maraîcher, et se réécrit à chaque changement de saison.
        </p>
        <p>
          Les grosses pièces — poisson en croûte de sel, côte de bœuf — se partagent à deux et se
          découpent en salle. Signalez vos allergies et régimes à la réservation : la cuisine
          s’adapte volontiers dès lors qu’elle est prévenue.
        </p>
        <p><a class="lien" href="/la-carte/cocktails/">Voir aussi la carte des cocktails</a></p>
      </div>
    </div>

    ${platsHtml(c.sections)}

    <div class="note-travail" style="margin-top:3rem;max-width:62ch">
      <b>Carte de démonstration</b>
      Les intitulés ci-dessus montrent la mise en page. Ils seront remplacés par la carte réelle,
      et les prix publiés après votre accord — ce sont deux leviers de référencement importants.
      Tout se modifie dans un seul fichier : <code>content/carte.json</code>.
    </div>

    <div class="boutons" style="margin-top:2.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
    </div>
  </div>
</section>
`
};
