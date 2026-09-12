# Contenus à valider avant mise en ligne

Aucune donnée factuelle n'a été inventée. Ce document tient le compte de ce qui est
en ligne et de ce qui manque encore.

## Réglé

### Les horaires — confirmés le 12 septembre 2026

| Service | Jours | Horaires |
|---|---|---|
| Dîner | Du mercredi au samedi | 18h00 – 00h30 |
| Brunch | Samedi et dimanche | 11h00 – 16h00 |
| Fermeture | Lundi et mardi | — |

Fichier : `content/horaires.json`, avec `"confirme": true`. Ces horaires alimentent
l'affichage, la page Contact **et** les données structurées transmises à Google.

> **Un point à confirmer :** le dimanche soir. La consigne reçue disait d'abord
> « du mercredi au dimanche 18h – 00h30 », puis se corrigeait en « du mercredi au samedi ».
> C'est la seconde version qui a été retenue : **pas de service le dimanche soir**.
> Si le restaurant sert aussi le dimanche soir, ajouter `Sunday` au service « Dîner »
> dans `content/horaires.json`.

### La carte du dîner — en ligne avec ses prix

69 lignes réparties en 9 sections, prix compris, sur `/la-carte/diner/`.
Fichier : `content/carte.json`. Les prix partent en données structurées `MenuItem`/`Offer`,
sauf les prix au poids et « Au cours », qui n'ont pas de sens pour un moteur.

Trois corrections faites au passage sur la carte imprimée, à valider :

| Carte imprimée | Corrigé en | Raison |
|---|---|---|
| « LÉGUMES DU MARECHER » / « FARMER'S VEGETEBLS » | Légumes du maraîcher / Farmer's vegetables | Fautes d'orthographe |
| « ARTICHAUTS POIVRADES FRITS » traduit par « Courgette flower fritters » | Fried baby artichokes | La traduction anglaise ne correspondait pas au plat français |
| « PIMENTOS DE PADRON » | Pimientos de Padrón | Orthographe espagnole |

Les intitulés anglais de toute la carte sont déjà stockés dans `content/carte.json`
(champ `en`) : la version anglaise du site n'aura pas à les ressaisir.

## Reste à fournir

### 1. Le tarif du brunch — prioritaire

Tarif adulte, tarif enfant, et composition exacte du buffet.
« Prix brunch Beaulieu-sur-Mer » est une requête à fort volume local : sans le tarif,
la page `/brunch-beaulieu-sur-mer/` perd l'essentiel de son intérêt.

*Note : le tarif se trouve peut-être sur circerestaurant.com, mais l'environnement de
travail n'a pas accès au web ouvert. Il faut le transmettre à la main.*

### 2. La carte des cocktails

Les cocktails actuellement affichés sur `/la-carte/cocktails/` sont des **exemples de mise
en page**, pas la vraie carte du bar. À remplacer, avec les prix.
Fichier : `content/carte.json`, entrée `"id": "cocktails"`.

### 3. La carte des vins et les menus groupes

Appellations, millésimes, tarifs, formules. Les pages sont prêtes à les recevoir.

### 4. Les allergènes

Obligatoires à l'affichage. À ajouter par plat dans `content/carte.json`.

### 5. La privatisation

Capacités exactes par espace, en configuration assise et debout. Formules et budgets
minimum. Équipements techniques disponibles (sonorisation, vidéoprojection, piste).

### 6. Le programme

Dates réelles des soirées (Table du Chef, Candle Night, Dinner Show, DJ sets), horaires,
tarifs, invités. Chaque date obtiendra sa propre page et son balisage `Event`, qui permet
d'apparaître dans les résultats événementiels de Google.

### 7. Le chef

Parcours de Jean Christiansen, distinctions éventuelles, liste nominative des producteurs
partenaires.

### 8. Les mentions légales

Raison sociale, forme juridique, capital, RCS, TVA intracommunautaire, directeur de la
publication, hébergeur. Obligatoire légalement.

## Questions ouvertes

1. Le dimanche soir : service ou pas ? (voir ci-dessus)
2. Le panier Squarespace `/cart` sert-il à de la vente en ligne ? Si oui, que devient-il ?
3. Les menus hébergés sur `preview.bookvideo.mc` : contrat en cours à respecter, ou
   abandon complet au profit des pages HTML de ce site ?
4. Quels accès sont disponibles : registrar du domaine, DNS, Google Business Profile,
   Search Console, GA4, Meta Business, outil de newsletter ?
5. Le logo existe-t-il en vectoriel (SVG, AI, EPS) ?
