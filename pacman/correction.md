# Exécution du jeu
 * OK sauf les étapes non implémentées

# Commentaires sur le code
 * Essaie de nommer tes fichiers avec le même nom que la classe (comme en Java), donc avec des majuscules.

## Itération 1
 * Plutôt qu'une méthode `Dot.revertIsEnergizer`, il vaudrait mieux mettre un paramètre dans le constructeur (tu ouvres la porte pour modifier des gommes, sinon).
 * Il n'est pas nécessaire d'avoir deux `Layers` séparées pour les gommes et super-gommes. Il vaudrait mieux les placer sur la même couche (ça te simplifie la méthode `pick`) en créant directement les gommes avec la bonne valeur de `isEnergizer`.

## Itération 2
 * `Sprite.changeDirection` devrait vérifier si `askedToChangeDirection` est vrai avant de changer la direction.
   * Du coup tu fais cette vérification dans `Game.moveSprites` à la place, alors que `askedToChangeDirection` devrait être privé.
 * Il aurait sans doute été plus simple dans `GameView.updateSprites` de modifier la position des sprites plutôt que les supprimer et les rajouter de nouveau.

## Itération 3
 * Pourquoi générer un nombre de 1 à 20 pour `Ghost._choiceNewDirection` (et pas 1 à 4) ?
 * Les fantômes changent de direction toutes les 4 secondes _et_ quand ils sont bloqués (auquel cas le changement est immédiat) ; tu lances l'intervalle quand le fantôme est bloqué uniquement.
 * Tu aurais pu t'économisant du code redondant dans `Game.moveSprites` avec une boucle.
   * Idem dans `GameView.updateSprites`
 * Pourquoi placer `Sprite._initialPosDir` dans un tableau et pas deux variables séparées ?
 * Il n'était pas nécessaire d'utiliser un opérateur ternaire dans `Game.pacmanHasBeenEaten` (tu renvoies simplement la valeur de `this._pacman.isDead`)
 * Il n'est pas vraiment utile de stocker le nombre de vie dans `GameView` puisque tu dois de toute façon vérifier celui de Pacman.
 * L'idée était de vérifier si Pacman est mangé dans le contrôleur ; tu effectues tout dans le `Game`.

## Itération 4
 * Etapes 4.3 et 4.4 non implémentées

# Défense
 * Tu aurais pu utiliser un booléen pour `Game.status`.
 * Question 2 : L'implémentation fonctionne. Cependant, un des principes fondamentaux de l'orienté objet est que chaque objet est responsable de son propre comportement. Il aurait mieux valu créer une sous-classe de `Ghost` dont la méthode `_choiceNewDirection` est différente, plutôt que de considérer la différence au niveau de `Game`.

# Grille d'évaluation
| Critère           | Sur | Cote |
| :---------------- | :-: |:---: |
| Itération 1 | 5 | 4.5 |
| Itération 2 | 9 | 8.5 |
| Itération 3 | 3 | 2.5 |
| Itération 4 | 3 | 1.5 |
| Défense |  | +1 |
| __Total__    | __20__ | __18__ |
