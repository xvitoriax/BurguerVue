<template>
  <div id="main-banner">
    <h1>Make Your Burger</h1>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#main-banner {
  background-image: url('/src/assets/burger.jpg');
  background-position: 0 -250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  top: 1px;
  margin: 0;

  h1 {
    color: #fff;
    text-align: center;
    font-size: 60px;
    background-color: #222;
    padding: 20px 40px;
  }
}
</style>
