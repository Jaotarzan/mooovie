import api from "@/plugins/api";

class movieService {
    async getMoviesGenres() {
        try {
            const response = await api.get('/genre/movie/list?language=pt-BR')
            return response.data
        }
        catch (error) {
            console.log('erro seu incapaz', error)
        }
    }

    async getMoviesByGenre(genreId) {
        try {
            const response = await api.get('discover/movie', {
                params: {
                    with_genres: `16, ${genreId}`,
                    language: 'pt-BR'
                }
            });            
            return response.data
        }
        catch (error) {
            console.log('erro seu incapaz', error)
        }
    }

    async getMoviesDetails(movieId) {
        try {
            const response = await api.get(`movie/${movieId}`, {
                params: {
                    language: 'pt-BR',
                }
            });

            return response.data
        }
        catch (error) {
            console.log('erro seu incapaz', error)
        }
    }

    async getPopularMovies() {
        try {
            const response = await api.get('discover/movie', {
                params: {
                    with_genres: 16,
                    language: 'pt-BR',
                    sort_by: 'popularity.desc',
                }
            });   
            return response.data
        }
        catch (error) {
            console.log('erro seu incapaz', error)
        }
    }

}

export default new movieService();