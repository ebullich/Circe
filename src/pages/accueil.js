import { etab, chapitre, arche, horairesHtml, restaurantLd, faq, faqLd } from '../layout.js';

const questions = [
  { q: 'Où se trouve exactement le restaurant Circé à Beaulieu-sur-Mer ?',
    r: `<p>Circé occupe la Rotonde, au ${etab.adresse.rue}, sur les hauteurs du port de Beaulieu-sur-Mer. On y accède à pied depuis le port en quelques minutes, et la gare SNCF de Beaulieu-sur-Mer est à moins de dix minutes de marche.</p>` },
  { q: 'Faut-il réserver ?',
    r: '<p>C’est vivement conseillé, en particulier pour la terrasse au coucher du soleil, pour le brunch du week-end et pour les soirées du programme. La réservation se fait en ligne à toute heure, ou par téléphone aux heures de service.</p>' },
  { q: 'Y a-t-il une terrasse avec vue sur la mer ?',
    r: '<p>Oui. La terrasse domine la Baie des Fourmis et fait face au Cap-Ferrat. C’est de là que l’on voit le soleil descendre derrière la presqu’île — le moment que la plupart de nos hôtes viennent chercher.</p>' },
  { q: 'Peut-on venir uniquement boire un verre ?',
    r: '<p>Le bar et le lounge accueillent volontiers ceux qui viennent pour la mixologie seule, sans dîner. La carte des cocktails est pensée comme un chapitre à part entière, pas comme un préambule.</p>' },
  { q: 'Le restaurant est-il accessible depuis Nice et Monaco ?',
    r: '<p>Beaulieu-sur-Mer se trouve à une quinzaine de minutes de Nice et à une dizaine de minutes de Monaco par la Basse Corniche. Le train relie les deux villes à la gare de Beaulieu-sur-Mer en quelques minutes.</p>' }
];

