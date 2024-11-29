import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
const resources = {
  en: {
    translation: {
      "adminList": "Admin List",
      "dealerList": "Dealer List",
      "supplierList": "Supplier List",
      "dashboard": "Dashboard",
      error: {
        userNotFound: "User Not Found"
      },
      common: {
        "logout": "Logout",
        "adminList": "Admin List",
        "dealerList": "Dealer List",
        "supplierList": "Supplier List",
        "dashboard": "Dashboard",
        "admin": "Admin",
        "supplier": "Supplier",
        "dealer": "Dealer",
        "userAdded":"New User Added Successfully",
        "userEdit": "User Data Edit Successfully",
        "userDelete":"User Deleted Successfully",
        "deleteModel":"Are you sure you want to delete",
        "unDoneMsg":"This action cannot be undone.",
        "confirmDelete":"Confirm Delete",
        "accessDenied":"Access Denied",
        "goToLogin":"Go to Login",
        "noSearchResults":"No search results found"
      },
      login: {
        "login": "Login",
        "loginSuccessful": "Login Successfull",
        "loginWithAzure": "Login With Azure",
        "crudOperations": "CRUD OPERATIONS",
        "signIn": "SIGN IN",
        "enterYourCredentials": "Enter your credentials to access your account",
        "email": "Email",
        "password": "Password",
        "admin": "Admin",
        "dealer": "Dealer",
        "supplier": "Supplier",
        "enterEmail": "Enter your Email",
        "enterPassword": "Enter your Password",
        "emailRequrid": "Email is required",
        "emailInvalid": "Email is not valid",
        "passwordRequrid": "Password is required",
        "nameRequrid": "Name is required",
        "phoneRequrid": "Phone Number is required",
        "passwordLenght": "Password must be at least 8 characters long, include at least one uppercase letter, \n one lowercase letter, one number, and one special character",

      },
      header: {
        "headingData": "Heading Data"
      },
      dashboard: {
        dashboard: "Dashboard",
      },
      admin: {
        addAdmin: "Add Admin",
        table: {
          image: "Image",
          name: "Name",
          email: "Email",
          phone: "Phone",
          createdAt: "Created At"
        }
      },
      supplier: {
        addSupplier: "Add Supplier"
      },
      dealer: {
        addDealer: "Add Dealer"
      },
      label: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        createdAt: "Created At",
        editText: "Edit Row Data",
        addText: "Add New",
        save: "Save",
        cancel: "Cancel",
        enterName:"Enter Name",
        enterEmail: "Enter your Email",
        enterPhone:"Enter Phone Number",
        delete:"Delete"
      }
    }
  },
  fr: {
    translation: {
      "adminList": "Liste des administrateurs",
      "dealerList": "Liste des revendeurs",
      "supplierList": "Liste des fournisseurs",
      "dashboard": "Tableau de bord",
      error: {
        userNotFound: "Utilisateur introuvable"
      },
      common: {
        "logout": "Déconnexion",
        "adminList": "Liste des administrateurs",
        "dealerList": "Liste des revendeurs",
        "supplierList": "Liste des fournisseurs",
        "dashboard": "Tableau de bord",
        "admin": "Administrateur",
        "supplier": "fournisseurs",
        "dealer": "revendeurs",
        "userAdded":"Nouvel utilisateur ajouté avec succès",
        "userEdit": "Modification réussie des données utilisateur",
        "userDelete":"Utilisateur supprimé avec succès",
        "deleteModel":"Etes-vous sûr de vouloir supprimer",
        "unDoneMsg":"Cette action ne peut pas être annulée.",
        "confirmDelete":"Confirmer la suppression",
        "accessDenied":"Accès refusé",
        "goToLogin":"Allez dans Connexion",
        "noSearchResults":"Aucun résultat de recherche trouvé",
      },
      login: {
        "login": "se connecter",
        "loginSuccessful": "Connexion réussie",
        "loginWithAzure": "Connectez-vous avec Azure",
        "crudOperations": "OPÉRATIONS DE CRUD",
        "signIn": "Se connecter",
        "enterYourCredentials": "Entrez vos identifiants pour accéder à votre compte",
        "email": "E-mail",
        "password": "Mot de passe",
        "admin": "Administratrice",
        "dealer": "Revendeuse",
        "supplier": "Fournisseuse",
        "enterEmail": "Entrez votre email",
        "enterPassword": "Entrez votre mot de passe",
        "emailRequrid": "L'e-mail est requis",
        "emailInvalid": "L'e-mail n'est pas valide",
        "passwordRequrid": "Le mot de passe est requis",
        "nameRequrid": "Le nom est requis",
        "phoneRequrid": "Le numéro de téléphone est requis",
        "passwordLenght": "Le mot de passe doit comporter au moins 8 caractères, dont au moins une lettre majuscule,\n une lettre minuscule, un chiffre et un caractère spécial.",
      },
      header: {
        "headingData": "Heading French"
      },
      dashboard: {
        dashboard: "French Dashboard",

      },
      admin: {
        addAdmin: "Ajouter un administrateur",
        table: {
          image: "Image",
          name: "Nom",
          email: "E-mail",
          phone: "Téléphone",
          createdAt: "Créé à"
        }
      },
      supplier: {
        addSupplier: "Ajouter un fournisseur"
      },
      dealer: {
        addDealer: "Ajouter un revendeur"
      },
      label: {
        name: "Nom",
        email: "E-mail",
        phone: "Téléphone",
        createdAt: "Créé à",
        editText: "Modifier les données de ligne",
        addText: "Ajouter un nouveau",
        save: "Sauvegarder",
        cancel: "Annuler",
        enterName:"Entrez le nom",
        enterEmail: "Entrez votre email",
        enterPhone:"Entrez le numéro de téléphone",
        delete:"Supprimer"
      }
    }
  }
};

i18n
  .use(LanguageDetector) // Automatically detect language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Fallback language if the detected language is not available
    interpolation: {
      escapeValue: false // React already handles escaping by default
    }
  });

export default i18n;
