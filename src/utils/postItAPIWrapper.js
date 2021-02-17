import axios from "axios";
import APIError from "./APIError";
import { resolveErrorId } from "./errMessages";

const baseUrl = "http://localhost:5000/api";
axios.defaults.baseURL = baseUrl;

const sendRequest = (axiosConfig, isSecured) => {
  let config = { ...axiosConfig };
  if (isSecured) {
    const authToken = localStorage.getItem("authToken");
    config.headers = { Authorization: authToken };
  }

  return axios(config).catch((error) => {
    throw new APIError(resolveErrorId(error.response.data.errorId));
  });
};

const login = (mail, password) =>
  sendRequest({
    method: "post",
    url: "/signin",
    data: { mail, password },
  });

const signUp = (mail, password) =>
  sendRequest({
    method: "post",
    url: "/signup",
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

export { login, signUp, getNotes, postNewNote, modifyNote, deleteNote };

// const sendRequest = (axiosConfig) => {
//   return axios(axiosConfig).catch((error) => {
//     throw new APIError(resolveErrorId(error.response.data.errorId));
//   });
// };

// const login = (mail, password) =>
//   sendRequest({
//     method: "post",
//     url: "/signin",
//     data: { mail, password },
//   });

// const signUp = (mail, password) =>
//   sendRequest({
//     method: "post",
//     url: "/signup",
//     data: { mail, password },
//   });

// const getNotes = (authToken) =>
//   sendRequest({
//     method: "get",
//     url: "/notes",
//     headers: { Authorization: authToken },
//   });

// const postNewNote = (title, content, authToken) =>
//   sendRequest({
//     method: "post",
//     url: "/notes",
//     data: { title, content },
//     headers: { Authorization: authToken },
//   });

// const modifyNote = (id, title, content, authToken) =>
//   sendRequest({
//     method: "put",
//     url: `/notes/${id}`,
//     data: { title, content },
//     headers: { Authorization: authToken },
//   });
