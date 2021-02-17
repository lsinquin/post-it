const errMessages = {
  ERR_WRONG_PASSWORD:
    "Mot de passe invalide, Vous pouvez demander un un nouveau mot de passe si vous l'avez oublié",
  ERR_NO_ACCOUNT: "Pas de compte lié à ce mail",
  ERR_NO_AUTH: "Authentification nécessaire",
  ERR_NOT_AUTHORIZED: "Action pas autorisée",
  ERR_DEFAULT: "Un problème inattendu a eu lieu",
};

export const resolveErrorId = (errorId) => {
  return errMessages[errorId] || errMessages.ERR_DEFAULT;
};

export default errMessages;
