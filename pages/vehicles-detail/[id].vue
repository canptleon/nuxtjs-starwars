<template>
  <div v-if="vehicle" class="flex flex-col items-center rounded-[20px] justify-center w-[400px] ml-[auto] mr-[auto] mt-[220px] min-h-[370px] bg-white text-black p-4">
    <!-- Vehicle Image -->
    <img
      :src="getVehicleImage(route.params.id)"
      alt="Vehicle Image"
      class="w-48 h-48 object-cover rounded-full mb-4 -mt-[158px] [filter:drop-shadow(2px_4px_6px)] border-[4px] border-[solid] border-[#fcdf2b]"
    />
    <h1 class="text-3xl font-bold mb-4 font-jediFont tracking-[2px] text-[black] [text-shadow:0px_0_3px_#fcdf2b]">{{ vehicle.name }}</h1>
    <p class="text-lg mb-2"><strong>Model:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.model }}</span></p>
    <p class="text-lg mb-2"><strong>Manufacturer:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.manufacturer }}</span></p>
    <p class="text-lg mb-2"><strong>Cost:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.cost_in_credits }} credits</span></p>
    <p class="text-lg mb-2"><strong>Length:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.length }} meters</span></p> <!-- Additional info -->
    <p class="text-lg mb-2"><strong>Crew:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.crew }}</span></p> <!-- Additional info -->
    <p class="text-lg mb-2"><strong>Passengers:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.passengers }}</span></p> <!-- Additional info -->
  </div>
  <div v-else>
    <p class="text-center">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const vehicle = ref({}); // Store vehicle data
const route = useRoute(); // Access route info

// Function to fetch vehicle data based on ID
const fetchVehicle = async () => {
  try {
    const response = await fetch(`https://swapi.dev/api/vehicles/${route.params.id}/`);
    const data = await response.json();
    vehicle.value = data;
  } catch (error) {
    console.error('Failed to fetch vehicle:', error);
  }
};

// Get image URL based on vehicle ID
const getVehicleImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`; // Example URL for images
};

// Initial fetch when component mounts
onMounted(() => {
  fetchVehicle();
});
</script>

<style scoped>
/* Center the loading text */
.loading {
  text-align: center;
}
</style>
