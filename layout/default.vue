<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<template>
    <div>
        <Navbar />
        <slot />
    </div>
</template>
  
<style scoped>
    body {
        font-family: 'Quicksand', sans-serif;
    }

    a {
        text-decoration: none;
        color: #000;
    }
</style>