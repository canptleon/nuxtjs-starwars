<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Planets</h1>
    <div v-if="!loading && planets?.length" class="grid grid-cols-3 gap-4 max-w-[50%] m-auto">
      <div v-for="(planet, index) in planets" :key="planet?.name" 
          class="rounded-[17px] overflow-hidden bg-[#fbde2a29] transition-all duration-100 hover:[box-shadow:1px_1px_16px_-1px_#fadd2a] pb-[10px]"
          :class="{'col-start-2': (planets.length % 3 === 1 && index === planets.length - 1), 'col-start-2 col-end-4': (planets.length % 3 === 2 && index === planets.length - 1)}">
        <NuxtLink :to="`/planets-detail/${getPlanetId(planet?.url)}`" class="font-semibold">
          <img
            :src="getPlanetImage(planet.url)"
            alt="Planet Image"
            class="w-full h-128 object-cover mb-2"
          />
          <div class="mt-2 text-center text-white">
            {{ planet?.name }}
            <p>Climate: {{ planet.climate }}</p>
            <p>Terrain: {{ planet.terrain }}</p>
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
  title: 'Star Wars App | Planets',
})

const route = useRoute();
const router = useRouter();
const currentPage = ref(parseInt(route.query.page || '1'));
const totalPages = useState('totalPages', () => 1);
const loading = ref(false);

const fetchPlanets = async (page) => {
  loading.value = true;

  try {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    const data = await response.json();

    if (!data || !data.results || !data.results.length) {
      loading.value = false;
      planets.value = [];
      return;
    }

    totalPages.value = Math.ceil(data.count / 10);
    setTimeout(() => {
      loading.value = false;
    }, 200); 
    return data.results;
  } catch (error) {
    console.error("Error fetching planets:", error);
    loading.value = false;
  }
};

const { data: planets, refresh } = await useAsyncData('planets', async () => {
  currentPage.value = parseInt(route.query.page || '1');
  const planetsData = await fetchPlanets(currentPage.value);
  return planetsData;
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

const getPlanetId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

const getPlanetImage = (url) => {
  const id = getPlanetId(url);
  if ((id >= 2 && id <= 19) || id == 21) {
    return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  } else {
    return '/no-image.png';
  }
};

</script>
