# Contexte du projet — Circé

Site du restaurant Circé à Beaulieu-sur-Mer. Site statique, aucune dépendance de build.

## Conventions

- **Tout est en français** : code, commentaires, noms de variables, commits, documentation.
- **Aucune dépendance** ne s'ajoute sans justification écrite dans le README.
- **Aucune couleur ni espacement en dur** dans les composants : tout passe par les jetons
  CSS déclarés en tête de `src/styles/circe.css`.
- **Aucune graisse de police supérieure à 400** sur tout le site. C'est une règle de
  direction artistique, pas une préférence.
- **Aucune donnée factuelle inventée.** Horaires, prix, allergènes, capacités, mentions
  légales : si l'information manque, on réserve la place et on la consigne dans
  `docs/contenus-a-valider.md`.
- **Aucune photo de banque d'images.** Un emplacement sans photo réserve son espace et
  affiche le besoin ; le besoin est consigné dans `docs/photos-a-produire.md`.

## Règles de contenu et de SEO

- Le NAP ne se duplique jamais : il vient de `content/etablissement.json`.
- Les horaires ne partent en JSON-LD que si `content/horaires.json` porte `"confirme": true`.
- Les prix ne partent en JSON-LD que s'ils sont réellement renseignés.
- Pas de balisage `AggregateRating` sur des avis que le site ne collecte pas.
- Pas de pages satellites par commune : ce sont des pages doorway.

## Avant toute livraison

```bash
node build.mjs
npx http-server dist -p 4321 &
node tests/seo.mjs && node tests/contraste.mjs
```

## Direction artistique

Lire `docs/plan-design.md`. En résumé : Bodoni Moda et Jost, jamais de gras, l'arche comme
seul geste décoratif, l'or en filets de 1 px, une seule animation sur tout le site.
