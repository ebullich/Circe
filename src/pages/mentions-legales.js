import { etab } from '../layout.js';

export default {
  url: '/mentions-legales/',
  titre: 'Mentions légales et confidentialité — Circé Beaulieu-sur-Mer',
  description: 'Mentions légales, éditeur, hébergeur et politique de confidentialité du site du restaurant Circé, 2 avenue Fernand Dunan à Beaulieu-sur-Mer.',
  ariane: [{ nom: 'Mentions légales', url: '/mentions-legales/' }],
  corps: `
<section class="titre-page">
  <div class="enveloppe enveloppe--etroite">
    <h1>Mentions légales</h1>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe enveloppe--etroite">
    <div class="note-travail" style="margin-bottom:3rem">
      <b>Page à compléter</b>
      Les informations légales (raison sociale, forme juridique, capital, RCS, TVA intracommunautaire,
      directeur de la publication, hébergeur) sont des données factuelles : elles n’ont pas été
      inventées. Transmettez-les et elles seront intégrées telles quelles.
    </div>

    <div class="prose">
      <h2>Éditeur du site</h2>
      <p>
        ${etab.nomComplet}<br>
        ${etab.adresse.rue}, ${etab.adresse.codePostal} ${etab.adresse.ville}, ${etab.adresse.paysNom}<br>
        Téléphone : <a class="lien" href="${etab.telephone.lien}">${etab.telephone.affichage}</a><br>
        E-mail : <a class="lien" href="mailto:${etab.email}">${etab.email}</a>
      </p>
      <p>Raison sociale, forme juridique, capital social, RCS, numéro de TVA et directeur de la publication : à compléter.</p>

      <h2>Hébergement</h2>
      <p>À compléter après le choix d’hébergeur.</p>

      <h2 id="confidentialite">Politique de confidentialité</h2>
      <p>
        Ce site ne dépose aucun cookie de mesure d’audience ou de publicité avant votre consentement
        explicite. Les outils de mesure et les pixels publicitaires ne se chargent qu’après accord,
        et le refus est aussi simple que l’acceptation.
      </p>
      <p>
        Les données transmises via le formulaire de contact ou de demande de devis servent uniquement
        à traiter votre demande. Vous disposez d’un droit d’accès, de rectification, d’effacement et
        d’opposition, qui s’exerce à l’adresse
        <a class="lien" href="mailto:${etab.email}">${etab.email}</a>.
      </p>
      <p>
        La réservation en ligne est opérée par SevenRooms et la vente de bons cadeaux par Capcadeau :
        ces services appliquent leurs propres politiques de confidentialité.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus de ce site — textes, photographies, identité visuelle — est protégé.
        Toute reproduction sans autorisation écrite préalable est interdite.
      </p>
    </div>
  </div>
</section>
`
};
