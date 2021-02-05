import axios from "axios";

const baseUrl = "http://localhost:5000/api";
axios.defaults.baseURL = baseUrl;

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjUwLCJtYWlsIjoibHVsdTI3MjdAaG90bWFpbC5mciIsImlhdCI6MTYxMjU0MDEyMCwiZXhwIjoxNjEyNjI2NTIwfQ.BAjJzATySXWxd843RpRC13SYFAnxE5zkJYI4E21ywnU";

const login = async (mail, password) => {
  try {
    const result = await axios.post("/signin", { mail, password });

    return result.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const signUp = async (mail, password) => {
  try {
    const result = await axios.post("/signup", { mail, password });

    return result.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getNotes = async () => {
  try {
    const result = await axios.get("/notes", {
      headers: { Authorization: authToken },
    });

    return result.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { login, signUp, getNotes };
