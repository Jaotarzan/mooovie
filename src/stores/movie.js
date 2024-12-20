import { computed, reactive } from 'vue'
import { useStorage } from '@vueuse/core'
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

  const pages = useStorage('movieStore', 1)

  const router = useRouter()

  const genres = computed(() => state.genres)
  const movies = computed(() => state.movies)
  const isLoading = computed(() => state.isLoading)
  const currentGenreId = computed(() => state.currentGenreId);
  const currentMovie = computed(() => state.currentMovie);

  async function getMoviesGenres() {
    try {
      state.isLoading = true
      const response = await movieService.getMoviesGenres(pages.value);
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
      const response = await movieService.getMoviesByGenre(genreId, pages.value);
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
      const response = await movieService.getMoviesDetails(movieId, pages.value);
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
      const response = await movieService.getPopularMovies(pages.value);
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
    state,
    genres,
    movies,
    isLoading,
    currentGenreId,
    currentMovie,
    pages,
    getMoviesGenres,
    getMoviesByGenre,
    getMoviesDetails,
    getPopularMovies,
    getGenreName,
    formatDate,
    openMovie,
  }
})
