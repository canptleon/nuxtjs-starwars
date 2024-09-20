<template>
  <Header />
  <NuxtPage />
  <Footer />
  <video class="background-video" autoplay muted loop>
    <source src="/bg-video.mp4" type="video/mp4">
  </video>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
</script>
