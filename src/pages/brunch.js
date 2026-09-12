import { etab, brunch, chapitre, arche, faq, faqLd, formulesHtml, brunchLd } from '../layout.js';

const bas = Math.min(...brunch.formules.map((f) => f.prix));

const questions = [
  { q: 'Combien coûte le brunch de Circé ?',
    r: `<p>Trois formules, toutes en buffet à volonté : le <strong>Brunch Gourmand</strong> à ${brunch.formules[0].prix} €, le <strong>Brunch Méditerranéen</strong> à ${brunch.formules[1].prix} €, qui ajoute le banc de l’écailler, et le <strong>Brunch Signature</strong> à ${brunch.formules[2].prix} €, qui y ajoute le champagne.</p>` },
  { q: 'À quelle heure est servi le brunch ?',
    r: '<p>Le brunch est servi le samedi et le dimanche, de 11h à 16h. Les premiers services sont les plus calmes ; les tables en terrasse partent vite dès les beaux jours.</p>' },
  { q: 'Le buffet est-il vraiment à volonté ?',
    r: '<p>Oui, quelle que soit la formule. Vous composez votre assiette autant de fois que vous le souhaitez, du salé au sucré.</p>' },
  { q: 'Faut-il réserver pour le brunch ?',
    r: '<p>C’est fortement conseillé, surtout le dimanche et en saison. La réservation se fait en ligne à toute heure.</p>' },
  { q: 'Quelle différence entre les trois formules ?',
    r: '<p>Le buffet du chef est le même dans les trois. Le Méditerranéen y ajoute le banc de l’écailler — huîtres, crustacés et fruits de mer — et le Signature y ajoute le champagne, servi tout au long du service.</p>' },
  { q: 'Le brunch convient-il aux enfants ?',
    r: '<p>Le format buffet est idéal en famille : chacun compose son assiette. Précisez le nombre d’enfants à la réservation.</p>' },
  { q: 'Y a-t-il des options végétariennes ?',
    r: '<p>Le buffet comporte toujours une part végétarienne substantielle — légumes, salades, fromages, pâtisseries. Pour un régime particulier, appelez-nous avant votre venue.</p>' },
  { q: 'Peut-on bruncher en terrasse face à la mer ?',
    r: '<p>Oui, dès que la météo le permet. La terrasse regarde la Baie des Fourmis et le Cap-Ferrat : c’est la meilleure heure de la journée pour cette vue.</p>' }
];

export default {
  url: '/brunch-beaulieu-sur-mer/',
  titre: 'Brunch à Beaulieu-sur-Mer — buffet à volonté vue mer | Circé',
  description: `Brunch buffet à volonté chez Circé, samedi et dimanche de 11h à 16h à Beaulieu-sur-Mer. Trois formules dès ${bas} €, terrasse face au Cap-Ferrat.`,
  ariane: [{ nom: 'Brunch', url: '/brunch-beaulieu-sur-mer/' }],
  ld: [brunchLd(brunch), faqLd(questions)],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>Le brunch<br>de Beaulieu-sur-Mer</h1>
    <p class="plomb">Buffet à volonté, samedi et dimanche de 11h à 16h, face au Cap-Ferrat.</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe enveloppe--large">
    <div class="fenetre" role="img" aria-label="Le buffet du brunch dressé sur la terrasse de Circé"></div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    ${chapitre('I', 'Le week-end commence ici')}
    <div class="duo duo--large-gauche">
      <div class="prose">
        <p>
          Le brunch de Circé n’est ni un petit-déjeuner rallongé ni un déjeuner déguisé : c’est une
          longue table, ouverte de 11h à 16h le samedi et le dimanche, où l’on passe deux heures
          sans regarder l’heure. Le buffet est à volonté et se parcourt librement, du salé au sucré :
          produits frais, recettes de la maison, et le va-et-vient entre les deux.
        </p>
        <p>
          Sur la terrasse, la lumière de la fin de matinée tombe sur la Baie des Fourmis et la
          presqu’île du Cap-Ferrat. C’est, avec le coucher de soleil, le meilleur moment de la
          journée pour cette vue — et le plus tranquille.
        </p>
        <p>
          Beaucoup viennent de Nice, de Villefranche-sur-Mer, de Saint-Jean-Cap-Ferrat ou de Monaco
          pour ce rendez-vous : comptez dix à quinze minutes de route, ou quelques minutes de train
          jusqu’à la gare de Beaulieu-sur-Mer.
        </p>
      </div>
      <div>${arche('Photographie à produire — table de brunch dressée en terrasse')}</div>
    </div>
  </div>
</section>

<section class="section section--clair">
  <div class="enveloppe">
    ${chapitre('II', 'Trois formules')}
    <div class="prose">
      <p>
        Le buffet du chef est le même dans les trois formules. Ce qui change, c’est ce qu’on y
        ajoute : le banc de l’écailler, puis le champagne.
      </p>
    </div>
    ${formulesHtml(brunch.formules)}
    <div class="boutons" style="margin-top:clamp(2.5rem,5vw,3.5rem)">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver le brunch</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="enveloppe">
    ${chapitre('III', 'Ce que l’on trouve au buffet')}
    <div class="trio">
      <article class="prose">
        <h3>Le salé</h3>
        <p>
          Œufs préparés à la demande, charcuteries et fromages, poissons fumés, salades de saison,
          légumes du marché, plats chauds méditerranéens.
        </p>
      </article>
      <article class="prose">
        <h3>Le sucré</h3>
        <p>
          Viennoiseries du matin, pains et confitures, pâtisseries de la maison, fruits frais de la
          région coupés minute.
        </p>
      </article>
      <article class="prose">
        <h3>Le banc de l’écailler</h3>
        <p>
          Huîtres, crustacés et fruits de mer, dressés sur glace. Compris dans les formules
          Méditerranéen et Signature.
        </p>
      </article>
    </div>
    <div class="note-travail" style="margin-top:3rem;max-width:62ch">
      <b>À préciser par le restaurant</b>
      Composition détaillée du buffet, et tarif enfant s’il en existe un. Le reste est en ligne.
    </div>
  </div>
</section>

<section class="section section--nuit2">
  <div class="enveloppe enveloppe--etroite">
    ${chapitre('IV', 'Questions fréquentes sur le brunch')}
    ${faq(questions)}
    <div class="boutons" style="margin-top:2.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver le brunch</a>
      <a class="bouton bouton--nu" href="${etab.telephone.lien}">${etab.telephone.affichage}</a>
    </div>
  </div>
</section>
`
};
