<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Starships</h1>
    <div v-if="!loading && starships?.length" class="grid grid-cols-3 gap-4">
      <div v-for="starship in starships" :key="starship?.name" class="border p-4 rounded-md bg-gray-100">
        <img
          :src="getStarshipImage(starship.url)"
          alt="Starship Image"
          class="w-full h-32 object-cover mb-2"
        />
        <NuxtLink :to="`/starships-detail/${getStarshipId(starship?.url)}`" class="font-semibold">
          {{ starship?.name }}
        </NuxtLink>
        <p>Model: {{ starship.model }}</p>
        <p>Manufacturer: {{ starship.manufacturer }}</p>
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

const fetchStarships = async (page) => {
  loading.value = true;

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
    }, 200);
    return data.results;
  } catch (error) {
    console.error("Error fetching starships:", error);
    loading.value = false;
  }
};

const { data: starships, refresh } = await useAsyncData('starships', async () => {
  currentPage.value = parseInt(route.query.page || '1');
  return await fetchStarships(currentPage.value);
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

const getStarshipId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

const getStarshipImage = (url) => {
  const id = getStarshipId(url);
  return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
};
</script>
