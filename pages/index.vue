<script setup>
  import { ref } from "vue";
  let isOpen= ref(true)
  const toggle= (() => {
    isOpen = !isOpen;
    console.log(isOpen);
  })
</script>

<template>
  <div>
    <div class="w-full h-24 flex flex-nowrap justify-between items-center px-3 bg-black-main">
      <h1 class="font-black text-4xl font-sans text-white">IS<span class="text-orange-main text-3xl">Tablo</span></h1>
      <ul class="flex flex-row flex-nowrap text-white-main font-bold items-center">
        <li class="mx-2"><router-link to="/" class="text-white-main">Link1</router-link></li>
        <li class="ml-7 mr-2 text-white-main font-light">&lt;</li>
        <li class="mx-2"><router-link to="/" class="text-white-main">Link2</router-link></li>
        <li class="ml-7 mr-2 text-white-main font-light">&lt;</li>
        <li class="mx-2"><router-link to="/" class="text-white-main">Link3</router-link></li>
        <li class="ml-7 mr-2 text-white-main font-light">&lt;</li>
        <li class="mx-2"><router-link to="/" class="text-white-main">Link4</router-link></li>
        <li class="mx-2 border-l border-white-main pl-5"><router-link to="/" class="text-white-main">₺</router-link></li>
        <li class="ml-5 py-1 px-2 shadow-sm"><router-link to="/" class="text-white-main" @mouseover="toggle">TR</router-link>
          <div v-show="isOpen" class="absolute w-6 h-auto">
            EN
          </div>
        </li>
        
        <li class="ml-7 mr-2"><router-link to="/" class="text-white-main">Giriş Yap / Kayıt Ol</router-link></li>
      </ul>
    </div>
  </div>
</template>