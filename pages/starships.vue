<template>
  <div>
    <h1 class="text-2xl font-bold mb-8 text-white text-center font-jediFont tracking-[2px]">Starships</h1>
    <div v-if="!loading && starships?.length" class="grid grid-cols-3 lg:grid-cols-2 gap-4 max-w-[50%] lg:max-w-[80%] sm:max-w-[90%] m-auto">
      <div v-for="(starship, index) in starships" :key="starship?.name" 
          class="rounded-[17px] overflow-hidden bg-[#fbde2a29] transition-all duration-100 hover:[box-shadow:1px_1px_16px_-1px_#fadd2a] pb-[10px]"
          :class="{
            'col-start-2': (starships.length % 3 === 1 && index === starships.length - 1), 
            'col-start-2 col-end-4': (starships.length % 3 === 2 && index === starships.length - 1)
          }">
        <NuxtLink :to="`/starships-detail/${getStarshipId(starship?.url)}`" class="font-semibold">
          <img
            :src="getStarshipImage(starship.url)"
            alt="Starship Image"
            class="w-full h-128 object-cover mb-2 max-h-[205px]"
          />
          <div class="mt-2 text-center text-white">
            {{ starship?.name }}
            <p>Model: {{ starship.model }}</p>
            <p>Manufacturer: {{ starship.manufacturer }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="loading" class="text-center text-xl font-semibold">
      <Loader />
    </div>
    <div class="sm:max-w-[90%] sm:mx-[auto] sm:my-[0] sm:overflow-scroll sm:justify-center sm:flex">
      <Pagination 
        v-if="!loading"
        :currentPage="currentPage" 
        :totalPages="totalPages" 
        @pageClick="goToPage" 
      />
    </div>
  </div>
  </template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter, useAsyncData, useState } from 'nuxt/app';
import Loader from '~/components/Loader.vue';
import Pagination from '~/components/Pagination.vue';
import { useSeoMeta } from '#app'

useSeoMeta({
  title: 'Star Wars App | Starships',
})

const route = useRoute();
const router = useRouter();
const currentPage = ref(parseInt(route.query.page || '1'));
const totalPages = useState('totalPages', () => 1);
const loading = ref(false);

const fetchStarships = async (page, ssr) => {
  if(!ssr)
  {
    loading.value = true;
  }

  try {
    const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
    const data = await response.json();

    if (!data || !data.results || !data.results.length) {
      loading.value = false;
      starships.value = [];
      return;
    }

    totalPages.value = Math.ceil(data.count / 10);
    setTimeout(() => {
      loading.value = false;
    }, 150);
    return data.results;
  } catch (error) {
    console.error("Error fetching starships:", error);
    loading.value = false;
  }
};

const { data: starships, refresh } = await useAsyncData('starships', async () => {
  currentPage.value = parseInt(route.query.page || '1');
  return await fetchStarships(currentPage.value, true);
});

const goToPage = async (page) => {
  if (page !== currentPage.value && page <= totalPages.value) {
    loading.value = true;
    router.push({ query: { page } });
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    await refresh();
    setTimeout(() => {
      loading.value = false; 
    }, 150); 
  }
};

watch(route, async () => {
  currentPage.value = parseInt(route.query.page || '1');
  await refresh();
});

const getStarshipId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

const getStarshipImage = (url) => {
  const id = getStarshipId(url);
  const noImageIds = [2, 3, 17, 32, 49, 52, 58, 59, 61];

  if (noImageIds.includes(Number(id)) || id >= 63) {
    return '/no-image.png';
  } else {
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }
};
</script>
