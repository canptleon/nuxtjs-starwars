<template>
  <div v-if="starship" class="flex flex-col items-center rounded-[20px] p-3 justify-center w-[400px] ml-[auto] mr-[auto] mt-[220px] min-h-[430px] bg-white text-black p-">
    <!-- Starship Image -->
    <img
      :src="getStarshipImage(route.params.id)"
      alt="Starship Image"
      class="w-48 h-48 object-cover rounded-full mb-4 -mt-[158px] [filter:drop-shadow(2px_4px_6px)] border-[4px] border-[solid] border-[#fcdf2b]"
    />
    <h1 class="text-3xl font-bold mb-4 font-jediFont tracking-[2px] text-[black] [text-shadow:0px_0_3px_#fcdf2b]">{{ starship.name }}</h1>
    <p class="text-lg mb-2"><strong>Model:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.model }}</span></p>
    <p class="text-lg mb-2 text-center"><strong>Manufacturer:</strong> <br/><span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.manufacturer }}</span></p>
    <p class="text-lg mb-2"><strong>Cost:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.cost_in_credits }} credits</span></p>
    <p class="text-lg mb-2"><strong>Hyperdrive Rating:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.hyperdrive_rating }}</span></p>
    <p class="text-lg mb-2"><strong>Length:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.length }} meters</span></p> <!-- Additional info -->
    <p class="text-lg mb-2"><strong>Crew:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.crew }}</span></p> <!-- Additional info -->
    <p class="text-lg mb-2"><strong>Passengers:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.passengers }}</span></p> <!-- Additional info -->
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
