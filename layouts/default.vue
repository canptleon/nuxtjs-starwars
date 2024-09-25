<template>
  <div>
    <Header />
    <NuxtPage />
    <client-only>
      <BackgroundVideo />
    </client-only>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import BackgroundVideo from '~/components/BackgroundVideo.vue';
</script>
