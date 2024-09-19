<template>
  <div v-if="planet" class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <!-- Planet Image -->
    <img
      :src="getPlanetImage(route.params.id)"
      alt="Planet Image"
      class="w-48 h-48 object-cover rounded-full mb-4"
    />
    <h1 class="text-4xl font-bold mb-4">{{ planet.name }}</h1>
    <p class="text-lg mb-2"><strong>Diameter:</strong> {{ planet.diameter }} km</p>
    <p class="text-lg mb-2"><strong>Climate:</strong> {{ planet.climate }}</p>
    <p class="text-lg mb-2"><strong>Terrain:</strong> {{ planet.terrain }}</p>
    <p class="text-lg mb-2"><strong>Population:</strong> {{ planet.population }}</p>
  </div>
  <div v-else>
    <p class="text-center">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const planet = ref({}); // Store planet data
const route = useRoute(); // Access route info

// Function to fetch planet data based on ID
const fetchPlanet = async () => {
  try {
    const response = await fetch(`https://swapi.dev/api/planets/${route.params.id}/`);
    const data = await response.json();
    planet.value = data;
  } catch (error) {
    console.error('Failed to fetch planet:', error);
  }
};

// Get image URL based on planet ID (you can use a placeholder or an actual image source)
const getPlanetImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`; // Example URL for images
};

// Initial fetch when component mounts
onMounted(() => {
  fetchPlanet();
});
</script>

<style scoped>
/* Center the loading text */
.loading {
  text-align: center;
}
</style>
