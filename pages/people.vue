<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">People</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="person in people" :key="person.name" class="border p-4 rounded-md bg-gray-100">
        <!-- Display the image -->
        <img
          :src="getPersonImage(person.url)"
          alt="Person Image"
          class="w-full h-32 object-cover mb-2"
        />
        <NuxtLink :to="`/people-detail/${getPersonId(person.url)}`" class="font-semibold">
          {{ person.name }}
        </NuxtLink>
        <p>Height: {{ person.height }} cm</p>
        <p>Mass: {{ person.mass }} kg</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Data for people
const people = ref([]);

// Fetch people data from the API
const fetchPeople = async () => {
  const response = await fetch('https://swapi.dev/api/people/');
  const data = await response.json();
  people.value = data.results;
};

onMounted(() => {
  fetchPeople();
});

// Helper to get the person's ID from their URL
const getPersonId = (url) => {
  return url.split('/').filter(Boolean).pop();
};

// Helper to get the person image URL based on ID
const getPersonImage = (url) => {
  const id = getPersonId(url);
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`; // Star Wars Visual Guide URL
};
</script>
