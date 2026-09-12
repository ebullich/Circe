import { etab, chapitre, arche, faq, faqLd, restaurantLd } from '../layout.js';

const questions = [
  { q: 'La terrasse est-elle ouverte toute l’année ?',
    r: '<p>La terrasse est le cœur de Circé dès les premiers beaux jours et jusque tard en saison. En hiver, la salle de la Rotonde prend le relais : les baies cintrées gardent la vue, à l’abri.</p>' },
  { q: 'Peut-on avoir une table avec vue sur le Cap-Ferrat ?',
    r: '<p>Toutes les tables de la terrasse regardent la mer ; en salle, les places en baie sont les plus demandées. Précisez votre souhait lors de la réservation : nous faisons notre possible, sans jamais le garantir à l’avance.</p>' },
  { q: 'Où se garer à Beaulieu-sur-Mer ?',
    r: '<p>Le parking du port de plaisance est le plus proche. Le stationnement de surface existe sur les avenues alentour, mais il se remplit vite en saison. La gare SNCF, à dix minutes à pied, reste la solution la plus simple depuis Nice ou Monaco.</p>' },
  { q: 'Le lieu est-il accessible aux personnes à mobilité réduite ?',
    r: '<p>Merci de nous appeler avant votre venue : nous vous indiquerons le meilleur accès et réserverons une table adaptée.</p>' },
  { q: 'Y a-t-il un jardin ?',
    r: '<p>Oui. Le jardin d’herbes fournit une partie des aromates de la cuisine et du bar — verveine, basilic, menthe, romarin. C’est aussi un espace de réception pour les privatisations.</p>' }
];

export default {
  url: '/restaurant-beaulieu-sur-mer/',
  titre: 'Restaurant vue mer à Beaulieu-sur-Mer — la Rotonde | Circé',
  description: 'La Rotonde Belle Époque au-dessus du port de Beaulieu-sur-Mer : salle, terrasse face au Cap-Ferrat, bar à cocktails et jardin d’herbes. Le lieu, la vue, le quartier.',
  ariane: [{ nom: 'Le lieu', url: '/restaurant-beaulieu-sur-mer/' }],
  ld: [restaurantLd(), faqLd(questions)],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>Un restaurant vue mer<br>à Beaulieu-sur-Mer</h1>
    <p class="plomb">La Rotonde, ses baies cintrées et la Baie des Fourmis pour horizon.</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe enveloppe--large">
    <div class="fenetre" role="img" aria-label="La terrasse de Circé au-dessus de la Baie des Fourmis, face au Cap-Ferrat"></div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    ${chapitre('I', 'La Rotonde')}
    <div class="duo duo--large-droite">
      <div>${arche('Photographie à produire — la Rotonde vue du port')}</div>
      <div class="prose">
        <p>
          Beaulieu-sur-Mer est une anomalie heureuse de la Riviera : une petite ville protégée du
          mistral par ses collines, où les palmiers poussent comme en Afrique du Nord — d’où le nom
          de la plage de la Petite Afrique. La Belle Époque y a laissé la Villa Kérylos, des hôtels
          blancs, une promenade en corniche jusqu’à Saint-Jean-Cap-Ferrat, et cette rotonde plantée
          au-dessus du port de plaisance.
        </p>
        <p>
          C’est là que Circé s’est installée. L’édifice n’a pas été refait : il a été rallumé. Les
          baies en plein cintre encadrent la mer comme des fenêtres de théâtre, et ce sont elles qui
          donnent au restaurant son dessin — l’arche que l’on retrouve partout, jusque sur ce site.
        </p>
        <p>
          À l’intérieur, la lumière est basse, les dorures rares et précises, les matières chaudes.
          Une statue de Circé veille sur la salle. Dans l’Odyssée, l’enchanteresse retenait les
          voyageurs à sa table ; l’intention n’a pas changé.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="section section--clair">
  <div class="enveloppe">
    ${chapitre('II', 'Quatre espaces, quatre heures de la journée')}
    <div class="trio">
      <article class="prose">
        <h3>La terrasse</h3>
        <p>
          Face au Cap-Ferrat, au-dessus des mâts du port. C’est l’adresse du coucher de soleil :
          la lumière descend derrière la presqu’île et passe sur la Baie des Fourmis. Le service
          du soir commence là.
        </p>
      </article>
      <article class="prose">
        <h3>La salle</h3>
        <p>
          Sous la rotonde, les baies cintrées gardent la vue quand le vent se lève. Tables espacées,
          lumières tamisées, acoustique travaillée : on peut y parler sans élever la voix.
        </p>
      </article>
      <article class="prose">
        <h3>Le bar et le lounge</h3>
        <p>
          Un comptoir de mixologie qui vit de sa propre vie. On y vient avant la table, après la
          table, ou pour elle seule, jusque tard dans la soirée quand la musique prend le relais.
        </p>
      </article>
    </div>
    <div class="duo" style="margin-top:clamp(3rem,6vw,5rem)">
      <div class="prose">
        <h3>Le jardin d’herbes</h3>
        <p>
          Verveine, basilic, menthe, romarin, laurier : le jardin fournit la cuisine et le bar. Les
          philtres de Circé ne sont pas une métaphore commode — les macérations du barman partent
          vraiment d’ici. Le jardin sert aussi d’espace de réception pour les cocktails privés.
        </p>
        <p><a class="lien" href="/privatisation-evenements/">Privatiser un espace</a></p>
      </div>
      <div>${arche('Photographie à produire — le jardin d’herbes en fin de journée', { classe: 'arche--paysage' })}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="enveloppe">
    ${chapitre('III', 'Autour de Circé')}
    <div class="prose">
      <p>
        Le restaurant est un point de départ autant qu’une destination. À quelques minutes à pied,
        la <strong>Villa Kérylos</strong> reconstitue une demeure grecque antique les pieds dans
        l’eau — le voisinage le plus logique qui soit pour une table qui porte le nom d’une
        magicienne de l’Odyssée. La <strong>promenade Maurice Rouvier</strong> longe la mer jusqu’à
        <strong>Saint-Jean-Cap-Ferrat</strong> en vingt minutes de marche, entre pins et rochers.
      </p>
      <p>
        Le <strong>port de plaisance</strong> est en contrebas : nous préparons des paniers
        pique-nique pour ceux qui partent en mer à la journée.
        <strong>Villefranche-sur-Mer</strong> et sa rade sont à cinq minutes en voiture,
        <strong>Èze</strong> et son village perché à dix, <strong>Monaco</strong> à une dizaine de
        minutes par la Basse Corniche, <strong>Nice</strong> à un quart d’heure.
      </p>
      <p>
        Beaucoup de nos hôtes viennent de Monaco ou de Nice pour dîner et repartent le soir même ;
        le train, lui, s’arrête à deux pas.
        <a class="lien" href="/contact/">Voir tous les accès et le plan</a>.
      </p>
    </div>
  </div>
</section>

<section class="section section--nuit2">
  <div class="enveloppe enveloppe--etroite">
    ${chapitre('IV', 'Questions fréquentes')}
    ${faq(questions)}
    <div class="boutons" style="margin-top:2.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
    </div>
  </div>
</section>
`
};
