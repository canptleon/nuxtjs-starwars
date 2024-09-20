<template>
  <div v-if="person" class="flex flex-col items-center rounded-[20px] justify-center w-[400px] ml-[auto] mr-[auto] mt-[220px] min-h-[470px] bg-white text-black p-4">
    <!-- Person Image -->
    <img
      :src="getPersonImage(route.params.id)"
      alt="Person Image"
      class="w-48 h-48 object-cover rounded-full mb-4 -mt-[158px] [filter:drop-shadow(2px_4px_6px)] border-[4px] border-[solid] border-[#fcdf2b]"
    />
    <h1 class="text-3xl font-bold mb-4 font-jediFont tracking-[2px] text-[black] [text-shadow:0px_0_3px_#fcdf2b]">{{ person.name }}</h1>
    <p class="text-lg mb-2">Height: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.height }} cm</span></p>
    <p class="text-lg mb-2">Mass: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.mass }} kg</span></p>
    <p class="text-lg mb-2">Hair Color: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.hair_color }}</span></p>
    <p class="text-lg mb-2">Skin Color: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.skin_color }}</span></p>
    <p class="text-lg mb-2">Birth Year: <span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.birth_year }}</span></p>
    <p class="text-lg mb-2 text-center">Homeworld: <br /><span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.homeworld }}</span></p> <!-- Example additional info -->
    <p class="text-lg mb-2 text-center">Species: <br /><span class="text-[#fcdf2b] font-bold [filter:drop-shadow(0px_1px_0px_black)]">{{ person.species }}</span></p> <!-- Example additional info -->
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
