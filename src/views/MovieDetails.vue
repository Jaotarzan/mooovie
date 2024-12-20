<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '@/stores/movie';
import Loading from 'vue-loading-overlay';

const movieStore = useMovieStore();
const route = useRoute();

const id = route.params.id;

onMounted(async () => {
  await movieStore.getMoviesDetails(id);
  console.log(movieStore.currentMovie);
});
</script>

<template>
  <loading v-model:active="movieStore.isLoading" is-full-page />

  <div 
    class="body" 
    :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/original${movieStore.currentMovie?.backdrop_path}')` }"
  >
    <div class="overlay">
      <div class="main">
        <div class="content">
          <div class="details">
            <h1>{{ movieStore.currentMovie?.title }}</h1>
            <p class="tagline">{{ movieStore.currentMovie?.tagline }}</p>
            <p class="overview">{{ movieStore.currentMovie?.overview }}</p>
            <div class="stats">
              <p><strong>Avaliação:</strong> {{ movieStore.currentMovie?.vote_average }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="companies-section">
        <h2>Produtoras</h2>
        <div class="companies">
          <template v-for="company in movieStore.currentMovie?.production_companies" :key="company.id">
            <div class="company-card">
              <img 
                v-if="company.logo_path" 
                :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`" 
                :alt="company.name" 
              />
              <p v-else>{{ company.name }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  height: 100vh;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

.overlay {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  margin-top: 50px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.content {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.details h1 {
  font-size: 2rem;
  margin: 0;
}

.tagline {
  font-style: italic;
  color: #ddd;
}

.overview {
  font-size: 1rem;
  line-height: 1.6;
}

.stats p {
  margin: 5px 0;
}

.companies-section {
  margin-top: 50px;
  text-align: center;
}

.companies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.company-card {
  text-align: center;
}

.company-card img {
  max-width: 100px;
  margin-bottom: 10px;
}

.company-card p {
  font-size: 0.9rem;
  color: #ccc;
}
</style>
