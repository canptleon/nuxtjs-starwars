<template>
  <div v-if="species" class="flex flex-col items-center rounded-[20px] justify-center w-[400px] ml-[auto] mr-[auto] mt-[220px] min-h-[370px] bg-white text-black p-4">
    <!-- Species Image -->
    <img
      :src="getSpeciesImage(route.params.id)"
      alt="Species Image"
      class="w-48 h-48 object-cover rounded-full mb-4 -mt-[158px] [filter:drop-shadow(2px_4px_6px)] border-[4px] border-[solid] border-[#fcdf2b]"
    />
    <h1 class="text-3xl font-bold mb-4 font-jediFont tracking-[2px] text-[black] [text-shadow:0px_0_3px_#fcdf2b]">{{ species.name }}</h1>
    <p class="text-lg mb-2"><strong>Classification:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ species.classification }}</span></p>
    <p class="text-lg mb-2"><strong>Language:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ species.language }}</span></p>
    <p class="text-lg mb-2"><strong>Average Lifespan:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ species.average_lifespan }} years</span></p>
    <p class="text-lg mb-2"><strong>Designation:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ species.designation }}</span></p> <!-- Additional info -->
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
