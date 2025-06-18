<template>
  <TheBanner />
  <div class="main-container">
    <h1>Monte o Seu Burger:</h1>
    <TheBurguer />
  </div>
</template>

<script setup lang="ts">
import TheBanner from '../components/TheBanner.vue'
import TheBurguer from '../components/TheBurguer.vue'
//import { onMounted } from 'vue'
</script>

<style scoped lang="scss">
#main-container {
  align-items: center;
}
h1 {
  margin-top: 25px;
}
</style>
