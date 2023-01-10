<script setup>
  import { ref } from "vue";
  let isOpen= ref(false)
  let isOpenT= ref(false)
  const toggle= (() => {
    isOpenT.value = false
    isOpen.value = !isOpen.value
  })
  const toggleT= (() => {
    isOpen.value = false
    isOpenT.value = !isOpenT.value
  })
  
</script>

<template>
  <div>
    <div class="w-full h-32 flex flex-nowrap justify-between items-center px-12 bg-black-main fixed z-10">
      <h1 class="font-black text-4xl font-sans text-white">IS<span class="text-orange-main text-3xl">Tablo</span></h1>
      <ul class="flex flex-row flex-nowrap text-white-main font-bold items-center">
        <li class="mx-2"><router-link to="/" class="text-white-main">Ana Sayfa</router-link></li>
        <li class="mx-2"><router-link to="/" class="text-white-main">Hakkımızda</router-link></li>
        <li class="mx-2"><router-link to="/" class="text-white-main">İletişim</router-link></li>
        <li class="mx-2"><router-link to="/" class="text-white-main">Sepetim</router-link></li>
        <li class="mx-2 border-l border-white-main pl-5" @mouseleave="isOpenT=false">
          <router-link to="/" class="text-white-main hover:text-orange-main" @mouseover="toggleT">₺</router-link>
          <div v-show="isOpenT" class="absolute w-3 h-auto" @mouseleave="toggleT">
            <router-link to="/" class="text-gray-main my-2" >€</router-link>
            <router-link to="/" class="text-gray-main my-2" >$</router-link>
          </div>
          </li>
        <li class="ml-5 py-1 px-2 shadow-sm" @mouseleave="isOpen=false">
          <router-link to="/" class="text-white-main hover:text-orange-main" @mouseover="toggle">TR</router-link>
          <div v-show="isOpen" class="absolute w-6 h-auto" @mouseleave="toggle">
            <router-link to="/" class="text-gray-main my-2" >EN</router-link>
          </div>
        </li>
        <li class="ml-7 mr-2"><router-link to="/" class="text-white-main pb-1 transition-all hover:text-orange-main">Giriş Yap / Kayıt Ol</router-link></li>
      </ul>
    </div>
  </div>
</template>