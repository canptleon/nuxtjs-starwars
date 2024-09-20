<template>
  <div>
    <h1 class="text-2xl font-bold mb-8 text-white text-center font-jediFont tracking-[2px]">People</h1>
    <div v-if="!loading && people?.length" class="grid grid-cols-3 lg:grid-cols-2 gap-4 max-w-[50%] lg:max-w-[80%] sm:max-w-[90%] m-auto justify-items-center">
      <div v-for="(person, index) in people" :key="person?.name" 
          :class="[{ 'col-start-2': (people.length % 3 === 1 && index === people.length - 1)}, 'rounded-[17px] overflow-hidden bg-[#fbde2a29] transition-all duration-100 hover:[box-shadow:1px_1px_16px_-1px_#fadd2a] pb-[10px]']">
        <NuxtLink :to="`/people-detail/${getPersonId(person?.url)}`" class="font-semibold">
          <img
            :src="getPersonImage(person.url)"
            alt="Person Image"
            class="w-full h-128 object-cover mb-2"
          />
          <div class="mt-2 text-center text-white">
            {{ person?.name }}
            <p>Height: {{ person.height }} cm</p>
            <p>Mass: {{ person.mass }} kg</p>
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
  title: 'Star Wars App | People',
})

const route = useRoute();
const router = useRouter();
const currentPage = ref(parseInt(route.query.page || '1'));
const totalPages = useState('totalPages', () => 1);
const loading = ref(false);

const fetchPeople = async (page) => {
  loading.value = true;

  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const data = await response.json();

    if (!data || !data.results || !data.results.length) {
      loading.value = false;
      people.value = [];
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

const { data: people, refresh } = await useAsyncData('people', async () => {
  currentPage.value = parseInt(route.query.page || '1');
  const peopleData = await fetchPeople(currentPage.value);
  return peopleData;
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

watch(route, async () => {
  currentPage.value = parseInt(route.query.page || '1');
  await refresh();
});

const getPersonId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

const getPersonImage = (url) => {
  const id = getPersonId(url);

  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
};
</script>
