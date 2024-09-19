<template>
  <div v-if="vehicle" class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <!-- Vehicle Image -->
    <img
      :src="getVehicleImage(route.params.id)"
      alt="Vehicle Image"
      class="w-48 h-48 object-cover rounded-full mb-4"
    />
    <h1 class="text-4xl font-bold mb-4">{{ vehicle.name }}</h1>
    <p class="text-lg mb-2"><strong>Model:</strong> {{ vehicle.model }}</p>
    <p class="text-lg mb-2"><strong>Manufacturer:</strong> {{ vehicle.manufacturer }}</p>
    <p class="text-lg mb-2"><strong>Cost:</strong> {{ vehicle.cost_in_credits }} credits</p>
    <p class="text-lg mb-2"><strong>Length:</strong> {{ vehicle.length }} meters</p> <!-- Additional info -->
    <p class="text-lg mb-2"><strong>Crew:</strong> {{ vehicle.crew }}</p> <!-- Additional info -->
    <p class="text-lg mb-2"><strong>Passengers:</strong> {{ vehicle.passengers }}</p> <!-- Additional info -->
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
