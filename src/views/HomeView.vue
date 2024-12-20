<script setup>
import { useMovieStore } from '@/stores/movie';
import { onMounted, reactive, ref } from 'vue';

const movieStore = useMovieStore()
const topAnimation = reactive({})
const popularAnimations = ref([])

onMounted(async () => {
  await movieStore.getPopularMovies();
  topAnimation.value = movieStore.movies[0]
  for (let index = 1; index < 4; index++) {
      popularAnimations.value.push(movieStore.movies[index])    
  };
  console.log(topAnimation)
})
</script>

<template>
  <div class="home">
    <header class="home-header">
      <h1>Bem-vindo ao Mundo da Animação</h1>
      <p>Descubra animações incríveis e mergulhe em histórias fantásticas!</p>
      <router-link to="/movies" class="explore-button">Explorar Mais</router-link>
    </header>

    <section class="featured" v-if="topAnimation?.value">
      <h2>Animação em Destaque</h2>
      <div class="featured-card" @click="movieStore.openMovie(topAnimation.value.id)">
        <img :src="`https://image.tmdb.org/t/p/w500${topAnimation.value.backdrop_path}`" :alt="topAnimation.value.title" class="featured-image" />
      </div>
      <h2>{{ topAnimation.value.title }}</h2>
    </section>

    <section class="popular">
      <h2>Animações Populares</h2>
      <ul class="popular-list">
        <li v-for="animation in popularAnimations" :key="animation.id" class="popular-item" @click="movieStore.openMovie(animation.id)">
          <img :src="`https://image.tmdb.org/t/p/w185${animation.poster_path}`" :alt="animation.title" class="popular-image" />
          <div class="popular-title">
            <h4>{{ animation.title }}</h4>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home {
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  color: #333;
}

.home-header {
  margin-bottom: 40px;
}

.home-header h1 {
  font-size: 3em;
  color: #222;
  margin-bottom: 10px;
}

.home-header p {
  font-size: 1.5em;
  color: #555;
  margin-bottom: 20px;
}

.explore-button {
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.explore-button:hover {
  background-color: #e65c50;
}

.featured {
  margin-bottom: 40px;
}

.featured h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.featured-card {
  margin: 0 auto;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
}

.featured-image {
  width: 100%;
  height: auto;
  display: block;
}

.popular {
  margin-bottom: 40px;
}

.popular h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.popular-list {
  display: flex;
  justify-content: center;
  gap: 5rem;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
}

.popular-item {
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 185px;
}

.popular-image {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
}

.popular-title {
  width: 180px;
  height: 40px;
  margin-bottom: 20px;
  text-align: center;
}

.popular-item:hover {
  cursor: pointer;
  width: 200px;
  background-color: #d7ddd8;
  box-shadow: 0 0 0.5rem #387250;
  transition: 0.5s;
}

.featured-card:hover {
  cursor: pointer;
  width: 510px;
  box-shadow: 0 0 0.5rem #387250;
  transition: 0.5s;
}
</style>
