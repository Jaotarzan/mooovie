import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import movieService from '@/services/movies'
import { useRouter } from 'vue-router'

export const useMovieStore = defineStore('movies', () => {
  const state = reactive({
    genres: [],
    movies: [],
    currentGenreId: null,
    isLoading: false,
    currentMovie: {},
  })

  const router = useRouter()

  const genres = computed(() => state.genres)
  const movies = computed(() => state.movies)
  const isLoading = computed(() => state.isLoading)
  const currentGenreId = computed(() => state.currentGenreId);
  const currentMovie = computed(() => state.currentMovie);

  async function getMoviesGenres() {
    try {
      state.isLoading = true
      const response = await movieService.getMoviesGenres();
      state.genres = response.genres
      console.log(response)
    }
    catch (error) {
      console.log('deu erro pa', error)
    }
    finally {
      state.isLoading = false
    }
  }

  async function getMoviesByGenre(genreId) {
    try {
      state.isLoading = true
      const response = await movieService.getMoviesByGenre(genreId);
      state.currentGenreId = genreId
      state.movies = response.results
    }
    catch (error) {
      console.log('deu erro pa', error)
    }
    finally {
      state.isLoading = false
    }
  }

  async function getMoviesDetails(movieId) {
    try {
      state.isLoading = true
      const response = await movieService.getMoviesDetails(movieId);
      state.currentMovie = response
    }
    catch (error) {
      console.log('deu erro pa', error)
    }
    finally {
      state.isLoading = false
    }
  }

  async function getPopularMovies() {
    try {
      state.isLoading = true
      const response = await movieService.getPopularMovies();
      state.movies = response.results
    }
    catch (error) {
      console.log('deu erro pa', error)
    }
    finally {
      state.isLoading = false
    }
  }

  const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name

  const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

  function openMovie(movieId) {
    router.push(`movies/${movieId}`);
  }

  return {
    genres,
    movies,
    isLoading,
    currentGenreId,
    currentMovie,
    getMoviesGenres,
    getMoviesByGenre,
    getMoviesDetails,
    getPopularMovies,
    getGenreName,
    formatDate,
    openMovie,
  }
})
