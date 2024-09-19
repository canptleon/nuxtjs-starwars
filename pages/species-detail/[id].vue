<template>
  <div v-if="species" class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <!-- Species Image -->
    <img
      :src="getSpeciesImage(route.params.id)"
      alt="Species Image"
      class="w-48 h-48 object-cover rounded-full mb-4"
    />
    <h1 class="text-4xl font-bold mb-4">{{ species.name }}</h1>
    <p class="text-lg mb-2"><strong>Classification:</strong> {{ species.classification }}</p>
    <p class="text-lg mb-2"><strong>Language:</strong> {{ species.language }}</p>
    <p class="text-lg mb-2"><strong>Average Lifespan:</strong> {{ species.average_lifespan }} years</p>
    <p class="text-lg mb-2"><strong>Designation:</strong> {{ species.designation }}</p> <!-- Additional info -->
  </div>
  <div v-else>
    <p class="text-center">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const species = ref({}); // Store species data
const route = useRoute(); // Access route info

// Function to fetch species data based on ID
const fetchSpecies = async () => {
  try {
    const response = await fetch(`https://swapi.dev/api/species/${route.params.id}/`);
    const data = await response.json();
    species.value = data;
  } catch (error) {
    console.error('Failed to fetch species:', error);
  }
};

// Get image URL based on species ID (you can use a placeholder or an actual image source)
const getSpeciesImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/species/${id}.jpg`; // Example URL for images
};

// Initial fetch when component mounts
onMounted(() => {
  fetchSpecies();
});
</script>

<style scoped>
/* Center the loading text */
.loading {
  text-align: center;
}
</style>
