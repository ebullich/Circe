import { etab, chapitre, arche, faq, faqLd } from '../layout.js';

const questions = [
  { q: 'Peut-on privatiser le restaurant en entier ?',
    r: '<p>Oui. La Rotonde se privatise en totalité, ou espace par espace : salle, terrasse, bar et lounge, jardin. Le choix dépend du nombre d’invités, de la saison et du format souhaité — dîner assis, cocktail dînatoire, réception debout.</p>' },
  { q: 'Organisez-vous des mariages ?',
    r: '<p>La vue sur la Baie des Fourmis et le Cap-Ferrat fait de la terrasse un lieu de réception recherché sur la Riviera. Nous accompagnons la partie réception : cocktail, dîner, soirée. Contactez-nous très en amont pour les dates d’été.</p>' },
  { q: 'Et pour un séminaire ou une réunion d’entreprise ?',
    r: '<p>Le lieu accueille séminaires, petits-déjeuners de travail, présentations et dîners d’entreprise. Précisez vos besoins techniques dans votre demande de devis.</p>' },
  { q: 'Proposez-vous un traiteur ou de la vente à emporter ?',
    r: '<p>Oui : traiteur, plats à emporter et paniers pique-nique pour les sorties en bateau au départ du port de Beaulieu-sur-Mer. Les commandes se font par téléphone ou par e-mail.</p>' },
  { q: 'Comment obtenir un devis ?',
    r: `<p>Écrivez-nous à <a class="lien" href="mailto:${etab.email}">${etab.email}</a> ou appelez le <a class="lien" href="${etab.telephone.lien}">${etab.telephone.affichage}</a> en indiquant la date, le nombre d’invités, le format et l’espace envisagé. Nous revenons vers vous avec une proposition chiffrée.</p>` }
];

export default {
  url: '/privatisation-evenements/',
  titre: 'Privatisation et mariages à Beaulieu-sur-Mer — Circé',
  description: 'Privatisez la Rotonde à Beaulieu-sur-Mer : mariage vue mer, anniversaire, séminaire ou cocktail dînatoire, face au Cap-Ferrat. Devis sur demande.',
  ariane: [{ nom: 'Privatisation', url: '/privatisation-evenements/' }],
  ld: [faqLd(questions)],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>Privatiser<br>la Rotonde</h1>
    <p class="plomb">Mariages, anniversaires, séminaires et réceptions face au Cap-Ferrat.</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe enveloppe--large">
    <div class="fenetre" role="img" aria-label="La terrasse de Circé dressée pour une réception privée"></div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    ${chapitre('I', 'Un lieu, quatre décors')}
    <div class="prose" style="margin-bottom:clamp(2rem,4vw,3rem)">
      <p>
        Peu d’adresses sur la Côte d’Azur réunissent une salle Belle Époque, une terrasse en
        surplomb de la mer, un bar de mixologie et un jardin dans le même périmètre. La Rotonde se
        privatise en entier ou par espace, selon le nombre d’invités et le déroulé souhaité.
      </p>
    </div>
    <div class="trio">
      <article class="prose">
        <h3>La terrasse</h3>
        <p>Vue sur la Baie des Fourmis et le Cap-Ferrat. Cocktails, dîners d’été, cérémonies au coucher du soleil.</p>
      </article>
      <article class="prose">
        <h3>La salle</h3>
        <p>Sous la rotonde et ses baies cintrées. Dîners assis, repas d’affaires, réceptions en toute saison.</p>
      </article>
      <article class="prose">
        <h3>Le bar et le jardin</h3>
        <p>Pour les formats debout : cocktail dînatoire, afterwork, soirée dansante avec DJ.</p>
      </article>
    </div>
    <div class="note-travail" style="margin-top:3rem;max-width:62ch">
      <b>À confirmer par le restaurant</b>
      Capacités exactes par espace (assis et debout), formules et budgets minimum, équipements
      techniques disponibles. Ces chiffres n’ont pas été estimés : ils seront publiés tels que vous
      les fournirez.
    </div>
  </div>
</section>

<section class="section section--clair">
  <div class="enveloppe">
    ${chapitre('II', 'Traiteur, emporté et paniers bateau')}
    <div class="duo duo--large-gauche">
      <div class="prose">
        <p>
          La cuisine sort aussi de la Rotonde. Nous préparons des prestations traiteur pour les
          réceptions à domicile ou en villa sur la Riviera, des plats à emporter, et des
          <strong>paniers pique-nique</strong> pour les sorties en mer au départ du port de
          Beaulieu-sur-Mer ou de Saint-Jean-Cap-Ferrat.
        </p>
        <p>
          Les <strong>bons cadeaux</strong> Circé s’offrent en ligne et s’utilisent sur place, au
          restaurant comme au bar.
        </p>
        <div class="boutons" style="margin-top:2rem">
          <a class="bouton" href="mailto:${etab.email}">Demander un devis</a>
          <a class="bouton bouton--nu" href="${etab.bonCadeau}" target="_blank" rel="noopener">Offrir un bon cadeau</a>
        </div>
      </div>
      <div>${arche('Photographie à produire — panier pique-nique préparé pour une sortie en bateau', { classe: 'arche--paysage' })}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="enveloppe enveloppe--etroite">
    ${chapitre('III', 'Questions fréquentes')}
    ${faq(questions)}
  </div>
</section>
`
};
