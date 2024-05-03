![ArgentBank](src/assets/img/argentBankLogo.png)

# Projet ArgentBank 🏦💵

Développement Front-end d’une application bancaire utilisant React et Redux.

## Back-end | Argent Bank API

Ce projet nécessite l'utilisation d'un back-end [Disponible sur ce Github ](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API/tree/master).
Une documentation swagger un disponible une fois le back-end lancé, décrivant les différents endpoints pour la phase-1 à cette URL:
[http://localhost:3001/api-docs/#/](http://localhost:3001/api-docs/#/)

## Front-end | Initialisation du projet

- Cloner le dépot [Github du projet](https://github.com/JimmyDef/Projet-ArgentBank)
- Intaller les dépendances **npm install**
- Lancer le Front-end **npm run dev**

## Phase 1

**Authentification des utilisateurs** - Création d'une application web permettant aux clients de se connecter et de gérer leurs comptes et leur profil.

### Utilisateurs pré-enregistrer dans la base de données

| Prénom | Nom    | Email            | Mot de passe |
| ------ | ------ | ---------------- | ------------ |
| Tony   | Stark  | tony@stark.com   | password123  |
| Steve  | Rogers | steve@rogers.com | password456  |

### Contraintes fonctionnelles

- L'utilisateur peut visiter la page d'accueil
- L'utilisateur peut se connecter au système
  - Accédez à la page de connexion (/login)
  - Remplir le formulaire de connexion avec ses identifiants
  - Se connecter à l’application en utilisant des jetons JWT pour l'authentification
  - Naviguer avec succès vers la page de profil (/profile)
- L'utilisateur ne peut voir les informations relatives à son propre profil qu'après s'être connecté avec succès
  - Accédez à la page de profil (/profile)
  - Voir leur prénom sur la page de profil
  - Voir les informations de compte bancaire
- L'utilisateur peut modifier le profil (nom et prénom) et conserver les données dans la base de données.
- L'utilisateur peut se déconnecter du système
  - Voir le bouton de déconnexion une fois connecté
  - Cliquez sur le bouton de déconnexion, déconnecte l’utilisateur et celui-ci revient à la page d'accueil (/)
- L'application React contient une implémentation de Redux pour la gestion de l'état qui:
  - Crée un store pour gérer l'ensemble des données
  - Comprend des action(s) pour envoyer des informations
  - Dispose de reducer(s) pour gérer les changements d'état de l'application

## Phase 2

**Modélisation d'une API** pour la future partie Transactions.
Spécification des endpoints nécessaire pour les détails des comptes et transactions.

- [Swagger mis a disposition](/swagger.yaml)
- [Editeur swagger.io](https://editor-next.swagger.io/)

- Les utilisateurs pourront:
  - visualiser toutes leurs transactions pour le mois en cours, groupées par compte
  - visualiser les détails d'une transaction dans une autre vue
  - ajouter, modifier ou supprimer des informations sur une transaction.

## Développé avec :

- [ViteJs](https://vitejs.dev/)
- [React ](https://fr.reactjs.org/)
- [React Router ](https://reactrouter.com/)
- [Prop-types](https://www.npmjs.com/package/prop-types)
- [Redux](https://redux.js.org/)
- [Redux Toolkit & RTK Query](https://redux-toolkit.js.org/)
- [Sass](https://sass-lang.com/)
- [ESLint ](https://eslint.org/)
- [Fontawesome ](https://fontawesome.com/)
- [Editeur swagger.io](https://editor-next.swagger.io/)

## Auteur

**Defains Jimmy**
[Github](https://github.com/JimmyDef/)
