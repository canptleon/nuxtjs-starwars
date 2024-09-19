<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Films</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="film in films" :key="film.title" class="border p-4 rounded-md bg-gray-100">
        <!-- Film Image -->
        <img
          :src="getFilmImage(film.url)"
          alt="Film Image"
          class="w-full h-32 object-cover mb-2"
        />
        <NuxtLink :to="`/films-detail/${getFilmId(film.url)}`" class="font-semibold">
          {{ film.title }}
        </NuxtLink>
        <p>Release Date: {{ film.release_date }}</p>
        <p>Director: {{ film.director }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Data for films
const films = ref([]);

// Fetch films data from the API
const fetchFilms = async () => {
  const response = await fetch('https://swapi.dev/api/films/');
  const data = await response.json();
  films.value = data.results;
};

onMounted(() => {
  fetchFilms();
});

// Helper to get the film's ID from the URL
const getFilmId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

// Helper to get film image URL (replace with actual source if needed)
const getFilmImage = (url) => {
  const id = getFilmId(url);
  return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`; // Star Wars Visual Guide URL for films
};
</script>
