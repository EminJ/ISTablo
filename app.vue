<script setup>
  import Navbar from './components/Navbar.vue'
  updateAppConfig()
</script>

<template>
    <div>
        <Navbar/>
        <NuxtPage/>
    </div>
</template>

<style scoped>
  body{
    font-family: 'Quicksand', sans-serif;
  }
  a{
      text-decoration: none;
      color: #000;
  }
</style>