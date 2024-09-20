<template>
  <div class="flex flex-col items-center gap-8 mb-5">
    <button @click="handleLogoClick">
      <img
        src="/starwars-logo.png"
        alt="Star Wars Logo"
        class="w-[250px] mt-8 scale-100 hover:scale-[1.5] transition-transform duration-500 ease-in-out drop-shadow-lg hover:drop-shadow-xl"
      />
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogoClick = () => {
  router.push('/');
};
</script>
