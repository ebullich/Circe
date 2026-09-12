import { etab, carte, menuLd, platsHtml, sommaireCarte, arche } from '../layout.js';
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
          Le service du soir commence à 18h, du mercredi au samedi, sur la terrasse ou sous les
          baies de la Rotonde. La carte suit la pêche du jour et les arrivages : la pièce
          d’exception et le poisson entier sont annoncés en salle.
        </p>
        <p>
          Les grandes pièces — côte de bœuf Black Angus, homard bleu, carré d’agneau, plateaux de
          fruits de mer — se partagent et se découpent en salle. Signalez vos allergies et régimes
          à la réservation : la cuisine s’adapte volontiers dès lors qu’elle est prévenue.
        </p>
        <p>
          Les prix s’entendent en euros, service compris. La pêche du jour et les pièces
          d’exception sont annoncées en salle.
          <a class="lien" href="/la-carte/cocktails/">Voir aussi la carte des cocktails</a>.
        </p>
      </div>
    </div>

    ${sommaireCarte(c.sections)}

    ${platsHtml(c.sections)}

    <div class="boutons" style="margin-top:3.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
    </div>
  </div>
</section>
`
};