export default {
  url: '/',
  titre: 'Circé — Restaurant à Beaulieu-sur-Mer, vue mer et Cap-Ferrat',
  description: 'Restaurant méditerranéen, bar à cocktails et terrasse vue mer à Beaulieu-sur-Mer. Cuisine du chef Jean Christiansen dans la Rotonde Belle Époque, face au Cap-Ferrat.',
  ld: [restaurantLd(), faqLd(questions)],
  corps: `
<section class="hero">
  <div class="hero__fond"></div>
  <div class="hero__voile"></div>
  <div class="hero__contenu">
    <h1>
      <span class="hero__nom metal">Circé</span>
      <span class="hero__lieu">Restaurant à Beaulieu-sur-Mer</span>
    </h1>
    <p class="hero__phrase">
      La Rotonde s’ouvre sur la Baie des Fourmis, le soleil descend derrière le Cap-Ferrat,
      et la table commence.
    </p>
    <div class="boutons">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
    </div>
  </div>
  <div class="hero__descendre" aria-hidden="true">
    <span class="fine">Entrer</span>
    <i></i>
  </div>
</section>

<section class="section">
  <div class="enveloppe">
    ${chapitre('I', 'La Rotonde, au-dessus du port')}
    <div class="duo duo--large-droite">
      <div>
        ${arche('Photographie à produire — la Rotonde au crépuscule')}
      </div>
      <div class="prose">
        <p class="plomb">Un édifice Belle Époque posé sur la roche, et pour horizon la presqu’île.</p>
        <p>
          Beaulieu-sur-Mer a gardé de la Belle Époque ses villas blanches, sa promenade Maurice Rouvier
          et cette Rotonde, dressée au-dessus du port de plaisance. Circé s’y est installée sans rien
          effacer : les baies cintrées encadrent toujours la mer comme des fenêtres de théâtre, et la
          lumière du soir traverse la salle jusqu’au bar.
        </p>
        <p>
          Dehors, la terrasse regarde la Baie des Fourmis et le Cap-Ferrat. Dedans, les lumières sont
          basses, les dorures discrètes, la musique présente sans jamais couvrir les voix. Une statue
          de <em>Circé</em> veille sur la salle — l’enchanteresse de l’Odyssée, celle qui retenait les
          voyageurs à sa table.
        </p>
        <p><a class="lien" href="/restaurant-beaulieu-sur-mer/">Découvrir le lieu, la terrasse et le jardin</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section section--nuit2">
  <div class="enveloppe enveloppe--large">
    <div class="fenetre" role="img" aria-label="Vue depuis la terrasse de Circé sur la Baie des Fourmis et le Cap-Ferrat"></div>
    <p class="citation" style="margin:clamp(2.5rem,5vw,4rem) auto 0;text-align:center;max-width:36ch">
      Sur cette côte, on ne choisit pas une table : on choisit une heure et un point de vue.
    </p>
  </div>
</section>

<section class="section section--clair">
  <div class="enveloppe">
    ${chapitre('II', 'La cuisine de Jean Christiansen')}
    <div class="duo duo--large-gauche duo--inverse">
      <div class="prose">
        <p>
          Le chef Jean Christiansen cuisine la Méditerranée telle qu’elle se mange ici : des poissons
          débarqués sur la côte, des légumes de l’arrière-pays niçois, des herbes cueillies au jardin,
          de l’huile d’olive et peu d’artifices. La terre et la mer se croisent dans la même carte,
          sans hiérarchie.
        </p>
        <p>
          La carte change avec les arrivages et les saisons. Chaque mois, <strong>La Table du Chef</strong>
          propose un menu en cinq temps construit autour d’un produit ou d’un souvenir — c’est le
          moment où la cuisine prend la parole.
        </p>
        <div class="boutons" style="margin-top:2rem">
          <a class="bouton bouton--nu" href="/la-carte/">Voir la carte</a>
          <a class="bouton bouton--nu" href="/le-chef/">Le chef</a>
        </div>
      </div>
      <div>${arche('Photographie à produire — le chef en cuisine', { classe: 'arche--haute' })}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="enveloppe">
    ${chapitre('III', 'Trois manières de passer la soirée')}
    <div class="trio">
      <article>
        ${arche('Photographie à produire — dressage d’un plat', { classe: 'arche--haute' })}
        <h3 style="margin-top:1.75rem">Dîner</h3>
        <p style="margin-top:0.9rem;color:var(--encre-douce)">
          Poissons entiers, viandes au feu, légumes du marché. Une carte courte, renouvelée avec les saisons.
        </p>
        <p style="margin-top:1.1rem"><a class="lien" href="/la-carte/diner/">La carte du dîner</a></p>
      </article>
      <article>
        ${arche('Photographie à produire — cocktail signature au bar', { classe: 'arche--haute' })}
        <h3 style="margin-top:1.75rem">Bar &amp; lounge</h3>
        <p style="margin-top:0.9rem;color:var(--encre-douce)">
          Une mixologie qui emprunte son vocabulaire aux philtres de Circé : macérations, herbes du jardin, amers.
        </p>
        <p style="margin-top:1.1rem"><a class="lien" href="/la-carte/cocktails/">La carte des cocktails</a></p>
      </article>
      <article>
        ${arche('Photographie à produire — buffet du brunch en terrasse', { classe: 'arche--haute' })}
        <h3 style="margin-top:1.75rem">Brunch</h3>
        <p style="margin-top:0.9rem;color:var(--encre-douce)">
          Samedi et dimanche dès 11h, un buffet à volonté face à la mer, entre petit-déjeuner tardif et déjeuner.
        </p>
        <p style="margin-top:1.1rem"><a class="lien" href="/brunch-beaulieu-sur-mer/">Le brunch du week-end</a></p>
      </article>
    </div>
  </div>
</section>

<div class="arcade" aria-hidden="true"><span></span><span></span><span></span></div>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    ${chapitre('IV', 'Le programme du mois')}
    <div class="prose" style="margin-bottom:clamp(2rem,4vw,3rem)">
      <p>
        Circé n’est pas seulement une table : c’est un lieu qui se raconte au fil des soirées.
        Huîtres et champagne, dîners aux chandelles, dinner shows, DJ sets et musique live se
        succèdent tout au long de l’année.
      </p>
    </div>
    <div class="dates">
      <article class="date">
        <div class="date__quand">Chaque mois</div>
        <div>
          <h3 class="date__titre">La Table du Chef</h3>
          <p class="date__texte">Un menu en cinq temps, un thème renouvelé, un service unique dans le mois. Le nombre de couverts est volontairement limité.</p>
        </div>
      </article>
      <article class="date">
        <div class="date__quand">Le week-end</div>
        <div>
          <h3 class="date__titre">Huîtres &amp; Champagne</h3>
          <p class="date__texte">Un comptoir d’huîtres et une sélection de champagnes, à la terrasse, à l’heure où la lumière tombe sur le Cap-Ferrat.</p>
        </div>
      </article>
      <article class="date">
        <div class="date__quand">Mensuel</div>
        <div>
          <h3 class="date__titre">Dinner Show</h3>
          <p class="date__texte">Une soirée où le dîner se mêle au spectacle vivant : musique, performance, mise en scène de la salle.</p>
        </div>
      </article>
    </div>
    <div class="boutons" style="margin-top:2.5rem">
      <a class="bouton bouton--nu" href="/programme/">Tout le programme</a>
    </div>
  </div>
</section>

<section class="section section--nuit2">
  <div class="enveloppe">
    ${chapitre('V', 'Privatiser la Rotonde')}
    <div class="duo">
      <div>${arche('Photographie à produire — salle dressée pour un mariage', { classe: 'arche--paysage' })}</div>
      <div class="prose">
        <p>
          Mariage face à la mer, anniversaire au lounge, séminaire au calme, cocktail dînatoire sur la
          terrasse : la Rotonde se privatise en partie ou en totalité. Chaque espace a sa capacité et
          son caractère, et le chef construit la formule avec vous.
        </p>
        <p>
          Nous recevons également en traiteur, en vente à emporter et en paniers pique-nique pour les
          sorties en bateau au départ du port.
        </p>
        <div class="boutons" style="margin-top:2rem">
          <a class="bouton" href="/privatisation-evenements/">Demander un devis</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--clair-haut">
  <div class="enveloppe">
    ${chapitre('VI', 'Venir chez Circé')}
    <div class="duo">
      <div class="prose">
        <p class="plomb">Entre Nice et Monaco, sur la Basse Corniche.</p>
        <p>
          Circé se trouve au <strong>${etab.adresse.rue}, ${etab.adresse.codePostal} ${etab.adresse.ville}</strong>,
          sur les hauteurs du port. Quinze minutes de Nice, dix de Monaco, cinq de Saint-Jean-Cap-Ferrat
          et de Villefranche-sur-Mer. La gare de Beaulieu-sur-Mer est à moins de dix minutes à pied.
        </p>
        <p>
          <a class="lien" href="${etab.telephone.lien}">${etab.telephone.affichage}</a><br>
          <a class="lien" href="mailto:${etab.email}">${etab.email}</a>
        </p>
        <div class="boutons" style="margin-top:2rem">
          <a class="bouton bouton--nu" href="/contact/">Accès et contact</a>
          <a class="bouton bouton--nu" href="${etab.itineraire}" target="_blank" rel="noopener">Itinéraire</a>
        </div>
      </div>
      <div>
        ${horairesHtml()}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="enveloppe enveloppe--etroite">
    ${chapitre('VII', 'Questions fréquentes')}
    ${faq(questions)}
  </div>
</section>
`
};
