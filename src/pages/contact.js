import { etab, chapitre, horairesHtml, horaires, restaurantLd } from '../layout.js';

export default {
  url: '/contact/',
  titre: 'Contact, horaires et accès — Circé, Beaulieu-sur-Mer',
  description: 'Adresse, horaires, téléphone et accès du restaurant Circé, 2 avenue Fernand Dunan à Beaulieu-sur-Mer. Depuis Nice, Monaco, l’aéroport ou la gare.',
  ariane: [{ nom: 'Contact', url: '/contact/' }],
  ld: [restaurantLd()],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>Nous trouver</h1>
    <p class="plomb">Sur les hauteurs du port, entre Nice et Monaco.</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    <div class="duo">
      <div>
        <h2 class="invisible">Coordonnées</h2>
        <dl class="definitions">
          <div>
            <dt>Adresse</dt>
            <dd>
              <address style="font-style:normal">
                ${etab.adresse.rue}<br>
                ${etab.adresse.codePostal} ${etab.adresse.ville}<br>
                ${etab.adresse.paysNom}
              </address>
            </dd>
          </div>
          <div><dt>Téléphone</dt><dd><a class="lien" href="${etab.telephone.lien}">${etab.telephone.affichage}</a></dd></div>
          <div><dt>E-mail</dt><dd><a class="lien" href="mailto:${etab.email}">${etab.email}</a></dd></div>
          <div><dt>Réservation</dt><dd><a class="lien" href="${etab.reservation}" target="_blank" rel="noopener">Réserver en ligne</a></dd></div>
          <div><dt>Itinéraire</dt><dd><a class="lien" href="${etab.itineraire}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a></dd></div>
        </dl>
      </div>
      <div>
        <h2 class="invisible">Horaires</h2>
        ${horairesHtml()}
        ${horaires.confirme ? '' : `<div class="note-travail" style="margin-top:1.75rem">
          <b>Horaires à confirmer</b>
          ${horaires.note} Tant qu’ils ne sont pas validés, ils ne sont pas transmis à Google en
          données structurées : mieux vaut aucune information qu’une information fausse.
        </div>`}
      </div>
    </div>
  </div>
</section>

<section class="section section--clair">
  <div class="enveloppe">
    ${chapitre('I', 'Comment venir')}
    <div class="trio">
      <article class="prose">
        <h3>En voiture</h3>
        <p>
          Depuis <strong>Nice</strong>, comptez un quart d’heure par la Basse Corniche (D6098), le
          long de la mer ; depuis <strong>Monaco</strong>, une dizaine de minutes par la même route.
          Depuis l’A8, sortie Beaulieu-sur-Mer / Villefranche. L’<strong>aéroport Nice Côte d’Azur</strong>
          est à environ trente minutes.
        </p>
      </article>
      <article class="prose">
        <h3>En train</h3>
        <p>
          La gare de <strong>Beaulieu-sur-Mer</strong> est desservie par les TER de la ligne
          Nice – Vintimille : quelques minutes depuis Nice-Ville, une dizaine depuis Monaco-Monte-Carlo.
          Le restaurant est à moins de dix minutes à pied de la gare.
        </p>
      </article>
      <article class="prose">
        <h3>Stationnement</h3>
        <p>
          Le parking du port de plaisance est le plus proche. Le stationnement de surface existe sur
          les avenues alentour mais se remplit rapidement en saison et en soirée.
        </p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="enveloppe">
    ${chapitre('II', 'Le plan')}
    <div class="fenetre" style="display:grid;place-items:center;text-align:center;padding:2rem">
      <div>
        <p class="fine" style="margin-bottom:1.25rem">Carte Google — chargée au clic</p>
        <p style="max-width:40ch;margin-inline:auto;color:var(--encre-douce)">
          La carte n’est pas chargée automatiquement : une iframe Google Maps au chargement
          détruirait les performances de la page et déposerait des cookies avant votre accord.
        </p>
        <div class="boutons" style="justify-content:center;margin-top:2rem">
          <a class="bouton" href="${etab.itineraire}" target="_blank" rel="noopener">Ouvrir l’itinéraire</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--nuit2">
  <div class="enveloppe enveloppe--etroite" style="text-align:center">
    <p class="citation" style="margin-inline:auto">Une table se réserve mieux qu’elle ne se cherche.</p>
    <div class="boutons" style="justify-content:center;margin-top:2.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
      <a class="bouton bouton--nu" href="${etab.telephone.lien}">Appeler le restaurant</a>
    </div>
  </div>
</section>
`
};
