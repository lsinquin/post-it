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

function sendRequest(axiosConfig) {
  return axios(axiosConfig).catch((error) => {
    if (error.response) {
      const { code: errorId } = error.response.data;

      const message =
        errorMapping[errorId] || "Une erreur inattendue s'est produite";

      throw new APIError(message, errorId);
    } else {
      throw new APIError("Une erreur inattendue s'est produite", "err_unknown");
    }
  });
}

function login(mail, password) {
  return sendRequest({
    method: "post",
    url: "/signin",
    data: { mail, password },
  });
}

function postNewUser(mail, password) {
  return sendRequest({
    method: "post",
    url: "/users",
    data: { mail, password },
  });
}

function getNotes(authToken) {
  return sendRequest({
    method: "get",
    url: "/notes",
    headers: { Authorization: authToken },
  });
}

function postNewNote(title, content, authToken) {
  return sendRequest({
    method: "post",
    url: "/notes",
    headers: { Authorization: authToken },
    data: { title, content },
  });
}

function putNote(id, title, content, authToken) {
  return sendRequest({
    method: "put",
    url: `/notes/${id}`,
    headers: { Authorization: authToken },
    data: { title, content },
  });
}

function deleteNote(id, authToken) {
  return sendRequest({
    method: "delete",
    url: `/notes/${id}`,
    headers: { Authorization: authToken },
  });
}

export { login, postNewUser, getNotes, postNewNote, putNote, deleteNote };
