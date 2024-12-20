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

    async getMoviesByGenre(genreId, Page) {
        try {
            const response = await api.get('discover/movie', {
                params: {
                    with_genres: `16, ${genreId}`,
                    language: 'pt-BR',
                    page: Page,
                    include_adult: false,
                }
            });            
            return response.data
        }
        catch (error) {
            console.log('erro seu incapaz', error)
        }
    }

    async getMoviesDetails(movieId, Page) {
        try {
            const response = await api.get(`movie/${movieId}`, {
                params: {
                    page: Page,
                    include_adult: false,
                    language: 'pt-BR',
                }
            });

            return response.data
        }
        catch (error) {
            console.log('erro seu incapaz', error)
        }
    }

    async getPopularMovies(Page) {
        try {
            const response = await api.get('discover/movie', {
                params: {
                    with_genres: 16,
                    language: 'pt-BR',
                    sort_by: 'popularity.desc',
                    page: Page,
                    include_adult: false,
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