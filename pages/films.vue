<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Films</h1>
    <div class="grid grid-cols-3 gap-4 max-w-[50%] m-auto">
      <div v-for="film in films" :key="film.title" class=" rounded-[17px] overflow-hidden  bg-[#fbde2a29] transition-all duration-100 hover:[box-shadow:1px_1px_16px_-1px_#fadd2a] pb-[10px]">
        <NuxtLink :to="`/films-detail/${getFilmId(film.url)}`" class="font-semibold">
        <img
          :src="getFilmImage(film.url)"
          alt="Film Image"
          class="w-full h-128 object-cover mb-2 "
        />
        <div class="mt-2 text-center text-white">
          {{ film.title }}
          <p>Release Date: {{ film.release_date }}</p>
          <p>Director: {{ film.director }}</p>
        </div>
      </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';
import { useSeoMeta } from '#app'

useSeoMeta({
  title: 'Star Wars App | Films',
})

const { data: films } = await useAsyncData('films', async () => {
  const response = await fetch('https://swapi.dev/api/films/');
  const data = await response.json();
  return data.results;
});

const getFilmId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

const getFilmImage = (url) => {
  const id = getFilmId(url);
  return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
};
</script>
