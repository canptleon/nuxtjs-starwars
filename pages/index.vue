<template>
  <div class="flex flex-col items-center">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full max-w-5xl mt-12">
      <NuxtLink to="/people" class="[filter:drop-shadow(2px_4px_6px_black)] relative overflow-hidden group bg-[url(/people.png)] bg-gray-800 h-[300px] text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-yellow-500">
        <h2 class="absolute font-jediFont tracking-[2px] top-[0] left-[0] right-[0] bottom-[0] w-full h-full bg-[#0000004f] group-hover:bg-[#00000000] transition-all text-center justify-center items-center flex  text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 duration-300">People</h2>
      </NuxtLink>

      <NuxtLink to="/planets" class="[filter:drop-shadow(2px_4px_6px_black)] relative overflow-hidden group bg-[url(/planets.png)] bg-gray-800 h-[300px] text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-yellow-500">
        <h2 class="absolute font-jediFont tracking-[2px] top-[0] left-[0] right-[0] bottom-[0] w-full h-full bg-[#0000004f] group-hover:bg-[#00000000] transition-all text-center justify-center items-center flex  text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 duration-300">Planets</h2>
      </NuxtLink>
      
      <NuxtLink to="/films" class="[filter:drop-shadow(2px_4px_6px_black)] relative overflow-hidden group bg-[url(/films.png)] bg-gray-800 h-[300px] text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-yellow-500">
        <h2 class="absolute font-jediFont tracking-[2px] top-[0] left-[0] right-[0] bottom-[0] w-full h-full bg-[#0000004f] group-hover:bg-[#00000000] transition-all text-center justify-center items-center flex  text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 duration-300">Films</h2>
      </NuxtLink>

      <NuxtLink to="/species" class="[filter:drop-shadow(2px_4px_6px_black)] relative overflow-hidden group bg-[url(/species.png)] bg-gray-800 h-[300px] text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-yellow-500">
        <h2 class="absolute font-jediFont tracking-[2px] top-[0] left-[0] right-[0] bottom-[0] w-full h-full bg-[#0000004f] group-hover:bg-[#00000000] transition-all text-center justify-center items-center flex  text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 duration-300">Species</h2>
      </NuxtLink>
      
      <NuxtLink to="/vehicles" class="[filter:drop-shadow(2px_4px_6px_black)] relative overflow-hidden group bg-[url(/vehicles.png)] bg-gray-800 h-[300px] text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-yellow-500">
        <h2 class="absolute font-jediFont tracking-[2px] top-[0] left-[0] right-[0] bottom-[0] w-full h-full bg-[#0000004f] group-hover:bg-[#00000000] transition-all text-center justify-center items-center flex  text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 duration-300">vehicles</h2>
      </NuxtLink>
      
      <NuxtLink to="/starships" class="[filter:drop-shadow(2px_4px_6px_black)] relative overflow-hidden group bg-[url(/starships.png)] bg-gray-800 h-[300px] text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-yellow-500">
        <h2 class="absolute font-jediFont tracking-[2px] top-[0] left-[0] right-[0] bottom-[0] w-full h-full bg-[#0000004f] group-hover:bg-[#00000000] transition-all text-center justify-center items-center flex  text-3xl font-extrabold group-hover:rotate-3 group-hover:scale-110 duration-300">Starships</h2>
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
