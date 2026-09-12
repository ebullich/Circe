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

Le dimanche soir est bien fermé : confirmé par le restaurant le 12 septembre 2026.
Le dimanche n'accueille que le brunch, de 11h à 16h.

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

### Les formules du brunch — en ligne avec leurs tarifs

| Formule | Composition | Tarif |
|---|---|---|
| Brunch Gourmand | Buffet du chef | 69 € |
| Brunch Méditerranéen | Buffet du chef et banc de l'écailler | 89 € |
| Brunch Signature | Buffet du chef, banc de l'écailler et champagne | 129 € |

Fichier : `content/brunch.json`. Les trois tarifs partent en données structurées
`MenuItem`/`Offer` : c'est ce qui permet à Google d'afficher le prix d'appel.
Le « dès 69 € » apparaît aussi sur l'accueil, sur `/la-carte/` et dans la meta
description de la page brunch.

## Reste à fournir

### 1. La carte des cocktails

Les cocktails actuellement affichés sur `/la-carte/cocktails/` sont des **exemples de mise
en page**, pas la vraie carte du bar. À remplacer, avec les prix.
Fichier : `content/carte.json`, entrée `"id": "cocktails"`.

### 2. La carte des vins et les menus groupes

Appellations, millésimes, tarifs, formules. Les pages sont prêtes à les recevoir.

### 3. Les allergènes

Obligatoires à l'affichage. À ajouter par plat dans `content/carte.json`.

### 4. La privatisation

Capacités exactes par espace, en configuration assise et debout. Formules et budgets
minimum. Équipements techniques disponibles (sonorisation, vidéoprojection, piste).

### 5. Le programme

Dates réelles des soirées (Table du Chef, Candle Night, Dinner Show, DJ sets), horaires,
tarifs, invités. Chaque date obtiendra sa propre page et son balisage `Event`, qui permet
d'apparaître dans les résultats événementiels de Google.

### 6. Le chef

Parcours de Jean Christiansen, distinctions éventuelles, liste nominative des producteurs
partenaires.

### 7. Les mentions légales

Raison sociale, forme juridique, capital, RCS, TVA intracommunautaire, directeur de la
publication, hébergeur. Obligatoire légalement.

## Questions ouvertes

1. Existe-t-il un tarif enfant pour le brunch ? Le champ `tarifEnfant` de
   `content/brunch.json` attend la réponse.
2. Le panier Squarespace `/cart` sert-il à de la vente en ligne ? Si oui, que devient-il ?
3. Les menus hébergés sur `preview.bookvideo.mc` : contrat en cours à respecter, ou
   abandon complet au profit des pages HTML de ce site ? C'est aujourd'hui la principale
   fuite de référencement — tout le contenu le plus recherché échappe au domaine.
4. Quels accès sont disponibles : registrar du domaine, DNS, Google Business Profile,
   Search Console, GA4, Meta Business, outil de newsletter ?
5. Le logo existe-t-il en vectoriel (SVG, AI, EPS) ?
