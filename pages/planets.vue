<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Planets</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="planet in planets" :key="planet.name" class="border p-4 rounded-md bg-gray-100">
        <!-- Planet Image -->
        <img
          :src="getPlanetImage(planet.url)"
          alt="Planet Image"
          class="w-full h-32 object-cover mb-2"
        />
        <NuxtLink :to="`/planets-detail/${getPlanetId(planet.url)}`" class="font-semibold">
          {{ planet.name }}
        </NuxtLink>
        <p>Climate: {{ planet.climate }}</p>
        <p>Terrain: {{ planet.terrain }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Data for planets
const planets = ref([]);

// Fetch planets data from the API
const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets/');
  const data = await response.json();
  planets.value = data.results;
};

onMounted(() => {
  fetchPlanets();
});

// Helper to get the planet's ID from the URL
const getPlanetId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

// Helper to get planet image URL (replace with actual source if needed)
const getPlanetImage = (url) => {
  const id = getPlanetId(url);
  return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`; // Star Wars Visual Guide URL (you can use placeholders)
};
</script>
