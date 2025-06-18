<template>
  <div id="nav">
    <div class="nav-left">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>

    <div class="nav-right">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/pedidos">Pedidos</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
#nav {
  background-color: #222;
  border-bottom: 2px solid #111;
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 40px;
  height: auto;
  margin-right: 20px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.nav-right a {
  color: #fcba03;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
  transition: color 0.3s ease;
}

.nav-right a:hover {
  color: #fff;
}
</style>
