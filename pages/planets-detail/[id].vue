<template>
  <div v-if="planet" class="flex flex-col items-center rounded-[20px] justify-center w-[400px] sm:w-[90%] ml-[auto] mr-[auto] mt-[220px] min-h-[370px] bg-white text-black p-4">
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
  <div v-else-if="pending" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else-if="error" class="text-center text-red-500">
    <p>Failed to load planet data. Please try again later.</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';

const route = useRoute();

const { data: planet, pending, error } = await useAsyncData(
  `planet-${route.params.id}`,
  async () => {
    const response = await fetch(`https://swapi.dev/api/planets/${route.params.id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch planet data');
    }
    return await response.json();
  }
);

const getPlanetImage = (id) => {
  if ((id >= 2 && id <= 19) || id == 21) {
    return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  } else {
    return '/no-image.png';
  }
};
</script>
