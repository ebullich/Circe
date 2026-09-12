# Plan de design — Circé, Beaulieu-sur-Mer

Ce document explique les partis pris. Il fait foi : toute évolution graphique doit
pouvoir s'y rattacher, sinon c'est qu'elle sort de la direction artistique.

## 1. Le point de départ

Le client a validé l'ambiance du site restaurant-letroisquarts.com — immersif, généreux,
il donne envie — mais a rejeté sa typographie, jugée pas assez chic. La demande est
explicite : **une typographie beaucoup plus classe, élégante et légère**.

Tout le reste du site est construit autour de cette exigence.

## 2. Typographie — le cœur du projet

### Deux familles, jamais trois

| Rôle | Famille | Graisses employées | Pourquoi |
|---|---|---|---|
| Titres | **Bodoni Moda** | 400 uniquement, romain et italique | C'est la famille du logo. Le logotype Circé est un didone à très fort contraste, avec des empattements filiformes. Choisir un didone pour les titres, c'est prolonger la marque au lieu de la contredire. En très grand corps, ses déliés deviennent des cheveux : d'où la légèreté demandée. |
| Texte et interface | **Jost** | 200, 300, 400 | Géométrique d'inspiration années 1920, en écho à la Belle Époque du bâtiment. À 300, elle est fine, aérée, sans la lourdeur de Montserrat qu'employait l'ancien site. |

### Les règles qui produisent la « légèreté »

1. **Aucune graisse grasse sur tout le site.** Pas un seul `font-weight` supérieur à 400.
   `<strong>` lui-même est rendu en 400 : il s'appuie sur la couleur, pas sur l'épaisseur.
2. **Corps généreux, interlettrage négatif.** Les titres montent jusqu'à 168 px avec un
   `letter-spacing` de −0,018 em, jusqu'à −0,035 em sur le nom dans le hero. Un didone
   n'est élégant qu'en grand.
3. **Interlignage large.** 1,75 sur le texte courant, mesure plafonnée à 62 signes.
4. **Les capitales espacées sont rationnées.** Elles servent à la navigation, aux boutons
   et aux libellés de données — jamais en surtitre au-dessus des titres, qui est la
   signature la plus reconnaissable d'un site généré.
5. **Échelle fluide**, ratio 1,25 sur mobile et 1,333 sur desktop, d'après Bringhurst.
   Tous les corps sont des `clamp()` : aucune rupture entre 390 px et 1440 px.

## 3. Palette

| Rôle | Nom | Hex |
|---|---|---|
| Fond principal | Bleu abyssal | `#0A1620` |
| Fond secondaire | Bleu nuit | `#102232` |
| Fond clair, sections éditoriales | Albâtre | `#F1ECE2` / `#FAF7F1` |
| Métal, accent principal | Or antique | `#C9A24B` |
| Métal clair, filets et survols | Champagne | `#E3C98A` |
| Texte sur fond sombre | Ivoire | `#F2ECE1` |
| Accent végétal, rare | Vert laurier | `#1E3A32` |

**L'or ne s'étale jamais.** Il vit en filets de 1 px, en lettrage, en bordures et en
survols. Sur les éléments signature — logotype, nom dans le hero, bouton de réservation —
c'est un **dégradé métallique** (`118deg, #A8823A → #E3C98A → #C9A24B`) dont la position
se déplace au survol pour simuler un reflet.

Sur fond clair, l'or descend à `#6B5119` / `#7A5E22` : le champagne y serait illisible.
Contrôlé automatiquement par `tests/contraste.mjs`.

## 4. Le geste : l'arche

La Rotonde a des baies en plein cintre. C'est **le seul geste décoratif fort** du site,
et il est dépensé partout où une image apparaît :

- toute image principale est masquée en arche plein cintre, soulignée d'un filet d'or de 1 px ;
- la « fenêtre sur la mer » est la même arche en format panoramique ;
- le séparateur de sections est une arcade de trois filets ;
- le favicon est une arche.

Le rayon est calculé pour que l'arc soit un **vrai demi-cercle** et non une ellipse :
`border-radius: 50% 50% 0 0 / calc(largeur / hauteur × 50%)`.

Tout le reste est discipliné : pas de carte arrondie, pas d'ombre grise, pas d'icône.

## 5. Ponctuation des sections

Pas de surtitre en capitales. À la place : un **chiffre romain en Bodoni italique doré**,
suivi d'un filet d'or qui traverse la page, puis le titre. C'est la ponctuation d'un
ouvrage imprimé, pas d'une page web.

## 6. Mouvement

**Une seule séquence orchestrée**, au chargement du hero : le voile se lève, le lettrage
paraît en quatre temps. Ensuite, plus rien ne s'anime tout seul.

Interdits appliqués : pas de fondu au défilement sur chaque section, pas de survol animé
sur chaque carte, pas de compteur, pas de parallaxe. `prefers-reduced-motion: reduce` coupe
tout, sans exception.

## 7. Ce qui a été délibérément évité

Ces traits sont les signatures les plus reconnaissables d'un site généré. Aucun n'est
présent :

- fond crème + serif à fort contraste + accent terracotta ;
- cartes arrondies identiques à ombre grise douce ;
- surtitre en capitales espacées au-dessus de chaque titre ;
- flèche `→` accolée aux liens ;
- métadonnées jointes par des points médians ;
- un mot du titre coloré ou en italique pour faire accent ;
- dégradés décoratifs, emojis, icônes génériques, photos de banque d'images ;
- noir teinté en guise de noir — le noir du site est un bleu, `#0A1620`.

## 8. Les trois principes

1. **Le logo dicte la typographie.** Un didone dans le logo appelle un didone dans les titres.
2. **Une seule audace : l'arche.** Tout le reste est du filet d'or d'un pixel.
3. **Rien ne pèse.** Aucune graisse grasse, aucun aplat d'or, aucune animation gratuite.
