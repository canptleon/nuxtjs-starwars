<template>
  <div v-if="film" class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <!-- Film Image -->
    <img
      :src="getFilmImage(route.params.id)"
      alt="Film Image"
      class="w-48 h-72 object-cover rounded-lg mb-4"
    />
    <h1 class="text-4xl font-bold mb-4">{{ film.title }}</h1>
    <p class="text-lg mb-2"><strong>Director:</strong> {{ film.director }}</p>
    <p class="text-lg mb-2"><strong>Producer:</strong> {{ film.producer }}</p>
    <p class="text-lg mb-2"><strong>Release Date:</strong> {{ film.release_date }}</p>
    <p class="text-lg mb-4"><strong>Opening Crawl:</strong></p>
    <p class="text-md">{{ film.opening_crawl }}</p>
  </div>
  <div v-else>
    <p class="text-center">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const film = ref({}); // Store film data
const route = useRoute(); // Access route info

// Function to fetch film data based on ID
const fetchFilm = async () => {
  try {
    const response = await fetch(`https://swapi.dev/api/films/${route.params.id}/`);
    const data = await response.json();
    film.value = data;
  } catch (error) {
    console.error('Failed to fetch film:', error);
  }
};

// Get image URL based on film ID
const getFilmImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`; // Example URL for images
};

// Initial fetch when component mounts
onMounted(() => {
  fetchFilm();
});
</script>

<style scoped>
/* Center the loading text */
.loading {
  text-align: center;
}
</style>
