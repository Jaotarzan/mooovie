import api from "@/plugins/api";

class movieService {
    async getMovies() {
        try {
            const response = await api.get('/movies/')
            return response.results
        }
        catch (error) {
            console.log('erro seu incapaz', error)
        }
    }

}

export default new movieService();