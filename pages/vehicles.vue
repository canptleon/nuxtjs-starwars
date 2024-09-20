<template>
  <div>
    <h1 class="text-2xl font-bold mb-8 text-white text-center font-jediFont tracking-[2px]">Vehicles</h1>
    <div v-if="!loading && vehicles?.length" class="grid grid-cols-3 lg:grid-cols-2 gap-4 max-w-[50%] lg:max-w-[80%] sm:max-w-[90%] m-auto">
      <div v-for="(vehicle, index) in vehicles" :key="vehicle?.name" 
          class="rounded-[17px] overflow-hidden bg-[#fbde2a29] transition-all duration-100 hover:[box-shadow:1px_1px_16px_-1px_#fadd2a] pb-[10px]"
          :class="{
            'col-start-2': (vehicles.length % 3 === 1 && index === vehicles.length - 1), 
            'col-start-2 col-end-4': (vehicles.length % 3 === 2 && index === vehicles.length - 1)
          }">
        <NuxtLink :to="`/vehicles-detail/${getVehicleId(vehicle?.url)}`" class="font-semibold">
          <img
            :src="getVehicleImage(vehicle.url)"
            alt="Vehicle Image"
            class="w-full h-128 object-cover mb-2"
          />
          <div class="mt-2 text-center text-white">
            {{ vehicle?.name }}
            <p>Model: {{ vehicle.model }}</p>
            <p>Manufacturer: {{ vehicle.manufacturer }}</p>
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
  title: 'Star Wars App | Vehicles',
})

const route = useRoute();
const router = useRouter();
const currentPage = ref(parseInt(route.query.page || '1'));
const totalPages = useState('totalPages', () => 1);
const loading = ref(false);

const fetchVehicles = async (page) => {
  loading.value = true;

  try {
    const response = await fetch(`https://swapi.dev/api/vehicles/?page=${page}`);
    const data = await response.json();

    if (!data || !data.results || !data.results.length) {
      loading.value = false;
      vehicles.value = [];
      return;
    }

    totalPages.value = Math.ceil(data.count / 10);
    setTimeout(() => {
      loading.value = false; 
    }, 200); 
    return data.results;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    loading.value = false;
  }
};

const { data: vehicles, refresh } = await useAsyncData('vehicles', async () => {
  currentPage.value = parseInt(route.query.page || '1');
  return await fetchVehicles(currentPage.value);
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

const getVehicleId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

const getVehicleImage = (url) => {
  const id = getVehicleId(url);
  if (id < 44) {
    return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
  } else {
    return '/no-image.png';
  }
};

</script>
