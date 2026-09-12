# Circé — Beaulieu-sur-Mer

Site du restaurant Circé, 2 avenue Fernand Dunan, 06310 Beaulieu-sur-Mer.

Site statique engendré par un script Node **sans aucune dépendance**. Tout le contenu
indexable est présent dans le HTML servi, sans exécution de JavaScript.

## Démarrer

```bash
node build.mjs        # engendre dist/
npx http-server dist -p 4321   # http://localhost:4321
```

`npm run build` fait le build et régénère l'image de partage.

## Où se trouve quoi

```
content/            Les données. C'est ici que l'on modifie le site au quotidien.
  etablissement.json  Adresse, téléphone, réservation, réseaux — source unique du NAP
  horaires.json       Horaires — source unique, alimente l'affichage et le JSON-LD
  carte.json          Les cartes (dîner, cocktails)
src/
  layout.js           Gabarit commun, en-tête, pied de page, données structurées
  pages/*.js          Une page = un fichier
  styles/circe.css    Feuille de style unique, tous les jetons en haut
  scripts/circe.js    Comportements (en-tête, menu mobile, suivi des clics)
tools/og.mjs        Fabrique l'image de partage 1200 × 630 depuis le logo
tests/              Contrôle qualité automatisé
assets/             Logo, favicon, image de partage
docs/               Plan de design, stratégie SEO, contenus à valider, captures
build.mjs           Le générateur
```

## Contrôle qualité

Le site doit être servi sur `http://127.0.0.1:4321` avant de lancer les tests.

```bash
node tests/seo.mjs        # titles, descriptions, h1, canoniques, JSON-LD, alt, liens, NAP
node tests/contraste.mjs  # contraste WCAG 2.2 AA en 1440 px et 390 px
```

Les deux doivent passer avant toute livraison.

## Déploiement

`dist/` est un site statique : il se dépose tel quel sur Vercel, Netlify ou tout
hébergeur. Le fichier `dist/_redirects` porte les redirections 301 depuis les anciennes
URL Squarespace.

Avant la bascule DNS, relire `docs/seo-strategie.md` et `docs/contenus-a-valider.md`.

## Dépendances

Aucune. Node 18+ suffit. Playwright n'est utilisé que pour le test de contraste et les
captures d'écran, en développement.
