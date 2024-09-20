<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Starships</h1>
    <div v-if="!loading && starships?.length" class="grid grid-cols-3 gap-4 max-w-[50%] m-auto">
      <div v-for="starship in starships" :key="starship?.name" class=" rounded-[17px] overflow-hidden  bg-[#fbde2a29] transition-all duration-100 hover:[box-shadow:1px_1px_16px_-1px_#fadd2a] pb-[10px]">
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
    <Pagination 
      v-if="!loading"
      :currentPage="currentPage" 
      :totalPages="totalPages" 
      @pageClick="goToPage" 
    />
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
  const noImageIds = [2, 3, 17, 32, 49, 52, 58, 59, 61];

  if (noImageIds.includes(Number(id)) || id > 63) {
    return '/no-image.png';
  } else {
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }
};
</script>
