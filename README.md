********************* DOCUMENTATION API *********************

////// Base de donnée //////

=> il faut importer la base de donnée SQL du nom de groupomania_save.sql

--------------------------------

////// Création d'un utilisateur //////

=> Pour créer un utilisateur, il faudra utiliser la route api/auth/signup en utilisant la méthode POST
=> Le corps de la requête doit contenir un "nom, prénom, email et mot de passe"
=> Un message "Utilisateur créé" confirme la création de de l'utilisateur dans la BDD

------ Messages d'erreurs ------

=> "Email incorrect !" : Utiliser un format d'email correct et appartenant à Groupomania (groupoamnia.fr et groupomania.com autorisés)
=> "Nom incorrect", "Prénom incorrect" : Ne pas utiliser des caractères spéciaux
=> "Veuillez réessayer avec une autre adresse" : Utiliser une adresse qui n'a pas déjà été utilisée
=> "Veuillez entrer un mot de passe contenant au moins 6 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 des caractères spéciaux !" : Respecter le modèle password demandé

--------------------------------

////// Connexion d'un utilisateur //////

=> Pour se connecter, il faut utiliser la route api/auth/login en utilisant la méthode POST
=> Le corps de la requête doit contenir un "email" enregistré précédemment et un "password" valide
=> Une réponse retourne un "userId", un "role" et un "token" de connexion

------ Messages d'erreurs ------

=> "Email ou mot de passe incorrect" : Vérifier que l'email utilisé existe bien ou que le password est correct
=> "Nombre de tentative de connexion atteinte, veuillez réessayer dans ** minutes" : Il faudra ettendre le temps indiquer avant de pouvoir tester de nouveau le jeu email/password

--------------------------------

////// Affichage de tous les posts //////

=> Pour afficher l'ensemble des posts, il faut être connecté et utiliser la route /api/post/ en utilisant la méthode GET

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour obtenir l'affichage, il faudra s'être connecté avec un identifiant valide

--------------------------------

////// Affichage d'un post //////

=> Pour afficher un post, il faut utiliser la route /api/post/:id en utilisant la méthode GET

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour obtenir l'affichage, il faudra s'être connecté avec un identifiant valide
=> "Erreur ID dans l'URL : _id" : Une erreur sur l'ID du post à afficher

--------------------------------

////// Création d'un post //////

=> Pour créer un post, il faut utiliser la route api/post/ en utilisant la méthode POST
=> Le corps de la requête doit contenir les champs "titre, contenu_text et/ou contenu_media" (tous les champs doivent contenir des informations pertinantes)
=> Un message "post enregistré" confirme la création du post dans la BDD

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour créer une post, il faudra s'être connecté avec un identifiant valide
=> "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" : Rentrer des informations perntinantes sans commencer par des caractères spéciaux

--------------------------------

////// Modification d'un post //////

=> Pour modifier un post, il faut utiliser la route api/post/:id en utilisant la méthode PUT
=> Le corps de la requête doit contenir les champs "titre, contenu_text et/ou contenu_media" (tous les champs doivent contenir des informations pertinantes)
=> un message "post modifié" confirme la modification du post dans la BDD

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour modifier un post, il faudra s'être connecté avec un identifiant valide
=> "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" : Rentrer des informations perntinantes sans commencer par des caractères spéciaux ou des espaces
=> "Vous ne pouvez pas modifier un Post qui ne vous appartient pas" : Il faut que se soit le même userId qui a créé le post pour modifier celui-ci

--------------------------------

////// Suppression d'un post //////

=> Pour supprimer un post, il faut utiliser la route api/post/:id en utilisant la méthode DELETE
=> un message "post supprimé" confirme la suppression du post dans la BDD

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour supprimer un post, il faudra s'être connecté avec un identifiant valide
=> "Vous ne pouvez pas supprimer un Post qui ne vous appartient pas" : Il faut que se soit le même userId qui a créé le post pour supprimer celui-ci ou que ce soit le modérateur

--------------------------------

////// Affichage de tous les commentaires d'un post //////

=> Pour afficher l'ensemble des commentaires, il faut être connecté et utiliser la route /api/post/:id/comment en utilisant la méthode GET

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour obtenir l'affichage, il faudra s'être connecté avec un identifiant valide

--------------------------------

////// Création d'un commentaire //////

=> Pour créer un commentaire, il faut utiliser la route api/post/:id/comment en utilisant la méthode POST
=> Le corps de la requête doit contenir les champs "comment_post" (tous les champs doivent contenir des informations pertinantes)
=> Un message "post enregistré" confirme la création du post dans la BDD

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour créer un commentaire, il faudra s'être connecté avec un identifiant valide
=> "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" : Rentrer des informations perntinantes sans commencer par des caractères spéciaux

--------------------------------

////// Modification d'un commentaire //////

=> Pour modifier un commentaire, il faut utiliser la route api/post/:id/comment/:idComment en utilisant la méthode PUT
=> Le corps de la requête doit contenir les champs "comment_post" (tous les champs doivent contenir des informations pertinantes)
=> un message "commentaire modifié" confirme la modification du post dans la BDD

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour modifier un commentaire, il faudra s'être connecté avec un identifiant valide
=> "Erreur dans l'entrée des données, veuillez rentrer des informations pertinantes" : Rentrer des informations perntinantes sans commencer par des caractères spéciaux
=> "Vous ne pouvez pas modifier un Post qui ne vous appartient pas" : Il faut que se soit le même userId qui a créé le commentaire pour modifier celui-ci

--------------------------------

////// Suppression d'un commentaire //////

=> Pour supprimer un commentaire, il faut utiliser la route api/post/:id/comment/:idComment en utilisant la méthode DELETE
=> un message "commentaire supprimé" confirme la suppression du post dans la BDD

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour supprimer un commentaire, il faudra s'être connecté avec un identifiant valide
=> "Vous ne pouvez pas supprimer un Post qui ne vous appartient pas" : Il faut que se soit le même userId qui a créé le commentaire pour supprimer celui-ci ou que ce soit le modérateur

--------------------------------

////// Ajout d'un Like //////

=> Pour ajouter un like sur un post, il faut utiliser la route api/post/:id/like en utilisant la méthode POST
=> Le corps de la requête doit contenir le champ "like" dont le nombre correspond à 1

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour créer une post, il faudra s'être connecté avec un identifiant valide
=> "Le corps de la requête n'est pas conforme" : La valeur "like" n'est pas correct

--------------------------------

////// Ajout d'un Dislike //////

=> Pour ajouter un like sur un post, il faut utiliser la route api/post/:id/like en utilisant la méthode POST
=> Le corps de la requête doit contenir le champ "like" dont le nombre correspond à -1

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour créer une post, il faudra s'être connecté avec un identifiant valide
=> "Le corps de la requête n'est pas conforme" : La valeur "like" n'est pas correct

--------------------------------

////// Retirer un Like/Dislike //////

=> Pour retirer un like ou un dislike sur un post, il faut utiliser la route api/post/:id/like en utilisant la méthode POST
=> Le corps de la requête doit contenir le champ "like" dont le nombre correspond à 0

------ Messages d'erreurs ------

=> "Connexion non authorisée" : Pour créer une post, il faudra s'être connecté avec un identifiant valide
=> "Le corps de la requête n'est pas conforme" : La valeur "like" n'est pas correct

--------------------------------