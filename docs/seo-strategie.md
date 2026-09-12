# Stratégie de référencement — Circé

Objectif principal : **première position organique sur « restaurant Beaulieu sur Mer »**,
entrée dans le pack local sur la commune et les communes limitrophes, et hausse des
réservations issues du référencement naturel.

## 1. Ce qui bloquait sur l'ancien site

| Problème | Impact | Traitement |
|---|---|---|
| Menus hébergés hors domaine, sur `preview.bookvideo.mc` | Le contenu le plus recherché (plats, prix, cocktails, brunch) n'apportait rien au domaine | Pages HTML indexables sur le domaine : `/la-carte/diner/`, `/la-carte/cocktails/` |
| Horaires contradictoires d'une page à l'autre | Incohérence pénalisante pour la fiche Google | Source de vérité unique : `content/horaires.json` |
| Contenu textuel très insuffisant | Aucune page ne pouvait se positionner | 500 à 1 400 mots utiles par page |
| Hiérarchie de titres incohérente | Compréhension dégradée | Un seul `h1` par page, aucun saut de niveau, vérifié automatiquement |
| `alt` bourrés de mots-clés | Contre-productif | Descriptions utiles, vérifiées automatiquement |
| Aucune page brunch | Requête locale à fort volume perdue | `/brunch-beaulieu-sur-mer/` |
| Aucune donnée structurée | Pas de résultat enrichi | `Restaurant`, `Menu`, `FAQPage`, `BreadcrumbList`, `Person` |
| Image de partage 617 × 245 px | Partages illisibles | 1200 × 630, générée depuis le logo |

## 2. Cartographie mots-clés → pages

Une page, une intention, une requête principale. Aucune page n'en concurrence une autre.

| Page | Requête principale | Requêtes secondaires |
|---|---|---|
| `/` | restaurant Beaulieu sur Mer | restaurant bord de mer Beaulieu, restaurant vue mer Côte d'Azur, où manger à Beaulieu-sur-Mer |
| `/restaurant-beaulieu-sur-mer/` | restaurant vue mer Beaulieu sur Mer | restaurant Baie des Fourmis, terrasse vue mer Cap-Ferrat, restaurant Belle Époque Riviera |
| `/brunch-beaulieu-sur-mer/` | brunch Beaulieu sur Mer | brunch vue mer Côte d'Azur, brunch buffet à volonté, brunch dimanche Cap-Ferrat |
| `/la-carte/diner/` | menu restaurant Beaulieu sur Mer | carte restaurant méditerranéen Beaulieu, restaurant poisson Beaulieu-sur-Mer |
| `/la-carte/cocktails/` | bar à cocktails Beaulieu sur Mer | bar lounge vue mer Riviera, cocktail Cap-Ferrat |
| `/privatisation-evenements/` | privatisation restaurant Beaulieu sur Mer | lieu de mariage vue mer Côte d'Azur, séminaire Riviera, anniversaire Cap-Ferrat |
| `/programme/` | soirée Beaulieu sur Mer | dîner spectacle Côte d'Azur, restaurant avec DJ Riviera |
| `/le-chef/` | chef Jean Christiansen | cuisine méditerranéenne Côte d'Azur |
| `/contact/` | Circé restaurant adresse horaires | réserver restaurant Beaulieu-sur-Mer |

## 3. SEO local

- **NAP strictement identique partout** — site, JSON-LD, pied de page, fiche Google,
  annuaires : `2 avenue Fernand Dunan, 06310 Beaulieu-sur-Mer`, téléphone
  `+33 4 22 45 05 80` avec lien `tel:+33422450580`. Une seule source :
  `content/etablissement.json`. Vérifié automatiquement sur chaque page par `tests/seo.mjs`.
- **Adresse et horaires en texte réel**, jamais en image, dans le pied de page de toutes
  les pages et sur `/contact/`.
- **Carte Google en chargement différé** sur `/contact/` : une façade cliquable, pas
  d'iframe au chargement, qui détruirait les Core Web Vitals et déposerait des cookies
  avant consentement.
- **Page d'accès rédigée** : depuis Nice, Monaco, l'aéroport, la gare, stationnement.
  C'est un fort capteur de longue traîne locale.
- **Ancrage territorial** : Baie des Fourmis, port de plaisance, Villa Kérylos,
  promenade Maurice Rouvier, Cap-Ferrat, Petite Afrique, Villefranche-sur-Mer, Èze,
  Monaco. Mentionnés là où ils servent le lecteur, jamais en bourrage.
- **Pas de pages satellites** « restaurant à [commune] » : ce sont des pages doorway,
  sanctionnées. Les communes voisines se traitent dans les contenus existants et via
  `areaServed` dans le JSON-LD.
- **Aucun balisage `AggregateRating`** sur des avis que le site ne collecte pas
  lui-même : c'est une violation des consignes Google et un risque d'action manuelle.

## 4. Données structurées

| Type | Où | Source |
|---|---|---|
| `Restaurant` | Accueil, page pilier, contact | `content/etablissement.json` + `content/horaires.json` |
| `Menu` / `MenuSection` / `MenuItem` | Pages de carte | `content/carte.json` |
| `FAQPage` | Accueil, pilier, brunch, privatisation | Les mêmes questions que celles affichées |
| `BreadcrumbList` | Toutes les pages profondes | Fil d'Ariane visible |
| `Person` | `/le-chef/` | — |

Le JSON-LD est **engendré depuis les mêmes fichiers que l'affichage** : il ne peut pas
diverger. Les horaires ne partent que lorsqu'ils sont confirmés ; les prix ne partent que
lorsqu'ils sont renseignés.

## 5. Reste à faire

- Publier les prix des cartes et le tarif du brunch (voir `docs/contenus-a-valider.md`).
- Créer une page par événement avec balisage `Event` dès réception du calendrier.
- Ouvrir la rubrique `/journal/` — 1 à 2 publications par mois pour la fraîcheur et la
  longue traîne locale.
- Version anglaise avec `hreflang` réciproques et `x-default` sur le français. Le SEO
  anglais est un chantier à part entière, pas une traduction littérale.
- Bandeau de consentement CNIL, Consent Mode v2, GA4 et Meta Pixel après consentement.
- Aligner la fiche Google Business Profile : catégorie principale « Restaurant
  méditerranéen », secondaires « Bar à cocktails » et « Restaurant de fruits de mer ».
  Vérifier la cohérence NAP sur Pages Jaunes, TripAdvisor, TheFork, Petit Futé, Yelp,
  Apple Plans, Bing Places, Mappy.
- Conserver la propriété Search Console existante et resoumettre le sitemap à la bascule.

## 6. Redirections

Le fichier `dist/_redirects` porte les 301 depuis les anciennes URL Squarespace, en une
seule étape, jamais en chaîne. À compléter avec le `sitemap.xml` Squarespace complet
avant la bascule DNS.
