import { etab, chapitre, arche } from '../layout.js';

export default {
  url: '/la-carte/',
  titre: 'La carte du restaurant Circé — Beaulieu-sur-Mer',
  description: 'Dîner, cocktails, brunch, vins et menus groupes : toutes les cartes du restaurant Circé à Beaulieu-sur-Mer, cuisine méditerranéenne du chef Jean Christiansen.',
  ariane: [{ nom: 'La carte', url: '/la-carte/' }],
  ld: [{
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'La carte — Circé Beaulieu-sur-Mer', url: etab.domaine + '/la-carte/'
  }],
  corps: `
<section class="titre-page">
  <div class="enveloppe">
    <h1>La carte</h1>
    <p class="plomb">Quatre lectures d’un même lieu, du déjeuner au dernier verre.</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="enveloppe">
    <div class="prose" style="margin-bottom:clamp(2.5rem,5vw,4rem)">
      <p>
        La cuisine de Jean Christiansen suit les arrivages : la carte du dîner change au fil des
        saisons et de la pêche. Le bar mène sa propre écriture, entre macérations maison et herbes
        du jardin. Le week-end, le brunch prend la terrasse dès 11h.
      </p>
    </div>
    ${chapitre('I', 'Les cartes')}
    <div class="trio">
      <article>
        ${arche('Photographie à produire — un plat de la carte du dîner', { classe: 'arche--haute' })}
        <h3 style="margin-top:1.75rem">Dîner</h3>
        <p style="margin-top:0.9rem;color:var(--encre-douce)">Poissons entiers, viandes au feu, légumes du marché.</p>
        <p style="margin-top:1.1rem"><a class="lien" href="/la-carte/diner/">Voir la carte du dîner</a></p>
      </article>
      <article>
        ${arche('Photographie à produire — le comptoir du bar', { classe: 'arche--haute' })}
        <h3 style="margin-top:1.75rem">Cocktails</h3>
        <p style="margin-top:0.9rem;color:var(--encre-douce)">Les philtres de Circé, les classiques, les sans-alcool.</p>
        <p style="margin-top:1.1rem"><a class="lien" href="/la-carte/cocktails/">Voir la carte des cocktails</a></p>
      </article>
      <article>
        ${arche('Photographie à produire — le buffet du brunch', { classe: 'arche--haute' })}
        <h3 style="margin-top:1.75rem">Brunch</h3>
        <p style="margin-top:0.9rem;color:var(--encre-douce)">Buffet à volonté, samedi et dimanche dès 11h.</p>
        <p style="margin-top:1.1rem"><a class="lien" href="/brunch-beaulieu-sur-mer/">Voir le brunch</a></p>
      </article>
    </div>
  </div>
</section>

<section class="section section--clair">
  <div class="enveloppe">
    ${chapitre('II', 'Vins et grands formats')}
    <div class="prose">
      <p>
        La cave privilégie la Provence, la vallée du Rhône et les vignerons de la région, avec
        quelques incursions ailleurs lorsqu’un accord l’exige. Le sommelier compose volontiers un
        accord mets et vins au verre sur la carte du soir.
      </p>
      <p>
        Pour les tables de six et plus, des <strong>menus groupes</strong> permettent de servir toute
        la table en même temps, avec un choix restreint arrêté à l’avance.
      </p>
    </div>
    <div class="note-travail" style="margin-top:2.5rem;max-width:62ch">
      <b>À fournir par le restaurant</b>
      Carte des vins et formules groupes : intitulés, appellations, millésimes et tarifs.
      Ces pages sont prêtes à les recevoir.
    </div>
  </div>
</section>

<section class="section">
  <div class="enveloppe enveloppe--etroite" style="text-align:center">
    <p class="citation" style="margin-inline:auto">La carte se lit mieux une table réservée.</p>
    <div class="boutons" style="justify-content:center;margin-top:2.5rem">
      <a class="bouton bouton--plein" href="${etab.reservation}" target="_blank" rel="noopener">Réserver une table</a>
    </div>
  </div>
</section>
`
};
