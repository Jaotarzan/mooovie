<script setup>
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';
import Loading from 'vue-loading-overlay';

const movieStore = useMovieStore()

onMounted(async () => {
  await movieStore.getMoviesGenres()
})

function page(operatio) {
  if (operatio == '+') {
  movieStore.currentPage = movieStore.pages + 1
  } else if (operatio == '-') {
  movieStore.currentPage = movieStore.pages - 1
  }
  movieStore.getMoviesByGenre(movieStore.currentGenreId)
  console.log(movieStore.movies)
}
</script>

<template>
  <loading v-model:active="movieStore.isLoading" is-full-page />
  <div class="body" v-if="movieStore.movies.length > 0 && movieStore.genres.length > 0">
    <h1 class="title">Filmes de animação</h1>
    <ul class="genre-list">
      <li v-for="genre in movieStore.genres" :key="genre.id" @click="movieStore.getMoviesByGenre(genre.id)"
        class="genre-item" :class="{ active: genre.id === movieStore.currentGenreId }">
        {{ genre.name }}
      </li>
    </ul>
    <div class="movie-list">
      <div v-for="movie in movieStore.movies" :key="movie.id" class="movie-card">

        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
          @click="movieStore.openMovie(movie.id)" />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ movieStore.formatDate(movie.release_date) }}</p>
          <p class="movie-genres">
            <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="movieStore.getMoviesByGenre(genre_id)">
              {{ movieStore.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

.pagination {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  height: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;
  font-size: 2rem;
}

.pagination p {
  font-size: 1.5rem;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.movie-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 1rem;
  margin-right: 1rem;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  margin: 1rem;
  cursor: pointer;
}

.movie-card:hover {
  cursor: pointer;
  background-color: #b5c9b8;
  box-shadow: 0 0 0.5rem #387250;
  transition: 0.5s;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  margin-bottom: 1rem;
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}

.movie-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 3rem;
  color: rgb(38, 76, 145);
}

</style>