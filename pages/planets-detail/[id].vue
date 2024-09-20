<template>
  <div v-if="planet" class="flex flex-col items-center rounded-[20px] justify-center w-[400px] ml-[auto] mr-[auto] mt-[220px] min-h-[370px] bg-white text-black p-4">
    <!-- Planet Image -->
    <img
      :src="getPlanetImage(route.params.id)"
      alt="Planet Image"
      class="w-48 h-48 object-cover rounded-full mb-4 -mt-[158px] [filter:drop-shadow(2px_4px_6px)] border-[4px] border-[solid] border-[#fcdf2b]"
    />
    <h1 class="text-3xl font-bold mb-4 font-jediFont tracking-[2px] text-[black] [text-shadow:0px_0_3px_#fcdf2b]">{{ planet.name }}</h1>
    <p class="text-lg mb-2"><strong>Diameter:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ planet.diameter }} km</span></p>
    <p class="text-lg mb-2"><strong>Climate:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ planet.climate }}</span></p>
    <p class="text-lg mb-2"><strong>Terrain:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ planet.terrain }}</span></p>
    <p class="text-lg mb-2"><strong>Population:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ planet.population }}</span></p>
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
