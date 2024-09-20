<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Species</h1>
    <div v-if="!loading && speciesList?.length" class="grid grid-cols-3 gap-4">
      <div v-for="species in speciesList" :key="species?.name" class="border p-4 rounded-md bg-gray-100">
        <img
          :src="getSpeciesImage(species.url)"
          alt="Species Image"
          class="w-full h-32 object-cover mb-2"
        />
        <NuxtLink :to="`/species-detail/${getSpeciesId(species?.url)}`" class="font-semibold">
          {{ species?.name }}
        </NuxtLink>
        <p>Classification: {{ species.classification }}</p>
        <p>Language: {{ species.language }}</p>
      </div>
    </div>

    <div v-else-if="loading" class="text-center text-xl font-semibold">
      <Loader />
    </div>

    <div v-if="!loading" class="mt-8 flex justify-center items-center space-x-2">
      <button
        v-for="page in pages"
        :key="page"
        @click="goToPage(page)"
        :disabled="currentPage === page"
        :class="[ 
          'px-4 py-2 border rounded-md',
          currentPage === page ? 'bg-blue-500 text-white cursor-not-allowed' : 'bg-gray-200'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter, useAsyncData, useState } from 'nuxt/app';
import Loader from '~/components/Loader.vue';

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
