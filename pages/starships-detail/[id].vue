<template>
  <div v-if="starship" class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <!-- Starship Image -->
    <img
      :src="getStarshipImage(route.params.id)"
      alt="Starship Image"
      class="w-48 h-48 object-cover rounded-full mb-4"
    />
    <h1 class="text-4xl font-bold mb-4">{{ starship.name }}</h1>
    <p class="text-lg mb-2"><strong>Model:</strong> {{ starship.model }}</p>
    <p class="text-lg mb-2"><strong>Manufacturer:</strong> {{ starship.manufacturer }}</p>
    <p class="text-lg mb-2"><strong>Cost:</strong> {{ starship.cost_in_credits }} credits</p>
    <p class="text-lg mb-2"><strong>Hyperdrive Rating:</strong> {{ starship.hyperdrive_rating }}</p>
    <p class="text-lg mb-2"><strong>Length:</strong> {{ starship.length }} meters</p> <!-- Additional info -->
    <p class="text-lg mb-2"><strong>Crew:</strong> {{ starship.crew }}</p> <!-- Additional info -->
    <p class="text-lg mb-2"><strong>Passengers:</strong> {{ starship.passengers }}</p> <!-- Additional info -->
  </div>
  <div v-else>
    <p class="text-center">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const starship = ref({}); // Store starship data
const route = useRoute(); // Access route info

// Function to fetch starship data based on ID
const fetchStarship = async () => {
  try {
    const response = await fetch(`https://swapi.dev/api/starships/${route.params.id}/`);
    const data = await response.json();
    starship.value = data;
  } catch (error) {
    console.error('Failed to fetch starship:', error);
  }
};

// Get image URL based on starship ID
const getStarshipImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`; // Example URL for images
};

// Initial fetch when component mounts
onMounted(() => {
  fetchStarship();
});
</script>

<style scoped>
/* Center the loading text */
.loading {
  text-align: center;
}
</style>
