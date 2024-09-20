<template>
  <div v-if="film" class="flex flex-col items-start rounded-[20px] justify-center w-[500px] sm:w-[90%] ml-[auto] mr-[auto] mt-[220px] min-h-[470px] bg-white text-black p-4">
    <img
      :src="getFilmImage(route.params.id)"
      alt="Film Image"
      class="w-48 h-72 object-cover rounded-full mx-auto mb-4 -mt-[158px] [filter:drop-shadow(2px_4px_6px)] border-[4px] border-[solid] border-[#fcdf2b]"
    />
    <h1 class="text-3xl font-bold mb-4 font-jediFont tracking-[2px] text-[black] [text-shadow:0px_0_3px_#fcdf2b] mx-auto">{{ film.title }}</h1>
    <p class="text-lg mb-2"><strong>Director:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ film.director }}</span></p>
    <p class="text-lg mb-2"><strong>Producer:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ film.producer }}</span></p>
    <p class="text-lg mb-2"><strong>Release Date:</strong> <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ film.release_date }}</span></p>
    <p class="text-lg mb-4"><strong>Opening Crawl:</strong></p>
    <p class="text-md">{{ film.opening_crawl }}</p>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Loader from '~/components/Loader.vue';
import { useAsyncData } from '#app';

const route = useRoute();

const { data: film, pending, error } = await useAsyncData(
  `film-${route.params.id}`,
  async () => {
    const response = await fetch(`https://swapi.dev/api/films/${route.params.id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch film data');
    }
    return await response.json();
  }
);

const getFilmImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
};
</script>
