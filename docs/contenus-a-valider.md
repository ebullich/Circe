# Contenus à valider avant mise en ligne

Aucune donnée factuelle n'a été inventée. Voici ce qui manque et pourquoi cela compte.

## 1. Les horaires — bloquant

Le site actuel se contredit : l'accueil annonce « ouvert du jeudi au dimanche », la page
Menus « tous les jours sauf le lundi ». Une fiche Google incohérente avec le site coûte
des positions dans le pack local.

- Fichier : `content/horaires.json`
- Tant que `"confirme": false`, **les horaires ne sont pas transmis à Google** en données
  structurées. Mieux vaut aucune donnée qu'une donnée fausse.
- Les horaires affichés actuellement sont une hypothèse de mise en page, signalée comme
  telle sur la page Contact.

**À fournir :** jours d'ouverture réels, horaires de chaque service (déjeuner, dîner,
brunch), jour de fermeture, fermeture annuelle éventuelle. Passez ensuite `"confirme"` à `true`.

## 2. Les cartes — important pour le référencement

- Fichier : `content/carte.json`
- Les intitulés de plats et de cocktails actuels sont des **exemples de mise en page**.
  Ils doivent être remplacés par la carte réelle.
- **Les prix sont volontairement vides.** Leur publication est l'un des leviers de
  référencement les plus efficaces pour un restaurant — c'est ce que les gens cherchent —
  et elle améliore le taux de réservation. À arbitrer.
- Manquent aussi : la carte des vins, les menus groupes, les allergènes.

## 3. Le brunch

Composition exacte du buffet, **tarif adulte et tarif enfant**, durée du service.
« Prix brunch Beaulieu-sur-Mer » est une requête à fort volume local : le tarif absent,
la page perd l'essentiel de son intérêt.

## 4. La privatisation

Capacités exactes par espace, en configuration assise et debout. Formules et budgets
minimum. Équipements techniques disponibles (sonorisation, vidéoprojection, piste).

## 5. Le programme

Dates réelles des soirées (Table du Chef, Candle Night, Dinner Show, DJ sets), horaires,
tarifs, invités. Chaque date obtiendra sa propre page et son balisage `Event`, qui permet
d'apparaître dans les résultats événementiels de Google.

## 6. Le chef

Parcours de Jean Christiansen, distinctions éventuelles, liste nominative des producteurs
partenaires.

## 7. Les mentions légales

Raison sociale, forme juridique, capital, RCS, TVA intracommunautaire, directeur de la
publication, hébergeur. Obligatoire légalement.

## 8. Questions ouvertes

1. Le panier Squarespace `/cart` sert-il à de la vente en ligne ? Si oui, que devient-il ?
2. Les menus hébergés sur `preview.bookvideo.mc` : contrat en cours à respecter, ou
   abandon complet au profit des pages HTML de ce site ?
3. Quels accès sont disponibles : registrar du domaine, DNS, Google Business Profile,
   Search Console, GA4, Meta Business, outil de newsletter ?
4. Le logo existe-t-il en vectoriel (SVG, AI, EPS) ?
