<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">Species</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="species in speciesList" :key="species.name" class="border p-4 rounded-md bg-gray-100">
        <!-- Species Image -->
        <img
          :src="getSpeciesImage(species.url)"
          alt="Species Image"
          class="w-full h-32 object-cover mb-2"
        />
        <NuxtLink :to="`/species-detail/${getSpeciesId(species.url)}`" class="font-semibold">
          {{ species.name }}
        </NuxtLink>
        <p>Classification: {{ species.classification }}</p>
        <p>Language: {{ species.language }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Data for species
const speciesList = ref([]);

// Fetch species data from the API
const fetchSpecies = async () => {
  const response = await fetch('https://swapi.dev/api/species/');
  const data = await response.json();
  speciesList.value = data.results;
};

onMounted(() => {
  fetchSpecies();
});

// Helper to get the species ID from the URL
const getSpeciesId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

// Helper to get species image URL (replace with actual source if needed)
const getSpeciesImage = (url) => {
  const id = getSpeciesId(url);
  return `https://starwars-visualguide.com/assets/img/species/${id}.jpg`; // Star Wars Visual Guide URL for species
};
</script>
