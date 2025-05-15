import axios from "axios";
const api = axios.create({
  baseURL: "https://fakeapi.platzi.com/en/rest/users",
});
export default api;
