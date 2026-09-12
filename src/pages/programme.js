import { etab, chapitre } from '../layout.js';

/* Les rendez-vous récurrents. Les dates précises seront injectées depuis
   content/evenements.json dès que le restaurant les aura transmises :
   chaque date produira alors un balisage Event complet. */
const rendezVous = [
  { quand: 'Chaque mois', titre: 'La Table du Chef',
    texte: 'Un menu en cinq temps signé Jean Christiansen, construit autour d’un produit ou d’une saison. Thème renouvelé à chaque édition, nombre de couverts limité, le chef passe en salle.' },
  { quand: 'Le week-end', titre: 'Huîtres &amp; Champagne',
    texte: 'Comptoir d’huîtres et sélection de champagnes sur la terrasse, à l’heure où la lumière descend sur le Cap-Ferrat.' },
  { quand: 'Mensuel', titre: 'Candle Night',
    texte: 'Un dîner aux chandelles : la salle est éclairée à la bougie, la carte se resserre, la musique se fait plus basse.' },
  { quand: 'Mensuel', titre: 'Dinner Show',
    texte: 'Le dîner rencontre le spectacle vivant. Musique, performance, mise en scène de la salle : la soirée se déroule autour des tables.' },
  { quand: 'Samedi et dimanche', titre: 'Brunch buffet',
    texte: 'Buffet à volonté de 11h à 16h, en terrasse face à la mer. Trois formules, du buffet du chef au banc de l’écailler et champagne.' },
  { quand: 'Au fil de la saison', titre: 'DJ sets &amp; musique live',
    texte: 'Le bar prend le relais de la table : sets en fin de soirée, formations acoustiques en début de service.' }
];

export default {
  url: '/programme/',
  titre: 'Soirées et événements à Beaulieu-sur-Mer — Circé',
  description: 'Dinner show, Table du Chef, Candle Night, huîtres et champagne, DJ sets : le programme des soirées de Circé à Beaulieu-sur-Mer, entre Nice et Monaco.',
  ariane: [{ nom: 'Programme', url: '/programme/' }],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>Le programme</h1>
    <p class="plomb">Une table qui se raconte au fil des soirées.</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    <div class="prose" style="margin-bottom:clamp(2rem,4vw,3rem)">
      <p>
        Circé vit à deux rythmes : celui du service, et celui des soirées. Certaines reviennent
        chaque mois, d’autres suivent la saison. Toutes se réservent — les formats à jauge limitée
        partent souvent plusieurs semaines à l’avance.
      </p>
    </div>
    <div class="dates">
      ${rendezVous.map((r) => `
      <article class="date">
        <div class="date__quand">${r.quand}</div>
        <div>
          <h2 class="date__titre">${r.titre}</h2>
          <p class="date__texte">${r.texte}</p>
        </div>
      </article>`).join('')}
    </div>

    <div class="note-travail" style="margin-top:3rem;max-width:62ch">
      <b>Dates à transmettre</b>
      Dès que vous nous communiquerez le calendrier réel (dates, horaires, tarifs, invités),
      chaque soirée obtiendra sa propre page et son balisage <code>Event</code> — c’est ce qui
      permet d’apparaître dans les résultats « événements » de Google et dans Google Maps.
      Un seul fichier à tenir à jour, sans toucher au code.
    </div>

    <div class="boutons" style="margin-top:2.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une soirée</a>
      <a class="bouton bouton--nu" href="${etab.reseaux[0]}" target="_blank" rel="noopener">Suivre sur Instagram</a>
    </div>
  </div>
</section>
`
};
