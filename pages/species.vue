<template>
  <div>
    <h1 class="text-2xl font-bold mb-8 text-white text-center font-jediFont tracking-[2px]">Species</h1>
    <div v-if="!loading && speciesList?.length" class="grid grid-cols-3 lg:grid-cols-2 gap-4 max-w-[50%] lg:max-w-[80%] sm:max-w-[90%] m-auto">
      <div v-for="(species, index) in speciesList" :key="species?.name" 
          class="rounded-[17px] overflow-hidden bg-[#fbde2a29] transition-all duration-100 hover:[box-shadow:1px_1px_16px_-1px_#fadd2a] pb-[10px]"
          :class="{
            'col-start-2': (speciesList.length % 3 === 1 && index === speciesList.length - 1), 
            'col-start-2 col-end-4': (speciesList.length % 3 === 2 && index === speciesList.length - 1)
          }">
        <NuxtLink :to="`/species-detail/${getSpeciesId(species?.url)}`" class="font-semibold">
          <img
            :src="getSpeciesImage(species.url)"
            alt="Species Image"
            class="w-full h-128 object-cover mb-2"
          />
          <div class="mt-2 text-center text-white">
            {{ species?.name }}
            <p>Classification: {{ species.classification }}</p>
            <p>Language: {{ species.language }}</p>
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
  title: 'Star Wars App | Species',
})

const route = useRoute();
const router = useRouter();
const currentPage = ref(parseInt(route.query.page || '1'));
const totalPages = useState('totalPages', () => 1);
const loading = ref(false);

const fetchSpecies = async (page) => {
  loading.value = true;

  try {
    const response = await fetch(`https://swapi.dev/api/species/?page=${page}`);
    const data = await response.json();

    if (!data || !data.results || !data.results.length) {
      loading.value = false;
      speciesList.value = [];
      return;
    }

    totalPages.value = Math.ceil(data.count / 10);
    setTimeout(() => {
      loading.value = false;
    }, 200);
    return data.results;
  } catch (error) {
    console.error("Error fetching species:", error);
    loading.value = false;
  }
};

const { data: speciesList, refresh } = await useAsyncData('species', async () => {
  currentPage.value = parseInt(route.query.page || '1');
  return await fetchSpecies(currentPage.value);
});

const goToPage = async (page) => {
  if (page !== currentPage.value && page <= totalPages.value) {
    loading.value = true;
    router.push({ query: { page } });
    await refresh();
    setTimeout(() => {
      loading.value = false;
    }, 200); 
  }
};

const pages = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});

watch(route, async () => {
  currentPage.value = parseInt(route.query.page || '1');
  await refresh();
});

const getSpeciesId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

const getSpeciesImage = (url) => {
  const id = getSpeciesId(url);
  return `https://starwars-visualguide.com/assets/img/species/${id}.jpg`;
};
</script>
