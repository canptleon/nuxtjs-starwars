<template>
  <div v-if="person" class="flex flex-col items-center rounded-[20px] justify-center w-[400px] ml-[auto] mr-[auto] mt-[220px] sm:w-[90%] sm:mt-[170px] min-h-[470px] bg-white text-black p-4">
    <img
      :src="getPersonImage(route.params.id)"
      alt="Person Image"
      class="w-48 h-48 object-cover rounded-full mb-4 -mt-[158px] [filter:drop-shadow(2px_4px_6px)] border-[4px] border-[solid] border-[#fcdf2b]"
    />
    <h1 class="text-3xl font-bold mb-4 font-jediFont tracking-[2px] text-[black] [text-shadow:0px_0_3px_#fcdf2b] text-center">{{ person.name }}</h1>
    <p class="text-lg mb-2">Height: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.height }} cm</span></p>
    <p class="text-lg mb-2">Mass: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.mass }} kg</span></p>
    <p class="text-lg mb-2">Hair Color: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.hair_color }}</span></p>
    <p class="text-lg mb-2">Skin Color: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.skin_color }}</span></p>
    <p class="text-lg mb-2">Birth Year: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.birth_year }}</span></p>
  </div>
  <div v-else-if="pending" class="text-center">
    <Loader />
  </div>
  <div v-else-if="error" class="text-center text-red-500">
    <p>Failed to load person data. Please try again.</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';
import Loader from '~/components/Loader.vue';

const route = useRoute();

const { data: person, pending, error } = await useAsyncData(
  `person-${route.params.id}`,
  async () => {
    const response = await fetch(`https://swapi.dev/api/people/${route.params.id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch person data');
    }
    return await response.json();
  }
);

const getPersonImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
};
</script>
