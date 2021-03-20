import axios from "axios";
import APIError from "./APIError";

const baseUrl = "https://post-it-api.herokuapp.com/api";
axios.defaults.baseURL = baseUrl;

const errorMapping = {
  err_authentification: "Authentification impossible",
  err_invalid_password: "Le mot de passe doit comporter au moins 8 caractères",
  err_invalid_mail: "L'adresse mail doit être une adresse mail valide",
  err_existing_user: "Un compte existe déjà pour cette adresse mail",
  err_no_user_found: "Aucun compte n'existe pour cette adresse mail",
  err_wrong_credentials:
    "Identifiants incorrect, cliquez sur Mot de passe oublié si besoin",
  err_unknown: "Une erreur inattendue s'est produite",
};

//TODO passer le token en paramètre
const sendRequest = (axiosConfig, isSecured) => {
  let config = { ...axiosConfig };
  if (isSecured) {
    const authToken = localStorage.getItem("authToken");
    config.headers = { Authorization: authToken };
  }

  return axios(config).catch((error) => {
    if (error.response) {
      const { code: errorId } = error.response.data;

      const message =
        errorMapping[errorId] || "Une erreur inattendue s'est produite";

      throw new APIError(message, errorId);
    } else {
      throw new APIError("Une erreur inattendue s'est produite", "err_unknown");
    }
  });
};

const login = (mail, password) =>
  sendRequest({
    method: "post",
    url: "/signin",
    data: { mail, password },
  });

const postAccount = (mail, password) =>
  sendRequest({
    method: "post",
    url: "/users",
    data: { mail, password },
  });

const getNotes = () =>
  sendRequest(
    {
      method: "get",
      url: "/notes",
    },
    true
  );

const postNewNote = (title, content) =>
  sendRequest(
    {
      method: "post",
      url: "/notes",
      data: { title, content },
    },
    true
  );

const modifyNote = (id, title, content) =>
  sendRequest(
    {
      method: "put",
      url: `/notes/${id}`,
      data: { title, content },
    },
    true
  );

const deleteNote = (id) =>
  sendRequest(
    {
      method: "delete",
      url: `/notes/${id}`,
    },
    true
  );

export { login, postAccount, getNotes, postNewNote, modifyNote, deleteNote };
