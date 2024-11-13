import axios from "axios";

const Authorization = import.meta.env.AUTHORIZATION

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": Authorization,
    },
});
export default api;