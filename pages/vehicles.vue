<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Vehicles</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="vehicle in vehicles" :key="vehicle.name" class="border p-4 rounded-md bg-gray-100">
        <!-- Vehicle Image -->
        <img
          :src="getVehicleImage(vehicle.url)"
          alt="Vehicle Image"
          class="w-full h-32 object-cover mb-2"
        />
        <NuxtLink :to="`/vehicles-detail/${getVehicleId(vehicle.url)}`" class="font-semibold">
          {{ vehicle.name }}
        </NuxtLink>
        <p>Model: {{ vehicle.model }}</p>
        <p>Manufacturer: {{ vehicle.manufacturer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Data for vehicles
const vehicles = ref([]);

// Fetch vehicles data from the API
const fetchVehicles = async () => {
  const response = await fetch('https://swapi.dev/api/vehicles/');
  const data = await response.json();
  vehicles.value = data.results;
};

onMounted(() => {
  fetchVehicles();
});

// Helper to get the vehicle's ID from the URL
const getVehicleId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

// Helper to get vehicle image URL (replace with actual source if needed)
const getVehicleImage = (url) => {
  const id = getVehicleId(url);
  return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`; // Star Wars Visual Guide URL for vehicles
};
</script>
