<template>
  <div v-if="person" class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <!-- Person Image -->
    <img
      :src="getPersonImage(route.params.id)"
      alt="Person Image"
      class="w-48 h-48 object-cover rounded-full mb-4"
    />
    <h1 class="text-4xl font-bold mb-4">{{ person.name }}</h1>
    <p class="text-lg mb-2">Height: {{ person.height }} cm</p>
    <p class="text-lg mb-2">Mass: {{ person.mass }} kg</p>
    <p class="text-lg mb-2">Hair Color: {{ person.hair_color }}</p>
    <p class="text-lg mb-2">Skin Color: {{ person.skin_color }}</p>
    <p class="text-lg mb-2">Birth Year: {{ person.birth_year }}</p>
    <p class="text-lg mb-2">Homeworld: {{ person.homeworld }}</p> <!-- Example additional info -->
    <p class="text-lg mb-2">Species: {{ person.species }}</p> <!-- Example additional info -->
  </div>
  <div v-else>
    <p class="text-center">Loading...</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const person = ref(null); // Store person data
const route = useRoute(); // Access route info

// Function to fetch person data based on ID
const fetchPerson = async (id) => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const data = await response.json();
    person.value = data;
  } catch (error) {
    console.error('Failed to fetch person:', error);
  }
};

// Get image URL based on person ID
const getPersonImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`; // Example URL for images
};

// Initial fetch when component mounts
onMounted(() => {
  fetchPerson(route.params.id);
});

// Watch for changes in the route parameters and refetch the data
watch(
  () => route.params.id,
  (newId) => {
    fetchPerson(newId);
  }
);
</script>

<style scoped>
/* Center the loading text */
.loading {
  text-align: center;
}
</style>
