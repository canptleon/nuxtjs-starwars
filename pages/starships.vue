<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Starships</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="starship in starships" :key="starship.name" class="border p-4 rounded-md bg-gray-100">
        <!-- Starship Image -->
        <img
          :src="getStarshipImage(starship.url)"
          alt="Starship Image"
          class="w-full h-32 object-cover mb-2"
        />
        <NuxtLink :to="`/starships-detail/${getStarshipId(starship.url)}`" class="font-semibold">
          {{ starship.name }}
        </NuxtLink>
        <p>Model: {{ starship.model }}</p>
        <p>Manufacturer: {{ starship.manufacturer }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Data for starships
const starships = ref([]);

// Fetch starships data from the API
const fetchStarships = async () => {
  const response = await fetch('https://swapi.dev/api/starships/');
  const data = await response.json();
  starships.value = data.results;
};

onMounted(() => {
  fetchStarships();
});

// Helper to get the starship's ID from the URL
const getStarshipId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

// Helper to get starship image URL
const getStarshipImage = (url) => {
  const id = getStarshipId(url);
  return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`; // Star Wars Visual Guide URL for starships
};
</script>
