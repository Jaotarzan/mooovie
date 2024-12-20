import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWNiOGUwYzQ2MWEwM2EzYjVkODY5Zjk1NjRjZWUwNiIsIm5iZiI6MTcxMDk0NDgzNi4xMTYsInN1YiI6IjY1ZmFmMjQ0ZTkzZTk1MDE3ZDVjNDE0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hm96pQST19sccj3kh0g9GZVqpwEpM7fTHk5qmAJSSnY`,
    },
});
export default api;