<template>
  <div class="flex flex-col items-center">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full max-w-5xl mt-12">
      <NuxtLink to="/people" class="group p-8 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-yellow-500">
        <h2 class="text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 transition-transform duration-300">People</h2>
      </NuxtLink>
      
      <NuxtLink to="/planets" class="group p-8 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-green-500">
        <h2 class="text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 transition-transform duration-300">Planets</h2>
      </NuxtLink>
      
      <NuxtLink to="/films" class="group p-8 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-red-500">
        <h2 class="text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 transition-transform duration-300">Films</h2>
      </NuxtLink>
      
      <NuxtLink to="/species" class="group p-8 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-purple-500">
        <h2 class="text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 transition-transform duration-300">Species</h2>
      </NuxtLink>
      
      <NuxtLink to="/vehicles" class="group p-8 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-blue-500">
        <h2 class="text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 transition-transform duration-300">Vehicles</h2>
      </NuxtLink>
      
      <NuxtLink to="/starships" class="group p-8 bg-gray-800 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-orange-500">
        <h2 class="text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 transition-transform duration-300">Starships</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useSeoMeta } from '#app'

useSeoMeta({
  title: 'NuxtJs | Star Wars App',
})
</script>
