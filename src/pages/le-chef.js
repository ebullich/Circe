import { etab, chapitre, arche } from '../layout.js';

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: etab.chef,
  jobTitle: 'Chef de cuisine',
  worksFor: { '@id': etab.domaine + '/#restaurant' },
  url: etab.domaine + '/le-chef/'
};

export default {
  url: '/le-chef/',
  titre: 'Jean Christiansen, chef de Circé à Beaulieu-sur-Mer',
  description: 'Le chef Jean Christiansen signe une cuisine méditerranéenne de produits frais et locaux, terre et mer, au restaurant Circé à Beaulieu-sur-Mer.',
  ariane: [{ nom: 'Le chef', url: '/le-chef/' }],
  ld: [personLd],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>Jean Christiansen</h1>
    <p class="plomb">Une cuisine méditerranéenne de produits, sans démonstration.</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    <div class="duo duo--large-droite">
      <div>${arche('Portrait à produire — le chef Jean Christiansen', { classe: 'arche--haute' })}</div>
      <div class="prose">
        <p>
          Jean Christiansen dirige les cuisines de Circé. Sa Méditerranée n’est pas une carte
          postale : c’est un approvisionnement. Des poissons débarqués sur la côte, des légumes de
          l’arrière-pays niçois, des agrumes de la région, des herbes coupées au jardin le matin
          même, de l’huile d’olive et le feu.
        </p>
        <p>
          La carte reste courte. Elle change avec les arrivages, ce qui suppose de ne rien promettre
          qu’on ne puisse tenir : une pièce de poisson dépend du vent de la veille. Terre et mer se
          partagent l’affiche sans hiérarchie — les viandes au feu ont ici la même attention que les
          poissons entiers.
        </p>
        <p>
          Le geste est précis et discret. Peu d’éléments dans l’assiette, des cuissons justes, des
          sauces courtes. Ce qui doit se voir se voit ; le reste est du travail.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="section section--clair">
  <div class="enveloppe">
    ${chapitre('I', 'La Table du Chef')}
    <div class="duo">
      <div class="prose">
        <p>
          Une fois par mois, le chef reprend la main sur toute la salle : <strong>La Table du Chef</strong>
          est un menu en cinq temps, construit autour d’un produit, d’une saison ou d’un souvenir.
          Le thème change à chaque édition, le nombre de couverts est volontairement limité, et le
          chef passe en salle.
        </p>
        <p>
          C’est le rendez-vous où la cuisine prend la parole — celui que nous recommandons à qui veut
          comprendre ce qui se joue ici.
        </p>
        <div class="boutons" style="margin-top:2rem">
          <a class="bouton" href="/programme/">Voir les prochaines dates</a>
        </div>
      </div>
      <div>${arche('Photographie à produire — dressage d’un temps de la Table du Chef', { classe: 'arche--paysage' })}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="enveloppe">
    ${chapitre('II', 'Produits et producteurs')}
    <div class="prose">
      <p>
        La cuisine travaille en circuit court chaque fois que la qualité le permet : pêche locale,
        maraîchers des Alpes-Maritimes, huiles et agrumes de la région. Le jardin d’herbes de la
        Rotonde fournit les aromates du restaurant et du bar.
      </p>
      <p>
        <a class="lien" href="/la-carte/">Découvrir la carte</a>
      </p>
    </div>
    <div class="note-travail" style="margin-top:2.5rem;max-width:62ch">
      <b>À compléter par le restaurant</b>
      Liste nominative des producteurs partenaires, parcours du chef et distinctions éventuelles :
      ces éléments factuels n’ont pas été inventés. Transmettez-les et ils seront intégrés ici.
    </div>
  </div>
</section>

<section class="section section--nuit2">
  <div class="enveloppe enveloppe--etroite" style="text-align:center">
    <p class="citation" style="margin-inline:auto">Une carte courte est une promesse tenue.</p>
    <div class="boutons" style="justify-content:center;margin-top:2.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
    </div>
  </div>
</section>
`
};
