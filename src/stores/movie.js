import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import useMovieStore from '@/services/movies'

export const useMovieStore = defineStore('movies', () => {
  const state = reactive({
    allMovies: []
  })

  const allMovies = computed(() => state.allMovies)

  async function getAllMovies() {

  }
})
