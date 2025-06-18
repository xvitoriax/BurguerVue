<template>
  <div class="message-container" v-if="msg">
    <p>{{ msg }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<style scoped lang="scss">
.message-container {
  color: #004085;
  background-color: #cce5ff;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
  text-align: center;
  font-weight: 600;
  margin-top: 15px;
}
</style>
