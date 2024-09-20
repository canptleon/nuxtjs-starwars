<template>
  <div v-if="starship" class="flex flex-col items-center rounded-[20px] p-3 justify-center w-[400px] ml-[auto] mr-[auto] mt-[220px] min-h-[430px] bg-white text-black">
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
    <p class="text-lg mb-2"><strong>Length:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.length }} meters</span></p>
    <p class="text-lg mb-2"><strong>Crew:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.crew }}</span></p>
    <p class="text-lg mb-2"><strong>Passengers:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ starship.passengers }}</span></p>
  </div>
  <div v-else-if="pending" class="text-center">
    <Loader />
  </div>
  <div v-else-if="error" class="text-center text-red-500">
    <p>Failed to load starship data. Please try again later.</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';
import Loader from '~/components/Loader.vue';

const route = useRoute();

const { data: starship, pending, error } = await useAsyncData(
  `starship-${route.params.id}`, 
  async () => {
    const response = await fetch(`https://swapi.dev/api/starships/${route.params.id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch starship data');
    }
    return await response.json();
  }
);

const getStarshipImage = (id) => {
  const noImageIds = [2, 3, 17, 32, 49, 52, 58, 59, 61];

  if (noImageIds.includes(Number(id)) || id >= 63) {
    return '/no-image.png';
  } else {
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }
};
</script>
