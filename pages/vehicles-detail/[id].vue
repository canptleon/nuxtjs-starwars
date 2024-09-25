<template>
  <div v-if="vehicle" class="flex flex-col items-center rounded-[20px] justify-center w-[400px] sm:w-[90%] ml-[auto] mr-[auto] mt-[220px] min-h-[370px] bg-white text-black p-4">
    <img
      :src="getVehicleImage(route.params.id)"
      alt="Vehicle Image"
      class="w-48 h-48 object-cover rounded-full mb-4 -mt-[158px] [filter:drop-shadow(2px_4px_6px)] border-[4px] border-[solid] border-[#fcdf2b]"
    />
    <h1 class="text-3xl font-bold mb-4 font-jediFont tracking-[2px] text-[black] [text-shadow:0px_0_3px_#fcdf2b] text-center">{{ vehicle.name }}</h1>
    <p class="text-lg mb-2"><strong>Model:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.model }}</span></p>
    <p class="text-lg mb-2"><strong>Manufacturer:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.manufacturer }}</span></p>
    <p class="text-lg mb-2"><strong>Cost:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.cost_in_credits }} credits</span></p>
    <p class="text-lg mb-2"><strong>Length:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.length }} meters</span></p>
    <p class="text-lg mb-2"><strong>Crew:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.crew }}</span></p>
    <p class="text-lg mb-2"><strong>Passengers:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ vehicle.passengers }}</span></p>
  </div>
  <div v-else-if="pending" class="text-center">
    <Loader />
  </div>
  <div v-else-if="error" class="text-center text-red-500">
    <p>Failed to load vehicle data. Please try again later.</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';
import Loader from '~/components/Loader.vue';

const route = useRoute();

const { data: vehicle, pending, error } = await useAsyncData(
  `vehicle-${route.params.id}`, 
  async () => {
    const response = await fetch(`https://swapi.dev/api/vehicles/${route.params.id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch vehicle data');
    }
    return await response.json();
  }
);

const getVehicleImage = (id) => {
  if (id < 44) {
    return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
  } else {
    return '/no-image.png';
  }
};
</script>
